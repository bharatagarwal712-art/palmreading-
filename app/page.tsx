import { AppShell } from "@/components/layout/app-shell";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { RitualSection } from "@/components/sections/ritual-section";

export default function HomePage() {
  return (
    <AppShell>
      <HeroSection />
      <ExperienceSection />
      <RitualSection />
    </AppShell>
  );
}
