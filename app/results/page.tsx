"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Heart, Sparkles, Stars } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPalmUpload } from "@/lib/palm-upload-session";
import { useEffect, useState } from "react";
import { AnimatedPalmViewer } from "@/components/palm/animated-palm-viewer";

const insights = [
  {
    title: "Emotional Pattern",
    icon: Heart,
    text: "You tend to protect emotions carefully until trust feels completely safe.",
  },
  {
    title: "Thinking Style",
    icon: Brain,
    text: "Strong intuition mixed with deep internal analysis shapes your decisions.",
  },
  {
    title: "Energy Signature",
    icon: Sparkles,
    text: "Your energy becomes strongest when working independently toward meaningful goals.",
  },
];

export default function ResultsPage() {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const stored = getPalmUpload();

    if (stored) {
      setPreview(stored);
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-5 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,164,107,0.16),transparent_28rem)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary">
              AI Palm Reading
            </p>

            <h1 className="mt-3 font-display text-5xl leading-none md:text-7xl">
              Your reading is ready
            </h1>
          </div>

          <div className="hidden md:grid size-14 place-items-center rounded-3xl bg-primary/10 text-primary md:grid">
            <Stars className="size-6" />
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <AnimatedPalmViewer imageUrl={preview} />

          <div className="space-y-5">
            {insights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6 shadow-glow backdrop-blur-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-primary">
                        Insight
                      </p>

                      <h2 className="mt-1 font-display text-3xl">
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  <p className="mt-5 text-base leading-8 text-foreground/90">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="rounded-[2rem] border border-primary/20 bg-primary/10 p-6"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-primary">
                Next Step
              </p>

              <h3 className="mt-3 font-display text-4xl leading-tight">
                Save your reading and unlock AI conversations.
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                Continue with Google to store your palm reading, future reports, and AI insights securely.
              </p>

              <Button asChild size="lg" className="mt-6">
                <Link href="/auth">
                  Continue with Google
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
