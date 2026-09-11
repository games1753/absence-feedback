"use client";

import { useCallback, useEffect, useState } from "react";
import { CosmicBackground } from "@/components/CosmicBackground";
import { Hero } from "@/components/Hero";
import { FeedbackForm } from "@/components/FeedbackForm";
import { FeedbackWall, SummaryPanel } from "@/components/FeedbackWall";
import { ParallaxSection } from "@/components/ParallaxSection";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { IntroOverlay } from "@/components/IntroOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Reveal } from "@/components/Reveal";
import type { Feedback, FeedbackSummary } from "@/lib/types";

const emptySummary: FeedbackSummary = {
  total: 0,
  avgMissLevel: 0,
  avgWorkAgain: 0,
  missDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  workAgainDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
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

  const onCreated = (_next?: Feedback[]) => {
    load();
  };

  return (
    <SmoothScroll>
      <IntroOverlay />
      <CustomCursor />
      <ScrollProgress />
      <CosmicBackground />

      <header className="fixed top-0 right-0 left-0 z-40 border-b border-white/5 bg-[#050507]/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-[family-name:var(--font-display)] text-sm tracking-tight text-[#f4f1ec] sm:text-lg"
            data-cursor="hover"
          >
            FeedBack Natakorn
          </button>
          <nav className="flex items-center gap-1 text-sm text-zinc-400 sm:gap-2">
            <button type="button" className="nav-link" onClick={() => scrollToId("write")}>
              เขียน
            </button>
            <button type="button" className="nav-link" onClick={() => scrollToId("summary")}>
              Summary
            </button>
            <button type="button" className="nav-link" onClick={() => scrollToId("wall")}>
              ทั้งหมด
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Hero
          onWrite={() => scrollToId("write")}
          onWall={() => scrollToId("wall")}
        />

        <div className="marquee-wrap border-y border-white/5 py-3" aria-hidden>
          <div className="marquee-track">
            {Array.from({ length: 2 }).map((_, copy) => (
              <p key={copy} className="marquee-text">
                FeedBack Natakorn · เขียนได้ แซวได้ ชมได้ · ดู summary ได้ · เปิดอ่านได้ ·{" "}
              </p>
            ))}
          </div>
        </div>

        <Reveal>
          <FeedbackForm onCreated={onCreated} />
        </Reveal>

        {!loading && (
          <Reveal delay={0.05}>
            <ParallaxSection speed={28}>
              <SummaryPanel summary={summary} />
            </ParallaxSection>
          </Reveal>
        )}

        {!loading && (
          <Reveal delay={0.08}>
            <ParallaxSection speed={36}>
              <FeedbackWall items={items} />
            </ParallaxSection>
          </Reveal>
        )}

        {loading && (
          <p className="px-5 py-20 text-center text-zinc-500 sm:px-8">
            กำลังโหลด...
          </p>
        )}
      </main>

      <footer className="border-t border-white/5 px-5 py-10 text-center text-xs text-zinc-600 sm:px-8">
        FeedBack Natakorn · จากทีม ถึง Natakorn
      </footer>
    </SmoothScroll>
  );
}
