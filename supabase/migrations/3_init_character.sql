create table public.characters (
  character_id uuid default uuid_generate_v4() primary key,
  name text not null, -- name of the character
  description text, -- short description of the character

  novel_id uuid references public.novels(novel_id) on delete cascade, -- novel this character belongs to
  image_id uuid references public.images on delete cascade, 

  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);