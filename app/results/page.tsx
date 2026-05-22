"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Heart,
  Sparkles,
  Stars,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPalmUpload } from "@/lib/palm-upload-session";
import { useEffect, useState } from "react";
import { AnnotatedPalmImage } from "@/components/palm/annotated-palm-image";

const highlights = [
  {
    icon: Heart,
    title: "Emotionally Deep",
    text: "You feel emotions intensely but reveal them selectively.",
  },
  {
    icon: Brain,
    title: "Reflective Thinker",
    text: "You mentally process situations deeply before reacting.",
  },
  {
    icon: TrendingUp,
    title: "Quietly Ambitious",
    text: "You grow steadily through consistency rather than impulse.",
  },
  {
    icon: Sparkles,
    title: "Strong Intuition",
    text: "You notice emotional patterns others often miss.",
  },
];

const reportSections = [
  {
    emoji: "✋",
    title: "Hand Overview",
    insight:
      "Your palm reflects someone who balances emotional depth with careful observation.",
    text: "Your overall palm structure suggests a thoughtful personality that prefers understanding situations deeply before acting. You likely notice emotional tone, hidden intentions, and subtle behavioral patterns more quickly than most people around you. Rather than reacting impulsively, you tend to observe first and process internally.\n\nYour energy feels grounded yet emotionally aware. This combination often appears in people who value stability, meaningful relationships, and personal growth over short-term excitement. You may appear calm externally even during emotionally intense periods.",
  },
  {
    emoji: "❤️",
    title: "Heart Line Reading",
    insight:
      "You value emotional safety, loyalty, and depth over surface-level connection.",
    text: "Your emotional patterns suggest someone who forms attachments carefully rather than instantly. You may take time before fully trusting people, but once emotionally connected, you become deeply loyal and supportive.\n\nOne strong trait visible in your emotional energy is emotional memory. You tend to remember how people made you feel for a long time. This can make you very compassionate, but it can also lead to overthinking emotional situations internally.",
  },
  {
    emoji: "🧠",
    title: "Head Line Reading",
    insight:
      "Your mind combines analysis with imagination and emotional intelligence.",
    text: "Your thinking style appears reflective and layered. Instead of making quick surface-level judgments, you naturally analyze situations from multiple angles before deciding. This often helps you avoid careless mistakes, though it may sometimes create hesitation during uncertain situations.\n\nYou likely learn best through experience, observation, and internal reflection rather than rigid memorization. Creative problem-solving and intuitive thinking seem stronger for you than repetitive structure.",
  },
  {
    emoji: "🚀",
    title: "Career & Ambition",
    insight:
      "You perform best when your work feels meaningful and self-directed.",
    text: "Your palm reflects independent ambition rather than aggressive competition. You seem motivated by purpose, growth, and internal satisfaction more than external validation alone.\n\nYou likely thrive in environments where creativity, strategic thinking, or emotional understanding matter. Strictly repetitive systems may mentally exhaust you over time because your energy naturally seeks evolution and improvement.",
  },
  {
    emoji: "🌱",
    title: "Current Life Phase",
    insight:
      "You are entering a phase of emotional clarity and internal restructuring.",
    text: "Your current energy suggests reflection, transition, and deeper self-awareness. This does not necessarily mean dramatic external change — instead, it often points toward psychological growth and emotional maturity developing internally.\n\nYou may currently feel more selective about people, opportunities, and environments than before. This usually happens when someone begins aligning more strongly with their personal values.",
  },
  {
    emoji: "✨",
    title: "Final Reflection",
    insight:
      "Your greatest strength is emotional resilience combined with quiet intelligence.",
    text: "Your palm reflects someone who grows through reflection rather than impulse. Even when situations become emotionally difficult, you seem capable of reorganizing yourself internally and returning stronger with better clarity.\n\nOne of your strongest hidden traits is adaptability. While others may notice your calm nature first, your deeper strength comes from your ability to quietly evolve without losing your core values.",
  },
];

export default function ResultsPage() {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const stored = getPalmUpload();

    if (stored) {
      setPreview(stored);
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background px-4 py-6 md:px-5 md:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,164,107,0.16),transparent_28rem)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-10"
        >
          <p className="text-[10px] uppercase tracking-[0.28em] text-primary md:text-xs">
            Premium Palm Reflection
          </p>

          <h1 className="mt-3 max-w-4xl font-display text-3xl leading-tight md:mt-4 md:text-7xl md:leading-none">
            Your palm reflects emotional intelligence, resilience, and deep inner reflection.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:mt-6 md:text-base md:leading-8">
            This reading combines traditional palmistry symbolism with emotionally reflective personality interpretation.
          </p>
        </motion.div>

        <div className="grid gap-5 md:gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4 md:space-y-6 lg:sticky lg:top-8 lg:self-start">
            <div className="overflow-hidden rounded-[2rem]">
              <AnnotatedPalmImage imageUrl={preview} />
            </div>

            <div className="rounded-[1.6rem] border border-primary/15 bg-primary/10 p-5 backdrop-blur-xl md:rounded-[2rem] md:p-6">
              <div className="flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary md:size-12">
                  <Stars className="size-4 md:size-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-primary md:text-xs">
                    Personality Snapshot
                  </p>

                  <h2 className="mt-1 text-lg font-semibold leading-tight md:text-2xl">
                    Quietly Intense & Thoughtful
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-foreground/90">
                Your palm suggests someone who processes emotions deeply, thinks carefully before acting, and values meaningful growth over temporary excitement.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Emotionally Aware",
                  "Independent",
                  "Reflective",
                  "Intuitive",
                  "Resilient",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-foreground/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[1.3rem] border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </div>

                      <h3 className="text-sm font-semibold leading-5">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-xs leading-6 text-muted-foreground md:text-sm">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 md:space-y-5">
            {reportSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-white/[0.04] p-5 shadow-glow backdrop-blur-xl md:p-7"
              >
                <div className="flex items-start gap-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-xl md:size-12 md:text-2xl">
                    {section.emoji}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary md:text-xs">
                      Palm Analysis
                    </p>

                    <h2 className="mt-1 break-words font-display text-2xl leading-tight md:text-3xl">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-primary/10 bg-primary/5 p-4 md:mt-6 md:p-5">
                  <p className="text-base italic leading-7 text-foreground/90 md:text-lg md:leading-8">
                    “{section.insight}”
                  </p>
                </div>

                <div className="mt-5 space-y-5 text-sm leading-7 text-foreground/90 md:mt-6 md:text-base md:leading-8">
                  {section.text.split("\n\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 rounded-[1.6rem] border border-primary/20 bg-primary/10 p-5 md:mt-8 md:rounded-[2rem] md:p-7"
        >
          <p className="text-[10px] uppercase tracking-[0.24em] text-primary md:text-xs">
            Continue Your Journey
          </p>

          <h3 className="mt-3 max-w-2xl font-display text-2xl leading-tight md:text-4xl">
            Save your readings and unlock future AI palm reflections.
          </h3>

          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Continue with Google to securely save your palm readings, future reports, and personalized AI insights.
          </p>

          <Button asChild size="lg" className="mt-5 w-full md:mt-6 md:w-fit">
            <Link href="/auth">
              Continue with Google
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
