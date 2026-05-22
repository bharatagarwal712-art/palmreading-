"use client";

import { Sparkles } from "lucide-react";
import { PalmLineOverlay } from "@/lib/palm/extract-palm-lines";

interface PalmLineOverlayProps {
  overlays: PalmLineOverlay[];
  width: number;
  height: number;
}

const LABEL_LIMIT = 3;

export function PalmLineOverlayRenderer({
  overlays,
  width,
  height,
}: PalmLineOverlayProps) {
  const cleanedOverlays = overlays.slice(0, LABEL_LIMIT);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        {cleanedOverlays.map((overlay, index) => {
          const path = overlay.points
            .map((point, pointIndex) => {
              const x = point.x * width;
              const y = point.y * height;

              return `${pointIndex === 0 ? "M" : "L"}${x} ${y}`;
            })
            .join(" ");

          const labelPoint = overlay.points[0];

          const labelX = labelPoint.x * width;
          const labelY = labelPoint.y * height;

          const labelOffsetY = index * 74;

          return (
            <g key={overlay.id}>
              <path
                d={path}
                fill="none"
                stroke={overlay.color}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.95"
                style={{
                  filter: `drop-shadow(0 0 14px ${overlay.color})`,
                }}
              >
                <animate
                  attributeName="stroke-opacity"
                  values="0.5;1;0.5"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>

              <circle
                cx={labelX}
                cy={labelY}
                r="5"
                fill={overlay.color}
              >
                <animate
                  attributeName="r"
                  values="4;7;4"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>

              <line
                x1={labelX}
                y1={labelY}
                x2={width * 0.08}
                y2={85 + labelOffsetY}
                stroke={overlay.color}
                strokeWidth="2"
                opacity="0.55"
                strokeDasharray="5 5"
              />

              <foreignObject
                x={width * 0.05}
                y={45 + labelOffsetY}
                width="220"
                height="60"
              >
                <div
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-md"
                  style={{
                    boxShadow: `0 0 20px ${overlay.color}22`,
                  }}
                >
                  <Sparkles
                    size={15}
                    color={overlay.color}
                    className="animate-pulse"
                  />

                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{
                      color: overlay.color,
                    }}
                  >
                    {overlay.label}
                  </span>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
