# Emunahh-Invest Final Correction Release

## Public structure
- Home
- About
- Services
- Blog
- Contact
- Start an enquiry CTA

Education financing, travel financing, business financing, personal finance and investment services are service catalogue items under **Services**. They are not top-level navigation items.

## Footer
The footer no longer displays Institutional Governance & Disclosures. Privacy Policy and Terms remain clearly accessible.

## Images
The frontend keeps local lightweight fallback assets and accepts CMS/Cloudinary URLs. Broken CMS image URLs automatically fall back to a bundled image instead of leaving an empty image block.

## SQL
For a brand-new Supabase database, use:
`supabase/EMUNAHH_FINAL_MASTER_SQL.sql`

For a database where the previous cumulative migrations have already been executed, use only:
`supabase/migrations/031_final_brand_navigation_services.sql`

Do NOT blindly rerun the complete historical migration chain against an already-initialized database.
