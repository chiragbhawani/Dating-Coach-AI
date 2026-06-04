import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  Bot,
  BookmarkCheck,
  Crown,
  LockKeyhole
} from "lucide-react";

const dashboardCards = [
  {
    icon: Bot,
    title: "AI Dating Coach",
    text: "Open your coaching workspace for conversation help, boundaries, and confidence."
  },
  {
    icon: Crown,
    title: "My Plan",
    text: "Review your current plan and the support level connected to your account."
  },
  {
    icon: BookmarkCheck,
    title: "Coaching History",
    text: "Review past coaching conversations and saved insights."
  },
];

export default async function DashboardPage() {
  const user = await currentUser();
  const plan =
  (user?.publicMetadata?.plan as string | undefined) ?? "free";

  return (
    <main className="min-h-screen bg-[#fbfaf7]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <header className="flex flex-col justify-between gap-5 border-b border-ink/10 pb-8 sm:flex-row sm:items-center">
          <div>
            <Link href="/" className="text-sm font-semibold text-sage">
              Dating Coach AI
            </Link>
            <h1 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">
              Dashboard
            </h1>
            <p className="mt-3 text-ink/62">
              Welcome{user?.firstName ? `, ${user.firstName}` : ""}. Your
              coaching workspace is ready.
            </p>
          </div>
          <div className="flex items-center gap-2 border border-ink/10 bg-white px-4 py-3 text-sm text-ink/70">
            <LockKeyhole className="h-4 w-4 text-sage" aria-hidden="true" />
            Protected account area
          </div>
        </header>

<section className="mt-8 border border-sage/20 bg-white p-6">
  <h2 className="text-2xl font-semibold text-ink">
    Current Plan
  </h2>

  <p className="mt-3 text-lg">
    {plan === "pro" ? "Pro Member" : "Free Plan"}
  </p>

  <p className="mt-2 text-ink/70">
    {plan === "pro"
      ? "Unlimited AI coaching messages."
      : "5 AI coaching messages per day."}
  </p>

  {plan !== "pro" && (
    <Link
      href="/upgrade"
      className="mt-5 inline-block bg-sage px-5 py-3 text-white"
    >
      Upgrade to Pro
    </Link>
  )}
</section> 

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <article key={card.title} className="border border-ink/10 bg-white p-6 shadow-sm">
                <div className="grid h-11 w-11 place-items-center bg-mist text-sage">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-ink">
                  {card.title}
                </h2>
                <p className="mt-3 leading-7 text-ink/66">{card.text}</p>
              </article>
            );
          })}
        </section>

       <section className="mt-8 border border-sage/20 bg-mist p-6">
  <h2 className="text-xl font-semibold text-ink">
    Your Coaching Journey
  </h2>

  <p className="mt-3 max-w-3xl leading-7 text-ink/68">
    Use your AI coach whenever you need help with conversations,
    confidence, relationships, boundaries, or dating situations.
  </p>

  <p className="mt-3 max-w-3xl leading-7 text-ink/68">
    New features such as conversation memory, saved coaching insights,
    and personalized guidance will appear here as they become available.
  </p>
</section>

        {/* TODO:
   Read plan from Clerk metadata.

   Free:
   - 5 AI messages per day

   Pro:
   - Unlimited AI messages
   - Personalized AI coach
   - Future memory features
*/}
      </div>
    </main>
  );
}
