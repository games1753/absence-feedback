"use client";

import { motion } from "framer-motion";
import { MISS_LEVELS, WORK_VIBES } from "@/lib/constants";
import type { Feedback, FeedbackSummary } from "@/lib/types";

type Props = {
  summary: FeedbackSummary;
};

export function SummaryPanel({ summary }: Props) {
  const maxMiss = Math.max(1, ...Object.values(summary.missDistribution));
  const topVibe = (Object.entries(summary.vibeCounts) as [string, number][])
    .sort((a, b) => b[1] - a[1])[0];
  const vibeLabel =
    WORK_VIBES.find((v) => v.id === topVibe?.[0])?.label ?? "—";

  return (
    <section id="summary" className="scroll-mt-24 px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.3em] text-teal-300/70 uppercase">
            pulse check
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[#f4f1ec] sm:text-5xl">
            Summary
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Feedback ทั้งหมด",
              value: String(summary.total),
              sub: "รายการถาวร",
            },
            {
              label: "เฉลี่ยความลำบาก",
              value: summary.total ? summary.avgMissLevel.toFixed(1) : "—",
              sub: "จาก 5 ระดับ",
            },
            {
              label: "อยากร่วมงานอีก",
              value: summary.total ? summary.avgWorkAgain.toFixed(1) : "—",
              sub: `Vibe ฮิต: ${vibeLabel}`,
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="stat-block"
            >
              <p className="text-xs tracking-widest text-zinc-500 uppercase">
                {stat.label}
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-5xl tracking-tight text-[#f4f1ec]">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-zinc-500">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <p className="mb-4 text-sm text-zinc-400">การกระจายระดับความลำบาก</p>
          <div className="space-y-3">
            {MISS_LEVELS.map((level) => {
              const count = summary.missDistribution[level.level];
              const pct = summary.total ? (count / maxMiss) * 100 : 0;
              return (
                <div key={level.level} className="grid grid-cols-[7rem_1fr_2rem] items-center gap-3">
                  <span className="text-sm text-zinc-300">
                    {level.level}. {level.label}
                  </span>
                  <div className="h-2 overflow-hidden bg-white/5">
                    <motion.div
                      className="h-full"
                      style={{ background: level.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span className="text-right font-[family-name:var(--font-mono)] text-xs text-zinc-500">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

type WallProps = {
  items: Feedback[];
};

export function FeedbackWall({ items }: WallProps) {
  return (
    <section id="wall" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.3em] text-amber-300/70 uppercase">
            open archive
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[#f4f1ec] sm:text-5xl">
            กำแพง Feedback
          </h2>
          <p className="mt-3 text-zinc-400">ทุกคนอ่านได้ — เก็บไว้ไม่มีวันหาย</p>
        </motion.div>

        {items.length === 0 ? (
          <p className="mt-12 text-zinc-500">ยังไม่มี feedback — เป็นคนแรกสิ</p>
        ) : (
          <div className="mt-12 columns-1 gap-4 sm:columns-2">
            {items.map((item, index) => {
              const miss = MISS_LEVELS.find((m) => m.level === item.missLevel);
              const vibe = WORK_VIBES.find((v) => v.id === item.vibe);
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: Math.min(index * 0.04, 0.3) }}
                  className="feedback-card mb-4 break-inside-avoid"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-[family-name:var(--font-display)] text-lg text-[#f4f1ec]">
                        {item.name || "ไม่ระบุชื่อ"}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {new Date(item.createdAt).toLocaleString("th-TH", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                    <span
                      className="shrink-0 font-[family-name:var(--font-mono)] text-xs tracking-wide"
                      style={{ color: miss?.color }}
                    >
                      LV {item.missLevel}
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-zinc-300">
                    {item.message}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-white/8 pt-4 text-xs text-zinc-500">
                    <span>
                      คิดถึง:{" "}
                      <span className="text-zinc-300">{item.missMost}</span>
                    </span>
                    <span className="text-zinc-700">·</span>
                    <span>
                      Vibe:{" "}
                      <span className="text-zinc-300">{vibe?.label}</span>
                    </span>
                    <span className="text-zinc-700">·</span>
                    <span>
                      ร่วมงานอีก:{" "}
                      <span className="text-zinc-300">{item.workAgain}/5</span>
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
