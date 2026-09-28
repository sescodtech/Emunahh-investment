-- Emunahh-Invest administrator role foundation.
-- This does NOT create a password or bypass Supabase Auth.
-- The administrator must first exist in auth.users.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'staff' check (role in ('admin','editor','staff')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- The existing profile RLS from the base migration allows a user to read their own row.
-- Server-side admin checks use the Supabase secret key and therefore do not depend on
-- exposing elevated access to the browser.

-- Safe helper for the one-time admin bootstrap. It only promotes an existing
-- Auth user and can only be executed by the database owner/service role.
create or replace function public.bootstrap_admin(target_email text)
returns uuid
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  target_id uuid;
begin
  select id into target_id
  from auth.users
  where lower(email) = lower(target_email)
  limit 1;

  if target_id is null then
    raise exception 'No Supabase Auth user exists for this email. Create the user in Authentication > Users first.';
  end if;

  insert into public.profiles (id, role)
  values (target_id, 'admin')
  on conflict (id) do update set role = 'admin', updated_at = now();

  return target_id;
end;
$$;
