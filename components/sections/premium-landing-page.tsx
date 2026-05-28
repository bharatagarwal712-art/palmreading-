"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Brain, Heart, ShieldCheck } from "lucide-react";
import { PremiumHeroV2 } from "@/components/sections/premium-hero-v2";
import { UploadPalmButton } from "@/components/ui/upload-palm-button";

const cards = [
  {
    title: "Heart Line",
    text: "Discover emotional depth, attachment patterns, and relationship tendencies through AI-enhanced palm analysis.",
    icon: Heart,
  },
  {
    title: "Head Line",
    text: "Understand thinking style, intuition, focus, creativity, and analytical tendencies from your palm structure.",
    icon: Brain,
  },
  {
    title: "Life Line",
    text: "Reveal resilience, emotional stability, energy flow, and personality rhythm in a deeply personal report.",
    icon: Sparkles,
  },
];

export function PremiumLandingPage() {
  return (
    <main className="bg-black text-white overflow-hidden">
      <PremiumHeroV2 />

      <section className="relative z-10 border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-primary">
              AI Personality Insight
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">
              A reading experience designed to feel deeply personal.
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.7 }}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="text-2xl font-semibold">
                      {card.title}
                    </h3>
                  </div>

                  <p className="mt-6 text-base leading-8 text-white/70">
                    {card.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.25em] text-primary">
              Why People Love It
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">
              More cinematic than traditional palmistry.
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-9 text-white/70">
              Built as a premium AI experience instead of a generic fortune telling website.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            {[
              "Emotionally intelligent AI responses",
              "Modern cinematic interface",
              "Private & secure upload flow",
              "Beautiful personalized reports",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="text-white/80">{item}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-2xl md:p-16"
        >
          <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
            Begin with your hand.
            <span className="block text-primary">
              Leave with self-awareness.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-white/70">
            Upload a single palm photo and receive a premium AI-generated reading experience.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <UploadPalmButton />

            <Link
              href="/results"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-white transition hover:bg-white/10"
            >
              Continue Reading
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
