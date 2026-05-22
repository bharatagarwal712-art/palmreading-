"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  ChevronDown,
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
  },
  {
    icon: Brain,
    title: "Reflective Thinker",
  },
  {
    icon: TrendingUp,
    title: "Quietly Ambitious",
  },
  {
    icon: Sparkles,
    title: "Strong Intuition",
  },
];

const reportSections = [
  {
    emoji: "✋",
    title: "Hand Overview",
    insight:
      "You balance emotional depth with careful observation.",
    text: "You naturally observe emotional patterns before reacting. Your palm reflects someone thoughtful, emotionally aware, and internally reflective.",
  },
  {
    emoji: "❤️",
    title: "Heart Line",
    insight:
      "You value emotional safety and loyalty.",
    text: "You form connections carefully and remember emotional experiences deeply. Once attached, you become highly loyal and emotionally invested.",
  },
  {
    emoji: "🧠",
    title: "Head Line",
    insight:
      "Your thinking style is analytical yet intuitive.",
    text: "You prefer understanding situations deeply before acting. You naturally combine logic, emotional awareness, and creativity.",
  },
  {
    emoji: "🚀",
    title: "Career Energy",
    insight:
      "You thrive when work feels meaningful.",
    text: "Your palm suggests independent ambition and strong self-direction. You perform best in flexible environments that value strategic thinking.",
  },
  {
    emoji: "🌱",
    title: "Current Phase",
    insight:
      "You are entering a period of emotional clarity.",
    text: "Your current energy reflects self-reflection, internal growth, and emotional restructuring rather than sudden external change.",
  },
];

export default function ResultsPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(0);

  useEffect(() => {
    const stored = getPalmUpload();

    if (stored) {
      setPreview(stored);
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-6 md:px-5 md:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,164,107,0.16),transparent_28rem)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
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
            Your palm reflects emotional intelligence and deep inner reflection.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:mt-6 md:text-base md:leading-8">
            Emotionally reflective palm analysis powered by AI interpretation.
          </p>
        </motion.div>

        <div className="grid gap-5 md:gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4 md:space-y-6 lg:sticky lg:top-8 lg:self-start">
            <AnnotatedPalmImage imageUrl={preview} />

            <div className="rounded-[1.6rem] border border-primary/15 bg-primary/10 p-5 backdrop-blur-xl md:rounded-[2rem] md:p-6">
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

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Reflective",
                  "Intuitive",
                  "Resilient",
                  "Independent",
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

            <div className="grid grid-cols-2 gap-3">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[1.3rem] border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="grid size-8 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </div>

                      <h3 className="text-xs font-medium leading-5">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {reportSections.map((section, index) => {
              const isOpen = expanded === index;

              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className="overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl"
                >
                  <button
                    onClick={() =>
                      setExpanded(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-xl">
                        {section.emoji}
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-primary">
                          Palm Analysis
                        </p>

                        <h2 className="mt-1 text-lg font-semibold md:text-2xl">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    <ChevronDown
                      className={`size-5 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/5 px-5 pb-5">
                      <div className="mt-5 rounded-2xl border border-primary/10 bg-primary/5 p-4">
                        <p className="text-sm italic leading-7 text-foreground/90 md:text-base">
                          “{section.insight}”
                        </p>
                      </div>

                      <p className="mt-5 text-sm leading-7 text-foreground/85 md:text-base md:leading-8">
                        {section.text}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="rounded-[1.6rem] border border-primary/20 bg-primary/10 p-5 md:rounded-[2rem] md:p-7"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-primary md:text-xs">
                Continue Your Journey
              </p>

              <h3 className="mt-3 font-display text-2xl leading-tight md:text-4xl">
                Save your readings and unlock future AI reflections.
              </h3>

              <Button asChild size="lg" className="mt-5 w-full md:mt-6 md:w-fit">
                <Link href="/auth">
                  Continue with Google
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
