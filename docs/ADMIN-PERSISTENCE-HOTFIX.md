# Emunahh Invest Admin Persistence Hotfix

This revision fixes Admin changes that could appear saved while the public website continued using previously loaded content.

## Fixes

1. Site Settings saves now request the updated database row back from Supabase.
2. If no row is actually updated, the Admin shows an error instead of a false success message.
3. Successful Site Settings saves immediately refresh the shared public ContentContext.
4. CMS page and section saves immediately refresh shared public content.
5. Service saves immediately refresh shared public content.
6. A browser content revision event allows another open tab to refresh dynamic content after an Admin save.
7. Admin sidebar now uses a fixed header and footer with an independently scrollable navigation area, preventing Audit Trail, Site Settings and Sign out from overlapping on shorter laptop screens.

## Database

No SQL migration is required. Database state remains 001 through 036.

## Deployment

Replace the current Phase 11 source with this full package, push to GitHub and redeploy on Vercel.
