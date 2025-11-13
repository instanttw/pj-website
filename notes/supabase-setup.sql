-- Supabase setup for PrintJones dashboard
-- 1) Create licenses table (if not exists)
create table if not exists public.licenses (
  id uuid primary key default gen_random_uuid(),
  license_key text not null unique,
  plugin_id uuid not null,
  pricing_id uuid,
  user_id uuid not null,
  status text not null default 'active',
  purchase_date timestamptz default now(),
  expiration_date timestamptz,
  activations_used int default 0,
  activations_limit int default 0,
  activated_domains jsonb default '[]'::jsonb,
  order_id uuid,
  created_at timestamptz default now()
);

-- 2) Create support_tickets table (if not exists)
create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_number text not null unique,
  user_id uuid not null,
  plugin_id uuid,
  license_id uuid,
  subject text not null,
  category text,
  priority text default 'Low',
  status text default 'Open',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3) Enable RLS
alter table public.licenses enable row level security;
alter table public.support_tickets enable row level security;

-- 4) Policies: user can view their own rows
create policy if not exists "licenses_select_own" on public.licenses
  for select using (auth.uid() = user_id);

create policy if not exists "support_select_own" on public.support_tickets
  for select using (auth.uid() = user_id);

-- 5) Policies: user can insert their own rows
create policy if not exists "licenses_insert_own" on public.licenses
  for insert with check (auth.uid() = user_id);

create policy if not exists "support_insert_own" on public.support_tickets
  for insert with check (auth.uid() = user_id);

-- 6) Policies: user can update their own rows (optional)
create policy if not exists "licenses_update_own" on public.licenses
  for update using (auth.uid() = user_id);

create policy if not exists "support_update_own" on public.support_tickets
  for update using (auth.uid() = user_id);

-- Note: ensure Postgres extension pgcrypto or uuid-ossp is enabled for gen_random_uuid().
-- In Supabase: Database → Extensions → enable pgcrypto.
