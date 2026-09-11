"use client";

import { useRef, type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { FloatingPolaroids } from "@/components/FloatingPolaroids";

type Props = {
  onWrite: () => void;
  onWall: () => void;
};

export function Hero({ onWrite, onWall }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const sideY = useTransform(scrollYProgress, [0, 1], [0, -110]);

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spot = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, rgba(94,234,212,0.16), transparent 55%)`;

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 pb-16 sm:px-8 lg:px-12"
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: spot }} />
      <FloatingPolaroids />

      {/* giant ghost typography — Jamie McKaye energy */}
      <motion.div
        style={{ y: ghostY }}
        className="pointer-events-none absolute top-[18%] left-[-4%] select-none will-change-transform"
        aria-hidden
      >
        <p className="ghost-type font-[family-name:var(--font-display)] text-[clamp(5rem,22vw,18rem)] leading-[0.8] font-bold tracking-[-0.07em]">
          FEED
        </p>
        <p className="ghost-type font-[family-name:var(--font-display)] -mt-4 text-[clamp(5rem,22vw,18rem)] leading-[0.8] font-bold tracking-[-0.07em] sm:-mt-8">
          BACK
        </p>
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div style={{ y: titleY }} className="will-change-transform">
          <div className="mb-6 flex items-center gap-3">
            <motion.span
              className="h-px w-10 bg-teal-300/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.05, duration: 0.6 }}
            />
            <div className="overflow-hidden">
              <motion.p
                className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.35em] text-teal-300/80 uppercase"
                initial={{ y: "120%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 2.05, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                from the team · to Games
              </motion.p>
            </div>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,10vw,6.5rem)] leading-[0.9] font-bold tracking-[-0.05em]">
            <span className="block overflow-hidden">
              <motion.span
                className="brand-title inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 2.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                FeedBack
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="brand-title inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 2.22, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Games
              </motion.span>
            </span>
          </h1>

          <div className="mt-7 max-w-md overflow-hidden">
            <motion.p
              className="text-base leading-relaxed text-zinc-400 sm:text-lg"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ delay: 2.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              เขียนเล่นๆ ได้ แซวได้ ชมได้ — ทีมอ่านด้วยกันได้หมด
            </motion.p>
          </div>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.45, duration: 0.6 }}
          >
            <MagneticButton onClick={onWrite} className="btn-primary">
              เขียน Feedback
            </MagneticButton>
            <MagneticButton onClick={onWall} className="btn-ghost">
              ดูทั้งหมด
            </MagneticButton>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.55 }}
          >
            {["ชื่อไม่บังคับ", "5 ระดับ", "Summary", "เปิดอ่านได้"].map((item) => (
              <span key={item} className="hero-chip" data-cursor="hover">
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* cinematic side stage */}
        <motion.div
          style={{ y: sideY }}
          className="relative hidden min-h-[420px] will-change-transform lg:block"
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-stage absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(94,234,212,0.18),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.12),transparent_40%)]" />
            <div className="absolute inset-6 border border-white/10" />
            <div className="absolute inset-10 border border-dashed border-white/8" />

            <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] text-teal-300/80 uppercase">
                signal room
              </span>
              <span className="flex items-center gap-2 text-[10px] tracking-widest text-zinc-500 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                live
              </span>
            </div>

            <div className="absolute top-1/2 left-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2">
              <p className="font-[family-name:var(--font-display)] text-6xl tracking-tight text-[#f4f1ec]">
                01
                <motion.span
                  className="text-teal-300"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                >
                  _
                </motion.span>
              </p>
              <p className="mt-3 text-sm text-zinc-400">ช่องทางส่งถึง Games</p>
              <div className="mt-6 space-y-2.5">
                {[78, 52, 91, 64].map((w, i) => (
                  <motion.div
                    key={w}
                    className="h-1.5 origin-left rounded-full bg-gradient-to-r from-teal-300 to-amber-300/80"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2.5 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute right-8 bottom-8 left-8 flex items-end justify-between">
              <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] text-zinc-500 uppercase">
                miss · vibe · again
              </p>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="h-8 w-2 origin-bottom bg-white/15"
                    animate={{ scaleY: [0.45, 1, 0.45] }}
                    transition={{
                      duration: 1.7,
                      repeat: Infinity,
                      delay: i * 0.14,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="absolute -top-4 -right-4 h-24 w-24"
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            <div className="orbit-ring" />
            <span className="orbit-dot" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 2.7, duration: 0.5 },
          y: { delay: 2.7, duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
          scroll
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-teal-300 to-transparent" />
      </motion.div>
    </section>
  );
}
