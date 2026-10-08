-- READ ONLY: Phase 11 / migration 036 status
select '036 gallery + testimonials + advanced SEO' as check_item,
       case when
         to_regclass('public.gallery_categories') is not null and
         to_regclass('public.gallery_items') is not null and
         to_regclass('public.testimonials') is not null and
         exists(select 1 from information_schema.columns where table_schema='public' and table_name='site_settings' and column_name='google_site_verification') and
         exists(select 1 from public.cms_pages where slug='gallery' and status='published') and
         exists(select 1 from public.cms_pages where slug='testimonials' and status='published')
       then 'PASS' else 'MISSING' end as status;
