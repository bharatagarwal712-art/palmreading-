import { NextRequest, NextResponse } from "next/server";
import {
  BedrockRuntimeClient,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { createClient } from "@supabase/supabase-js";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { imageUrl, userId } = body;

    if (!imageUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Image URL is required",
        },
        {
          status: 400,
        }
      );
    }

    const base64Data = imageUrl.replace(
      /^data:image\/\w+;base64,/, 
      ""
    );

    const imageBytes = Buffer.from(base64Data, "base64");

    const validationPrompt = `You are a STRICT palm validator.

Your ONLY task is to determine whether the uploaded image contains:
- a REAL HUMAN PALM
- front-facing palm
- visible palm lines
- suitable image for palm reading

You MUST reject:
- bottles
- cups
- random objects
- tables
- landscapes
- pets
- faces
- side-hand photos
- closed fists
- fingers only
- blurred images
- dark images
- AI generated images
- drawings
- cartoons

If you are not completely certain the image contains a clear human palm, mark it invalid.

Return ONLY JSON.

VALID:
{
  "valid": true
}

INVALID:
{
  "valid": false,
  "reason": "No clear human palm detected"
}`;

    const validationCommand = new ConverseCommand({
      modelId: "amazon.nova-lite-v1:0",
      messages: [
        {
          role: "user",
          content: [
            {
              text: validationPrompt,
            },
            {
              image: {
                format: "jpeg",
                source: {
                  bytes: imageBytes,
                },
              },
            },
          ],
        },
      ],
      inferenceConfig: {
        maxTokens: 100,
        temperature: 0,
        topP: 0.1,
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

    if (validation.valid !== true) {
      return NextResponse.json(
        {
          success: false,
          error: "Please upload a clear photo of a real human palm.",
        },
        {
          status: 400,
        }
      );
    }

    const prompt = `You are an emotionally intelligent AI palm reader.

Analyze ONLY the visible palm.

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

Rules:
- concise responses
- conversational tone
- no philosophy
- no dangerous predictions
- no fake certainty`;

    const command = new ConverseCommand({
      modelId: "amazon.nova-lite-v1:0",
      messages: [
        {
          role: "user",
          content: [
            {
              text: prompt,
            },
            {
              image: {
                format: "jpeg",
                source: {
                  bytes: imageBytes,
                },
              },
            },
          ],
        },
      ],
      inferenceConfig: {
        maxTokens: 1000,
        temperature: 0.6,
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
      };
    }

    if (userId) {
      await supabase.from("palm_readings").insert({
        user_id: userId,
        summary: parsed.summary,
        heart_line: parsed.heart_line,
        head_line: parsed.head_line,
        life_line: parsed.life_line,
      });
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
      }
    );
  }
}
