"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function SunsetSlide() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 200;
        this.size = Math.random() * 100 + 50;
        this.speedY = Math.random() * -1 - 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.3 + 0.1;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.size < 200) this.size += 0.2;
        if (this.y < -100) {
          this.y = canvas.height + 100;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, `rgba(200, 200, 200, ${this.opacity})`);
        gradient.addColorStop(1, "rgba(200, 200, 200, 0)");
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 40; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 w-full h-full z-20 flex flex-col md:flex-row items-center justify-start overflow-hidden"
    >
      {/* Background Image (Full Screen stretched) */}
      <div className="absolute inset-0 w-full h-full z-10">
        <Image
          src="/image/orange.png"
          alt="BMW Sunset"
          fill
          className="object-cover object-center w-full h-full"
          priority
        />
      </div>

      {/* Smoke Canvas overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-15 pointer-events-none mix-blend-screen opacity-50"
      ></canvas>

      {/* Content */}
      <div className="relative z-30 w-full md:w-1/2 flex flex-col pl-8 md:pl-24 items-start justify-center h-full drop-shadow-2xl">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[12px] font-bold tracking-[0.3em] text-[#ff5e00] mb-5 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-8 before:h-0.5 before:bg-[#ff5e00]"
          style={{ fontFamily: "'BMWTypeNext', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          SUNSET METALLIC
        </motion.div>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl md:text-[80px] font-medium leading-[1] tracking-tight text-white mb-6 uppercase"
          style={{ fontFamily: "'BMWTypeNext', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          THE M7
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-[16px] leading-relaxed text-white/90 max-w-md mb-8"
          style={{ fontFamily: "'BMWTypeNext', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          The "Sunset Metallic" edition is designed to evoke a burst of molten adrenaline. Set against a dramatic, moody backdrop of atmospheric smoke, the vehicle's metallic curves radiate speed and precision, perfectly capturing the high-performance spirit.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <a href="#" className="inline-block text-[12px] font-bold uppercase tracking-[0.2em] text-white border border-white/50 hover:bg-white hover:text-black px-10 py-4 transition-all duration-300" style={{ fontFamily: "'BMWTypeNext', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
            Experience Power
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
