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

create table if not exists public.campaign_maps (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.campaigns enable row level security;
alter table public.campaign_members enable row level security;
alter table public.campaign_characters enable row level security;
alter table public.campaign_maps enable row level security;

create or replace function public.is_campaign_member(p_campaign_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.campaign_members cm
    where cm.campaign_id = p_campaign_id
      and cm.user_id = (select auth.uid())
  );
$$;

create or replace function public.is_campaign_dm(p_campaign_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.campaign_members cm
    where cm.campaign_id = p_campaign_id
      and cm.user_id = (select auth.uid())
      and cm.role = 'dm'
  );
$$;

create or replace function public.join_campaign_by_invite(p_invite_code text, p_display_name text default '')
returns table(id uuid, name text)
language plpgsql
security definer
set search_path = public
as $$
declare
  target_campaign public.campaigns;
  clean_name text;
begin
  if (select auth.uid()) is null then
    raise exception 'Sign in required';
  end if;

  select *
  into target_campaign
  from public.campaigns c
  where c.invite_code = upper(trim(p_invite_code))
  limit 1;

  if target_campaign.id is null then
    raise exception 'Invite code not found';
  end if;

  clean_name := coalesce(nullif(trim(p_display_name), ''), 'Player');

  insert into public.campaign_members (campaign_id, user_id, role, display_name)
  values (target_campaign.id, (select auth.uid()), 'player', clean_name)
  on conflict (campaign_id, user_id)
  do update set display_name = excluded.display_name;

  return query select target_campaign.id, target_campaign.name;
end;
$$;

create or replace function public.move_campaign_map_token(p_map_id uuid, p_token_id text, p_x integer, p_y integer)
returns public.campaign_maps
language plpgsql
security definer
set search_path = public
as $$
declare
  target_map public.campaign_maps;
  map_data jsonb;
  tokens jsonb;
  token jsonb;
  next_token jsonb;
  token_index integer;
  token_count integer;
  columns integer;
  rows integer;
begin
  if (select auth.uid()) is null then
    raise exception 'Sign in required';
  end if;

  select *
  into target_map
  from public.campaign_maps
  where id = p_map_id;

  if target_map.id is null then
    raise exception 'Map not found';
  end if;

  if not public.is_campaign_member(target_map.campaign_id) then
    raise exception 'Not a campaign member';
  end if;

  map_data := coalesce(target_map.data, '{}'::jsonb);
  tokens := coalesce(map_data->'tokens', '[]'::jsonb);
  token_count := jsonb_array_length(tokens);
  token_index := null;

  for i in 0..greatest(token_count - 1, 0) loop
    token := tokens->i;
    if token->>'id' = p_token_id then
      token_index := i;
      exit;
    end if;
  end loop;

  if token_index is null then
    raise exception 'Token not found';
  end if;

  if not public.is_campaign_dm(target_map.campaign_id)
    and token->>'ownerUserId' <> (select auth.uid())::text then
    raise exception 'You can only move your own token';
  end if;

  columns := greatest(4, least(80, coalesce((map_data->>'columns')::integer, 24)));
  rows := greatest(4, least(80, coalesce((map_data->>'rows')::integer, 16)));
  next_token := jsonb_set(token, '{x}', to_jsonb(greatest(0, least(columns - 1, p_x))), true);
  next_token := jsonb_set(next_token, '{y}', to_jsonb(greatest(0, least(rows - 1, p_y))), true);
  tokens := jsonb_set(tokens, array[token_index::text], next_token, false);
  map_data := jsonb_set(map_data, '{tokens}', tokens, true);

  update public.campaign_maps
  set data = map_data,
      updated_at = now()
  where id = target_map.id
  returning * into target_map;

  return target_map;
end;
$$;

revoke all on function public.is_campaign_member(uuid) from public;
revoke all on function public.is_campaign_dm(uuid) from public;
revoke all on function public.join_campaign_by_invite(text, text) from public;
revoke all on function public.move_campaign_map_token(uuid, text, integer, integer) from public;
grant execute on function public.is_campaign_member(uuid) to authenticated;
grant execute on function public.is_campaign_dm(uuid) to authenticated;
grant execute on function public.join_campaign_by_invite(text, text) to authenticated;
grant execute on function public.move_campaign_map_token(uuid, text, integer, integer) to authenticated;

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
      and cm.role = 'dm'
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
drop policy if exists "Campaign members can read campaigns" on public.campaigns;
create policy "Campaign members can read campaigns"
on public.campaigns for select
to authenticated
using (
  owner_id = (select auth.uid())
  or public.is_campaign_member(id)
);

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
using (public.is_campaign_member(campaign_id));

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
drop policy if exists "Owners and DMs can read campaign characters" on public.campaign_characters;
create policy "Owners and DMs can read campaign characters"
on public.campaign_characters for select
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

drop policy if exists "Campaign members can read maps" on public.campaign_maps;
create policy "Campaign members can read maps"
on public.campaign_maps for select
to authenticated
using (public.is_campaign_member(campaign_id));

drop policy if exists "Campaign DMs can create maps" on public.campaign_maps;
create policy "Campaign DMs can create maps"
on public.campaign_maps for insert
to authenticated
with check (
  owner_id = (select auth.uid())
  and exists (
    select 1 from public.campaign_members cm
    where cm.campaign_id = public.campaign_maps.campaign_id
      and cm.user_id = (select auth.uid())
      and cm.role = 'dm'
  )
);

drop policy if exists "Campaign members can update maps" on public.campaign_maps;
drop policy if exists "Campaign DMs can update maps" on public.campaign_maps;
create policy "Campaign DMs can update maps"
on public.campaign_maps for update
to authenticated
using (public.is_campaign_dm(campaign_id))
with check (public.is_campaign_dm(campaign_id));

drop policy if exists "Campaign DMs can delete maps" on public.campaign_maps;
create policy "Campaign DMs can delete maps"
on public.campaign_maps for delete
to authenticated
using (
  exists (
    select 1 from public.campaign_members cm
    where cm.campaign_id = public.campaign_maps.campaign_id
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

create index if not exists campaign_maps_campaign_idx
on public.campaign_maps (campaign_id, updated_at desc);
