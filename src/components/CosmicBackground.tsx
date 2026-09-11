"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 30 });
  const layerSlow = useTransform(smooth, [0, 1], [0, -200]);
  const layerMid = useTransform(smooth, [0, 1], [0, -420]);
  const layerFast = useTransform(smooth, [0, 1], [0, -700]);
  const gridY = useTransform(smooth, [0, 1], [0, 300]);
  const rotateGrid = useTransform(smooth, [0, 1], [0, 8]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;

    const particles = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.0005,
      vy: (Math.random() - 0.5) * 0.0006,
      a: Math.random() * 0.55 + 0.12,
      hue: Math.random() > 0.65 ? "amber" : "teal",
    }));

    const meteors = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random(),
      y: Math.random() * 0.4,
      len: 0.08 + Math.random() * 0.12,
      speed: 0.004 + Math.random() * 0.006,
      delay: i * 70,
      life: 0,
    }));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.14;
            ctx.strokeStyle = `rgba(94, 234, 212, ${alpha})`;
            ctx.lineWidth = 1;
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
        const pulse = 0.65 + Math.sin(t * 0.04 + p.x * 10) * 0.35;
        ctx.beginPath();
        ctx.fillStyle =
          p.hue === "amber"
            ? `rgba(251, 191, 36, ${p.a * pulse})`
            : `rgba(94, 234, 212, ${p.a * pulse})`;
        ctx.arc(p.x * w, p.y * h, p.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const m of meteors) {
        if (t < m.delay) continue;
        m.life += 1;
        m.x += m.speed;
        m.y += m.speed * 0.55;
        if (m.x > 1.2 || m.y > 1.2) {
          m.x = Math.random() * 0.3;
          m.y = Math.random() * 0.35;
          m.life = 0;
          m.delay = t + 80 + Math.random() * 200;
        }
        const alpha =
          Math.min(0.7, m.life / 20) * (1 - Math.max(0, (m.life - 40) / 40));
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
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - m.len * w, y - m.len * h * 0.55);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#050507]" />

      <motion.div style={{ y: layerSlow }} className="absolute inset-[-20%]">
        <div className="orb orb-a" />
        <div className="orb orb-c" />
      </motion.div>

      <motion.div style={{ y: layerMid }} className="absolute inset-[-20%]">
        <div className="orb orb-b" />
        <div className="orb orb-d" />
      </motion.div>

      <motion.div
        className="grid-move absolute inset-[-30%] opacity-[0.22]"
        style={{ y: gridY, rotate: rotateGrid }}
      />

      <div className="scanlines absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050507_72%)]" />
      <div className="noise absolute inset-0 opacity-[0.14]" />
      <canvas ref={canvasRef} className="absolute inset-0" />

      <motion.div style={{ y: layerFast }} className="absolute inset-0">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="ring-pulse"
            style={{
              width: `${22 + i * 14}vw`,
              height: `${22 + i * 14}vw`,
              top: "45%",
              left: "55%",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.06, 0.18, 0.06],
              rotate: [0, i % 2 === 0 ? 25 : -25],
            }}
            transition={{
              duration: 9 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={`float-${i}`}
            className="float-speck"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + ((i * 19) % 75)}%`,
            }}
            animate={{
              y: [0, -30 - i * 2, 0],
              x: [0, i % 2 === 0 ? 16 : -14, 0],
              opacity: [0.12, 0.6, 0.12],
            }}
            transition={{
              duration: 4.5 + i * 0.55,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
