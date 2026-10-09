# Emunahh-Invest — Phase 0, Phase 1 & Phase 2 Implementation

## Phase 0 — Stabilise & Audit

Completed:
- Kept the successful Supabase 001–031 database unchanged.
- Confirmed the public application remains Vite + React + TypeScript.
- Removed unused Express/Dotenv runtime dependencies from the frontend package.
- Removed the unused global application-modal mount from the active route shell; `/apply` remains the canonical enquiry/application entry point.
- Centralised primary, solution, company and legal navigation in `src/config/siteNavigation.ts`.
- Added route scroll/hash behaviour so page navigation starts correctly and service anchors can be used reliably.
- Added a keyboard-accessible skip-to-content link and stronger global focus treatment.
- Preserved all existing CMS, Supabase, RBAC, media and admin foundations.

## Phase 1 — Brand Identity & Design System

Implemented a restrained financial-services UI foundation:
- Official brand navy remains the primary identity colour.
- Red is now a selective action/accent colour rather than a general decoration colour.
- Removed mint as a dominant UI colour from the global design layer.
- Added institutional neutral surfaces, border colours and text hierarchy.
- Added a consistent spacing/container system.
- Added reusable primary/secondary button, card, eyebrow and copy styles.
- Improved typography scale, legibility, focus visibility and motion-reduction behaviour.
- Refined the logo lock-up and reduced visual noise in the subtitle treatment.

## Phase 2 — Global Header, Footer & Navigation

Completed:
- Rebuilt the desktop header into a professional two-level institutional header.
- Main public navigation remains: Home, About, Services, Insights, Contact.
- Added a structured Services dropdown showing the five canonical services.
- Added a clean client-enquiry CTA and company email utility link.
- Rebuilt mobile navigation with a dedicated Services disclosure and clear enquiry action.
- Rebuilt the footer into four clean areas: brand, solutions, company and get started.
- Removed public footer clutter such as admin access, local office emphasis and operational desk labels.
- Added general financial/investment information language to the footer without making unsupported regulatory claims.
- Reworked the floating WhatsApp support component to use live CMS/settings data rather than a hard-coded number.
- Removed location-specific language, fake online-status signals and local desk wording from WhatsApp support.
- Updated WhatsApp service choices to the five canonical services.

## Deliberately not changed yet

The homepage content blocks and generic CMS visual renderer are Phase 3. Service detail architecture is Phase 4. Application forms and service-specific intake are Phase 5. This prevents Phase 0–2 from becoming another uncontrolled full-site rewrite.
