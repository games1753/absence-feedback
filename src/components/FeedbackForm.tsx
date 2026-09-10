"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MISS_LEVELS, WORK_AGAIN, WORK_VIBES } from "@/lib/constants";
import type { Feedback, WorkVibe } from "@/lib/types";

type Props = {
  onCreated: (items: Feedback[]) => void;
};

export function FeedbackForm({ onCreated }: Props) {
  const [name, setName] = useState("");
  const [missLevel, setMissLevel] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [message, setMessage] = useState("");
  const [missMost, setMissMost] = useState("");
  const [vibe, setVibe] = useState<WorkVibe | null>(null);
  const [workAgain, setWorkAgain] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!missLevel || !vibe || !workAgain) {
      setError("เลือกให้ครบทุกระดับก่อนส่งนะ");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          missLevel,
          message,
          missMost,
          vibe,
          workAgain,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "ส่งไม่สำเร็จ");
      onCreated(data.items);
      setDone(true);
      setName("");
      setMissLevel(null);
      setMessage("");
      setMissMost("");
      setVibe(null);
      setWorkAgain(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ส่งไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="write" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.3em] text-amber-300/70 uppercase">
            drop a note
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[#f4f1ec] sm:text-5xl">
            เขียนถึง Natakorn
          </h2>
          <p className="mt-3 max-w-lg text-zinc-400">
            ใส่ชื่อหรือไม่ใส่ก็ได้ — สบายๆ
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12 border border-teal-400/25 bg-teal-400/5 p-8 backdrop-blur-sm"
            >
              <p className="font-[family-name:var(--font-display)] text-3xl text-teal-300">
                ส่งแล้ว
              </p>
              <p className="mt-2 text-zinc-400">
                ขึ้นกำแพงด้านล่างแล้ว เลื่อนไปอ่านกันได้เลย
              </p>
              <button
                type="button"
                className="btn-ghost mt-6"
                onClick={() => setDone(false)}
              >
                เขียนอีกอัน
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 space-y-10"
            >
              <label className="block">
                <span className="field-label">ชื่อ (ไม่บังคับ)</span>
                <input
                  className="field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="จะใส่หรือไม่ใส่ก็ได้"
                  maxLength={80}
                />
              </label>

              <fieldset>
                <legend className="field-label">
                  ขาดผมไปจะลำบากระดับไหน?
                </legend>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {MISS_LEVELS.map((item) => {
                    const active = missLevel === item.level;
                    return (
                      <button
                        key={item.level}
                        type="button"
                        onClick={() => setMissLevel(item.level)}
                        className={`level-btn ${active ? "level-btn-active" : ""}`}
                        style={
                          active
                            ? {
                                borderColor: item.color,
                                boxShadow: `0 0 28px ${item.color}33`,
                              }
                            : undefined
                        }
                      >
                        <span
                          className="font-[family-name:var(--font-mono)] text-2xl font-semibold"
                          style={{ color: active ? item.color : undefined }}
                        >
                          {item.level}
                        </span>
                        <span className="mt-1 text-sm font-medium text-[#f4f1ec]">
                          {item.label}
                        </span>
                        <span className="mt-0.5 text-[11px] text-zinc-500">
                          {item.hint}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="field-label">Vibe ตอนทำงานด้วยกัน</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {WORK_VIBES.map((item) => {
                    const active = vibe === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setVibe(item.id)}
                        className={`chip ${active ? "chip-active" : ""}`}
                      >
                        <span>{item.label}</span>
                        <span className="text-zinc-500">{item.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className="block">
                <span className="field-label">สิ่งที่จะคิดถึงที่สุด</span>
                <input
                  className="field"
                  value={missMost}
                  onChange={(e) => setMissMost(e.target.value)}
                  placeholder="เช่น เสียงหัวเราะ / โค้ดรีวิวคมๆ / กาแฟตอนเช้า"
                  maxLength={200}
                  required
                />
              </label>

              <label className="block">
                <span className="field-label">ข้อความ</span>
                <textarea
                  className="field min-h-36 resize-y"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="เล่าได้เต็มที่ — คำชม คำแซว หรือคำอำลา"
                  maxLength={2000}
                  required
                />
              </label>

              <fieldset>
                <legend className="field-label">อยากร่วมงานอีกไหม?</legend>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {WORK_AGAIN.map((item) => {
                    const active = workAgain === item.level;
                    return (
                      <button
                        key={item.level}
                        type="button"
                        onClick={() => setWorkAgain(item.level)}
                        className={`level-btn py-4 ${active ? "level-btn-active" : ""}`}
                      >
                        <span className="font-[family-name:var(--font-mono)] text-lg">
                          {item.level}
                        </span>
                        <span className="mt-1 text-[11px] text-zinc-400">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {error && (
                <p className="text-sm text-rose-400" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="btn-primary" disabled={busy}>
                {busy ? "กำลังส่ง..." : "ส่ง Feedback"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
