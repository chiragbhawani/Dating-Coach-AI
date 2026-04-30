const links = [
  { label: "About", href: "#" },
  { label: "Pricing", href: "#plans" },
  { label: "Contact", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" }
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">Dating Coach AI</p>
          <p className="mt-2 text-sm text-white/60">
            Respectful dating support for clearer conversations.
          </p>
        </div>
        <nav aria-label="Footer links">
          <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/72">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
