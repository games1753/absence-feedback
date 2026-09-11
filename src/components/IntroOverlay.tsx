"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function IntroOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShow(false);
      return;
    }
    const t = window.setTimeout(() => setShow(false), 2100);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro-overlay"
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="intro-inner">
            <motion.p
              className="font-[family-name:var(--font-mono)] text-xs tracking-[0.4em] text-teal-300/80 uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              loading signal
            </motion.p>
            <div className="mt-4 overflow-hidden">
              <motion.h2
                className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-[#f4f1ec] sm:text-6xl"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                FeedBack Natakorn
              </motion.h2>
            </div>
            <motion.div
              className="intro-bar mt-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.45, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
