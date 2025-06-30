-- Enable required extensions
create extension if not exists "uuid-ossp";

create table public.images (
  image_id uuid not null default extensions.uuid_generate_v4 (),
  image_path text not null,
  created_at timestamp with time zone null default timezone ('utc'::text, now()),
  updated_at timestamp with time zone null default timezone ('utc'::text, now()),
  created_by uuid null,
  type text null default 'public'::text,
  constraint images_pkey primary key (image_id),
  constraint images_created_by_fkey foreign KEY (created_by) references profiles (user_id)
) TABLESPACE pg_default;