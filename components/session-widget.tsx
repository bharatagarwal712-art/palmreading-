"use client";
import Link from "next/link"; import { useEffect, useRef, useState } from "react"; import { createClient } from "@supabase/supabase-js";
const supabase = createClient( process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! );
export function SessionWidget() { const [email, setEmail] = useState<string | null>(null); const fileInputRef = useRef<HTMLInputElement | null>(null);
useEffect(() => { const load = async () => { const { data: { user }, } = await supabase.auth.getUser();
  if (user?.email) {
    setEmail(user.email);
  }
};

load();
}, []);
const handleSignIn = async () => { await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: ${window.location.origin}/, }, }); };
const handleUploadPalm = () => { fileInputRef.current?.click(); };
const handleFileSelected = async ( event: React.ChangeEvent ) => { const file = event.target.files?.[0];
if (!file) return;

const reader = new FileReader();

reader.onloadend = () => {
  localStorage.setItem(
    "palm_upload_preview",
    reader.result as string
  );

  window.location.href = "/processing";
};

reader.readAsDataURL(file);
};
return ( 
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
      <button
        onClick={handleSignIn}
        className="text-sm text-white/80"
      >
        Sign In
      </button>

      <button
        onClick={handleUploadPalm}
        className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
      >
        Upload Palm
      </button>
    </>
  )}
</div>
); }
