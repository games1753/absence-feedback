"use client";

import { motion } from "framer-motion";

/** Lightweight decorative motion lines — no copy */
export function EnergyLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      <motion.span
        className="energy-line energy-line-a"
        animate={{ x: ["-20%", "120%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        className="energy-line energy-line-b"
        animate={{ x: ["120%", "-30%"] }}
        transition={{ duration: 13, repeat: Infinity, ease: "linear", delay: 2 }}
      />
      <motion.span
        className="energy-line energy-line-c"
        animate={{ y: ["-10%", "110%"] }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear", delay: 1 }}
      />
    </div>
  );
}
