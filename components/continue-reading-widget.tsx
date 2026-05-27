"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export function ContinueReadingWidget() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const report = sessionStorage.getItem(
      "palm_analysis"
    );

    if (report) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <Link
      href="/results"
      className="fixed bottom-5 right-5 z-[200] w-[320px] rounded-[2rem] border border-primary/20 bg-black/80 p-5 shadow-2xl backdrop-blur-xl"
    >
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>

        <div>
          <p className="text-lg font-semibold text-white">
            Your palm reading is ready
          </p>

          <p className="mt-1 text-sm leading-6 text-white/70">
            Continue exploring your emotional and personality insights.
          </p>

          <div className="mt-3 inline-flex rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">
            Open Reading
          </div>
        </div>
      </div>
    </Link>
  );
}
