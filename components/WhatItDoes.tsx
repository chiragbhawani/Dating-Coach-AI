import { MessageSquareText, NotebookPen, ShieldCheck, UsersRound } from "lucide-react";

const features = [
  {
    icon: MessageSquareText,
    title: "Text with more clarity",
    text: "Get help thinking through messages, tone, timing, and what you really want to say."
  },
  {
    icon: ShieldCheck,
    title: "Keep advice respectful",
    text: "The product is framed around honesty, consent, boundaries, and no-pressure communication."
  },
  {
    icon: NotebookPen,
    title: "Save what matters",
    text: "The dashboard is ready for saved advice, reflections, and future coaching history."
  },
  {
    icon: UsersRound,
    title: "Human help later",
    text: "Membership tiers leave room for human helper and counselor access once operations are ready."
  }
];

export function WhatItDoes() {
  return (
    <section id="features" className="bg-white py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blush">
            What it does
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-5xl">
            Practical support for modern dating moments.
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink/66">
            A polished home for coaching, plans, and member tools before the
            live AI assistant is connected.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-[8px] border border-ink/10 bg-[#fbfaf7] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-sage text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink/64">
                  {feature.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
