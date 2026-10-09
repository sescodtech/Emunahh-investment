# Emunahh-Invest — Phase 4 Services Architecture

## Status
Implemented on top of the Phase 3 institutional homepage build.
No database migration is required for Phase 4. The live 001–031 Supabase schema remains unchanged.

## Canonical public service routes
- /services/education-financing
- /services/travel-financing
- /services/business-financing
- /services/personal-finance
- /services/investment-services

## Legacy route compatibility
The following existing URLs remain usable and redirect to the canonical service routes:
- /student-loans -> /services/education-financing
- /investments -> /services/investment-services
- /business-financing -> /services/business-financing
- /personal-finance -> /services/personal-finance
- /other-services -> /services

## Services hub rebuild
The previous two-column card grid was replaced with an institutional service catalogue. Each solution now shows:
- service number and icon
- service name and positioning
- concise description
- key service characteristics
- dedicated service-page link
- enquiry link

The page also includes a client guidance section explaining how to choose a service and a unified enquiry CTA.

## Dedicated service-page architecture
Every canonical service now uses the same professional information structure:
1. Service hero / positioning
2. At-a-glance summary
3. Who the service is for
4. What the service can support
5. Four-stage process
6. Key considerations before proceeding
7. Typical information / documentation requirements
8. Frequently asked questions
9. Important service disclosure
10. Enquiry / contact CTA

## CMS and Supabase integration
- The `services` table remains the live source for service title, tagline, description and bullets.
- Existing clean CMS hero/overview/features content can be reused on the matching service page.
- Legacy or location-specific CMS text is rejected by the service renderer and replaced with professional international-facing fallback copy.
- No existing service records or application relationships were changed.

## Travel Financing
Travel Financing is now a real dedicated public page instead of linking to a section anchor or generic fallback.

## Application bridge
Until Phase 5 rebuilds the full application flow, Phase 4 adds canonical-service query handling to `/apply` so service-page CTAs preselect the closest existing application category:
- Education -> student financing
- Investment -> investment
- Business -> business financing
- Personal -> personal finance
- Travel -> general/service enquiry

The current form copy was also neutralised so the service journey does not reintroduce location-specific marketing or a fixed currency assumption.

## Code cleanup
Removed obsolete standalone service-page source files that were no longer routed and contained old regional/product claims. The new service architecture is the single public source of truth.

## Validation performed
- TypeScript/TSX syntax transpile check across active source files: PASS
- Relative import existence check: PASS
- Canonical service navigation links checked: PASS
- Legacy URL redirects present: PASS
- No full dependency install/build claimed because package installation timed out in the execution environment.

## Next phase
Phase 5 should rebuild the application/enquiry experience itself into service-specific, multi-step forms with international phone/currency handling, service-specific data fields, consent/privacy controls and proper backend mapping.
