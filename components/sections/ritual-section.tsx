import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const steps = ["Set intention", "Capture palm", "Await reading"];

export function RitualSection() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.025] py-20 md:py-28">
      <div className="container grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <FadeIn>
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-accent">Onboarding architecture</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-balance md:text-6xl">
              A quiet ritual, not a form.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              The flow is ready for auth, upload, and payment checkpoints while staying
              emotionally immersive on small screens.
            </p>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/onboarding">
                Explore onboarding
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="rounded-lg border border-white/[0.08] bg-black/24 p-5 shadow-glow">
            <div className="mb-5 flex items-center justify-between text-sm text-muted-foreground">
              <span>Reading preparation</span>
              <span>68%</span>
            </div>
            <Progress value={68} />
            <div className="mt-8 space-y-4">
              {steps.map((step, index) => (
                <div
                  className="flex items-center gap-4 rounded-md border border-white/[0.07] bg-white/[0.035] p-4"
                  key={step}
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    {index < 2 ? <Check className="size-4" aria-hidden /> : index + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
