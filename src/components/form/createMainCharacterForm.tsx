import { useState } from "react";
import ButtonStpper from "../stepper/buttonStepper";
import characterList from '@/data/characters.json' assert { type: 'json' };
import { CharacterInterface } from "@/interface/character";
import CreateMainCharacterPureForm from "./pureForm/createMainCharacterPureForm";
import ListCreatedCharacter from "./pureForm/listCreatedCharacter";

export default function CreateMainCharacterForm({ steps, completed, activeStep, setActiveStep }:
    { steps: string[], completed: Record<number, boolean>, activeStep: number, setActiveStep: (step: number) => void }) {

    const [characters, setCharacters] = useState<CharacterInterface[]>(
        characterList as CharacterInterface[]
    );

    const handleNext = () => {
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
        setActiveStep(Math.max(activeStep - 1, 0));
    };

    const addCharacter = (e: any) => {
        e.preventDefault();
        if (characters.length >= 3) {
            alert("คุณสามารถเพิ่มตัวละครได้สูงสุด 3 ตัว\nสามารถเพิ่มได้อีก หลังสร้างนิยาย");
            return;
        }
        const newCharacter = {
            id: characters.length + 1,
            name: "",
            details: ""
        };
        setCharacters([...characters, newCharacter]);
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

            <ButtonStpper steps={steps} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
        </div>
    )
}