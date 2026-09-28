# Emunahh-Invest Vite Migration

This package is intentionally a Vite + React + TypeScript application.

## Build

- `npm install`
- `npm run build`
- `npm run dev`

The production build output is `dist/`.

## Frontend environment variables

Use Vite browser variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SITE_URL`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

Do not expose server-only secrets with the `VITE_` prefix.

## Vercel

Vercel builds with `npm run build` and serves `dist/`. The SPA rewrite sends non-API routes to `/index.html`, so React Router routes can be refreshed directly without a Vercel 404.

The `/api/*` Vercel function remains available through `api/[...slug].ts`.

## Important

This migration removes the Next.js runtime and Next.js app/config files. Existing public React pages and React Router routes are retained; the migration does not replace them with a generic CMS renderer.
