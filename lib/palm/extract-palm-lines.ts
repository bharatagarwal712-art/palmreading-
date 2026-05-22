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

interface CvMat {
  delete: () => void;
}

interface CvContour {
  data32S: number[];
}

interface CvMatVector {
  size: () => number;
  get: (index: number) => CvContour;
  delete: () => void;
}

interface CvKernel {
  delete: () => void;
}

declare global {
  interface Window {
    cv?: {
      imread: (image: HTMLImageElement) => CvMat;
      Mat: {
        new (): CvMat;
        ones: (
          rows: number,
          cols: number,
          type: number,
        ) => CvKernel;
      };
      CLAHE: new (
        clipLimit: number,
        tileGridSize: {
          width: number;
          height: number;
        },
      ) => {
        apply: (src: CvMat, dst: CvMat) => void;
      };
      Size: new (
        width: number,
        height: number,
      ) => {
        width: number;
        height: number;
      };
      MatVector: new () => CvMatVector;
      morphologyEx: (...args: unknown[]) => void;
      GaussianBlur: (...args: unknown[]) => void;
      cvtColor: (...args: unknown[]) => void;
      Canny: (...args: unknown[]) => void;
      findContours: (...args: unknown[]) => void;
      contourArea: (contour: CvContour) => number;
      COLOR_RGBA2GRAY: number;
      MORPH_CLOSE: number;
      RETR_LIST: number;
      CHAIN_APPROX_SIMPLE: number;
      CV_8U: number;
    };
  }
}

export async function extractPalmLines(
  imageElement: HTMLImageElement,
): Promise<PalmLineOverlay[]> {
  const cv = window.cv;

  if (!cv) {
    console.warn("OpenCV.js not loaded");
    return [];
  }

  const sourceWidth = imageElement.naturalWidth;
  const sourceHeight = imageElement.naturalHeight;

  const src = cv.imread(imageElement);

  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

  const clahe = new cv.CLAHE(2.0, new cv.Size(8, 8));
  const enhanced = new cv.Mat();
  clahe.apply(gray, enhanced);

  const blurred = new cv.Mat();
  cv.GaussianBlur(enhanced, blurred, new cv.Size(5, 5), 0);

  const edges = new cv.Mat();
  cv.Canny(blurred, edges, 60, 180);

  const kernel = cv.Mat.ones(3, 3, cv.CV_8U);
  const cleaned = new cv.Mat();

  cv.morphologyEx(
    edges,
    cleaned,
    cv.MORPH_CLOSE,
    kernel,
  );

  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();

  cv.findContours(
    cleaned,
    contours,
    hierarchy,
    cv.RETR_LIST,
    cv.CHAIN_APPROX_SIMPLE,
  );

  const overlays: PalmLineOverlay[] = [];

  for (let i = 0; i < contours.size(); i++) {
    const contour = contours.get(i);

    const area = cv.contourArea(contour);

    if (area < 180) continue;

    const points: PalmPoint[] = [];

    for (let j = 0; j < contour.data32S.length; j += 2) {
      const rawX = contour.data32S[j];
      const rawY = contour.data32S[j + 1];

      const normalizedX = rawX / sourceWidth;
      const normalizedY = rawY / sourceHeight;

      points.push({
        x: normalizedX,
        y: normalizedY,
      });
    }

    if (points.length < 22) continue;

    const averageY =
      points.reduce((sum, point) => sum + point.y, 0) /
      points.length;

    let label = "Palm Line";
    let color = "#7dd3fc";

    if (averageY < 0.38) {
      label = "Heart Line";
      color = "#7dd3fc";
    } else if (averageY < 0.58) {
      label = "Head Line";
      color = "#c4b5fd";
    } else {
      label = "Life Line";
      color = "#fcd34d";
    }

    overlays.push({
      id: `${label}-${i}`,
      label,
      color,
      points,
    });
  }

  src.delete();
  gray.delete();
  enhanced.delete();
  blurred.delete();
  edges.delete();
  cleaned.delete();
  contours.delete();
  hierarchy.delete();
  kernel.delete();

  return overlays.slice(0, 8);
}
