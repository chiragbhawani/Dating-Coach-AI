import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton
} from "@clerk/nextjs";
import { ArrowRight, Sparkles } from "lucide-react";

const navLinks = [
  { label: "What it does", href: "#features" },
  { label: "AI Coach", href: "#coming-soon" },
  { label: "Plans", href: "#plans" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Trust", href: "#trust" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-[#fbfaf7]/88 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 text-ink sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-[8px] bg-ink text-honey shadow-sm">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>Dating Coach AI</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-ink/62 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-ink">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="hidden rounded-[8px] px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-white hover:text-ink sm:inline-flex">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="inline-flex items-center gap-2 rounded-[8px] bg-ink px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sage">
                Sign Up
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <Link
              href="/dashboard"
              prefetch={false}
              className="hidden rounded-[8px] px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-white hover:text-ink sm:inline-flex"
            >
              Dashboard
            </Link>
            <UserButton />
          </Show>
        </div>
      </nav>
    </header>
  );
}
