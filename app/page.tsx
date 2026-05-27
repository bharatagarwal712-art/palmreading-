import { PremiumLandingPage } from "@/components/sections/premium-landing-page";
import { SessionWidget } from "@/components/session-widget";
import { ContinueReadingWidget } from "@/components/continue-reading-widget";

export default function HomePage() {
  return (
    <>
      <SessionWidget />
      <ContinueReadingWidget />
      <PremiumLandingPage />
    </>
  );
}
