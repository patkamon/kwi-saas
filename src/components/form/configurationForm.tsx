import ButtonStpper from "../stepper/buttonStepper";
import { Switch } from "@/components/shadcn/switch"



export default function ConfigurationForm({ steps, completed, activeStep, setActiveStep }:
    { steps: string[], completed: Record<number, boolean>, activeStep: number, setActiveStep: (step: number) => void }) {

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
            <h1 className="text-2xl font-bold mb-2">การควบคุม</h1>
            <p className="text-sm text-gray-600 mb-8">
                ควบคุมการตั้งค่าของนิยาย เช่น การเปิดให้ผู้อื่นอ่านหรือไม่ การอนุญาตให้แสดงความคิดเห็น และอื่นๆ
            </p>

            {/* Form */}
            <form className="flex flex-col gap-3">
                <div className="flex justify-between border-blue-200 border-2 p-4 items-center rounded-md">
                    <div className="flex flex-col">
                        <label htmlFor="public">การเผยแพร่ ⭐</label>
                        <p className="text-xs text-gray-600 font-semibold">เปิดเพื่อให้นิยายของคุณเป็นสาธารณะ</p>
                    </div>
                    <Switch id="public" defaultChecked disabled />
                </div>
                <div className="flex justify-between border-blue-200 border-2 p-4 items-center rounded-md">
                    <div className="flex flex-col">
                        <label htmlFor="comment">อนุญาติการแสดงความคิดเห็น</label>
                        <p className="text-xs text-gray-600 font-semibold">เปิดให้อนุญาติการแสดงความคิดเห็น</p>
                    </div>
                    <Switch id="comment" defaultChecked disabled />
                </div>
            </form>
            <ButtonStpper steps={steps} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
        </div>
    )
}