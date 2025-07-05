import ImageDialog from "@/components/dialog/imageDialog";
import { Dispatch, RefObject } from "react";
import { GenreOption } from '@/interface/genre';
import genreList from '@/data/genres.json' assert { type: 'json' };
import { MyFormState } from "@/app/create/page";


export default function CreateNovelPureForm({ setFormData, formRef }: { 
    setFormData: Dispatch<React.SetStateAction<MyFormState>>,
    formRef?: RefObject<HTMLFormElement | null> }) {

    const items = genreList as GenreOption[];

    function setBack(key: string, value: string){
        if (key === "genre"){
            const selectedGenre = items.find((item) => item.name === value);
            if (selectedGenre) {
                value = selectedGenre.db_value; // Use the db_value for the genre
            }
        }
        setFormData((prevData) => ({
            ...prevData,
            [key]: value
        }));
    }


    return (
        <form onChange={(e)=> { 
            const target = e.target as HTMLInputElement | HTMLSelectElement;
            setBack(target.id, target.value);
        }} className="space-y-6" ref={formRef}>
            {/* Title */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="title">
                    ชื่อเรื่อง
                </label>
                <input
                    type="text"
                    id="title"
                    placeholder="กรุณาใส่ชื่อเรื่องนิยาย"  
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                />
            </div>

            {/* Genre */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="genre">
                    หมวดหมู่
                </label>
                <select
                    id="genre"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    required
                >
                    {
                        genreList.map((genre) => (
                            <option key={genre.value} value={genre.name}>
                                {genre.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                    เรื่องย่อ
                </label>
                <textarea
                    id="description"
                    rows={4}
                    placeholder="กรุณาใส่เรื่องย่อของนิยาย"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    required
                ></textarea>
            </div>

            {/* Cover Image Upload */}
            <ImageDialog setFormData={setFormData}/>
        </form>
    )
}
