// app/novel/[novel_id]/chapter/[chapter_id]/page.tsx

import EditNovel from '@/components/edit/EditNovel';
import { getChapterById, getCharacterByChapterId } from '@/components/api/get';
import { ChapterInterface } from '@/interface/chapter';
import { CharacterInterface } from '@/interface/character';

type Params = Promise<{ slug: string[] }>;

export default async function EditPage({ params }: { params: Params }) {

const { slug } = await params;
const [, chapter_id] = slug;
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
