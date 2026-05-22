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
  Menu,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

import { getPalmUpload } from "@/lib/palm-upload-session";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type PalmLine = {
  insight?: string;
  path?: string;
};

type Reading = {
  id: string;
  summary?: string;
  heart_line?: PalmLine;
  head_line?: PalmLine;
  life_line?: PalmLine;
};

const highlights = [
  {
    icon: Heart,
    title: "Emotionally Deep",
    text: "You process emotions deeply but reveal them selectively.",
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

export default function DashboardPage() {
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
  const [showDrawer, setShowDrawer] = useState(false);

  const [readingId, setReadingId] = useState<string | null>(
    null
  );

  const [userEmail, setUserEmail] = useState("");

  const [report, setReport] = useState<Reading | null>(null);

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

      setUserEmail(user.email || "");

      const { data: readings } = await supabase
        .from("palm_readings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (!readings?.length) return;

      const latestReading = readings[0] as Reading;

      setReadingId(latestReading.id);

      setReport(latestReading);

      const { data: existingMessages } = await supabase
        .from("ai_messages")
        .select("*")
        .eq("reading_id", latestReading.id)
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

  const logout = async () => {
    await supabase.auth.signOut();

    window.location.href = "/";
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-4 py-5 pb-40 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
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
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <button
                  onClick={() => setShowDrawer(true)}
                  className="grid size-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04]"
                >
                  <Menu className="size-5" />
                </button>

                <Link
                  href="/"
                  className="flex h-12 items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 text-sm"
                >
                  <Home className="size-4" />
                  Home
                </Link>
              </div>

              <p className="text-[10px] uppercase tracking-[0.25em] text-primary">
                AI Palm Reflection
              </p>

              <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-7xl">
                Your Palm Reading
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-primary/15 bg-primary/10 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-primary">
                  Signed In
                </p>

                <p className="mt-1 text-sm font-medium">
                  {userEmail || "Loading..."}
                </p>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
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

          <div className="space-y-6">
            {report && (
              <div className="rounded-[1.8rem] border border-white/[0.08] bg-white/[0.04] p-5 md:p-7">
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
                  AI Palm Analysis
                </p>

                <div className="mt-6 space-y-6">
                  {report?.summary && (
                    <p className="text-base leading-8 text-foreground/90">
                      {report.summary}
                    </p>
                  )}

                  {report?.heart_line?.insight && (
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                      <h3 className="mb-2 text-lg font-semibold">
                        Heart Line
                      </h3>

                      <p className="leading-8 text-muted-foreground">
                        {report.heart_line.insight}
                      </p>
                    </div>
                  )}

                  {report?.head_line?.insight && (
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                      <h3 className="mb-2 text-lg font-semibold">
                        Head Line
                      </h3>

                      <p className="leading-8 text-muted-foreground">
                        {report.head_line.insight}
                      </p>
                    </div>
                  )}

                  {report?.life_line?.insight && (
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                      <h3 className="mb-2 text-lg font-semibold">
                        Life Line
                      </h3>

                      <p className="leading-8 text-muted-foreground">
                        {report.life_line.insight}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="block rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6 sticky top-4">
              <div className="space-y-3 max-h-[340px] overflow-y-auto">
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
        </div>
      </div>

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

                <h2 className="mt-2 text-2xl font-semibold">
                  Navigation
                </h2>
              </div>

              <button
                onClick={() => setShowDrawer(false)}
                className="grid size-11 place-items-center rounded-2xl border border-white/[0.08]"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4"
              >
                <Home className="size-5" />
                <span>Home</span>
              </Link>

              <Link
                href="/upload"
                className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4"
              >
                <Sparkles className="size-5" />
                <span>Upload New Palm</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
