"use client";

import { motion } from "framer-motion";

type Props = {
  onWrite: () => void;
  onWall: () => void;
};

const titleWords = ["FeedBack", "Natakorn"];

export function Hero({ onWrite, onWall }: Props) {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:px-12">
      <motion.div
        className="hero-glow"
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.12, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4 font-[family-name:var(--font-mono)] text-xs tracking-[0.35em] text-teal-300/70 uppercase"
      >
        from the team · to Natakorn
      </motion.p>

      <h1 className="brand-title max-w-[14ch] text-[clamp(2.6rem,11vw,7rem)] leading-[0.9] font-bold tracking-[-0.045em]">
        {titleWords.map((word, wi) => (
          <span key={word} className="block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", rotate: 4 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.1 + wi * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word.split("").map((ch, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="inline-block"
                  animate={{ y: [0, wi === 0 ? -4 : 4, 0] }}
                  transition={{
                    duration: 3.2 + i * 0.08,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.08 + wi * 0.2,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.28 }}
        className="mt-6 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg"
      >
        เขียนเล่นๆ ได้ แซวได้ ชมได้ — ทีมอ่านด้วยกันได้หมด
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-10 flex flex-wrap gap-3"
      >
        <motion.button
          type="button"
          onClick={onWrite}
          className="btn-primary"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          เขียน Feedback
        </motion.button>
        <motion.button
          type="button"
          onClick={onWall}
          className="btn-ghost"
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          ดูทั้งหมด
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 h-px origin-left bg-gradient-to-r from-teal-400/80 via-amber-400/40 to-transparent"
      />

      <motion.div
        className="pointer-events-none absolute top-28 right-6 hidden h-28 w-28 sm:block lg:right-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <div className="orbit-ring" />
        <motion.span
          className="orbit-dot"
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
