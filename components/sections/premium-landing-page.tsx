"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, ChevronRight, Heart, MessageCircle, ScanLine, ShieldCheck, Sparkles, Star, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ease = [0.22, 1, 0.36, 1] as const;
const steps = [["Upload your palm", "Take one clear photo and let the scan prepare your reading.", Upload], ["AI reads the lines", "Life, heart, head, and fate lines become structured insight.", ScanLine], ["Receive a report", "A beautiful report turns patterns into calm self-reflection.", Sparkles]] as const;
const reports = [["Emotional Pattern", "82%", "Deep feeling, selective trust, and a need for steady emotional rhythm."], ["Focus Signature", "74%", "Intuitive decisions supported by careful observation."], ["Energy Arc", "91%", "Resilient energy that grows strongest with grounded routines."]] as const;
const questions = ["What does my heart line say about love?", "Am I in a career transition phase?", "What personality pattern stands out most?", "Where do I hold emotional tension?"];
const testimonials = [["Aarohi", "It felt like a reflective ritual, not a gimmick."], ["Meera", "The report preview was beautiful enough to share, but still felt private."], ["Kabir", "Simple, premium, and instantly understandable from a social ad."]] as const;

export function PremiumLandingPage() {
  return <div className="relative overflow-hidden"><Particles /><Hero /><PalmVisual /><HowItWorks /><Reports /><Questions /><Testimonials /><FinalCta /><StickyCta /></div>;
}

function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden">
      <Image src="/images/hero-palm-scan.svg" alt="A cinematic AI palm scan" fill priority className="object-cover object-[62%_50%] opacity-72" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/18 via-background/58 to-background" />
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-background via-background/76 to-transparent md:w-[70%]" />
      <div className="container relative z-10 grid min-h-[calc(100svh-4rem)] gap-10 pb-28 pt-14 md:grid-cols-[0.95fr_1.05fr] md:items-center md:pb-20">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="max-w-2xl">
          <Reveal><Badge>AI palm reading</Badge></Reveal>
          <Reveal><h1 className="mt-6 max-w-[9ch] font-display text-6xl leading-[0.9] text-balance sm:text-7xl md:text-8xl lg:text-9xl"><span className="block">Your palm holds patterns.</span><span className="block">AI reveals them.</span></h1></Reveal>
          <Reveal><p className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">Upload a palm photo and step into a cinematic reading experience built for clarity, emotion, and modern self-discovery.</p></Reveal>
          <Reveal><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg"><Link href="/onboarding"><Upload className="size-4" aria-hidden />Upload palm</Link></Button><Button asChild size="lg" variant="secondary"><Link href="#sample-reports">View sample report<ArrowRight className="size-4" aria-hidden /></Link></Button></div></Reveal>
          <Reveal><div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-accent" aria-hidden /><span>Private by design. Ready for secure upload and premium reports.</span></div></Reveal>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 28, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, ease }} className="relative mx-auto hidden aspect-[0.72] w-full max-w-[380px] md:block">
          <div className="absolute inset-0 rounded-[2rem] border border-white/[0.1] bg-black/18 shadow-glow backdrop-blur-[2px]" /><AnimatedPalm /><ScanStatus />
        </motion.div>
      </div>
    </section>
  );
}

function PalmVisual() {
  return <Section eyebrow="Animated palm visualization" title="A scan that feels alive."><div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center"><motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease }} className="relative mx-auto aspect-square w-full max-w-[520px] rounded-full border border-white/[0.08] bg-white/[0.025]"><AnimatedPalm large /></motion.div><div className="space-y-4">{["Life line", "Heart line", "Head line"].map((line, index) => <motion.div key={line} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: index * 0.08 }} className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-5"><div className="flex items-center gap-3"><span className="size-2 rounded-full bg-accent shadow-glow" /><h3 className="font-display text-2xl">{line}</h3></div><p className="mt-3 text-sm leading-6 text-muted-foreground">A softly guided layer for turning hand patterns into emotionally useful insight.</p></motion.div>)}</div></div></Section>;
}

