"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

export function ParallaxSection({ children, className, speed = 40 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // transform only — no opacity/scale (those force expensive paints)
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
