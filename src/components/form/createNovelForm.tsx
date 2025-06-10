import { useRef } from "react";
import ImageDialog from "../dialog/imageDialog";
import ButtonStpper from "../stepper/buttonStepper";

export default function CreateNovelForm({ steps, completed, activeStep, setActiveStep }:
    { steps: string[], completed: Record<number, boolean>, activeStep: number, setActiveStep: (step: number) => void }) {

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
        } else {
            form?.reportValidity();
        }
    };

    const handleBack = () => {
        setActiveStep(Math.max(activeStep - 1, 0));
    };


    return (
        <div className="w-full max-w-2xl bg-white shadow rounded-b-xl rounded-tl-xl p-8">
            <h1 className="text-2xl font-bold mb-2">Create New Novel</h1>
            <p className="text-sm text-gray-600 mb-8">
                Start crafting your story with our AI-powered writing assistant
            </p>
            {/* Form */}
            <form className="space-y-6" ref={formRef}>
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter your novel title"
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    />
                </div>

                {/* Genre */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="genre">
                        Genre
                    </label>
                    <select
                        id="genre"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        required
                    >
                        <option>Fantasy</option>
                        <option>Sci-Fi</option>
                        <option>Romance</option>
                        <option>Horror</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        placeholder="Brief description of your story"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        required
                    ></textarea>
                </div>

                {/* Cover Image Upload */}
                <ImageDialog />
            </form>
            <ButtonStpper steps={steps} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
        </div>
    )
}