create table public.chapters (
  chapter_id uuid not null default extensions.uuid_generate_v4 (),
  novel_id uuid null,
  image_id uuid null,
  content text not null,
  views integer null default 0,
  created_at timestamp with time zone null default timezone ('utc'::text, now()),
  updated_at timestamp with time zone null default timezone ('utc'::text, now()),
  title text null,
  user_id uuid null,
  constraint chapters_pkey primary key (chapter_id),
  constraint chapters_image_id_fkey foreign KEY (image_id) references images (image_id) on delete CASCADE,
  constraint chapters_novel_id_fkey foreign KEY (novel_id) references novels (novel_id) on delete CASCADE,
  constraint chapters_user_id_fkey foreign KEY (user_id) references profiles (user_id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_chapters_user_created on public.chapters using btree (novel_id, created_at desc) TABLESPACE pg_default;