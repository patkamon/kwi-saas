'use client'
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ButtonStpper({ activeStep, steps, handleBack, handleNext, onCreateNovel }: {
    activeStep: number;
    steps: string[];
    handleBack: () => void;
    handleNext: () => void;
    onCreateNovel?: () => void;
}) {
    const router = useRouter();
    const handleCreateNovel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (onCreateNovel === undefined) {
            console.error("onCreateNovel function is not provided");
            return;
        }
        onCreateNovel(); // Call the function to create the novel
        // route to homepage nextjs
        toast.success("สร้างนิยายสำเร็จ");
        router.push('/');
    };

    return (
        <div className="flex justify-between mt-4">
            <button
                type="button"
                className="px-4 py-2 border rounded-md text-gray-700 enabled:hover:bg-gray-100 disabled:invisible hover:cursor-pointer"
                disabled={activeStep === 0}
                onClick={handleBack}
            >
                ย้อนกลับ
            </button>
            {
                activeStep === steps.length - 1 ?
                <button
                    type="submit"
                    onClick={handleCreateNovel}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 hover:cursor-pointer"
                    >สร้าง</button>
                    :
                    <button
                    onClick={handleNext}
                    disabled={activeStep === steps.length - 1}
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 hover:cursor-pointer"
                >
                    ถัดไป
                </button>
            }
        </div>
    )
}