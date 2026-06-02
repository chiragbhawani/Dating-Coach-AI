# Dating Coach AI

A modern responsive landing page for an AI-powered dating coach startup, built with Next.js, TypeScript, Tailwind CSS, and Clerk authentication.

## What Is Included

- Premium landing page with hero, AI Dating Coach section, INR pricing, success stories, trust/safety, and footer
- Clerk-powered sign in, sign up, and user profile button
- Protected `/dashboard` page with account and coaching feature cards
- Dedicated `/coach` page with a real Gemini-powered chat interface
- Server-side `/api/coach` route with free daily message limits and plan-aware TODOs

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
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

You can copy `.env.example` as a starting point. Get Clerk keys from your Clerk dashboard and a Gemini key from Google AI Studio. Keep `GEMINI_API_KEY` server-side only.

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
GEMINI_API_KEY=your_production_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

5. Deploy the project.
6. Copy the generated Vercel URL. That public link can be opened by anyone.

## Clerk Notes

- The marketing site is public.
- `/dashboard` is protected by `middleware.ts`.
- Signed-out visitors are redirected to Clerk sign-in when they open `/dashboard`.
- `/coach` is public to view, but the chat input requires a signed-in user.

## AI Coach Notes

The live AI coach uses Gemini through the server-side `/api/coach` route.

- Signed-out users cannot chat and are prompted to sign in.
- Free users get 5 AI messages per day.
- Pro and Premium users are structured for unlimited AI messages.
- Plan checks currently read Clerk metadata keys such as `plan` or `subscriptionPlan`.
- Usage tracking is behind a small storage abstraction. The current memory store is temporary and should move to Supabase, PostgreSQL, Neon, or Clerk metadata before production billing.

Keep model API keys server-side only. Do not expose them in frontend code.
