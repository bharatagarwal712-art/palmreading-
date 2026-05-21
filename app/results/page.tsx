"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Stars } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPalmUpload } from "@/lib/palm-upload-session";
import { useEffect, useState } from "react";
import { AnnotatedPalmImage } from "@/components/palm/annotated-palm-image";

const reportSections = [
  {
    title: "Emotional Profile",
    text: "Your palm reflects someone who experiences emotions deeply but reveals them selectively. The heart line suggests emotional caution combined with long-term loyalty once trust is established. You appear observant in relationships and emotionally analytical before fully opening up.",
  },
  {
    title: "Relationship Patterns",
    text: "You seek emotionally intelligent connections where depth, consistency, and emotional maturity matter more than surface excitement. Your palm indicates strong emotional memory and sensitivity to emotional imbalance within close relationships.",
  },
  {
    title: "Career & Ambition",
    text: "The structure of your head line and central palm area suggests strong independent thinking patterns. You perform best in environments where autonomy, creativity, and strategic thinking are valued over rigid structure.",
  },
  {
    title: "Current Life Energy",
    text: "Your palm currently reflects transition energy — a phase involving internal restructuring, emotional clarity, and deeper self-awareness. Rather than dramatic external change, your energy suggests quiet psychological evolution.",
  },
  {
    title: "Inner Challenges",
    text: "One recurring pattern visible in your palm is internal over-analysis. You often mentally process situations deeply before acting, which can create hesitation during emotionally uncertain periods.",
  },
  {
    title: "Hidden Strengths",
    text: "Your strongest underlying trait appears to be emotional resilience. Even during uncertainty or emotional pressure, your patterns suggest an ability to reorganize internally and recover with stronger clarity over time.",
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

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary">
              Psychological Palm Reflection
            </p>

            <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none md:text-7xl">
              Your palm reflects emotional depth and intuitive intelligence.
            </h1>
          </div>

          <div className="hidden md:grid size-14 place-items-center rounded-3xl bg-primary/10 text-primary md:grid">
            <Stars className="size-6" />
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <AnnotatedPalmImage imageUrl={preview} />

            <div className="rounded-[2rem] border border-primary/15 bg-primary/10 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-primary">
                Palm Summary
              </p>

              <p className="mt-4 text-base leading-8 text-foreground/90">
                Your palm suggests a personality shaped by emotional observation, reflective intelligence, and resilience during transitional periods. You appear driven by meaning and internal alignment rather than impulsive external validation.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {reportSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-7 shadow-glow backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-primary">
                  Analysis
                </p>

                <h2 className="mt-3 font-display text-4xl leading-tight">
                  {section.title}
                </h2>

                <p className="mt-5 text-base leading-8 text-foreground/90">
                  {section.text}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="rounded-[2rem] border border-primary/20 bg-primary/10 p-7"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-primary">
                Continue Your Reading
              </p>

              <h3 className="mt-3 font-display text-4xl leading-tight">
                Save your palm analysis and unlock AI conversations.
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                Continue with Google to store your annotated palm analysis, future reports, and personalized AI reflections securely.
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
