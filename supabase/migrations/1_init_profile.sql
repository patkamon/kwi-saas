create table public.profiles (
  user_id uuid not null,
  name text null,
  credit integer null default 100,
  image_id uuid null,
  subscription_plan text null default 'free'::text,
  bio text null,
  created_at timestamp with time zone null default timezone ('utc'::text, now()),
  updated_at timestamp with time zone null default timezone ('utc'::text, now()),
  constraint profiles_pkey primary key (user_id),
  constraint profiles_image_id_fkey foreign KEY (image_id) references images (image_id) on delete CASCADE,
  constraint profiles_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE,
  constraint profiles_subscription_plan_check check (
    (
      subscription_plan = any (array['free'::text, 'premium'::text])
    )
  )
) TABLESPACE pg_default;