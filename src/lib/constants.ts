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
}[] = [
  { id: "fire", label: "ไฟลุก", tag: "พลังเต็ม" },
  { id: "flow", label: "ลื่นไหล", tag: "ซิงค์ดี" },
  { id: "chill", label: "ชิลๆ", tag: "บรรยากาศดี" },
  { id: "sharp", label: "คมเป๊ะ", tag: "คุณภาพสูง" },
  { id: "rare", label: "หายาก", tag: "หาแทนยาก" },
];

export const WORK_AGAIN = [
  { level: 1 as const, label: "ไม่แน่" },
  { level: 2 as const, label: "ก็ได้" },
  { level: 3 as const, label: "โอเค" },
  { level: 4 as const, label: "อยาก" },
  { level: 5 as const, label: "ต้องได้" },
];
