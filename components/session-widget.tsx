"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function SessionWidget() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        setEmail(user.email);
      }
    };

    load();
  }, []);

  return (
    <div className="fixed right-5 top-5 z-[200] flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl">
      {email ? (
        <>
          <div className="hidden text-sm text-white/80 md:block">
            {email}
          </div>

          <Link
            href="/results"
            className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            My Reading
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/upload"
            className="text-sm text-white/80"
          >
            Sign In
          </Link>

          <Link
            href="/upload"
            className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            Upload Palm
          </Link>
        </>
      )}
    </div>
  );
}
