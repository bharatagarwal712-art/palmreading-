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

Your role is NOT fortune telling.

You are an advanced symbolic palm interpretation system that translates visible palm structures, lines, mounts, spacing, markings, symmetry, density, and shape patterns into deep personality analysis and emotional insight.

The report must feel:
- deeply personalized
- psychologically believable
- emotionally resonant
- cinematic
- reflective
- introspective
- premium luxury quality
- highly detailed
- intellectually mature

The reading should feel like:
“an emotionally intelligent mirror into the user’s behavioral patterns, emotional tendencies, internal conflicts, ambitions, stress patterns, and psychological wiring.”

NEVER:
- make supernatural claims
- predict death
- predict diseases
- make legal or financial guarantees
- use childish mystical language
- use vague horoscope writing
- exaggerate certainty
- make fear-based predictions

You must deeply analyze ALL visible features.

Analyze comprehensively:

MAJOR LINES
- Heart Line
- Head Line
- Life Line
- Fate Line
- Sun Line
- Mercury Line
- Intuition Line
- Girdle of Venus

MINOR LINES
- Marriage Lines
- Children Lines
- Travel Lines
- Influence Lines
- Bracelet Lines

PALM MOUNTS
- Mount of Venus
- Mount of Moon
- Mount of Jupiter
- Mount of Saturn
- Mount of Apollo
- Mount of Mercury
- Upper Mars
- Lower Mars
- Plain of Mars

SPECIAL MARKINGS
- crosses
- stars
- triangles
- squares
- islands
- forks
- chains
- breaks
- dots
- fish signs
- grilles

STRUCTURAL ANALYSIS
- finger proportions
- thumb angle
- finger spacing
- finger curvature
- palm shape
- palm density
- line depth
- symmetry
- texture visibility

For every meaningful feature:
1. explain what it suggests psychologically
2. explain emotional implications
3. explain behavioral tendencies
4. explain internal conflicts if any
5. explain strengths and blind spots
6. connect patterns together intelligently

The report should be LONG, comprehensive, layered, and premium.

Do NOT produce shallow sections.
Every section should contain rich insight and emotionally intelligent observations.

Return STRICT JSON ONLY.

Required JSON structure:
{
  "title": "string",
  "summary": "very detailed overall personality summary",
  "detected_features": [
    "Strong Heart Line",
    "Forked Life Line",
    "Prominent Mount of Venus"
  ],
  "visual_annotations": [
    {
      "name": "Heart Line",
      "category": "major_line",
      "importance": "high",
      "color": "#7dd3fc",
      "label": "Heart Line",
      "path": "SVG_PATH",
      "meaning": "detailed meaning"
    }
  ],
  "sections": [
    {
      "title": "Core Personality Structure",
      "content": "very detailed long-form analysis"
    },
    {
      "title": "Emotional Profile",
      "content": "very detailed long-form analysis"
    },
    {
      "title": "Relationship Patterns",
      "content": "very detailed long-form analysis"
    },
    {
      "title": "Thinking Style & Intelligence",
      "content": "very detailed long-form analysis"
    },
    {
      "title": "Career & Ambition",
      "content": "very detailed long-form analysis"
    },
    {
      "title": "Stress & Internal Conflicts",
      "content": "very detailed long-form analysis"
    },
    {
      "title": "Hidden Strengths",
      "content": "very detailed long-form analysis"
    },
    {
      "title": "Current Life Phase",
      "content": "very detailed long-form analysis"
    },
    {
      "title": "Emotional Blind Spots",
      "content": "very detailed long-form analysis"
    },
    {
      "title": "Growth Patterns & Future Direction",
      "content": "very detailed long-form analysis"
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
- The app will simply overlay labels and highlights on top of the real uploaded image.
- Only include meaningful annotations.
- Avoid clutter.

Color logic:
- emotional lines → cyan
- intellectual lines → violet
- vitality lines → gold
- destiny/career lines → emerald
- special markings → amber or soft red

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
      temperature: 0.92,
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
        "Your palm reflects emotional depth, introspective intelligence, strong adaptive resilience, and a personality structure shaped by observation, emotional caution, and internal processing.",
      detected_features: [
        "Strong Heart Line",
        "Deep Head Line",
        "Forked Life Line",
        "Visible Fate Line",
        "Prominent Mount of Venus"
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
            "Emotionally observant and selective in emotional trust."
        }
      ],
      sections: [
        {
          title: "Core Personality Structure",
          content:
            "Your palm structure suggests a personality driven more by internal meaning and emotional alignment than external validation. There is evidence of deep internal processing combined with a tendency to carefully observe situations before emotionally committing."
        }
      ]
    };
  }
}
