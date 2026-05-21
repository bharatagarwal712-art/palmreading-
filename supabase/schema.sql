create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists palm_readings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  palm_image_url text,
  palm_preview text,
  emotional_pattern text,
  thinking_style text,
  energy_signature text,
  raw_analysis jsonb,
  created_at timestamptz default now()
);

create table if not exists ai_messages (
  id uuid primary key default uuid_generate_v4(),
  reading_id uuid references palm_readings(id) on delete cascade,
  role text not null,
  content text not null,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table palm_readings enable row level security;
alter table ai_messages enable row level security;

create policy "Users can view own profile"
on profiles
for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on profiles
for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on profiles
for update
using (auth.uid() = id);

create policy "Users can manage own readings"
on palm_readings
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can manage own ai messages"
on ai_messages
for all
using (
  exists (
    select 1
    from palm_readings
    where palm_readings.id = ai_messages.reading_id
    and palm_readings.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from palm_readings
    where palm_readings.id = ai_messages.reading_id
    and palm_readings.user_id = auth.uid()
  )
);
