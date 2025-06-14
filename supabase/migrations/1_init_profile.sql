-- User Profile table (extends Supabase auth.users)
create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text,
  credit integer default 100,
  image_id uuid references public.images on delete cascade, 
  subscription_plan text check (subscription_plan in ('free', 'premium')) default 'free', -- premium if topup at least once
  
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);