"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Clock3,
  Heart,
  MessageCircle,
  Sparkles,
  Stars,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPalmUpload } from "@/lib/palm-upload-session";
import { useEffect, useState } from "react";

const readings = [
  {
    title: "Emotional Pattern",
    value: "Highly intuitive",
    icon: Heart,
  },
  {
    title: "Thinking Style",
    value: "Reflective and analytical",
    icon: Brain,
  },
  {
    title: "Energy Signature",
    value: "Independent creator energy",
    icon: Sparkles,
  },
];

const questions = [
  "Why do I emotionally withdraw sometimes?",
  "What kind of work suits my energy?",
  "What relationship pattern repeats for me?",
];

export default function DashboardPage() {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const stored = getPalmUpload();

    if (stored) {
      setPreview(stored);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Stars className="size-5" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-primary">
                AI Palm Reading
              </p>

              <h1 className="font-display text-2xl">Dashboard</h1>
            </div>
          </div>

          <div className="mt-10 space-y-2">
            {[
              "My Readings",
              "AI Questions",
              "Past Reports",
              "Saved Insights",
            ].map((item) => (
              <button
                key={item}
                className="flex w-full items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-4 text-left text-sm transition hover:border-primary/25 hover:bg-primary/10"
              >
                {item}
                <ArrowRight className="size-4 text-muted-foreground" />
              </button>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-primary/20 bg-primary/10 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-primary">
              AI Companion
            </p>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Continue exploring emotional patterns and future insights through AI conversations.
            </p>

            <Button asChild className="mt-5 w-full">
              <Link href="/results">
                View latest reading
              </Link>
            </Button>
          </div>
        </aside>

        <section className="relative overflow-hidden px-5 py-8 md:px-8 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,164,107,0.14),transparent_28rem)]" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-primary">
                  Personal AI Reading Space
                </p>

                <h2 className="mt-3 font-display text-5xl leading-none md:text-7xl">
                  Welcome back
                </h2>
              </div>

              <Button asChild size="lg">
                <Link href="/">
                  Upload another palm
                </Link>
              </Button>
            </motion.div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-4 shadow-glow backdrop-blur-xl"
              >
                <div className="relative aspect-[0.78] overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-black/30">
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Palm preview"
                      fill
                      className="object-cover opacity-85"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      Your latest palm scan will appear here.
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20" />
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-black/20 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary">
                      Latest Reading
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Generated moments ago from your uploaded palm.
                    </p>
                  </div>

                  <Clock3 className="size-5 text-primary" />
                </div>
              </motion.div>

              <div className="space-y-5">
                <div className="grid gap-5 md:grid-cols-3">
                  {readings.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.08 }}
                        className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-5 shadow-glow backdrop-blur-xl"
                      >
                        <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="size-5" />
                        </div>

                        <p className="mt-5 text-xs uppercase tracking-[0.2em] text-primary">
                          {item.title}
                        </p>

                        <h3 className="mt-3 font-display text-2xl leading-tight">
                          {item.value}
                        </h3>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6 shadow-glow backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <MessageCircle className="size-5" />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-primary">
                        AI Questions
                      </p>

                      <h3 className="mt-1 font-display text-3xl">
                        Continue the conversation
                      </h3>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {questions.map((question) => (
                      <button
                        key={question}
                        className="flex w-full items-center justify-between rounded-2xl border border-white/[0.08] bg-black/20 px-4 py-4 text-left text-sm transition hover:border-primary/30 hover:bg-primary/10"
                      >
                        {question}
                        <ArrowRight className="size-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
