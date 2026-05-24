"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

/* ─────────────────────────── DATA ─────────────────────────── */
const features = [
  {
    id: "01", label: "Performance",
    titleLines: ["TWIN TURBO", "ENGINE"],
    desc: "530 HP of pure engineering. BMW TwinPower Turbo delivers brutal thrust with surgical precision at every RPM.",
    image: "/image/car (1).jpg",
  },
  {
    id: "02", label: "Design",
    titleLines: ["LASER", "HEADLIGHTS"],
    desc: "Laserlight technology illuminates up to 600m. Crystal lenses sculpted to define the next era of automotive lighting.",
    image: "/image/car (2).jpg",
  },
  {
    id: "03", label: "Dynamics",
    titleLines: ["M SPORT", "SUSPENSION"],
    desc: "Reads the road 100 times per second. Perfect sport-comfort balance delivered at every corner and straight.",
    image: "/image/car (3).jpg",
  },
  {
    id: "04", label: "Technology",
    titleLines: ["PANORAMIC", "SCREEN"],
    desc: "The 31.3-inch 8K theatre screen transforms the rear into a private cinema. Panoramic Vision overlays data in sight.",
    image: "/image/bmw-2027-i7-60-xdrive-ev.avif",
  },
  {
    id: "05", label: "Luxury",
    titleLines: ["EXECUTIVE", "LOUNGE"],
    desc: "Zero-gravity seating with nine massage modes, cashmere upholstery, and 40 ambient colours. A first-class sanctuary.",
    image: "/image/AA21DEt9.jpeg",
  },
  {
    id: "06", label: "Control",
    titleLines: ["xDRIVE", "ALL-WHEEL"],
    desc: "Intelligent torque distribution with pinpoint precision. Supreme traction assured in every driving condition.",
    image: "/image/2020-bmw-7-series-041.webp",
  },
];

const specs = [
  { value: "530",   unit: "HP",   label: "Engine Power"    },
  { value: "4.7",   unit: "SEC",  label: "0 – 100 km/h"   },
  { value: "625",   unit: "KM",   label: "WLTP Range"      },
  { value: "105.7", unit: "kWh",  label: "Battery Pack"    },
  { value: "195",   unit: "kW",   label: "Max Charge Rate" },
  { value: "21",    unit: "INCH", label: "Alloy Wheels"    },
];

/* ─────────────────── COUNT-UP HOOK ─────────────────── */
function useCountUp(target, isActive) {
  const [display, setDisplay] = useState("0");
  const hasDecimal = target.includes(".");
  useEffect(() => {
    if (!isActive) return;
    const end = parseFloat(target);
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(hasDecimal ? (end * ease).toFixed(1) : String(Math.floor(end * ease)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isActive, target]);
  return display;
}

/* ─────────────────── SPEC CARD ─────────────────── */
function SpecCard({ spec, index }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const count = useCountUp(spec.value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex items-baseline gap-6 py-10 px-8 border-b border-white/[0.07] hover:bg-white/[0.025] transition-colors duration-500 cursor-default"
      style={{ borderRight: index % 2 === 0 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
    >
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#0066b2] via-[#1c325c] to-[#d12229] transition-all duration-500" />

      {/* Reduced size for technical section numbers as requested */}
      <span
        className="font-outfit font-black text-white leading-none tabular-nums"
        style={{ fontSize: "clamp(40px, 5.5vw, 76px)" }}
      >
        {count}
      </span>

      <div className="flex flex-col gap-1">
        <span className="font-outfit font-bold text-white/45 text-xl leading-none">{spec.unit}</span>
        <span className="font-outfit text-white/55 text-xs tracking-[0.3em] uppercase">{spec.label}</span>
      </div>
    </motion.div>
  );
}

/* ─────────────────── SPEC SECTION: Orbit 3D BMW Logo ─────────────────── */
function BMWOrbitLogo() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * Math.PI * 2,
    r: 190 + (i % 4) * 25,
    delay: i * 0.35,
    size: 2 + (i % 3),
    dur: 3 + (i % 5) * 0.6,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="absolute w-[520px] h-[520px] rounded-full border border-[#0066b2]/6 bmw-pulse-ring" style={{ animationDuration: "5s" }} />
      <div className="absolute w-[400px] h-[400px] rounded-full border border-[#0066b2]/10 bmw-pulse-ring" style={{ animationDuration: "4s", animationDelay: "1.5s" }} />
      <div className="absolute w-[280px] h-[280px] rounded-full border border-[#0066b2]/7 bmw-pulse-ring" style={{ animationDuration: "4.5s", animationDelay: "0.8s" }} />

      {/* INCREASED GLARE in technical section */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(0,102,178,0.3) 0%, rgba(0,102,178,0.05) 40%, transparent 70%)" }}
      />

      {/* ORBIT spinning logo */}
      <img
        src="/image/bmwlogo.png"
        alt="BMW"
        className="w-[22rem] h-[22rem] object-contain bmw-orbit-spin"
        style={{
          opacity: 0.2,
          filter: "drop-shadow(0 0 80px rgba(0,102,178,1)) drop-shadow(0 0 150px rgba(0,102,178,0.6))",
        }}
      />

      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#0066b2]"
          style={{
            width: p.size, height: p.size,
            left: `calc(50% + ${Math.cos(p.angle) * p.r}px)`,
            top: `calc(50% + ${Math.sin(p.angle) * p.r}px)`,
            animation: `bmwParticle ${p.dur}s ease-in-out ${p.delay}s infinite`,
            opacity: 0.6,
          }}
        />
      ))}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, transparent 15%, #000 80%)" }} />
    </div>
  );
}

