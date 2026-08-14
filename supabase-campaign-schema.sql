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

create table if not exists public.campaign_game_log (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  actor_user_id uuid not null references auth.users(id) on delete cascade,
  actor_name text not null default '',
  character_id text,
  source text not null default 'sheet',
  label text not null default 'Roll',
  rolls jsonb not null default '[]'::jsonb,
  raw_total integer not null default 0,
  modifier integer not null default 0,
  total integer not null default 0,
  visibility text not null default 'public' check (visibility in ('public', 'dm')),
  created_at timestamptz not null default now()
);

create table if not exists public.account_backups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null default 'Automatic backup',
  data jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.campaigns enable row level security;
alter table public.campaign_members enable row level security;
alter table public.campaign_characters enable row level security;
alter table public.campaign_maps enable row level security;
alter table public.campaign_game_log enable row level security;
alter table public.account_backups enable row level security;

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

create or replace function public.ensure_campaign_dm_membership(p_campaign_id uuid, p_display_name text default '')
returns void
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
  where c.id = p_campaign_id
  limit 1;

  if target_campaign.id is null then
    raise exception 'Campaign not found';
  end if;

  if target_campaign.owner_id <> (select auth.uid()) then
    raise exception 'Only the campaign owner can repair DM membership';
  end if;

  clean_name := coalesce(nullif(trim(p_display_name), ''), 'DM');

  insert into public.campaign_members (campaign_id, user_id, role, display_name)
  values (target_campaign.id, (select auth.uid()), 'dm', clean_name)
  on conflict (campaign_id, user_id)
  do update set role = 'dm', display_name = excluded.display_name;
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
  token_size integer;
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
  token_size := greatest(1, least(4, coalesce((token->>'size')::integer, 1)));
  next_token := jsonb_set(token, '{x}', to_jsonb(greatest(0, least(columns - token_size, p_x))), true);
  next_token := jsonb_set(next_token, '{y}', to_jsonb(greatest(0, least(rows - token_size, p_y))), true);
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

create or replace function public.resize_campaign_map_token(p_map_id uuid, p_token_id text, p_size integer)
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
  next_size integer;
  next_x integer;
  next_y integer;
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
    raise exception 'You can only resize your own token';
  end if;

  columns := greatest(4, least(80, coalesce((map_data->>'columns')::integer, 24)));
  rows := greatest(4, least(80, coalesce((map_data->>'rows')::integer, 16)));
  next_size := greatest(1, least(4, p_size));
  next_x := greatest(0, least(columns - next_size, coalesce((token->>'x')::integer, 0)));
  next_y := greatest(0, least(rows - next_size, coalesce((token->>'y')::integer, 0)));
  next_token := jsonb_set(token, '{size}', to_jsonb(next_size), true);
  next_token := jsonb_set(next_token, '{x}', to_jsonb(next_x), true);
  next_token := jsonb_set(next_token, '{y}', to_jsonb(next_y), true);
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

create or replace function public.add_campaign_map_ping(p_map_id uuid, p_x integer, p_y integer, p_label text default '')
returns public.campaign_maps
language plpgsql
security definer
set search_path = public
as $$
declare
  target_map public.campaign_maps;
  map_data jsonb;
  pings jsonb;
  columns integer;
  rows integer;
  clean_label text;
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
  pings := coalesce(map_data->'pings', '[]'::jsonb);
  columns := greatest(4, least(80, coalesce((map_data->>'columns')::integer, 24)));
  rows := greatest(4, least(80, coalesce((map_data->>'rows')::integer, 16)));
  clean_label := left(coalesce(nullif(trim(p_label), ''), 'Player'), 40);

  pings := (
    select coalesce(jsonb_agg(value), '[]'::jsonb)
    from (
      select value
      from jsonb_array_elements(pings) as value
      where coalesce((value->>'time')::bigint, 0) > ((extract(epoch from now()) * 1000)::bigint - 15000)
      order by coalesce((value->>'time')::bigint, 0) desc
      limit 11
    ) recent
  ) || jsonb_build_array(jsonb_build_object(
    'id', gen_random_uuid()::text,
    'x', greatest(0, least(columns - 1, p_x)),
    'y', greatest(0, least(rows - 1, p_y)),
    'by', clean_label,
    'time', (extract(epoch from now()) * 1000)::bigint
  ));

  map_data := jsonb_set(map_data, '{pings}', pings, true);

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
revoke all on function public.ensure_campaign_dm_membership(uuid, text) from public;
revoke all on function public.move_campaign_map_token(uuid, text, integer, integer) from public;
revoke all on function public.resize_campaign_map_token(uuid, text, integer) from public;
revoke all on function public.add_campaign_map_ping(uuid, integer, integer, text) from public;
grant execute on function public.is_campaign_member(uuid) to authenticated;
grant execute on function public.is_campaign_dm(uuid) to authenticated;
grant execute on function public.join_campaign_by_invite(text, text) to authenticated;
grant execute on function public.ensure_campaign_dm_membership(uuid, text) to authenticated;
grant execute on function public.move_campaign_map_token(uuid, text, integer, integer) to authenticated;
grant execute on function public.resize_campaign_map_token(uuid, text, integer) to authenticated;
grant execute on function public.add_campaign_map_ping(uuid, integer, integer, text) to authenticated;

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
drop policy if exists "Campaign owners can read membership" on public.campaign_members;
create policy "Campaign members can read membership"
on public.campaign_members for select
to authenticated
using (
  user_id = (select auth.uid())
  or exists (
    select 1 from public.campaigns c
    where c.id = public.campaign_members.campaign_id
      and c.owner_id = (select auth.uid())
  )
);

