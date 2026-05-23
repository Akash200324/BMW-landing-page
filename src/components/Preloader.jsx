"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ progress }) {
  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 1 } }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="flex items-center gap-2 mb-8">
            <span className="font-outfit text-7xl font-black italic text-white drop-shadow-lg tracking-tighter">M</span>
            <div className="flex flex-col gap-1 -skew-x-[15deg] mt-4">
              <span className="w-12 h-2 bg-[#0066b2] rounded-sm"></span>
              <span className="w-12 h-2 bg-[#1c325c] rounded-sm"></span>
              <span className="w-12 h-2 bg-[#d12229] rounded-sm"></span>
            </div>
          </div>
          <h2 className="font-outfit text-[11px] font-semibold tracking-[0.5em] text-white/65 uppercase mb-6">
            PREPARING EXPERIENCE
          </h2>
          <div className="w-64 max-w-[90%] h-1 bg-white/10 rounded-full overflow-hidden mb-4 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            <div
              className="h-full bg-gradient-to-r from-[#0066b2] via-[#1c325c] to-[#d12229] transition-all duration-300 ease-out shadow-[0_0_8px_#d12229]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="font-outfit text-xs text-white tracking-widest font-light">
            {Math.round(progress)}% Loaded
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
