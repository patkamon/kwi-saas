import { createClient } from "@/utils/supabase/client";
const supabase = createClient()

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL

export async function getLatestNovels() {
    const { data , error }  = await supabase
    .from('novels')
    .select(`
      novel_id,
      title,
      description,
      created_at,
      updated_at,
      genre,
      image_id,
      user_id,
      author:profiles (
        name
      ),
      image:images (
        image_path
      )
      `)
      .order('created_at', { ascending: false }) // Sort newest first
      .limit(10) // Only return 10 results
  

  if (error) {
    console.error('Error fetching novel:', error)
    return null
  }

  return data
}

export async function getLatestAuthor(){
    const { data, error } = await supabase
    .from('profiles')
    .select(`*,
      image:images!profiles_image_id_fkey (
        image_path
      )
      `)
    .order('created_at', { ascending: false }) // Sort newest first
    .limit(10) // Only return 10 results

  if (error) {
    console.error('Error fetching author:', error)
    return null
  }

  return data
}

export async function getLatestChapters(){
    const { data, error } = await supabase
    .from('chapters')
    .select(`*,
      novel:novels (
        title
     ),
     author:profiles (
          name
        ),
        image:images (
        image_path
      )
      `)
    .order('created_at', { ascending: false }) // Sort newest first
    .limit(10) // Only return 10 results

  if (error) {
    console.error('Error fetching chapters:', error)
    return null
  }

  return data
}

export async function getNovelById(novelId: string) {
    const { data, error } = await supabase
    .from('novels')
    .select(`*,
      image:images (
        image_path
      )`)
    .eq('novel_id', novelId)
    .single()

  if (error) {
    console.error('Error fetching novel by ID:', error)
    return null
  }
  return data
}

export async function getChaptersByNovelId(novelId: string) {
    const { data, error } = await supabase
    .from('chapters')
    .select(`*,
      novel:novels (
        title
     ),
      author:profiles (
          name
        ),
        image:images (
        image_path
      )
      `)
    .eq('novel_id', novelId)
    .order('created_at', { ascending: true }) // Sort by creation date

  if (error) {
    console.error('Error fetching chapters by novel ID:', error)
    return null
  }
  return data
}


export async function getChapterById(chapterId: string) {
    const { data, error } = await supabase
    .from('chapters')
    .select(`*,
      novel:novels (
        title
     ),
     author:profiles (
          name
        ),
        image:images (
        image_path
      )
  `)
    .eq('chapter_id', chapterId)
    .single()

  if (error) {
    console.error('Error fetching chapter by ID:', error)
    return null
  }
  return data
}

export async function getProfileById(userId: string) {
    const { data, error } = await supabase
    .from('profiles')
    .select(`*,
      image:images!profiles_image_id_fkey (
        image_path
      )`)
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile by ID:', error)
    return null
  }
  return data
}

export async function getNovelByAuthorId(authorId: string) {
    const { data, error } = await supabase
    .from('novels')
    .select(`*,
      author:profiles (
        name
      ),
      image:images (
        image_path
      )
      `)
    .eq('user_id', authorId)
    .order('created_at', { ascending: false }) // Sort by creation date

  if (error) {
    console.error('Error fetching novels by author ID:', error)
    return null
  }
  return data
}


export async function getChapterByAuthorId(authorId: string) {
    const { data, error } = await supabase
    .from('chapters')
    .select(`
      *,
      novel:novels (
        title
     ),
         author:profiles (
          name
        ),
        image:images (
        image_path
      )
    `)
    .eq('user_id', authorId) // Use the authenticated user's ID
    .limit(10) // Limit to 10 chapters

  if (error) {
    console.error('Error fetching chapters by author ID:', error)
    return null
  }
  return data
}

export async function getNovelByGenre(genre: string) {
  // select only 6 novels for each genre
  const { data, error } = await supabase
    .from('novels')
    .select(`*,
      image:images (
        image_path
      ),
      author:profiles (
          name
      )`)
    .eq('genre', genre)
    .order('created_at', { ascending: false }) // Sort by creation date
    .limit(6) // Limit to 6 novels per genre

  if (error) {
    console.error('Error fetching novels by genre:', error)
    return null
  }
  return data
}

export async function getCharacterByNovelId(novelId: string) {
    const { data, error } = await supabase
    .from('characters')
    .select(`*,
      image:images (
        image_path
      )`)
    .eq('novel_id', novelId)
    .order('created_at', { ascending: true }) // Sort by creation date

  if (error) {
    console.error('Error fetching characters by novel ID:', error)
    return null
  }
  return data
}

export async function getCharacterByChapterId(chapterId: string) {
  const { data, error } = await supabase
    .from('chapter_character')
    .select(`
      character:characters (
        *,
        image: images (
          image_path
        )
      )
    `)
    .eq('chapter_id', chapterId)

  if (error) {
    console.error('Error fetching characters by chapter ID:', error)
    return null
  }

  return data
}

export async function getImgByPath(imagePath: string) {
  if (!imagePath) {
    console.error('Image path is empty');
    return null;
  }

  //TODO: change to signed
  const { data } = await supabase.storage
  .from('image_bucket')
  .getPublicUrl(imagePath.split('image_bucket/')[1]);

  if (!data) {
    console.error('Error fetching image by path:', imagePath);
    return null;
  }

  return data.publicUrl
}

export async function getPublicImageUrls(type: string) {
  const { data, error } = await supabase
    .from('images')
    .select('*')
    .eq('type', type)  // filter for public images

  if (error) {
    console.error('Error fetching images:', error)
    return []
  }

  const publicUrls = data.map(img => {
    return {
    ...img,
    image_path: `${supabase_url}/storage/v1/object/public/${img.image_path}`
    }
  }
  )

  return publicUrls
}

export async function getUserId(){
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Error fetching user ID:', error)
    return null
  }

  return user?.id || null
}