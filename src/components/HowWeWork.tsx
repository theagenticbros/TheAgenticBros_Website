"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Search, PenTool, Code2, Rocket, LineChart } from "lucide-react";
import RoboticHandCanvas from "./RoboticHandCanvas";

const steps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We analyze your operations to find friction points and automation opportunities. No guessing, just data-driven architecture.",
    icon: Search,
  },
  {
    num: "02",
    title: "System Architecture",
    desc: "Mapping the exact data flows, LLM integrations, and frontend components required to build your autonomous engine.",
    icon: PenTool,
  },
  {
    num: "03",
    title: "Development & AI Training",
    desc: "Building the Next.js frontend while parallel-training custom agents and configuring n8n workflows.",
    icon: Code2,
  },
  {
    num: "04",
    title: "Deployment & Testing",
    desc: "Rigorous red-teaming of AI prompts and edge-case testing before launching on enterprise-grade infrastructure.",
    icon: Rocket,
  },
  {
    num: "05",
    title: "Optimization & Scale",
    desc: "Continuous monitoring of AI logs and user interactions to refine workflows and maximize conversion rates.",
    icon: LineChart,
  },
];

export default function HowWeWork() {
  return (
    <section id="process" className="py-32 relative bg-[#050810] overflow-hidden border-t border-b border-cyber-cyan/10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Sticky Right Side - Robotic Hand Canvas */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full hidden md:block">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center opacity-70">
          <RoboticHandCanvas />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-left mb-24 md:w-1/2">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
            How We <span className="text-cyber-cyan">Work</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Five phases. Each one hands off cleanly to the next. Nothing ships until it works under pressure.
          </p>
        </ScrollReveal>

        <div className="relative md:w-1/2 pr-0 md:pr-12">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-800">
            <motion.div
              className="absolute top-0 w-full bg-gradient-to-b from-cyber-cyan via-electric-blue to-transparent"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => {
              return (
                <div key={step.num} className="relative flex items-start md:items-center gap-0">
                  {/* Timeline Node */}
                  <div className="absolute left-8 -translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="w-16 h-16 rounded-2xl bg-black border border-cyber-cyan/30 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                    >
                      <step.icon className="w-6 h-6 text-cyber-cyan" />
                    </motion.div>
                  </div>

                  {/* Content Container (Left aligned) */}
                  <div className="w-full pl-24 md:pl-20">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="glass-panel p-8 rounded-2xl border border-gray-800 hover:border-cyber-cyan/30 transition-colors w-full text-left bg-black/60 backdrop-blur-md"
                    >
                      <h3 className="font-heading text-2xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
