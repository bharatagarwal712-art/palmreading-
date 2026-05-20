import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <AppShell>
      <section className="container grid min-h-[calc(100svh-4rem)] place-items-center py-10 text-center">
        <div className="max-w-md">
          <p className="text-sm uppercase tracking-[0.22em] text-primary">404</p>
          <h1 className="mt-4 font-display text-5xl leading-none">The line fades here.</h1>
          <p className="mt-5 text-muted-foreground">
            This path is not part of the current reading.
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Return home</Link>
          </Button>
        </div>
      </section>
    </AppShell>
  );
}
