# Supabase Edge Functions — current deployment set

Deploy these functions for the current Emunahh-Invest production baseline:

- `notify-new-submission` — public application/contact notification + acknowledgement workflow.
- `send-email` — permission-protected staff email sending.
- `admin-user-management` — Super Admin user invitation workflow.
- `document-storage` — secure application-document upload/download, provider routing, storage health checks and secure upload-link generation.

## Required shared secrets

- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

`SUPABASE_URL` and the standard project runtime values are supplied by Supabase.

## Cloudinary document storage

When the Admin setting **Application document storage → Provider** is `Cloudinary` and Test Mode is OFF, configure:

- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- optional `CLOUDINARY_CLOUD_NAME` (the database `cloudinary_cloud_name` value can also provide the cloud name)

Document uploads use a server-side authenticated Cloudinary request and the `authenticated` delivery type. API secrets are never exposed to the browser.

## Google Drive document storage

When the provider is `Google Drive` and Test Mode is OFF, configure:

- `GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON` — the complete service-account JSON serialized as one secret value.
- optional `GOOGLE_DRIVE_FOLDER_ID` — database setting `document_google_drive_folder_id` takes priority when present.

For operational document storage, use a company-controlled/shared-drive folder and grant the service account access to that folder. Do not make application documents publicly link-accessible.

## Test Mode

When `document_test_mode=true`, the full website/admin document workflow can be tested without external provider credentials. Metadata is recorded with provider `test`, but uploaded file bytes are deliberately **not retained**.
