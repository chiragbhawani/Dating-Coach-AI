"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";
import {
  Bot,
  Crown,
  Lightbulb,
  LockKeyhole,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles
} from "lucide-react";

type PlanType = "free" | "pro" | "premium";

type CoachMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type CoachApiPayload = {
  reply?: string;
  error?: string;
  planType?: PlanType;
  usedMessages?: number;
  remainingMessages?: number | null;
  freeDailyMessageLimit?: number;
  hasUnlimitedMessages?: boolean;
};

type ClerkPlanUser = {
  id?: string;
  publicMetadata?: Record<string, unknown>;
  privateMetadata?: Record<string, unknown>;
} | null | undefined;

const FREE_DAILY_MESSAGE_LIMIT = 5;

const suggestedPrompts = [
  "How do I start a conversation with someone I like?",
  "How do I become more confident?",
  "What should I do if I got left on read?",
  "How do I handle rejection?"
];

const starterMessages: CoachMessage[] = [
  {
    id: "starter-user",
    role: "user",
    content:
      "I like someone, but I don’t want to sound too intense. How should I ask them out?"
  },
  {
    id: "starter-ai",
    role: "assistant",
    content:
      "Keep it warm, clear, and low-pressure: “I’ve really enjoyed talking with you. Would you like to grab coffee this weekend?” It shows interest while giving them room to answer honestly."
  },
  {
    id: "starter-user-2",
    role: "user",
    content: "What if they don’t reply right away?"
  },
  {
    id: "starter-ai-2",
    role: "assistant",
    content:
      "Give them space. A thoughtful follow-up later is okay, but confidence also means respecting timing and not chasing a response."
  }
];

function readPlanValue(user: ClerkPlanUser) {
  return (
    user?.publicMetadata?.plan ??
    user?.publicMetadata?.subscriptionPlan ??
    user?.privateMetadata?.plan
  );
}

function getPlanType(user: ClerkPlanUser): PlanType {
  // TODO: Replace temporary plan logic with Clerk metadata.
  // Free = 5 AI messages per day
  // Pro/Premium = allow unlimited AI access
  const plan = readPlanValue(user);

  if (plan === "pro" || plan === "premium") {
    return plan;
  }

  return "free";
}

