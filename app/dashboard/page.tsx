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
    text: "Your overall palm structure suggests a thoughtful personality that prefers understanding situations deeply before acting.",
  },
];

export default function DashboardPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [questionCount] = useState(5);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    const stored = getPalmUpload();

    if (stored) {
      setPreview(stored);
    }
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6 shadow-glow backdrop-blur-xl md:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,164,107,0.14),transparent_28rem)]" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <button
                onClick={() => setShowDrawer(true)}
                className="mb-4 grid size-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04] transition hover:border-primary/20 hover:bg-primary/10"
              >
                ☰
              </button>

              <p className="text-[10px] uppercase tracking-[0.28em] text-primary md:text-xs">
                AI Palm Reflection
              </p>

              <h1 className="mt-3 font-display text-4xl leading-tight md:text-7xl md:leading-none">
                Your emotional energy feels reflective and grounded.
              </h1>
            </div>

            <Button asChild size="lg" className="w-full lg:w-[220px]">
              <Link href="/">
                <Upload className="size-4" />
                Upload New Palm
              </Link>
            </Button>
          </div>
        </motion.div>
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
