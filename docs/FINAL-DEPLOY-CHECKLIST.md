# Emunahh-Invest Phase 10 — Final Deployment Checklist

## 1. Confirm database state
Run `supabase/SQL_STATE_CHECK_031-035.sql` and apply only missing migrations in numeric order.

## 2. Deploy Supabase Edge Functions
Deploy:
- `notify-new-submission`
- `send-email`
- `admin-user-management`
- `document-storage`

The old `application-action` Edge Function is not required by the active frontend; migration 034 provides the audited application workflow RPC.

## 3. Configure server-side secrets in Supabase
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CLOUDINARY_API_KEY` + `CLOUDINARY_API_SECRET` when protected Cloudinary document storage is used
- `GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON` when Google Drive document storage is used

Never expose these as `VITE_*` variables.

## 4. Configure Vercel browser-safe variables
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SITE_URL`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

## 5. Verify external services
- Resend sending domain is verified.
- Final sender address in `RESEND_FROM_EMAIL` is valid for that domain.
- Cloudinary unsigned preset allows only intended image formats and sensible file-size limits.
- Supabase Auth Site URL and redirect URLs include the production domain.

## 6. Deploy the Vite project
Vercel framework: Vite
Build command: `npm run build`
Output directory: `dist`

The build command regenerates `public/sitemap.xml` and includes current published Insights articles when Supabase build environment variables are available.

## 7. Public smoke test
Test:
- Home
- About
- Services hub
- all five service pages
- Blog / Insights listing
- at least one article
- Contact
- Apply / Track
- Trust & Security
- Disclosures
- Privacy
- Terms
- mobile navigation
- 404 route

## 8. Application form smoke test
Submit one test enquiry for each service:
- Education Financing
- Travel Financing
- Business Financing
- Personal Finance
- Investment Services

Verify:
- correct service preselection
- required-field validation
- currency/amount handling
- service-specific questions
- privacy/accuracy consent
- reference generation
- application row created
- admin displays structured service answers
- company notification email
- applicant acknowledgement email
- public tracking returns only safe status metadata

### Supporting-document smoke test
- Turn document storage Test Mode ON first.
- Enable applicant document uploads and choose the intended provider.
- Submit an application and confirm the secure document link appears.
- Upload at least one service-specific document and confirm it appears in the Admin application drawer as a TEST entry.
- Use **Create secure upload link** in Admin and confirm the copied link opens the same application securely.
- Configure provider secrets, use **Test storage configuration**, then turn Test Mode OFF.
- Upload a real test document, download it from Admin, and confirm it is not publicly accessible.

## 9. Contact workflow smoke test
Submit a contact enquiry and verify:
- contact row created
- notification email sent
- acknowledgement sent when email is supplied
- admin inbox can update status through the controlled RPC

## 10. Admin workflow smoke test
Verify according to user permissions:
- Overview
- Applications
- Messages
- Website CMS
- Insights & Blog
- Services
- Media
- Users
- Access Control
- Emails
- Audit
- Settings

Test assignment/status updates and confirm audit rows are created.

## 11. Content / SEO checks
- browser title and meta description
- canonical URL
- Open Graph metadata
- `/robots.txt`
- `/sitemap.xml`
- article URLs in generated sitemap after production build
- no unintended `noindex` on public pages

## 12. Production sign-off
Do not publish unsupported regulatory, licensing, return, guarantee, AUM, partnership or performance claims until verified and approved.
