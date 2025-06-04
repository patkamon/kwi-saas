import { useState } from "react";
import ImageDialog from "../dialog/imageDialog";
import ButtonStpper from "../stepper/buttonStepper";
import characterList from '@/data/characters.json' assert { type: 'json' };

export default function CreateMainCharacterForm({ steps, completed, activeStep, setActiveStep }:
    { steps: string[], completed: Record<number, boolean>, activeStep: number, setActiveStep: (step: number) => void }) {

    const [characters, setCharacters] = useState<{ id: number, name: string, details: string }[]>(
        characterList as { id: number, name: string, details: string }[]
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

    const addCharacter = (e) => {
        e.preventDefault();
        if (characters.length >= 3) {
            alert("You can only add up to 3 characters.");
            return;
        }
        const newCharacter = {
            id: characters.length + 1,
            name: "",
            details: ""
        };
        setCharacters([...characters, newCharacter]);
    }

    return (<div className="flex-1 flex justify-center pb-4 pt-8 px-4">
        <div className="w-full max-w-2xl bg-white shadow rounded-xl p-8">
            <h1 className="text-2xl font-bold mb-2">Create Main Character(s)</h1>
            <p className="text-sm text-gray-600 mb-8">
                Create your main character(s) for your novel up to 3. You can add more characters later.
            </p>


            {/* Form */}
            <form className="space-y-6 border-2 border-blue-400 rounded-lg flex border-dashed mb-4">
                <div className="flex flex-col justify-around items-center mx-4">
                    {/* Cover Image Upload */}
                    <ImageDialog />
                    <button onClick={(e) => addCharacter(e)} className="px-2 rounded-md border border-pink-400 bg-pink-200 w-16 hover:border-2 flex justify-center">Add</button>
                </div>

                <div className="flex flex-col w-full mx-4 my-4 gap-2">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your character name"
                            className="w-full border border-gray-300 placeholder:font-semibold rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>

                    {/* Details */}
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="details">
                            Details
                        </label>
                        <textarea
                            id="details"
                            rows={4}
                            placeholder="Brief details of your character"
                            className="w-full border border-gray-300 placeholder:font-semibold rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        ></textarea>
                    </div>
                </div>
            </form>


            <div className="border-t-2 border-b-2 rounded-md border-blue-200">
                {characters.map((character) => (
                    <div className="border-x-2 flex hover:bg-pink-100 border-blue-200 first:rounded-t-md last:rounded-b-md" key={character.id}>
                        <div className="flex flex-col justify-around items-center mx-4">
                            {/* Cover Image Upload */}
                            <ImageDialog />
                            <button className="px-2 rounded-md border border-pink-400 bg-pink-200 w-16 hover:border-2 flex justify-center">Delete</button>
                        </div>

                        <div className="flex flex-col w-full mx-4 my-4 gap-2">
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    disabled
                                    placeholder="Enter your character name"
                                    className="w-full border border-gray-300 placeholder:font-semibold rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                />
                            </div>

                            {/* Details */}
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="details">
                                    Details
                                </label>
                                <textarea
                                    id="details"
                                    rows={4}
                                    disabled
                                    placeholder="Brief details of your character"
                                    className="w-full border border-gray-300 placeholder:font-semibold rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                )
                )
                }
            </div>
            <ButtonStpper steps={steps} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
        </div>
    </div>
    )
}