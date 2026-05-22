"use client";

import { useEffect, useRef, useState } from "react";
import { PalmLineOverlay } from "@/lib/palm/extract-palm-lines";
import { PalmLineOverlayRenderer } from "@/components/palm/palm-line-overlay";
import { createHandDetector } from "@/lib/palm/detect-hand";
import { generateGuidedPalmLines } from "@/lib/palm/generate-guided-overlays";

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

  const [overlays, setOverlays] = useState<PalmLineOverlay[]>([]);
  const [dimensions, setDimensions] = useState({
    width: 1000,
    height: 1400,
  });

  useEffect(() => {
    async function detectPalm() {
      if (!imageRef.current) return;

      try {
        const detector = await createHandDetector();

        detector.onResults((results: {
          multiHandLandmarks?: { x: number; y: number }[][];
        }) => {
          const landmarks = results.multiHandLandmarks?.[0];

          if (!landmarks) return;

          const generated = generateGuidedPalmLines(landmarks);

          setOverlays(generated as PalmLineOverlay[]);
        });

        await detector.send({
          image: imageRef.current,
        });

        setDimensions({
          width: imageRef.current.naturalWidth || 1000,
          height: imageRef.current.naturalHeight || 1400,
        });
      } catch (error) {
        console.error(error);
      }
    }

    const timeout = setTimeout(detectPalm, 800);

    return () => clearTimeout(timeout);
  }, [imageUrl]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-4 shadow-glow backdrop-blur-xl">
      <div className="relative aspect-[0.78] overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-black/40">
        {imageUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Annotated Palm"
              className="h-full w-full object-contain grayscale contrast-125 brightness-90"
              crossOrigin="anonymous"
            />

            <PalmLineOverlayRenderer
              overlays={overlays}
              width={dimensions.width}
              height={dimensions.height}
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
