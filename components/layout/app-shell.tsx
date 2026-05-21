import Link from "next/link";
import { Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/onboarding", label: "Begin" },
  { href: "/dashboard", label: "Studio" },
];

export function AppShell({
  children,
  className,
  hideMobileNav = false,
}: {
  children: React.ReactNode;
  className?: string;
  hideMobileNav?: boolean;
}) {
  return (
    <div className={cn("min-h-screen cinematic-bg", className)}>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-background/60 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary shadow-gold">
              <Sparkles className="size-4" aria-hidden />
            </span>
            <span className="font-display text-lg text-foreground">Palm AI</span>
          </Link>
          <nav className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 md:flex">
            {navItems.map((item) => (
              <Link
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Dark mode enabled">
              <Moon className="size-4" aria-hidden />
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="pt-16">{children}</main>
      {!hideMobileNav ? <MobileNav /> : null}
    </div>
  );
}

function MobileNav() {
  return (
    <nav className="fixed inset-x-4 bottom-4 z-50 grid grid-cols-3 rounded-lg border border-white/[0.08] bg-background/78 p-1 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden">
      {navItems.map((item) => (
        <Link
          className="rounded-md px-3 py-3 text-center text-xs font-medium text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
          href={item.href}
          key={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
