import { ChapterInterface } from "@/interface/chapter";
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
      .select(`*`).single(); // Use single() to return a single object instead of an array
  
    if (insertError) {
      return { success: false, error: `Insert failed: ${insertError.message}` };
    }
    return { success: true, image_id: image ? image.image_id : null };
}

export async function createChapter(
    title: string,
    novel_id: string,
    content: string,
    image_id?: string | undefined,
    // characters?: string[],
    ): Promise<{ success: boolean; error?: string; result?: ChapterInterface }> {
    const { data: { user } } = await supabase.auth.getUser();
    
    console.log({
        title,
        novel_id,
        content,
        image_id,
        user_id: user?.id, // Ensure user ID is included
    })
    const { data, error } = await supabase
        .from('chapters')
        .insert([
        {
            title,
            content,
            novel_id,
            image_id: image_id || null, // Use the image ID if provided, otherwise null
            user_id: user?.id, // Use the user ID from the session
        },
        ])
        .select('*').single(); // Use single() to return a single object instead of an array
    
    if (error) {
        console.error('Error creating chapter:', error);
        return { success: false, error: error.message };
    }
    
    return { success: true, result: data};
    }


