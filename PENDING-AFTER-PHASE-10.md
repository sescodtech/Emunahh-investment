# What remains after the current secure-document master

The website/application code now includes the professional public application flow, post-submission secure document workflow, admin provider controls, Cloudinary/Google Drive routing, operational admin workflow, CMS, Insights and SEO layers.

## Required before production sign-off
1. Run `supabase/SQL_STATE_CHECK_031-035.sql` and apply only missing migrations 032–035.
2. Deploy all Edge Functions listed in `supabase/functions/README.md`, including `document-storage`.
3. Configure shared Supabase/Resend secrets.
4. For Cloudinary document storage, configure `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in Supabase secrets, and set the cloud name in Admin Settings or `CLOUDINARY_CLOUD_NAME`.
5. For Google Drive document storage, configure `GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON` and grant the service account access to the selected organisation/shared-drive folder.
6. Start document storage in Test Mode, verify the complete applicant/admin workflow, then switch Test Mode off only after the provider configuration check succeeds.
7. Confirm Vercel browser-safe variables and Supabase Auth production URLs.
8. Verify the Resend sending domain and final sender address.
9. Complete live smoke tests for all five application journeys, supporting documents, contact enquiries, emails, tracking, admin workflows, CMS, media and Insights.
10. Obtain legal/compliance review of final Privacy, Terms, Disclosures and any regulatory/licensing statements.

## Optional post-launch improvements
- Error/uptime monitoring.
- Analytics/consent configuration where required.
- Automated end-to-end browser tests in CI.
- CRM/ticketing integration as enquiry volume grows.
- A full authenticated customer portal if clients later need ongoing account access, repeated document requests or statements.
