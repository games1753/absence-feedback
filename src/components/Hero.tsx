"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  onWrite: () => void;
  onWall: () => void;
};

const FLOAT_TAGS = [
  { text: "พอไหว", x: "8%", y: "18%", delay: 0 },
  { text: "ลื่นไหล", x: "72%", y: "22%", delay: 0.4 },
  { text: "หายาก", x: "78%", y: "58%", delay: 0.8 },
  { text: "ไฟลุก", x: "12%", y: "62%", delay: 1.1 },
  { text: "คมเป๊ะ", x: "55%", y: "14%", delay: 0.2 },
  { text: "LV 5", x: "85%", y: "40%", delay: 0.6 },
];

const TICKER = [
  "เขียนได้",
  "แซวได้",
  "ชมได้",
  "ดู Summary",
  "กำแพงเปิด",
  "จากทีม",
  "ถึง Natakorn",
];

function ParallaxLayer({
  y,
  children,
  className,
}: {
  y: MotionValue<number>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function Hero({ onWrite, onWall }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const titleY = useTransform(smooth, [0, 1], [0, -140]);
  const titleOpacity = useTransform(smooth, [0, 0.7], [1, 0.15]);
  const titleScale = useTransform(smooth, [0, 1], [1, 0.88]);
  const sideY = useTransform(smooth, [0, 1], [0, -220]);
  const sideRotate = useTransform(smooth, [0, 1], [0, 12]);
  const floatA = useTransform(smooth, [0, 1], [0, -180]);
  const floatB = useTransform(smooth, [0, 1], [0, 120]);
  const floatC = useTransform(smooth, [0, 1], [0, -90]);
  const glowX = useTransform(smooth, [0, 1], [0, 80]);
  const panelY = useTransform(smooth, [0, 1], [0, -160]);
  const barScale = useTransform(smooth, [0, 1], [1, 1.4]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-14 pt-28 sm:px-8 sm:pb-16 lg:px-12"
    >
      {/* scroll-reactive ambient shapes */}
      <ParallaxLayer y={floatA} className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-[18%] left-[42%] h-40 w-40 rounded-full border border-teal-400/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[30%] left-[48%] h-24 w-24 rounded-full border border-dashed border-amber-400/25"
          animate={{ rotate: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        />
      </ParallaxLayer>

      <ParallaxLayer y={floatB} className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-[12%] right-[18%] h-3 w-3 rounded-full bg-teal-300"
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-[48%] right-[8%] h-2 w-2 rounded-full bg-amber-300"
          animate={{ y: [0, -18, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3.2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[28%] left-[30%] h-16 w-16 border border-white/10"
          animate={{ rotate: [0, 45, 0], borderRadius: ["0%", "40%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </ParallaxLayer>

      <motion.div
        className="hero-glow"
        style={{ x: glowX }}
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* floating tags */}
      <ParallaxLayer y={floatC} className="pointer-events-none absolute inset-0 z-[1] hidden sm:block">
        {FLOAT_TAGS.map((tag, i) => (
          <motion.span
            key={tag.text}
            className="float-tag absolute"
            style={{ left: tag.x, top: tag.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.35, 0.9, 0.35],
              y: [0, i % 2 === 0 ? -14 : 14, 0],
              rotate: [0, i % 2 === 0 ? 3 : -3, 0],
            }}
            transition={{
              duration: 4.5 + i * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: tag.delay,
            }}
          >
            {tag.text}
          </motion.span>
        ))}
      </ParallaxLayer>

      {/* right visual stack */}
      <motion.div
        className="pointer-events-none absolute top-28 right-4 hidden w-[min(42vw,420px)] lg:block lg:right-12"
        style={{ y: sideY, rotate: sideRotate }}
      >
        <div className="relative h-[62vh] min-h-[420px]">
          <motion.div
            className="hero-panel absolute inset-x-0 top-0 h-[58%]"
            animate={{ borderColor: ["rgba(94,234,212,0.2)", "rgba(251,191,36,0.35)", "rgba(94,234,212,0.2)"] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.25em] text-teal-300/80 uppercase">
                live pulse
              </span>
              <motion.span
                className="h-2 w-2 rounded-full bg-teal-400"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </div>
            <div className="space-y-3 px-4 pt-2">
              {[72, 45, 88, 60, 95].map((w, i) => (
                <motion.div
                  key={w}
                  className="h-2 origin-left bg-gradient-to-r from-teal-400/80 to-amber-400/50"
                  style={{ scaleX: barScale }}
                  initial={{ width: 0 }}
                  animate={{ width: `${w}%` }}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.12 }}
                />
              ))}
            </div>
            <motion.div
              className="absolute inset-x-4 bottom-4 overflow-hidden border-t border-white/10 pt-3"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-widest text-zinc-500 uppercase">
                miss meter · vibe · wall
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-panel absolute right-0 bottom-0 left-[12%] h-[48%]"
            style={{ y: panelY }}
          >
            <div className="flex h-full flex-col justify-between p-4">
              <p className="font-[family-name:var(--font-display)] text-5xl text-[#f4f1ec]">
                01
                <motion.span
                  className="ml-1 inline-block text-teal-300"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  _
                </motion.span>
              </p>
              <div>
                <p className="text-sm text-zinc-300">ช่องทางส่งถึง Natakorn</p>
                <p className="mt-1 text-xs text-zinc-500">เลื่อนลงไปเขียนด้านล่างได้เลย</p>
              </div>
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="h-8 flex-1 bg-white/5"
                    animate={{ opacity: [0.25, 0.8, 0.25], scaleY: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -bottom-2 -left-6 h-32 w-32"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <div className="orbit-ring" />
            <span className="orbit-dot" />
          </motion.div>
        </div>
      </motion.div>

      {/* vertical ticker */}
      <div className="pointer-events-none absolute top-28 bottom-20 left-0 hidden w-10 overflow-hidden opacity-40 md:block">
        <motion.div
          className="flex flex-col gap-6 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-teal-300/70 uppercase"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={`${t}-${i}`} className="rotate-180 [writing-mode:vertical-rl]">
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* main copy */}
      <motion.div style={{ y: titleY, opacity: titleOpacity, scale: titleScale }} className="relative z-10 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-4 font-[family-name:var(--font-mono)] text-xs tracking-[0.35em] text-teal-300/70 uppercase"
        >
          from the team · to Natakorn
        </motion.p>

        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.8rem,12vw,7.2rem)] leading-[0.88] font-bold tracking-[-0.045em]">
          {["FeedBack", "Natakorn"].map((word, wi) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="brand-word inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.85,
                  delay: 0.08 + wi * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word.split("").map((ch, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    className="brand-letter inline-block"
                    animate={{ y: [0, wi === 0 ? -5 : 5, 0] }}
                    transition={{
                      duration: 3 + i * 0.07,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.07 + wi * 0.15,
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
          transition={{ duration: 0.75, delay: 0.28 }}
          className="mt-6 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          เขียนเล่นๆ ได้ แซวได้ ชมได้ — ทีมอ่านด้วยกันได้หมด
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-3"
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

        <div className="mt-10 flex flex-wrap gap-2">
          {["ชื่อไม่บังคับ", "5 ระดับ", "Summary", "กำแพงเปิด"].map((item, i) => (
            <motion.span
              key={item}
              className="hero-chip"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.08 }}
              whileHover={{ y: -3, borderColor: "rgba(94,234,212,0.5)" }}
            >
              {item}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 h-px origin-left bg-gradient-to-r from-teal-400/80 via-amber-400/40 to-transparent"
        />
      </motion.div>

      {/* bottom scroll hint */}
      <motion.div
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        animate={{ y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
          scroll
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-teal-300 to-transparent" />
      </motion.div>
    </section>
  );
}
