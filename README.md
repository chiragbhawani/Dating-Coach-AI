# Dating Coach AI

A modern responsive landing page for an AI-powered dating coach startup, built with Next.js, TypeScript, Tailwind CSS, and Clerk authentication.

## What Is Included

- Premium landing page with hero, coming-soon AI coach section, INR pricing, success stories, trust/safety, and footer
- Clerk-powered sign in, sign up, and user profile button
- Protected `/dashboard` page with account and coaching feature cards
- No active AI chat route in this version
- Comments in the code showing where the AI coach integration can be added later

## Local Setup

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```

You can copy `.env.example` as a starting point. Get the keys from your Clerk dashboard.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Commands

```bash
npm run lint
npm run typecheck
npm run build
```

## Vercel Deployment

1. Push this project to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and choose **Add New Project**.
3. Import the GitHub repository.
4. Add these environment variables in Vercel Project Settings:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_production_publishable_key
CLERK_SECRET_KEY=your_production_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```

5. Deploy the project.
6. Copy the generated Vercel URL. That public link can be opened by anyone.

## Clerk Notes

- The marketing site is public.
- `/dashboard` is protected by `middleware.ts`.
- Signed-out visitors are redirected to Clerk sign-in when they open `/dashboard`.

## Future AI Coach Integration

The live AI coach is still coming soon. The backend team can later add:

- Server-side coaching route
- AI provider integration
- Safety policies
- Message persistence
- Saved advice and plan-aware usage limits

Keep model API keys server-side only. Do not expose them in frontend code.
