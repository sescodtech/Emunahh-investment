-- EMUNAHH-INVEST DATABASE STATE CHECK (031–035)
-- Safe read-only query. Run this FIRST if you are unsure which later migrations were executed.

select '031 baseline services/navigation' as check_item,
       case when (
         select count(*) from public.services
         where is_published=true
           and slug in ('education-financing','travel-financing','business-financing','personal-finance','investment-services')
       )=5 then 'PASS' else 'MISSING' end as status
union all
select '032 trust/governance content',
       case when exists(select 1 from public.cms_pages where slug='trust-security')
              and exists(select 1 from public.cms_pages where slug='disclosures')
            then 'PASS' else 'MISSING' end
union all
select '033 insights editorial system',
       case when to_regclass('public.blog_posts') is not null
              and to_regclass('public.blog_categories') is not null
              and to_regclass('public.blog_authors') is not null
            then 'PASS' else 'MISSING' end
union all
select '034 admin workflow + SEO',
       case when to_regprocedure('public.admin_update_application_workflow(uuid,text,uuid,text)') is not null
              and to_regprocedure('public.admin_get_seo_health()') is not null
              and exists(select 1 from information_schema.columns where table_schema='public' and table_name='site_settings' and column_name='default_seo_title')
            then 'PASS' else 'MISSING' end
union all
select '035 secure document storage controls',
       case when to_regprocedure('public.get_public_document_upload_config()') is not null
              and exists(select 1 from information_schema.columns where table_schema='public' and table_name='site_settings' and column_name='document_storage_provider')
              and exists(select 1 from information_schema.columns where table_schema='public' and table_name='application_documents' and column_name='provider_file_id')
            then 'PASS' else 'MISSING' end;
