create extension if not exists pgcrypto;

create type public.subscription_plan as enum ('free', 'premium', 'pro', 'enterprise');
create type public.subscription_status as enum ('active', 'trialing', 'past_due', 'canceled', 'incomplete');
create type public.message_role as enum ('user', 'assistant', 'system', 'tool');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  theme text not null default 'system',
  accent_color text not null default 'emerald',
  language text not null default 'es',
  personalization jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.spaces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  icon text,
  color text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  space_id uuid references public.spaces(id) on delete set null,
  title text not null default 'Nueva conversación',
  model text not null default 'gpt-4.1-mini',
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references public.chats(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.message_role not null,
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  category text not null default 'general',
  importance smallint not null default 3 check (importance between 1 and 5),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan public.subscription_plan not null default 'free',
  status public.subscription_status not null default 'active',
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.usage_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  model text,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  cost_usd numeric(12,6) not null default 0,
  created_at timestamptz not null default now()
);

create index chats_user_id_updated_at_idx on public.chats(user_id, updated_at desc);
create index messages_chat_id_created_at_idx on public.messages(chat_id, created_at);
create index memories_user_id_created_at_idx on public.memories(user_id, created_at desc);
create index spaces_user_id_created_at_idx on public.spaces(user_id, created_at desc);
create index usage_events_user_id_created_at_idx on public.usage_events(user_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger user_settings_set_updated_at before update on public.user_settings for each row execute function public.set_updated_at();
create trigger spaces_set_updated_at before update on public.spaces for each row execute function public.set_updated_at();
create trigger chats_set_updated_at before update on public.chats for each row execute function public.set_updated_at();
create trigger memories_set_updated_at before update on public.memories for each row execute function public.set_updated_at();
create trigger subscriptions_set_updated_at before update on public.subscriptions for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  );

  insert into public.user_settings (user_id) values (new.id);
  insert into public.subscriptions (user_id) values (new.id);
  insert into public.spaces (user_id, name, description, icon, color)
  values (new.id, 'General', 'Tu espacio principal de Nexora AI', 'sparkles', 'emerald');

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.spaces enable row level security;
alter table public.chats enable row level security;
alter table public.messages enable row level security;
alter table public.memories enable row level security;
alter table public.subscriptions enable row level security;
alter table public.usage_events enable row level security;

create policy "profiles_select_own" on public.profiles for select using ((select auth.uid()) = id);
create policy "profiles_update_own" on public.profiles for update using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "settings_all_own" on public.user_settings for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "spaces_all_own" on public.spaces for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "chats_all_own" on public.chats for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "messages_all_own" on public.messages for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "memories_all_own" on public.memories for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "subscriptions_select_own" on public.subscriptions for select using ((select auth.uid()) = user_id);
create policy "usage_select_own" on public.usage_events for select using ((select auth.uid()) = user_id);
