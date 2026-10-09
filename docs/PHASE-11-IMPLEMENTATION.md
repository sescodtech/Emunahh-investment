# Phase 11 — Gallery, Testimonials & Advanced SEO

## Database baseline
The live database was confirmed through migration 035 before this phase.
Run only `supabase/036_gallery_testimonials_advanced_seo.sql` on the current live database.
Do not rerun 001–035.

## Gallery
- Public `/gallery` page with category filters and lightbox viewing.
- Admin `/admin/gallery` module.
- Cloudinary image upload.
- Title, caption, alt text, category, display order, featured flag, homepage flag and publish/archive status.
- Gallery categories are managed separately.
- Public RLS exposes only published gallery records.

## Testimonials
- Public `/testimonials` page.
- Admin `/admin/testimonials` module.
- Customer image upload through Cloudinary.
- Customer name, role, company, service, review, optional rating, display order and homepage selection.
- Publication is blocked in the admin UI until client consent is confirmed.
- Public RLS exposes only published testimonials with consent confirmed.
- The public page includes a responsible disclaimer that testimonials do not guarantee outcomes.

## Homepage integration
- Gallery and testimonial homepage sections read live published records.
- Each section can be enabled/disabled in Admin → Site Settings.
- Homepage gallery/testimonial headings remain editable through Home CMS sections.

## Advanced SEO
- Gallery and Testimonials are registered as published CMS pages with unique SEO titles, descriptions and canonical URLs.
- Both routes are included in sitemap generation.
- Google Search Console verification token can be stored from Admin → Site Settings.
- `google-site-verification` meta is added dynamically when configured.
- Organization structured data is expanded to an Organization + WebSite graph.
- Gallery image alt text is required in Admin before saving.
- Per-page SEO continues to be managed from Website CMS: title, description, canonical, robots and Open Graph image.

## Navigation
The main header remains intentionally compact. Gallery and Testimonials are discoverable through homepage sections and Company/footer navigation instead of overcrowding the primary navigation.

## Styling correction
The decorative eyebrow line is removed only from the homepage `WHO WE ARE` block using `.no-eyebrow-line`; other section eyebrow treatments remain unchanged.
