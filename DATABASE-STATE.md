# Database State — Phase 5 Baseline

The live Supabase database has already successfully completed migrations **001–031**, including the repaired 004–005 baseline and the reconciled 006–031 master.

## Phase 5
Phase 5 requires **no new SQL migration**.

The smart application experience uses the existing schema:
- `applications.service_id`
- `applications.details` JSONB
- `applications.consent_at`
- `applications.source`
- existing public-safe `track_application()` RPC
- existing contact-message fields and controlled contact workflow RPC

Travel Financing remains compatible with the legacy `application_type` constraint by using `general_enquiry` internally while preserving the actual service as `service_slug = travel-financing`, `service_label = Travel Financing`, and the related service record ID.

## Important
Do **not** rerun historical SQL 001–031 on the current live database.

`supabase/EMUNAHH_MASTER_006-031_RECONCILED_V2_SUCCESSFUL.sql` and other historical migration files are retained only as deployment history/reference.
