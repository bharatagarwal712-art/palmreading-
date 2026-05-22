"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

import {
  Menu,
  X,
  Sparkles,
  Home,
  LogOut,
  Heart,
  Brain,
  Activity,
} from "lucide-react";

import { getPalmUpload } from "@/lib/palm-upload-session";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type PalmLine = {
  insight?: string;
};

type Reading = {
  id: string;
  summary?: string;
  heart_line?: PalmLine;
  head_line?: PalmLine;
  life_line?: PalmLine;
};

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function ResultsPage() {
  const [preview, setPreview] = useState<string | null>(null);

  const [showDrawer, setShowDrawer] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [userEmail, setUserEmail] = useState("");

  const [report, setReport] = useState<Reading | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const load = async () => {
      const stored = getPalmUpload();

      if (stored) {
        setPreview(stored);
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUserEmail(user.email || "");

      const { data, error } = await supabase
        .from("palm_readings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .single();

      console.log("PALM REPORT:", data, error);

      if (data) {
        setReport(data as Reading);
      }
    };

    load();
  }, []);

  const askAI = async () => {
    if (!input.trim() || loading) return;

    const question = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: question,
      },
    ]);

    setInput("");

    setLoading(true);

    try {
      const response = await fetch("/api/palm-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.answer ||
            "I could not interpret that right now.",
        },
      ]);
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
    <main className="min-h-screen bg-background px-4 py-5 pb-36 md:px-6">

      <div className="mx-auto max-w-7xl space-y-6">

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-3">

              <button
                onClick={() => setShowDrawer(true)}
                className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]"
              >
                <Menu className="h-5 w-5" />
              </button>

              <Link
                href="/"
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>

            </div>

            <div className="flex items-center gap-3">

              <div className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm">
                {userEmail}
              </div>

              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = "/";
                }}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>

            </div>

          </div>

        </div>

        <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">

          <div className="space-y-6">

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4">

              <div className="relative aspect-[0.8] overflow-hidden rounded-[1.7rem] bg-black/20">

                {preview ? (
                  <Image
                    src={preview}
                    alt="Palm"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    No palm uploaded
                  </div>
                )}

              </div>

            </div>

          </div>

          <div className="space-y-6">

            {!report && (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
                <p className="text-sm text-muted-foreground">
                  Palm reading is loading...
                </p>
              </div>
            )}

            {report?.summary && (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">

                <h2 className="text-3xl font-semibold">
                  Palm Overview
                </h2>

                <p className="mt-5 text-base leading-8 text-foreground/90">
                  {report.summary}
                </p>

              </div>
            )}

            {report?.heart_line?.insight && (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">

                <div className="flex items-center gap-3">

                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-pink-500/10 text-pink-400">
                    <Heart className="h-5 w-5" />
                  </div>

                  <h2 className="text-2xl font-semibold">
                    Heart Line
                  </h2>

                </div>

                <p className="mt-5 text-base leading-8 text-foreground/90">
                  {report.heart_line.insight}
                </p>

              </div>
            )}

            {report?.head_line?.insight && (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">

                <div className="flex items-center gap-3">

                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                    <Brain className="h-5 w-5" />
                  </div>

                  <h2 className="text-2xl font-semibold">
                    Head Line
                  </h2>

                </div>

                <p className="mt-5 text-base leading-8 text-foreground/90">
                  {report.head_line.insight}
                </p>

              </div>
            )}

            {report?.life_line?.insight && (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">

                <div className="flex items-center gap-3">

                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                    <Activity className="h-5 w-5" />
                  </div>

                  <h2 className="text-2xl font-semibold">
                    Life Line
                  </h2>

                </div>

                <p className="mt-5 text-base leading-8 text-foreground/90">
                  {report.life_line.insight}
                </p>

              </div>
            )}

            <div className="hidden xl:block rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sticky top-5">

              <div className="space-y-3 max-h-[350px] overflow-y-auto">

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl p-4 text-sm leading-7 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/5"
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
                  placeholder="Ask AI about your palm..."
                  className="h-14 flex-1 rounded-2xl border border-white/10 bg-black/20 px-5 text-sm outline-none"
                />

                <button
                  onClick={askAI}
                  className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground"
                >
                  <Sparkles className="h-5 w-5" />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-5 right-5 z-[120] flex items-center gap-2 rounded-full bg-primary px-5 py-4 text-primary-foreground shadow-2xl xl:hidden"
        >
          <Sparkles className="h-5 w-5" />
          Ask AI
        </button>
      )}

      {chatOpen && (
        <div className="fixed inset-0 z-[130] bg-background p-5 xl:hidden">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-2xl font-semibold">
              Ask AI
            </h2>

            <button
              onClick={() => setChatOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10"
            >
              <X className="h-5 w-5" />
            </button>

          </div>

          <div className="space-y-3 max-h-[70vh] overflow-y-auto">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`rounded-2xl p-4 text-sm leading-7 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5"
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
              placeholder="Ask AI about your palm..."
              className="h-14 flex-1 rounded-2xl border border-white/10 bg-black/20 px-5 text-sm outline-none"
            />

            <button
              onClick={askAI}
              className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground"
            >
              <Sparkles className="h-5 w-5" />
            </button>

          </div>

        </div>
      )}

      {showDrawer && (
        <>

          <div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDrawer(false)}
          />

          <div className="fixed left-0 top-0 z-[70] h-full w-[88%] max-w-sm border-r border-white/10 bg-background p-5">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-semibold">
                Menu
              </h2>

              <button
                onClick={() => setShowDrawer(false)}
                className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <div className="mt-8 space-y-3">

              <Link
                href="/"
                className="block rounded-2xl border border-white/10 p-4"
              >
                Home
              </Link>

              <Link
                href="/upload"
                className="block rounded-2xl border border-white/10 p-4"
              >
                Upload New Palm
              </Link>

            </div>

          </div>

        </>
      )}

    </main>
  );
}
