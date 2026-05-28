"use client";

import { useEffect, useRef } from "react";

export default function RoboticHandCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Generate hand points
    const getHandPoints = (n: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const sz = Math.min(w, h) * 0.7;
      const pts = [];
      
      const palmW = sz * 0.4;
      const palmH = sz * 0.5;
      const palmCenterY = cy + sz * 0.2;
      
      // Palm
      const numPalm = Math.floor(n * 0.4);
      for(let i=0; i<numPalm; i++) {
         const t = Math.random() * Math.PI * 2;
         const r = Math.random();
         pts.push({ x: cx + Math.cos(t)*palmW*r, y: palmCenterY + Math.sin(t)*palmH*r });
      }
      
      // Fingers
      const fingers = [
        { a: -1.2, l: sz*0.4, w: sz*0.08, num: Math.floor(n*0.1), startOffset: 0.2 }, // Thumb
        { a: -0.4, l: sz*0.6, w: sz*0.06, num: Math.floor(n*0.12), startOffset: 0.4 }, // Index
        { a: 0.0,  l: sz*0.7, w: sz*0.06, num: Math.floor(n*0.14), startOffset: 0.5 }, // Middle
        { a: 0.4,  l: sz*0.65,w: sz*0.06, num: Math.floor(n*0.12), startOffset: 0.4 }, // Ring
        { a: 0.8,  l: sz*0.5, w: sz*0.05, num: Math.floor(n*0.1), startOffset: 0.3 }  // Pinky
      ];
      
      fingers.forEach(f => {
         for(let i=0; i<f.num; i++) {
            const t = Math.random(); 
            const width = (Math.random()-0.5)*f.w; 
            const baseX = cx + Math.sin(f.a)*palmW*f.startOffset;
            const baseY = palmCenterY - palmH*f.startOffset;
            
            const tipX = baseX + Math.sin(f.a)*f.l;
            const tipY = baseY - Math.cos(f.a)*f.l;
            
            pts.push({
               x: baseX + (tipX-baseX)*t + Math.cos(f.a)*width,
               y: baseY + (tipY-baseY)*t + Math.sin(f.a)*width
            });
         }
      });
      
      while(pts.length < n) pts.push(pts[0]);
      return pts.slice(0, n);
    };

    // Initialize particles slightly below the screen
    const targetPts = getHandPoints(N);
    particles = targetPts.map(p => ({
      x: w * Math.random(),
      y: h + 200 + Math.random() * 200, // Start beneath the screen
      tx: p.x,
      ty: p.y,
      sz: Math.random() * 2 + 1,
      al: Math.random() * 0.5 + 0.5
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Float towards targets (hand structure)
      particles.forEach((p, i) => {
        // Add some slight floating noise to tx, ty over time
        const time = Date.now() * 0.001;
        const noisyTx = targetPts[i].x + Math.sin(time + i) * 10;
        const noisyTy = targetPts[i].y + Math.cos(time + i) * 10;
        
        p.x += (noisyTx - p.x) * 0.03;
        p.y += (noisyTy - p.y) * 0.03;
      });

      // Draw particles and lines (plexus)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p1.al})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = dx * dx + dy * dy;
          
          if (dist < 1500) { 
            const opacity = (1 - dist / 1500) * 0.4;
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

    draw();

    const handleResize = () => {
      setCanvasSize();
      // Recalculate target points on resize
      const newTargets = getHandPoints(N);
      for(let i=0; i<particles.length; i++) {
        if(newTargets[i]) {
            targetPts[i] = newTargets[i];
        }
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
