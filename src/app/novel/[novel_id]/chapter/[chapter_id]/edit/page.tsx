// app/novel/[novel_id]/chapter/[chapter_id]/page.tsx

import EditNovel from '@/components/edit/EditNovel';
import { getChapterById, getCharacterByChapterId } from '@/components/api/get';
import { ChapterInterface } from '@/interface/chapter';
import { CharacterInterface } from '@/interface/character';


export default async function EditPage({ params }: { params: Promise<{ novel_id: string, chapter_id: string }> }) {
  
  const { novel_id, chapter_id } = await params;
  if (!novel_id || !chapter_id) {
    return <div>Novel ID and Chapter ID are required</div>;
  }
  // fetch chapter and character data on server
  const chapterData: ChapterInterface = await getChapterById(chapter_id);
  const characters: CharacterInterface[] = (await getCharacterByChapterId(chapter_id)) as unknown as CharacterInterface[];

  return (
    <div>
      {/* pass the data as props to client component */}
      <EditNovel chapter={chapterData} characters={characters} />
    </div>
  );
}
