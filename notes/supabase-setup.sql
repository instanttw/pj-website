-- Supabase setup for PrintJones dashboard

-- =====================================
-- Public catalog (readable by everyone)
-- =====================================
-- 0) Categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text default ''::text,
  icon text default ''::text,
  created_at timestamptz default now()
);

-- 1) Plugins (Products)
create table if not exists public.plugins (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  tagline text default ''::text,
  description text default ''::text,
  icon_url text default ''::text,
  category_id uuid references public.categories(id),
  price numeric default 0,
  version text default '1.0.0',
  wordpress_compatibility text default '',
  download_count int default 0,
  active_installations int default 0,
  rating numeric default 0,
  review_count int default 0,
  last_updated timestamptz default now(),
  documentation_url text default '',
  features jsonb default '[]'::jsonb,
  screenshots jsonb default '[]'::jsonb,
  changelog jsonb default '[]'::jsonb,
  faq jsonb default '[]'::jsonb,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2) Plugin pricing
create table if not exists public.plugin_pricing (
  id uuid primary key default gen_random_uuid(),
  plugin_id uuid references public.plugins(id) on delete cascade,
  name text not null,
  price numeric not null,
  billing_period text default 'lifetime',
  features jsonb default '[]'::jsonb,
  site_limit int default 1,
  is_popular boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- RLS for public catalog (read-only anon)
alter table public.categories enable row level security;
alter table public.plugins enable row level security;
alter table public.plugin_pricing enable row level security;

create policy if not exists "categories_read_anon" on public.categories
  for select using (true);
create policy if not exists "plugins_read_anon" on public.plugins
  for select using (is_active = true);
create policy if not exists "pricing_read_anon" on public.plugin_pricing
  for select using (true);

-- =====================================
-- Account-owned tables (licenses, support)
-- =====================================
-- 3) Licenses
create table if not exists public.licenses (
  id uuid primary key default gen_random_uuid(),
  license_key text not null unique,
  plugin_id uuid references public.plugins(id),
  pricing_id uuid references public.plugin_pricing(id),
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

-- 4) Support tickets
create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_number text not null unique,
  user_id uuid not null,
  plugin_id uuid references public.plugins(id),
  license_id uuid references public.licenses(id),
  subject text not null,
  category text,
  priority text default 'Low',
  status text default 'Open',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table public.licenses enable row level security;
alter table public.support_tickets enable row level security;

create policy if not exists "licenses_select_own" on public.licenses
  for select using (auth.uid() = user_id);
create policy if not exists "support_select_own" on public.support_tickets
  for select using (auth.uid() = user_id);

create policy if not exists "licenses_insert_own" on public.licenses
  for insert with check (auth.uid() = user_id);
create policy if not exists "support_insert_own" on public.support_tickets
  for insert with check (auth.uid() = user_id);

create policy if not exists "licenses_update_own" on public.licenses
  for update using (auth.uid() = user_id);
create policy if not exists "support_update_own" on public.support_tickets
  for update using (auth.uid() = user_id);

-- =====================================
-- Orders / Invoices / Billing (owner-only)
-- =====================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  total_amount numeric not null default 0,
  status text not null default 'completed', -- completed|pending|refunded
  payment_method text default 'card',
  created_at timestamptz default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  user_id uuid not null,
  plugin_id uuid references public.plugins(id),
  pricing_id uuid references public.plugin_pricing(id),
  price numeric not null default 0,
  license_key text,
  created_at timestamptz default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  user_id uuid not null,
  invoice_number text not null unique,
  amount numeric not null,
  status text not null default 'paid', -- paid|pending|overdue
  issue_date date default now(),
  due_date date,
  pdf_url text,
  created_at timestamptz default now()
);

create table if not exists public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  brand text,
  last4 text,
  exp_month int,
  exp_year int,
  is_default boolean default false,
  created_at timestamptz default now()
);

-- RLS
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.invoices enable row level security;
alter table public.payment_methods enable row level security;

create policy if not exists "orders_select_own" on public.orders
  for select using (auth.uid() = user_id);
create policy if not exists "orders_insert_own" on public.orders
  for insert with check (auth.uid() = user_id);
create policy if not exists "orders_update_own" on public.orders
  for update using (auth.uid() = user_id);

create policy if not exists "order_items_select_own" on public.order_items
  for select using (auth.uid() = user_id);
create policy if not exists "order_items_insert_own" on public.order_items
  for insert with check (auth.uid() = user_id);

create policy if not exists "invoices_select_own" on public.invoices
  for select using (auth.uid() = user_id);
create policy if not exists "invoices_insert_own" on public.invoices
  for insert with check (auth.uid() = user_id);

create policy if not exists "pm_select_own" on public.payment_methods
  for select using (auth.uid() = user_id);
create policy if not exists "pm_insert_own" on public.payment_methods
  for insert with check (auth.uid() = user_id);

-- Note: enable extension pgcrypto (Database → Extensions) for gen_random_uuid().
