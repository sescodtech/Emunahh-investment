# Emunahh-Invest Production Setup

## Current architecture

This project is **Vite + React + TypeScript**. It is not a Next.js application.

Production stack:
- Vite + React
- React Router
- Supabase Auth + PostgreSQL + RLS
- Supabase Edge Functions
- Cloudinary for media
- Resend for transactional email
- Vercel for hosting

## 1. Vercel environment variables

Preferred names:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SITE_URL`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

The frontend temporarily accepts the old `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, or `NEXT_PUBLIC_SUPABASE_ANON_KEY` names so an existing deployment can recover without an immediate environment-variable rename. Use the VITE names going forward.

After changing variables, **redeploy Vercel**. Vite embeds public environment values at build time.

## 2. Supabase SQL

Run these migrations once, in order:
1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_admin_bootstrap.sql`
3. `supabase/migrations/003_cms_rbac_v2.sql`
4. `supabase/migrations/004_full_cms_media_blog.sql`

Then ensure the intended administrator exists in Supabase Authentication → Users and run:

`select public.bootstrap_admin('YOUR-ADMIN-EMAIL');`

The email must exactly match the Supabase Auth user email.

## 3. Cloudinary media

The CMS uses **Cloudinary for website images/media** and **Supabase for the media database records**. Configure:
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

The upload preset must allow unsigned browser uploads for the selected Cloudinary folder. Do not place a Cloudinary API secret in Vite environment variables.

## 4. Edge Functions

Deploy:

`supabase functions deploy admin-user-management`
`supabase functions deploy send-email`

Set these as Supabase function secrets only:
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

## 5. SPA refresh routing

`vercel.json` contains the SPA fallback so `/admin`, `/about`, `/apply`, etc. continue loading after a browser refresh or direct URL visit.

## 6. Build

`npm install`
`npm run lint`
`npm run build`

Vercel should use:
- Build command: `npm run build`
- Output directory: `dist`

## 7. Authentication troubleshooting

If login still fails after the deployment is rebuilt:
1. Confirm the Auth user exists in Supabase.
2. Confirm the same email has a row in `public.profiles`.
3. Run `select public.bootstrap_admin('YOUR-ADMIN-EMAIL');`.
4. Confirm the profile status is `active`.
5. Confirm the browser's deployed build contains the correct Supabase URL/key.
6. Sign out of the old session and sign in again.

## Upgrade notes

The management portal now includes a no-code page/section editor, Cloudinary media library with metadata, and a blog post CMS. Public blog posts are read from `blog_posts`; when no published CMS posts exist, the existing bundled editorial content remains as a safe fallback.

A full `npm install`/`npm run build` could not be completed in the development environment because package installation timed out. The source was syntax/transpile-checked successfully. Run the build locally or in Vercel after installation.
