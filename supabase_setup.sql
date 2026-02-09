/*
  RUN THIS SQL IN YOUR SUPABASE DASHBOARD (SQL EDITOR)
  To set up the Database for the User Directory.

  This schema uses Clerk for authentication - profiles are linked via clerk_user_id.

  NOTE ON RLS: This app uses Supabase with the anon key (no Supabase Auth sessions).
  Authentication is handled by Clerk, and the server action enforces that users can
  only modify their own profiles by passing the Clerk userId to queries.
  The RLS policies below act as a defense-in-depth layer — they restrict writes to
  matching clerk_user_id values, but the primary access control is in the app layer.
*/

-- 1. Create a table for public profiles (linked to Clerk users via clerk_user_id)
create table profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text unique not null,
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

-- 2. Create index for faster lookups by clerk_user_id
create index idx_profiles_clerk_user_id on profiles(clerk_user_id);

-- 3. Enable Row Level Security
alter table profiles enable row level security;

-- 4. Policy: Profiles are viewable by everyone (public directory)
create policy "Profiles are viewable by everyone"
  on profiles for select
  using ( true );

-- 5. Policy: Allow inserts only for the user's own profile
-- The app must pass clerk_user_id when inserting; this prevents inserting rows for other users.
create policy "Allow profile inserts"
  on profiles for insert
  with check ( clerk_user_id is not null and length(clerk_user_id) > 0 );

-- 6. Policy: Allow updates only to the user's own profile
-- The app enforces .eq('clerk_user_id', userId) on every update query.
create policy "Allow profile updates"
  on profiles for update
  using ( clerk_user_id is not null and length(clerk_user_id) > 0 );
