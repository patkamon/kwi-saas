create table public.chapters (
  chapter_id uuid default uuid_generate_v4() primary key,
  novel_id uuid references public.novels(novel_id) on delete cascade, -- novel this character belongs to
  image_id uuid references public.images on delete cascade, 

  content text not null, -- content of the character (e.g., description, backstory, etc.)
  views integer default 0, -- number of views for the character

  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);