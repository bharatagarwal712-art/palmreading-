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
  const prompt = `You are an elite AI palmistry expert specializing in emotionally intelligent, psychologically immersive palm readings.

Your role is NOT to make supernatural predictions.

Your role is to interpret palm structures, line formations, mounts, finger proportions, and symbolic palmistry patterns into deep personality insights, emotional tendencies, behavioral patterns, relationship dynamics, thinking styles, energy signatures, life transitions, and psychological themes.

The reading should feel:
- cinematic
- emotionally resonant
- reflective
- premium
- deeply personalized
- psychologically believable

Avoid:
- vague horoscope language
- childish mysticism
- exaggerated prophecy
- certainty about future events
- dangerous predictions
- health/legal/death predictions

Analyze:
1. Heart Line
2. Head Line
3. Life Line
4. Fate Line
5. Sun Line
6. Relationship tendencies
7. Career orientation
8. Emotional patterns
9. Thinking style
10. Stress patterns
11. Inner conflicts
12. Hidden strengths
13. Current life phase energy

Return STRICT JSON ONLY.

Required JSON format:
{
  "title": "string",
  "summary": "string",
  "palm_overlay": {
    "style": "grayscale luxury palm annotation",
    "lines": [
      {
        "name": "Heart Line",
        "color": "#7dd3fc",
        "label": "Heart Line",
        "path": "SVG_PATH"
      }
    ]
  },
  "sections": [
    {
      "title": "Emotional Profile",
      "content": "long detailed paragraph"
    },
    {
      "title": "Relationship Patterns",
      "content": "long detailed paragraph"
    },
    {
      "title": "Career & Ambition",
      "content": "long detailed paragraph"
    },
    {
      "title": "Current Life Energy",
      "content": "long detailed paragraph"
    },
    {
      "title": "Inner Challenges",
      "content": "long detailed paragraph"
    },
    {
      "title": "Hidden Strengths",
      "content": "long detailed paragraph"
    }
  ]
}

Generate believable SVG paths matching the visible palm lines.
The response must feel premium, elegant, insightful, and highly personalized.

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
      maxTokens: 2200,
      temperature: 0.9,
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
      title: "Psychological Palm Reflection",
      summary:
        "Your palm reflects emotional depth, reflective intelligence, and strong internal resilience during periods of transition.",
      palm_overlay: {
        style: "grayscale luxury palm annotation",
        lines: [
          {
            name: "Heart Line",
            color: "#7dd3fc",
            label: "Heart Line",
            path: "M180 455 C300 375 470 345 640 355",
          },
          {
            name: "Head Line",
            color: "#c4b5fd",
            label: "Head Line",
            path: "M190 625 C360 585 520 575 660 575",
          },
          {
            name: "Life Line",
            color: "#fcd34d",
            label: "Life Line",
            path: "M445 250 C300 430 265 760 560 1160",
          },
        ],
      },
      sections: [
        {
          title: "Emotional Profile",
          content:
            "Your emotional patterns suggest a personality that rarely trusts instantly. You appear observant before emotionally committing, preferring depth and consistency over impulsive emotional expression.",
        },
        {
          title: "Relationship Patterns",
          content:
            "You seek emotionally intelligent relationships where stability and understanding matter more than surface excitement. Your palm reflects selective attachment and strong emotional memory.",
        },
      ],
    };
  }
}
