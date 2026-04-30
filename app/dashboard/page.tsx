import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  Bot,
  BookmarkCheck,
  Crown,
  HeartHandshake,
  LockKeyhole
} from "lucide-react";

const dashboardCards = [
  {
    icon: Bot,
    title: "AI Coach Coming Soon",
    text: "The backend/Replit AI team can connect the live coach here later."
  },
  {
    icon: Crown,
    title: "My Plan",
    text: "Review your current plan and the support level connected to your account."
  },
  {
    icon: BookmarkCheck,
    title: "Saved Advice",
    text: "Future home for saved prompts, notes, and coaching history."
  },
  {
    icon: HeartHandshake,
    title: "Human Coach Access",
    text: "A dedicated space for higher-touch support as coaching options become available."
  }
];

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

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
              coaching workspace is being prepared.
            </p>
          </div>
          <div className="flex items-center gap-2 border border-ink/10 bg-white px-4 py-3 text-sm text-ink/70">
            <LockKeyhole className="h-4 w-4 text-sage" aria-hidden="true" />
            Protected account area
          </div>
        </header>

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
          <h2 className="text-xl font-semibold text-ink">Integration note</h2>
          <p className="mt-3 max-w-3xl leading-7 text-ink/68">
            Your account area is ready for upcoming coaching features. Message
            history, plan syncing, and human coach workflows can be added here
            once backend services are ready. Current Clerk user ID:
            <span className="font-mono text-sm text-sage"> {userId}</span>.
          </p>
        </section>

        {/* Future chatbot integration point:
            Mount authenticated AI coach widgets here after the backend/Replit
            AI team provides the server route, persistence, safety policies,
            and production environment configuration. */}
      </div>
    </main>
  );
}
