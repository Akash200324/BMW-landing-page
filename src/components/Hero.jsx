"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative z-10 w-full h-screen flex items-center px-6 md:px-16 pointer-events-none">
      <div className="max-w-2xl mt-24 md:mt-20 pointer-events-auto">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
          className="font-outfit text-5xl md:text-7xl font-black leading-tight tracking-tight text-white mb-6 uppercase drop-shadow-[0_5px_20px_rgba(0,0,0,0.5)]"
        >
          THE ALL-NEW<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066b2] to-white">
            BMW 7 SERIES
          </span>
        </motion.h1>

        <motion.p
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
          className="font-inter text-lg md:text-xl text-white/85 leading-relaxed mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
        >
          Experience the ultimate driving machine with unmatched luxury, futuristic design, and thrilling performance.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <a href="#discover" className="inline-block font-outfit text-xs font-bold uppercase tracking-widest text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-8 py-4 rounded transition-all duration-300 border border-white/20">
            Discover More
          </a>
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-outfit text-[10px] tracking-[0.4em] font-bold text-white/50 uppercase">
          Scroll to Discover
        </span>
        <div className="w-[1px] h-10 bg-white/30 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full bg-white"
          />
        </div>
      </motion.div>
    </div>
  );
}
