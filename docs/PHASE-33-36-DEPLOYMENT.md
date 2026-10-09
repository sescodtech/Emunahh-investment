# Phase 33–36 Complete Deployment

## Stack
Vite + React + TypeScript + React Router + Supabase + Cloudinary + Vercel.

This package is NOT a Next.js application.

## Vercel environment
Set:
- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY
- VITE_SITE_URL=https://emunahhinvest.com
- VITE_CLOUDINARY_CLOUD_NAME
- VITE_CLOUDINARY_UPLOAD_PRESET

Never put a Supabase service-role key, Resend API key, or Cloudinary API secret in a VITE_* variable.

## Deployment
1. Extract this ZIP.
2. Replace the GitHub repository contents with this complete source tree, or copy the complete source tree into the existing repository.
3. Commit and push.
4. Confirm Vercel uses `npm run build`.
5. Run the SQL in `SQL-RUN-ORDER-PHASE33-36.txt` according to whether 001–005 are already installed.
6. Test direct refresh on every public route and `/admin/login`.

## Important
The build preserves the existing CMS architecture and existing database content. It does not contain a CMS reset or seed operation that deletes live content.
