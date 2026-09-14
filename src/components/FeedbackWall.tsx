"use client";

import { motion } from "framer-motion";
import { MISS_LEVELS, WORK_AGAIN, WORK_VIBES } from "@/lib/constants";
import type { Feedback, FeedbackSummary } from "@/lib/types";
import { DonutChart } from "@/components/DonutChart";
import { SectionHead } from "@/components/SectionHead";

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
    <section id="summary" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          index="02"
          eyebrow="pulse check"
          title="Summary"
          desc={`กราฟวงกลมจากทุกหัวข้อที่ให้เลือก · ทั้งหมด ${summary.total} รายการ`}
        />

        <div className="grid gap-5">
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
    <section id="wall" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          index="03"
          eyebrow="the board"
          title="Feedback ทั้งหมด"
          desc="ใครก็เข้ามาอ่านได้"
        />

        {items.length === 0 ? (
          <p className="mt-4 text-zinc-500">ยังไม่มี feedback — เป็นคนแรกสิ</p>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2">
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
                      <p className="font-[family-name:var(--font-thai)] text-lg font-semibold tracking-tight text-[#f4f1ec]">
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
                  <p className="mt-4 font-[family-name:var(--font-thai)] text-base leading-relaxed font-medium text-[#ece8e2]">
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