function renderMessageContent(content: string) {
  return content.split(/\n{2,}/).map((paragraph) => {
    const lines = paragraph.split("\n");

    return (
      <p key={paragraph} className="mb-3 last:mb-0">
        {lines.map((line, index) => (
          <span key={`${line}-${index}`}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
    );
  });
}

export function AICoachExperience({ compact = false }: { compact?: boolean }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<CoachMessage[]>(starterMessages);
  const [usedMessages, setUsedMessages] = useState(0);
  const [remainingMessageCount, setRemainingMessageCount] = useState(
    FREE_DAILY_MESSAGE_LIMIT
  );
  const [serverPlanType, setServerPlanType] = useState<PlanType | null>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const planType = serverPlanType ?? getPlanType(user);
  const hasUnlimitedMessages = planType === "pro" || planType === "premium";
  const remainingMessages = hasUnlimitedMessages
    ? FREE_DAILY_MESSAGE_LIMIT
    : remainingMessageCount;
  const hasReachedFreeLimit = !hasUnlimitedMessages && remainingMessages === 0;
  const hasUserConversation = messages.length > starterMessages.length;
  const firstName = user?.firstName;

  const usageLabel = useMemo(() => {
    if (!isSignedIn) return "Sign in to access your coaching messages";
    if (hasUnlimitedMessages) return "Unlimited AI coaching messages";

    return `${remainingMessages} of ${FREE_DAILY_MESSAGE_LIMIT} free messages remaining`;
  }, [hasUnlimitedMessages, isSignedIn, remainingMessages]);

  useEffect(() => {
    let isMounted = true;

    if (!isSignedIn) {
      setUsedMessages(0);
      setRemainingMessageCount(FREE_DAILY_MESSAGE_LIMIT);
      setServerPlanType(null);
      setError("");
      return;
    }

    async function loadUsage() {
      try {
        const response = await fetch("/api/coach");
        const payload = (await response.json()) as CoachApiPayload;

        if (!isMounted) return;

        if (!response.ok) {
          setError(payload.error ?? "Unable to load coaching access.");
          return;
        }

        if (payload.planType) setServerPlanType(payload.planType);
        setUsedMessages(payload.usedMessages ?? 0);
        setRemainingMessageCount(
          payload.remainingMessages ?? FREE_DAILY_MESSAGE_LIMIT
        );
      } catch {
        if (isMounted) {
          setError("Unable to load coaching access.");
        }
      }
    }

    void loadUsage();

    return () => {
      isMounted = false;
    };
  }, [isSignedIn]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages.length]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = input.trim();

    if (!isSignedIn || !trimmed || hasReachedFreeLimit || isReplying) return;

    const timestamp = Date.now();
    const userMessage: CoachMessage = {
      id: `user-${timestamp}`,
      role: "user",
      content: trimmed
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsReplying(true);

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content
          }))
        })
      });
      const payload = (await response.json()) as CoachApiPayload;

      if (!response.ok || !payload.reply) {
        setError(payload.error ?? "The AI coach could not reply right now.");
        if (payload.usedMessages !== undefined) {
          setUsedMessages(payload.usedMessages);
        }
        if (payload.remainingMessages !== undefined) {
          setRemainingMessageCount(
            payload.remainingMessages ?? FREE_DAILY_MESSAGE_LIMIT
          );
        }
        if (payload.planType) setServerPlanType(payload.planType);
        return;
      }

      const assistantMessage: CoachMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: payload.reply
      };

      setMessages((current) => [...current, assistantMessage]);
      setUsedMessages(payload.usedMessages ?? usedMessages);
      setRemainingMessageCount(
        payload.remainingMessages ?? FREE_DAILY_MESSAGE_LIMIT
      );
      if (payload.planType) setServerPlanType(payload.planType);
    } catch {
      setError("The AI coach could not reply right now.");
    } finally {
      setIsReplying(false);
    }
  }

  function handleSuggestedPrompt(prompt: string) {
    if (!isSignedIn || hasReachedFreeLimit || isReplying) return;
    setInput(prompt);
  }

  // TODO: Persist future session history so returning users can resume prior coaching threads.
  // TODO: Add future coaching memory for user goals, communication preferences, and recurring situations.
  // TODO: Replace temporary subscription checks with production plan data when paid plans are implemented.

  return (
    <div className="rounded-[8px] border border-white/14 bg-white/[0.08] p-2 shadow-soft backdrop-blur sm:p-4">
      <div className="rounded-[8px] border border-ink/10 bg-[#fbfaf7] p-4 text-ink shadow-sm sm:p-5">
        <div className="flex flex-col justify-between gap-4 border-b border-ink/10 pb-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-sage text-white">
              <Bot className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold">AI Dating Coach</h3>
              <p className="text-sm text-ink/58">
                {isSignedIn && firstName
                  ? `Welcome back, ${firstName}. ${usageLabel}`
                  : usageLabel}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 rounded-[8px] bg-mist px-3 py-2 text-sm font-semibold text-ink">
              <ShieldCheck className="h-4 w-4 text-sage" aria-hidden="true" />
              Safety-first
            </div>
            <div className="inline-flex items-center gap-2 rounded-[8px] bg-honey/24 px-3 py-2 text-sm font-semibold text-ink">
              <Crown className="h-4 w-4" aria-hidden="true" />
              {planType.toUpperCase()}
            </div>
          </div>
        </div>

        {!isLoaded ? (
          <div className="mt-5 rounded-[8px] border border-ink/10 bg-white p-4 text-sm text-ink/64">
            Checking your account...
          </div>
        ) : null}

        {isLoaded && !isSignedIn ? (
          <div className="mt-5 rounded-[8px] border border-sage/20 bg-mist p-4">
            <div className="flex gap-3">
              <LockKeyhole
                className="mt-0.5 h-5 w-5 shrink-0 text-sage"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-ink">
                  Sign in to access AI coaching.
                </p>
                <p className="mt-1 text-sm leading-6 text-ink/66">
                  Free accounts include 5 coaching messages per day. Pro and
                  Premium members get unlimited AI coaching.
                </p>
              </div>
            </div>
            <SignInButton mode="modal">
              <button className="mt-4 rounded-[8px] bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-sage">
                Sign In to Access AI Coach
              </button>
            </SignInButton>
          </div>
        ) : null}

        <div
          ref={scrollRef}
          className={`${compact ? "h-80" : "h-[32rem]"} mt-5 space-y-3 overflow-y-auto pr-1 sm:space-y-4`}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`coach-message-in max-w-[92%] rounded-[8px] p-3 text-sm leading-6 shadow-sm sm:max-w-[86%] sm:p-4 ${
                message.role === "user"
                  ? "ml-auto bg-ink text-white"
                  : "border border-ink/10 bg-white text-ink/72"
              }`}
            >
              {renderMessageContent(message.content)}
            </div>
          ))}
          {isReplying ? (
            <div className="coach-message-in max-w-[88%] rounded-[8px] border border-ink/10 bg-white p-4 text-sm leading-6 text-ink/58 shadow-sm">
              <div className="flex items-center gap-2">
                <span>Thinking through a respectful response</span>
                <span className="typing-dot" />
                <span className="typing-dot [animation-delay:120ms]" />
                <span className="typing-dot [animation-delay:240ms]" />
              </div>
            </div>
          ) : null}
        </div>

        {isSignedIn && !hasUserConversation && !hasReachedFreeLimit ? (
          <div className="mt-5 rounded-[8px] border border-sage/20 bg-mist p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Lightbulb className="h-4 w-4 text-sage" aria-hidden="true" />
              Start with a coaching question
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="rounded-[8px] border border-ink/10 bg-white px-3 py-3 text-left text-sm leading-5 text-ink/72 transition hover:border-sage/30 hover:text-ink"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-[8px] border border-blush/25 bg-blush/10 p-3 text-sm font-medium leading-6 text-ink">
            {error}
          </div>
        ) : null}

        {isSignedIn && hasReachedFreeLimit ? (
          <div className="mt-4 rounded-[8px] border border-blush/25 bg-blush/10 p-3 text-sm font-medium leading-6 text-ink">
            You&apos;ve used today&apos;s free coaching messages. Upgrade to Pro
            for unlimited AI coaching.
            <Link href="/#plans" className="ml-1 font-semibold text-sage">
              View plans
            </Link>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-4 flex items-end gap-2">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={!isSignedIn || hasReachedFreeLimit || isReplying}
            placeholder={
              isSignedIn
                ? "Ask about a message, boundary, or dating situation..."
                : "Sign in to start your coaching session"
            }
            rows={compact ? 1 : 2}
            className="max-h-32 min-h-12 min-w-0 flex-1 resize-none rounded-[8px] border border-ink/12 bg-white px-4 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-ink/38 focus:border-sage focus:ring-2 focus:ring-sage/20 disabled:cursor-not-allowed disabled:bg-ink/5"
          />
          <button
            type="submit"
            disabled={
              !isSignedIn || !input.trim() || hasReachedFreeLimit || isReplying
            }
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-sage text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-ink/25"
            aria-label="Send coaching message"
          >
            <Send className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: MessageCircle,
              title: "Conversation help",
              text: "Practice texts, replies, and difficult topics."
            },
            {
              icon: ShieldCheck,
              title: "Boundaries",
              text: "Keep advice respectful, direct, and pressure-free."
            },
            {
              icon: Sparkles,
              title: "Confidence",
              text: "Make decisions with more calm and clarity."
            }
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[8px] border border-ink/10 bg-mist p-4"
              >
                <Icon className="h-5 w-5 text-sage" aria-hidden="true" />
                <h4 className="mt-3 text-sm font-semibold">{item.title}</h4>
                <p className="mt-2 text-xs leading-5 text-ink/62">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
