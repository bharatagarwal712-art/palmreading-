export interface PalmPoint {
  x: number;
  y: number;
}

export interface GuidedPalmOverlay {
  id: string;
  label: string;
  color: string;
  points: PalmPoint[];
}

function createBezierCurve(
  start: PalmPoint,
  control1: PalmPoint,
  control2: PalmPoint,
  end: PalmPoint,
  steps = 60,
): PalmPoint[] {
  const points: PalmPoint[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;

    const x =
      Math.pow(1 - t, 3) * start.x +
      3 * Math.pow(1 - t, 2) * t * control1.x +
      3 * (1 - t) * Math.pow(t, 2) * control2.x +
      Math.pow(t, 3) * end.x;

    const y =
      Math.pow(1 - t, 3) * start.y +
      3 * Math.pow(1 - t, 2) * t * control1.y +
      3 * (1 - t) * Math.pow(t, 2) * control2.y +
      Math.pow(t, 3) * end.y;

    points.push({ x, y });
  }

  return points;
}

export function generateGuidedPalmLines(landmarks: PalmPoint[]): GuidedPalmOverlay[] {
  const wrist = landmarks[0];
  const thumbBase = landmarks[1];
  const indexBase = landmarks[5];
  const middleBase = landmarks[9];
  const ringBase = landmarks[13];
  const pinkyBase = landmarks[17];

  return [
    {
      id: "heart-line",
      label: "Heart Line",
      color: "#7dd3fc",
      points: createBezierCurve(
        {
          x: pinkyBase.x + 0.02,
          y: pinkyBase.y + 0.05,
        },
        {
          x: ringBase.x + 0.02,
          y: ringBase.y + 0.01,
        },
        {
          x: middleBase.x - 0.02,
          y: middleBase.y - 0.01,
        },
        {
          x: indexBase.x - 0.02,
          y: indexBase.y + 0.05,
        },
      ),
    },
    {
      id: "head-line",
      label: "Head Line",
      color: "#c4b5fd",
      points: createBezierCurve(
        {
          x: thumbBase.x + 0.06,
          y: thumbBase.y + 0.1,
        },
        {
          x: middleBase.x - 0.08,
          y: middleBase.y + 0.14,
        },
        {
          x: ringBase.x - 0.03,
          y: ringBase.y + 0.2,
        },
        {
          x: pinkyBase.x - 0.05,
          y: pinkyBase.y + 0.24,
        },
      ),
    },
    {
      id: "life-line",
      label: "Life Line",
      color: "#fcd34d",
      points: createBezierCurve(
        {
          x: indexBase.x - 0.03,
          y: indexBase.y + 0.04,
        },
        {
          x: thumbBase.x - 0.1,
          y: thumbBase.y + 0.16,
        },
        {
          x: wrist.x - 0.08,
          y: wrist.y - 0.16,
        },
        {
          x: wrist.x + 0.02,
          y: wrist.y - 0.03,
        },
        80,
      ),
    },
  ];
}
