"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Palette, Code, Cpu, Database, Bot, Layout, LayoutTemplate, ArrowRight } from "lucide-react";
import Link from "next/link";
import ParticleCanvas from "./ParticleCanvas";

const services = [
  {
    title: "UI/UX Design",
    description: "End-to-end product design — research, UX flows, polished UI systems, and developer-ready handoff.",
    icon: Palette,
    features: ["User Research & Strategy", "UX Flows & Wireframes", "UI Systems & Prototypes", "Design Ops & Dev Handoff"],
  },
  {
    title: "Website Design",
    description: "Brand-led, conversion-tuned websites — identity, art direction, motion, and storytelling that match the brand.",
    icon: LayoutTemplate,
    features: ["Brand & Visual Identity", "Art Direction & Storytelling", "Motion & Micro-interactions", "Conversion Design Systems"],
  },
  {
    title: "Website Development",
    description: "Production-grade Next.js, headless CMS, edge infra — SEO, accessibility, and Core Web Vitals built in from day one.",
    icon: Code,
    features: ["Frontend (React / Next)", "Backend APIs (Node)", "Mobile (Flutter)", "CI/CD & Cloud Ops"],
  },
  {
    title: "AI Development",
    description: "Production-ready AI — rapid prototyping to deployed models with solid evals, observability, and safety.",
    icon: Cpu,
    features: ["LLM Apps & Agents (RAG)", "Fine-tuning & Prompt Ops", "Model Evals & Guardrails", "Vision, NLP & Speech"],
  },
  {
    title: "AI Agents",
    description: "Autonomous voice and tool-using agents that handle real workflows — call centers, scheduling, and task automation.",
    icon: Bot,
    features: ["Voice Agents & Call Centers", "Tool-using LLM Agents", "Multi-provider Orchestration", "Knowledge Base & Memory"],
  },
  {
    title: "Customised AI Integrated CRM",
    description: "Bespoke CRM systems infused with AI to auto-update records, score leads, and trigger outreach.",
    icon: Database,
    features: ["AI Lead Scoring", "HubSpot/Salesforce Sync", "Auto Data Enrichment", "Predictive Analytics"],
  },
];

function ServiceBlock({ 
  service, 
  index, 
  setActiveIndex 
}: { 
  service: typeof services[0]; 
  index: number; 
  setActiveIndex: (val: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-end md:justify-end">
      <div className="w-full md:w-1/2 lg:w-5/12 py-32 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-20%" }}
          className="glass-panel p-8 md:p-12 rounded-2xl border border-gray-800 hover:border-cyber-cyan/40 transition-all duration-500 relative overflow-hidden group bg-black/80 backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-cyan/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-black border border-gray-800 flex items-center justify-center mb-8 group-hover:border-cyber-cyan/30 group-hover:bg-cyber-cyan/10 transition-colors duration-300">
              <service.icon className="w-8 h-8 text-cyber-cyan" />
            </div>
            
            <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-white group-hover:text-cyber-cyan transition-colors duration-300">
              {service.title}
            </h3>
            
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
              {service.description}
            </p>

            <div className="space-y-4 mb-10">
              {service.features.map((feature) => (
                <div key={feature} className="text-sm md:text-base text-gray-300 flex items-center gap-3 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan/80 shadow-[0_0_8px_rgba(0,240,255,0.8)]"></div>
                  {feature}
                </div>
              ))}
            </div>

            <Link href="#contact">
              <div className="w-14 h-14 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 group-hover:border-cyber-cyan group-hover:text-cyber-cyan group-hover:bg-cyber-cyan/10 transition-all duration-300">
                <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="relative bg-[#02050A]">
      {/* Sticky Background & Shape Container */}
      <div className="sticky top-0 h-screen w-full flex items-center pointer-events-none z-0 overflow-hidden">
        {/* Background gradient grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-cyan/5 via-black to-[#02050A]"></div>
        
        {/* The Morphing Obsidian Shape (Left side on desktop, center-ish back on mobile) */}
        <div className="absolute left-0 md:left-12 lg:left-24 top-1/2 -translate-y-1/2 w-full md:w-1/2 h-full flex items-center justify-center opacity-30 md:opacity-100 mix-blend-screen md:mix-blend-normal">
          <ParticleCanvas activeIndex={activeIndex} />
        </div>
      </div>

      {/* Scrolling Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 -mt-[100vh]">
        {/* Intro Header */}
        <div className="min-h-[50vh] flex flex-col justify-end pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              <span className="text-cyber-cyan">Our Services</span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed">
              Six disciplines, one throughline: systems that work while you don't.
            </p>
          </motion.div>
        </div>

        {/* Scrollable Service Blocks */}
        <div className="pb-[20vh]">
          {services.map((service, index) => (
            <ServiceBlock 
              key={service.title} 
              service={service} 
              index={index} 
              setActiveIndex={setActiveIndex} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
