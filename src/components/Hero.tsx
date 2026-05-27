"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

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
            const nextY =
              j * gridSize + Math.sin(time + (i + 1) * 0.3) * 8;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
          }

          // Vertical connection
          if (j < rows - 1) {
            const belowY =
              (j + 1) * gridSize + Math.sin(time + i * 0.3) * 8;
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
            We Build{" "}
            <span className="text-cyber-cyan glow-text">Autonomous</span>{" "}
            Systems & High-Performance{" "}
            <span className="text-electric-blue">Web Assets</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          No templates. No bloat. Just revenue-generating AI layers and sleek
          interfaces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton variant="primary" size="lg">
            Book a Strategy Call
          </MagneticButton>
          <MagneticButton variant="secondary" size="lg">
            View Our Engine
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}
