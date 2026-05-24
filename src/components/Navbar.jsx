"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const leftLinks = ["Models", "Build", "Electric"];
  const rightLinks = ["Features", "Specs", "Innovation"];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
      className="absolute top-0 left-0 w-full h-24 px-12 z-50 flex items-center justify-between"
    >
      {/* Left Links */}
      <nav className="hidden md:flex items-center gap-10 flex-1">
        {leftLinks.map((link, index) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase().replace(' ', '-')}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
            className="group relative font-outfit text-sm font-semibold tracking-widest uppercase text-white/80 hover:text-white transition-colors duration-300 py-2"
          >
            {link}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#0066b2] to-[#d12229] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.a>
        ))}
      </nav>

      {/* Center Logo */}
      <div className="flex items-center justify-center flex-1">
        <a href="#" className="relative">
          <Image
            src="/image/bmwlogo.png"
            alt="BMW Logo"
            width={90}
            height={90}
            className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:scale-110 transition-transform duration-300"
          />
        </a>
      </div>

      {/* Right Links */}
      <nav className="hidden md:flex items-center justify-end gap-10 flex-1">
        {rightLinks.map((link, index) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 + index * 0.1 }}
            className="group relative font-outfit text-sm font-semibold tracking-widest uppercase text-white/80 hover:text-white transition-colors duration-300 py-2"
          >
            {link}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#0066b2] to-[#d12229] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.a>
        ))}
      </nav>
    </motion.header>
  );
}
