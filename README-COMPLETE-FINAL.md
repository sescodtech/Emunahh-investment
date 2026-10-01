# Emunahh-Invest — Phase 10 Launch-Readiness Build

## Stack
Vite + React + TypeScript + React Router + Supabase + Cloudinary + Supabase Edge Functions + Vercel.

This is a Vite application. It is not a Next.js project.

## This ZIP is the complete deployable source project
It includes:
- complete active `src/` application source
- public website routes and assets
- professional five-service application/enquiry experience
- CMS and global navigation/footer integration
- Insights/editorial system
- Cloudinary media workflow
- application/contact/admin workflows
- authentication/RBAC/departments/modules
- SEO/accessibility/performance layer
- Supabase migrations and reconciled SQL history
- current Supabase Edge Functions
- Vercel/Vite/TypeScript configuration
- deployment and database-state documentation

The ZIP intentionally does NOT contain:
- `node_modules/`
- generated `dist/`
- `.git/`
- secret `.env` values

Those exclusions are normal and are why the compressed source package remains small.

## SQL
The conversation explicitly confirms the live database through migration 031.
Because execution of 032/033/034/035 was not confirmed in chat, first run:

`supabase/SQL_STATE_CHECK_031-035.sql`

Then apply only missing migrations in numeric order.

A complete fresh-install archive is included at:

`supabase/EMUNAHH_FULL_DATABASE_001-035_FRESH_INSTALL.sql`

That file is for a NEW/EMPTY Supabase project only and must not be run over the current live database.

## Current Edge Functions
- `notify-new-submission`
- `send-email`
- `admin-user-management`
- `document-storage`

## Browser environment variables
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SITE_URL`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

## Server-side Supabase Edge Function secrets
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` for Cloudinary application documents
- `GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON` for Google Drive application documents

Never expose server secrets using a `VITE_` prefix.

## Deployment order
1. Run the SQL state checker and apply only missing 032–035 migrations.
2. Deploy the current Edge Functions and configure secrets.
3. Configure Vercel browser-safe variables.
4. Confirm Supabase Auth production URLs, Resend domain/sender and Cloudinary preset.
5. Push the complete source tree to GitHub.
6. Deploy on Vercel.
7. Follow `FINAL-DEPLOY-CHECKLIST.md` for end-to-end smoke testing.

## Secure application documents
The current master includes provider-controlled supporting-document workflows. Admin can disable uploads, use Test Mode, or route documents to protected Cloudinary storage or Google Drive. The main application remains a clean four-stage intake; service-specific supporting documents are handled after the application reference is created.

See `DOCUMENT-STORAGE-SETUP.md` and `SECURE-DOCUMENTS-IMPLEMENTATION.md`.
