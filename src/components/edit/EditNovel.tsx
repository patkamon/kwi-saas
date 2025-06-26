'use client'

import { ChapterInterface } from "@/interface/chapter";
import { getLocalDate } from "@/lib/utils";
import { Dot } from "lucide-react";
import { useState } from "react";
import { Save } from "lucide-react";
import { CharacterInterface } from "@/interface/character";
import { updateChapter } from "../api/put";
import { useRouter } from "next/navigation";

export default function EditNovel({ chapter, characters }: { chapter: ChapterInterface, characters?: CharacterInterface[] }) {
    const [text, setText] = useState(chapter.content || '' as string);
    const [title, setTitle] = useState(chapter.title || '' as string);
    
    const router = useRouter();

    function callUpdateChapter(){
        updateChapter(
            chapter.chapter_id,
            chapter.title,
            text,
            chapter.image ? chapter.image.image_id : null
        ).then((data) => {
            if (data) {
                console.log("Chapter updated successfully:", data);
            } else {
                console.error("Failed to update chapter");
            }
        }).catch((error) => {
            console.error("Error updating chapter:", error);
        });
        router.push("/")
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top after saving
    }
    
    return (
        <section className="py-10 grid grid-cols-4 mx-auto">
            <section className="px-6 py-5 col-span-3">
                <input className="text-5xl w-full" placeholder={title} onChange={
                    (e) => {
                        setTitle(e.target.value);
                        chapter.title = e.target.value; // Update the chapter title
                    }
                } />
                <div className="flex mt-2">
                    <div>{getLocalDate(chapter.created_at)}</div>
                    <Dot />
                    <div>Draft</div>
                </div>

                {/* edit toolbar */}
                {/* <div className='rounded-xl border-1 mt-6'> */}
                    <div className="my-editor-wrapper mt-4">
                        <textarea className="bg-blue-50 w-full border-1 rounded-xl p-2"
                            value={text} 
                            onChange={(e) => setText(e.target.value || '')} 
                            style={{ height: 'fit', minHeight: "400px", maxHeight: "800px", overflow: "scroll" }} />
                    </div>
                {/* </div> */}
            </section>
            <section className="col-span-1 flex flex-col gap-4 w-full">
                <button onClick={()=>{callUpdateChapter()}}  className="bg-blue-400 w-full mt-6 flex items-center hover:cursor-pointer hover:bg-blue-500 justify-center text-xl py-2 rounded-3xl border-blue-400 border-2 text-white">
                    <Save className="mr-2" />
                    บันทึก
                </button>

                <section className="px-2 py-2 h-fit border-2 border-blue-400 rounded-3xl bg-blue-100">
                    <div className="">
                        <h1 className="text-xl ml-4">ตัวละครที่ปรากฏ</h1>
                        {
                            characters?.map((character, index) => (
                                <div key={index} className="border-2 border-pink-3\200 bg-teal-50 rounded-full p-2 grid grid-cols-5 gap-2 my-2 items-center">
                                    <img src={character.image?.image_path || "/lovecraft_brew.jpeg"} alt={character.name} className="border-2 border-blue-300 w-16 h-16 col-span-2 rounded-full object-cover" />
                                    <div className="col-span-3 h-16">
                                        <h2 className="text-lg font-semibold h-6">{character.name}</h2>
                                        <p className="text-xs font-light text-gray-800 h-10 overflow-hidden text-ellipsis">{character.description}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </section>
            </section>
        </section>

    )
}


