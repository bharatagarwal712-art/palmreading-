"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Heart,
  Brain,
  MessageCircle,
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
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
