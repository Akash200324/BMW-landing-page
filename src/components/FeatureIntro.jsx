"use client";
import { motion } from "framer-motion";

export default function FeatureIntro() {
  const handleScrollToConfigurator = () => {
    const configSection = document.getElementById("configurator");
    if (configSection) {
      configSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
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
          alt="Feature Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
          className="text-white text-5xl md:text-7xl font-bold tracking-widest uppercase mb-8 drop-shadow-2xl"
        >
          Discover More
        </motion.h2>

        <motion.button
          onClick={handleScrollToConfigurator}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: false }}
          className="px-10 py-4 rounded-full border border-white/40 text-white uppercase tracking-widest text-sm hover:bg-white hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 backdrop-blur-sm font-semibold"
        >
          Features
        </motion.button>
      </div>
    </section>
  );
}
