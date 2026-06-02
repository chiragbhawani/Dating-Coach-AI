import Link from "next/link";
import { ArrowUpRight, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { AICoachExperience } from "@/components/AICoachExperience";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const coachingFocus = [
  {
    icon: MessageCircle,
    title: "Conversation clarity",
    text: "Get help with texts, mixed signals, first dates, and difficult replies."
  },
  {
    icon: ShieldCheck,
    title: "Respectful boundaries",
    text: "Stay confident without pressure, games, or crossing someone’s comfort."
  },
  {
    icon: Sparkles,
    title: "Personal growth",
    text: "Build calm confidence, emotional awareness, and better communication habits."
  }
];

export default function CoachPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ink text-white">
        <section className="relative overflow-hidden py-10 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(243,185,95,0.20),transparent_30%),radial-gradient(circle_at_84%_74%,rgba(47,111,100,0.28),transparent_34%),linear-gradient(135deg,rgba(20,32,31,0.2),rgba(20,32,31,0))]" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <Link
              href="/"
              className="text-sm font-semibold text-honey transition hover:text-white"
            >
              Back to home
            </Link>
            <div className="mt-6 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-honey">
                AI coaching workspace
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
                AI Dating Coach
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70">
                Ask about conversations, confidence, relationships, and dating
                situations. Free accounts get 5 messages per day. Pro and
                Premium members get unlimited AI coaching.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
              <AICoachExperience />

              <aside className="space-y-4">
                <div className="rounded-[8px] border border-white/12 bg-white/[0.07] p-5 shadow-soft backdrop-blur">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-honey">
                    Coach focus
                  </p>
                  <div className="mt-5 space-y-4">
                    {coachingFocus.map((item) => {
                      const Icon = item.icon;

                      return (
                        <article key={item.title} className="flex gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-white/10 text-honey">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <div>
                            <h2 className="font-semibold">{item.title}</h2>
                            <p className="mt-1 text-sm leading-6 text-white/62">
                              {item.text}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>

                <Link
                  href="/#plans"
                  className="group flex items-center justify-between rounded-[8px] border border-honey/25 bg-honey px-5 py-4 font-semibold text-ink shadow-soft transition hover:bg-white"
                >
                  Upgrade for unlimited coaching
                  <ArrowUpRight
                    className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
