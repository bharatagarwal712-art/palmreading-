"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface PalmRegion {
  id: string;
  label: string;
  path: string;
  color: string;
  insight: string;
}

interface AnimatedPalmViewerProps {
  imageUrl: string | null;
}

const regions: PalmRegion[] = [
  {
    id: "heart-line",
    label: "Heart Line",
    color: "#7dd3fc",
    insight: "Emotionally protective and deeply observant before trusting others.",
    path: "M180 455 C300 375 470 345 640 355",
  },
  {
    id: "head-line",
    label: "Head Line",
    color: "#c4b5fd",
    insight: "Strong reflective thinking patterns combined with intuition-driven decisions.",
    path: "M190 625 C360 585 520 575 660 575",
  },
  {
    id: "life-line",
    label: "Life Line",
    color: "#fcd34d",
    insight: "Independent energy with resilience during emotionally transformative phases.",
    path: "M445 250 C300 430 265 760 560 1160",
  },
];

export function AnimatedPalmViewer({ imageUrl }: AnimatedPalmViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % regions.length);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  const activeRegion = useMemo(() => regions[activeIndex], [activeIndex]);

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-4 shadow-glow backdrop-blur-xl">
        <div className="relative aspect-[0.78] overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-black/30">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Palm preview"
              fill
              className="object-contain opacity-90"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Palm preview unavailable
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20" />

          <svg
            viewBox="0 0 1000 1400"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
          >
            {regions.map((region, index) => {
              const isActive = index === activeIndex;

              return (
                <g key={region.id}>
                  <motion.path
                    d={region.path}
                    fill="transparent"
                    stroke={region.color}
                    strokeWidth="18"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0.18 }}
                    animate={{
                      pathLength: isActive ? 1 : 0.42,
                      opacity: isActive ? 1 : 0.14,
                    }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    style={{
                      filter: isActive ? `drop-shadow(0 0 18px ${region.color})` : "none",
                    }}
                  />

                  {isActive && (
                    <motion.circle
                      r="18"
                      fill={region.color}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <animateMotion
                        dur="2.8s"
                        repeatCount="indefinite"
                        path={region.path}
                      />
                    </motion.circle>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <motion.div
        key={activeRegion.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6 shadow-glow backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary">Active Analysis</p>
            <h3 className="mt-2 font-display text-3xl">{activeRegion.label}</h3>
          </div>

          <div
            className="size-4 rounded-full"
            style={{
              background: activeRegion.color,
              boxShadow: `0 0 18px ${activeRegion.color}`,
            }}
          />
        </div>

        <p className="mt-5 text-base leading-8 text-foreground/90">{activeRegion.insight}</p>
      </motion.div>
    </div>
  );
}
