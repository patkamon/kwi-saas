'use client';

import { MyFormState } from "@/app/create/page";
import ImageDialog from "@/components/dialog/imageDialog";
import { useState } from "react";

export default function CreateMainCharacterPureForm({ addCharacter }: { addCharacter: ({ name, description, img, image_id }: { name: string; description: string; img?: string; image_id?: string }) => void }) {
    
    const [img, setImg] = useState<MyFormState>({ 
        image: undefined, 
        image_id: undefined, 
        title: "", 
        description: "", 
        genre: "" 
    });
    const [resetCounter, setResetCounter] = useState(0);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target;
        const name = ((form as HTMLFormElement).elements.namedItem("name") as HTMLInputElement | null)?.value;
        const details = ((form as HTMLFormElement).elements.namedItem("details") as HTMLInputElement | null)?.value;

        addCharacter({
            name: name || "",
            description: details || "",
            img: img?.image,
            image_id: img?.image_id
        });
        (form as HTMLFormElement).reset();
        setImg({ 
            image: undefined, 
            image_id: undefined, 
            title: "", 
            description: "", 
            genre: "" 
        }); // Reset the image state after submission
        setResetCounter(prev => prev + 1); // Increment reset counter to trigger re-render
    }

    return (
        <form onSubmit={(e)=>handleSubmit(e)} className="space-y-6 border-2 border-blue-400 rounded-lg flex border-dashed mb-4">
            <div   className="flex flex-col justify-around items-center mx-4">
                {/* Cover Image Upload */}
                <ImageDialog setFormData={setImg} resetSignal={resetCounter}/>
                <button type="submit" className="px-2 rounded-md border border-pink-400 bg-pink-200 min-w-16 hover:border-2 flex justify-center">เพิ่ม</button>
            </div>

            <div className="flex flex-col w-full mx-4 my-4 gap-2">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                        ชื่อตัวละคร
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="สมชาย"
                        className="w-full border border-gray-300 placeholder:font-semibold rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    />
                </div>

                {/* Details */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="details">
                        ลักษณะตัวละคร
                    </label>
                    <textarea
                        id="details"
                        rows={4}
                        name="details"
                        placeholder="ตัวเล็ก กางเกงสีน้ำเงิน ผมดำ"
                        className="w-full border border-gray-300 placeholder:font-semibold rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    ></textarea>
                </div>
            </div>
        </form>
    )
}