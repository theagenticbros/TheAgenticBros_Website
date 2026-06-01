"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#differentiator", label: "Why Us" },
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-cyan-500/10"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo (Left) */}
        <Link
          href="/"
          className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white z-10 w-48"
        >
          THE AGENTIC <span className="text-cyber-cyan">BROS</span>
        </Link>

        {/* Desktop Nav (Center) */}
        <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-cyber-cyan transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA (Right) */}
        <div className="hidden md:flex justify-end w-48">
          <Link href="#contact" className="group">
            <div className="border border-cyber-cyan/30 bg-black/40 backdrop-blur-xl h-10 lg:h-12 rounded-full flex items-center transition-all duration-300 group-hover:scale-105 group-hover:border-cyber-cyan group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <div className="pl-5 pr-4 text-sm font-medium text-white transition-colors group-hover:text-cyber-cyan">
                Start Your Project
              </div>
              <div className="bg-cyber-cyan h-[85%] aspect-square rounded-full flex items-center justify-center mr-1">
                <ArrowRight className="w-5 h-5 text-black -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
              </div>
            </div>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 z-10"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-cyan-500/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-cyber-cyan transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <MagneticButton variant="primary" size="md" className="w-full">
                  Start Your Project
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
