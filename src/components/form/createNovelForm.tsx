import { Dispatch, useRef } from "react";
import ButtonStpper from "../stepper/buttonStepper";
import CreateNovelPureForm from "./pureForm/createNovelPureForm";
import { createNovel, uploadImageAndInsertPath } from "../api/post";
import { MyFormState } from "@/app/create/page";

export default function CreateNovelForm({ formData, setFormData, steps, completed, activeStep, setActiveStep }:
    { formData: MyFormState, // Adjust type as needed
      setFormData: Dispatch<React.SetStateAction<MyFormState>>,
      steps: string[],
      completed: Record<number, boolean>,
      activeStep: number, 
      setActiveStep: (step: number) => void 
    }) {

    const formRef = useRef<HTMLFormElement>(null);
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
        const form = formRef.current;
        if (form?.checkValidity()) {
            const newActiveStep =
                isLastStep() && !allStepsCompleted()
                    ? // It's the last step, but not all steps have been completed,
                    // find the first step that has been completed
                    steps.findIndex((step, i) => !(i in completed))
                    : activeStep + 1;
            setActiveStep(newActiveStep);
        }
    };

    async function createNovelAndUploadImage(){
        const form = formRef.current;
        if (form?.checkValidity()){
            if (!formData.image || typeof formData.image === 'string') {
                // skip uploading image if image_id is already set or not provided
                createNovel(
                    formData.title,
                    formData.description,
                    formData.genre,
                    formData.image_id || undefined // Use the image_id from formData if available, fallback to an empty string
                ).then((res) => {
                    if (res) {
                        console.log("Novel created successfully:");
                    } else {
                        console.error("Failed to create novel.");
                    }
                }).catch((error) => {
                    console.error("Error creating novel:", error);
                });
            }
            else {
                uploadImageAndInsertPath(formData.image, "upload").then((res) => {
                    if (res.success) {
                        console.log("Image uploaded successfully:");
                    } else {
                        console.error("Image upload failed:", res.error);
                    }
    
                    createNovel(
                        formData.title,
                        formData.description,
                        formData.genre,
                        formData.image_id ?? res.image_id ?? "" // Ensure a fallback to an empty string,
                    ).then((res) => {
                        if (res) {
                            console.log("Novel created successfully:");
                        } else {
                            console.error("Failed to create novel.");
                        }
                    }).catch((error) => {
                        console.error("Error creating novel:", error);
                    });
                })
            }
        } else {
            form?.reportValidity();
        }
    }

    const handleBack = () => {
        setActiveStep(Math.max(activeStep - 1, 0));
    };


    return (
        <div className="w-full max-w-2xl bg-white shadow rounded-b-xl rounded-tl-xl p-8">
            <h1 className="text-2xl font-bold mb-2">สร้างนิยายใหม่</h1>
            <p className="text-sm text-gray-600 mb-8">
                กรอกข้อมูลนิยายของคุณ เช่น ชื่อเรื่อง ประเภท และคำอธิบาย เพื่อเริ่มต้นการสร้างนิยายใหม่
            </p>
            {/* Form */}
            <CreateNovelPureForm setFormData={setFormData} formRef={formRef} />
            <ButtonStpper steps={steps} onCreateNovel={createNovelAndUploadImage} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
        </div>
    )
}