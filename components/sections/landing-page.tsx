"use client";

import Link from "next/link";
import {
  ArrowRight,
  Camera,
  ChevronRight,
  Heart,
  MessageCircle,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Star,
  Upload,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const sectionTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

const steps = [
  {
    icon: Upload,
    title: "Upload your palm",
    copy: "Take one clear photo in natural light and let the scan surface prepare it.",
  },
  {
    icon: ScanLine,
    title: "AI reads the lines",
    copy: "The interface is shaped for life, heart, head, and fate-line interpretation.",
  },
  {
    icon: Sparkles,
    title: "Receive your report",
    copy: "A cinematic report format makes insight feel intimate, calm, and shareable.",
  },
];

const reports = [
  {
    title: "Emotional Pattern",
    score: "82%",
    copy: "Your heart line suggests deep feeling, selective trust, and a need for steady emotional rhythm.",
  },
  {
    title: "Focus Signature",
    score: "74%",
    copy: "Your head line points toward intuitive decisions backed by careful observation.",
  },
  {
    title: "Energy Arc",
    score: "91%",
    copy: "Your life line indicates resilient energy that grows strongest with grounded routines.",
  },
];

const questions = [
  "What does my heart line say about love?",
  "Am I in a career transition phase?",
  "What personality pattern stands out most?",
  "Where do I hold emotional tension?",
];

const testimonials = [
  {
    quote: "It felt like a reflective ritual, not a gimmick. The design made me want to finish the reading.",
    name: "Aarohi",
  },
  {
    quote: "The report preview was beautiful enough to share, but still felt private and personal.",
    name: "Meera",
  },
  {
    quote: "The palm scan flow is simple, premium, and instantly understandable from a social ad.",
    name: "Kabir",
  },
];

export function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <ParticleField />
      <Hero />
      <PalmVisualization />
      <HowItWorks />
      <SampleReports />
      <QuestionExamples />
      <Testimonials />
      <FinalCta />
      <StickyMobileCta />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_36%,rgba(128,237,243,0.18),transparent_22rem),radial-gradient(circle_at_22%_18%,rgba(80,33,126,0.5),transparent_24rem)]" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-background to-transparent" />
      <div className="container relative z-10 grid min-h-[calc(100svh-4rem)] gap-10 pb-28 pt-12 md:grid-cols-[0.95fr_1.05fr] md:items-center md:pb-20">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08 }}
          className="flex flex-col justify-end pt-12 md:justify-center"
        >
          <motion.div variants={fadeUp} transition={sectionTransition}>
            <Badge>AI palm reading</Badge>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            transition={sectionTransition}
            className="mt-6 max-w-[9ch] font-display text-6xl leading-[0.9] text-balance text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
          >
            <span className="block">Your palm holds patterns.</span>
            <span className="block">AI reveals them.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={sectionTransition}
            className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg"
          >
            Upload a palm photo and step into a beautifully guided reading experience
            designed for clarity, emotion, and modern self-discovery.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={sectionTransition}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg">
              <Link href="/onboarding">
                <Upload className="size-4" aria-hidden />
                Upload palm
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#sample-reports">
                View sample report
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            variants={fadeUp}
            transition={sectionTransition}
            className="mt-8 flex items-center gap-3 text-xs text-muted-foreground"
          >
            <ShieldCheck className="size-4 text-accent" aria-hidden />
            <span>Private by design. Built for secure upload and premium reports.</span>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-[0.72] w-full max-w-[390px] md:max-w-[460px]"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-px shadow-glow">
            <div className="relative size-full overflow-hidden rounded-[2rem] bg-[#07070b]">
              <div className="absolute inset-0 animate-aura-pulse bg-[radial-gradient(circle_at_52%_42%,rgba(128,237,243,0.24),transparent_17rem)]" />
              <div className="absolute inset-x-8 top-8 h-52 rounded-lg bg-white/[0.04]">
                <div className="absolute inset-0 rounded-lg bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.09)_45%,transparent_60%)]" />
              </div>
              <AnimatedPalm compact />
              <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/[0.08] bg-black/35 p-4 backdrop-blur-md">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-primary">
                    Scan ready
                  </span>
                  <Camera className="size-4 text-accent" aria-hidden />
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: "18%" }}
                    animate={{ width: ["18%", "78%", "42%", "92%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PalmVisualization() {
  return (
    <SectionShell eyebrow="Palm visualization" title="A scan that feels alive.">
      <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={sectionTransition}
          className="relative mx-auto aspect-square w-full max-w-[520px]"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(128,237,243,0.18),transparent_62%)] blur-2xl" />
          <div className="relative grid size-full place-items-center rounded-full border border-white/[0.06] bg-white/[0.025]">
            <AnimatedPalm />
          </div>
        </motion.div>
        <div className="space-y-4">
          {[
            ["Life line", "Vitality, resilience, and grounding patterns."],
            ["Heart line", "Emotional rhythm, connection, and openness."],
            ["Head line", "Focus style, intuition, and decision patterns."],
          ].map(([title, copy], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...sectionTransition, delay: index * 0.08 }}
              className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-5"
            >
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-accent shadow-glow" />
                <h3 className="font-display text-2xl">{title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function HowItWorks() {
  return (
    <SectionShell eyebrow="How it works" title="Three steps, one quiet reveal.">
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...sectionTransition, delay: index * 0.08 }}
          >
            <Card className="h-full bg-white/[0.035]">
              <CardHeader>
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                    <step.icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-display text-4xl text-white/10">0{index + 1}</span>
                </div>
                <CardTitle className="text-2xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{step.copy}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function SampleReports() {
  return (
    <SectionShell
      id="sample-reports"
      eyebrow="Sample reports"
      title="Insight cards built to feel personal."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {reports.map((report, index) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...sectionTransition, delay: index * 0.08 }}
          >
            <Card className="relative h-full overflow-hidden bg-white/[0.035]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
              <CardHeader>
                <div className="mb-8 h-36 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.035]">
                  <div className="size-full animate-pulse bg-[radial-gradient(circle_at_50%_55%,rgba(128,237,243,0.18),transparent_35%),linear-gradient(110deg,transparent,rgba(255,255,255,0.07),transparent)]" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-2xl">{report.title}</CardTitle>
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs text-accent">
                    {report.score}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{report.copy}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function QuestionExamples() {
  return (
    <SectionShell eyebrow="Ask the AI" title="Questions people already carry.">
      <div className="grid gap-3 md:grid-cols-2">
        {questions.map((question, index) => (
          <motion.div
            key={question}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...sectionTransition, delay: index * 0.05 }}
            className="group flex items-center justify-between gap-4 rounded-lg border border-white/[0.08] bg-white/[0.035] p-4 transition hover:border-primary/35 hover:bg-white/[0.055]"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-md bg-primary/10 text-primary">
                <MessageCircle className="size-4" aria-hidden />
              </span>
              <p className="text-sm font-medium text-foreground">{question}</p>
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function Testimonials() {
  return (
    <SectionShell eyebrow="Testimonials" title="A reading experience that feels premium.">
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...sectionTransition, delay: index * 0.08 }}
          >
            <Card className="h-full bg-white/[0.035]">
              <CardContent className="pt-5">
                <div className="mb-5 flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star className="size-4 fill-current" key={starIndex} aria-hidden />
                  ))}
                </div>
                <p className="text-base leading-7 text-foreground/90">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-6 text-sm text-muted-foreground">{testimonial.name}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function FinalCta() {
  return (
    <section className="container pb-28 pt-16 md:pb-24 md:pt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={sectionTransition}
        className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.035] px-5 py-12 text-center shadow-glow md:px-12 md:py-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,164,107,0.18),transparent_28rem)]" />
        <div className="relative mx-auto max-w-2xl">
          <Heart className="mx-auto mb-5 size-8 text-primary" aria-hidden />
          <h2 className="font-display text-5xl leading-none text-balance md:text-7xl">
            Begin with your hand. Leave with a mirror.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground">
            The first scan should feel effortless, beautiful, and worth completing.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/onboarding">
              <Upload className="size-4" aria-hidden />
              Upload palm
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

function SectionShell({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="container border-t border-white/[0.06] py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={sectionTransition}
        className="mb-10 max-w-2xl"
      >
        <p className="text-sm uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
        <h2 className="mt-4 font-display text-4xl leading-tight text-balance md:text-6xl">
          {title}
        </h2>
      </motion.div>
      {children}
    </section>
  );
}

function AnimatedPalm({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "relative grid place-items-center",
        compact ? "absolute inset-x-8 top-28 h-[430px]" : "size-[82%]",
      )}
    >
      <motion.div
        className="absolute h-[82%] w-[58%] rounded-[48%] bg-gradient-to-br from-[#d9a77c] via-[#9f654c] to-[#40211d] opacity-95 shadow-gold"
        animate={{ rotate: [-7, -4, -7], scale: [1, 1.015, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[72%] w-[44%] rounded-full border border-primary/30"
        animate={{ opacity: [0.26, 0.54, 0.26], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      />
      {[
        "M42 48 C72 22, 104 24, 134 48",
        "M40 78 C78 46, 118 48, 152 78",
        "M76 12 C62 72, 68 126, 96 180",
        "M122 30 C92 82, 86 128, 100 176",
      ].map((path, index) => (
        <motion.svg
          key={path}
          viewBox="0 0 190 210"
          className="absolute h-[64%] w-[50%] overflow-visible"
          animate={{ opacity: [0.35, 0.95, 0.45] }}
        >
          <motion.path
            d={path}
            fill="none"
            stroke={index === 3 ? "#80edf3" : "#d8b16f"}
            strokeLinecap="round"
            strokeWidth={index === 3 ? 2 : 3}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0.25, 1, 0.62] }}
            transition={{
              duration: 3.4 + index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.22,
            }}
          />
        </motion.svg>
      ))}
      <motion.div
        className="absolute h-px w-[78%] bg-gradient-to-r from-transparent via-accent to-transparent"
        animate={{ y: compact ? [-142, 148, -142] : [-110, 112, -110], opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function ParticleField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute size-1 rounded-full bg-accent/40"
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
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-background/82 p-4 backdrop-blur-xl md:hidden">
      <Button asChild size="lg" className="w-full">
        <Link href="/onboarding">
          <Upload className="size-4" aria-hidden />
          Upload palm
        </Link>
      </Button>
    </div>
  );
}
