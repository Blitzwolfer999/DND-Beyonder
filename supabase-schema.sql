create table if not exists public.characters (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

alter table public.characters enable row level security;

create policy "Users can read their characters"
on public.characters for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert their characters"
on public.characters for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their characters"
on public.characters for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their characters"
on public.characters for delete
to authenticated
using ((select auth.uid()) = user_id);

create index if not exists characters_user_id_idx
on public.characters (user_id);
