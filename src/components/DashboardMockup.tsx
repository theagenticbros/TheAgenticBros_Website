"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Activity,
  Database,
  Bot,
  CheckCircle,
  ArrowRight,
  Terminal,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const pipelineSteps = [
  {
    id: 1,
    label: "Data Scraping",
    icon: Database,
    color: "text-cyber-cyan",
  },
  {
    id: 2,
    label: "AI Analysis",
    icon: Bot,
    color: "text-electric-blue",
  },
  {
    id: 3,
    label: "Action Taken",
    icon: CheckCircle,
    color: "text-green-400",
  },
];

const logMessages = [
  "[14:32:01] Scraping target: competitor pricing matrix",
  "[14:32:04] Extracted 1,247 data points",
  "[14:32:08] Running LLM inference pipeline...",
  "[14:32:12] Analysis complete: 3 opportunities identified",
  "[14:32:15] Triggering automated email sequence",
  "[14:32:18] Action logged: 47 leads enriched",
  "[14:32:22] Pipeline cycle complete. Awaiting next trigger.",
];

export default function DashboardMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [stats, setStats] = useState({
    processed: 1247,
    saved: 48,
    uptime: 99.9,
  });

  useEffect(() => {
    if (!isInView) return;

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 2000);

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logMessages.length) {
        setLogs((prev) => [...prev.slice(-6), logMessages[logIndex]]);
        logIndex++;
      } else {
        logIndex = 0;
      }
    }, 1500);

    const statsInterval = setInterval(() => {
      setStats((prev) => ({
        processed: prev.processed + Math.floor(Math.random() * 50),
        saved: prev.saved + Math.floor(Math.random() * 3),
        uptime: 99.9,
      }));
    }, 4000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(logInterval);
      clearInterval(statsInterval);
    };
  }, [isInView]);

  return (
    <section
      id="proof"
      className="py-24 relative bg-gradient-to-b from-black to-midnight overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            The Stack <span className="text-cyber-cyan">in Action</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A walkthrough of a typical automation cycle: scrape, analyze, act.
            This is what runs after a project ships.
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-2xl border border-cyber-cyan/20 overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.05)]"
        >
          {/* Header */}
          <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-cyber-cyan" />
              <span className="font-heading font-semibold text-sm tracking-wide text-gray-300">
                AGENTIC CONTROL CENTER
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-mono">
                SYSTEM ONLINE
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-0">
            {/* Main Panel */}
            <div className="lg:col-span-2 p-6 border-r border-gray-800">
              <h3 className="text-sm font-heading font-semibold text-gray-400 mb-6 uppercase tracking-wider">
                Active Pipeline
              </h3>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 mb-8">
                {pipelineSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      animate={
                        activeStep === index
                          ? {
                              boxShadow: [
                                "0 0 0px rgba(0,240,255,0)",
                                "0 0 20px rgba(0,240,255,0.3)",
                                "0 0 0px rgba(0,240,255,0)",
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`relative p-4 rounded-xl border ${
                        activeStep === index
                          ? "border-cyber-cyan/50 bg-cyber-cyan/5"
                          : "border-gray-800 bg-black/20"
                      } transition-all duration-500`}
                    >
                      <step.icon
                        className={`w-8 h-8 ${
                          activeStep === index ? step.color : "text-gray-600"
                        }`}
                      />
                      <div className="mt-2 text-xs font-mono text-gray-400">
                        {step.label}
                      </div>
                      {activeStep === index && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-cyber-cyan"
                        />
                      )}
                    </motion.div>
                    {index < pipelineSteps.length - 1 && (
                      <div className="hidden md:flex items-center px-4">
                        <motion.div
                          animate={{ x: [0, 10, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5 text-gray-700" />
                        </motion.div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    label: "Data Processed",
                    value: stats.processed.toLocaleString(),
                    suffix: "rows",
                  },
                  {
                    label: "Hours Saved",
                    value: stats.saved.toLocaleString(),
                    suffix: "hrs",
                  },
                  {
                    label: "Uptime",
                    value: stats.uptime,
                    suffix: "%",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-black/30 border border-gray-800 rounded-lg p-4"
                  >
                    <div className="text-xs text-gray-500 mb-1">
                      {stat.label}
                    </div>
                    <div className="font-heading text-xl md:text-2xl font-bold text-white">
                      {stat.value}
                      <span className="text-sm text-gray-500 ml-1">
                        {stat.suffix}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal */}
            <div className="p-6 bg-black/60">
              <h3 className="text-sm font-heading font-semibold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyber-cyan" />
                System Logs
              </h3>
              <div className="font-mono text-xs space-y-2 h-64 overflow-hidden">
                {logs.map((log, i) => (
                  <motion.div
                    key={`${log}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-gray-400 pl-1 py-1"
                  >
                    <span className="text-cyber-cyan/60">
                      {log?.split("]")[0]}]
                    </span>
                    <span className="text-gray-300">
                      {log?.split("]")[1]}
                    </span>
                  </motion.div>
                ))}
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-4 bg-cyber-cyan ml-3"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
