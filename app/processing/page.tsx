"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScanLine, Sparkles, Stars } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { getPalmUpload } from "@/lib/palm-upload-session";

const stages = [
  "Detecting emotional lines...",
  "Analyzing personality patterns...",
  "Mapping future tendencies...",
  "Generating AI insights...",
];

export default function ProcessingPage() {
  const [stageIndex, setStageIndex] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const stored = getPalmUpload();

    if (stored) {
      setPreview(stored);
    }
  }, []);

  useEffect(() => {
    const analyzePalm = async () => {
      try {
        const stored = getPalmUpload();

        if (!stored) return;

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const {
          data: { user },
        } = await supabase.auth.getUser();

        const interval = setInterval(() => {
          setStageIndex((current) => {
            if (current >= stages.length - 1) {
              clearInterval(interval);
              return current;
            }

            return current + 1;
          });
        }, 2400);

        const response = await fetch("/api/analyze-palm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: stored,
            userId: user?.id,
          }),
        });

        const data = await response.json();

        console.log("PALM ANALYSIS:", data);

        clearInterval(interval);

        setTimeout(() => {
          window.location.href = "/results";
        }, 1600);
      } catch (error) {
        console.error(error);
      }
    };

    analyzePalm();
  }, []);

  const currentStage = useMemo(() => stages[stageIndex], [stageIndex]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,164,107,0.16),transparent_28rem)]" />

      <div className="absolute inset-0 opacity-40">
        {Array.from({ length: 18 }).map((_, index) => (
          <motion.span
            key={index}
            className="absolute size-1 rounded-full bg-cyan-200/50"
            style={{
              left: `${8 + ((index * 37) % 86)}%`,
              top: `${6 + ((index * 19) % 84)}%`,
            }}
            animate={{
              y: [-10, 16, -10],
              opacity: [0.12, 0.48, 0.12],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 4 + (index % 5),
              repeat: Infinity,
              delay: index * 0.17,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6 shadow-glow backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary">
              AI Palm Scan
            </p>
            <h1 className="mt-2 font-display text-4xl leading-none">
              Reading your palm
            </h1>
          </div>

          <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Stars className="size-5" />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-black/30 aspect-[0.78]">
          {preview ? (
            <Image
              src={preview}
              alt="Uploaded palm preview"
              fill
              className="object-cover opacity-80"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Preparing upload preview...
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20" />

          <motion.div
            className="absolute inset-x-6 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent"
            animate={{
              y: [-40, 420, -40],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/[0.08] bg-black/40 p-4 backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-primary">
              <span>Scan in progress</span>
              <ScanLine className="size-4" />
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-200"
                animate={{
                  width: ["12%", "42%", "74%", "96%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                }}
              />
            </div>
          </div>
        </div>

        <motion.div
          key={currentStage}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5"
        >
          <div className="flex items-center gap-3 text-primary">
            <Sparkles className="size-4" />
            <span className="text-xs uppercase tracking-[0.22em]">
              Processing
            </span>
          </div>

          <p className="mt-4 text-lg leading-8 text-foreground/90">
            {currentStage}
          </p>
        </motion.div>
      </div>
    </main>
  );
}
