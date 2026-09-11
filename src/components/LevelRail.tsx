"use client";

import { motion } from "framer-motion";
import { MISS_LEVELS } from "@/lib/constants";

export function LevelRail() {
  return (
    <section className="relative px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-end justify-between gap-4">
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.3em] text-zinc-500 uppercase">
            miss meter preview
          </p>
          <p className="text-xs text-zinc-600">เลื่อนดู 5 ระดับ</p>
        </div>
        <div className="level-rail">
          {MISS_LEVELS.map((level, i) => (
            <motion.article
              key={level.level}
              className="level-tile"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              data-cursor="hover"
            >
              <span
                className="font-[family-name:var(--font-mono)] text-4xl font-semibold"
                style={{ color: level.color }}
              >
                {level.level}
              </span>
              <p className="mt-3 text-lg text-[#f4f1ec]">{level.label}</p>
              <p className="mt-1 text-sm text-zinc-500">{level.hint}</p>
              <div
                className="mt-6 h-1 w-full origin-left"
                style={{ background: level.color, opacity: 0.7 }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
