export type PalmReadingStatus = "draft" | "uploading" | "processing" | "ready";

export type PalmReading = {
  id: string;
  user_id: string;
  status: PalmReadingStatus;
  intention: string | null;
  palm_image_path: string | null;
  created_at: string;
  updated_at: string;
};

export type StorageBucket = "palm-uploads" | "reading-artifacts";
