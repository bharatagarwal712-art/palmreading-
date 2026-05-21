"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    console.log("Palm uploaded:", file.name);

    window.location.href = "/processing";
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
      >
        <Upload className="size-4" aria-hidden />
        Upload palm
      </Button>
    </>
  );
}
