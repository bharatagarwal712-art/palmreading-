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

    const { question } = body;

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          error: "Question is required",
        },
        {
          status: 400,
        },
      );
    }

    const prompt = `
You are a warm, emotionally intelligent AI palm reader.

Your tone should feel:
- conversational
- grounded
- human
- emotionally aware
- modern

DO:
- answer naturally
- sound like a thoughtful human guide
- keep answers concise but insightful
- use uncertainty honestly
- say "it may suggest" instead of certainty
- focus on personality, tendencies, emotions, motivation

DO NOT:
- invent years, dates, timelines, or ages
- predict death, disasters, pregnancy, or illness
- sound mystical or theatrical
- use phrases like:
  "I sense"
  "the universe"
  "destiny"
  "cosmic energy"
  "mid-2024"
  "your fate"

Avoid generic fortune-cookie language.

The user wants emotionally intelligent reflection, not fantasy roleplay.

Palm Reading Context:
The user appears emotionally reflective, thoughtful, ambitious, and emotionally aware.

User Question:
${question}
`;

    let response;

    try {
      const deepseekCommand = new ConverseCommand({
        modelId: "deepseek.r1-v1:0",

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
          maxTokens: 220,
          temperature: 0.7,
          topP: 0.9,
        },
      });

      response = await client.send(deepseekCommand);
    } catch (deepseekError) {
      console.error("DEEPSEEK FAILED, FALLING BACK TO NOVA:", deepseekError);

      const fallbackCommand = new ConverseCommand({
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
          maxTokens: 220,
          temperature: 0.7,
          topP: 0.9,
        },
      });

      response = await client.send(fallbackCommand);
    }

    const answer =
      response.output?.message?.content?.[0]?.text ||
      "Your palm suggests a thoughtful and emotionally aware personality, though this question may need deeper reflection.";

    return NextResponse.json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        answer:
          "I couldn't interpret that clearly right now. Try asking in a slightly different way.",
      },
      {
        status: 500,
      },
    );
  }
}
