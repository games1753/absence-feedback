"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.35 });
  const ringX = useSpring(x, { stiffness: 180, damping: 28, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 180, damping: 28, mass: 0.45 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const hit = t?.closest("a, button, input, textarea, [data-cursor='hover']");
      setHovering(Boolean(hit));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: sx, y: sy }}
        animate={{ scale: hovering ? 0.4 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 1.55 : 1,
          borderColor: hovering
            ? "rgba(94, 234, 212, 0.85)"
            : "rgba(244, 241, 236, 0.35)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      />
    </>
  );
}
