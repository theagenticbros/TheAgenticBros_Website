"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const COUNT = 7000;
const REPEL_R = 220;  // screen-space repulsion radius (px)
const REPEL_F = 55;   // repulsion strength in world units

function buildSphere(n: number) {
  const pts: { bx: number; by: number; bz: number }[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const phi = t * Math.PI * 2 * 137.50776;
    const cosT = 1.0 - 2.0 * t;
    const sinT = Math.sqrt(Math.max(0, 1 - cosT * cosT));
    pts.push({ bx: sinT * Math.cos(phi), by: cosT, bz: sinT * Math.sin(phi) });
  }
  return pts;
}

const SPHERE = buildSphere(COUNT);

function hslToRgb(h: number, s: number, l: number) {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)] as const;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const startTime = performance.now();

    const posX = new Float32Array(COUNT);
    const posY = new Float32Array(COUNT);
    const posZ = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      posX[i] = (Math.random() - 0.5) * 500;
      posY[i] = (Math.random() - 0.5) * 500;
      posZ[i] = (Math.random() - 0.5) * 500;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const elapsed = (performance.now() - startTime) / 1000;
      const scroll = scrollRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      if (prefersReduced) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, W, H);
        const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.5);
        g.addColorStop(0, "rgba(0,240,255,0.06)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
        return;
      }

      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const FL = W * 0.75;
      const scroll2 = scroll * scroll;
      const burst = scroll2 * 320;
      const fade = 1 - scroll * 0.35;

      for (let i = 0; i < COUNT; i++) {
        const t = i / COUNT;
        const { bx, by, bz } = SPHERE[i];
        const rBase = 200 + 40 * Math.sin(t * 29.7 + elapsed * 0.18);

        const sx = bx * rBase;
        const sy = by * rBase;
        const sz = bz * rBase;

        // 4D tesseract projection
        const w4 = 55 * Math.sin(t * Math.PI * 9 + elapsed * 0.22);
        const angle4 = elapsed * 0.07 + t * 0.44;
        const c4 = Math.cos(angle4);
        const s4 = Math.sin(angle4);
        const px = sx * c4 - w4 * s4;
        const py = sy;
        const pz = sz * c4 + w4 * s4 * 0.55;

        // Curl-noise turbulence
        const f = 0.008, A = 38;
        const ttx = A * Math.sin(f * py * 3.71 + elapsed * 0.58) * Math.cos(f * pz * 2.29 + elapsed * 0.43);
        const tty = A * Math.sin(f * pz * 4.13 + elapsed * 0.52) * Math.cos(f * px * 3.07 + elapsed * 0.69);

        const invR = 1 / (rBase + 0.001);
        const nx = (px + ttx) * fade + burst * (sx * invR);
        const ny = (py + tty) * fade + burst * (sy * invR);
        const nz = pz * fade + burst * (sz * invR);

        // Lerp toward target
        posX[i] += (nx - posX[i]) * 0.07;
        posY[i] += (ny - posY[i]) * 0.07;
        posZ[i] += (nz - posZ[i]) * 0.07;

        // Perspective project FIRST to get screen coords
        const depth = posZ[i] + 400;
        if (depth < 1) continue;
        const scale = FL / depth;
        const screenX = cx + posX[i] * scale;
        const screenY = cy + posY[i] * scale;

        // ── Mouse repulsion: push world-space position ──────────────────────
        // Measure distance in screen space (intuitive), apply force in world space
        // so it accumulates across frames and particles truly flee the cursor.
        const mdx = screenX - mx;
        const mdy = screenY - my;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < REPEL_R * REPEL_R && md2 > 0.01) {
          const md = Math.sqrt(md2);
          const force = ((1 - md / REPEL_R) ** 2) * REPEL_F;
          // Divide by scale to convert screen-space push → world-space units
          posX[i] += (mdx / md) * (force / scale);
          posY[i] += (mdy / md) * (force / scale);
        }

        // Re-project with updated world position
        const finalX = cx + posX[i] * scale;
        const finalY = cy + posY[i] * scale;
        if (finalX < -20 || finalX > W + 20 || finalY < -20 || finalY > H + 20) continue;

        // Depth-aware color + cursor glow
        const depthN = Math.max(0, Math.min(1, (posZ[i] + 300) / 600));
        const d2cursor = (finalX - mx) ** 2 + (finalY - my) ** 2;
        const cursorGlow = d2cursor < 200 * 200 ? (1 - Math.sqrt(d2cursor) / 200) * 0.55 : 0;

        const hue = ((t * 0.38 + elapsed * 0.013 + depthN * 0.18 + cursorGlow * 0.15) % 1 + 1) % 1;
        const sat = 0.62 + depthN * 0.38;
        const lit = Math.max(0.04, Math.min(0.95, 0.28 + depthN * 0.55 + cursorGlow * 0.45 - scroll2 * 0.28));
        const [r, g, b] = hslToRgb(hue, sat, lit);
        const radius = Math.max(0.4, scale * 0.8);

        ctx.beginPath();
        ctx.arc(finalX, finalY, radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (0.7 + depthN * 0.3) + ")";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [prefersReduced]);

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)" }}
      />
      {/* Text shield */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 30%, rgba(0,0,0,0.2) 55%, transparent 75%)" }}
      />

      {/* Watermark */}
      <h2 className="absolute top-[15%] left-1/2 -translate-x-1/2 text-[12vw] font-bold text-nowrap text-center opacity-[0.04] tracking-tighter z-10 pointer-events-none select-none text-white">
        THE AGENTIC BROS
      </h2>

      {/* Main content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan text-xs font-semibold tracking-wide uppercase w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
              AI &amp; Automation Agency
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] text-white">
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

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
