const testimonials = [
  {
    quote:
      "I finally understood how to express interest without sounding desperate or overthinking every word.",
    name: "Aarav"
  },
  {
    quote:
      "The advice felt calm, respectful, and practical, not like pickup tricks.",
    name: "Meera"
  },
  {
    quote:
      "It helped me think clearly before replying instead of reacting emotionally.",
    name: "Rohan"
  },
  {
    quote:
      "I liked that the guidance focused on confidence, boundaries, and honest communication.",
    name: "Ananya"
  },
  {
    quote:
      "This feels like the kind of support people need before difficult conversations.",
    name: "Kabir"
  },
  {
    quote:
      "It made dating feel less performative and more like a thoughtful conversation.",
    name: "Priya"
  },
  {
    quote:
      "It gave me language that felt confident without trying to control the other person.",
    name: "Ishaan"
  },
  {
    quote:
      "The guidance helped me slow down and choose a response I actually felt good about.",
    name: "Tara"
  },
  {
    quote:
      "I appreciated that the advice was direct, kind, and focused on mutual respect.",
    name: "Dev"
  },
  {
    quote:
      "It made hard conversations feel less intimidating and more manageable.",
    name: "Naina"
  }
];

export function Testimonials() {
  const carouselTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="stories" className="bg-[#fbfaf7] py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blush">
              Success stories
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-5xl">
              Support that feels calm, clear, and human.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-ink/60">
            Dating Coach AI is designed for people who want healthier
            conversations, not scripts, games, or pressure.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#fbfaf7] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#fbfaf7] to-transparent sm:w-24" />

          <div className="testimonial-marquee flex w-max gap-4 py-2 hover:[animation-play-state:paused]">
            {carouselTestimonials.map((testimonial, index) => (
              <figure
                key={`${testimonial.name}-${index}`}
                className="flex h-72 w-[290px] shrink-0 flex-col justify-between rounded-[8px] border border-ink/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft sm:w-[360px]"
              >
                <blockquote className="text-lg leading-8 text-ink/82">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 text-sm font-semibold text-sage">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-mist text-ink">
                    {testimonial.name.charAt(0)}
                  </span>
                  {testimonial.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
