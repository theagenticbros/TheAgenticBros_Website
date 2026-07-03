"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import MagneticButton from "./MagneticButton";
import ScrollReveal from "./ScrollReveal";
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
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight text-wrap-balance">
              Ready to scale
              <br />
              <span className="text-cyber-cyan">without the headcount?</span>
            </h2>
            <p className="text-gray-400 text-xl mb-12 max-w-xl mx-auto">
              Tell us what you're building. We'll tell you what it takes to
              automate it.
            </p>
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
                    placeholder="Your name"
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

                <MagneticButton
                  type="submit"
                  disabled={status === "submitting"}
                  variant="primary"
                  size="md"
                  className="w-full relative group disabled:opacity-70"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </MagneticButton>
                
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
