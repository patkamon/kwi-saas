'use client'

import { Dot, Save } from "lucide-react";
import { Editor } from 'primereact/editor'
import { useState } from "react";

import characterList from '@/data/characters.json' assert { type: 'json' };
import { CharacterInterface } from "@/interface/character";
import Link from 'next/link';


export default function EditPage() {
    const [text, setText] = useState('');
    const [characters, setCharacters] = useState(characterList.slice(3, 8) as CharacterInterface[]);

    return (
        <div className="">
            <section className="px-6 py-10 grid grid-cols-4 gap-8 max-w-7xl mx-auto">

                {/* edit */}
                <section className="px-6 py-5 col-span-3">
                    <input className="text-5xl w-full" placeholder="Chapter Title"/>
                    <div className="flex mt-2">
                        <div>Chapter 12</div>
                        <Dot />
                        <div>Draft</div>
                    </div>

                    {/* edit toolbar */}
                    <div className='rounded-xl border-1 mt-6'>
                        <div className="my-editor-wrapper">
                            <Editor className="bg-blue-50" value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: 'fit', minHeight: "400px", maxHeight: "800px", overflow: "scroll" }} />
                        </div>
                    </div>

                </section>

                {/* characters */}
                <section className="col-span-1 flex flex-col gap-4">
                    <Link href='/' className="bg-blue-400 w-full flex items-center hover:cursor-pointer hover:bg-blue-500 justify-center text-xl py-2 rounded-3xl border-blue-400 border-2 text-white">
                        <Save className="mr-2" />
                        Create Chapter
                    </Link>

                    <section className="px-6 py-6 h-fit border-2 border-blue-400 rounded-3xl bg-blue-100">
                        <div className="">
                            <h1 className="text-xl">Characters Appear</h1>
                            {
                                characters.map((character, index) => (
                                    <div key={index} className="border-2 border-pink-3\200 bg-teal-50 rounded-full p-2 grid grid-cols-3 gap-2 my-2 items-center">
                                        <img src={character.img} alt={character.name} className="border-2 border-blue-300 w-16 h-16 col-span-1 rounded-full" />
                                        <div className="col-span-2 h-16">
                                            <h2 className="text-lg font-semibold h-6">{character.name}</h2>
                                            <p className="text-xs font-light text-gray-800 h-10 overflow-hidden text-ellipsis">{character.details}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </section>
                </section>




            </section>
        </div>
    );
}