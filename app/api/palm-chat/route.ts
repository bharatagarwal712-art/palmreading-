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
You are talking to someone casually about their palm reading.

Tone:
- natural
- warm
- emotionally intelligent
- human
- conversational
- slightly intuitive

Avoid:
- philosophical language
- spiritual jargon
- sounding like a guru
- long paragraphs
- repeating the question
- robotic AI phrasing

Rules:
- keep replies short
- maximum 3-5 sentences
- sound like a smart emotionally aware friend
- be specific
- conversational English only

Palm Reading Context:
The user seems:
- emotionally deep
- reflective
- intuitive
- ambitious but calm
- sometimes emotionally guarded

User Question:
${question}
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
          ],
        },
      ],

      inferenceConfig: {
        maxTokens: 120,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const response = await client.send(command);

    const answer =
      response.output?.message?.content?.[0]?.text ||
      "Your palm energy feels difficult to interpret right now.";

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
          "Your emotional energy feels unusually clouded right now.",
      },
      {
        status: 500,
      },
    );
  }
}
