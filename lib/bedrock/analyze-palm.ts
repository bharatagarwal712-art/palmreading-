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
  const prompt = `You are an elite AI palmistry expert specializing in psychologically immersive, emotionally intelligent, highly comprehensive palm readings.

MOST IMPORTANT:
The reading MUST feel deeply personal, emotionally engaging, warm, natural, and human.

The user should feel:
- emotionally understood
- personally seen
- psychologically understood
- introspective after reading
- surprised by how relatable the reading feels

Write like:
- an emotionally intelligent mentor
- a thoughtful human observer
- a perceptive psychologist
- NOT like a robotic AI system

Use simple, conversational, emotionally engaging language.

BAD example:
“Your emotional tendencies indicate introspective cognitive processing.”

GOOD example:
“You tend to think deeply before opening up to people. Even when you care strongly, you rarely show everything immediately.”

Another GOOD example:
“You seem like someone who quietly carries a lot internally. People may see you as calm, but your mind is usually processing much more beneath the surface.”

The report should feel:
- deeply personalized
- emotionally resonant
- psychologically believable
- cinematic
- reflective
- introspective
- premium quality
- emotionally human
- easy to understand

Avoid:
- robotic phrasing
- overly formal writing
- repetitive mystical language
- vague horoscope writing
- generic filler
- complicated jargon

Your role is NOT fortune telling.

You are an advanced symbolic palm interpretation system that translates visible palm structures, lines, mounts, spacing, markings, symmetry, density, and shape patterns into deep personality analysis and emotional insight.

NEVER:
- make supernatural claims
- predict death
- predict diseases
- make legal or financial guarantees
- exaggerate certainty
- make fear-based predictions

Analyze comprehensively:
- Heart Line
- Head Line
- Life Line
- Fate Line
- Sun Line
- Marriage Lines
- Palm mounts
- Finger spacing
- Palm shape
- Major markings and symbols

For every meaningful feature:
1. explain what it suggests psychologically
2. explain emotional implications
3. explain behavioral tendencies
4. explain strengths and blind spots
5. connect patterns together intelligently
6. use emotionally engaging everyday language

The report should be LONG, comprehensive, layered, and premium.

Do NOT produce shallow sections.

Make the user feel:
“This actually sounds like me.”

Return STRICT JSON ONLY.

Required JSON structure:
{
  "title": "string",
  "summary": "very detailed overall personality summary",
  "detected_features": ["string"],
  "visual_annotations": [
    {
      "name": "Heart Line",
      "category": "major_line",
      "importance": "high",
      "color": "#7dd3fc",
      "label": "Heart Line",
      "path": "SVG_PATH",
      "meaning": "human friendly meaning"
    }
  ],
  "sections": [
    {
      "title": "Core Personality Structure",
      "content": "very detailed human-friendly analysis"
    },
    {
      "title": "Emotional Profile",
      "content": "very detailed human-friendly analysis"
    },
    {
      "title": "Relationship Patterns",
      "content": "very detailed human-friendly analysis"
    },
    {
      "title": "Thinking Style & Intelligence",
      "content": "very detailed human-friendly analysis"
    },
    {
      "title": "Career & Ambition",
      "content": "very detailed human-friendly analysis"
    },
    {
      "title": "Stress & Internal Conflicts",
      "content": "very detailed human-friendly analysis"
    },
    {
      "title": "Hidden Strengths",
      "content": "very detailed human-friendly analysis"
    },
    {
      "title": "Current Life Phase",
      "content": "very detailed human-friendly analysis"
    },
    {
      "title": "Final Reflection",
      "content": "emotionally powerful concluding reflection"
    }
  ]
}

IMPORTANT:
- Keep the user's original palm image untouched.
- DO NOT recreate or regenerate the palm image.
- Only include meaningful annotations.
- Avoid clutter.

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
      maxTokens: 4000,
      temperature: 0.95,
      topP: 0.92,
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
        "You seem like someone who feels things deeply but rarely shows everything immediately. Your palm reflects a thoughtful personality that tends to observe first, process internally, and open up slowly over time.",
      detected_features: [
        "Strong Heart Line",
        "Deep Head Line"
      ],
      visual_annotations: [
        {
          name: "Heart Line",
          category: "major_line",
          importance: "high",
          color: "#7dd3fc",
          label: "Heart Line",
          path: "M180 455 C300 375 470 345 640 355",
          meaning:
            "You care deeply about people, but usually take time before trusting someone emotionally."
        }
      ],
      sections: [
        {
          title: "Core Personality Structure",
          content:
            "You come across as calm and composed, but internally your mind is usually processing much more than people realize. You notice emotional shifts quickly and tend to think carefully before reacting."
        }
      ]
    };
  }
}