/* ─────────────────── FEATURE ROW ─────────────────── */
function FeatureRow({ feature, index }) {
  const imageLeft = index % 2 === 0;

  const textPanel = (
    <div className="relative w-full md:w-1/2 h-auto md:h-full bg-transparent flex flex-col justify-center px-6 sm:px-10 xl:px-20 py-10 overflow-hidden">
      
      {/* Glare effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)" }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center gap-3 mb-5 md:mb-8"
      >
        <span className="font-outfit text-[#0066b2] text-[12px] font-bold tracking-[0.4em] uppercase">{feature.id}</span>
        <div className="w-8 h-px bg-[#0066b2]" />
        <span className="font-outfit text-white/30 text-[11px] tracking-[0.4em] uppercase">{feature.label}</span>
      </motion.div>

      {/* Title */}
      <div className="relative z-10 mb-5 md:mb-8">
        {feature.titleLines.map((line, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "108%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.06 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              className="font-outfit font-light text-white uppercase leading-[0.95] tracking-wide"
              style={{ fontSize: "clamp(32px, 6vw, 92px)" }}
            >
              {line}
            </motion.h2>
          </div>
        ))}
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.32 }}
        className="relative z-10 font-inter text-white/60 text-base md:text-lg leading-relaxed max-w-[400px] mb-6 md:mb-8 font-light"
      >
        {feature.desc}
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.46 }}
        className="relative z-10 group/cta flex items-center gap-2 cursor-pointer w-fit"
      >
        <span className="font-outfit text-[12px] font-bold tracking-[0.35em] uppercase text-[#0066b2] group-hover/cta:text-white transition-colors duration-300">
          More Detail
        </span>
        <span className="text-[#0066b2] group-hover/cta:text-white group-hover/cta:translate-x-1 transition-all duration-300 text-xl leading-none">+</span>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex gap-[3px] mt-8 md:mt-10 origin-left"
      >
        <div className="h-[2px] w-12 rounded-full bg-[#0066b2]" />
        <div className="h-[2px] w-12 rounded-full bg-[#1c325c]" />
        <div className="h-[2px] w-12 rounded-full bg-[#d12229]" />
      </motion.div>
    </div>
  );

  const imagePanel = (
    <div className="w-full md:w-1/2 h-56 sm:h-72 md:h-full overflow-hidden">
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        src={feature.image}
        alt={feature.titleLines.join(" ")}
        className="w-full h-full object-cover"
      />
    </div>
  );

  return (
    <div className="relative w-full flex flex-col md:flex-row border-b border-white/[0.04]" style={{ minHeight: "clamp(480px, 70vh, 900px)" }}>
      {/* On mobile: always image first, then text. On desktop: alternate */}
      <div className="flex md:hidden flex-col w-full">
        {imagePanel}
        {textPanel}
      </div>
      <div className="hidden md:flex w-full h-full">
        {imageLeft ? <>{imagePanel}{textPanel}</> : <>{textPanel}{imagePanel}</>}
      </div>
    </div>
  );
}

