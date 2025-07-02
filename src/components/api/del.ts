import { ChapterInterface } from "@/interface/chapter";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient()


export function deleteChapter(chapterId: string){
    return supabase
        .from('chapters')
        .delete()
        .eq('chapter_id', chapterId)
        .select('*')
        .single()
        .then(({ data, error }) => {
        if (error) {
            console.error('Error deleting chapter:', error);
            return null;
        }
        return data as ChapterInterface;
        });
}

