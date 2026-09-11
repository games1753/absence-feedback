"use client";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  desc?: string;
};

export function SectionHead({ index, eyebrow, title, desc }: Props) {
  return (
    <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.28em] text-teal-300/70 uppercase">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-white/15" />
          <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-zinc-600">
            {index}
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-[#f4f1ec] sm:text-5xl">
          {title}
        </h2>
        {desc && <p className="mt-3 max-w-lg text-zinc-400">{desc}</p>}
      </div>
    </div>
  );
}
