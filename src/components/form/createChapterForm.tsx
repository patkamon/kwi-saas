'use client'
import { useEffect, useState } from "react";
import CharacterDialog from "../dialog/characterDialog";
import { NovelInterface } from '@/interface/novel';
import { CharacterInterface } from "@/interface/character";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCharacterByNovelId, getImgByPath, getNovelByAuthorId, getUserId } from "../api/get";
import { createChapter, createChracterChapter, generateNovel } from "../api/post";
import ReduceCreditDialog from "../dialog/reduceCreditDialog";
import { toast } from 'react-toastify';
import Image from "next/image";

export default function CreateChapterForm() {
    const [characters, setCharacters] = useState<CharacterInterface[]>(
     [] as CharacterInterface[]
    );
    const [selectedCharacter, setSelectedCharacter] = useState<string[]>([]);

    const [ownNovels, setOwnNovels] = useState<NovelInterface[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        novel_id: '',
        content: 'nah',
        image: undefined,
        description: ''
    });
    const [imageMap, setImageMap] = useState<Record<string, string>>({});

    const fallbackImg = "/lovecraft_brew.jpeg";

    useEffect(() => {
        const loadImages = async () => {
            const newImageMap: Record<string, string> = {};

            await Promise.all(
                characters.map(async (character) => {
                    const path = character.image?.image_path;
                    if (path) {
                        const publicUrl = await getImgByPath(path);
                        newImageMap[character.character_id] = publicUrl || fallbackImg;
                    } else {
                        newImageMap[character.character_id] = fallbackImg;
                    }
                })
            );

            setImageMap(newImageMap);
        };

        loadImages();
    }, [characters]);


    useEffect(() => {
        async function fetchNovels() {
            const userId = await getUserId();
            const novels = await getNovelByAuthorId(userId as unknown as string) as NovelInterface[];
            setOwnNovels(novels);
            if (novels && novels.length > 0) {
                setFormData({
                    ...formData,
                    novel_id: novels[0].novel_id // Set the first novel as default
                });
            }
        }
        fetchNovels();
    }, []);

    useEffect(() => {
        async function fetchCharacter() {
            if (formData.novel_id === '') {
                console.warn("Novel ID is not set. Cannot fetch characters.");
                setCharacters([]);
                return;
            }
            const fetchCharacter = await getCharacterByNovelId(formData.novel_id);
            if (!fetchCharacter) {
                console.error("Failed to fetch characters for novel ID:", formData.novel_id);
                setCharacters([]);
                return;
            }
            setCharacters(fetchCharacter);
        }

        fetchCharacter();
    }, [formData.novel_id]);
    



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
    const handleCreateChapter = async () => {
        const promise = (async () => {
            console.log("Chapter created!");
    
            const { success, result } = await createChapter(
                formData.title,
                formData.novel_id,
                formData.content,
                formData.image,
            );
    
            if (!success) throw new Error("Failed to create chapter");
    
            await createChracterChapter(
                result!.chapter_id,
                selectedCharacter
            );
    
            const selectNovel = ownNovels.find(novel => novel.novel_id === formData.novel_id);
            const fullSelectedCharacter = characters.filter(
                character => selectedCharacter.includes(character.character_id)
            ).map(
                (c) => `${c.name} (${c.description})`
            ).join(", ");
    
            console.log("Selected Characters:", fullSelectedCharacter);
    
            const content = await generateNovel(
                selectNovel!.title,
                selectNovel!.genre,
                fullSelectedCharacter,
                " ชื่อตอน " + formData.title + ", " + formData.description,
                formData.novel_id,
                result!.chapter_id
            );
    
            setFormData((prev) => ({ ...prev, content }));
    
            return result!.chapter_id; // used for redirect after
        })();
    
        try {
            const chapter_id = await toast.promise(
                promise,
                {
                    pending: 'กำลังสร้างตอนใหม่...',
                    success: 'สร้างเนื้อหาสำเร็จ 🎉',
                    error: 'เกิดข้อผิดพลาดในการสร้างตอน 😢'
                }
            );
    
            router.push(`/novel/${formData.novel_id}/chapter/${chapter_id}/edit`);
        } catch (err) {
            console.error(err);
            // You can add an additional toast here if needed
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
                        {characters.filter(character => selectedCharacter.includes(character.character_id)).map((selectedCharacter) => (
                            <button onClick={() => handleCharacterSelect(selectedCharacter.character_id)} key={selectedCharacter.character_id} className="flex flex-col justify-center items-center mb-2">
                                <div key={selectedCharacter.character_id} className={`rounded-full hover:bg-gray-500 hover:border-pink-400 relative w-24 h-24 border-2 border-blue-400 group`}>
                                    <Image
                                        src={imageMap[selectedCharacter.character_id] || fallbackImg}
                                        width={96}
                                        height={96}
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
                            characters={characters}
                            imageMap={imageMap}
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
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                description: e.target.value
                            });
                        }}
                        placeholder="กรุณาใส่เค้าโครงของตอนนี้"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    ></textarea>
                </div>

            </form>

            <div className="flex justify-end">
                <ReduceCreditDialog cost={20} handleFunction={handleCreateChapter}></ReduceCreditDialog>
            </div>
        </div>
    )
}