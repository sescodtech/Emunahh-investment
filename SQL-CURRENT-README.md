# SQL files in the current package

## For the current live database
Start with the read-only checker:
- `supabase/SQL_STATE_CHECK_031-035.sql`

Then run only migrations reported as MISSING, in order:
- `032_phase6_trust_governance_content.sql`
- `033_phase7_insights_editorial_system.sql`
- `034_phase8_9_admin_seo_professionalisation.sql`
- `035_document_storage_controls.sql`

If the checker shows **032, 033, 034 and 035 are all MISSING**, you may run the convenience catch-up file:
- `supabase/EMUNAHH_POST_031_MASTER_032-035.sql`

Do not use the catch-up file when some of 032–035 already show PASS.

## Full SQL for a new/empty Supabase project
- `supabase/EMUNAHH_FULL_DATABASE_001-035_FRESH_INSTALL.sql`

This full file is for a FRESH project only. It must not be run over the current live database.

## Document storage
Migration 035 adds only non-secret configuration and provider metadata. Provider credentials remain Supabase Edge Function secrets.
