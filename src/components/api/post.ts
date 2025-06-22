import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


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

