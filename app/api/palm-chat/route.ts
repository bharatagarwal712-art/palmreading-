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

    const { question, report } = body;

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
You are a warm and emotionally intelligent AI palm reader.

You are NOT a fortune teller.
You speak like a thoughtful human guide.

STYLE:
- conversational
- concise
- emotionally aware
- modern
- grounded
- calm

IMPORTANT:
- maximum 4 short paragraphs
- each paragraph maximum 2 sentences
- avoid walls of text
- avoid repeating the question
- avoid mystical language
- avoid fake certainty
- never invent dates, years, timelines, or ages
- never say things like:
  "I sense"
  "destiny"
  "the universe"
  "cosmic energy"
  "your fate"

Your answer should feel:
- personal
- insightful
- human
- easy to read on mobile

REAL PALM READING CONTEXT:
${JSON.stringify(report || {}, null, 2)}

USER QUESTION:
${question}
`;

    let response;

    try {
      const deepseekCommand = new ConverseCommand({
        modelId: "deepseek.v3.2",

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
          maxTokens: 120,
          temperature: 0.6,
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
          maxTokens: 120,
          temperature: 0.6,
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
