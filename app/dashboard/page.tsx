"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  MessageCircle,
  Sparkles,
  Stars,
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

export default function DashboardPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [questionCount] = useState(5);

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
              <p className="text-[10px] uppercase tracking-[0.28em] text-primary md:text-xs">
                AI Palm Reflection
              </p>

              <h1 className="mt-3 font-display text-4xl leading-tight md:text-7xl md:leading-none">
                Your emotional energy feels reflective and grounded.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
                Continue exploring your palm reading through reflective AI conversations and previous readings.
              </p>
            </div>

            <Button asChild size="lg" className="w-full lg:w-[220px]">
              <Link href="/">
                <Upload className="size-4" />
                Upload New Palm
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-4 shadow-glow backdrop-blur-xl"
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
                    Upload a palm image to begin your reflective AI journey.
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20" />
              </div>

              <div className="mt-5 rounded-[1.6rem] border border-primary/15 bg-primary/10 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-primary md:text-xs">
                      Latest Reading
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold leading-tight">
                      Quietly Intense & Thoughtful
                    </h2>
                  </div>

                  <Clock3 className="size-5 shrink-0 text-primary" />
                </div>

                <p className="mt-4 text-sm leading-7 text-foreground/85">
                  Your palm reflects emotional depth, resilience, internal processing, and a strong need for meaningful personal growth.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Reflective",
                    "Emotionally Aware",
                    "Independent",
                    "Intuitive",
                    "Resilient",
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6 shadow-glow backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Stars className="size-5" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-primary md:text-xs">
                    Previous Readings
                  </p>

                  <h2 className="mt-1 font-display text-3xl leading-tight">
                    Your palm history
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {previousReadings.map((item) => (
                  <button
                    key={item.date}
                    className="flex w-full items-center justify-between rounded-[1.5rem] border border-white/[0.08] bg-black/20 px-4 py-4 text-left transition hover:border-primary/25 hover:bg-primary/10"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
                        {item.date}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-foreground/90">
                        {item.title}
                      </p>
                    </div>

                    <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="sticky top-4 h-fit rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6 shadow-glow backdrop-blur-xl"
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

            <div className="mt-8 space-y-4">
              <div className="flex justify-end">
                <div className="max-w-[88%] rounded-[1.6rem] rounded-br-md bg-primary px-5 py-4 text-sm leading-7 text-primary-foreground shadow-lg">
                  Why do I emotionally withdraw sometimes?
                </div>
              </div>

              <div className="flex justify-start">
                <div className="max-w-[92%] rounded-[1.6rem] rounded-bl-md border border-white/[0.08] bg-black/20 px-5 py-4 text-sm leading-7 text-foreground/90 backdrop-blur-xl">
                  Your reading suggests you naturally process emotions internally before expressing them outwardly. This usually appears in people who value emotional safety and prefer understanding their feelings fully before becoming vulnerable.
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {aiQuestions.map((question) => (
                <button
                  key={question}
                  className="flex w-full items-center justify-between rounded-[1.4rem] border border-white/[0.08] bg-black/20 px-4 py-4 text-left text-sm leading-6 transition hover:border-primary/30 hover:bg-primary/10"
                >
                  <span className="max-w-[85%]">
                    {question}
                  </span>

                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                </button>
              ))}
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
    </main>
  );
}
