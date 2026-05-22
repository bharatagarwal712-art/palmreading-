"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Brain,
  TrendingUp,
  Home,
  LogOut,
} from "lucide-react";

import { useEffect, useState } from "react";

import { getPalmUpload } from "@/lib/palm-upload-session";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const highlights = [
  {
    icon: Heart,
    title: "Emotionally Deep",
    text: "You feel emotions strongly but reveal them selectively.",
  },
  {
    icon: Brain,
    title: "Reflective Thinker",
    text: "You naturally analyze situations before reacting.",
  },
  {
    icon: TrendingUp,
    title: "Quietly Ambitious",
    text: "You grow steadily through consistency and patience.",
  },
];

const reportSections = [
  {
    emoji: "✋",
    title: "Hand Overview",
    insight:
      "You appear emotionally aware, observant, and internally driven.",
    text:
      "Your palm suggests a thoughtful personality that tends to process emotions deeply before expressing them.\n\nYou seem calm externally but mentally active internally.",
  },
  {
    emoji: "❤️",
    title: "Heart Line",
    insight:
      "You value emotional trust and depth more than surface-level connection.",
    text:
      "You likely take time before opening up emotionally.\n\nOnce attached, you become consistent and loyal.",
  },
  {
    emoji: "🧠",
    title: "Head Line",
    insight:
      "Your thinking combines logic, observation, and emotional intelligence.",
    text:
      "You naturally reflect before making decisions.\n\nYou notice emotional patterns others usually miss.",
  },
];

export default function DashboardPage() {
  const supabase = createClientComponentClient();

  const [preview, setPreview] = useState<string | null>(null);

  const [messages, setMessages] = useState<
    {
      role: "user" | "ai";
      text: string;
    }[]
  >([]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);

  const [readingId, setReadingId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const loadData = async () => {
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
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .single();

      if (!reading) return;

      setReadingId(reading.id);

      const { data: existingMessages } = await supabase
        .from("ai_messages")
        .select("*")
        .eq("reading_id", reading.id)
        .order("created_at", {
          ascending: true,
        });

      if (existingMessages) {
        setMessages(
          existingMessages.map((msg) => ({
            role: msg.role as "user" | "ai",
            text: msg.content,
          }))
        );
      }
    };

    loadData();
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

    setInput("");
    setLoading(true);

    if (readingId) {
      await supabase.from("ai_messages").insert({
        reading_id: readingId,
        role: "user",
        content: userMessage,
      });
    }

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

      const aiReply =
        data.answer ||
        "I could not interpret this right now.";

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: aiReply,
        },
      ]);

      if (readingId) {
        await supabase.from("ai_messages").insert({
          reading_id: readingId,
          role: "ai",
          content: aiReply,
        });
      }

    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong.",
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
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl"
        >

          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

            <div>

              <div className="mb-5 flex items-center gap-3">

                <Link
                  href="/"
                  className="flex h-11 items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 text-sm"
                >
                  <Home className="size-4" />
                  Home
                </Link>

              </div>

              <p className="text-[10px] uppercase tracking-[0.25em] text-primary">
                AI Palm Reflection
              </p>

              <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">
                Your emotional patterns feel thoughtful and reflective.
              </h1>

            </div>

            <div className="flex items-center gap-3">

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

        {/* GRID */}
        <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">

          {/* LEFT */}
          <div className="space-y-6">

            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-4">

              <div className="relative aspect-[0.78] overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-black/20">

                {preview ? (
                  <Image
                    src={preview}
                    alt="Palm preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Upload a palm image.
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

                        <h3 className="text-sm font-semibold">
                          {item.title}
                        </h3>

                      </div>

                      <p className="mt-3 text-xs leading-6 text-muted-foreground">
                        {item.text}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {reportSections.map((section) => (
              <div
                key={section.title}
                className="rounded-[1.8rem] border border-white/[0.08] bg-white/[0.04] p-5"
              >

                <div className="flex items-start gap-3">

                  <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-xl">
                    {section.emoji}
                  </div>

                  <div>

                    <h2 className="text-2xl font-semibold">
                      {section.title}
                    </h2>

                  </div>

                </div>

                <div className="mt-5 rounded-2xl border border-primary/10 bg-primary/5 p-4">
                  <p className="italic leading-7">
                    “{section.insight}”
                  </p>
                </div>

                <div className="mt-5 space-y-4 text-sm leading-7">
                  {section.text
                    .split("\n\n")
                    .map((paragraph) => (
                      <p key={paragraph}>
                        {paragraph}
                      </p>
                    ))}
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>

      {/* MOBILE CHAT */}
      <div className="md:hidden">

        {!chatOpen && (
          <button
            onClick={() => setChatOpen(true)}
            className="fixed bottom-5 right-4 z-50 flex items-center gap-3 rounded-full bg-primary px-5 py-4 text-primary-foreground shadow-2xl"
          >
            <Sparkles className="size-5" />
            Ask AI
          </button>
        )}

        <div
          className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-[2rem] border border-white/[0.08] bg-background p-5 shadow-2xl transition-transform duration-300 ${
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

          <div className="space-y-3 max-h-[300px] overflow-y-auto">

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

          <div className="mt-5 flex gap-3">

            <input
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              placeholder="Ask AI about your palm..."
              className="h-14 flex-1 rounded-2xl border border-white/[0.08] bg-black/20 px-5 text-sm outline-none"
            />

            <button
              onClick={askAI}
              className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground"
            >
              <Sparkles className="size-5" />
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}

