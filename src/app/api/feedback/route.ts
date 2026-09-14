import { NextResponse } from "next/server";
import { addFeedback, listFeedback } from "@/lib/storage";
import type { WorkVibe } from "@/lib/types";

const VIBES: WorkVibe[] = ["fire", "flow", "chill", "sharp", "rare"];

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await listFeedback();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const missLevel = Number(body.missLevel);
    const workAgain = Number(body.workAgain);
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const missMost = typeof body.missMost === "string" ? body.missMost.trim() : "";
    const vibe = body.vibe as WorkVibe;
    const name = typeof body.name === "string" ? body.name : undefined;

    if (![1, 2, 3, 4, 5].includes(missLevel)) {
      return NextResponse.json({ error: "เลือกระดับ 1–5 ก่อนนะ" }, { status: 400 });
    }
    if (![1, 2, 3, 4, 5].includes(workAgain)) {
      return NextResponse.json({ error: "เลือกคะแนนทำงานด้วยอีก" }, { status: 400 });
    }
    if (!VIBES.includes(vibe)) {
      return NextResponse.json({ error: "เลือก vibe ก่อนนะ" }, { status: 400 });
    }
    if (message.length < 3) {
      return NextResponse.json({ error: "เขียนข้อความสักหน่อยนะ" }, { status: 400 });
    }
    if (missMost.length < 2) {
      return NextResponse.json({ error: "บอกสิ่งที่จำได้นิดหน่อย" }, { status: 400 });
    }

    const entry = await addFeedback({
      name,
      missLevel: missLevel as 1 | 2 | 3 | 4 | 5,
      message,
      missMost,
      vibe,
      workAgain: workAgain as 1 | 2 | 3 | 4 | 5,
    });

    const data = await listFeedback();
    return NextResponse.json({ entry, ...data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
