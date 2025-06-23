import { useState } from "react";
import ButtonStpper from "../stepper/buttonStepper";
import { CharacterInterface } from "@/interface/character";
import CreateMainCharacterPureForm from "./pureForm/createMainCharacterPureForm";
import ListCreatedCharacter from "./pureForm/listCreatedCharacter";
import { createCharacter, uploadImageAndInsertPath } from "../api/post";

export default function CreateMainCharacterForm({ steps, completed, activeStep, setActiveStep }:
    { steps?: string[], completed?: Record<number, boolean>, activeStep?: number, setActiveStep?: (step: number) => void }) {

    const [characters, setCharacters] = useState<CharacterInterface[]>(
        [] as CharacterInterface[]
    );

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

    const addCharacter = ({name, description , img} : { 
        name: string, 
        description: string, 
        img?: string | undefined
    }) => {
        console.log("Adding character:", name, description, img);
        if (characters.length >= 3) {
            alert("คุณสามารถเพิ่มตัวละครได้สูงสุด 3 ตัว\nสามารถเพิ่มได้อีก หลังสร้างนิยาย");
            return;
        }
        else{
            const newCharacter = {
                id: characters.length + 1,
                name,
                description: description,
                image: img ? {
                    image_id: img,
                    image_path: img,
                } : undefined,
            };
            setCharacters([...characters, newCharacter]);
        }

    }

    function handleCreateCharacter(){
        characters.forEach((character) => {
            let imgPath = null
            if (character.image){
                uploadImageAndInsertPath(character.image.image_id).then((results) => {
                    if (results) {
                        imgPath = results.image_id;
                        createCharacter(
                            character.name,
                            character.description,
                            imgPath,
                            "a998c624-b4b4-48b9-8798-209504f986b4" // TODO: Replace with actual novel ID
                        ).then((createdCharacter) => {
                            if (createdCharacter) {
                                console.log("Character created successfully:", createdCharacter);
                            } else {
                                console.error("Failed to create character.");
                            }
                        }
                        )
                    }
                }
                ).catch((error) => {
                    console.error("Error uploading image:", error);
                });
            }else{
                createCharacter(
                    character.name,
                    character.description,
                    imgPath,
                    "a998c624-b4b4-48b9-8798-209504f986b4" // Replace with actual novel ID
                ).then((createdCharacter) => {
                    if (createdCharacter) {
                        console.log("Character created successfully:", createdCharacter);
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


            {/* Form */}
            <CreateMainCharacterPureForm addCharacter={addCharacter} />

            {/* Character List */}
            <ListCreatedCharacter characters={characters} />


            { (steps && activeStep) ?
            (
                <ButtonStpper steps={steps} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
            ) :
            (
            <div className="flex justify-end">
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