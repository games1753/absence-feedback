"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Pure motion strip — no marketing copy */
export function ManifestoStrip() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-100, 90]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 sm:py-24"
      aria-hidden
    >
      <motion.div style={{ rotate }} className="flex flex-col gap-3">
        <motion.p
          style={{ x: x1 }}
          className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,14vw,10rem)] leading-none font-bold tracking-[-0.06em] whitespace-nowrap text-white/[0.07]"
        >
          WRITE · ROAST · CHILL · REPEAT · WRITE · ROAST · CHILL · REPEAT
        </motion.p>
        <motion.p
          style={{ x: x2 }}
          className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,14vw,10rem)] leading-none font-bold tracking-[-0.06em] whitespace-nowrap text-teal-300/[0.1]"
        >
          GAMES · JUST A GUY · OPEN BOARD · GAMES · JUST A GUY
        </motion.p>
      </motion.div>
    </section>
  );
}
