"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Zap, Brain, Workflow } from "lucide-react";

const pillars = [
  {
    icon: Zap,
    title: "Frontend that converts",
    description:
      "Next.js and React apps built for speed: sub-second LCP, 100 Lighthouse scores, and interfaces people actually want to use. Performance is the product.",
  },
  {
    icon: Brain,
    title: "AI that does the work",
    description:
      "Custom n8n pipelines, LLM agents, and scraping workflows that run 24 hours a day. We wire your data sources into actions — no human in the loop required.",
  },
  {
    icon: Workflow,
    title: "Operations, productized",
    description:
      "Lead capture, qualification, and onboarding handled end-to-end by autonomous pipelines. You close; the system does the rest.",
  },
];

export default function Differentiator() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="differentiator" className="py-24 md:py-32 relative bg-black border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-16 lg:gap-24 items-start">

          {/* Left — heading block */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-white text-wrap-balance mb-6">
              Why{" "}
              <span className="text-cyber-cyan">The Agentic Bros</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              Most agencies hand you a site. We hand you a system that keeps
              working after the invoice is paid.
            </p>
          </motion.div>

          {/* Right — pillar strips */}
          <div className="flex flex-col divide-y divide-gray-900">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={prefersReduced ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex items-start gap-6 py-8 first:pt-0 last:pb-0"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-cyber-cyan/8 border border-cyber-cyan/15 flex items-center justify-center mt-0.5 group-hover:bg-cyber-cyan/15 transition-colors duration-300">
                  <pillar.icon className="w-5 h-5 text-cyber-cyan" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-base max-w-[55ch]">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
