export interface PalmPoint {
  x: number;
  y: number;
}

export interface PalmLineOverlay {
  id: string;
  label: string;
  color: string;
  points: PalmPoint[];
}

function createCurve(
  start: PalmPoint,
  control: PalmPoint,
  end: PalmPoint,
  steps = 40,
): PalmPoint[] {
  const points: PalmPoint[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;

    const x =
      (1 - t) * (1 - t) * start.x +
      2 * (1 - t) * t * control.x +
      t * t * end.x;

    const y =
      (1 - t) * (1 - t) * start.y +
      2 * (1 - t) * t * control.y +
      t * t * end.y;

    points.push({ x, y });
  }

  return points;
}

export async function extractPalmLines(): Promise<PalmLineOverlay[]> {
  return [
    {
      id: "heart-line",
      label: "Heart Line",
      color: "#7dd3fc",
      points: createCurve(
        { x: 0.18, y: 0.33 },
        { x: 0.42, y: 0.25 },
        { x: 0.72, y: 0.31 },
      ),
    },

    {
      id: "head-line",
      label: "Head Line",
      color: "#c4b5fd",
      points: createCurve(
        { x: 0.19, y: 0.47 },
        { x: 0.44, y: 0.43 },
        { x: 0.72, y: 0.5 },
      ),
    },

    {
      id: "life-line",
      label: "Life Line",
      color: "#fcd34d",
      points: createCurve(
        { x: 0.57, y: 0.26 },
        { x: 0.3, y: 0.56 },
        { x: 0.46, y: 0.92 },
        60,
      ),
    },

    {
      id: "fate-line",
      label: "Fate Line",
      color: "#4ade80",
      points: createCurve(
        { x: 0.49, y: 0.82 },
        { x: 0.5, y: 0.58 },
        { x: 0.52, y: 0.3 },
      ),
    },
  ];
}
