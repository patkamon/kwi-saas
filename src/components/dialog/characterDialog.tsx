'use client';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/shadcn/dialog"
import { TabsList, TabsTrigger, Tabs } from "@/components/shadcn/tabs"
import { CharacterInterface } from "@/interface/character";
import { Check } from "lucide-react";


export default function CharacterDialog({ characters, imageMap, handleCharacterSelect, isCharacterSelected }: {
    characters: CharacterInterface[];
    imageMap: Record<string, string>;
    handleCharacterSelect: (characterId: string) => void;
    isCharacterSelected: (characterId: string) => boolean;
}) {
    const fallbackImg = "/lovecraft_brew.jpeg";

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="w-24 h-24 bg-white hover:bg-blue-200 text-blue-300 border-blue-300 rounded-full border-2 border-dashed flex justify-center items-center">
                        <p className="text-3xl">+</p>
                    </div>
                </DialogTrigger>
                <DialogContent className='flex justify-center'>
                    <DialogHeader>
                        <Tabs defaultValue="upload">
                            <DialogTitle>
                                <TabsList>
                                    <TabsTrigger value="character">ตัวละคร</TabsTrigger>
                                </TabsList>
                            </DialogTitle>
                            <div className="grid grid-cols-4 gap-2 my-4">
                                {characters.map((character) => (
                                    <button onClick={() => handleCharacterSelect(character.character_id)} key={character.character_id} className="flex flex-col justify-center items-center mb-2">
                                        <div className={`rounded-full relative w-24 h-24 ${isCharacterSelected(character.character_id) ? 'border-4 border-blue-500 bg-pink-400' : 'border-2 border-gray-300 hover:border-white'} `}>
                                            <img
                                                src={imageMap[character.character_id] || fallbackImg}
                                                alt={character.name}
                                                className="mix-blend-multiply w-full h-full object-cover rounded-full mr-2"
                                            />
                                            {isCharacterSelected(character.character_id) && <div className="absolute inset-0 flex justify-center items-center rounded-lg">
                                                <Check className="text-white w-12 h-12" />
                                            </div>
                                            }
                                        </div>
                                        <span className="text-sm">{character.name}</span>
                                    </button>
                                ))}
                            </div>
                            <DialogClose asChild>
                                <div className="flex justify-end mt-2">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-black text-white  rounded-md hover:bg-gray-900 hover:cursor-pointer"
                                    >
                                        เพิ่ม
                                    </button>
                                </div>
                            </DialogClose>
                        </Tabs>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}