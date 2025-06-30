create table public.novels (
  novel_id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid null,
  image_id uuid null,
  title text not null,
  description text null,
  genre text not null,
  created_at timestamp with time zone null default timezone ('utc'::text, now()),
  updated_at timestamp with time zone null default timezone ('utc'::text, now()),
  constraint novels_pkey primary key (novel_id),
  constraint novels_image_id_fkey foreign KEY (image_id) references images (image_id) on delete CASCADE,
  constraint novels_user_id_fkey foreign KEY (user_id) references profiles (user_id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_novels_user_created on public.novels using btree (user_id, created_at desc) TABLESPACE pg_default;