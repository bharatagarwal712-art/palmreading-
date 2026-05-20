import Link from "next/link";
import { ArrowRight, Camera, Heart, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const cards = [
  {
    icon: Heart,
    title: "Choose an intention",
    copy: "Frame the reading around clarity, love, career, or self-understanding.",
  },
  {
    icon: Camera,
    title: "Prepare capture",
    copy: "A camera-first shell is ready for Supabase Storage integration.",
  },
  {
    icon: Sparkles,
    title: "Receive insight",
    copy: "The final surface is prepared for AI-generated reflections and premium unlocks.",
  },
];

export default function OnboardingPage() {
  return (
    <AppShell>
      <section className="container min-h-[calc(100svh-4rem)] py-10 md:py-16">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.22em] text-primary">Onboarding</p>
            <h1 className="mt-4 font-display text-5xl leading-none text-balance md:text-7xl">
              Begin with a question.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground">
              A polished product flow for social traffic: direct, intimate, and ready for
              future authentication gates.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="mx-auto mt-10 max-w-2xl rounded-lg border border-white/[0.08] bg-white/[0.035] p-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Step 1 of 3</span>
              <span className="text-primary">33%</span>
            </div>
            <Progress value={33} />
          </div>
        </FadeIn>
        <div className="mx-auto mt-5 grid max-w-2xl gap-4">
          {cards.map((card, index) => (
            <FadeIn delay={0.08 * index} key={card.title}>
              <Card className="bg-white/[0.035]">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md border border-accent/25 bg-accent/10 text-accent">
                    <card.icon className="size-5" aria-hidden />
                  </span>
                  <CardTitle className="text-2xl">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{card.copy}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.28}>
          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="flex-1">
              <Link href="/auth/sign-in">
                Continue
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="flex-1">
              <Link href="/dashboard">Skip to studio</Link>
            </Button>
          </div>
        </FadeIn>
      </section>
    </AppShell>
  );
}
