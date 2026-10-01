# Emunahh-Invest — Current SQL run order

The last database state explicitly confirmed successful in this conversation is migration 031.

## Current live database: verify first
Run the read-only checker:

`supabase/SQL_STATE_CHECK_031-035.sql`

Then run only rows reported `MISSING`, in this order:

1. `032_phase6_trust_governance_content.sql`
2. `033_phase7_insights_editorial_system.sql`
3. `034_phase8_9_admin_seo_professionalisation.sql`
4. `035_document_storage_controls.sql`

If **032, 033, 034 and 035 are ALL MISSING**, you may instead run:

`supabase/EMUNAHH_POST_031_MASTER_032-035.sql`

Do not use the combined catch-up file when one or more later migrations already show PASS.

## Fresh/empty project only
For a brand-new Supabase project, use:

`supabase/EMUNAHH_FULL_DATABASE_001-035_FRESH_INSTALL.sql`

Never run the fresh-install master over the current live database.
