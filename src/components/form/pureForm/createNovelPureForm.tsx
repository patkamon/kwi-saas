import ImageDialog from "@/components/dialog/imageDialog";
import { RefObject } from "react";
export default function CreateNovelPureForm({ formRef }: { formRef?: RefObject<HTMLFormElement | null> }) {
    return (
        <form className="space-y-6" ref={formRef}>
            {/* Title */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="title">
                    ชื่อเรื่อง
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
                    หมวดหมู่
                </label>
                <select
                    id="genre"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    required
                >
                    <option>แฟนตาซี</option>
                    <option>ไซไฟ</option>
                    <option>โรแมนติก</option>
                    <option>สยองขวัญ</option>
                </select>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                    เรื่องย่อ
                </label>
                <textarea
                    id="description"
                    rows={4}
                    placeholder="กรุณาใส่เรื่องย่อของนิยาย"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    required
                ></textarea>
            </div>

            {/* Cover Image Upload */}
            <ImageDialog />
        </form>
    )
}
