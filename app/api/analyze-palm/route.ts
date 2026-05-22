import { NextRequest, NextResponse } from "next/server";
import {
  BedrockRuntimeClient,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Image URL is required",
        },
        {
          status: 400,
        },
      );
    }

    const validationPrompt = `You are validating whether an uploaded image contains a clearly visible human palm.

Return STRICT JSON ONLY.

If the image contains a visible human palm suitable for palm reading:
{
  "valid": true
}

If the image does not contain a palm:
{
  "valid": false,
  "reason": "No visible human palm detected"
}

Do not hallucinate.

Image URL:
${imageUrl}`;

    const validationCommand = new ConverseCommand({
      modelId: "amazon.nova-lite-v1:0",
      messages: [
        {
          role: "user",
          content: [
            {
              text: validationPrompt,
            },
          ],
        },
      ],
      inferenceConfig: {
        maxTokens: 200,
        temperature: 0.1,
        topP: 0.8,
      },
    });

    const validationResponse = await client.send(validationCommand);

    const validationText =
      validationResponse.output?.message?.content?.[0]?.text || "{}";

    let validation;

    try {
      validation = JSON.parse(validationText);
    } catch {
      validation = {
        valid: false,
      };
    }

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: "Please upload a clear image of a human palm.",
        },
        {
          status: 400,
        },
      );
    }

    const prompt = `You are an emotionally intelligent AI palm reader.

Analyze the uploaded palm image.

Return STRICT JSON ONLY.

Required format:
{
  "heart_line": {
    "path": "SVG_PATH",
    "insight": "string"
  },
  "head_line": {
    "path": "SVG_PATH",
    "insight": "string"
  },
  "life_line": {
    "path": "SVG_PATH",
    "insight": "string"
  },
  "summary": "string"
}

Generate believable SVG paths for overlay animation.
Keep the tone human, conversational, emotionally intelligent, and concise.
Avoid philosophical language.
Avoid dangerous predictions.

Palm Image URL:
${imageUrl}`;

    const command = new ConverseCommand({
      modelId: "amazon.nova-lite-v1:0",
      messages: [
        {
          role: "user",
          content: [
            {
              text: prompt,
            },
          ],
        },
      ],
      inferenceConfig: {
        maxTokens: 1200,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const response = await client.send(command);

    const text =
      response.output?.message?.content?.[0]?.text || "{}";

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        heart_line: {
          path: "M55 130 C120 90 190 105 255 95",
          insight:
            "You care deeply but take time before fully trusting people.",
        },
        head_line: {
          path: "M60 185 C130 170 205 165 275 175",
          insight:
            "You tend to think carefully before making decisions.",
        },
        life_line: {
          path: "M115 80 C55 170 85 270 160 360",
          insight:
            "You adapt well during emotionally intense phases of life.",
        },
        summary:
          "Your palm reflects emotional depth, balanced thinking, and resilient energy.",
        raw: text,
      };
    }

    return NextResponse.json({
      success: true,
      analysis: parsed,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to analyze palm",
      },
      {
        status: 500,
      },
    );
  }
}
