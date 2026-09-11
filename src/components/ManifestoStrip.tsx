"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ManifestoStrip() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [40, -80]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-60, 50]);

  return (
    <section ref={ref} className="relative overflow-hidden py-20 sm:py-28" aria-hidden>
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-2">
        <motion.p
          style={{ x: x1 }}
          className="font-[family-name:var(--font-display)] text-[clamp(3rem,12vw,9rem)] leading-none font-bold tracking-[-0.06em] whitespace-nowrap text-white/[0.06]"
        >
          WRITE · ROAST · PRAISE · REPEAT
        </motion.p>
        <motion.p
          style={{ x: x2 }}
          className="font-[family-name:var(--font-display)] text-[clamp(3rem,12vw,9rem)] leading-none font-bold tracking-[-0.06em] whitespace-nowrap text-teal-300/[0.08]"
        >
          NATAKORN · TEAM SIGNAL · OPEN BOARD
        </motion.p>
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.35em] text-teal-300/70 uppercase">
          manifesto
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[#f4f1ec] sm:text-5xl">
          Feedback ที่อ่านแล้วรู้สึก
        </h3>
        <p className="mx-auto mt-4 max-w-md text-zinc-400">
          ไม่ต้องจริงจังเกิน — ขอแค่จริงใจพอให้ทีมยิ้มได้
        </p>
      </div>
    </section>
  );
}
