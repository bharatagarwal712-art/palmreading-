"use client";

import Script from "next/script";

export function OpenCvLoader() {
  return (
    <Script
      src="https://docs.opencv.org/4.x/opencv.js"
      strategy="afterInteractive"
      onLoad={() => {
        console.log("OpenCV loaded");
      }}
    />
  );
}
