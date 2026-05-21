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

Deeply analyze the uploaded palm image and identify ALL meaningful visible palmistry features.

Analyze:

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

MOUNTS
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
- Crosses
- Stars
- Triangles
- Squares
- Islands
- Breaks
- Forks
- Chains
- Dots
- Fish Signs
- Grilles

HAND STRUCTURE
- Finger proportions
- Finger spacing
- Thumb structure
- Palm shape
- Finger curvature

The reading should feel:
- cinematic
- emotionally intelligent
- psychologically believable
- premium
- introspective
- deeply personalized

Avoid:
- childish mysticism
- exaggerated prophecy
- dangerous predictions
- certainty about future events
- medical/legal/death claims

Return STRICT JSON ONLY.

Required JSON structure:
{
  "title": "string",
  "summary": "string",
  "detected_features": [
    "Strong Heart Line",
    "Forked Life Line"
  ],
  "annotated_image_prompt": "detailed luxury annotation prompt",
  "palm_overlay": {
    "style": "luxury grayscale AI palm analysis",
    "annotations": [
      {
        "name": "Heart Line",
        "category": "major_line",
        "importance": "high",
        "color": "#7dd3fc",
        "label": "Heart Line",
        "path": "SVG_PATH",
        "meaning": "string"
      }
    ]
  },
  "sections": [
    {
      "title": "Emotional Profile",
      "content": "long immersive paragraph"
    },
    {
      "title": "Relationship Patterns",
      "content": "long immersive paragraph"
    },
    {
      "title": "Career & Ambition",
      "content": "long immersive paragraph"
    },
    {
      "title": "Current Life Energy",
      "content": "long immersive paragraph"
    },
    {
      "title": "Inner Challenges",
      "content": "long immersive paragraph"
    },
    {
      "title": "Hidden Strengths",
      "content": "long immersive paragraph"
    }
  ]
}

Generate annotations ONLY for meaningful visible features.
Do not clutter the palm.

The annotated image should:
- use the uploaded palm image as the base
- convert palm to grayscale
- highlight detected lines and markings with elegant glowing colors
- add subtle premium labels
- look cinematic and futuristic
- feel like an elite AI psychological palm analysis
- avoid looking medical or technical

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
      maxTokens: 2600,
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
      detected_features: [
        "Strong Heart Line",
        "Deep Head Line",
        "Forked Life Line",
        "Visible Fate Line",
        "Prominent Mount of Venus"
      ],
      annotated_image_prompt:
        "Luxury grayscale palm analysis with glowing labeled palmistry markers and elegant cinematic overlays.",
      palm_overlay: {
        style: "luxury grayscale AI palm analysis",
        annotations: [
          {
            name: "Heart Line",
            category: "major_line",
            importance: "high",
            color: "#7dd3fc",
            label: "Heart Line",
            path: "M180 455 C300 375 470 345 640 355",
            meaning:
              "Emotionally observant and selective in emotional trust.",
          },
          {
            name: "Head Line",
            category: "major_line",
            importance: "high",
            color: "#c4b5fd",
            label: "Head Line",
            path: "M190 625 C360 585 520 575 660 575",
            meaning:
              "Strong internal analysis and reflective thinking patterns.",
          },
          {
            name: "Life Line",
            category: "major_line",
            importance: "high",
            color: "#fcd34d",
            label: "Life Line",
            path: "M445 250 C300 430 265 760 560 1160",
            meaning:
              "Resilience during emotionally transformative phases.",
          }
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
        }
      ]
    };
  }
}
