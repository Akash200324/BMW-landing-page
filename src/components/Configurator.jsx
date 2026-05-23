"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Gauge, Map, Wind, CircleDashed, Lightbulb, Monitor, Cpu, Volume2, Armchair, HeartHandshake, Battery, Timer, Plug, Activity, Scale, ChevronDown } from "lucide-react";

const getIconForLabel = (label) => {
  switch (label) {
    case "ENGINE": return Zap;
    case "0-100 KM/H": return Gauge;
    case "RANGE": return Map;
    case "AERODYNAMICS": return Wind;
    case "WHEELS": return CircleDashed;
    case "LIGHTING": return Lightbulb;
    case "SCREEN": return Monitor;
    case "SYSTEM": return Cpu;
    case "SOUND": return Volume2;
    case "SEATING": return Armchair;
    case "MATERIALS": return HeartHandshake;
    case "MASSAGE": return Activity;
    case "MAX CHARGE": return Zap;
    case "10-80%": return Timer;
    case "AC CHARGE": return Plug;
    case "BATTERY": return Battery;
    case "DRIVETRAIN": return Cpu;
    case "WEIGHT": return Scale;
    default: return Activity;
  }
};

const bgImages = [
  "/image/car (1).jpg",
  "/image/car (2).jpg",
  "/image/car (3).jpg",
  "/image/car (1).webp",
];

const features = [
  {
    id: "powertrain",
    title: "POWERTRAIN",
    description: "Experience the pinnacle of electric performance with dual motors delivering breathtaking acceleration and supreme handling.",
    data: [
      { label: "ENGINE", value: "536 HP" },
      { label: "0-100 KM/H", value: "4.7 SEC" },
      { label: "RANGE", value: "625 KM WLTP" },
    ]
  },
  {
    id: "design",
    title: "DESIGN",
    description: "A bold statement of luxury. The monolithic surface design is punctuated by crystal headlights and an illuminated kidney grille.",
    data: [
      { label: "AERODYNAMICS", value: "0.24 CD" },
      { label: "WHEELS", value: "21 INCH" },
      { label: "LIGHTING", value: "CRYSTAL" },
    ]
  },
  {
    id: "tech",
    title: "TECH",
    description: "Immerse yourself in the future with BMW Panoramic Vision and a theatre screen that transforms the rear cabin into a private cinema.",
    data: [
      { label: "SCREEN", value: "31.3 INCH" },
      { label: "SYSTEM", value: "iDRIVE 8.5" },
      { label: "SOUND", value: "B&W 4D" },
    ]
  },
  {
    id: "luxury",
    title: "LUXURY",
    description: "Unprecedented comfort with executive lounge seating, cashmere blend upholstery, and multi-contour massage seats.",
    data: [
      { label: "SEATING", value: "EXECUTIVE" },
      { label: "MATERIALS", value: "CASHMERE" },
      { label: "MASSAGE", value: "9 MODES" },
    ]
  },
  {
    id: "charging",
    title: "CHARGING",
    description: "Rapid charging capabilities ensure you're always ready. Charge from 10% to 80% in just under 34 minutes at a DC fast station.",
    data: [
      { label: "MAX CHARGE", value: "195 kW" },
      { label: "10-80%", value: "34 MIN" },
      { label: "AC CHARGE", value: "11 kW" },
    ]
  },
  {
    id: "i7-specs",
    title: "I7 SPECS",
    description: "The ultimate electric driving machine. Combining the heritage of the 7 Series with an uncompromising electric drivetrain.",
    data: [
      { label: "BATTERY", value: "105.7 kWh" },
      { label: "DRIVETRAIN", value: "xDRIVE" },
      { label: "WEIGHT", value: "2715 KG" },
    ]
  }
];

export default function Configurator() {
  const [bgIndex, setBgIndex] = useState(0);
  const [activeFeature, setActiveFeature] = useState(features[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Background Slider Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000); // Reduced to 5s to prevent feeling stuck
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="configurator" className="relative w-full h-screen bg-black overflow-hidden font-sans">
      {/* Dynamic Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={bgImages[bgIndex]}
            alt="BMW Background"
            className="w-full h-full object-cover"
          />
          {/* Lighter Dark Overlay for contrast so image is clearer */}
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-20">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-xl rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 p-6 md:p-8 flex flex-col gap-6 shadow-2xl"
        >
          
          {/* Dropdown Feature Selector */}
          <div className="relative w-full">
            <span className="text-white/50 text-[10px] tracking-widest uppercase block mb-2 font-bold">Select Feature</span>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between bg-white/5 border border-white/20 px-4 py-3 rounded-lg text-white font-outfit uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              {activeFeature.title}
              <ChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} size={20} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 w-full mt-2 bg-black/90 border border-white/20 rounded-lg overflow-hidden z-20"
                >
                  {features.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => {
                        setActiveFeature(feature);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 uppercase tracking-widest font-outfit text-sm transition-colors hover:bg-white/20 ${
                        activeFeature.id === feature.id ? 'text-blue-400 bg-white/10' : 'text-white'
                      }`}
                    >
                      {feature.title}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dynamic Content */}
          <div className="flex flex-col relative overflow-hidden min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                  },
                  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
                }}
                className="flex flex-col gap-4"
              >
                <motion.h2 
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest font-outfit"
                >
                  {activeFeature.title}
                </motion.h2>

                <motion.p 
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  className="text-white/80 text-sm md:text-base leading-relaxed font-light"
                >
                  {activeFeature.description}
                </motion.p>

                {/* Performance Data Points Widgets */}
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  className="flex flex-wrap gap-6 md:gap-10 mt-4"
                >
                  {activeFeature.data.map((item, idx) => {
                    const Icon = getIconForLabel(item.label);
                    return (
                      <div key={idx} className="flex flex-col gap-1 group">
                        <span className="text-[#0066b2] text-[10px] tracking-widest uppercase flex items-center gap-1.5 font-bold">
                          <Icon size={12} className="group-hover:scale-110 transition-transform" />
                          {item.label}
                        </span>
                        <span className="text-white text-xl md:text-2xl font-medium tracking-wider font-outfit group-hover:text-gray-300 transition-colors">
                          {item.value}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>

              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
