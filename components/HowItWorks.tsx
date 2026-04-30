import { ArrowRight, LogIn, Sparkles, UserCheck } from "lucide-react";

const steps = [
  {
    icon: LogIn,
    title: "Create an account",
    text: "Use Clerk sign up to access the protected member area."
  },
  {
    icon: Sparkles,
    title: "Choose your path",
    text: "Pick the plan that matches how much dating support you want."
  },
  {
    icon: UserCheck,
    title: "Use the dashboard",
    text: "Track your plan, saved advice, and future human coach access."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blush">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-5xl">
              Simple now, ready to grow later.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-ink/62">
            The current experience is intentionally clean: public marketing,
            protected account access, and future-ready product surfaces.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="relative rounded-[8px] border border-ink/10 bg-[#fbfaf7] p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-[8px] bg-ink text-honey">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-semibold text-ink/36">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-ink/64">{step.text}</p>
                {index < steps.length - 1 ? (
                  <ArrowRight
                    className="absolute -right-5 top-1/2 hidden h-6 w-6 text-sage/50 lg:block"
                    aria-hidden="true"
                  />
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
