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

IMPORTANT:
- make the reading feel deeply personal
- explain WHY you inferred something
- reference visible features naturally
- avoid generic horoscope language
- avoid mystical wording
- avoid fake future predictions
- focus on emotional tendencies, thinking patterns, resilience, ambition, communication, relationships, and decision-making
- sound emotionally intelligent and observational
- avoid repetition
- write with warmth and depth

The summary MUST:
- feel emotionally intelligent
- feel highly personal
- explain behavioral tendencies
- connect multiple palm features together
- be minimum 6 sentences
- never return placeholder text

For heart_line, head_line and life_line insights:
- write detailed 4-6 sentence interpretations
- explain personality tendencies and emotional patterns
- explain interpersonal behavior and internal conflicts
- explain strengths and subtle behavioral nuances
- avoid short generic statements

Return STRICT JSON ONLY.

Required JSON format:
{
  "summary": "Write a deeply personal 6-8 sentence psychological overview combining emotional tendencies, thinking style, resilience, ambition, interpersonal behavior, and overall personality patterns inferred from the palm.",
  "heart_line": {
    "physical_traits": "Visible physical characteristics",
    "insight": "Write a deeply detailed 4-6 sentence emotional and interpersonal interpretation.",
    "strength_score": 78
  },
  "head_line": {
    "physical_traits": "Visible physical characteristics",
    "insight": "Write a deeply detailed 4-6 sentence mental and personality interpretation.",
    "strength_score": 84
  },
  "life_line": {
    "physical_traits": "Visible physical characteristics",
    "insight": "Write a deeply detailed 4-6 sentence grounding and resilience interpretation.",
    "strength_score": 81
  },
  "pattern_synthesis": {
    "insight": "Combined interpretation from multiple palm features"
  },
  "personality_profile": {
    "emotional_style": "Detailed emotional behavior profile",
    "decision_style": "Detailed decision making profile",
    "social_energy": "Detailed social behavior profile",
    "stress_response": "Detailed stress handling profile"
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
        maxTokens: 2200,
        temperature: 0.7,
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
        summary:
          "Your palm reflects a personality that tends to balance emotional awareness with practical thinking rather than operating from extremes. The visible structure of the major lines suggests someone who prefers stability, internal reflection, and meaningful long-term growth over impulsive choices. There are signs of emotional restraint, but also genuine warmth once trust is established. Mentally, the palm indicates careful observation, analytical thinking, and a tendency to process situations deeply before reacting outwardly. The overall balance between emotional and mental markings suggests a composed personality that values clarity, consistency, and emotional control. There are also indications of resilience and adaptability, especially during stressful or uncertain phases of life.",
        heart_line: {
          physical_traits:
            "The heart line appears moderately curved and reasonably clear.",
          insight:
            "This line often suggests someone who values emotional sincerity but does not open up immediately to everyone. You may prefer emotional stability and consistency over highly dramatic or unpredictable relationships. There is likely a tendency to internally process emotions before expressing them outwardly, which can make you appear calm even during emotionally intense moments. At the same time, the balanced structure of the line suggests loyalty and emotional reliability once trust is formed. You may naturally seek depth, authenticity, and emotional security in close relationships rather than surface-level connection.",
          strength_score: 78,
        },
        head_line: {
          physical_traits:
            "The head line appears fairly deep with a balanced curve.",
          insight:
            "This line suggests a thinking style that combines practical analysis with imagination and internal reflection. You are likely someone who carefully evaluates situations before making decisions instead of reacting impulsively. The clarity of the line also points toward focus, mental discipline, and the ability to remain composed under pressure. At times, you may spend significant time mentally processing possibilities before acting, especially in important situations. The overall structure suggests someone who values thoughtful planning, intellectual growth, and understanding the deeper meaning behind experiences.",
          strength_score: 84,
        },
        life_line: {
          physical_traits:
            "The life line appears stable with moderate continuity.",
          insight:
            "This line often reflects emotional resilience, grounded energy, and the ability to gradually recover from stressful experiences. Rather than reacting dramatically to challenges, you may naturally prefer stability, patience, and steady progress. The continuity of the line also suggests adaptability and a practical approach toward managing responsibilities and long-term goals. There may be a strong desire to create security and consistency in both personal and professional life. Overall, the line points toward someone who tends to build strength gradually through experience, discipline, and emotional maturity.",
          strength_score: 81,
        },
        pattern_synthesis: {
          insight:
            "The combination of balanced emotional and mental markings suggests someone who appears calm externally while internally processing experiences deeply and thoughtfully. There is a noticeable blend of emotional awareness, analytical thinking, and resilience, which may help you navigate situations with composure and careful judgment."
        },
        personality_profile: {
          emotional_style: "You tend to process emotions internally before expressing them openly, which can make you appear calm and emotionally steady even during intense situations.",
          decision_style: "You are likely to prefer thoughtful and structured decision-making rather than impulsive reactions, especially when situations carry long-term consequences.",
          social_energy: "You may be socially selective rather than overly outgoing, preferring meaningful and emotionally genuine interactions over superficial connections.",
          stress_response: "You likely handle stress by mentally processing situations carefully and gradually adapting instead of reacting immediately or emotionally."
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
