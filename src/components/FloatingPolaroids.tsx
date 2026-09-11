"use client";

import { motion } from "framer-motion";

const CARDS = [
  { title: "MISS LV", value: "01–05", rot: -8, x: "6%", y: "22%", delay: 2.4 },
  { title: "VIBE", value: "FLOW", rot: 6, x: "18%", y: "58%", delay: 2.55 },
  { title: "AGAIN", value: "5/5", rot: -4, x: "72%", y: "28%", delay: 2.5 },
  { title: "NOTE", value: "OPEN", rot: 9, x: "78%", y: "62%", delay: 2.65 },
];

export function FloatingPolaroids() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] hidden md:block" aria-hidden>
      {CARDS.map((card) => (
        <motion.div
          key={card.title}
          className="polaroid absolute"
          style={{ left: card.x, top: card.y, rotate: card.rot }}
          initial={{ opacity: 0, y: 28, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
            scale: 1,
          }}
          transition={{
            opacity: { delay: card.delay, duration: 0.5 },
            scale: { delay: card.delay, duration: 0.5 },
            y: {
              delay: card.delay + 0.4,
              duration: 4.5 + Math.abs(card.rot) * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.25em] text-zinc-500 uppercase">
            {card.title}
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl tracking-tight text-[#f4f1ec]">
            {card.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
