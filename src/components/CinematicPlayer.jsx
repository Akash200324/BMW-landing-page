"use client";
import { useEffect, useRef } from "react";

export default function CinematicPlayer({ onProgress, onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const imagePaths = [];
    const preloadedImages = [];

    // logo
    for (let i = 1; i <= 40; i++) {
      imagePaths.push(`/image/3dmodel/logo (${i}).jpg`);
    }
    // speedmeter
    for (let i = 4; i <= 26; i++) {
      imagePaths.push(`/image/3dmodel/speedmeter (${i}).jpg`);
    }
    // headlight
    for (let i = 1; i <= 40; i++) {
      imagePaths.push(`/image/3dmodel/headlight (${i}).jpg`);
    }
    // carside
    for (let i = 1; i <= 27; i++) {
      if (i === 18) continue;
      imagePaths.push(`/image/3dmodel/carside (${i}).jpg`);
    }

    const sequenceCount = imagePaths.length;
    let imagesLoaded = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      drawFrame(0);
    };

    const drawFrame = (index) => {
      if (index >= sequenceCount || !preloadedImages[index]) return;
      const img = preloadedImages[index];

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover full screen
      const ratio = Math.max(cw / iw, ch / ih);
      const nw = iw * ratio;
      const nh = ih * ratio;
      const cx = (cw - nw) / 2;
      const cy = (ch - nh) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, cx, cy, nw, nh);
    };

    let frame = 0;
    let sequenceTimer = null;
    const fps = 10; // 0.9x of original 11 fps

    const startVideo = () => {
      clearInterval(sequenceTimer);
      sequenceTimer = setInterval(() => {
        drawFrame(frame);
        frame++;
        if (frame >= sequenceCount) {
          frame = 0;
          if (onComplete) onComplete();
        }
      }, 1000 / fps);
    };

    // Preload
    imagePaths.forEach((path, idx) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        imagesLoaded++;
        if (onProgress) {
          onProgress((imagesLoaded / sequenceCount) * 100);
        }
        preloadedImages[idx] = img;
        if (imagesLoaded === sequenceCount) {
          resizeCanvas();
          startVideo();
        }
      };
    });

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(sequenceTimer);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-black z-0 overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full object-cover opacity-100"></canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none"></div>
    </div>
  );
}
