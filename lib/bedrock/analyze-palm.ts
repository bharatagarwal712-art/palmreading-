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
  const prompt = `You are an elite AI palmistry expert specializing in emotionally immersive, psychologically intelligent, highly engaging palm readings.

MOST IMPORTANT:
The report MUST feel:
- easy to read
- emotionally personal
- visually engaging
- relatable
- conversational
- understandable even for a 10th grade student

The user should feel:
- emotionally understood
- curious to keep reading
- surprised by how relatable the report feels
- emotionally connected to the analysis

WRITING STYLE:
- use simple natural English
- short paragraphs
- conversational tone
- emotionally warm writing
- easy vocabulary
- avoid jargon
- avoid robotic phrasing
- avoid mystical nonsense
- avoid sounding like a horoscope

VERY IMPORTANT:
Every section should contain:
- emojis/icons naturally
- relatable examples
- practical personality observations
- easy explanations
- emotionally engaging language

GOOD example:
“🧠 You usually think deeply before reacting. Even when something hurts you emotionally, you rarely show it immediately. People may think you are calm, but internally your mind keeps replaying situations for a long time.”

Another GOOD example:
“❤️ In relationships, you seem to value emotional safety more than excitement. You probably connect slowly with people, but once attached, you care very deeply.”

Use:
- emojis naturally
- bullet points where useful
- short highlight summaries
- easy-to-read formatting
- simple examples from daily life

The report should feel like:
“a smart emotionally aware friend describing the user very accurately.”

NEVER:
- make supernatural claims
- predict death
- predict diseases
- create fear
- use complicated psychology terms
- use repetitive mystical language

Analyze:
- Heart Line
- Head Line
- Life Line
- Fate Line
- Sun Line
- Marriage Lines
- Palm shape
- Finger spacing
- Major markings
- Emotional patterns
- Thinking style
- Stress patterns
- Relationship tendencies
- Ambition patterns

For every insight:
1. explain it simply
2. connect it to real-life behavior
3. make it emotionally relatable
4. make it feel specific and personal

The report should be LONG, comprehensive, layered, and premium.

Do NOT produce shallow sections.

Make the user feel:
“This actually sounds like me.”

Return STRICT JSON ONLY.

Required JSON structure:
{
  "title": "string",
  "summary": "easy-to-read emotional personality summary",
  "quick_highlights": [
    {
      "icon": "❤️",
      "title": "Emotionally Careful",
      "description": "You usually take time before fully trusting people emotionally."
    }
  ],
  "detected_features": ["Strong Heart Line"],
  "visual_annotations": [
    {
      "name": "Heart Line",
      "category": "major_line",
      "importance": "high",
      "color": "#7dd3fc",
      "label": "Heart Line",
      "path": "SVG_PATH",
      "meaning": "easy human-friendly meaning"
    }
  ],
  "sections": [
    {
      "title": "❤️ Emotional Side",
      "content": "very detailed easy-to-read emotional analysis"
    },
    {
      "title": "🧠 Thinking Style",
      "content": "very detailed easy-to-read thinking analysis"
    },
    {
      "title": "🤝 Relationships",
      "content": "very detailed easy-to-read relationship analysis"
    },
    {
      "title": "🚀 Career & Ambition",
      "content": "very detailed easy-to-read career analysis"
    },
    {
      "title": "⚠️ Stress & Challenges",
      "content": "very detailed easy-to-read challenge analysis"
    },
    {
      "title": "✨ Hidden Strengths",
      "content": "very detailed easy-to-read strengths analysis"
    },
    {
      "title": "🌱 Current Life Phase",
      "content": "very detailed easy-to-read current energy analysis"
    },
    {
      "title": "💭 Final Reflection",
      "content": "emotionally powerful concluding reflection"
    }
  ]
}

IMPORTANT:
- Keep the user's original palm image untouched.
- Only include meaningful annotations.
- Avoid clutter.
- Make the report highly readable on mobile.
- Use emotionally engaging formatting.

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
      title: "Your Palm Reflection",
      summary:
        "You seem like someone who feels things deeply but rarely shows everything immediately. Your palm reflects a thoughtful personality that tends to observe first, process internally, and open up slowly over time.",
      quick_highlights: [
        {
          icon: "❤️",
          title: "Emotionally Careful",
          description:
            "You usually take time before fully trusting people emotionally.",
        },
        {
          icon: "🧠",
          title: "Deep Thinker",
          description:
            "You tend to replay situations in your mind and think deeply before reacting.",
        }
      ],
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
          title: "❤️ Emotional Side",
          content:
            "You probably feel emotions much more strongly than people realize. Even when something affects you deeply, you often keep your reactions controlled on the outside. People may see you as calm, but internally you tend to think and feel a lot more beneath the surface."
        }
      ]
    };
  }
}
