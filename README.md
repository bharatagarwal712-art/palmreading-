# Palm AI

A production-shaped, mobile-first Next.js 15 frontend for an AI-powered palm reading platform.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style primitives
- Framer Motion
- Supabase Auth, Database, and Storage placeholders
- Razorpay checkout placeholder
- Dark mode first

## Getting Started

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` when you are ready to wire services.

## Structure

- `app/` contains routes, layouts, loading, and not-found states.
- `components/ui/` contains reusable shadcn-style primitives.
- `components/layout/` contains navigation and shell structure.
- `components/motion/` contains reusable Framer Motion primitives.
- `components/sections/` contains marketing and onboarding sections.
- `components/skeletons/` contains loading states.
- `lib/` contains integration placeholders and shared utilities.
