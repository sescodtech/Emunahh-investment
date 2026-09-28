# Emunahh-Invest Production Setup — Vite + Supabase + Cloudinary + Resend

1. In Supabase SQL Editor run, in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_admin_bootstrap.sql`
   - `supabase/migrations/003_cms_rbac_v2.sql`
2. Create your first Supabase Auth user in Authentication → Users.
3. If that user existed before this upgrade, the migration promotes legacy `admin` profiles to `super_admin`. Otherwise run:
   `select public.bootstrap_admin('YOUR-EMAIL');`
4. Set Vercel frontend variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SITE_URL`
   - `VITE_CLOUDINARY_CLOUD_NAME`
   - `VITE_CLOUDINARY_UPLOAD_PRESET`
5. Deploy Supabase Edge Functions:
   - `supabase functions deploy admin-user-management`
   - `supabase functions deploy send-email`
6. Set Edge Function secrets (never expose these in Vercel frontend):
   - `supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...`
   - `supabase secrets set RESEND_API_KEY=...`
   - `supabase secrets set RESEND_FROM_EMAIL=...`
7. In Cloudinary create an unsigned upload preset restricted to the required image formats and a sensible max file size.
8. The production bundle no longer contains duplicate JPG/WebP assets. Upload production media to Cloudinary and store URLs in the CMS.
9. Vercel build command: `npm run build`; output directory: `dist`.
