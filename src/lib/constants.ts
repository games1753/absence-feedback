import type { WorkVibe } from "./types";

export const MISS_LEVELS = [
  {
    level: 1 as const,
    label: "พอไหว",
    hint: "ปรับตัวได้",
    color: "#5eead4",
  },
  {
    level: 2 as const,
    label: "เริ่มว่าง",
    hint: "รู้สึกขาดไป",
    color: "#67e8f9",
  },
  {
    level: 3 as const,
    label: "ลำบากชัด",
    hint: "งานสะดุด",
    color: "#fbbf24",
  },
  {
    level: 4 as const,
    label: "โกลาหล",
    hint: "ทีมปั่นป่วน",
    color: "#fb923c",
  },
  {
    level: 5 as const,
    label: "พังทั้งแผนก",
    hint: "ขาดแล้วพัง",
    color: "#f43f5e",
  },
];

export const WORK_VIBES: {
  id: WorkVibe;
  label: string;
  tag: string;
  color: string;
}[] = [
  { id: "fire", label: "ไฟลุก", tag: "พลังเต็ม", color: "#fb7185" },
  { id: "flow", label: "ลื่นไหล", tag: "ซิงค์ดี", color: "#5eead4" },
  { id: "chill", label: "ชิลๆ", tag: "บรรยากาศดี", color: "#67e8f9" },
  { id: "sharp", label: "คมเป๊ะ", tag: "คุณภาพสูง", color: "#fbbf24" },
  { id: "rare", label: "หายาก", tag: "หาแทนยาก", color: "#c4b5fd" },
];

export const WORK_AGAIN = [
  { level: 1 as const, label: "ไม่แน่", color: "#64748b" },
  { level: 2 as const, label: "ก็ได้", color: "#67e8f9" },
  { level: 3 as const, label: "โอเค", color: "#5eead4" },
  { level: 4 as const, label: "อยาก", color: "#fbbf24" },
  { level: 5 as const, label: "ต้องได้", color: "#fb923c" },
];
