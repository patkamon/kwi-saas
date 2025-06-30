create table public.characters (
  character_id uuid not null default extensions.uuid_generate_v4 (),
  name text not null,
  description text null,
  novel_id uuid null,
  image_id uuid null,
  created_at timestamp with time zone null default timezone ('utc'::text, now()),
  updated_at timestamp with time zone null default timezone ('utc'::text, now()),
  constraint characters_pkey primary key (character_id),
  constraint characters_image_id_fkey foreign KEY (image_id) references images (image_id) on delete CASCADE,
  constraint characters_novel_id_fkey foreign KEY (novel_id) references novels (novel_id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_characters_novel_created on public.characters using btree (novel_id, created_at desc) TABLESPACE pg_default;