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

export async function analyzePalmWithNova(imageUrl: string) {
  const prompt = `You are an emotionally intelligent AI palm reader.

Analyze the uploaded palm image.

Return STRICT JSON ONLY.

Required JSON format:
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
Use cinematic emotional language.
Avoid dangerous predictions.

Palm image URL:
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
      temperature: 0.8,
      topP: 0.9,
    },
  });

  const response = await client.send(command);

  const text = response.output?.message?.content?.[0]?.text;

  if (!text) {
    throw new Error("No response from Nova");
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error(error);

    return {
      heart_line: {
        path: "M55 130 C120 90 190 105 255 95",
        insight:
          "Emotionally protective and observant before trusting others.",
      },
      head_line: {
        path: "M60 185 C130 170 205 165 275 175",
        insight:
          "Strong reflective thinking patterns combined with intuition-driven decisions.",
      },
      life_line: {
        path: "M115 80 C55 170 85 270 160 360",
        insight:
          "Independent energy with resilience during emotionally transformative phases.",
      },
      summary:
        "Your palm suggests emotional depth, intuitive intelligence, and independent growth energy.",
    };
  }
}
