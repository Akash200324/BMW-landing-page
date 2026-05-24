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

    const handleError = () => {
      // If video fails to load on Vercel, don't freeze the site!
      handleCanPlay();
    };

    startProgress();

    // If the video is already cached and ready to play, fire immediately
    if (video.readyState >= 3) {
      handleCanPlay();
    } else {
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("canplaythrough", handleCanPlay);
      video.addEventListener("error", handleError);
    }

    video.addEventListener("ended", handleEnded);

    // Failsafe: never let the preloader get stuck for more than 5 seconds
    const failsafe = setTimeout(() => {
      handleCanPlay();
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(failsafe);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("error", handleError);
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
