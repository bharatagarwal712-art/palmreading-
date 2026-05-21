import { AppShell } from "@/components/layout/app-shell";
import { LandingPage } from "@/components/sections/landing-page";

export default function HomePage() {
  return (
    <AppShell hideMobileNav>
      <LandingPage />
    </AppShell>
  );
}
