create table public.novels (
  novel_id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(user_id) on delete cascade, -- author of the novel
  image_id uuid references public.images on delete cascade, 
  
  title text not null, -- title of the novel
  description text, -- short description of the novel
  genre text not null, -- genre of the novel (e.g., fantasy, romance, etc.)

  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);