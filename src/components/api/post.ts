import { ChapterInterface } from "@/interface/chapter";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient()


export async function createNovel(
  title: string,
  description: string,
  genre: string,
  image_id?: string,
) {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('novels')
    .insert([
      {
        title,
        description,
        genre,
        image_id,
        user_id: user?.id, // Use the user ID from the session
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
  
export async function uploadImageAndInsertPath(file: File, type: string): Promise<UploadResult> {
    const { data: { user } } = await supabase.auth.getUser();

    let fileExt: string;
    if (type == 'gen'){
      fileExt = 'png'
    }else{
      fileExt = file.name.split('.').pop() || 'png'; // Get the file extension, default to 'png' if not found
    }
    const filePath = `${type}/${Date.now()}.${fileExt}`;  // ✅ correct
  
    // 1. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('image_bucket')
      .upload(filePath, file);
  
    if (uploadError) {
      return { success: false, error: `Upload failed: ${uploadError.message}` };
    }
    // 2. Insert into `image` table
    const { data: image, error: insertError } = await supabase
      .from('images')
      .insert({ 
        image_path: 'image_bucket/' + filePath,
        created_by: user?.id, // Use the user ID from the session
        type: type, // Store the type of image
       })
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

export async function createChapterCharacter(
    chapter_id: string,
    character_id: string
){
  const { data, error } = await supabase
    .from('chapter_character')
    .insert([
      {
        chapter_id,
        character_id,
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

export async function createCharacter(
    name: string,
    description: string,
    image_id: string | null,
    novel_id: string
) {
  const { data, error } = await supabase
    .from('characters')
    .insert([
      {
        name,
        description,
        image_id,
        novel_id
      }
    ])
    .select('*')
    .single()

  if (error) {
    console.error('Error creating character:', error)
    return null
  }

  return data
}


export async function createChracterChapter(chapter_id: string, character_ids: string[]) {
  const { data, error } = await supabase
    .from('chapter_character')
    .insert(
      character_ids.map(character_id => ({
        chapter_id,
        character_id
      }))
    )
    .select('*')

  if (error) {
    console.error('Error creating character-chapter relationship:', error)
    return null
  }

  return data
}

export async function generateNovel(title: string, genre: string, characters: string, prompt: string, novel_id: string, chapter_id: string) {
  const {data: {user}} = await supabase.auth.getUser();
  const { data, error } = await supabase.functions.invoke("quick-task", {
    body: {
      user_id: user?.id || null,
      novel_id,
      title,
      genre,
      characters,
      chapter_id,  // <- your chapter row ID
      prompt: prompt || '', // <- your prompt
    }
  });

  if (error) {
    console.error('Error generating novel:', error);
    return null;
  }
  return data;
}

export async function generateImage(prompt: string, model?: string) {
  const {data: {user}} = await supabase.auth.getUser();
  const { data, error } = await supabase.functions.invoke("gen_img", {
    body: {
      prompt: prompt, // <- your prompt
      model: model ? model :'dark-sushi-mix-v2-25',
      user_id: user?.id || null
    }
  });

  if (error) {
    console.error('Error generating novel:', error);
    return null;
  }
  return data;
}
