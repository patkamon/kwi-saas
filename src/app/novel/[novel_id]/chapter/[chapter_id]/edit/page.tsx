import { ChapterInterface } from "@/interface/chapter";
import { getChapterById } from "@/components/api/get";
import EditNovel from "@/components/edit/EditNovel";


export default async function EditPage({params}: { params: { novel_id: string, chapter_id: string } }) {
    // const [characters, setCharacters] = useState(characterList.slice(3, 8) as CharacterInterface[]);
    const chapterData = await getChapterById(params.chapter_id)

    return (
        <div className="">
                <EditNovel chapter={chapterData as ChapterInterface} />
        </div>
    );
}