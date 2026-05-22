export const PALM_UPLOAD_STORAGE_KEY = "palm_upload_preview";
export const PALM_REPORT_STORAGE_KEY = "palm_generated_report";

export async function savePalmUpload(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        reject(new Error("Failed to process upload"));
        return;
      }

      sessionStorage.setItem(PALM_UPLOAD_STORAGE_KEY, result);
      resolve(result);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read upload"));
    };

    reader.readAsDataURL(file);
  });
}

export function savePalmReport(report: string) {
  if (typeof window === "undefined") return;

  sessionStorage.setItem(PALM_REPORT_STORAGE_KEY, report);
}

export function getPalmReport() {
  if (typeof window === "undefined") return null;

  return sessionStorage.getItem(PALM_REPORT_STORAGE_KEY);
}

export function getPalmUpload() {
  if (typeof window === "undefined") return null;

  return sessionStorage.getItem(PALM_UPLOAD_STORAGE_KEY);
}

export function clearPalmUpload() {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(PALM_UPLOAD_STORAGE_KEY);
}

export function clearPalmReport() {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(PALM_REPORT_STORAGE_KEY);
}
