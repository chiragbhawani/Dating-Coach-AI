"use client";

import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { AICoachExperience } from "@/components/AICoachExperience";

type PlanType = "free" | "pro" | "premium";

type ClerkPlanUser = {
  publicMetadata?: Record<string, unknown>;
  privateMetadata?: Record<string, unknown>;
} | null | undefined;

function getPlanType(user: ClerkPlanUser): PlanType {
  // TODO: Check subscription plan from Clerk metadata or a database.
  // Free = 5 AI messages per day
  // Pro/Premium = allow unlimited AI access
  const plan =
    user?.publicMetadata?.plan ??
    user?.publicMetadata?.subscriptionPlan ??
    user?.privateMetadata?.plan;

  if (plan === "pro" || plan === "premium") {
    return plan;
  }

  return "free";
}

export function AIDatingCoach() {
  const { isLoaded, isSignedIn, user } = useUser();
  const planType = getPlanType(user);
  const hasPaidPlan = planType === "pro" || planType === "premium";

  return (
    <section
      id="ai-coach"
      className="relative overflow-hidden bg-ink py-18 text-white sm:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(243,185,95,0.22),transparent_30%),radial-gradient(circle_at_88%_72%,rgba(215,97,123,0.18),transparent_34%),linear-gradient(135deg,rgba(47,111,100,0.38),transparent_46%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="float-in">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-honey">
            Premium AI guidance
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">
            AI Dating Coach
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/72">
            Get thoughtful, personalized guidance for conversations,
            confidence, relationships, and dating situations. Receive practical
            advice designed to help you communicate clearly, respect
            boundaries, and make better decisions.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/58">
            Start with 5 free coaching messages per day. Upgrade when you want
            unlimited support for texts, first dates, confidence, and
            relationship decisions.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {!isLoaded ? (
              <button className="rounded-[8px] bg-white/18 px-5 py-3 font-semibold text-white">
                Loading account...
              </button>
            ) : null}

            {isLoaded && !isSignedIn ? (
              <SignInButton mode="modal">
                <button className="inline-flex items-center gap-2 rounded-[8px] bg-honey px-5 py-3 font-semibold text-ink shadow-soft transition hover:bg-white">
                  Sign In to Access AI Coach
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </SignInButton>
            ) : null}

            {isLoaded && isSignedIn && !hasPaidPlan ? (
              <Link
                href="/coach"
                className="inline-flex items-center gap-2 rounded-[8px] bg-honey px-5 py-3 font-semibold text-ink shadow-soft transition hover:bg-white"
              >
                Try AI Coach Free
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}

            {isLoaded && isSignedIn && hasPaidPlan ? (
              <Link
                href="/coach"
                className="inline-flex items-center gap-2 rounded-[8px] bg-honey px-5 py-3 font-semibold text-ink shadow-soft transition hover:bg-white"
              >
                Open AI Coach
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}

            <Link
              href="#plans"
              className="inline-flex items-center gap-2 rounded-[8px] border border-white/18 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              View Plans
            </Link>
          </div>

          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            <div className="rounded-[8px] border border-white/12 bg-white/[0.07] p-4">
              <ShieldCheck className="h-5 w-5 text-honey" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold">
                Respectful by design
              </p>
              <p className="mt-2 text-sm leading-6 text-white/62">
                Guidance favors honesty, consent, boundaries, and calm
                communication.
              </p>
            </div>
            <div className="rounded-[8px] border border-white/12 bg-white/[0.07] p-4">
              <Sparkles className="h-5 w-5 text-honey" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold">
                Built for real moments
              </p>
              <p className="mt-2 text-sm leading-6 text-white/62">
                Get examples, follow-up questions, and practical next steps
                without judgment.
              </p>
            </div>
          </div>
        </div>

        <AICoachExperience compact />
      </div>
    </section>
  );
}
