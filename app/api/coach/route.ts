import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { saveMessage } from "@/lib/chat-memory";
import { DATING_COACH_SYSTEM_PROMPT } from "@/lib/coach/coach-prompt";
import {
  FREE_DAILY_MESSAGE_LIMIT,
  getCurrentUserPlan,
  hasUnlimitedCoachMessages
} from "@/lib/coach/plans";
import { formatCoachReply } from "@/lib/coach/response-format";
import {
  coachUsageStore,
  createUsagePayload
} from "@/lib/coach/usage-store";

type CoachRole = "user" | "assistant";

type CoachMessage = {
  role: CoachRole;
  content: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
    finishReason?: string;
  }>;
  error?: {
    message?: string;
  };
};

function toGeminiContents(messages: CoachMessage[]) {
  return messages.slice(-12).map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }]
  }));
}

function extractGeminiText(payload: GeminiResponse) {
  return (
    payload.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join("\n")
      .trim() ?? ""
  );
}

function getFinishReason(payload: GeminiResponse) {
  return payload.candidates?.[0]?.finishReason;
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function callGemini(
  messages: CoachMessage[],
  apiKey: string,
  model: string
) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: DATING_COACH_SYSTEM_PROMPT }]
        },
        contents: toGeminiContents(messages),
        generationConfig: {
          temperature: 0.74,
          topP: 0.9,
          maxOutputTokens: 1400
        }
      })
    }
  );
  const payload = (await response.json()) as GeminiResponse;

  return { response, payload };
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return errorResponse("Sign in to access AI coaching.", 401);
  }

  const planType = await getCurrentUserPlan();
  const usage = await coachUsageStore.getDailyUsage(userId);

  return NextResponse.json(createUsagePayload(planType, usage.used));
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return errorResponse("Sign in to access AI coaching.", 401);
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return errorResponse(
      "Gemini API is not configured. Add GEMINI_API_KEY to .env.local.",
      503
    );
  }

  const planType = await getCurrentUserPlan();
  const usage = await coachUsageStore.getDailyUsage(userId);
  const hasUnlimitedMessages = hasUnlimitedCoachMessages(planType);

  if (!hasUnlimitedMessages && usage.used >= FREE_DAILY_MESSAGE_LIMIT) {
    return NextResponse.json(
      {
        error:
          "You've used today's free coaching messages. Upgrade to Pro for unlimited AI coaching.",
        ...createUsagePayload(planType, usage.used)
      },
      { status: 429 }
    );
  }

  const body = (await request.json()) as { messages?: CoachMessage[] };
  const messages =
    body.messages?.filter(
      (message) =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0
    ) ?? [];

    const latestUserMessage = messages[messages.length - 1];

if (latestUserMessage?.role === "user") {
  await saveMessage(
    userId,
    "user",
    latestUserMessage.content
  );
}

  if (messages.length === 0) {
    return errorResponse("Send a dating question to start coaching.", 400);
  }

  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const { response, payload } = await callGemini(messages, apiKey, model);

  if (!response.ok) {
    return errorResponse(
      payload.error?.message ?? "Gemini could not complete this request.",
      response.status
    );
  }

  let rawReply = extractGeminiText(payload);

  if (getFinishReason(payload) === "MAX_TOKENS" && rawReply) {
    const continuation = await callGemini(
      [
        ...messages,
        { role: "assistant", content: rawReply },
        {
          role: "user",
          content:
            "Please finish the previous coaching response naturally. Continue from where you stopped, keep it concise, and end with one gentle follow-up question."
        }
      ],
      apiKey,
      model
    );

    if (continuation.response.ok) {
      rawReply = `${rawReply}\n\n${extractGeminiText(continuation.payload)}`;
    }
  }

  const reply = formatCoachReply(rawReply);

  if (!reply) {
    return errorResponse(
      "Gemini did not return a coaching response. Please try again.",
      502
    );
  }

  await saveMessage(
  userId,
  "assistant",
  reply
);

  const nextUsage = hasUnlimitedMessages
    ? usage
    : await coachUsageStore.incrementDailyUsage(userId);

  return NextResponse.json({
    reply,
    ...createUsagePayload(planType, nextUsage.used)
  });
}
