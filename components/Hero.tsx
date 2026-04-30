import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fbfaf7]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(243,185,95,0.28),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(47,111,100,0.18),transparent_32%),linear-gradient(180deg,#fbfaf7,#eef6f2)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[0.96fr_1.04fr]">
        <div className="float-in z-10 max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-[8px] border border-sage/20 bg-white/86 px-3 py-2 text-sm font-medium text-sage shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Premium dating support, built around respect
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.04] tracking-normal text-ink sm:text-6xl lg:text-7xl">
            Get Better Dating Advice, Instantly
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-ink/72">
            A modern coaching platform for clearer messages, better
            boundaries, and healthier communication. Dating Coach AI is
            designed to feel calm, trustworthy, and genuinely useful.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <SignUpButton mode="modal">
              <button className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-ink px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sage focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2">
                Join Early Access
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </button>
            </SignUpButton>
            <a
              href="#plans"
              className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-ink/15 bg-white/88 px-5 py-3 text-base font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2"
            >
              View Plans
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {["No pressure", "Privacy-minded", "Healthy confidence"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-[8px] border border-ink/10 bg-white/78 px-3 py-2 text-sm font-medium text-ink/72 shadow-sm backdrop-blur"
                >
                  <BadgeCheck className="h-4 w-4 text-sage" aria-hidden="true" />
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[8px] border border-white/70 shadow-soft sm:min-h-[500px] lg:min-h-[610px]">
          <Image
            src="/dating-coach-hero.png"
            alt="A person using an AI dating coach on their phone in a calm cafe"
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 max-w-sm rounded-[8px] border border-white/55 bg-white/90 p-4 shadow-soft backdrop-blur">
            <p className="text-sm font-semibold text-ink">Dating Coach AI</p>
            <p className="mt-1 text-sm leading-6 text-ink/70">
              Respectful coaching, thoughtful plans, and a protected member
              dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
