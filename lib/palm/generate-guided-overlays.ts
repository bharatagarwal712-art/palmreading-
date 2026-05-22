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
      points: [
        {
          x: pinkyBase.x,
          y: pinkyBase.y + 0.04,
        },
        {
          x: ringBase.x,
          y: ringBase.y + 0.02,
        },
        {
          x: middleBase.x,
          y: middleBase.y + 0.01,
        },
        {
          x: indexBase.x,
          y: indexBase.y + 0.03,
        },
      ],
    },
    {
      id: "head-line",
      label: "Head Line",
      color: "#c4b5fd",
      points: [
        {
          x: thumbBase.x + 0.03,
          y: thumbBase.y + 0.08,
        },
        {
          x: middleBase.x,
          y: middleBase.y + 0.12,
        },
        {
          x: pinkyBase.x - 0.02,
          y: pinkyBase.y + 0.16,
        },
      ],
    },
    {
      id: "life-line",
      label: "Life Line",
      color: "#fcd34d",
      points: [
        {
          x: indexBase.x,
          y: indexBase.y + 0.02,
        },
        {
          x: thumbBase.x - 0.03,
          y: thumbBase.y + 0.2,
        },
        {
          x: wrist.x - 0.05,
          y: wrist.y - 0.02,
        },
      ],
    },
  ];
}
