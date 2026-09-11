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
import { CinemaMarquee } from "@/components/CinemaMarquee";
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

      <header className="fixed top-4 right-0 left-0 z-40 px-4 sm:px-6">
        <div className="glass-nav mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-5">
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

        <CinemaMarquee />

        <Reveal>
          <FeedbackForm onCreated={onCreated} />
        </Reveal>

        {!loading && (
          <Reveal delay={0.05}>
            <ParallaxSection speed={24}>
              <SummaryPanel summary={summary} />
            </ParallaxSection>
          </Reveal>
        )}

        {!loading && (
          <Reveal delay={0.08}>
            <ParallaxSection speed={30}>
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

      <footer className="border-t border-white/5 px-5 py-12 text-center sm:px-8">
        <p className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-white/15">
          FeedBack Natakorn
        </p>
        <p className="mt-3 text-xs tracking-wide text-zinc-600">
          จากทีม ถึง Natakorn
        </p>
      </footer>
    </SmoothScroll>
  );
}