/* ─────────────────── MAIN COMPONENT ─────────────────── */
export default function Configurator() {
  const containerRef = useRef(null);

  // Scroll mapping for the floating coin
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Calculate precise center points for 6 rows
  const rawX = useTransform(
    scrollYProgress,
    [0, 0.08, 0.25, 0.42, 0.58, 0.75, 0.92, 1],
    ["25vw", "25vw", "-25vw", "25vw", "-25vw", "25vw", "-25vw", "-25vw"]
  );

  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.08, 0.165, 0.25, 0.335, 0.42, 0.5, 0.58, 0.665, 0.75, 0.835, 0.92, 1],
    [1, 1,    0.6,   1,    0.6,   1,    0.6, 1,    0.6,   1,    0.6,   1,    1]
  );

  // New robust vertical tracking: Maps progress to top %
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Apply spring for a smooth floating feeling
  const smoothX = useSpring(rawX, { stiffness: 35, damping: 20, mass: 1 });
  const smoothScale = useSpring(rawScale, { stiffness: 35, damping: 20, mass: 1 });
  const smoothY = useSpring(rawY, { stiffness: 50, damping: 25, mass: 1 });

  return (
    <div id="configurator" className="bg-black relative">

      {/* ══════════════════════════════════════
          1. FEATURE ROWS with FLOAT COIN
      ══════════════════════════════════════ */}
      <section className="pt-20 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 px-8"
        >
          <span className="font-outfit text-white/25 text-[12px] tracking-[0.55em] uppercase block mb-4">BMW Excellence</span>
          <h2 className="font-outfit font-black text-white text-4xl md:text-5xl tracking-[0.2em] uppercase">Core Features</h2>
          <div className="flex justify-center gap-[3px] mt-6">
            <div className="h-[2px] w-10 bg-[#0066b2] rounded-full" />
            <div className="h-[2px] w-10 bg-[#1c325c] rounded-full" />
            <div className="h-[2px] w-10 bg-[#d12229] rounded-full" />
          </div>
        </motion.div>

        {/* CONTAINER FOR SCROLL TRACKING */}
        <div ref={containerRef} className="relative w-full">

          {/* ── SINGLE FLOATING COIN — hidden on mobile ── */}
          <motion.div
            className="hidden md:flex"
            style={{
              position: "absolute",
              top: smoothY,
              left: "50%",
              x: smoothX,
              scale: smoothScale,
              pointerEvents: "none",
              marginTop: "-250px",
              marginLeft: "-250px", // Centers horizontally
              width: 500,
              height: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
            }}
          >
            {/* Massive background glare/bloom for the floating coin */}
            <div
              className="absolute w-[800px] h-[800px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(0,102,178,0.3) 0%, rgba(0,102,178,0.1) 40%, transparent 70%)",
                filter: "blur(70px)",
              }}
            />
            
            {/* The Spinning Coin */}
            <img
              src="/image/bmwlogo.png"
              alt=""
              className="bmw-coin-spin"
              style={{
                width: "70%",
                height: "70%",
                objectFit: "contain",
                opacity: 0.45,
                filter: "drop-shadow(0 0 80px rgba(0,102,178,1))",
              }}
            />
          </motion.div>

          {/* Rows */}
          <div style={{ position: "relative", zIndex: 10 }}>
            {features.map((feature, i) => (
              <FeatureRow key={feature.id} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. SPEC SECTION
      ══════════════════════════════════════ */}
      <section className="relative w-full bg-black overflow-hidden pt-28 pb-36 border-t border-white/5 mt-10">
        <BMWOrbitLogo />

        <div className="relative z-10 px-8 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-center mb-24"
          >
            <span className="font-outfit text-white/25 text-[12px] tracking-[0.55em] uppercase block mb-5">Technical</span>
            <h2 className="font-outfit font-black text-white text-3xl md:text-4xl tracking-[0.25em] uppercase">
              BMW 7 SERIES — SPECIFICATION
            </h2>
            <div className="flex justify-center gap-[3px] mt-8">
              <div className="h-[2px] w-12 bg-[#0066b2] rounded-full" />
              <div className="h-[2px] w-12 bg-[#1c325c] rounded-full" />
              <div className="h-[2px] w-12 bg-[#d12229] rounded-full" />
            </div>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2">
            {specs.map((spec, i) => (
              <SpecCard key={i} spec={spec} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
