"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Menu, X, Sparkles, Home, LogOut } from "lucide-react";
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

export default function DashboardPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [report, setReport] = useState<Reading | null>(null);
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);

  useEffect(() => {
    const load = async () => {
      const stored = getPalmUpload();
      if (stored) setPreview(stored);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUserEmail(user.email || "");

      const { data } = await supabase
        .from("palm_readings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

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
      { role: "user", text: question },
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
          text: data.answer || "I could not answer that.",
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
    <main className="min-h-screen bg-background px-4 py-5 pb-32">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDrawer(true)}
                className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10"
              >
                <Menu className="h-5 w-5" />
              </button>

              <Link
                href="/"
                className="flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-3"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span>{userEmail}</span>

              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = "/";
                }}
                className="flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-3"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <div className="relative aspect-[0.8] overflow-hidden rounded-3xl bg-black/20">
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

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="mb-5 text-2xl font-semibold">
                AI Palm Reading
              </h2>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">

  {!report && (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm text-muted-foreground">
        Palm reading is still loading...
      </p>
    </div>
  )}

  {report?.summary && (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <h3 className="mb-3 text-xl font-semibold text-white">
        Palm Overview
      </h3>

      <p className="leading-8">
        {report.summary}
      </p>
    </div>
  )}

  {report?.heart_line?.insight && (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <h3 className="mb-3 text-xl font-semibold text-white">
        Heart Line
      </h3>

      <p>
        {report.heart_line.insight}
      </p>
    </div>
  )}

  {report?.head_line?.insight && (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <h3 className="mb-3 text-xl font-semibold text-white">
        Head Line
      </h3>

      <p>
        {report.head_line.insight}
      </p>
    </div>
  )}

  {report?.life_line?.insight && (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <h3 className="mb-3 text-xl font-semibold text-white">
        Life Line
      </h3>

      <p>
        {report.life_line.insight}
      </p>
    </div>
  )}

  <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-4">
    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-yellow-400">
      Debug
    </p>

    <pre className="overflow-auto text-[10px] leading-5 text-yellow-200">
      {JSON.stringify(report, null, 2)}
    </pre>
  </div>

</div>

            <div className="hidden lg:block rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl p-4 text-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/5"
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask AI about your palm"
                  className="h-14 flex-1 rounded-2xl border border-white/10 bg-black/20 px-4"
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
          className="fixed bottom-5 right-5 z-[120] flex items-center gap-2 rounded-full bg-primary px-5 py-4 text-primary-foreground shadow-2xl lg:hidden"
        >
          <Sparkles className="h-5 w-5" />
          Ask AI
        </button>
      )}

      {chatOpen && (
        <div className="fixed inset-0 z-[130] bg-background p-5 lg:hidden">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Ask AI</h2>

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
                className={`rounded-2xl p-4 text-sm ${
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
              placeholder="Ask AI about your palm"
              className="h-14 flex-1 rounded-2xl border border-white/10 bg-black/20 px-4"
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
            className="fixed inset-0 z-[60] bg-black/60"
            onClick={() => setShowDrawer(false)}
          />

          <div className="fixed left-0 top-0 z-[70] h-full w-[88%] max-w-sm bg-background p-5 border-r border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Menu</h2>

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
