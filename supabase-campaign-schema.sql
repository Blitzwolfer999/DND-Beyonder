-- DND Beyonder campaign setup
-- Run this in the Supabase SQL Editor for the project used by cloud-config.js.
-- It creates the base character table if needed, then creates campaign invite tables
-- and lets campaign DMs read/update shared sheets.
-- Important: paste/run the entire file. If only highlighted lines are run,
-- Supabase may start in the middle of a create table statement and throw a
-- syntax error near a column name such as "display_name".

create table if not exists public.characters (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  data jsonb not null,
  is_deleted boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

alter table public.characters
add column if not exists is_deleted boolean not null default false;

alter table public.characters enable row level security;

drop policy if exists "Users can insert their characters" on public.characters;
create policy "Users can insert their characters"
on public.characters for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their characters" on public.characters;
create policy "Users can delete their characters"
on public.characters for delete
to authenticated
using ((select auth.uid()) = user_id);

create index if not exists characters_user_id_idx
on public.characters (user_id);

create index if not exists characters_user_updated_idx
on public.characters (user_id, updated_at desc);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text not null default '',
  invite_code text not null unique,
  updated_at timestamptz not null default now()
);

create table if not exists public.campaign_members (
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'player' check (role in ('dm', 'player')),
  display_name text not null default '',
  joined_at timestamptz not null default now(),
  primary key (campaign_id, user_id)
);

create table if not exists public.campaign_characters (
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  character_id text not null,
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  nickname text not null default '',
  added_at timestamptz not null default now(),
  primary key (campaign_id, owner_user_id, character_id)
);

alter table public.campaigns enable row level security;
alter table public.campaign_members enable row level security;
alter table public.campaign_characters enable row level security;

-- Replace character read/update policies so campaign DMs can access shared sheets.
drop policy if exists "Users can read their characters" on public.characters;
drop policy if exists "Users can read owned or campaign characters" on public.characters;
create policy "Users can read owned or campaign characters"
on public.characters for select
to authenticated
using (
  (select auth.uid()) = user_id
  or exists (
    select 1
    from public.campaign_characters cc
    join public.campaign_members cm on cm.campaign_id = cc.campaign_id
    where cc.owner_user_id = public.characters.user_id
      and cc.character_id = public.characters.id
      and cm.user_id = (select auth.uid())
  )
);

drop policy if exists "Users can update their characters" on public.characters;
drop policy if exists "Users and campaign DMs can update characters" on public.characters;
create policy "Users and campaign DMs can update characters"
on public.characters for update
to authenticated
using (
  (select auth.uid()) = user_id
  or exists (
    select 1
    from public.campaign_characters cc
    join public.campaign_members cm on cm.campaign_id = cc.campaign_id
    where cc.owner_user_id = public.characters.user_id
      and cc.character_id = public.characters.id
      and cm.user_id = (select auth.uid())
      and cm.role = 'dm'
  )
)
with check (
  (select auth.uid()) = user_id
  or exists (
    select 1
    from public.campaign_characters cc
    join public.campaign_members cm on cm.campaign_id = cc.campaign_id
    where cc.owner_user_id = public.characters.user_id
      and cc.character_id = public.characters.id
      and cm.user_id = (select auth.uid())
      and cm.role = 'dm'
  )
);

drop policy if exists "Authenticated users can find campaign invite codes" on public.campaigns;
create policy "Authenticated users can find campaign invite codes"
on public.campaigns for select
to authenticated
using (true);

drop policy if exists "Users can create campaigns" on public.campaigns;
create policy "Users can create campaigns"
on public.campaigns for insert
to authenticated
with check ((select auth.uid()) = owner_id);

drop policy if exists "Campaign DMs can update campaigns" on public.campaigns;
create policy "Campaign DMs can update campaigns"
on public.campaigns for update
to authenticated
using (
  owner_id = (select auth.uid())
  or exists (
    select 1 from public.campaign_members cm
    where cm.campaign_id = public.campaigns.id
      and cm.user_id = (select auth.uid())
      and cm.role = 'dm'
  )
)
with check (
  owner_id = (select auth.uid())
  or exists (
    select 1 from public.campaign_members cm
    where cm.campaign_id = public.campaigns.id
      and cm.user_id = (select auth.uid())
      and cm.role = 'dm'
  )
);

drop policy if exists "Campaign owners can delete campaigns" on public.campaigns;
create policy "Campaign owners can delete campaigns"
on public.campaigns for delete
to authenticated
using (owner_id = (select auth.uid()));

drop policy if exists "Campaign members can read membership" on public.campaign_members;
create policy "Campaign members can read membership"
on public.campaign_members for select
to authenticated
using (true);

drop policy if exists "Users can join campaigns" on public.campaign_members;
create policy "Users can join campaigns"
on public.campaign_members for insert
to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists "Users can update their campaign profile" on public.campaign_members;
create policy "Users can update their campaign profile"
on public.campaign_members for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

drop policy if exists "Members can read campaign characters" on public.campaign_characters;
create policy "Members can read campaign characters"
on public.campaign_characters for select
to authenticated
using (
  exists (
    select 1 from public.campaign_members cm
    where cm.campaign_id = public.campaign_characters.campaign_id
      and cm.user_id = (select auth.uid())
  )
);

drop policy if exists "Players can share their characters" on public.campaign_characters;
create policy "Players can share their characters"
on public.campaign_characters for insert
to authenticated
with check (
  owner_user_id = (select auth.uid())
  and exists (
    select 1 from public.campaign_members cm
    where cm.campaign_id = public.campaign_characters.campaign_id
      and cm.user_id = (select auth.uid())
  )
);

drop policy if exists "Owners and DMs can remove shared characters" on public.campaign_characters;
create policy "Owners and DMs can remove shared characters"
on public.campaign_characters for delete
to authenticated
using (
  owner_user_id = (select auth.uid())
  or exists (
    select 1 from public.campaign_members cm
    where cm.campaign_id = public.campaign_characters.campaign_id
      and cm.user_id = (select auth.uid())
      and cm.role = 'dm'
  )
);

create index if not exists campaigns_invite_code_idx
on public.campaigns (invite_code);

create index if not exists campaign_members_user_idx
on public.campaign_members (user_id);

create index if not exists campaign_characters_owner_idx
on public.campaign_characters (owner_user_id, character_id);
