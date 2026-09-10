# ABSENT

เว็บรับ feedback จากคนในทีม ธีมดาร์ค — ถามว่าถ้าขาดไปจะลำบากระดับไหน (5 ระดับ) พร้อมข้อความและ summary ที่ทุกคนดูได้

## Features

- ชื่อ (ไม่บังคับ)
- ระดับความลำบาก 1–5
- Vibe ตอนทำงานด้วยกัน
- สิ่งที่จะคิดถึง + ข้อความ
- คะแนนอยากร่วมงานอีก
- กำแพง feedback เปิดให้ทุกคนอ่าน
- Summary ค่าเฉลี่ย + การกระจาย
- ข้อมูลเก็บถาวรใน `data/feedback.json` (ผ่าน GitHub API บน production)

## Dev

```bash
npm install
npm run dev
```

## Env (production)

```
GITHUB_TOKEN=...
GITHUB_REPO=owner/repo
GITHUB_BRANCH=main
```
