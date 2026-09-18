-- Migration: allow admins to delete enquiries
-- Run this in the Supabase SQL editor (after migration_enquiries.sql).

create policy "Admins can delete enquiries"
  on enquiries for delete
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));
