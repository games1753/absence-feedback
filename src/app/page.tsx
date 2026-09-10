"use client";

import { useCallback, useEffect, useState } from "react";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Hero } from "@/components/Hero";
import { FeedbackForm } from "@/components/FeedbackForm";
import { FeedbackWall, SummaryPanel } from "@/components/FeedbackWall";
import type { Feedback, FeedbackSummary } from "@/lib/types";

const emptySummary: FeedbackSummary = {
  total: 0,
  avgMissLevel: 0,
  avgWorkAgain: 0,
  missDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  vibeCounts: { fire: 0, flow: 0, chill: 0, sharp: 0, rare: 0 },
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [items, setItems] = useState<Feedback[]>([]);
  const [summary, setSummary] = useState<FeedbackSummary>(emptySummary);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/feedback", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        setItems(data.items);
        setSummary(data.summary);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onCreated = (next: Feedback[]) => {
    setItems(next);
    // refresh summary from server for accurate averages
    load();
  };

  return (
    <>
      <CosmicBackground />
      <header className="fixed top-0 right-0 left-0 z-40 border-b border-white/5 bg-[#050507]/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-[family-name:var(--font-display)] text-lg tracking-tight text-[#f4f1ec]"
          >
            ABSENT
          </button>
          <nav className="flex items-center gap-1 text-sm text-zinc-400 sm:gap-2">
            <button type="button" className="nav-link" onClick={() => scrollToId("write")}>
              เขียน
            </button>
            <button type="button" className="nav-link" onClick={() => scrollToId("summary")}>
              Summary
            </button>
            <button type="button" className="nav-link" onClick={() => scrollToId("wall")}>
              กำแพง
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Hero
          onWrite={() => scrollToId("write")}
          onWall={() => scrollToId("wall")}
        />
        <FeedbackForm onCreated={onCreated} />
        {!loading && <SummaryPanel summary={summary} />}
        {!loading && <FeedbackWall items={items} />}
        {loading && (
          <p className="px-5 py-20 text-center text-zinc-500 sm:px-8">
            กำลังโหลด archive...
          </p>
        )}
      </main>

      <footer className="border-t border-white/5 px-5 py-10 text-center text-xs text-zinc-600 sm:px-8">
        ABSENT · feedback archive · ข้อมูลถูกเก็บถาวรให้อ่านได้ตลอดไป
      </footer>
    </>
  );
}
