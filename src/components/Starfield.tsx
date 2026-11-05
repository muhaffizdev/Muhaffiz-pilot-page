"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; r: number; speed: number; phase: number };

/** Drifting particle field from the original page, fixed behind everything. */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const shimmer = 0.12 + (Math.sin(frame * 0.018 + p.phase) + 1) * 0.18;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(61, 160, 155, ${shimmer})`;
        ctx.fill();
        if (!reduce) {
          p.y -= p.speed;
          if (p.y < -3) {
            p.y = height + 3;
            p.x = Math.random() * width;
          }
        }
      }
      frame++;
      if (!reduce && !document.hidden) raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(110, Math.floor((width * height) / 13000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.35,
        speed: Math.random() * 0.22 + 0.06,
        phase: Math.random() * Math.PI * 2,
      }));
      cancelAnimationFrame(raf);
      draw();
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) draw();
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
