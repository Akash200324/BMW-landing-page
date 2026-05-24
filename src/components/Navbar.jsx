"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const allLinks = ["Models", "Build", "Electric", "Features", "Specs", "Innovation"];
const leftLinks = ["Models", "Build", "Electric"];
const rightLinks = ["Features", "Specs", "Innovation"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="absolute top-0 left-0 w-full h-20 md:h-24 px-5 md:px-12 z-50 flex items-center justify-between"
      >
        {/* Left Links — desktop only */}
        <nav className="hidden md:flex items-center gap-10 flex-1">
          {leftLinks.map((link, index) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
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
        <div className="flex items-center justify-center flex-1 md:flex-none">
          <a href="#" className="relative">
            <Image
              src="/image/bmwlogo.png"
              alt="BMW Logo"
              width={70}
              height={70}
              className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:scale-110 transition-transform duration-300 md:w-[90px] md:h-[90px]"
            />
          </a>
        </div>

        {/* Right Links — desktop only */}
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

        {/* Hamburger Button — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] z-[60] relative"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-6 h-[2px] bg-white rounded-full origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-[2px] bg-white rounded-full"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-6 h-[2px] bg-white rounded-full origin-center"
          />
        </button>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {/* BMW Stripe accent */}
            <div className="flex gap-[4px] mb-6">
              <div className="h-[3px] w-12 bg-[#0066b2] rounded-full" />
              <div className="h-[3px] w-12 bg-[#1c325c] rounded-full" />
              <div className="h-[3px] w-12 bg-[#d12229] rounded-full" />
            </div>

            {allLinks.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="font-outfit text-3xl font-black uppercase tracking-widest text-white/80 hover:text-white hover:text-[#0066b2] transition-colors duration-300"
              >
                {link}
              </motion.a>
            ))}

            <div className="flex gap-[4px] mt-6">
              <div className="h-[3px] w-12 bg-[#0066b2] rounded-full" />
              <div className="h-[3px] w-12 bg-[#1c325c] rounded-full" />
              <div className="h-[3px] w-12 bg-[#d12229] rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
