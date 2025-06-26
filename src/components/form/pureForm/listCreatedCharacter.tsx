import ImageDialog from "@/components/dialog/imageDialog";
import { CharacterInterface } from "@/interface/character";

export default function ListCreatedCharacter({ characters }: { characters: CharacterInterface[] }) {
    return (<div className="border-t-2 border-b-2 rounded-md border-blue-200">
        {characters.map((character, index) => (
            <div className="border-x-2 flex hover:bg-pink-100 border-blue-200 first:rounded-t-md last:rounded-b-md" key={character.id}>
                <div className="flex flex-col justify-around items-center mx-4">
                    {/* Cover Image Upload */}
                    <ImageDialog selected_img={
                        character.image ? character.image?.image_id ?`data:image/png;base64,${character.image.image_path}` // Use base64 if available
                            : URL.createObjectURL(character.image?.image_path)
                            : undefined} />
                    <button className="px-2 rounded-md border border-pink-400 bg-pink-200 hover:border-2 min-w-16 flex justify-center">ลบ</button>
                </div>

                <div className="flex flex-col w-full mx-4 my-4 gap-2">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">
                            ชื่อตัวละคร
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={character.name}
                            disabled
                            placeholder="สมชาย"
                            className="w-full border text-gray-500 border-gray-300 placeholder:font-semibold rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
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
                            value={character.description}
                            disabled
                            placeholder="ตัวเล็ก กางเกงสีน้ำเงิน ผมดำ"
                            className="w-full border text-gray-500 border-gray-300 placeholder:font-semibold rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        ></textarea>
                    </div>
                </div>
            </div>
        )
        )
        }
    </div>)
}