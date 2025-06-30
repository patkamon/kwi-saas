create table public.chapter_character (
  id uuid not null default gen_random_uuid (),
  character_id uuid not null default gen_random_uuid (),
  chapter_id uuid null,
  constraint chapter_character_pkey primary key (id),
  constraint chapter_character_chapter_id_fkey foreign KEY (chapter_id) references chapters (chapter_id),
  constraint chapter_character_character_id_fkey foreign KEY (character_id) references characters (character_id)
) TABLESPACE pg_default;