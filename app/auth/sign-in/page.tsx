import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  return (
    <AppShell>
      <section className="container grid min-h-[calc(100svh-4rem)] place-items-center py-10">
        <FadeIn className="w-full max-w-md">
          <Card className="bg-white/[0.045]">
            <CardHeader>
              <p className="text-sm uppercase tracking-[0.22em] text-primary">Supabase Auth</p>
              <CardTitle className="font-display text-4xl">Enter the reading room.</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="space-y-2 text-sm text-muted-foreground">
                <span>Email</span>
                <Input type="email" placeholder="you@example.com" />
              </label>
              <Button className="w-full" size="lg">
                <Mail className="size-4" aria-hidden />
                Continue with magic link
              </Button>
              <Button asChild className="w-full" size="lg" variant="secondary">
                <Link href="/dashboard">
                  Preview without auth
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <p className="text-center text-xs leading-5 text-muted-foreground">
                This screen is UI-only. Supabase Auth wiring belongs in the next product pass.
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </section>
    </AppShell>
  );
}
