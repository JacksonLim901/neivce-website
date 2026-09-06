# NEIVCE Trading PLT — Company Website & Admin Panel

ITGEN008 Internet Infrastructure and Web Deployment — Assignment project.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres + Auth)
- Deployed on Vercel

## Getting started (local development)

1. Install dependencies:
   ```
   npm install
   ```
2. Copy the environment variable template and fill in your Supabase project
   values (see "Supabase setup" below):
   ```
   cp .env.local.example .env.local
   ```
3. Run the dev server:
   ```
   npm run dev
   ```
4. Open http://localhost:3000

## Supabase setup

1. Create a free project at https://supabase.com.
2. Open the SQL editor and run `supabase/schema.sql` from this repo — it
   creates the `site_settings` and `services` tables and seeds them with the
   real company details (marked `PLACEHOLDER` where content isn't finalised).
3. Go to Authentication → Users and manually add one admin user (email +
   password) — this is the account used to log into `/admin`.
4. Go to Project Settings → API and copy the Project URL and anon public key
   into your `.env.local`.

## Project structure

```
app/            Pages (App Router)
components/     Reusable UI, layout, and section components
lib/supabase/   Supabase client helpers (browser + server)
types/          Shared TypeScript types
supabase/       Database schema (schema.sql)
```

## Deployment

1. Push this repository to GitHub.
2. Import the repo on https://vercel.com.
3. Add the same two environment variables from `.env.local` in the Vercel
   project settings.
4. Deploy — Vercel builds and gives you a live URL.

## Status

- [x] Project scaffold (Next.js + TypeScript + Tailwind)
- [x] Design tokens, Navbar, Footer
- [x] Home page (static shell)
- [ ] About / Services / Contact pages
- [ ] Supabase data connection
- [ ] Admin login + dashboard + editors
- [ ] Responsive, accessibility, and performance pass
- [ ] Deployment
