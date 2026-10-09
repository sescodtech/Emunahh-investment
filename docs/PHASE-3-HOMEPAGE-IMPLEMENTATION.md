# Emunahh-Invest — Phase 3 Homepage Rebuild

## Objective
Replace the generic CMS-block homepage presentation with an institutional financial-services homepage while retaining Supabase CMS control and the Phase 0–2 global design system.

## Implemented
- Dedicated `InstitutionalHomePage` route for `/`.
- CMS-driven hero, trust principles, approach, process, reasons-to-work-with-us and closing CTA.
- Five canonical service pathways shown consistently:
  - Education Financing
  - Travel Financing
  - Business Financing
  - Personal Finance
  - Investment Services
- Editorial solutions presentation instead of repeated generic rounded cards.
- Institutional hero with one primary CTA and one restrained secondary CTA.
- General-information/approval disclaimer beneath the hero CTA.
- Professional credibility strip without invented AUM, awards, returns or customer counts.
- Dark editorial "Our Approach" section.
- Four-stage relationship/process section.
- Insights preview linked to `/blog` until the Phase 7 CMS article system is built.
- Strong closing relationship CTA.
- Defensive sanitisation of stale legacy location-specific CMS copy on the homepage.
- Broken CMS image fallbacks retained.
- Responsive desktop/tablet/mobile behaviour.

## CMS behaviour
The homepage still reads from the existing published `home` CMS page and its section keys:
- `hero`
- `trust`
- `intro`
- `process`
- `why`
- `cta`
- optional future `insights`

The service catalogue continues to read from the `services` table.

## Database
No SQL migration is required for Phase 3. Existing SQL 001–031 remains unchanged.

## Deferred intentionally
- Service detail architecture — Phase 4.
- Service-specific multi-step applications — Phase 5.
- Blog CMS/articles — Phase 7.
- Dynamic document-head SEO wiring — Phase 9.
