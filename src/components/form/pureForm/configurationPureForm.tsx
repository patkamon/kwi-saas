import { Switch } from "@/components/shadcn/switch"

export default function ConfigurationPureForm() {
    return (<form className="flex flex-col gap-3">
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
    )

}