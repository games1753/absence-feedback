# FeedBack Natakorn

เว็บรับ feedback จากทีมถึง Natakorn ธีมดาร์ค มี summary และกำแพงที่ทุกคนอ่านได้

- **Live:** https://absence-feedback.vercel.app
- **GitHub:** https://github.com/games1753/absence-feedback

## Features

- ชื่อ (ไม่บังคับ)
- ระดับความลำบาก 1–5
- Vibe ตอนทำงานด้วยกัน
- สิ่งที่จะคิดถึง + ข้อความ
- คะแนนอยากร่วมงานอีก
- กำแพง feedback เปิดให้ทุกคนอ่าน
- Summary ค่าเฉลี่ย + การกระจาย
- ข้อมูลเก็บใน `data/feedback.json` บน GitHub

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
