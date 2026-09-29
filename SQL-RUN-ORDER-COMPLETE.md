# Emunahh-Invest — Complete SQL Deployment Order

This is the cumulative database build for the Vite/React application.

## Run in this exact order

001_initial_schema.sql
002_admin_bootstrap.sql
003_cms_rbac_v2.sql
004_phase4_visual_cms_cloudinary.sql
005_phase5_applications_inbox_notifications.sql
006_phase6_super_admin_rbac.sql
007_phase8_forms_submission_hardening.sql
008_phase9_application_workflow_documents.sql
009_phase10_email_templates_and_production.sql
010_phase11_cloudinary_foundation.sql
011_phase12_media_library.sql
012_phase13_visual_cms.sql
013_phase14_publishing_preview.sql
014_phase15_authentication_hardening.sql
015_phase16_granular_rbac.sql
016_phase17_departments.sql
017_phase18_module_entitlements.sql
018_phase19_admin_users.sql
019_phase20_security_audit.sql
020_phase21_unified_access_resolver.sql
021_phase22_admin_dashboard.sql
022_phase23_security_center.sql
023_phase24_audit_center.sql
024_phase25_database_operations.sql
025_phase26_platform_operations.sql
026_full_visual_cms.sql
027_global_cms.sql
028_phase33_security_hardening.sql
029_phase34_performance.sql
030_phase35_testing_readiness.sql

## Phases 27–32
Those phases were primarily application/UI/routing/mobile/SEO/form implementation and do not have separate database migrations in the preserved phase package. Their frontend implementation is already included in the source tree.

## Phase 36
Phase 36 is final production integration/verification. It does not introduce a destructive database reset or another schema wipe.

## Important
- This project has NOT been deployed to GitHub from these cumulative phases yet.
- This SQL set is intended for the Supabase project that will back this final Vite application.
- Do not run only the last few SQL files on a fresh database.
- Do not delete/drop the CMS or application tables before running this sequence.
- Do not put SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, or Cloudinary API secrets in VITE_* variables.
