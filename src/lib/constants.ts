import type { WorkVibe } from "./types";

export const MISS_LEVELS = [
  {
    level: 1 as const,
    label: "โล่งเลย",
    hint: "ไม่ได้ขาด",
    color: "#5eead4",
  },
  {
    level: 2 as const,
    label: "ปกติ",
    hint: "วันธรรมดา",
    color: "#67e8f9",
  },
  {
    level: 3 as const,
    label: "งงแป๊บ",
    hint: "เงียบไปนิด",
    color: "#fbbf24",
  },
  {
    level: 4 as const,
    label: "หาคนแซว",
    hint: "โต๊ะว่างๆ",
    color: "#fb923c",
  },
  {
    level: 5 as const,
    label: "เงียบแปลก",
    hint: "ใครสักคนหาย",
    color: "#f43f5e",
  },
];

export const WORK_VIBES: {
  id: WorkVibe;
  label: string;
  tag: string;
  color: string;
}[] = [
  { id: "fire", label: "วุ่นวาย", tag: "เสียงดัง", color: "#fb7185" },
  { id: "flow", label: "พอไปได้", tag: "ไม่พัง", color: "#5eead4" },
  { id: "chill", label: "ชิลเกิน", tag: "ง่วงด้วย", color: "#67e8f9" },
  { id: "sharp", label: "จุกๆ", tag: "พูดตรง", color: "#fbbf24" },
  { id: "rare", label: "งงดี", tag: "มายังไง", color: "#c4b5fd" },
];

export const WORK_AGAIN = [
  { level: 1 as const, label: "ไม่เอา", color: "#64748b" },
  { level: 2 as const, label: "ถ้าจำเป็น", color: "#67e8f9" },
  { level: 3 as const, label: "ก็ได้", color: "#5eead4" },
  { level: 4 as const, label: "โอเคอยู่", color: "#fbbf24" },
  { level: 5 as const, label: "ได้อีก", color: "#fb923c" },
];
