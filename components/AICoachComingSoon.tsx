import { Bot, CalendarClock, MessagesSquare, ShieldCheck } from "lucide-react";

const previewItems = [
  {
    icon: MessagesSquare,
    title: "Message coaching",
    text: "Future support for drafts, rewrites, and tone checks before important conversations."
  },
  {
    icon: ShieldCheck,
    title: "Safety-first guidance",
    text: "Built to reject pressure, manipulation, harassment, and games."
  },
  {
    icon: CalendarClock,
    title: "Backend integration planned",
    text: "The chatbot integration will be connected later by the backend team."
  }
];

export function AICoachComingSoon() {
  return (
    <section
      id="coming-soon"
      className="relative overflow-hidden bg-ink py-18 text-white sm:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(243,185,95,0.20),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(215,97,123,0.18),transparent_34%),linear-gradient(135deg,rgba(47,111,100,0.34),transparent_44%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="float-in">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-honey">
            AI Coach Coming Soon
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">
            AI Coach is being prepared.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/72">
            Ask better questions, receive calmer guidance, and make thoughtful
            decisions. The chatbot integration will be connected later by the
            backend team.
          </p>
        </div>

        <div className="float-in rounded-[8px] border border-white/12 bg-white/[0.07] p-3 shadow-soft backdrop-blur sm:p-4">
          <div className="rounded-[8px] border border-white/10 bg-[#fbfaf7] p-5 text-ink">
            <div className="flex items-center gap-3 border-b border-ink/10 pb-4">
              <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-sage text-white">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold">Respectful AI Coach</h3>
                <p className="text-sm text-ink/58">Coming soon for members</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="max-w-[82%] rounded-[8px] border border-ink/10 bg-white p-3 text-sm leading-6 text-ink/70">
                I want to ask someone out but do not want to be pushy.
              </div>
              <div className="ml-auto max-w-[86%] rounded-[8px] bg-ink p-3 text-sm leading-6 text-white/82">
                Coming soon: respectful coaching that helps you be clear,
                honest, and comfortable with their answer.
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {previewItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-[8px] border border-ink/10 bg-mist p-4"
                  >
                    <Icon className="h-5 w-5 text-sage" aria-hidden="true" />
                    <h4 className="mt-3 text-sm font-semibold">{item.title}</h4>
                    <p className="mt-2 text-xs leading-5 text-ink/62">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Future chatbot integration point:
          Replace this preview with a client component that posts user messages
          to a server-side route owned by the backend/Replit AI team. Keep model
          keys and safety orchestration on the server, never in browser code. */}
    </section>
  );
}
