# Emunahh-Invest — Phase 8 & 9 Implementation

## Phase 8 — Admin Professionalisation

Implemented on top of the Phase 7 source and the existing Supabase RBAC foundation.

### Admin shell and navigation
- Admin modules now have stable routes such as `/admin/applications`, `/admin/content`, `/admin/users`, `/admin/roles`, and `/admin/settings`.
- Sidebar visibility is resolved from `admin_get_access_v2()` and respects global/per-user module access.
- Mobile admin navigation now uses an accessible drawer/overlay.
- Added public-site shortcut from the management header.
- Admin toast messages use a status live region.

### Applications and contact operations
- Application status/assignment/decision-note changes now use the new audited `admin_update_application_workflow()` RPC.
- Reviewers can assign an application owner and capture a review/decision note before changing workflow status.
- Contact Inbox continues to use the controlled `admin_update_contact_message()` RPC.
- Existing application notes and applicant email workflow remain available.

### Users, departments, roles and modules
- User role/department changes now call `admin_assign_user()`.
- User enable/disable now calls `admin_set_user_status()`.
- Permission changes now call `admin_set_role_permission()`.
- Roles can be created/edited/deleted using protected RBAC RPCs.
- Departments can be created/edited/disabled from the admin.
- Global platform modules can be enabled/disabled via `admin_set_module_status()`.
- System roles remain protected by the database.

### CMS and publishing
- Page publishing/unpublishing uses `cms_publish_page()` / `cms_unpublish_page()` rather than only changing the status field directly.
- CMS page SEO health summary shows published pages, missing titles/descriptions/canonicals and noindex pages.
- Existing section revisions remain preserved before section changes.

### Media
- Media Library now supports title, alt text, caption, category, folder and archive state.
- Media URL can be copied directly for use in CMS/service fields.
- Images use accessible alt text in the management preview.

### Settings
- Replaced the raw database-field editor with structured sections:
  - Brand & public identity
  - Client contact
  - Email & notifications
  - Media delivery
  - SEO & social defaults

## Phase 9 — SEO, Accessibility & Performance

### Metadata
- Added route-aware metadata for public pages and service detail pages.
- CMS SEO title, description, canonical, robots and Open Graph image now drive live document metadata.
- Added Twitter metadata.
- Article pages retain article-specific metadata and now use `og:type=article`.
- Added Organization JSON-LD site-wide and Article JSON-LD on insight detail pages.
- Added site-wide SEO defaults in `site_settings`.

### Crawlability
- Added `/robots.txt`.
- Added core-route `/sitemap.xml`.
- Admin routes are disallowed in robots and receive `noindex,nofollow` route metadata.

### Accessibility
- Preserved skip-to-content navigation.
- Added route-change live announcements.
- Main content receives programmatic focus after navigation.
- Admin navigation has explicit accessible labels/states.
- Media management encourages and stores alt text.
- Existing reduced-motion support remains active.

### Performance
- Public routes remain lazy-loaded through React.lazy.
- Added immutable caching for Vite `/assets/*` on Vercel.
- Added async image decoding and explicit eager/high-priority loading for key hero imagery.
- Vite build keeps CSS code splitting, small asset inline threshold and production source maps disabled.

## Database
A new non-destructive migration is included:

`supabase/034_phase8_9_admin_seo_professionalisation.sql`

It adds:
- controlled application workflow RPC;
- site-wide SEO/social default settings columns;
- protected admin SEO-health RPC.

Do not rerun migrations 001–033.
