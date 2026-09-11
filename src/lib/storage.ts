import { promises as fs } from "fs";
import path from "path";
import type { Feedback, FeedbackSummary, WorkVibe } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "feedback.json");
const REMOTE_PATH = "data/feedback.json";

type StoredPayload = { items: Feedback[] };

function emptyPayload(): StoredPayload {
  return { items: [] };
}

function summarize(items: Feedback[]): FeedbackSummary {
  const missDistribution: FeedbackSummary["missDistribution"] = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  const workAgainDistribution: FeedbackSummary["workAgainDistribution"] = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  const vibeCounts: FeedbackSummary["vibeCounts"] = {
    fire: 0,
    flow: 0,
    chill: 0,
    sharp: 0,
    rare: 0,
  };

  if (items.length === 0) {
    return {
      total: 0,
      avgMissLevel: 0,
      avgWorkAgain: 0,
      missDistribution,
      workAgainDistribution,
      vibeCounts,
    };
  }

  let missSum = 0;
  let workSum = 0;
  for (const item of items) {
    missSum += item.missLevel;
    workSum += item.workAgain;
    missDistribution[item.missLevel] += 1;
    workAgainDistribution[item.workAgain] += 1;
    vibeCounts[item.vibe] += 1;
  }

  return {
    total: items.length,
    avgMissLevel: Math.round((missSum / items.length) * 10) / 10,
    avgWorkAgain: Math.round((workSum / items.length) * 10) / 10,
    missDistribution,
    workAgainDistribution,
    vibeCounts,
  };
}

async function readLocal(): Promise<StoredPayload> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    const parsed = JSON.parse(raw) as StoredPayload;
    return { items: Array.isArray(parsed.items) ? parsed.items : [] };
  } catch {
    return emptyPayload();
  }
}

async function writeLocal(payload: StoredPayload): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(payload, null, 2), "utf8");
}

function githubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token || !repo) return null;
  return { token, repo, branch };
}

async function readGitHub(): Promise<{
  payload: StoredPayload;
  sha: string | null;
}> {
  const cfg = githubConfig();
  if (!cfg) {
    return { payload: await readLocal(), sha: null };
  }

  const res = await fetch(
    `https://api.github.com/repos/${cfg.repo}/contents/${REMOTE_PATH}?ref=${cfg.branch}`,
    {
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    },
  );

  if (res.status === 404) {
    return { payload: emptyPayload(), sha: null };
  }

  if (!res.ok) {
    throw new Error(`GitHub read failed: ${res.status}`);
  }

  const body = (await res.json()) as { content: string; encoding: string; sha: string };
  const decoded = Buffer.from(body.content, "base64").toString("utf8");
  const parsed = JSON.parse(decoded) as StoredPayload;
  return {
    payload: { items: Array.isArray(parsed.items) ? parsed.items : [] },
    sha: body.sha,
  };
}

async function writeGitHub(
  payload: StoredPayload,
  sha: string | null,
): Promise<void> {
  const cfg = githubConfig();
  if (!cfg) {
    await writeLocal(payload);
    return;
  }

  const content = Buffer.from(JSON.stringify(payload, null, 2), "utf8").toString(
    "base64",
  );

  const res = await fetch(
    `https://api.github.com/repos/${cfg.repo}/contents/${REMOTE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `feedback: add entry (${payload.items.length} total)`,
        content,
        branch: cfg.branch,
        ...(sha ? { sha } : {}),
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub write failed: ${res.status} ${text}`);
  }
}

export async function listFeedback(): Promise<{
  items: Feedback[];
  summary: FeedbackSummary;
}> {
  const { payload } = await readGitHub();
  const items = [...payload.items].sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
  );
  return { items, summary: summarize(items) };
}

export async function addFeedback(input: {
  name?: string;
  missLevel: 1 | 2 | 3 | 4 | 5;
  message: string;
  missMost: string;
  vibe: WorkVibe;
  workAgain: 1 | 2 | 3 | 4 | 5;
}): Promise<Feedback> {
  const entry: Feedback = {
    id: crypto.randomUUID(),
    name: input.name?.trim() ? input.name.trim().slice(0, 80) : null,
    missLevel: input.missLevel,
    message: input.message.trim().slice(0, 2000),
    missMost: input.missMost.trim().slice(0, 200),
    vibe: input.vibe,
    workAgain: input.workAgain,
    createdAt: new Date().toISOString(),
  };

  // Retry a few times for concurrent GitHub SHA conflicts
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const { payload, sha } = await readGitHub();
      payload.items.push(entry);
      await writeGitHub(payload, sha);
      // Keep a local mirror in development / when possible
      try {
        await writeLocal(payload);
      } catch {
        /* ignore on read-only filesystems */
      }
      return entry;
    } catch (err) {
      lastError = err;
      await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Failed to save");
}
