"use client";

import Image from "next/image";

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

const fallbackLines: PalmLine[] = [
  {
    name: "Heart Line",
    color: "#7dd3fc",
    label: "Heart Line",
    path: "M180 455 C300 375 470 345 640 355",
  },
  {
    name: "Head Line",
    color: "#c4b5fd",
    label: "Head Line",
    path: "M190 625 C360 585 520 575 660 575",
  },
  {
    name: "Life Line",
    color: "#fcd34d",
    label: "Life Line",
    path: "M445 250 C300 430 265 760 560 1160",
  },
];

export function AnnotatedPalmImage({
  imageUrl,
  lines = fallbackLines,
}: AnnotatedPalmImageProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-4 shadow-glow backdrop-blur-xl">
      <div className="relative aspect-[0.78] overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-black/40">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Annotated Palm"
            fill
            className="object-contain grayscale contrast-125 brightness-90"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Palm preview unavailable
          </div>
        )}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35rem)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        <svg
          viewBox="0 0 1000 1400"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          {lines.map((line, index) => {
            const labelPositions = [
              { x: 620, y: 315 },
              { x: 645, y: 560 },
              { x: 575, y: 1180 },
            ];

            const position = labelPositions[index] || { x: 600, y: 600 };

            return (
              <g key={line.name}>
                <path
                  d={line.path}
                  fill="transparent"
                  stroke={line.color}
                  strokeWidth="18"
                  strokeLinecap="round"
                  style={{
                    filter: `drop-shadow(0 0 18px ${line.color})`,
                  }}
                />

                <circle
                  cx={position.x - 24}
                  cy={position.y - 10}
                  r="8"
                  fill={line.color}
                />

                <line
                  x1={position.x - 18}
                  y1={position.y - 10}
                  x2={position.x + 8}
                  y2={position.y - 10}
                  stroke={line.color}
                  strokeWidth="2"
                  opacity="0.8"
                />

                <text
                  x={position.x + 14}
                  y={position.y}
                  fill={line.color}
                  fontSize="26"
                  fontWeight="600"
                  letterSpacing="0.08em"
                  style={{
                    textTransform: "uppercase",
                    filter: `drop-shadow(0 0 12px ${line.color})`,
                  }}
                >
                  {line.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
