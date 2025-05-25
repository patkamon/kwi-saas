export default function ButtonStpper({ activeStep, steps, handleBack, handleNext }: {
    activeStep: number;
    steps: string[];
    handleBack: () => void;
    handleNext: () => void;
}) {
    return (
        <div className="flex justify-between mt-4">
            <button
                type="button"
                className="px-4 py-2 border rounded-md text-gray-700 enabled:hover:bg-gray-100 disabled:invisible hover:cursor-pointer"
                disabled={activeStep === 0}
                onClick={handleBack}
            >
                Back
            </button>
            <button
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 hover:cursor-pointer"
            >
                Next
            </button>
        </div>
    )
}