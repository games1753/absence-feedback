export type WorkVibe = "fire" | "flow" | "chill" | "sharp" | "rare";

export type Feedback = {
  id: string;
  name: string | null;
  missLevel: 1 | 2 | 3 | 4 | 5;
  message: string;
  missMost: string;
  vibe: WorkVibe;
  workAgain: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
};

export type FeedbackInput = {
  name?: string;
  missLevel: number;
  message: string;
  missMost: string;
  vibe: WorkVibe;
  workAgain: number;
};

export type FeedbackSummary = {
  total: number;
  avgMissLevel: number;
  avgWorkAgain: number;
  missDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
  vibeCounts: Record<WorkVibe, number>;
};
