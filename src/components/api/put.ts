import { createClient } from "@/utils/supabase/client";

const supabase = createClient()

export async function updateChapter(
    chapter_id: string,
    title: string,
    content: string,
    image_id: string | null
    ) {
    const { data, error } = await supabase
        .from('chapters')
        .update({
        title,
        content,
        image_id
        })
        .eq('chapter_id', chapter_id)
        .select('*')
        .single();
    
    if (error) {
        console.error('Error updating chapter:', error);
        return null;
    }
    
    return data;
    }