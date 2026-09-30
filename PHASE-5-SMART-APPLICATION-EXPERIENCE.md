# Phase 5 — Smart Application & Enquiry Experience

## Implemented
- Replaced the legacy one-size-fits-all application form with a four-stage intake journey.
- Added five canonical service journeys: Education, Travel, Business, Personal Finance and Investment Services.
- Added service-specific questions and dynamic validation.
- Added country/region, international phone format, preferred contact method and multi-currency indicative amount fields.
- Added privacy consent and accuracy confirmation before submission.
- Preserved the existing `applications` table by storing service-specific data in `details` JSONB.
- Maps Travel Financing safely to the existing `general_enquiry` application type while retaining `service_slug=travel-financing` in JSONB and `service_id` when available.
- Corrected public tracking to display only fields returned by the public-safe `track_application()` RPC.
- Rebuilt the public contact form around the same five canonical services with country/region and privacy consent.
- Removed local-format examples and local-market wording from the active intake experience.

## Database
No new schema migration is required for this phase. Database remains at successful 001–031 state.

## Security / privacy
- Public tracking does not expose applicant name, email, phone, amount or institution/business data.
- Public forms explicitly warn against sending passwords, card details, authentication codes or unnecessary sensitive documents.
- Supporting documents remain part of later controlled review workflows rather than the initial public intake.
