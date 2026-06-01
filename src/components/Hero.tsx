"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const prefersReduced = useReducedMotion();

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
    window.addEventListener("resize", resize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const draw = () => {
      // Skip heavy animation if user prefers reduced motion
      if (prefersReduced) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width * 0.6
        );
        gradient.addColorStop(0, "#0a0f1c");
        gradient.addColorStop(1, "#000000");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      time += 0.005;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      gradient.addColorStop(0, "#0a0f1c");
      gradient.addColorStop(0.5, "#000000");
      gradient.addColorStop(1, "#000000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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

          ctx.beginPath();
          ctx.arc(x, y, intensity > 0 ? 2 : 1, 0, Math.PI * 2);
          ctx.stroke();

          if (i < cols - 1) {
            const nextX = (i + 1) * gridSize;
            const nextY = j * gridSize + Math.sin(time + (i + 1) * 0.3) * 8;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
          }

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
  }, [prefersReduced]);

  const entryVariants = prefersReduced
    ? {}
    : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Watermark */}
      <h2 className="absolute top-[15%] left-1/2 -translate-x-1/2 text-[12vw] font-bold text-nowrap text-center opacity-5 tracking-tighter z-10 pointer-events-none select-none">
        THE AGENTIC BROS
      </h2>

      {/* Main content — bottom-aligned */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            {...entryVariants}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 max-w-2xl"
          >
            {/* Agency label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan text-xs font-semibold tracking-wide uppercase w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
              AI &amp; Automation Agency
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] text-white text-wrap-balance">
              Building{" "}
              <em className="text-cyber-cyan glow-text not-italic">Autonomous</em>
              <br />
              Revenue Engines
            </h1>

            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              We design and ship AI-powered systems — agents, pipelines, and
              interfaces — that run your growth operations around the clock.
            </p>

            <Link href="#contact" className="group inline-block w-fit">
              <div className="border border-cyber-cyan/30 bg-black/40 backdrop-blur-xl h-12 lg:h-14 rounded-full flex items-center transition-all duration-300 group-hover:border-cyber-cyan group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <div className="pl-6 pr-4 text-sm font-semibold text-white transition-colors group-hover:text-cyber-cyan">
                  Start a project
                </div>
                <div className="bg-white h-[85%] aspect-square rounded-full flex items-center justify-center mr-1 transition-colors duration-300 group-hover:bg-cyber-cyan">
                  <ArrowRight className="w-5 h-5 text-black -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
