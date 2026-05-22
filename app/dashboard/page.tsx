"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Heart,
  Brain,
  Sparkles,
  Stars,
  TrendingUp,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPalmUpload } from "@/lib/palm-upload-session";
import { useEffect, useState } from "react";

const aiQuestions = [
  "Why do I emotionally withdraw sometimes?",
  "What kind of work suits my personality?",
  "What hidden strength stands out in my reading?",
  "Why do I overthink emotionally?",
  "What relationship pattern repeats for me?",
];

const previousReadings = [
  {
    title: "Reflective Growth Phase",
    date: "May 2026",
  },
  {
    title: "Emotional Clarity",
    date: "April 2026",
  },
  {
    title: "Career Reorientation",
    date: "March 2026",
  },
];

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
    text:
      "Your overall palm structure suggests a thoughtful personality that prefers understanding situations deeply before acting.\n\nYour energy feels grounded yet emotionally aware.",
  },
  {
    emoji: "❤️",
    title: "Heart Line Reading",
    insight:
      "You value emotional safety, loyalty, and depth over surface-level connection.",
    text:
      "Your emotional patterns suggest someone who forms attachments carefully rather than instantly.\n\nYou become deeply loyal once emotionally connected.",
  },
  {
    emoji: "🧠",
    title: "Head Line Reading",
    insight:
      "Your mind combines analysis with imagination and emotional intelligence.",
    text:
      "Your thinking style appears reflective and layered.\n\nYou naturally analyze situations from multiple angles before deciding.",
  },
];

export default function DashboardPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [questionCount] = useState(5);
  const [showDrawer, setShowDrawer] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const stored = getPalmUpload();

    if (stored) {
      setPreview(stored);
    }
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-4 py-5 pb-36 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">

        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-4 shadow-glow backdrop-blur-xl"
>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
            </motion.div>
          </div>

          <div className="space-y-6">
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="fixed bottom-0 left-0 right-0 z-40 rounded-t-[2rem] border border-white/[0.08] bg-background/90 p-4 shadow-glow backdrop-blur-xl md:sticky md:top-4 md:h-fit md:rounded-[2rem] md:bg-white/[0.04] md:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-primary md:text-xs">
                    AI Palm Conversation
                  </p>

                  <h2 className="mt-2 font-display text-3xl leading-tight md:text-4xl">
                    Ask about your reading
                  </h2>
                </div>

                <div className="rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-xs text-primary">
                  {questionCount} of 5 questions remaining
                </div>
              </div>

              <div className="mt-8 border-t border-white/[0.06] pt-5">
                <div className="flex gap-3">
                  <input
                    placeholder="Ask AI about your palm reading..."
                    className="h-14 flex-1 rounded-2xl border border-white/[0.08] bg-black/20 px-5 text-sm outline-none transition focus:border-primary/30"
                  />

                  <button className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground transition hover:scale-[1.02]">
                    <Sparkles className="size-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      {showDrawer && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDrawer(false)}
          />

          <div className="fixed left-0 top-0 z-50 h-full w-[88%] max-w-sm border-r border-white/[0.08] bg-background p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
                  Palm History
                </p>

                <h2 className="mt-2 text-3xl font-semibold">
                  Previous Readings
                </h2>
              </div>

              <button
                onClick={() => setShowDrawer(false)}
                className="text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mt-8 space-y-3">
              {previousReadings.map((item) => (
                <button
                  key={item.date}
                  className="w-full rounded-[1.5rem] border border-white/[0.08] bg-white/[0.04] p-4 text-left transition hover:border-primary/20 hover:bg-primary/10"
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
                    {item.date}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-foreground/90">
                    {item.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
