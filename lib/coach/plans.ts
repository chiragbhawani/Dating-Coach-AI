import { currentUser } from "@clerk/nextjs/server";

export type PlanType = "free" | "pro" | "premium";

export const FREE_DAILY_MESSAGE_LIMIT = 5;

export function normalizePlan(plan: unknown): PlanType {
  if (plan === "pro" || plan === "premium") {
    return plan;
  }

  return "free";
}

export async function getCurrentUserPlan(): Promise<PlanType> {
  // TODO: Replace temporary plan logic with Clerk metadata from billing.
  // A database-backed subscription table can also be used here later.
  const user = await currentUser();
  const metadataPlan =
    user?.publicMetadata?.plan ??
    user?.publicMetadata?.subscriptionPlan ??
    user?.privateMetadata?.plan;

  return normalizePlan(metadataPlan);
}

export function hasUnlimitedCoachMessages(planType: PlanType) {
  return planType === "pro" || planType === "premium";
}
