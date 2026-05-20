import { Camera, Crown, Database, HardDrive, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { FadeIn } from "@/components/motion/fade-in";
import { ReadingSkeleton } from "@/components/skeletons/reading-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const readiness = [
  { icon: ShieldCheck, label: "Supabase Auth", status: "placeholder" },
  { icon: Database, label: "Database", status: "schema-ready surface" },
  { icon: HardDrive, label: "Storage", status: "upload-ready surface" },
  { icon: Crown, label: "Razorpay", status: "checkout placeholder" },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <section className="container py-10 md:py-16">
        <FadeIn>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge>Reading studio</Badge>
              <h1 className="mt-5 font-display text-5xl leading-none md:text-7xl">
                Your palm, awaiting light.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                A dashboard shell for capture, loading, saved readings, and premium states.
              </p>
            </div>
            <Button size="lg">
              <Camera className="size-4" aria-hidden />
              New scan
            </Button>
          </div>
        </FadeIn>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <FadeIn delay={0.08}>
            <Card className="bg-white/[0.035]">
              <CardHeader>
                <CardTitle className="text-3xl">Reading preview</CardTitle>
              </CardHeader>
              <CardContent>
                <ReadingSkeleton />
              </CardContent>
            </Card>
          </FadeIn>
          <FadeIn delay={0.16}>
            <Card className="bg-white/[0.035]">
              <CardHeader>
                <CardTitle className="text-3xl">Architecture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {readiness.map((item) => (
                  <div
                    className="flex items-center gap-3 rounded-md border border-white/[0.07] bg-black/20 p-3"
                    key={item.label}
                  >
                    <span className="grid size-9 place-items-center rounded-md bg-primary/10 text-primary">
                      <item.icon className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.status}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </AppShell>
  );
}
