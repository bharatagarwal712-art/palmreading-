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
    <div className="absolute inset-0">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {cleanedOverlays.map((overlay, index) => {
          const simplifiedPoints = overlay.points.filter(
            (_, pointIndex) => pointIndex % 5 === 0,
          );

          const path = simplifiedPoints
            .map((point, pointIndex) =>
              `${pointIndex === 0 ? "M" : "L"}${point.x} ${point.y}`,
            )
            .join(" ");

          const labelPoint = simplifiedPoints[0];

          const labelOffsetY = index * 70;

          return (
            <g key={overlay.id}>
              <path
                d={path}
                fill="none"
                stroke={overlay.color}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
                style={{
                  filter: `drop-shadow(0 0 12px ${overlay.color})`,
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
                cx={labelPoint.x}
                cy={labelPoint.y}
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
                x1={labelPoint.x}
                y1={labelPoint.y}
                x2={width * 0.08}
                y2={80 + labelOffsetY}
                stroke={overlay.color}
                strokeWidth="2"
                opacity="0.6"
                strokeDasharray="5 5"
              />

              <foreignObject
                x={width * 0.05}
                y={40 + labelOffsetY}
                width="220"
                height="60"
              >
                <div
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-md"
                  style={{
                    boxShadow: `0 0 20px ${overlay.color}33`,
                  }}
                >
                  <Sparkles
                    size={16}
                    color={overlay.color}
                    className="animate-pulse"
                  />

                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
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
