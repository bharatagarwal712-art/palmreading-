"use client";

import { useRef } from "react";

interface PalmLine {
  name: string;
  color: string;
  label: string;
  path: string;
}

interface AnnotatedPalmImageProps {
  imageUrl: string | null;
  lines?: PalmLine[];
}

export function AnnotatedPalmImage({
  imageUrl,
}: AnnotatedPalmImageProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-4 shadow-glow backdrop-blur-xl">
      <div className="relative aspect-[0.78] overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-black/40">
        {imageUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Palm Preview"
              className="h-full w-full object-contain grayscale contrast-125 brightness-95"
              crossOrigin="anonymous"
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Palm preview unavailable
          </div>
        )}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35rem)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>
    </div>
  );
}
