-- DND Beyonder campaign privacy hardening
-- Run this after supabase-campaign-schema.sql.
-- It narrows campaign visibility, keeps invite joins working through an RPC,
-- and prevents players from directly updating entire battle maps.

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

revoke all on function public.is_campaign_member(uuid) from public;
revoke all on function public.is_campaign_dm(uuid) from public;
revoke all on function public.join_campaign_by_invite(text, text) from public;
revoke all on function public.move_campaign_map_token(uuid, text, integer, integer) from public;
revoke all on function public.resize_campaign_map_token(uuid, text, integer) from public;
grant execute on function public.is_campaign_member(uuid) to authenticated;
grant execute on function public.is_campaign_dm(uuid) to authenticated;
grant execute on function public.join_campaign_by_invite(text, text) to authenticated;
grant execute on function public.move_campaign_map_token(uuid, text, integer, integer) to authenticated;
grant execute on function public.resize_campaign_map_token(uuid, text, integer) to authenticated;

drop policy if exists "Authenticated users can find campaign invite codes" on public.campaigns;
drop policy if exists "Campaign members can read campaigns" on public.campaigns;
create policy "Campaign members can read campaigns"
on public.campaigns for select
to authenticated
using (
  owner_id = (select auth.uid())
  or public.is_campaign_member(id)
);

drop policy if exists "Campaign members can read membership" on public.campaign_members;
create policy "Campaign members can read membership"
on public.campaign_members for select
to authenticated
using (public.is_campaign_member(campaign_id));

drop policy if exists "Campaign members can read maps" on public.campaign_maps;
create policy "Campaign members can read maps"
on public.campaign_maps for select
to authenticated
using (public.is_campaign_member(campaign_id));

drop policy if exists "Campaign members can update maps" on public.campaign_maps;
drop policy if exists "Campaign DMs can update maps" on public.campaign_maps;
create policy "Campaign DMs can update maps"
on public.campaign_maps for update
to authenticated
using (public.is_campaign_dm(campaign_id))
with check (public.is_campaign_dm(campaign_id));
