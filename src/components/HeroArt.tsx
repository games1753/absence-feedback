"use client";

import { motion } from "framer-motion";

/** Stacked glass notes — casual roast previews, not praise */
const NOTES = [
  {
    from: "ใครสักคน",
    vibe: "วุ่นวาย",
    body: "หายไปก็นานแล้วนะ เอ๊ะ หรือเปล่า",
    rot: -11,
    y: "8%",
    x: "10%",
    z: 1,
    delay: 2.35,
  },
  {
    from: "anonymous",
    vibe: "ชิลเกิน",
    body: "โค้ดก็งง คนก็งง ครบเซ็ต",
    rot: 7,
    y: "28%",
    x: "28%",
    z: 3,
    delay: 2.48,
  },
  {
    from: "เพื่อน",
    vibe: "จุกๆ",
    body: "กลับมาก็ได้ ไม่ได้คิดถึงขนาดนั้น",
    rot: -4,
    y: "48%",
    x: "6%",
    z: 2,
    delay: 2.58,
  },
];

const RING = ["ROAST", "NOTE", "AGAIN", "CHILL", "GAMES", "OK"];

export function HeroArt() {
  return (
    <div className="hero-art absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(94,234,212,0.2),transparent_42%),radial-gradient(circle_at_20%_80%,rgba(251,191,36,0.12),transparent_40%),linear-gradient(165deg,#090b10,#040406)]" />
      <div className="noise absolute inset-0 opacity-[0.14]" />

      <motion.div
        className="hero-art-orb absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <defs>
            <path
              id="hero-ring"
              d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              fill="none"
            />
          </defs>
          <text className="fill-teal-300/55 font-[family-name:var(--font-mono)] text-[4.2px] tracking-[0.55em] uppercase">
            <textPath href="#hero-ring">
              {RING.join("  ·  ")}  ·  {RING.join("  ·  ")}
            </textPath>
          </text>
        </svg>
      </motion.div>

      {NOTES.map((note) => (
        <motion.article
          key={note.body}
          className="hero-note absolute w-[210px]"
          style={{
            top: note.y,
            left: note.x,
            zIndex: note.z,
            rotate: note.rot,
          }}
          initial={{ opacity: 0, y: 28, scale: 0.94 }}
          animate={{
            opacity: 1,
            y: [0, note.z === 3 ? -10 : 8, 0],
            scale: 1,
          }}
          transition={{
            opacity: { delay: note.delay, duration: 0.55 },
            scale: { delay: note.delay, duration: 0.55 },
            y: {
              delay: note.delay + 0.4,
              duration: 4.8 + note.z * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
              {note.from}
            </span>
            <span className="rounded-full border border-teal-300/25 bg-teal-300/10 px-2 py-0.5 text-[10px] text-teal-200/90">
              {note.vibe}
            </span>
          </div>
          <p className="mt-3 font-[family-name:var(--font-display)] text-[1.05rem] leading-snug tracking-[-0.02em] text-[#f4f1ec]">
            {note.body}
          </p>
          <div className="mt-4 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${i < 2 ? "bg-amber-300/80" : "bg-white/15"}`}
              />
            ))}
          </div>
        </motion.article>
      ))}

      <motion.p
        className="absolute right-6 bottom-6 left-6 text-center font-[family-name:var(--font-mono)] text-[10px] tracking-[0.28em] text-zinc-500 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.85 }}
      >
        just notes · not a tribute
      </motion.p>
    </div>
  );
}
