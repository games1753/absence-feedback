"use client";

import { motion } from "framer-motion";

export type DonutSlice = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  title: string;
  subtitle?: string;
  slices: DonutSlice[];
  centerLabel?: string;
  centerValue?: string;
};

const SIZE = 200;
const STROKE = 28;
const RADIUS = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * RADIUS;

export function DonutChart({
  title,
  subtitle,
  slices,
  centerLabel,
  centerValue,
}: Props) {
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  let offset = 0;

  const segments =
    total === 0
      ? [
          {
            label: "ยังไม่มีข้อมูล",
            color: "rgba(255,255,255,0.08)",
            length: CIRC,
            dashOffset: 0,
            value: 0,
            pct: 0,
          },
        ]
      : slices.map((slice) => {
          const length = (slice.value / total) * CIRC;
          const seg = {
            label: slice.label,
            color: slice.color,
            length,
            dashOffset: -offset,
            value: slice.value,
            pct: Math.round((slice.value / total) * 100),
          };
          offset += length;
          return seg;
        });

  return (
    <div className="stat-block flex flex-col">
      <div>
        <p className="text-xs tracking-widest text-zinc-500 uppercase">{title}</p>
        {subtitle && <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>}
      </div>

      <div className="mt-6 flex flex-1 flex-col items-center gap-6 sm:flex-row sm:items-center">
        <div className="relative shrink-0">
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="-rotate-90"
            aria-hidden
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={STROKE}
            />
            {segments.map((seg, i) => (
              <motion.circle
                key={`${seg.label}-${i}`}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke={seg.color}
                strokeWidth={STROKE}
                strokeLinecap="butt"
                strokeDasharray={`${seg.length} ${CIRC - seg.length}`}
                strokeDashoffset={seg.dashOffset}
                initial={{ strokeDasharray: `0 ${CIRC}` }}
                whileInView={{
                  strokeDasharray: `${seg.length} ${CIRC - seg.length}`,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[#f4f1ec]">
              {centerValue ?? (total ? String(total) : "0")}
            </p>
            <p className="mt-0.5 text-[11px] tracking-wide text-zinc-500 uppercase">
              {centerLabel ?? "รวม"}
            </p>
          </div>
        </div>

        <ul className="w-full space-y-2.5">
          {slices.map((slice) => {
            const pct = total ? Math.round((slice.value / total) * 100) : 0;
            return (
              <li
                key={slice.label}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2 text-zinc-300">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: slice.color }}
                  />
                  <span className="truncate">{slice.label}</span>
                </span>
                <span className="font-[family-name:var(--font-mono)] shrink-0 text-xs text-zinc-500">
                  {slice.value} · {pct}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
