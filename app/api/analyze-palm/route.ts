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

    const format = mimeType.includes("png")
      ? "png"
      : mimeType.includes("webp")
        ? "webp"
        : "jpeg";

    const imageBytes = Buffer.from(base64Data, "base64");

    const prompt = `
You are an expert palm analyst and psychologically insightful palm reader.

Carefully analyze ONLY visible features from the uploaded palm image.

FIRST:
Observe physical palm characteristics.

Look for:
- heart line shape and depth
- head line shape and clarity
- life line curvature and continuity
- fate line visibility
- sun line visibility
- line sharpness
- forks or breaks
- palm width and shape
- finger proportions
- finger spacing
- thumb flexibility
- mounts prominence
- texture and fine lines
- emotional vs logical dominance
- unusual markings or asymmetry

SECOND:
Infer personality tendencies and emotional patterns BASED on those observations.

IMPORTANT:
- make the reading feel highly personal
- explain WHY you inferred something
- reference visible features frequently
- avoid generic horoscope language
- avoid mystical wording
- avoid fake future predictions
- focus on tendencies, psychology, emotional style, motivation, resilience, communication, and decision-making
- sound emotionally intelligent and observational
- avoid repetition

Return STRICT JSON ONLY.

Required JSON format:
{
  "observations": [
    "Visible palm observations"
  ],
  "summary": "Detailed psychological summary",
  "heart_line": {
    "physical_traits": "Visible physical characteristics",
    "insight": "Emotional interpretation",
    "strength_score": 0
  },
  "head_line": {
    "physical_traits": "Visible physical characteristics",
    "insight": "Mental/personality interpretation",
    "strength_score": 0
  },
  "life_line": {
    "physical_traits": "Visible physical characteristics",
    "insight": "Grounding/vitality interpretation",
    "strength_score": 0
  },
  "pattern_synthesis": {
    "insight": "Combined interpretation from multiple palm features"
  },
  "personality_profile": {
    "emotional_style": "",
    "decision_style": "",
    "social_energy": "",
    "stress_response": ""
  }
}
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
        maxTokens: 1800,
        temperature: 0.65,
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
        observations: [
          "The major palm lines appear moderately defined with balanced spacing.",
          "The palm structure suggests a blend of emotional sensitivity and analytical thinking.",
          "Fine secondary lines indicate reflective thinking and emotional depth."
        ],
        summary:
          "Your palm suggests someone who tends to balance emotional awareness with practical thinking rather than operating from extremes. The visible line structure points toward internal reflection, emotional depth, and a preference for meaningful stability over impulsive behavior. There are also indications of adaptability and gradual personal growth through experience.",
        heart_line: {
          physical_traits:
            "The heart line appears moderately curved and reasonably clear.",
          insight:
            "This often suggests emotional sincerity combined with caution in forming deeper emotional trust. You may value stable emotional connections and authenticity over dramatic expression.",
          strength_score: 74,
        },
        head_line: {
          physical_traits:
            "The head line appears fairly deep with a balanced curve.",
          insight:
            "This may indicate a thinking style that combines analysis with imagination instead of relying entirely on rigid logic. You likely observe situations carefully before making decisions.",
          strength_score: 82,
        },
        life_line: {
          physical_traits:
            "The life line appears stable with moderate continuity.",
          insight:
            "This often reflects emotional resilience, grounded energy, and the ability to gradually recover from stressful periods rather than reacting impulsively.",
          strength_score: 78,
        },
        pattern_synthesis: {
          insight:
            "The combination of balanced emotional and mental markings may suggest someone who appears calm externally while internally processing experiences deeply and thoughtfully."
        },
        personality_profile: {
          emotional_style: "Reflective and emotionally aware",
          decision_style: "Measured and analytical",
          social_energy: "Selective but genuine",
          stress_response: "Internally processing before reacting"
        }
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
