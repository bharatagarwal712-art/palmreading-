"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Heart,
  Lock,
  Sparkles,
  Stars,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPalmUpload } from "@/lib/palm-upload-session";
import { useEffect, useState } from "react";
import { AnnotatedPalmImage } from "@/components/palm/annotated-palm-image";
import { supabase } from "@/lib/supabase/client";

const highlights = [{ icon: Heart, title: "Emotionally Deep", text: "You feel emotions intensely but reveal them selectively." }, { icon: Brain, title: "Reflective Thinker", text: "You mentally process situations deeply before reacting." }, { icon: TrendingUp, title: "Quietly Ambitious", text: "You grow steadily through consistency rather than impulse." }, { icon: Sparkles, title: "Strong Intuition", text: "You notice emotional patterns others often miss." }];

export default function ResultsPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const stored = getPalmUpload();
    if (stored) setPreview(stored);

    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background px-4 py-5 md:px-6 md:py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,164,107,0.16),transparent_28rem)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-6 flex items-center justify-between rounded-[1.6rem] border border-white/[0.08] bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-primary">
                AI Palm Reading
              </p>
              <h2 className="text-lg font-semibold">
                PalmReflect
              </h2>
            </div>
          </Link>

          {userEmail ? (
            <div className="rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-xs text-primary">
              {userEmail}
            </div>
          ) : (
            <Button asChild size="sm">
              <Link href="/auth">
                Continue with Google
              </Link>
            </Button>
          )}
        </header>

        <div className="relative">
          {!userEmail && (
            <div className="absolute inset-0 z-30 flex items-center justify-center rounded-[2rem] bg-background/40 backdrop-blur-md">
              <div className="mx-4 max-w-md rounded-[2rem] border border-white/[0.08] bg-black/50 p-7 text-center shadow-2xl backdrop-blur-xl">
                <div className="mx-auto grid size-16 place-items-center rounded-3xl bg-primary/10 text-primary">
                  <Lock className="size-7" />
                </div>

                <h2 className="mt-6 font-display text-3xl leading-tight">
                  Your palm reading is ready
                </h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Sign in with Google to unlock your complete AI palm reflection, future readings, and personalized conversations.
                </p>

                <Button asChild size="lg" className="mt-6 w-full">
                  <Link href="/auth">
                    Continue with Google
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}

          <div className={!userEmail ? "pointer-events-none select-none blur-md" : ""}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 md:mb-10"
            >
              <p className="text-[10px] uppercase tracking-[0.28em] text-primary md:text-xs">
                Premium Palm Reflection
              </p>

              <h1 className="mt-3 max-w-4xl font-display text-3xl leading-tight md:text-7xl md:leading-none">
                Your palm reflects emotional intelligence, resilience, and deep inner reflection.
              </h1>
            </motion.div>

            <div className="grid gap-5 md:gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-4 md:space-y-6">
                <div className="overflow-hidden rounded-[2rem]">
                  <AnnotatedPalmImage imageUrl={preview} />
                </div>

                <div className="rounded-[1.6rem] border border-primary/15 bg-primary/10 p-5 backdrop-blur-xl md:p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-2xl bg-primary/15 text-primary md:size-12">
                      <Stars className="size-4 md:size-5" />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-primary md:text-xs">
                        Personality Snapshot
                      </p>

                      <h2 className="mt-1 text-lg font-semibold md:text-2xl">
                        Quietly Intense & Thoughtful
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {highlights.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title} className="rounded-[1.3rem] border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-xl">
                        <div className="flex items-center gap-2">
                          <div className="grid size-8 place-items-center rounded-xl bg-primary/10 text-primary">
                            <Icon className="size-4" />
                          </div>

                          <h3 className="text-sm font-semibold leading-5">
                            {item.title}
                          </h3>
                        </div>

                        <p className="mt-3 text-xs leading-6 text-muted-foreground md:text-sm">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.8rem] border border-white/[0.08] bg-white/[0.04] p-5 shadow-glow backdrop-blur-xl md:p-7">
                  <h2 className="font-display text-3xl">
                    Your AI palm reflection
                  </h2>

                  <p className="mt-5 text-base leading-8 text-foreground/90">
                    Your overall palm structure suggests a thoughtful personality that prefers understanding situations deeply before acting. You likely notice emotional tone, hidden intentions, and subtle behavioral patterns more quickly than most people around you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
