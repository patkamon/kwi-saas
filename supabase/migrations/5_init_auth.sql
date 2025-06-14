-- Function to create profile for new (auth) users
create or replace function public.handle_new_user() 
returns trigger
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, name)
  values (new.id, new.raw_user_meta_data->>'name');
  return new;
end;
$$ language plpgsql;

-- Only create trigger if it doesn't already exist
do $$
begin
  if not exists (
    select 1 from pg_trigger
    where tgname = 'on_auth_user_created'
  ) then
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute procedure public.handle_new_user();
  end if;
end $$;
-- -- Security policy: Users can read their own profile
-- create policy "Users can read own profile"
-- on public.profiles for select
-- using (auth.uid() = user_id);

-- Security policy: Users can CRUD their own novels
create policy "Users can CRUD own novels"
on public.novels
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can CRUD own chapters"
on public.chapters
for all
using (
  -- Allow access if the chapter belongs to a novel owned by the user
  novel_id in (
    select novel_id from public.novels where user_id = auth.uid()
  )
)
with check (
  -- Allow inserts/updates only if the novel belongs to the user
  novel_id in (
    select novel_id from public.novels where user_id = auth.uid()
  )
);

-- Security policy: Users can CRUD their own characters
create policy "Users can CRUD own characters"
on public.characters
for all
using (
  -- Allow access if the chapter belongs to a novel owned by the user
  novel_id in (
    select novel_id from public.novels where user_id = auth.uid()
  )
)
with check (
  -- Allow inserts/updates only if the novel belongs to the user
  novel_id in (
    select novel_id from public.novels where user_id = auth.uid()
  )
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.novels enable row level security;
alter table public.chapters enable row level security;
alter table public.characters enable row level security;

-- Optimization: Create an index on user_id and created_at to list novels efficiently.
CREATE INDEX idx_novels_user_created 
ON public.novels(user_id, created_at DESC);

-- Optimization: Create an index on novel_id and created_at to list chapters efficiently.
CREATE INDEX idx_chapters_user_created
ON public.chapters(novel_id, created_at DESC);

-- Optimization: Create an index on novel_id and created_at to list characters efficiently.
CREATE INDEX idx_characters_novel_created
ON public.characters(novel_id, created_at DESC);



