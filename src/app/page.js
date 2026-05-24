"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CinematicPlayer from "@/components/CinematicPlayer";
import SunsetSlide from "@/components/SunsetSlide";
import Preloader from "@/components/Preloader";
import FeatureIntro from "@/components/FeatureIntro";
import Configurator from "@/components/Configurator";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleProgress = (p) => {
    setProgress((prev) => Math.max(prev, p));
  };

  // ── GUARANTEED preloader dismiss after 5 seconds ──
  // This fires no matter what the video does on Vercel.
  useEffect(() => {
    const guaranteed = setTimeout(() => {
      setProgress(100);
    }, 5000);
    return () => clearTimeout(guaranteed);
  }, []);

  // Auto transition from Sunset back to Cinematic after 10s
  useEffect(() => {
    if (currentSlide === 1) {
      const timer = setTimeout(() => {
        setCurrentSlide(0);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  const handleNext = () => setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  const handlePrev = () => setCurrentSlide((prev) => (prev === 1 ? 0 : 1));

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden select-none">
      <Preloader progress={progress} />

      {/* Hero Section (100vh) — Navbar lives inside so it overlays the video */}
      <div className="relative w-full h-screen">

        {/* Navbar sits inside the video section */}
        <Navbar />

        <AnimatePresence mode="wait">
          {currentSlide === 0 && (
            <motion.div
              key="cinematic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-0"
            >
              <CinematicPlayer
                onProgress={handleProgress}
                onComplete={() => setCurrentSlide(1)}
              />
              <Hero />
            </motion.div>
          )}

          {currentSlide === 1 && (
            <SunsetSlide key="sunset" />
          )}
        </AnimatePresence>

        {/* Small Navigators */}
        <div className="absolute right-5 bottom-1/2 translate-y-1/2 z-50 flex flex-col gap-4">
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur flex items-center justify-center text-white/50 hover:text-white hover:border-white hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            aria-label="Next Slide"
          >
            &#10095;
          </button>
        </div>
        <div className="absolute left-5 bottom-1/2 translate-y-1/2 z-50 flex flex-col gap-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur flex items-center justify-center text-white/50 hover:text-white hover:border-white hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            aria-label="Previous Slide"
          >
            &#10094;
          </button>
        </div>
      </div>

      {/* Feature Sections */}
      <FeatureIntro />
      <Configurator />
    </main>
  );
}
