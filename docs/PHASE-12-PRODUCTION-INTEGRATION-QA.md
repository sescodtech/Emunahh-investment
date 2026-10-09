# Phase 12 — Production Integration and Final QA

## Objective
Phase 12 is the final core production-readiness phase for the Emunahh-Invest website and admin platform. It focuses on validating the complete system, configuring production integrations, and resolving launch defects without introducing unnecessary new feature scope.

## Current Database State
The project remains on migrations 001 through 036. No Phase 12 database migration is required for the current production audit package.

## Phase 12 Workstreams

### 1. Admin persistence and CMS verification
Verify Create / Save / Refresh / Reopen behavior for:
- Site Settings
- Website CMS
- Services
- Gallery
- Testimonials
- Insights and Blog
- Media Library
- Users and Staff
- Roles and Permissions

The Phase 11 REV2 persistence hotfix refreshes the public site context after admin saves and verifies that Site Settings updates actually affect a database row.

### 2. Admin navigation responsiveness
The sidebar is expected to use a fixed header/footer and independently scrolling navigation region so menu items do not overlap Sign out on short laptop screens.

### 3. Application workflow QA
Test all five service journeys:
- Education Financing
- Travel Financing
- Business Financing
- Personal Finance
- Investment Services

Validate submission, reference generation, application record creation, admin review, status changes, tracking, and selected notifications.

### 4. Transactional email
Deploy and configure the existing Edge Functions and Resend credentials. Validate application acknowledgement and configured status-driven transactional messages.

### 5. Secure documents
Validate the post-application secure document flow and provider configuration. Cloudinary can be used for secure server-side document handling. Google Drive production mode should use OAuth for the client's normal Gmail account rather than a service-account-only design.

### 6. Gallery and testimonials
Validate create, edit, publish, archive, homepage visibility, image handling, ordering, alt text, testimonial consent, and public rendering.

### 7. SEO and Google Search readiness
Validate unique metadata, canonicals, robots, sitemap, Open Graph metadata, structured data, Search Console verification, and sitemap submission after live deployment.

### 8. Responsive and browser QA
Validate desktop, short-height laptop, tablet, and mobile layouts. Test current Chrome and Edge behavior, menu/drawer behavior, forms, admin tables, modals/drawers, and error states.

### 9. Security and access QA
Validate role/module access, admin guards, storage access, public/private data boundaries, Edge Function secret placement, and absence of sensitive credentials in VITE-prefixed environment variables.

### 10. Final release
Complete live smoke testing, record any launch defects, resolve blocking issues, and create the final production master package.

## Production Secrets / Configuration
Expected secure backend values include:
- SUPABASE_SERVICE_ROLE_KEY
- RESEND_API_KEY
- RESEND_FROM_EMAIL
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

Future personal-Gmail Google Drive OAuth configuration can use:
- GOOGLE_DRIVE_CLIENT_ID
- GOOGLE_DRIVE_CLIENT_SECRET
- GOOGLE_DRIVE_REFRESH_TOKEN

Do not expose private secrets through VITE-prefixed frontend environment variables.

## Release Rule
Do not rerun migrations 001 through 036 for an already-upgraded database. Phase 12 is primarily configuration and QA unless a newly discovered defect genuinely requires a new migration.
