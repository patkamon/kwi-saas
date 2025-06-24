import { ChapterInterface } from "@/interface/chapter";
import { getChapterById, getCharacterByChapterId } from "@/components/api/get";
import EditNovel from "@/components/edit/EditNovel";
import { CharacterInterface } from "@/interface/character";


export default async function EditPage({params}: { params: { novel_id: string, chapter_id: string } }) {
    // const [characters, setCharacters] = useState(characterList.slice(3, 8) as CharacterInterface[]);
    const chapterData = await getChapterById(params.chapter_id)
    const characters = await getCharacterByChapterId(params.chapter_id);

    console.log("Characters for chapter:", characters?.map((c)=>c.character) );

    return (
        <div className="">
                <EditNovel 
                    chapter={chapterData as ChapterInterface}
                    characters={characters?.map((c)=>c.character) as CharacterInterface[]}
                    />
        </div>
    );
}