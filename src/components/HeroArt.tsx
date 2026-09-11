"use client";

import { motion } from "framer-motion";

/** Side art — Jesy Lu / League Design inspired, no fake dashboard */
export function HeroArt() {
  return (
    <div className="hero-art absolute inset-0 overflow-hidden">
      {/* atmospheric wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(94,234,212,0.22),transparent_50%),radial-gradient(ellipse_at_80%_85%,rgba(251,191,36,0.16),transparent_45%),linear-gradient(160deg,#0a0c10,#050507_70%)]" />

      {/* soft film grain feel */}
      <div className="noise absolute inset-0 opacity-[0.18]" />

      {/* diagonal slash — ReadyMag energy */}
      <motion.div
        className="hero-art-slash"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* outer frame */}
      <div className="absolute inset-5 border border-white/12" />
      <div className="absolute inset-8 border border-white/[0.06]" />

      {/* giant monogram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="hero-mono-g font-[family-name:var(--font-display)] select-none"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          G
        </motion.span>
      </div>

      {/* overlapping word — League Design style */}
      <motion.p
        className="absolute top-[18%] left-[-6%] font-[family-name:var(--font-display)] text-[clamp(3.5rem,8vw,6rem)] leading-none font-bold tracking-[-0.06em] text-[#f4f1ec]/[0.92]"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        GAMES
      </motion.p>

      <motion.p
        className="absolute right-[-4%] bottom-[22%] font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.8rem)] leading-none font-bold tracking-[-0.05em] text-teal-300/80"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.62, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        FEED
      </motion.p>

      {/* floating stamp cards — Jesy Lu vibe, meaningful labels */}
      <motion.div
        className="art-stamp absolute top-[12%] right-[10%]"
        initial={{ opacity: 0, y: 16, rotate: 8 }}
        animate={{ opacity: 1, y: [0, -8, 0], rotate: 8 }}
        transition={{
          opacity: { delay: 2.7, duration: 0.5 },
          y: { delay: 3.2, duration: 4.2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <span>TEAM</span>
      </motion.div>

      <motion.div
        className="art-stamp absolute bottom-[14%] left-[10%]"
        initial={{ opacity: 0, y: 16, rotate: -7 }}
        animate={{ opacity: 1, y: [0, 7, 0], rotate: -7 }}
        transition={{
          opacity: { delay: 2.8, duration: 0.5 },
          y: { delay: 3.4, duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <span>NOTES</span>
      </motion.div>

      {/* orbit accent */}
      <motion.div
        className="absolute top-6 right-6 h-16 w-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <div className="orbit-ring" />
        <span className="orbit-dot" />
      </motion.div>

      {/* bottom caption — short, real */}
      <motion.p
        className="absolute right-8 bottom-7 left-8 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.28em] text-zinc-500 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.9 }}
      >
        for Games · from the team
      </motion.p>
    </div>
  );
}
