"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const layerY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;
    let running = true;
    let last = 0;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = reduceMotion ? 24 : 48;

    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.35,
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.0004,
      a: Math.random() * 0.4 + 0.12,
      hue: Math.random() > 0.7 ? "amber" : "teal",
    }));

    const meteors = Array.from({ length: 2 }, (_, i) => ({
      x: Math.random(),
      y: Math.random() * 0.35,
      len: 0.07 + Math.random() * 0.08,
      speed: 0.005 + Math.random() * 0.004,
      delay: i * 120,
      life: 0,
    }));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      if (!running) return;
      // ~30fps cap — much smoother with scroll
      if (now - last < 33) {
        raf = requestAnimationFrame(draw);
        return;
      }
      last = now;
      t += 1;
      ctx.clearRect(0, 0, w, h);

      // sparse neighbor lines only (step by 2 to cut work)
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < Math.min(i + 6, particles.length); j++) {
          const b = particles[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          const dist = Math.hypot(dx, dy);
          if (dist < 90) {
            ctx.strokeStyle = `rgba(94, 234, 212, ${(1 - dist / 90) * 0.1})`;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle =
          p.hue === "amber"
            ? `rgba(251, 191, 36, ${p.a})`
            : `rgba(94, 234, 212, ${p.a})`;
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion) {
        for (const m of meteors) {
          if (t < m.delay) continue;
          m.life += 1;
          m.x += m.speed;
          m.y += m.speed * 0.55;
          if (m.x > 1.2 || m.y > 1.2) {
            m.x = Math.random() * 0.3;
            m.y = Math.random() * 0.3;
            m.life = 0;
            m.delay = t + 100 + Math.random() * 180;
          }
          const alpha =
            Math.min(0.55, m.life / 18) * (1 - Math.max(0, (m.life - 35) / 35));
          const x = m.x * w;
          const y = m.y * h;
          const grad = ctx.createLinearGradient(
            x,
            y,
            x - m.len * w,
            y - m.len * h * 0.55,
          );
          grad.addColorStop(0, `rgba(244, 241, 236, ${alpha})`);
          grad.addColorStop(1, "rgba(94, 234, 212, 0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - m.len * w, y - m.len * h * 0.55);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) {
        last = 0;
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#050507]" />

      <motion.div style={{ y: layerY }} className="absolute inset-[-10%] will-change-transform">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </motion.div>

      <motion.div
        className="grid-move absolute inset-[-20%] opacity-[0.14] will-change-transform"
        style={{ y: gridY }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050507_72%)]" />
      <div className="noise absolute inset-0 opacity-[0.08]" />
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="ring-pulse absolute top-[42%] left-[58%] h-[34vw] w-[34vw] opacity-30" />
      <div className="ring-pulse absolute top-[48%] left-[52%] h-[22vw] w-[22vw] opacity-20" />
    </div>
  );
}
