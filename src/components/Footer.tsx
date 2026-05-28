"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import MagneticButton from "./MagneticButton";
import ScrollReveal from "./ScrollReveal";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("https://formsubmit.co/ajax/theagenticbros@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* CTA Section */}
      <div className="relative py-32 bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-cyan/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-cyan/20 rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Ready to scale
              <br />
              <span className="text-cyber-cyan">without the headcount?</span>
            </h2>
            <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto">
              Let's architect your autonomous revenue engine. Book a strategy
              call and see what's possible.
            </p>

            <div className="flex justify-center mb-16">
              <Link href="#contact" className="group">
                <div className="border border-cyber-cyan/30 bg-black/40 backdrop-blur-xl h-14 lg:h-16 rounded-full flex items-center transition-all duration-300 group-hover:scale-105 group-hover:border-cyber-cyan group-hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                  <div className="pl-8 pr-6 text-base lg:text-lg font-semibold text-white transition-colors group-hover:text-cyber-cyan">
                    Start Your Project
                  </div>
                  <div className="bg-white h-[85%] aspect-square rounded-full flex items-center justify-center mr-1.5 transition-colors duration-300 group-hover:bg-cyber-cyan">
                    <ArrowRight className="w-6 h-6 text-black -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                  </div>
                </div>
              </Link>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={0.2}>
            <div className="glass-panel rounded-2xl p-8 max-w-lg mx-auto border border-cyber-cyan/10 relative">
              <form
                className="space-y-4 text-left relative z-10"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="Name"
                    required
                    disabled={status === "submitting"}
                    className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan transition-all placeholder:text-gray-600 disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="Email"
                    required
                    disabled={status === "submitting"}
                    className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan transition-all placeholder:text-gray-600 disabled:opacity-50"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    name="Message"
                    required
                    disabled={status === "submitting"}
                    className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan transition-all resize-none placeholder:text-gray-600 disabled:opacity-50"
                    placeholder="Tell us about your automation needs..."
                  />
                </div>
                
                {/* Honeypot for spam prevention */}
                <input type="hidden" name="_captcha" value="false" />

                <button type="submit" disabled={status === "submitting"} className="w-full relative group disabled:opacity-70">
                  <MagneticButton variant="primary" size="md" className="w-full pointer-events-none">
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </MagneticButton>
                </button>
                
                {status === "success" && (
                  <p className="text-cyber-cyan text-sm text-center mt-4">Message sent successfully! We'll be in touch.</p>
                )}
                {status === "error" && (
                  <p className="text-red-400 text-sm text-center mt-4">Something went wrong. Please try again later.</p>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-900 bg-black py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-heading text-xl font-bold text-white">
              THE AGENTIC <span className="text-cyber-cyan">BROS</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-colors duration-300"
            >
              <FaGithub className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-colors duration-300"
            >
              <FaXTwitter className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-colors duration-300"
            >
              <FaLinkedin className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="mailto:theagenticbros@gmail.com"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
            </motion.a>
          </div>

          <div className="text-gray-600 text-sm">
            © 2026 The Agentic Bros. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
