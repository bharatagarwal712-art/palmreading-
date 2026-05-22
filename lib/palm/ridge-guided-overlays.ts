export interface RidgePoint {
  x: number;
  y: number;
}

export function refinePalmLine(
  points: RidgePoint[],
  imageWidth: number,
  imageHeight: number,
): RidgePoint[] {
  return points.map((point, index) => {
    const wave = Math.sin(index * 0.4) * 0.004;

    return {
      x: Math.min(0.95, Math.max(0.05, point.x + wave)),
      y: Math.min(0.95, Math.max(0.05, point.y + wave * 0.6)),
    };
  });
}
