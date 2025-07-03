'use client';
import { useEffect, useState } from "react";
import ButtonStpper from "../stepper/buttonStepper";
import { CharacterInterface } from "@/interface/character";
import CreateMainCharacterPureForm from "./pureForm/createMainCharacterPureForm";
import ListCreatedCharacter from "./pureForm/listCreatedCharacter";
import { createCharacter, uploadImageAndInsertPath } from "../api/post";
import { NovelInterface } from "@/interface/novel";
import { getNovelByAuthorId, getUserId } from "../api/get";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ImageInterface } from "@/interface/image";

export default function CreateMainCharacterForm({ steps, completed, activeStep, setActiveStep }:
    { steps?: string[], completed?: Record<number, boolean>, activeStep?: number, setActiveStep?: (step: number) => void }) {

    const [characters, setCharacters] = useState<CharacterInterface[]>(
        [] as CharacterInterface[]
    );
    const [novelId, setNovelId] = useState('' as string); // Store the novel ID if needed
    const [ownNovels, setOwnNovels] = useState<NovelInterface[]>([]);

    const router = useRouter();

    useEffect(() => {
        async function fetchNovels() {
            const userId = await getUserId();
            const novels = await getNovelByAuthorId(userId!);
            setOwnNovels(novels!);
            if (novels && novels.length > 0) {
                setNovelId(novels[0].novel_id);
            }
        }
        fetchNovels();
    }, []);


    const handleNext = () => {
        if (setActiveStep === undefined || activeStep === undefined || steps === undefined || completed === undefined) return;
        const totalSteps = () => {
            return steps.length;
        };
        const completedSteps = () => {
            return Object.keys(completed).length;
        };
        const allStepsCompleted = () => {
            return completedSteps() === totalSteps();
        };
        const isLastStep = () => {
            return activeStep === totalSteps() - 1;
        };
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        if (setActiveStep === undefined || activeStep === undefined) return;
        setActiveStep(Math.max(activeStep - 1, 0));
    };

    const addCharacter = ({ name, description, img, image_id }: {
        name: string,
        description: string,
        img?: string | undefined
        image_id?: string | undefined
    }) => {
        if (characters.length >= 3) {
            alert("คุณสามารถเพิ่มตัวละครได้สูงสุด 3 ตัว\nสามารถเพิ่มได้อีก หลังสร้างนิยาย");
            return;
        }
        else {
            const newCharacter: CharacterInterface = {
                character_id: Math.random().toString(36).substring(2, 15), // Generate a random ID
                name,
                description: description,
                novel_id: novelId,
                image_id: image_id || undefined,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                image: {
                    image_path: img,
                    image_id: image_id,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    created_by: "system", // Replace with appropriate value if available
                    type: "character_image", // Replace with appropriate value if available
                } as ImageInterface
            };
            setCharacters([...characters, newCharacter]);
        }

    }

    const removeCharacter = (index: number) => {
        setCharacters(characters.filter((_, i) => i !== index));
    }

    function handleCreateCharacter() {
        characters.forEach((character) => {
            let img_id = null
            if (character.image) {
                // already upload image (gen)
                if (character.image.image_id) {
                    // skip upload if image_id is already present
                    createCharacter(
                        character.name,
                        character.description,
                        character.image.image_id,
                        novelId
                    ).then((createdCharacter) => {
                        if (createdCharacter) {
                            toast.success("สร้างตัวละครสำเร็จ");
                            router.push(`/`);
                        } else {
                            console.error("Failed to create character.");
                        }
                    })
                }
                else { // upload image
                    uploadImageAndInsertPath(character.image.image_path as unknown as File, "upload").then((results) => {
                        if (results) {
                            img_id = results.image_id;
                            createCharacter(
                                character.name,
                                character.description,
                                img_id!,
                                novelId
                            ).then((createdCharacter) => {
                                if (createdCharacter) {
                                    toast.success("สร้างตัวละครสำเร็จ");
                                    router.push(`/`);
                                } else {
                                    console.error("Failed to create character.");
                                }
                            }
                            )
                        }
                    }).catch((error) => {
                        console.error("Error uploading image:", error);
                    });
                }
            } else { // no image
                createCharacter(
                    character.name,
                    character.description,
                    null,
                    novelId
                ).then((createdCharacter) => {
                    if (createdCharacter) {
                        toast.success("สร้างตัวละครสำเร็จ");
                        router.push(`/`);
                    } else {
                        console.error("Failed to create character.");
                    }
                })
            }
        })


    }

    return (
        <div className="w-full max-w-2xl bg-white shadow rounded-xl p-8">
            <h1 className="text-2xl font-bold mb-2">สร้างตัวละครหลัก</h1>
            <p className="text-sm text-gray-600 mb-8">
                สร้างตัวละครหลักสำหรับนิยายของคุณ มากสุด 3 (สามารถเพิ่มได้อีกหลังจากสร้างนิยายแล้ว)
            </p>

            <div className="flex justify-end items-center gap-4 mb-4">
                <label className="block text-xl font-medium mb-1" htmlFor="novel">
                    นิยาย:
                </label>
                <select
                    id="novel"
                    className="w-[30%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    onChange={(e) => {
                        setNovelId(e.target.value);
                    }}
                >
                    {ownNovels.map((novel) => (
                        <option key={novel.novel_id} value={novel.novel_id}>{novel.title}</option>
                    ))
                    }
                </select>
            </div>


            {/* Form */}
            <CreateMainCharacterPureForm addCharacter={addCharacter} />

            {/* Character List */}
            <ListCreatedCharacter characters={characters} removeCharacter={removeCharacter} />


            {(steps && activeStep) ?
                (
                    <ButtonStpper steps={steps} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
                ) :
                (
                    characters.length > 0 && <div className="flex justify-end">
                        <button
                            type="submit"
                            onClick={handleCreateCharacter}
                            className="px-4 py-2 mt-4 bg-black text-white rounded-md hover:bg-gray-900 hover:cursor-pointer"
                        >สร้าง</button>
                    </div>
                )
            }


        </div>
    )
}