function HowItWorks() {
  return <Section eyebrow="How it works" title="Three steps, one quiet reveal."><div className="grid gap-4 md:grid-cols-3">{steps.map(([title, copy, Icon], index) => <CardTile key={title} delay={index * 0.08}><div className="mb-5 flex items-center justify-between"><span className="grid size-11 place-items-center rounded-md border border-primary/25 bg-primary/10 text-primary"><Icon className="size-5" aria-hidden /></span><span className="font-display text-4xl text-white/10">0{index + 1}</span></div><CardTitle className="text-2xl">{title}</CardTitle><p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p></CardTile>)}</div></Section>;
}

function Reports() {
  return <Section id="sample-reports" eyebrow="Sample palm reports" title="Insight cards built to feel personal."><motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease }} className="relative mb-5 aspect-[1.5] overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.035] shadow-glow md:mb-6 md:aspect-[2.4]"><Image src="/images/report-visual.svg" alt="Premium AI palm report cards" fill className="object-cover opacity-90" sizes="(min-width: 768px) 1120px, 100vw" /><div className="absolute inset-0 bg-gradient-to-t from-background/66 via-transparent to-background/8" /></motion.div><div className="grid gap-4 md:grid-cols-3">{reports.map(([title, score, copy], index) => <CardTile key={title} delay={index * 0.08}><CardHeader className="p-0"><div className="mb-6 h-28 rounded-lg border border-white/[0.08] bg-[radial-gradient(circle_at_50%_55%,rgba(128,237,243,0.18),transparent_42%),linear-gradient(110deg,transparent,rgba(255,255,255,0.07),transparent)]" /><div className="flex items-start justify-between gap-4"><CardTitle className="text-2xl">{title}</CardTitle><span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs text-accent">{score}</span></div></CardHeader><p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p></CardTile>)}</div></Section>;
}

function Questions() {
  return <Section eyebrow="Ask the AI" title="Questions people already carry."><div className="grid gap-3 md:grid-cols-2">{questions.map((question, index) => <motion.div key={question} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: index * 0.05 }} className="group flex items-center justify-between gap-4 rounded-lg border border-white/[0.08] bg-white/[0.035] p-4 transition hover:border-primary/35 hover:bg-white/[0.055]"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-md bg-primary/10 text-primary"><MessageCircle className="size-4" aria-hidden /></span><p className="text-sm font-medium">{question}</p></div><ChevronRight className="size-4 shrink-0 text-muted-foreground transition group-hover:text-primary" /></motion.div>)}</div></Section>;
}

function Testimonials() {
  return <Section eyebrow="Testimonials" title="A reading experience that feels premium."><div className="grid gap-4 md:grid-cols-3">{testimonials.map(([name, quote], index) => <CardTile key={name} delay={index * 0.08}><div className="mb-5 flex gap-1 text-primary">{Array.from({ length: 5 }).map((_, starIndex) => <Star className="size-4 fill-current" key={starIndex} aria-hidden />)}</div><p className="text-base leading-7 text-foreground/90">&ldquo;{quote}&rdquo;</p><p className="mt-6 text-sm text-muted-foreground">{name}</p></CardTile>)}</div></Section>;
}

function FinalCta() {
  return <section className="container pb-28 pt-16 md:pb-24 md:pt-24"><motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease }} className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.035] px-5 py-12 text-center shadow-glow md:px-12 md:py-16"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,164,107,0.18),transparent_28rem)]" /><div className="relative mx-auto max-w-2xl"><Heart className="mx-auto mb-5 size-8 text-primary" aria-hidden /><h2 className="font-display text-5xl leading-none text-balance md:text-7xl">Begin with your hand. Leave with a mirror.</h2><p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground">The first scan should feel effortless, beautiful, and worth completing.</p><Button asChild size="lg" className="mt-8"><Link href="/onboarding"><Upload className="size-4" aria-hidden />Upload palm</Link></Button></div></motion.div></section>;
}

