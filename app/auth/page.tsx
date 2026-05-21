import { Sparkles } from "lucide-react";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";

export default function AuthPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,164,107,0.16),transparent_28rem)]" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/[0.08] bg-white/[0.04] p-8 shadow-glow backdrop-blur-xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="size-5" />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">
              AI Palm Reading
            </p>
            <h1 className="font-display text-3xl">
              Continue your reading
            </h1>
          </div>
        </div>

        <p className="mb-8 text-sm leading-7 text-muted-foreground">
          Sign in to save your palm scans, reports, and AI conversations
          securely across devices.
        </p>

        <GoogleAuthButton />

        <div className="mt-8 rounded-2xl border border-white/[0.08] bg-black/20 p-4 text-xs leading-6 text-muted-foreground">
          Your uploads remain private and linked only to your account.
        </div>
      </div>
    </main>
  );
}
