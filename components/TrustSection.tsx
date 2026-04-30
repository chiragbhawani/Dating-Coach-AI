import { HeartHandshake, LockKeyhole, ShieldAlert, Sparkles } from "lucide-react";

const trustItems = [
  {
    icon: HeartHandshake,
    title: "Respectful advice",
    text: "The product direction prioritizes empathy, consent, and healthy communication."
  },
  {
    icon: ShieldAlert,
    title: "No manipulation",
    text: "The coach avoids pressure, stalking, lying, harassment, and game-playing."
  },
  {
    icon: Sparkles,
    title: "Confidence with boundaries",
    text: "Suggestions aim to be practical without pushing anyone past comfort."
  },
  {
    icon: LockKeyhole,
    title: "Privacy-friendly",
    text: "The interface is designed so sensitive logic stays on the server."
  }
];

export function TrustSection() {
  return (
    <section id="trust" className="bg-white py-18 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sage">
            Safety and trust
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-5xl">
            Built around healthier dating habits.
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink/70">
            Dating Coach AI is positioned as a supportive tool, not a shortcut
            around another person’s boundaries.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[8px] border border-ink/10 bg-[#fbfaf7] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-honey/24 text-ink">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink/66">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
