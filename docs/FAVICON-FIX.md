# Browser Tab / Favicon Fix

Added static Emunahh-Invest browser icon assets:
- `public/favicon.svg`
- `public/favicon-32x32.png`
- `public/apple-touch-icon.png`

`index.html` now declares SVG, PNG, shortcut icon, and Apple touch icon links so the brand mark is available before React/Supabase content loads.

If an older favicon remains after deployment, hard-refresh the browser or clear the site's cached favicon once; browsers cache favicons aggressively.
