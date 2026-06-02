import {
  FREE_DAILY_MESSAGE_LIMIT,
  PlanType,
  hasUnlimitedCoachMessages
} from "@/lib/coach/plans";

export type UsageRecord = {
  date: string;
  used: number;
};

export type CoachUsagePayload = {
  planType: PlanType;
  usedMessages: number;
  remainingMessages: number | null;
  freeDailyMessageLimit: number;
  hasUnlimitedMessages: boolean;
};

export interface CoachUsageStore {
  getDailyUsage(userId: string): Promise<UsageRecord>;
  incrementDailyUsage(userId: string): Promise<UsageRecord>;
}

type CoachUsageGlobal = typeof globalThis & {
  __datingCoachUsageStore?: Map<string, UsageRecord>;
};

function getTodayKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}

class MemoryCoachUsageStore implements CoachUsageStore {
  private records: Map<string, UsageRecord>;

  constructor() {
    const globalStore = globalThis as CoachUsageGlobal;
    globalStore.__datingCoachUsageStore ??= new Map<string, UsageRecord>();
    this.records = globalStore.__datingCoachUsageStore;
  }

  async getDailyUsage(userId: string) {
    const today = getTodayKey();
    const stored = this.records.get(userId);

    if (!stored || stored.date !== today) {
      const freshUsage = { date: today, used: 0 };
      this.records.set(userId, freshUsage);
      return freshUsage;
    }

    return stored;
  }

  async incrementDailyUsage(userId: string) {
    const usage = await this.getDailyUsage(userId);
    const nextUsage = {
      date: getTodayKey(),
      used: Math.min(usage.used + 1, FREE_DAILY_MESSAGE_LIMIT)
    };

    this.records.set(userId, nextUsage);
    return nextUsage;
  }
}

export const coachUsageStore: CoachUsageStore = new MemoryCoachUsageStore();

export function createUsagePayload(
  planType: PlanType,
  usedMessages: number
): CoachUsagePayload {
  const hasUnlimitedMessages = hasUnlimitedCoachMessages(planType);
  const remainingMessages = hasUnlimitedMessages
    ? null
    : Math.max(FREE_DAILY_MESSAGE_LIMIT - usedMessages, 0);

  return {
    planType,
    usedMessages,
    remainingMessages,
    freeDailyMessageLimit: FREE_DAILY_MESSAGE_LIMIT,
    hasUnlimitedMessages
  };
}

// TODO: Replace temporary limits with database-backed usage tracking.
// Supabase, PostgreSQL, Neon, or Clerk metadata can implement CoachUsageStore
// without changing the API route or chat UI.
