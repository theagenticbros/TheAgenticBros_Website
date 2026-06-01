"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Palette, Code, Cpu, Database, Bot, LayoutTemplate, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ParticleCanvas from "./ParticleCanvas";

const services = [
  {
    num: "01",
    title: "UI/UX Design",
    description:
      "End-to-end product design: research, UX flows, polished UI systems, and developer-ready handoff.",
    icon: Palette,
    features: ["User Research & Strategy", "UX Flows & Wireframes", "UI Systems & Prototypes", "Design Ops & Dev Handoff"],
  },
  {
    num: "02",
    title: "Website Design",
    description:
      "Brand-led, conversion-tuned websites: identity, art direction, motion, and storytelling built around your brand.",
    icon: LayoutTemplate,
    features: ["Brand & Visual Identity", "Art Direction & Storytelling", "Motion & Micro-interactions", "Conversion Design Systems"],
  },
  {
    num: "03",
    title: "Website Development",
    description:
      "Production-grade Next.js, headless CMS, edge infra — SEO, accessibility, and Core Web Vitals from day one.",
    icon: Code,
    features: ["Frontend (React / Next.js)", "Backend APIs (Node)", "Mobile (Flutter)", "CI/CD & Cloud Ops"],
  },
  {
    num: "04",
    title: "AI Development",
    description:
      "Production-ready AI: rapid prototyping to deployed models with solid evals, observability, and safety built in.",
    icon: Cpu,
    features: ["LLM Apps & Agents (RAG)", "Fine-tuning & Prompt Ops", "Model Evals & Guardrails", "Vision, NLP & Speech"],
  },
  {
    num: "05",
    title: "AI Agents",
    description:
      "Autonomous voice and tool-using agents that handle real workflows: call centers, scheduling, and task automation.",
    icon: Bot,
    features: ["Voice Agents & Call Centers", "Tool-using LLM Agents", "Multi-provider Orchestration", "Knowledge Base & Memory"],
  },
  {
    num: "06",
    title: "AI-Integrated CRM",
    description:
      "Bespoke CRM systems with AI that auto-updates records, scores leads, and triggers outreach without manual input.",
    icon: Database,
    features: ["AI Lead Scoring", "HubSpot/Salesforce Sync", "Auto Data Enrichment", "Predictive Analytics"],
  },
];

function ServiceRow({
  service,
  index,
  isActive,
  setActiveIndex,
}: {
  service: typeof services[0];
  index: number;
  isActive: boolean;
  setActiveIndex: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-35% 0px -35% 0px" });

  useEffect(() => {
    if (isInView) setActiveIndex(index);
  }, [isInView, index, setActiveIndex]);

  return (
    <div
      ref={ref}
      className="min-h-[90vh] flex items-center justify-end"
    >
      <div className="w-full md:w-[55%] lg:w-1/2 py-20 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Row header */}
          <div className="flex items-start gap-5 mb-6">
            <span
              className="font-mono text-sm pt-1.5 transition-colors duration-500"
              style={{ color: isActive ? "#00f0ff" : "rgba(255,255,255,0.2)" }}
            >
              {service.num}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-4 mb-1">
                <h3
                  className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold leading-tight transition-colors duration-500"
                  style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.45)" }}
                >
                  {service.title}
                </h3>
                <Link
                  href="#contact"
                  aria-label={`Start a ${service.title} project`}
                  className="flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                  style={{
                    borderColor: isActive ? "rgba(0,240,255,0.5)" : "rgba(255,255,255,0.1)",
                    color: isActive ? "#00f0ff" : "rgba(255,255,255,0.2)",
                  }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Description + features — fade in when active */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-gray-400 text-base leading-relaxed mb-5 max-w-lg">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs font-medium px-3 py-1.5 rounded-full border border-cyber-cyan/20 text-gray-300 bg-cyber-cyan/5"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Active indicator line */}
          <div className="ml-[calc(1.25rem+1.25rem)] h-px transition-all duration-500"
            style={{ background: isActive ? "rgba(0,240,255,0.3)" : "rgba(255,255,255,0.06)" }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="relative bg-[#020508]">
      {/* Sticky left particle canvas */}
      <div className="sticky top-0 h-screen w-full flex items-center pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_50%,rgba(0,240,255,0.04)_0%,transparent_70%)]" />
        <div className="absolute left-0 top-0 w-full md:w-[48%] h-full">
          <ParticleCanvas activeIndex={activeIndex} />
        </div>
      </div>

      {/* Scrollable right-side service rows */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 -mt-[100vh]">
        {/* Section header */}
        <div className="min-h-[40vh] flex flex-col justify-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:ml-[50%] max-w-xl"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-cyber-cyan">Services</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Six disciplines, one throughline: systems that work while you don&apos;t.
            </p>
          </motion.div>
        </div>

        {/* Service rows */}
        <div className="pb-[15vh]">
          {services.map((service, index) => (
            <ServiceRow
              key={service.num}
              service={service}
              index={index}
              isActive={activeIndex === index}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
