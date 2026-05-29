"use client";

import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { savePalmUpload } from "@/lib/palm-upload-session";

interface UploadPalmButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "secondary" | "outline" | "ghost";
  fullWidth?: boolean;
}

export function UploadPalmButton({
  className,
  size = "lg",
  variant = "default",
  fullWidth = false,
}: UploadPalmButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);
      await savePalmUpload(file);
      window.location.href = "/processing";
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      <Button
        size={size}
        variant={variant}
        className={`${fullWidth ? "w-full" : ""} ${className ?? ""}`}
        onClick={handleUploadClick}
        disabled={uploading}
      >
        {uploading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Upload className="size-4" aria-hidden />
        )}
        {uploading ? "Preparing scan..." : "Upload palm"}
      </Button>
    </>
  );
}
