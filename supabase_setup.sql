/* 
  RUN THIS SQL IN YOUR SUPABASE DASHBOARD (SQL EDITOR) 
  To set up the Database for the User Directory.
*/

-- 1. Create a table for public profiles using the auth.users references
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  class_year text,
  school text,
  industry text,
  company text,
  bio text,
  linkedin_url text,
  avatar_url text
);

-- 2. Enable Row Level Security (Security Policy)
alter table profiles enable row level security;

-- 3. Policy: Public profiles are viewable by everyone (or just logged in users)
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

-- 4. Policy: Users can insert their own profile.
create policy "Users can insert their own profile."
  on profiles for insert
  with check ( (select auth.uid()) = id );

-- 5. Policy: Users can update own profile.
create policy "Users can update own profile."
  on profiles for update
  using ( (select auth.uid()) = id );

-- 6. Trigger: Automatically create a profile entry when a new user signs up via Auth
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
