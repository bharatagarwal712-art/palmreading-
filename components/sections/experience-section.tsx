import { Camera, Gem, ScanLine, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Camera,
    title: "Guided capture",
    description: "Mobile camera states and storage-ready surfaces for future palm uploads.",
  },
  {
    icon: ScanLine,
    title: "Reading canvas",
    description: "A polished result shell with room for AI summaries, archetypes, and detail layers.",
  },
  {
    icon: Sparkles,
    title: "Cinematic motion",
    description: "Reusable Framer Motion primitives tuned for calm, premium interactions.",
  },
  {
    icon: Gem,
    title: "Luxury tokens",
    description: "Dark-first Tailwind theme with violet depth, gold emphasis, and cyan ambience.",
  },
];

export function ExperienceSection() {
  return (
    <section className="container py-20 md:py-28">
      <FadeIn>
        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.22em] text-primary">Designed for the first tap</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-balance md:text-6xl">
            Built for the moment after someone swipes up.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Fast, atmospheric, and thumb-friendly, with every surface ready for the product
            logic to arrive later.
          </p>
        </div>
      </FadeIn>
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <StaggerItem key={feature.title}>
            <Card className="h-full bg-white/[0.035]">
              <CardHeader>
                <div className="mb-4 grid size-10 place-items-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                  <feature.icon className="size-5" aria-hidden />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
