```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock3,
  Heart,
  Brain,
  Sparkles,
  TrendingUp,
  Upload,
  LogOut,
  Home,
} from "lucide-react";

import { useEffect, useState } from "react";

import { getPalmUpload } from "@/lib/palm-upload-session";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
  const supabase = createClientComponentClient();

  const [preview, setPreview] = useState<string | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const [readingId, setReadingId] = useState<string | null>(null);

  useEffect(() => {
    const loadReading = async () => {
      const stored = getPalmUpload();

      if (stored) {
        setPreview(stored);
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: reading } = await supabase
        .from("palm_readings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (!reading) return;

      setReadingId(reading.id);

      const { data: existingMessages } = await supabase
        .from("ai_messages")
        .select("*")
        .eq("reading_id", reading.id)
        .order("created_at", { ascending: true });

      if (existingMessages) {
        setMessages(
          existingMessages.map((msg) => ({
            role: msg.role as "user" | "ai",
            text: msg.content,
          }))
        );
      }
    };

    loadReading();
  }, []);

  const askAI = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    if (readingId) {
      await supabase.from("ai_messages").insert({
        reading_id: readingId,
        role: "user",
        content: userMessage,
      });
    }

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/palm-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.answer ||
            "I could not interpret this right now.",
        },
      ]);

      if (readingId && data.answer) {
        await supabase.from("ai_messages").insert({
          reading_id: readingId,
          role: "ai",
          content: data.answer,
        });
      }

    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "Something went wrong while contacting AI.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-4 py-5 pb-40 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6 shadow-glow backdrop-blur-xl md:p-8"
        >
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

            <div className="max-w-3xl">

              <div className="mb-5 flex items-center gap-3">

                <button
                  onClick={() => setShowDrawer(true)}
                  className="grid size-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04]"
                >
                  ☰
                </button>

                <Link
                  href="/"
                  className="flex h-12 items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 text-sm"
                >
                  <Home className="size-4" />
                  Home
                </Link>

              </div>

              <p className="text-[10px] uppercase tracking-[0.28em] text-primary md:text-xs">
                AI Palm Reflection
              </p>

              <h1 className="mt-3 font-display text-4xl leading-tight md:text-7xl md:leading-none">
                Your emotional energy feels reflective and grounded.
              </h1>

            </div>

            <div className="flex flex-row items-center justify-between gap-3 md:flex-col md:items-end">

              <div className="rounded-2xl border border-primary/15 bg-primary/10 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-primary">
                  Signed In
                </p>

                <p className="mt-1 text-sm font-medium">
                  user@gmail.com
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm">
                <LogOut className="size-4" />
                Logout
              </button>

            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">

          {/* LEFT */}
          <div className="space-y-6">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-4"
            >
              <div className="relative aspect-[0.78] overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-black/30">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Palm preview"
                    fill
                    className="object-cover opacity-90"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
                    Upload a palm image to begin.
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[1.3rem] border border-white/[0.08] bg-white/[0.04] p-4"
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

          {/* RIGHT */}
          <div className="space-y-6">

            <div className="space-y-4 md:space-y-5">
              {reportSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-white/[0.04] p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-xl">
                      {section.emoji}
                    </div>

                    <div className="min-w-0">
                      <h2 className="mt-1 break-words font-display text-2xl leading-tight">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-primary/10 bg-primary/5 p-4">
                    <p className="text-base italic leading-7 text-foreground/90">
                      “{section.insight}”
                    </p>
                  </div>

                  <div className="mt-5 space-y-5 text-sm leading-7 text-foreground/90">
                    {section.text.split("\n\n").map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* DESKTOP CHAT */}
            <motion.div
              className="hidden md:block sticky top-4 h-fit rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6"
            >
              <div className="space-y-3 max-h-[320px] overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl p-4 text-sm leading-7 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/[0.05]"
                    }`}
                  >
                    {message.text}
                  </div>
                ))}

                {loading && (
                  <div className="rounded-2xl bg-white/[0.05] p-4 text-sm">
                    AI is thinking...
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask AI about your palm reading..."
                  className="h-14 flex-1 rounded-2xl border border-white/[0.08] bg-black/20 px-5 text-sm outline-none"
                />

                <button
                  onClick={askAI}
                  className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground"
                >
                  <Sparkles className="size-5" />
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* MOBILE CHAT */}
      <div className="md:hidden">
        {!chatOpen && (
          <button
            onClick={() => setChatOpen(true)}
            className="fixed bottom-5 right-4 z-50 flex items-center gap-3 rounded-full border border-primary/20 bg-background/90 px-5 py-4 shadow-2xl backdrop-blur-xl"
          >
            <Sparkles className="size-5 text-primary" />

            <span className="text-sm font-medium">
              Ask AI
            </span>
          </button>
        )}

        <div
          className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-[2rem] border border-white/[0.08] bg-background/95 p-5 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ${
            chatOpen
              ? "translate-y-0"
              : "translate-y-full"
          }`}
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Ask AI
            </h2>

            <button
              onClick={() => setChatOpen(false)}
              className="text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-3 max-h-[240px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`rounded-2xl p-4 text-sm leading-7 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/[0.05]"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI..."
              className="h-14 flex-1 rounded-2xl border border-white/[0.08] bg-black/20 px-5 text-sm outline-none"
            />

            <button
              onClick={askAI}
              className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground"
            >
              <Sparkles className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
```
