"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { savePalmUpload } from "@/lib/palm-upload-session";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function SessionWidget() {
  const [email, setEmail] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        setEmail(user.email);
      }
    };

    loadUser();
  }, []);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const handleUploadPalm = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      await savePalmUpload(file);
      window.location.href = "/processing";
    } catch (error) {
      console.error("Palm upload failed:", error);
    }
  };

  return (
    <div className="fixed right-5 top-5 z-[200] flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelected}
      />

      {email ? (
        <>
          <div className="hidden text-sm text-white/80 md:block">
            {email}
          </div>

          <Link href="/results" className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">
            My Reading
          </Link>
        </>
      ) : (
        <>
          <button onClick={handleSignIn} className="text-sm text-white/80 transition hover:text-white">
            Sign In
          </button>

          <button onClick={handleUploadPalm} className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition hover:opacity-90">
            Upload Palm
          </button>
        </>
      )}
    </div>
  );
}
