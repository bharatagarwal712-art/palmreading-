"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Heart,
  Lock,
  Sparkles,
  Stars,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPalmUpload } from "@/lib/palm-upload-session";
import { useEffect, useState } from "react";
import { AnnotatedPalmImage } from "@/components/palm/annotated-palm-image";
import { supabase } from "@/lib/supabase/client";

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
];

export default function ResultsPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const stored = getPalmUpload();
    if (stored) setPreview(stored);

    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background px-4 py-5 md:px-6 md:py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,164,107,0.16),transparent_28rem)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-5 flex items-center justify-between rounded-[1.5rem] border border-white/[0.08] bg-white/[0.04] px-4 py-3 backdrop-blur-xl md:px-5 md:py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-primary/10 text-primary md:size-11">
              <Sparkles className="size-5" />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-primary">
                AI Palm Reading
              </p>

              <h2 className="text-base font-semibold md:text-lg">
                PalmReflect
              </h2>
            </div>
          </Link>

          <div className="rounded-full border border-primary/15 bg-primary/10 px-3 py-2 text-[11px] text-primary md:px-4 md:text-xs">
            {userEmail ?? "Guest"}
          </div>
        </header>

        {!userEmail && (
          <div className="sticky top-3 z-40 mb-5">
            <div className="rounded-[1.6rem] border border-white/[0.08] bg-black/60 p-4 shadow-2xl backdrop-blur-xl md:p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Lock className="size-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold leading-tight md:text-xl">
                      Your palm reading is ready
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Continue with Google to unlock your complete reflection and AI conversation.
                    </p>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full md:w-auto">
                  <Link href="/auth">
                    Continue with Google
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className={!userEmail ? "pointer-events-none select-none blur-md opacity-70" : ""}>
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
          </motion.div>

          <div className="grid gap-5 md:gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4 md:space-y-6">
              <div className="overflow-hidden rounded-[2rem]">
                <AnnotatedPalmImage imageUrl={preview} />
              </div>

              <div className="rounded-[1.6rem] border border-primary/15 bg-primary/10 p-5 backdrop-blur-xl md:p-6">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-2xl bg-primary/15 text-primary md:size-12">
                    <Stars className="size-4 md:size-5" />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-primary md:text-xs">
                      Personality Snapshot
                    </p>

                    <h2 className="mt-1 text-lg font-semibold md:text-2xl">
                      Quietly Intense & Thoughtful
                    </h2>
                  </div>
                </div>

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
                    <div key={item.title} className="rounded-[1.3rem] border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-xl">
                      <div className="flex items-center gap-2">
                        <div className="grid size-8 place-items-center rounded-xl bg-primary/10 text-primary">
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
        </div>
      </div>
    </main>
  );
}
