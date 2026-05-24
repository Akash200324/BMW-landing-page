"use client";
import { useEffect, useRef } from "react";

export default function CinematicPlayer({ onProgress, onComplete }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Simulate smooth progress from 0 → 100 as video loads
    let simulatedProgress = 0;
    let progressInterval = null;

    const startProgress = () => {
      progressInterval = setInterval(() => {
        simulatedProgress += 2;
        if (onProgress) onProgress(Math.min(simulatedProgress, 99));
        if (simulatedProgress >= 99) {
          clearInterval(progressInterval);
        }
      }, 40);
    };

    const handleCanPlay = () => {
      clearInterval(progressInterval);
      if (onProgress) onProgress(100);
      video.play().catch(() => {});
    };

    const handleEnded = () => {
      if (onComplete) onComplete();
    };

    startProgress();
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleEnded);

    return () => {
      clearInterval(progressInterval);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-black z-0 overflow-hidden">
      <video
        ref={videoRef}
        src="/video/animation.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ pointerEvents: "none" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
    </div>
  );
}