drop policy if exists "Users can join campaigns" on public.campaign_members;
create policy "Users can join campaigns"
on public.campaign_members for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and (
    role = 'player'
    or exists (
      select 1 from public.campaigns c
      where c.id = public.campaign_members.campaign_id
        and c.owner_id = (select auth.uid())
    )
  )
);

drop policy if exists "Users can update their campaign profile" on public.campaign_members;
drop policy if exists "Campaign owners can manage memberships" on public.campaign_members;
create policy "Users can update their campaign profile"
on public.campaign_members for update
to authenticated
using (
  user_id = (select auth.uid())
  or exists (
    select 1 from public.campaigns c
    where c.id = public.campaign_members.campaign_id
      and c.owner_id = (select auth.uid())
  )
)
with check (
  user_id = (select auth.uid())
  or exists (
    select 1 from public.campaigns c
    where c.id = public.campaign_members.campaign_id
      and c.owner_id = (select auth.uid())
  )
);

create policy "Campaign owners can manage memberships"
on public.campaign_members for delete
to authenticated
using (
  exists (
    select 1 from public.campaigns c
    where c.id = public.campaign_members.campaign_id
      and c.owner_id = (select auth.uid())
  )
);

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

drop policy if exists "Campaign members can read game log" on public.campaign_game_log;
create policy "Campaign members can read game log"
on public.campaign_game_log for select
to authenticated
using (
  public.is_campaign_member(campaign_id)
  and (
    visibility = 'public'
    or public.is_campaign_dm(campaign_id)
    or actor_user_id = (select auth.uid())
  )
);

drop policy if exists "Campaign members can add game log entries" on public.campaign_game_log;
create policy "Campaign members can add game log entries"
on public.campaign_game_log for insert
to authenticated
with check (
  actor_user_id = (select auth.uid())
  and public.is_campaign_member(campaign_id)
);

drop policy if exists "Users can read their account backups" on public.account_backups;
create policy "Users can read their account backups"
on public.account_backups for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Users can create their account backups" on public.account_backups;
create policy "Users can create their account backups"
on public.account_backups for insert
to authenticated
with check (user_id = (select auth.uid()));

drop policy if exists "Users can delete their account backups" on public.account_backups;
create policy "Users can delete their account backups"
on public.account_backups for delete
to authenticated
using (user_id = (select auth.uid()));

create index if not exists campaigns_invite_code_idx
on public.campaigns (invite_code);

create index if not exists campaign_members_user_idx
on public.campaign_members (user_id);

create index if not exists campaign_characters_owner_idx
on public.campaign_characters (owner_user_id, character_id);

create index if not exists campaign_maps_campaign_idx
on public.campaign_maps (campaign_id, updated_at desc);

create index if not exists campaign_game_log_campaign_idx
on public.campaign_game_log (campaign_id, created_at desc);

create index if not exists account_backups_user_created_idx
on public.account_backups (user_id, created_at desc);

-- Enable immediate campaign roll broadcasts. The client keeps its polling fallback,
-- so the campaign remains usable even when Realtime is temporarily unavailable.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
    and not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'campaign_game_log'
    ) then
    alter publication supabase_realtime add table public.campaign_game_log;
  end if;
exception
  when insufficient_privilege then
    raise notice 'Enable Realtime for public.campaign_game_log in the Supabase dashboard.';
end
$$;

-- Enable immediate map/token broadcasts so player and DM screens stay in sync
-- (token moves, additions, reveals, and scene changes) without waiting for the
-- polling fallback. REPLICA IDENTITY FULL lets DELETE events carry the row id.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
    and not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'campaign_maps'
    ) then
    alter table public.campaign_maps replica identity full;
    alter publication supabase_realtime add table public.campaign_maps;
  end if;
exception
  when insufficient_privilege then
    raise notice 'Enable Realtime for public.campaign_maps in the Supabase dashboard.';
end
$$;
