import { AppShell } from "@/components/layout/app-shell";
import { PremiumLandingPage } from "@/components/sections/premium-landing-page";

export default function HomePage() {
  return (
    <AppShell hideMobileNav>
      <PremiumLandingPage />
    </AppShell>
  );
}
