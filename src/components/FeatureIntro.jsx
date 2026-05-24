"use client";
import { motion } from "framer-motion";

export default function FeatureIntro() {
  const scrollToFeatures = () => {
    document.getElementById("configurator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/image/feature.jpg"
          alt="BMW Feature"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-10">
        {/* Heading */}
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="font-outfit font-black text-white text-5xl md:text-7xl uppercase tracking-widest text-center drop-shadow-2xl"
        >
          Explore Features
        </motion.h2>

        {/* Animated CTA Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center"
        >
          {/* Outer pulse rings */}
          <span className="absolute w-48 h-14 rounded-full border border-white/20 bmw-pulse-ring" />
          <span className="absolute w-48 h-14 rounded-full border border-white/10 bmw-pulse-ring" style={{ animationDelay: "0.8s" }} />

          <button
            onClick={scrollToFeatures}
            className="relative group font-outfit text-[11px] font-bold tracking-[0.4em] uppercase text-white border border-white/40 px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-400 overflow-hidden"
          >
            {/* Fill hover sweep */}
            <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400 ease-out rounded-full" />
            <span className="relative flex items-center gap-3">
              See More Features
              {/* Bouncing arrow */}
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                className="inline-block text-base leading-none"
              >
                ↓
              </motion.span>
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
