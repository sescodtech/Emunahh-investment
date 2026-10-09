# Emunahh-Invest Secure Application Document Storage

## Admin controls

Open **Admin → Site Settings → Application document storage**.

You can control:
- Enable/disable applicant document uploads.
- Provider: Disabled, Cloudinary, or Google Drive.
- Test Mode.
- Maximum file size (1–25 MB).
- Allowed file extensions.
- Cloudinary application-document folder.
- Google Drive destination folder ID.
- Storage configuration test.

Secrets are intentionally not saved in website settings.

## Recommended rollout

1. Run migration `035_document_storage_controls.sql`.
2. Deploy the `document-storage` Edge Function.
3. Start with uploads enabled + your preferred provider + **Test Mode ON**.
4. Submit a test Education/Travel/Business/Personal/Investment application.
5. Confirm the post-submission document page and Admin application document list behave correctly.
6. Add the provider secrets in Supabase Edge Function Secrets.
7. Use **Test storage configuration** in Admin Settings.
8. Turn Test Mode OFF only after the provider check succeeds.

## Applicant flow

The main financing/application form remains a clean four-stage intake. Supporting files are not mixed into the initial questions.

After successful submission, when document uploads are enabled, the applicant can continue to a secure document page tied to that application using a long random upload token. Only a SHA-256 hash of the token is stored with the application.

The document checklist is service-specific:
- Education Financing: identity, admission/offer, fee schedule, income/sponsor evidence, bank statements.
- Travel Financing: identity, itinerary/booking/quotation, purpose evidence where relevant, income/repayment evidence, bank statements.
- Business Financing: registration, authorised representative ID, business bank statements, financials, transaction support where relevant.
- Personal Finance: identity, income/employment evidence, bank statements, purpose invoice/quotation where relevant.
- Investment Services: KYC identity, source-of-funds evidence where appropriate, corporate documents where applicable.

## Admin flow

Inside an application drawer, authorised staff can:
- View received document metadata.
- Download stored documents (not available for Test Mode entries).
- Create a new secure applicant document-upload link and copy it to the clipboard.

## Cloudinary mode

Files are uploaded server-side as protected/authenticated Cloudinary assets. The browser never receives the Cloudinary API secret. Admin downloads are proxied through the document-storage Edge Function after RBAC permission checks.

## Google Drive mode

Files are uploaded server-side through the Drive API using a service account. The destination folder should be organisation-controlled. Admin downloads are proxied through the Edge Function, so applicants never receive Drive credentials or public sharing links.
