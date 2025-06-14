-- First, we need to remove the existing bucket if it exists.
-- This lets us reset the DB without having to manually delete the bucket.
do $$
begin
  if exists (
    select 1 from storage.buckets where id = 'image_bucket'
  ) then
    -- Delete all objects in bucket first
    delete from storage.objects where bucket_id = 'image_bucket';
    -- Then delete bucket
    delete from storage.buckets where id = 'image_bucket';
  end if;
end $$;

-- Create storage bucket with size and MIME type restrictions
insert into storage.buckets (
  id, 
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'image_bucket',
  'image_bucket',
  true,
  1000000, -- 1MB in bytes
  array[
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ]
);

-- Security policy: Public can view attachments
create policy "Public can view attachments"
on storage.objects for select
using (bucket_id = 'image_bucket');

-- Security policy: Users can upload their own attachments
create policy "Users can upload their own attachments"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'image_bucket'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Security policy: Users can delete their own attachments
create policy "Users can delete their own attachments"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'image_bucket'
  and (storage.foldername(name))[1] = auth.uid()::text
);


-- Grant necessary permissions
grant delete on storage.objects to authenticated;