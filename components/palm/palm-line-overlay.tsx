"use client";

import { PalmLineOverlay } from "@/lib/palm/extract-palm-lines";

interface PalmLineOverlayProps {
  overlays: PalmLineOverlay[];
  width: number;
  height: number;
}

export function PalmLineOverlayRenderer({
  overlays,
  width,
  height,
}: PalmLineOverlayProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {overlays.map((overlay) => {
        const path = overlay.points
          .map((point, index) =>
            `${index === 0 ? "M" : "L"}${point.x} ${point.y}`,
          )
          .join(" ");

        const labelPoint = overlay.points[0];

        return (
          <g key={overlay.id}>
            <path
              d={path}
              fill="none"
              stroke={overlay.color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.92"
              style={{
                filter: `drop-shadow(0 0 10px ${overlay.color})`,
              }}
            />

            <circle
              cx={labelPoint.x}
              cy={labelPoint.y}
              r="5"
              fill={overlay.color}
            />

            <text
              x={labelPoint.x + 14}
              y={labelPoint.y - 12}
              fill={overlay.color}
              fontSize="18"
              fontWeight="700"
              letterSpacing="0.08em"
              style={{
                textTransform: "uppercase",
                filter: `drop-shadow(0 0 8px ${overlay.color})`,
              }}
            >
              {overlay.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
