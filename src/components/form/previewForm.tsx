"use client"
import { useState } from "react";
import ButtonStpper from "../stepper/buttonStepper";
import { Separator } from "@/components/shadcn/separator"
import characterList from '@/data/characters.json' assert { type: 'json' };
import CreateNovelPureForm from "./pureForm/createNovelPureForm";
import ListCreatedCharacter from "./pureForm/listCreatedCharacter";
import { CharacterInterface } from "@/interface/character";
import ConfigurationPureForm from "./pureForm/configurationPureForm";

export default function PreviewForm({ steps, completed, activeStep, setActiveStep }:
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

    return (
        <div className="w-full max-w-2xl bg-white shadow rounded-xl p-8">
            <h1 className="text-2xl font-bold mb-2">ตรวจสอบความถูกต้อง</h1>
            <p className="text-sm text-gray-600 mb-8">
                ตรวจสอบข้อมูลนิยายของคุณก่อนที่จะสร้างนิยายจริง เช่น ชื่อเรื่อง ประเภท คำอธิบาย และตัวละครหลัก
            </p>

            <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg">
                <section>
                    <h1 className="text-2xl font-bold mb-2">สร้างนิยายใหม่</h1>
                    <p className="text-sm text-gray-600 mb-8">
                        กรอกข้อมูลนิยายของคุณ เช่น ชื่อเรื่อง ประเภท และคำอธิบาย เพื่อเริ่มต้นการสร้างนิยายใหม่
                    </p>
                    <CreateNovelPureForm />
                </section>

                <Separator className="my-4" />

                <section>
                    <h1 className="text-2xl font-bold mb-2">สร้างตัวละครหลัก</h1>
                    <p className="text-sm text-gray-600 mb-8">
                        สร้างตัวละครหลักสำหรับนิยายของคุณ มากสุด 3 (สามารถเพิ่มได้อีกหลังจากสร้างนิยายแล้ว)
                    </p>

                    <ListCreatedCharacter characters={characters} />
                </section>

                <Separator className="my-4" />

                <section>
                    <h1 className="text-2xl font-bold mb-2">การควบคุม</h1>
                    <p className="text-sm text-gray-600 mb-8">
                        ควบคุมการตั้งค่าของนิยาย เช่น การเปิดให้ผู้อื่นอ่านหรือไม่ การอนุญาตให้แสดงความคิดเห็น และอื่นๆ
                    </p>

                    {/* Form */}
                    <ConfigurationPureForm/>
                </section>
            </div>

            <ButtonStpper steps={steps} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
        </div>
    )
}