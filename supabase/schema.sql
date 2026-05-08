create extension if not exists pgcrypto;

create type restaurant_status as enum ('open', 'moved', 'closed', 'unknown', 'needs_verification');
create type candidate_status as enum ('pending', 'approved', 'rejected');

create table if not exists public.episodes (
  id uuid primary key default gen_random_uuid(),
  episode_no integer not null unique,
  title text not null,
  area text not null,
  youtube_url text not null,
  published_at date not null,
  raw_description text,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  road_address text not null,
  lat double precision not null,
  lng double precision not null,
  category text not null,
  main_menu text not null,
  map_url text not null,
  status restaurant_status not null default 'unknown',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appearances (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  episode_id uuid not null references public.episodes(id) on delete cascade,
  selected_label text not null,
  note text,
  created_at timestamptz not null default now(),
  unique (restaurant_id, episode_id)
);

create table if not exists public.restaurant_candidates (
  id uuid primary key default gen_random_uuid(),
  episode_id uuid not null references public.episodes(id) on delete cascade,
  extracted_name text not null,
  extracted_area text not null,
  extracted_menu text not null,
  matched_place_name text not null,
  matched_address text not null,
  lat double precision not null,
  lng double precision not null,
  map_url text not null,
  confidence numeric(4, 3) not null check (confidence >= 0 and confidence <= 1),
  status candidate_status not null default 'pending',
  raw_source text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.episodes enable row level security;
alter table public.restaurants enable row level security;
alter table public.appearances enable row level security;
alter table public.restaurant_candidates enable row level security;

create policy "Public can read episodes"
  on public.episodes for select
  using (true);

create policy "Public can read restaurants"
  on public.restaurants for select
  using (true);

create policy "Public can read appearances"
  on public.appearances for select
  using (true);

create policy "Public can read candidates"
  on public.restaurant_candidates for select
  using (true);
