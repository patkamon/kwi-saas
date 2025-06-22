'use client'
import { useEffect, useState } from "react";
import CharacterDialog from "../dialog/characterDialog";
import { NovelInterface } from '@/interface/novel';
import { CharacterInterface } from "@/interface/character";
import characterList from '@/data/characters.json' assert { type: 'json' };
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getNovelByAuthorId } from "../api/get";
import { createChapter } from "../api/post";

export default function CreateChapterForm() {
    const [characters, setCharacters] = useState<CharacterInterface[]>(
        characterList as CharacterInterface[]
    );
    // get user_id from session
    const userId = sessionStorage.getItem('user_id');
    const [ownNovels, setOwnNovels] = useState<NovelInterface[]>([]);
    if (!userId) {
        throw new Error("User ID not found in session storage");
    }
    const [formData, setFormData] = useState({
        title: '',
        novel_id: '',
        content: '<b>This is a new chapter</b>',
        image: undefined,
    });

    useEffect(() => {
        async function fetchNovels() {
            const novels = await getNovelByAuthorId(userId);
            setOwnNovels(novels);
            if (novels && novels.length > 0) {
                setFormData({
                    ...formData,
                    novel_id: novels[0].novel_id // Set the first novel as default
                });
            }
        }

        fetchNovels();
    }, [userId]);


    const [selectedCharacter, setSelectedCharacter] = useState<string[]>([]);

    const handleCharacterSelect = (characterId: string) => {
        if (selectedCharacter.includes(characterId)) {
            setSelectedCharacter(selectedCharacter.filter(id => id !== characterId));
        } else {
            setSelectedCharacter([...selectedCharacter, characterId]);
        }
    };

    const isCharacterSelected = (characterId: string) => {
        return selectedCharacter.includes(characterId);
    };

    const router = useRouter();
    const handleCreateChapter = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Logic to create the chapter
        console.log("Chapter created!");
        // route to homepage nextjs

        const {success, result} = await createChapter(
            formData.title,
            formData.novel_id,
            formData.content,
            formData.image,
        );

        if (!success) {
            console.error("Failed to create chapter:", result);
            return;
        }else{
            router.push(`/novel/${formData.novel_id}/chapter/${result.chapter_id}/edit`);
        }

    };

    return (
        <div className="w-full max-w-2xl bg-white shadow rounded-b-xl rounded-tl-xl p-8">
            <h1 className="text-2xl font-bold mb-2">สร้างตอนใหม่</h1>
            <p className="text-sm text-gray-600 mb-8">
                สร้างตอนใหม่สำหรับนิยายของคุณ เลือกตัวละครที่ปรากฏในตอนนี้และกรอกข้อมูลที่จำเป็น
            </p>
            {/* Form */}
            <form className="space-y-6">
                {/* Genre */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="novel">
                        นิยาย
                    </label>
                    <select
                        id="novel"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                novel_id: e.target.value
                            });
                        }}
                    >
                        {ownNovels.map((novel) => (
                            <option key={novel.novel_id} value={novel.novel_id}>{novel.title}</option>
                        ))
                        }
                    </select>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="title">
                        ชื่อตอน
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter your chapter title"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                title: e.target.value
                            });
                        }}
                    />
                </div>

                {/* Chose Characters */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="description">
                        ตัวละครที่ปรากฏในตอนนี้  (ไม่จำเป็นต้องระบุ)
                    </label>
                    <div className="mt-2 grid grid-cols-6 gap-2">
                        {characters.filter(character => selectedCharacter.includes(character.id)).map((selectedCharacter, index) => (
                            <button onClick={() => handleCharacterSelect(selectedCharacter.id)} key={selectedCharacter.id} className="flex flex-col justify-center items-center mb-2">
                                <div key={selectedCharacter.id} className={`rounded-full hover:bg-gray-500 hover:border-pink-400 relative w-24 h-24 border-2 border-blue-400 group`}>
                                    <img
                                        src={selectedCharacter.img}
                                        alt={selectedCharacter.name}
                                        className={`mix-blend-multiply w-full h-full object-cover  rounded-full mr-2`}
                                    />
                                    <div className="absolute inset-0 group-hover:flex justify-center items-center rounded-lg hidden ">
                                        <Trash2 className="text-pink-500 w-12 h-12" />
                                    </div>
                                </div>
                            </button>
                        ))
                        }
                        <CharacterDialog
                            handleCharacterSelect={handleCharacterSelect}
                            isCharacterSelected={isCharacterSelected}
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="description">
                        เค้าโครงของตอน (ไม่จำเป็นต้องระบุ)
                    </label>
                    <textarea
                        id="description"
                        rows={8}
                        placeholder="Brief description of your chapter"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    ></textarea>
                </div>

            </form>

            <div className="flex justify-end">
                <button
                    type="submit"
                    onClick={handleCreateChapter}
                    className="px-4 py-2 mt-4 bg-black text-white rounded-md hover:bg-gray-900 hover:cursor-pointer"
                >สร้าง</button>
            </div>
        </div>
    )
}