"use client";

import { motion } from "framer-motion";
import { MISS_LEVELS, WORK_AGAIN, WORK_VIBES } from "@/lib/constants";
import type { Feedback, FeedbackSummary } from "@/lib/types";
import { DonutChart } from "@/components/DonutChart";

type Props = {
  summary: FeedbackSummary;
};

export function SummaryPanel({ summary }: Props) {
  const missSlices = MISS_LEVELS.map((level) => ({
    label: `${level.level}. ${level.label}`,
    value: summary.missDistribution[level.level],
    color: level.color,
  }));

  const vibeSlices = WORK_VIBES.map((vibe) => ({
    label: vibe.label,
    value: summary.vibeCounts[vibe.id],
    color: vibe.color,
  }));

  const workSlices = WORK_AGAIN.map((item) => ({
    label: `${item.level}. ${item.label}`,
    value: summary.workAgainDistribution?.[item.level] ?? 0,
    color: item.color,
  }));

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
          <p className="mt-3 text-zinc-400">
            กราฟวงกลมจากทุกหัวข้อที่ให้เลือก · ทั้งหมด {summary.total} รายการ
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <DonutChart
              title="ขาดไปจะลำบากระดับไหน"
              subtitle={
                summary.total
                  ? `เฉลี่ย ${summary.avgMissLevel.toFixed(1)} / 5`
                  : "ยังไม่มีข้อมูล"
              }
              slices={missSlices}
              centerValue={summary.total ? summary.avgMissLevel.toFixed(1) : "0"}
              centerLabel="เฉลี่ย"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
          >
            <DonutChart
              title="Vibe ตอนทำงานด้วยกัน"
              subtitle="สัดส่วนแต่ละ vibe"
              slices={vibeSlices}
              centerValue={String(summary.total)}
              centerLabel="โหวต"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
          >
            <DonutChart
              title="อยากร่วมงานอีกไหม"
              subtitle={
                summary.total
                  ? `เฉลี่ย ${summary.avgWorkAgain.toFixed(1)} / 5`
                  : "ยังไม่มีข้อมูล"
              }
              slices={workSlices}
              centerValue={summary.total ? summary.avgWorkAgain.toFixed(1) : "0"}
              centerLabel="เฉลี่ย"
            />
          </motion.div>
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
            the board
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[#f4f1ec] sm:text-5xl">
            Feedback ทั้งหมด
          </h2>
          <p className="mt-3 text-zinc-400">ใครก็เข้ามาอ่านได้</p>
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
