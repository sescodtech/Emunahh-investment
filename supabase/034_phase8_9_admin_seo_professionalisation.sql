-- EMUNAHH-INVEST
-- Phase 8 + 9: Admin professionalisation + SEO/platform metadata
-- Run AFTER 033_phase7_insights_editorial_system.sql
-- Non-destructive. Does not rerun or replace migrations 001-033.

begin;

-- -----------------------------------------------------------------------------
-- PHASE 8: controlled application workflow mutation
-- -----------------------------------------------------------------------------
create or replace function public.admin_update_application_workflow(
  target_id uuid,
  new_status text,
  new_assignee uuid default null,
  reason text default null
)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  actor uuid:=auth.uid();
  old_status text;
  old_assignee uuid;
begin
  if actor is null or not public.has_permission('applications.update') then
    raise exception 'Application update permission required.';
  end if;

  if new_status not in ('NEW','REVIEWING','CONTACTED','PROCESSING','COMPLETED','DECLINED','CLOSED') then
    raise exception 'Invalid application status.';
  end if;

  select status,assigned_to into old_status,old_assignee
  from public.applications where id=target_id;
  if not found then raise exception 'Application not found.'; end if;

  update public.applications
  set status=new_status,
      assigned_to=new_assignee,
      reviewed_at=case when new_status in ('REVIEWING','CONTACTED','PROCESSING','COMPLETED','DECLINED','CLOSED')
                       then coalesce(reviewed_at,now()) else reviewed_at end,
      reviewed_by=case when new_status in ('REVIEWING','CONTACTED','PROCESSING','COMPLETED','DECLINED','CLOSED')
                       then coalesce(reviewed_by,actor) else reviewed_by end,
      decision_at=case when new_status in ('COMPLETED','DECLINED','CLOSED') then now() else decision_at end,
      decision_by=case when new_status in ('COMPLETED','DECLINED','CLOSED') then actor else decision_by end,
      decision_reason=case when reason is not null and length(trim(reason))>0 then trim(reason) else decision_reason end
  where id=target_id;

  insert into public.audit_logs(actor_id,action,entity_type,entity_id,metadata)
  values(actor,'APPLICATION_WORKFLOW_UPDATED','application',target_id::text,
    jsonb_build_object('from_status',old_status,'to_status',new_status,'from_assignee',old_assignee,'to_assignee',new_assignee,'reason',reason));

  return jsonb_build_object('success',true,'status',new_status);
end $$;

revoke all on function public.admin_update_application_workflow(uuid,text,uuid,text) from public;
grant execute on function public.admin_update_application_workflow(uuid,text,uuid,text) to authenticated;

-- -----------------------------------------------------------------------------
-- PHASE 9: site-wide SEO defaults / social metadata
-- -----------------------------------------------------------------------------
alter table public.site_settings add column if not exists default_seo_title text;
alter table public.site_settings add column if not exists default_seo_description text;
alter table public.site_settings add column if not exists default_og_image_url text;
alter table public.site_settings add column if not exists social_linkedin_url text;
alter table public.site_settings add column if not exists social_x_url text;

update public.site_settings
set default_seo_title=coalesce(nullif(default_seo_title,''),'Emunahh-Invest Limited | Structured Financial & Investment Solutions'),
    default_seo_description=coalesce(nullif(default_seo_description,''),'Structured financial and investment solutions with professional service, clear communication and responsible execution.')
where id=1;

-- Gives the admin a quick, permission-protected SEO/content quality snapshot.
create or replace function public.admin_get_seo_health()
returns jsonb
language plpgsql
stable
security definer
set search_path=public
as $$
declare
  total_pages integer;
  missing_title integer;
  missing_description integer;
  missing_canonical integer;
  noindex_pages integer;
begin
  if auth.uid() is null or not (public.has_permission('content.view') or public.has_permission('content.update')) then
    raise exception 'Content access required.';
  end if;

  select count(*) into total_pages from public.cms_pages where status='published';
  select count(*) into missing_title from public.cms_pages where status='published' and coalesce(trim(seo_title),'')='';
  select count(*) into missing_description from public.cms_pages where status='published' and coalesce(trim(seo_description),'')='';
  select count(*) into missing_canonical from public.cms_pages where status='published' and coalesce(trim(canonical_url),'')='';
  select count(*) into noindex_pages from public.cms_pages where status='published' and coalesce(robots,'index,follow') ilike '%noindex%';

  return jsonb_build_object(
    'published_pages',total_pages,
    'missing_seo_titles',missing_title,
    'missing_seo_descriptions',missing_description,
    'missing_canonicals',missing_canonical,
    'noindex_pages',noindex_pages
  );
end $$;

revoke all on function public.admin_get_seo_health() from public;
grant execute on function public.admin_get_seo_health() to authenticated;

-- -----------------------------------------------------------------------------
-- Validation
-- -----------------------------------------------------------------------------
do $$
begin
  if to_regprocedure('public.admin_update_application_workflow(uuid,text,uuid,text)') is null then
    raise exception 'Validation failed: application workflow RPC missing.';
  end if;
  if to_regprocedure('public.admin_get_seo_health()') is null then
    raise exception 'Validation failed: SEO health RPC missing.';
  end if;
  if not exists(select 1 from information_schema.columns where table_schema='public' and table_name='site_settings' and column_name='default_seo_title') then
    raise exception 'Validation failed: SEO settings columns missing.';
  end if;
end $$;

commit;

select 'Phase 8 controlled application workflow' as check_item,
       case when to_regprocedure('public.admin_update_application_workflow(uuid,text,uuid,text)') is not null then 'PASS' else 'FAIL' end as status
union all
select 'Phase 9 SEO defaults',
       case when exists(select 1 from information_schema.columns where table_schema='public' and table_name='site_settings' and column_name='default_seo_title') then 'PASS' else 'FAIL' end
union all
select 'Phase 9 SEO health RPC',
       case when to_regprocedure('public.admin_get_seo_health()') is not null then 'PASS' else 'FAIL' end;
