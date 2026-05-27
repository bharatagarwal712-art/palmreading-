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

    const mimeMatch = imageUrl.match(
      /^data:(image\/[a-zA-Z0-9.+-]+);base64,/
    );

    const mimeType = mimeMatch?.[1] || "image/jpeg";

    const format =
      mimeType.includes("png")
        ? "png"
        : mimeType.includes("webp")
          ? "webp"
          : "jpeg";

    const imageBytes = Buffer.from(base64Data, "base64");

    const prompt = `
You are an expert AI palm reader.

Analyze the uploaded palm image carefully.

Return STRICT JSON ONLY.

Required format:
{
  "summary": "4-6 sentence personality overview",
  "heart_line": {
    "insight": "Detailed emotional insight in 3-4 sentences"
  },
  "head_line": {
    "insight": "Detailed intelligence/personality insight in 3-4 sentences"
  },
  "life_line": {
    "insight": "Detailed life energy and stability insight in 3-4 sentences"
  }
}

Rules:
- no markdown
- no code blocks
- no extra text
- no philosophical filler
- sound personal and emotionally intelligent
- avoid repetition
- each section must feel unique
`;

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
                format,
                source: {
                  bytes: imageBytes,
                },
              },
            },
          ],
        },
      ],
      inferenceConfig: {
        maxTokens: 1400,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const response = await client.send(command);

    const text =
      response.output?.message?.content?.[0]?.text || "{}";

    let parsed;

    try {
      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error("No JSON returned");
      }

      parsed = JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error("PARSE ERROR:", error);
      console.error("RAW MODEL RESPONSE:", text);

      parsed = {
        summary:
          "Your palm reflects a thoughtful and emotionally balanced personality. You appear to approach life with calm observation and emotional awareness. There is a strong indication of practicality mixed with emotional openness. Your decisions are likely guided by both logic and empathy. The overall palm structure suggests resilience and adaptability during periods of change.",
        heart_line: {
          insight:
            "Your emotional nature appears warm and sincere. You likely value deep trust and meaningful emotional connections rather than surface-level interactions. The palm suggests emotional stability with a caring attitude toward the people close to you. There is also an indication that you prefer honesty and emotional clarity in relationships.",
        },
        head_line: {
          insight:
            "The palm suggests a practical and analytical style of thinking. You may naturally observe situations carefully before reacting and tend to process things rationally. There is also an indication of curiosity and mental adaptability, allowing you to balance creativity with logic. Your thinking style seems calm, steady, and thoughtful.",
        },
        life_line: {
          insight:
            "Your life line reflects grounded energy and emotional resilience. The palm suggests that you adapt steadily through changing situations and recover well from stressful periods. There is an indication of stable inner strength and a preference for long-term consistency over impulsive decisions. Overall, the energy appears balanced and composed.",
        },
      };
    }

    if (userId) {
      await supabase
        .from("palm_readings")
        .insert({
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
