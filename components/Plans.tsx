import { Check, Crown, Gem, Sparkle } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    icon: Sparkle,
    description: "Start with calm, safety-first dating support.",
    features: [
      "Basic relationship guidance",
      "5 AI messages per day",
      "Safety-first advice resources"
    ]
  },
  {
    name: "Pro",
    price: "₹299",
    icon: Crown,
    description: "More structure for people actively improving how they date.",
    features: [
      "Everything in Free",
      "Unlimited AI messages",
      "Saved advice history",
      "Priority feature access"
    ],
    featured: true
  },
  {
    name: "Premium",
    price: "₹999",
    icon: Gem,
    description: "A high-touch plan for deeper reflection and personal growth.",
    features: [
      "Everything in Pro",
      "Unlimited AI messages",
      "Human coach support when available",
      "Priority response workflows",
      "Advanced personal guidance tools"
    ]
  }
];

export function Plans() {
  return (
    <section id="plans" className="bg-mist py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sage">
              Membership
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-5xl">
              Plans for every level of support.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-ink/62">
            Choose the level of guidance that fits your dating goals, from
            simple advice to more personalized support as new features launch.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <article
                key={plan.name}
                className={`group relative overflow-hidden rounded-[8px] border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft ${
                  plan.featured ? "border-sage shadow-soft" : "border-ink/10"
                }`}
              >
                {plan.featured ? (
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#2f6f64,#f3b95f,#d7617b)]" />
                ) : null}
                {plan.featured ? (
                  <p className="mb-4 inline-flex rounded-[8px] bg-honey/24 px-3 py-1 text-sm font-semibold text-ink">
                    Most popular
                  </p>
                ) : null}
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-semibold text-ink">{plan.name}</h3>
                  <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-mist text-sage transition group-hover:bg-sage group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-4xl font-semibold text-ink">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-ink/55">/month</span>
                </div>
                <p className="mt-4 min-h-14 text-sm leading-6 text-ink/66">
                  {plan.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-ink/78">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-sage"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#ai-coach"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-[8px] px-4 py-3 font-semibold transition focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 ${
                    plan.featured
                      ? "bg-sage text-white hover:bg-ink"
                      : "border border-ink/12 text-ink hover:bg-mist"
                  }`}
                >
                  Choose {plan.name}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
