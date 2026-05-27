"use client";

import { motion } from "framer-motion";
import { Zap, Brain, Workflow } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: Zap,
    title: "Frontend Excellence",
    description:
      "Sleek, lightning-fast web apps built with Next.js, React, and modern architecture. Performance is not an afterthought—it's the foundation.",
    gradient: "from-cyber-cyan/20 to-transparent",
  },
  {
    icon: Brain,
    title: "The AI Engine",
    description:
      "Custom n8n scraping & automation workflows that run 24/7. We build the neural cortex behind your digital operations.",
    gradient: "from-electric-blue/20 to-transparent",
  },
  {
    icon: Workflow,
    title: "Productized Operations",
    description:
      "We don't just build sites; we automate your business. From lead capture to client onboarding—fully autonomous pipelines.",
    gradient: "from-purple-500/20 to-transparent",
  },
];

export default function Differentiator() {
  return (
    <section id="differentiator" className="py-24 relative bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Why <span className="text-cyber-cyan">The Agentic Bros</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three pillars. One mission. Zero mediocrity.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative h-full"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`}
                />
                <div className="relative glass-panel rounded-2xl p-8 h-full border border-gray-800 group-hover:border-cyber-cyan/30 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]">
                  <div className="w-12 h-12 rounded-lg bg-cyber-cyan/10 flex items-center justify-center mb-6 group-hover:bg-cyber-cyan/20 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-cyber-cyan" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-3 text-white group-hover:text-cyber-cyan transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
