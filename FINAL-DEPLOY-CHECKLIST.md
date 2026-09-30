# Emunahh-Invest — Phase 5 Deployment Checklist

## Current release
This package includes the professional foundation, institutional homepage, canonical services architecture, and Phase 5 smart application/enquiry experience.

## Public structure
- Home
- About
- Services
- Blog
- Contact
- Client enquiry / application journey
- Public-safe reference tracking

## Canonical services
- Education Financing
- Travel Financing
- Business Financing
- Personal Finance
- Investment Services

## Phase 5 form checks
- `/apply?service=education-financing`
- `/apply?service=travel-financing`
- `/apply?service=business-financing`
- `/apply?service=personal-finance`
- `/apply?service=investment-services`
- Test country/region, international phone, preferred contact and currency fields.
- Test required service-specific questions.
- Confirm both privacy/accuracy confirmations are required.
- Confirm successful submission produces an `EMU-*` reference.
- Confirm `/apply` tracking displays only safe status metadata.
- Test `/contact` consent and service selection.

## Supabase
- Database state is already 001–031 complete.
- **Do not run another SQL file for Phase 5.**
- Confirm Vercel uses the same Supabase URL and browser-safe publishable/anon key as the live project.
- Edge Function/server secrets must remain in Supabase, never in `VITE_*` variables.

## Cloudinary
- Confirm `VITE_CLOUDINARY_CLOUD_NAME`.
- Confirm `VITE_CLOUDINARY_UPLOAD_PRESET`.
- Never expose the Cloudinary API secret to the browser.

## Build
Recommended production checks after dependencies are available:
1. `npm install`
2. `npm run lint`
3. `npm run test`
4. `npm run build`
5. Deploy to Vercel and test desktop/mobile application and contact workflows.

## Important
Historical SQL files remain in the repository for reference. Do not rerun them against the already-initialised live database.
