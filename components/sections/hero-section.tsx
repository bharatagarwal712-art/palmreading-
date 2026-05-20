import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden">
      <Image
        src="/images/palm-hero-conversion.svg"
        alt="A warm, cinematic palm scan moment"
        fill
        priority
        className="object-cover object-[58%_50%] opacity-78"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/54 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(128,237,243,0.18),transparent_17rem)]" />
      <div className="container relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-end pb-16 pt-20 md:justify-center md:pb-20">
        <div className="max-w-2xl">
          <FadeIn>
            <Badge>AI palm insight studio</Badge>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.92] text-balance text-foreground sm:text-7xl md:text-8xl">
              Read the map in your hands.
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              A mobile-first ritual for reflective palm readings, cinematic onboarding,
              and emotionally intelligent AI interpretation.
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/onboarding">
                  Start reading
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/dashboard">
                  <Camera className="size-4" aria-hidden />
                  Preview studio
                </Link>
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.32}>
            <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-accent" aria-hidden />
              <span>Supabase Auth, Database, and Storage ready. No business logic wired yet.</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
