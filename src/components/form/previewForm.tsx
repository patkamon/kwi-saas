"use client"
import { useState } from "react";
import ButtonStpper from "../stepper/buttonStepper";
import { Switch } from "@/components/shadcn/switch"
import ImageDialog from "../dialog/imageDialog";
import { Separator } from "@/components/shadcn/separator"

export default function PreviewForm({ steps, completed, activeStep, setActiveStep }:
    { steps: string[], completed: Record<number, boolean>, activeStep: number, setActiveStep: (step: number) => void }) {

    const [characters, setCharacters] = useState<{ id: number, name: string, details: string }[]>(
        [
            {
                "id": 1,
                "name": "Character 1",
                "details": "Description of character 1",
            },
            {
                "id": 2,
                "name": "Character 2",
                "details": "Description of character 2",
            },
        ]
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

    return (<div className="flex-1 flex justify-center pb-4 pt-8 px-4">
        <div className="w-full max-w-2xl bg-white shadow rounded-xl p-8">
            <h1 className="text-2xl font-bold mb-2">Preview</h1>
            <p className="text-sm text-gray-600 mb-8">
                Check to see wether your novel is ready to be published.
            </p>

            <div className="flex flex-col gap-4 bg-pink-50 p-4 rounded-lg">
                <section>
                    <h1 className="text-md font-bold mb-2">Create New Novel</h1>
                    <form className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="title">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter your novel title"
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
                            ></textarea>
                        </div>

                        {/* Cover Image Upload */}
                        <ImageDialog />
                    </form>
                </section>

                <Separator className="my-4" />

                <section>
                    <h1 className="text-md font-bold mb-2">Create Main Character(s)</h1>
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
                </section>

                <Separator className="my-4" />

                <section>
                <h1 className="text-md font-bold mb-2">Configuration</h1>
                <form className="flex flex-col gap-3">
                    <div className="flex justify-between border-blue-200 border-2 p-4 items-center rounded-md">
                        <div className="flex flex-col">
                            <label htmlFor="public">Visibility ⭐</label>
                            <p className="text-xs text-gray-600 font-semibold">Turn on to make your novel public</p>
                        </div>
                        <Switch id="public" defaultChecked disabled />
                    </div>
                    <div className="flex justify-between border-blue-200 border-2 p-4 items-center rounded-md">
                        <div className="flex flex-col">
                            <label htmlFor="comment">Allow Comments</label>
                            <p className="text-xs text-gray-600 font-semibold">Turn on to allow comments on your novel</p>
                        </div>
                        <Switch id="comment" defaultChecked disabled />
                    </div>
                </form>
                </section>

            </div>

            <ButtonStpper steps={steps} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
        </div>
    </div>
    )
}