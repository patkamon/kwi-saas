-- Enable required extensions
create extension if not exists "uuid-ossp";

create table public.images (
  image_id uuid default uuid_generate_v4() primary key,
  image_path text not null, -- path to the image in storage

  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);