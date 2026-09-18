-- Migration: contact form enquiries
-- Run this in the Supabase SQL editor.

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table enquiries enable row level security;

-- Anyone (including visitors who are not logged in) can submit an
-- enquiry — this is what lets the public Contact form work.
create policy "Public can submit enquiries"
  on enquiries for insert
  with check (true);

-- Only admin accounts can read submitted enquiries — visitors' messages
-- are private, not publicly listable.
create policy "Admins can view enquiries"
  on enquiries for select
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));
