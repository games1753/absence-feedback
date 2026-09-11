"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";

type Props = {
  onWrite: () => void;
};

export function SlashBanner({ onWrite }: Props) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="slash-band">
        <div className="slash-band-inner">
          <motion.p
            className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.35em] text-black/55 uppercase"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            make it feel designed
          </motion.p>
          <motion.h3
            className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-3xl leading-[1.05] font-bold tracking-[-0.04em] text-[#041016] sm:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            ไม่ใช่แค่ฟอร์มธรรมดา — เป็นบอร์ดที่ทีมอยากเลื่อนดู
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mt-7"
          >
            <MagneticButton onClick={onWrite} className="btn-ink">
              เริ่มเขียนเลย
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