function Section({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="container border-t border-white/[0.06] py-16 md:py-24"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease }} className="mb-10 max-w-2xl"><p className="text-sm uppercase tracking-[0.22em] text-primary">{eyebrow}</p><h2 className="mt-4 font-display text-4xl leading-tight text-balance md:text-6xl">{title}</h2></motion.div>{children}</section>;
}

function CardTile({ children, delay }: { children: React.ReactNode; delay: number }) {
  return <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease, delay }}><Card className="h-full bg-white/[0.035]"><CardContent className="p-5">{children}</CardContent></Card></motion.div>;
}

function Reveal({ children }: { children: React.ReactNode }) {
  return <motion.div variants={{ hidden: { opacity: 0, y: 22, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }} transition={{ duration: 0.72, ease }}>{children}</motion.div>;
}

function AnimatedPalm({ large = false }: { large?: boolean }) {
  return <div className={large ? "absolute inset-8 grid place-items-center" : "absolute inset-0 grid place-items-center"}><motion.div className="absolute h-[76%] w-[48%] rounded-[48%] bg-gradient-to-br from-[#d9a77c] via-[#9f654c] to-[#40211d] opacity-90 shadow-gold" animate={{ rotate: [-7, -4, -7], scale: [1, 1.015, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />{["M42 48 C72 22, 104 24, 134 48", "M40 78 C78 46, 118 48, 152 78", "M76 12 C62 72, 68 126, 96 180", "M122 30 C92 82, 86 128, 100 176"].map((path, index) => <motion.svg key={path} viewBox="0 0 190 210" className="absolute h-[58%] w-[46%] overflow-visible" animate={{ opacity: [0.35, 0.95, 0.45] }}><motion.path d={path} fill="none" stroke={index === 3 ? "#80edf3" : "#d8b16f"} strokeLinecap="round" strokeWidth={index === 3 ? 2 : 3} initial={{ pathLength: 0 }} animate={{ pathLength: [0.25, 1, 0.62] }} transition={{ duration: 3.4 + index * 0.35, repeat: Infinity, ease: "easeInOut", delay: index * 0.22 }} /></motion.svg>)}<motion.div className="absolute h-px w-[72%] bg-gradient-to-r from-transparent via-accent to-transparent" animate={{ y: [-132, 142, -132], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} /></div>;
}

function ScanStatus() {
  return <div className="absolute bottom-6 left-5 right-5 rounded-lg border border-white/[0.1] bg-black/45 p-4 backdrop-blur-md"><div className="mb-3 flex items-center justify-between"><span className="text-xs uppercase tracking-[0.18em] text-primary">Scan ready</span><Camera className="size-4 text-accent" aria-hidden /></div><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" initial={{ width: "18%" }} animate={{ width: ["18%", "78%", "42%", "92%"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} /></div></div>;
}

function Particles() {
  return <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">{Array.from({ length: 18 }).map((_, index) => <motion.span key={index} className="absolute size-1 rounded-full bg-accent/40" style={{ left: `${8 + ((index * 37) % 86)}%`, top: `${6 + ((index * 19) % 84)}%` }} animate={{ y: [-10, 16, -10], opacity: [0.12, 0.48, 0.12], scale: [0.8, 1.4, 0.8] }} transition={{ duration: 4 + (index % 5), repeat: Infinity, delay: index * 0.17, ease: "easeInOut" }} />)}</div>;
}

function StickyCta() {
  return <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-background/82 p-4 backdrop-blur-xl md:hidden"><Button asChild size="lg" className="w-full"><Link href="/onboarding"><Upload className="size-4" aria-hidden />Upload palm</Link></Button></div>;
}
