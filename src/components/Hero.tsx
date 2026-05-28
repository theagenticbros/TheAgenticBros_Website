"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      time += 0.005;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Deep radial gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
      );
      gradient.addColorStop(0, "#0a0f1c");
      gradient.addColorStop(0.5, "#000000");
      gradient.addColorStop(1, "#000000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      const gridSize = 60;
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize + Math.sin(time + i * 0.3) * 8;

          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 250;
          const intensity = dist < maxDist ? 1 - dist / maxDist : 0;

          ctx.strokeStyle =
            intensity > 0
              ? `rgba(0, 240, 255, ${0.1 + intensity * 0.35})`
              : "rgba(0, 240, 255, 0.06)";
          ctx.lineWidth = intensity > 0 ? 1 + intensity * 2 : 0.5;

          // Draw node
          ctx.beginPath();
          ctx.arc(x, y, intensity > 0 ? 2 : 1, 0, Math.PI * 2);
          ctx.stroke();

          // Horizontal connection
          if (i < cols - 1) {
            const nextX = (i + 1) * gridSize;
            const nextY = j * gridSize + Math.sin(time + (i + 1) * 0.3) * 8;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
          }

          // Vertical connection
          if (j < rows - 1) {
            const belowY = (j + 1) * gridSize + Math.sin(time + i * 0.3) * 8;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, belowY);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Giant Watermark Text */}
      <h2 className="absolute top-[15%] left-1/2 -translate-x-1/2 text-[12vw] font-bold text-nowrap text-center opacity-5 tracking-tighter z-10 pointer-events-none">
        THE AGENTIC BROS
      </h2>

      {/* Main Content (Bottom Aligned like Antimatter AI) */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row justify-between items-end gap-12">
          
          {/* Left Text & CTA */}
          <div className="flex flex-col gap-6 max-w-2xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan text-xs font-semibold tracking-wide uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse"></span>
                AI & Automation Agency
              </div>
              
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-[1.1] text-white">
                Building <span className="text-cyber-cyan glow-text italic">Autonomous</span><br/>
                Revenue Engines
              </h1>
              
              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-8">
                We don't just build websites. We build 24/7 AI-powered systems that generate leads and scale your business while you sleep.
              </p>

              <Link href="#contact" className="group inline-block">
                <div className="border border-cyber-cyan/30 bg-black/40 backdrop-blur-xl h-12 lg:h-14 rounded-full flex items-center transition-all duration-300 group-hover:scale-105 group-hover:border-cyber-cyan group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                  <div className="pl-6 pr-4 text-sm font-semibold text-white transition-colors group-hover:text-cyber-cyan">
                    Start Your Project
                  </div>
                  <div className="bg-white h-[85%] aspect-square rounded-full flex items-center justify-center mr-1 transition-colors duration-300 group-hover:bg-cyber-cyan">
                    <ArrowRight className="w-5 h-5 text-black -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap gap-8 lg:gap-12 w-full lg:w-auto justify-start lg:justify-end"
          >
            <div className="flex flex-col">
              <div className="flex items-start text-4xl sm:text-5xl font-bold font-heading mb-1 text-white">
                147<span className="text-cyber-cyan text-3xl ml-1">+</span>
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                Projects<br/>Delivered
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-start text-4xl sm:text-5xl font-bold font-heading mb-1 text-white">
                99<span className="text-cyber-cyan text-3xl ml-1">%</span>
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                Client<br/>Satisfaction
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-start text-4xl sm:text-5xl font-bold font-heading mb-1 text-white">
                24<span className="text-cyber-cyan text-3xl mx-1">/</span>7
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                Systems<br/>Active
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
