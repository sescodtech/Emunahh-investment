# Emunahh-Invest Full Visual CMS — Vite + React

This build keeps the existing **Vite + React + TypeScript** application. It does not convert the project to Next.js.

## What changed

- Public marketing pages now read their visible sections from `cms_pages` + `cms_sections` in Supabase.
- Home, About, Student Loans, Investments, Business Financing, Personal Finance, Other Services, Contact, Privacy and Terms have structured CMS sections.
- The admin Website CMS is now a **visual field editor**, not a JSON editor.
- Admin can edit headings, paragraphs, CTA labels/links, bullets, cards, feature blocks, process steps, FAQs, contact details and legal sections.
- Admin can enable/disable, reorder and delete sections.
- Admin can create additional CMS pages.
- Page-level SEO fields are editable.
- Section revisions are recorded in `cms_revisions` before updates.
- Header navigation and footer copy are stored in a global CMS page.
- Cloudinary remains the media layer. New CMS hero images can be uploaded directly from the section editor using the unsigned upload preset.
- Existing local WebP assets remain as safe visual fallbacks so the public site does not become image-empty while Cloudinary assets are being migrated.
- Existing application, contact submission, blog, user/RBAC, audit and email modules remain in place.

## Supabase migrations

Run these in order in the same Supabase project:

1. `001_initial_schema.sql`
2. `002_admin_bootstrap.sql`
3. `003_cms_rbac_v2.sql`
4. `004_full_visual_cms.sql`
5. `005_global_cms.sql`

Do not run the migrations against the old unused Supabase project. Use the active project whose URL/key are configured in Vercel.

## Vercel environment variables

Frontend variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SITE_URL`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

Secrets used by Supabase Edge Functions, such as Resend/service-role credentials, must remain server-side in Supabase and must not be placed in `VITE_*` variables.

## Cloudinary

Use an unsigned image upload preset restricted to the intended upload folder and allowed formats. The CMS stores the Cloudinary URL and public ID in Supabase `media`; the binary image remains in Cloudinary.

## Local validation

From the project root:

```bash
npm install
npm run lint
npm run build
```

The source files added/changed in this build were syntax-transpiled successfully during packaging. Full dependency installation/build could not be completed in the packaging environment because package installation timed out.

## Important deployment sequence

1. Push the source changes to GitHub.
2. Run Supabase migrations 004 and 005 after the existing migrations.
3. Confirm the Vercel project uses the active Supabase environment variables.
4. Add the Cloudinary variables to Vercel.
5. Redeploy.
6. Sign in to `/admin`.
7. Open **Website CMS** and select each page.
8. Publish pages only after checking the content and images.

## Architecture

- Vite + React + TypeScript: public/admin interface
- Supabase: authentication, PostgreSQL, RLS, CMS, applications, inbox, RBAC and audit data
- Cloudinary: website images/media
- Vercel: deployment
- Resend/Supabase Edge Functions: transactional email where configured
