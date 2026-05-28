"use client";

import { useEffect, useRef } from "react";

interface ParticleCanvasProps {
  activeIndex: number;
}

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
    const N = 400;
    let particles: { x: number; y: number; tx: number; ty: number; sz: number; al: number }[] = [];
    let animationId: number;

    const setCanvasSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        w = canvas.width = parent.clientWidth;
        h = canvas.height = parent.clientHeight;
      } else {
        w = canvas.width = window.innerWidth / 2;
        h = canvas.height = window.innerHeight;
      }
    };
    setCanvasSize();

    // ── SHAPE GENERATORS ──
    const shapeBrain = (n: number, cx: number, cy: number, sz: number) => {
      const pts = [];
      const lobeR = sz * 0.45;
      
      const numLeft = Math.floor(n * 0.45);
      for(let i=0; i<numLeft; i++) {
         const t = Math.random() * Math.PI * 2;
         const r = Math.random() * lobeR;
         pts.push({ x: cx - sz*0.25 + Math.cos(t)*r*0.9, y: cy - sz*0.1 + Math.sin(t)*r*1.1 });
      }
      
      const numRight = Math.floor(n * 0.45);
      for(let i=0; i<numRight; i++) {
         const t = Math.random() * Math.PI * 2;
         const r = Math.random() * lobeR;
         pts.push({ x: cx + sz*0.25 + Math.cos(t)*r*0.9, y: cy - sz*0.1 + Math.sin(t)*r*1.1 });
      }
      
      const remaining = n - numLeft - numRight;
      for(let i=0; i<remaining; i++) {
         const t = Math.random() * Math.PI * 2;
         const r = Math.random() * sz * 0.2;
         pts.push({ x: cx + Math.cos(t)*r*0.8, y: cy + sz*0.4 + Math.sin(t)*r*1.5 });
      }
      
      while(pts.length < n) pts.push({ x: cx, y: cy });
      return pts.slice(0, n);
    };

    const shapeCode = (n: number, cx: number, cy: number, sz: number) => {
      const pts = [], s = sz * 0.38, third = Math.floor(n / 3);
      for (let i = 0; i < third; i++) {
        const t = (i / third) * 2;
        pts.push(t <= 1 ? { x: cx - s * 0.9 - (1 - t) * s * 0.55, y: cy - (1 - t) * s * 0.8 } : { x: cx - s * 0.9 - (t - 1) * s * 0.55, y: cy + (t - 1) * s * 0.8 });
      }
      for (let i = 0; i < third; i++) {
        const t = i / third;
        pts.push({ x: cx + (t - 0.5) * s * 0.55, y: cy + (0.5 - t) * s * 1.2 });
      }
      for (let i = 0; i < third; i++) {
        const t = (i / third) * 2;
        pts.push(t <= 1 ? { x: cx + s * 0.9 + (1 - t) * s * 0.55, y: cy - (1 - t) * s * 0.8 } : { x: cx + s * 0.9 + (t - 1) * s * 0.55, y: cy + (t - 1) * s * 0.8 });
      }
      while (pts.length < n) pts.push({ x: cx + (Math.random() - 0.5) * s * 2, y: cy + (Math.random() - 0.5) * s * 1.5 });
      return pts.slice(0, n);
    };

    const shapeBars = (n: number, cx: number, cy: number, sz: number) => {
      const pts: any[] = [];
      const bars = [{ dx: -0.35, h: 0.62 }, { dx: 0, h: 0.88 }, { dx: 0.35, h: 0.48 }];
      const pp = Math.floor(n / 3), bw = sz * 0.17;
      bars.forEach(b => {
        for (let i = 0; i < pp; i++) {
          pts.push({ x: cx + b.dx * sz + (Math.random() - 0.5) * bw, y: cy + sz * 0.38 - Math.random() * b.h * sz });
        }
      });
      while (pts.length < n) pts.push(pts[Math.floor(Math.random() * pts.length)]);
      return pts.slice(0, n);
    };

    const shapeHelix = (n: number, cx: number, cy: number, sz: number) => {
      const pts = [];
      const rows = Math.floor(n / 2);
      for (let i = 0; i < rows; i++) {
        const t = i / rows, y = cy - sz * 0.45 + t * sz * 0.9, ph = t * Math.PI * 4;
        pts.push({ x: cx + Math.sin(ph) * sz * 0.26, y });
        pts.push({ x: cx - Math.sin(ph) * sz * 0.26, y });
      }
      for (let i = 0; i < 10; i++) {
        const t = i / 9, y = cy - sz * 0.43 + t * sz * 0.86, ph = t * Math.PI * 4;
        const x1 = cx + Math.sin(ph) * sz * 0.26, x2 = cx - Math.sin(ph) * sz * 0.26;
        for (let j = 0; j <= 4; j++) pts.push({ x: x1 + (x2 - x1) * j / 4, y });
      }
      while (pts.length < n) pts.push(pts[Math.floor(Math.random() * pts.length)]);
      return pts.slice(0, n);
    };

    const shapeStars = (n: number, cx: number, cy: number, sz: number) => {
      const pts: any[] = [];
      const centers = [{ dx: 0.08, dy: -0.26, r: 0.24 }, { dx: -0.28, dy: 0.08, r: 0.17 }, { dx: 0.3, dy: 0.22, r: 0.14 }, { dx: -0.06, dy: 0.38, r: 0.12 }];
      const pp = Math.floor(n / centers.length);
      centers.forEach(c => {
        const scx = cx + c.dx * sz, scy = cy + c.dy * sz, sr = c.r * sz;
        for (let i = 0; i < pp; i++) {
          const a = Math.random() * Math.PI * 2, arm = a % (Math.PI * 0.5);
          const shp = arm < Math.PI * 0.25 ? arm / (Math.PI * 0.25) : 1 - (arm - Math.PI * 0.25) / (Math.PI * 0.25);
          const r = Math.pow(Math.random(), 1.5) * sr;
          pts.push({ x: scx + Math.cos(a) * r * (0.15 + shp * 0.85), y: scy + Math.sin(a) * r * (0.15 + shp * 0.85) });
        }
      });
      while (pts.length < n) pts.push(pts[Math.floor(Math.random() * pts.length)]);
      return pts.slice(0, n);
    };

    const shapeDatabase = (n: number, cx: number, cy: number, sz: number) => {
      const pts = [];
      const rings = 3;
      const h = sz * 0.8;
      const rX = sz * 0.5;
      const rY = sz * 0.15;
      
      for(let j=0; j<rings; j++) {
         const y = cy - h/2 + (j / (rings-1)) * h;
         const ringPts = Math.floor(n / rings);
         for(let i=0; i<ringPts; i++) {
            const t = (i / ringPts) * Math.PI * 2;
            pts.push({ x: cx + Math.cos(t)*rX, y: y + Math.sin(t)*rY });
         }
      }
      const linesPts = 30;
      for(let i=0; i<linesPts; i++) {
         const t = i/linesPts;
         pts.push({ x: cx - rX, y: cy - h/2 + t*h });
         pts.push({ x: cx + rX, y: cy - h/2 + t*h });
      }
      
      while(pts.length < n) pts.push(pts[Math.floor(Math.random()*pts.length)]);
      return pts.slice(0, n);
    };

    const SHAPES = [shapeBrain, shapeCode, shapeBars, shapeHelix, shapeStars, shapeDatabase];

    const getPoints = (idx: number) => {
      const safeIdx = Math.max(0, Math.min(idx, SHAPES.length - 1));
      const cx = w / 2;
      const cy = h / 2;
      const sz = Math.min(w, h) * 0.7; // Adjusted size for new shapes
      return SHAPES[safeIdx](N, cx, cy, sz);
    };

    // Initialize particles
    const initialPts = getPoints(0);
    particles = initialPts.map(p => ({
      x: w * Math.random(),
      y: h * Math.random(),
      tx: p.x,
      ty: p.y,
      sz: Math.random() * 2 + 0.5,
      al: Math.random() * 0.5 + 0.5
    }));

    let currentShapeIdx = 0;

    const morphTo = (idx: number) => {
      currentShapeIdx = idx;
      const pts = getPoints(idx).sort(() => Math.random() - 0.5);
      particles.forEach((p, i) => {
        if (pts[i]) {
          p.tx = pts[i].x;
          p.ty = pts[i].y;
        }
      });
    };

    const draw = () => {
      // Check if activeIndex changed
      if (currentShapeIdx !== activeIndexRef.current) {
        morphTo(activeIndexRef.current);
      }

      ctx.clearRect(0, 0, w, h);
      
      particles.forEach(p => {
        p.x += (p.tx - p.x) * 0.05; // Slightly slower float
        p.y += (p.ty - p.y) * 0.05;
      });

      // Refined drawing - soft glowing dots instead of sharp diamonds
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Draw soft core particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p1.al})`;
        ctx.fill();

        // Connect to nearby - shorter distance for less cluttered, more refined look
        ctx.lineWidth = 0.4;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = dx * dx + dy * dy;
          
          if (dist < 1800) { 
            const opacity = (1 - dist / 1800) * 0.25;
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    morphTo(activeIndexRef.current);
    draw();

    const handleResize = () => {
      setCanvasSize();
      morphTo(activeIndexRef.current);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Mount only once

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
