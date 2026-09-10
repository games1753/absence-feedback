"use client";

import { motion } from "framer-motion";

type Props = {
  onWrite: () => void;
  onWall: () => void;
};

export function Hero({ onWrite, onWall }: Props) {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:px-12">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4 font-[family-name:var(--font-mono)] text-xs tracking-[0.35em] text-teal-300/70 uppercase"
      >
        team signal // forever archive
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="brand-title max-w-[12ch] text-[clamp(4.5rem,18vw,11rem)] leading-[0.82] font-bold tracking-[-0.06em] text-[#f4f1ec]"
      >
        ABSENT
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.22 }}
        className="mt-6 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg"
      >
        ถ้าวันหนึ่งขาดไป — ทีมจะลำบากแค่ไหน? เขียน feedback
        เก็บไว้ให้อ่านได้ตลอดกาล
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.36 }}
        className="mt-10 flex flex-wrap gap-3"
      >
        <button type="button" onClick={onWrite} className="btn-primary">
          เขียน Feedback
        </button>
        <button type="button" onClick={onWall} className="btn-ghost">
          ดูทั้งหมด
        </button>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 h-px origin-left bg-gradient-to-r from-teal-400/80 via-amber-400/40 to-transparent"
      />
    </section>
  );
}
