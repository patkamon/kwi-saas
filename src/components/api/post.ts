// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

import { createClient } from "@/utils/supabase/client";

const supabase = createClient()


export async function createNovel(
  title: string,
  description: string,
  genre: string,
  image_id: string,
) {
  // get user from session storage
  const user_id = sessionStorage.getItem('user_id')

  const { data, error } = await supabase
    .from('novels')
    .insert([
      {
        title,
        description,
        genre,
        image_id,
        user_id
      }
    ])
    .select('*')
    .single()

  if (error) {
    console.error('Error creating novel:', error)
    return null
  }

  return data
}
type UploadResult = {
    success: boolean;
    image_id?: string | null;
    error?: string;
  };
  
  export async function uploadImageAndInsertPath(file: File): Promise<UploadResult> {
    const { data: { user } } = await supabase.auth.getUser();
    console.log("User ID:", user?.id);

    const fileExt = file.name.split('.').pop();
    const filePath = `./uploads/${Date.now()}.${fileExt}`;  // ✅ correct
  
    // 1. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('image_bucket')
      .upload(filePath, file);
  
    if (uploadError) {
      return { success: false, error: `Upload failed: ${uploadError.message}` };
    }
    // 2. Get public URL
    const { data } = supabase
    .storage
    .from('image_bucket')
    .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;
    console.log(publicUrl)

    // 3. Insert into `image` table
    const { data: image, error: insertError } = await supabase
      .from('images')
      .insert({ image_path: publicUrl })
      .select(`*`);
  
    if (insertError) {
      return { success: false, error: `Insert failed: ${insertError.message}` };
    }
    return { success: true, image_id: image ? image[0].image_id : null };
  }