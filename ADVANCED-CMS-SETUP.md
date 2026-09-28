# Emunahh-Invest Advanced CMS

## Architecture
- Vite + React + TypeScript frontend
- Supabase Auth + Postgres + RLS for authentication, content, RBAC, CRM and audit
- Cloudinary for image binaries; Supabase `media` table stores searchable metadata
- Express/Vercel API for protected server operations such as admin user creation and email dispatch

## Migration order
Run 001, then 002, then 003 in Supabase SQL Editor. Do not rerun an already successful migration unless you intentionally reset the database.

## Vercel environment variables
Frontend:
- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY
- VITE_SITE_URL
- VITE_CLOUDINARY_CLOUD_NAME
- VITE_CLOUDINARY_UPLOAD_PRESET

Server-only:
- SUPABASE_URL
- SUPABASE_PUBLISHABLE_KEY
- SUPABASE_SECRET_KEY
- RESEND_API_KEY

Never expose SUPABASE_SECRET_KEY or RESEND_API_KEY as `VITE_*`.

## Cloudinary
Create an unsigned image upload preset restricted to the Emunahh-Invest Cloudinary account. Add the cloud name and preset name to Vercel.

## First administrator
Use the existing Supabase Auth account/bootstrap process. After migration 003, the first administrator maps to `super_admin`. Additional accounts can be created from Admin > Users.

## Public website preservation
The existing page components remain the visual source of truth. CMS data is additive and falls back to the existing bundled content when a CMS value is unavailable.
