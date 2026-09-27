# Emunahh-Invest Production Setup

This codebase has been cleaned so administrator authentication is no longer hardcoded into the frontend. The production direction is Supabase Auth + Supabase Storage + Supabase PostgreSQL + Vercel.

## 1. Environment variables

Copy `.env.example` to your local `.env` and set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only; never expose in `VITE_*` variables)
- `SUPABASE_STORAGE_BUCKET=emunahh-media`
- `RESEND_API_KEY`

For Vercel, add the same variables in Project Settings → Environment Variables.

## 2. Create the Supabase schema

Run:

`supabase/migrations/001_initial_schema.sql`

in the Supabase SQL Editor.

## 3. Create the administrator

Create the administrator user in Supabase Authentication → Users.

The account must have an admin role. For the current authentication guard, set either `app_metadata.role` or `user_metadata.role` to `admin`. The database migration also creates the longer-term `profiles.role` structure for the CMS/CRM migration.

Do not put an administrator password in React, `server.ts`, JSON files, GitHub, or Vercel source code.

## 4. Media

Website images are now served as optimized WebP assets and the duplicated source/public JPG collection has been removed.

The admin media endpoint supports Supabase Storage when `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are configured. On Vercel, cloud storage configuration is required before uploads are accepted.

## 5. Current safe migration boundary

The public application still has a JSON compatibility store so the existing website remains usable while the Supabase database is introduced. The next production migration should move content, services, applications, media metadata, settings and email logs from `data/emunahh_db.json` into the Supabase tables defined in the SQL migration.

This boundary is intentional: it prevents a half-completed database migration from silently destroying existing website functionality.

## 6. Windows commands

```cmd
npm install
npm run lint
npm run build
npm run dev
```

`npm run clean` is Windows-safe and does not depend on Unix `rm` commands.
