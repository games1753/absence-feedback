"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

export function ParallaxSection({ children, className, speed = 80 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smooth, [0, 1], [speed, -speed]);
  const opacity = useTransform(smooth, [0, 0.2, 0.8, 1], [0.35, 1, 1, 0.45]);
  const scale = useTransform(smooth, [0, 0.5, 1], [0.97, 1, 0.98]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, opacity, scale }}>{children}</motion.div>
    </div>
  );
}
