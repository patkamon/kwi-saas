create or replace function public.increment_chapter_view(chapter_id uuid)
returns void
language plpgsql
as $$
begin
  update public.chapters
  set views = views + 1
  where id = chapter_id;
end;
$$;