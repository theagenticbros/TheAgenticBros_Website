"use client";

import { useEffect, useRef } from "react";

interface ParticleCanvasProps {
  activeIndex: number;
}

// 600 particles — dense enough to read shapes, light enough for 60fps O(N) loop
const N = 600;

export default function ParticleCanvas({ activeIndex }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    let animId: number;

    const mouse = { x: -9999, y: -9999 };
    const REPEL_R = 80;
    const REPEL_F = 5;

    const setSize = () => {
      const parent = canvas.parentElement;
      w = canvas.width = parent ? parent.clientWidth : window.innerWidth / 2;
      h = canvas.height = parent ? parent.clientHeight : window.innerHeight;
    };
    setSize();

    // ── SHAPE GENERATORS ────────────────────────────────────────────────────
    const shapeSphere = (n: number, cx: number, cy: number, sz: number) => {
      const pts = [];
      const R = sz * 0.42;
      for (let i = 0; i < n; i++) {
        const phi = Math.acos(1 - 2 * (i / n));
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        pts.push({ x: cx + R * Math.sin(phi) * Math.cos(theta), y: cy + R * Math.sin(phi) * Math.sin(theta) });
      }
      return pts;
    };

    const shapeCode = (n: number, cx: number, cy: number, sz: number) => {
      const pts: { x: number; y: number }[] = [];
      const s = sz * 0.38, third = Math.floor(n / 3);
      for (let i = 0; i < third; i++) {
        const t = (i / third) * 2;
        pts.push(t <= 1
          ? { x: cx - s * 0.9 - (1 - t) * s * 0.55, y: cy - (1 - t) * s * 0.8 }
          : { x: cx - s * 0.9 - (t - 1) * s * 0.55, y: cy + (t - 1) * s * 0.8 });
      }
      for (let i = 0; i < third; i++) {
        const t = i / third;
        pts.push({ x: cx + (t - 0.5) * s * 0.55, y: cy + (0.5 - t) * s * 1.2 });
      }
      for (let i = 0; i < third; i++) {
        const t = (i / third) * 2;
        pts.push(t <= 1
          ? { x: cx + s * 0.9 + (1 - t) * s * 0.55, y: cy - (1 - t) * s * 0.8 }
          : { x: cx + s * 0.9 + (t - 1) * s * 0.55, y: cy + (t - 1) * s * 0.8 });
      }
      while (pts.length < n) pts.push({ x: cx + (Math.random() - 0.5) * s * 2, y: cy + (Math.random() - 0.5) * s });
      return pts.slice(0, n);
    };

    const shapeBars = (n: number, cx: number, cy: number, sz: number) => {
      const pts: { x: number; y: number }[] = [];
      const bars = [{ dx: -0.35, h: 0.62 }, { dx: 0, h: 0.88 }, { dx: 0.35, h: 0.48 }];
      const pp = Math.floor(n / bars.length), bw = sz * 0.14;
      bars.forEach(b => {
        for (let i = 0; i < pp; i++) {
          pts.push({ x: cx + b.dx * sz + (Math.random() - 0.5) * bw, y: cy + sz * 0.38 - Math.random() * b.h * sz });
        }
      });
      while (pts.length < n) pts.push(pts[Math.floor(Math.random() * pts.length)]);
      return pts.slice(0, n);
    };

    const shapeHelix = (n: number, cx: number, cy: number, sz: number) => {
      const pts: { x: number; y: number }[] = [];
      const rows = Math.floor(n / 2);
      for (let i = 0; i < rows; i++) {
        const t = i / rows, y = cy - sz * 0.45 + t * sz * 0.9, ph = t * Math.PI * 5;
        pts.push({ x: cx + Math.sin(ph) * sz * 0.28, y });
        pts.push({ x: cx - Math.sin(ph) * sz * 0.28, y });
      }
      for (let i = 0; i < 10; i++) {
        const t = i / 9, y = cy - sz * 0.43 + t * sz * 0.86, ph = t * Math.PI * 5;
        const x1 = cx + Math.sin(ph) * sz * 0.28, x2 = cx - Math.sin(ph) * sz * 0.28;
        for (let j = 0; j <= 4; j++) pts.push({ x: x1 + (x2 - x1) * j / 4, y });
      }
      while (pts.length < n) pts.push(pts[Math.floor(Math.random() * pts.length)]);
      return pts.slice(0, n);
    };

    const shapeRings = (n: number, cx: number, cy: number, sz: number) => {
      const pts: { x: number; y: number }[] = [];
      const rings = [0.18, 0.3, 0.42];
      const pp = Math.floor(n / rings.length);
      rings.forEach(r => {
        for (let i = 0; i < pp; i++) {
          const a = (i / pp) * Math.PI * 2;
          const jitter = (Math.random() - 0.5) * sz * 0.03;
          pts.push({ x: cx + (r * sz + jitter) * Math.cos(a), y: cy + (r * sz + jitter) * Math.sin(a) });
        }
      });
      while (pts.length < n) pts.push(pts[Math.floor(Math.random() * pts.length)]);
      return pts.slice(0, n);
    };

    const shapeDatabase = (n: number, cx: number, cy: number, sz: number) => {
      const pts: { x: number; y: number }[] = [];
      const rings = 4, totalH = sz * 0.75, rX = sz * 0.44, rY = sz * 0.13;
      for (let j = 0; j < rings; j++) {
        const y = cy - totalH / 2 + (j / (rings - 1)) * totalH;
        const pp = Math.floor(n / rings);
        for (let i = 0; i < pp; i++) {
          const t = (i / pp) * Math.PI * 2;
          pts.push({ x: cx + Math.cos(t) * rX, y: y + Math.sin(t) * rY });
        }
      }
      const lineN = 30;
      for (let i = 0; i < lineN; i++) {
        const t = i / lineN;
        pts.push({ x: cx - rX, y: cy - totalH / 2 + t * totalH });
        pts.push({ x: cx + rX, y: cy - totalH / 2 + t * totalH });
      }
      while (pts.length < n) pts.push(pts[Math.floor(Math.random() * pts.length)]);
      return pts.slice(0, n);
    };

    const SHAPES = [shapeSphere, shapeCode, shapeBars, shapeHelix, shapeRings, shapeDatabase];

    const getPoints = (idx: number) => {
      const i = Math.max(0, Math.min(idx, SHAPES.length - 1));
      return SHAPES[i](N, w / 2, h / 2, Math.min(w, h) * 0.72);
    };

    // Typed arrays — avoids GC pressure
    const px = new Float32Array(N);
    const py = new Float32Array(N);
    const tx = new Float32Array(N);
    const ty = new Float32Array(N);
    const sz = new Float32Array(N);
    const al = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      px[i] = Math.random() * w;
      py[i] = Math.random() * h;
      sz[i] = Math.random() * 2.2 + 0.6;
      al[i] = Math.random() * 0.5 + 0.5;
    }

    let currentIdx = -1;
    const morphTo = (idx: number) => {
      if (currentIdx === idx) return;
      currentIdx = idx;
      const pts = getPoints(idx);
      const order = Array.from({ length: N }, (_, i) => i).sort(() => Math.random() - 0.5);
      for (let i = 0; i < N; i++) {
        tx[i] = pts[order[i]].x;
        ty[i] = pts[order[i]].y;
      }
    };
    morphTo(0);

    const draw = () => {
      if (currentIdx !== activeIndexRef.current) morphTo(activeIndexRef.current);

      ctx.clearRect(0, 0, w, h);

      // O(N) — no nested loops, no connection lines
      for (let i = 0; i < N; i++) {
        px[i] += (tx[i] - px[i]) * 0.055;
        py[i] += (ty[i] - py[i]) * 0.055;

        // Mouse repulsion
        const mdx = px[i] - mouse.x;
        const mdy = py[i] - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < REPEL_R * REPEL_R && md2 > 0.01) {
          const md = Math.sqrt(md2);
          const force = (1 - md / REPEL_R) * REPEL_F;
          px[i] += (mdx / md) * force;
          py[i] += (mdy / md) * force;
        }

        // Outer glow
        ctx.beginPath();
        ctx.arc(px[i], py[i], sz[i] * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,240,255," + (al[i] * 0.07) + ")";
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(px[i], py[i], sz[i], 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,240,255," + al[i] + ")";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    canvas.addEventListener("mousemove", onMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => {
      setSize();
      currentIdx = -1;
      morphTo(activeIndexRef.current);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full cursor-none" />;
}
