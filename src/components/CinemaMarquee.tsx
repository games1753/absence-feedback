"use client";

import { motion } from "framer-motion";

const ROWS = [
  "FEEDBACK NATAKORN — WRITE ROAST PRAISE — OPEN BOARD —",
  "FROM THE TEAM — TO NATAKORN — MISS METER — VIBE CHECK —",
];

export function CinemaMarquee() {
  return (
    <section className="cinema-marquee relative overflow-hidden border-y border-white/8 py-5" aria-hidden>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050507] via-transparent to-[#050507]" />
      {ROWS.map((text, i) => (
        <div key={text} className="overflow-hidden py-1">
          <motion.div
            className="flex w-max gap-8"
            animate={{ x: i % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ duration: 28 + i * 4, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((copy) => (
              <p
                key={copy}
                className={`font-[family-name:var(--font-display)] text-[clamp(1.6rem,4vw,3rem)] tracking-[-0.03em] whitespace-nowrap ${
                  i % 2 === 0 ? "text-white/12" : "text-teal-300/15"
                }`}
              >
                {text} {text}
              </p>
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  );
}
