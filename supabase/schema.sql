-- NEIVCE Trading PLT — database schema
-- Run this once in the Supabase SQL editor for your project.

create extension if not exists "pgcrypto";

-- Single-row table holding the editable site-wide content.
create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  company_name text not null default 'NEIVCE Trading PLT',
  introduction text not null default '',
  announcement text not null default '',
  phone text not null default '',
  address text not null default '',
  updated_at timestamptz not null default now()
);

-- The three services shown on the Services page.
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  display_order int not null default 0,
  updated_at timestamptz not null default now()
);

-- Keep updated_at current on every edit.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists site_settings_set_updated_at on site_settings;
create trigger site_settings_set_updated_at
before update on site_settings
for each row execute function set_updated_at();

drop trigger if exists services_set_updated_at on services;
create trigger services_set_updated_at
before update on services
for each row execute function set_updated_at();

-- Accounts allowed to edit site content. Distinct from auth.users because
-- once public visitor registration exists, "authenticated" no longer
-- implies "admin" — only ids listed here may write to site_settings/services.
create table if not exists admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Row Level Security: anyone can read (public website), only accounts
-- listed in admin_users can write.
alter table site_settings enable row level security;
alter table services enable row level security;
alter table admin_users enable row level security;

create policy "Public can read site_settings"
  on site_settings for select
  using (true);

create policy "Admins can update site_settings"
  on site_settings for update
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

create policy "Public can read services"
  on services for select
  using (true);

create policy "Admins can update services"
  on services for update
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

create policy "Users can check their own admin_users row"
  on admin_users for select
  using (auth.uid() = id);

-- Contact form submissions. Public can insert (submit the form);
-- only admin accounts can read them back.
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table enquiries enable row level security;

create policy "Public can submit enquiries"
  on enquiries for insert
  with check (true);

create policy "Admins can view enquiries"
  on enquiries for select
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

create policy "Admins can delete enquiries"
  on enquiries for delete
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

-- Seed the real company data (edit the placeholder text later from /admin).
insert into site_settings (company_name, introduction, announcement, phone, address)
values (
  'NEIVCE Trading PLT',
  'PLACEHOLDER — write the company introduction here from the admin panel.',
  'PLACEHOLDER — write a homepage announcement here from the admin panel.',
  '03-8737 8770',
  'B5 - B7, Block B, Jalan TKS 1, Taman Kajang Sentral, 43000 Kajang, Selangor'
);

insert into services (title, description, display_order) values
  ('E-commerce', 'PLACEHOLDER — describe the e-commerce service here from the admin panel.', 1),
  ('Computer Programming Services', 'PLACEHOLDER — describe the programming service here from the admin panel.', 2),
  ('Computer Training', 'PLACEHOLDER — describe the training service here from the admin panel.', 3);
