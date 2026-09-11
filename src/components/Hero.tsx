"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  onWrite: () => void;
  onWall: () => void;
};

const FLOAT_TAGS = [
  { text: "พอไหว", x: "8%", y: "18%" },
  { text: "ลื่นไหล", x: "72%", y: "22%" },
  { text: "หายาก", x: "78%", y: "58%" },
  { text: "ไฟลุก", x: "12%", y: "62%" },
  { text: "คมเป๊ะ", x: "55%", y: "14%" },
  { text: "LV 5", x: "85%", y: "40%" },
];

export function Hero({ onWrite, onWall }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // transform-only (no spring/opacity/scale) keeps scroll smooth
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const sideY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const decorY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-14 pt-28 sm:px-8 sm:pb-16 lg:px-12"
    >
      <motion.div
        style={{ y: decorY }}
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        <div className="absolute top-[18%] left-[42%] h-40 w-40 rounded-full border border-teal-400/20" />
        <div className="absolute top-[30%] left-[48%] h-24 w-24 rounded-full border border-dashed border-amber-400/25" />
        <div className="absolute top-[12%] right-[18%] h-2.5 w-2.5 rounded-full bg-teal-300/80" />
        <div className="absolute bottom-[28%] left-[30%] h-14 w-14 border border-white/10" />

        {FLOAT_TAGS.map((tag) => (
          <span
            key={tag.text}
            className="float-tag absolute hidden sm:inline-flex"
            style={{ left: tag.x, top: tag.y }}
          >
            {tag.text}
          </span>
        ))}
      </motion.div>

      <div className="hero-glow" />

      <motion.div
        className="pointer-events-none absolute top-28 right-4 hidden w-[min(42vw,400px)] will-change-transform lg:block lg:right-12"
        style={{ y: sideY }}
      >
        <div className="relative h-[58vh] min-h-[380px]">
          <div className="hero-panel absolute inset-x-0 top-0 h-[56%]">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.25em] text-teal-300/80 uppercase">
                live pulse
              </span>
              <span className="h-2 w-2 rounded-full bg-teal-400" />
            </div>
            <div className="space-y-3 px-4 pt-2">
              {[72, 45, 88, 60, 95].map((w) => (
                <div
                  key={w}
                  className="h-2 bg-gradient-to-r from-teal-400/80 to-amber-400/50"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
            <div className="absolute inset-x-4 bottom-4 border-t border-white/10 pt-3">
              <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-widest text-zinc-500 uppercase">
                miss meter · vibe · board
              </p>
            </div>
          </div>

          <div className="hero-panel absolute right-0 bottom-0 left-[12%] h-[46%]">
            <div className="flex h-full flex-col justify-between p-4">
              <p className="font-[family-name:var(--font-display)] text-5xl text-[#f4f1ec]">
                01<span className="text-teal-300">_</span>
              </p>
              <div>
                <p className="text-sm text-zinc-300">ช่องทางส่งถึง Natakorn</p>
                <p className="mt-1 text-xs text-zinc-500">เลื่อนลงไปเขียนด้านล่างได้เลย</p>
              </div>
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="h-8 flex-1 bg-white/5" />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-2 -left-6 h-28 w-28 animate-[spin_28s_linear_infinite]">
            <div className="orbit-ring" />
            <span className="orbit-dot" />
          </div>
        </div>
      </motion.div>

      <motion.div style={{ y: titleY }} className="relative z-10 max-w-3xl will-change-transform">
        <p className="mb-4 font-[family-name:var(--font-mono)] text-xs tracking-[0.35em] text-teal-300/70 uppercase">
          from the team · to Natakorn
        </p>

        <h1 className="brand-title font-[family-name:var(--font-display)] text-[clamp(2.8rem,12vw,7.2rem)] leading-[0.88] font-bold tracking-[-0.045em]">
          FeedBack
          <br />
          Natakorn
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">
          เขียนเล่นๆ ได้ แซวได้ ชมได้ — ทีมอ่านด้วยกันได้หมด
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={onWrite} className="btn-primary">
            เขียน Feedback
          </button>
          <button type="button" onClick={onWall} className="btn-ghost">
            ดูทั้งหมด
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {["ชื่อไม่บังคับ", "5 ระดับ", "Summary", "เปิดอ่านได้"].map((item) => (
            <span key={item} className="hero-chip">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-12 h-px bg-gradient-to-r from-teal-400/80 via-amber-400/40 to-transparent" />
      </motion.div>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-60">
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
          scroll
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-teal-300 to-transparent" />
      </div>
    </section>
  );
}
