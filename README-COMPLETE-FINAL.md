# Emunahh-Invest — Complete Phase 0–36 Final Build

## Stack
Vite + React + TypeScript + React Router + Supabase + Cloudinary + Supabase Edge Functions + Vercel.

This is NOT a Next.js project.

## What is included
- Complete public website source
- Services architecture
- CMS page/section editing
- Global header/footer CMS
- Cloudinary media workflow
- Media library
- Applications/inbox workflow
- Email templates and notification workflow
- Admin authentication
- Super Admin/RBAC
- Departments
- Module entitlements
- User management
- Dashboard/security/audit/database operations
- Responsive/mobile UI
- Routing/refresh handling
- SEO/forms
- Production security/performance/testing work
- Supabase Edge Functions
- Complete cumulative SQL migrations 001–030
- Master SQL file: `supabase/FINAL_SQL_001-030.sql`

## Deployment
1. Extract the ZIP.
2. Put the complete source tree into the GitHub repository.
3. Configure the Vercel environment variables in `.env.example`.
4. Run the SQL files in `SQL-RUN-ORDER-COMPLETE.md` order against the intended Supabase project.
5. Deploy the Supabase Edge Functions and set their server-side secrets.
6. Push to GitHub and deploy on Vercel.

## Browser environment variables
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SITE_URL
VITE_CLOUDINARY_CLOUD_NAME
VITE_CLOUDINARY_UPLOAD_PRESET

## Server/Edge Function secrets
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL

Never expose server secrets using a `VITE_` prefix.
