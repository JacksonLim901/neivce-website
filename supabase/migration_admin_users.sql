-- Migration: introduce admin_users and tighten write access
-- Run this in the Supabase SQL editor AFTER schema.sql has already been run.
--
-- Why: once public visitor registration is enabled, "authenticated" no
-- longer means "admin" — any registered visitor is authenticated. The
-- original policies allowed any authenticated user to edit site content.
-- This migration restricts writes to users listed in admin_users only.

create table if not exists admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table admin_users enable row level security;

-- A user may check whether *their own* id is in this table (needed so the
-- RLS checks on site_settings/services below can evaluate correctly).
create policy "Users can check their own admin_users row"
  on admin_users for select
  using (auth.uid() = id);

-- Replace the old "any authenticated user" update policies with ones that
-- only allow users listed in admin_users.
drop policy if exists "Authenticated can update site_settings" on site_settings;
create policy "Admins can update site_settings"
  on site_settings for update
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

drop policy if exists "Authenticated can update services" on services;
create policy "Admins can update services"
  on services for update
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

-- Add your existing admin account to admin_users so it keeps working.
-- Replace the email below with the account you already log into /admin with.
insert into admin_users (id)
select id from auth.users where email = 'linweicheng747@gmail.com'
on conflict (id) do nothing;