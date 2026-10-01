# Phase 10 — End-to-End QA & Launch Readiness

## Scope completed

### Full-package verification
- Verified the project package contains the complete Vite source tree, public files, assets, Supabase migrations/functions, configuration and deployment documentation.
- `node_modules`, `.git` and generated `dist` are intentionally excluded from deployment-source ZIPs.

### Professional client intake
- Strengthened all five service journeys with first-stage review information appropriate to each service.
- Education Financing: applicant role, provider/programme, study location, programme/fee timing and repayment profile.
- Travel Financing: purpose, destination, departure/return timing, travel stage, cost scope and repayment profile.
- Business Financing: business identity, registration jurisdiction, sector, operating history, purpose, turnover, repayment source and timing.
- Personal Finance: purpose, employment/income profile, employer/business, income range, repayment source and timing.
- Investment Services: client type, objective, horizon, experience, liquidity expectations and general source of funds.
- Indicative amount/currency is now required, with an explicit other-currency field.
- Review step now displays the service-specific answers rather than only common contact fields.
- Supporting documents remain out of the public form and can be requested securely during review.

### Submission reliability
- Public references now prefer the server-side `new_reference()` RPC and fall back safely if unavailable.
- Added `notify-new-submission` Edge Function.
- New applications/contact messages trigger a company notification and, when an email is supplied, a receipt acknowledgement.
- Notification claiming prevents repeat messages; a provider failure resets the claim so a retry remains possible.
- Public submission success is not lost merely because an email provider notification fails.

### Staff workflow
- Application details in Admin are rendered as structured fields rather than raw JSON.
- Existing audited 034 workflow RPC remains the source of truth for status/assignment decisions.
- `send-email` now checks the existing permission model instead of relying only on profile role text.

### SEO / build readiness
- Build-time sitemap generation now includes current published/scheduled-live Insights articles when Supabase environment variables are available.
- Core routes remain present even when the editorial fetch is unavailable during a local build.

### Database-state safety
- Added `supabase/SQL_STATE_CHECK_031-035.sql`.
- Added `supabase/EMUNAHH_POST_031_MASTER_032-035.sql` for the specific case where all four later migrations are missing.
- Added `supabase/EMUNAHH_FULL_DATABASE_001-035_FRESH_INSTALL.sql` for a new/empty Supabase project only.
- Phase 10 itself introduces no new database migration.
