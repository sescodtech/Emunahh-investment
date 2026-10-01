# Phase 6 — Trust, Company Profile, Governance & Content

Phase 6 moves the public website from generic corporate copy to a more institutional financial-services trust architecture.

## Public experience

### About
`/about` now uses a dedicated institutional page rather than the old generic CMS renderer. It includes:
- company positioning;
- role and approach;
- service standards;
- client-journey process;
- governance principles;
- mission and direction;
- links to Trust & Security and the enquiry flow.

CMS content is used where suitable. Legacy regional marketing copy is filtered so old CMS seeds cannot reappear publicly.

### Trust & Security
New route:
`/trust-security`

Covers:
- independent verification;
- protection of passwords/PINs/one-time codes;
- suspicious payment/instruction handling;
- impersonation awareness;
- reporting unusual requests through published channels.

A compatibility redirect is provided from `/security`.

### Disclosures
New route:
`/disclosures`

Covers:
- general-information status;
- no automatic approval/offer;
- investment risk language;
- website accuracy/availability limitations;
- precedence of formal transaction/service documents.

### Privacy and Terms
`/privacy` and `/terms` now use dedicated legal-document layouts with:
- clear legal-document hierarchy;
- on-page navigation;
- readable long-form spacing;
- contact route for questions;
- links to disclosures and security guidance.

Compatibility redirects remain for `/privacy-policy` and `/terms-of-service`.

## CMS
Migration 032 registers the new Trust & Security and Disclosures pages in `cms_pages` / `cms_sections`, and refreshes About, Privacy and Terms content so the admin CMS remains the content-management source rather than a disconnected static website.

## Brand cleanup
- Removed the unused legacy generic public CMS renderer.
- Removed unused old bundled image assets.
- Renamed remaining bundled fallback assets to neutral institutional names.
- No regional marketing wording is displayed by the active Phase 6 public pages.
- No licence, regulator, AUM, client-count, return, award or partnership claim was invented.

## Database
Run only:
`supabase/032_phase6_trust_governance_content.sql`

Do not rerun 001–031.
