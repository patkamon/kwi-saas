import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/shadcn/alert-dialog"


export default function ReduceCreditDialog({ cost, handleFunction }: {
    cost: number;
    handleFunction: () => void;
}) {
    return (
        <AlertDialog>
        <AlertDialogTrigger className="px-4 py-2 mt-4 bg-black text-white rounded-md hover:bg-gray-900 hover:cursor-pointer">
            สร้าง
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>คำเตือน</AlertDialogTitle>
            <AlertDialogDescription>
                การกระทำนี้ มีการใช้ เครดิต {cost} เครดิต  <br/>
                คุณแน่ใจหรือไม่ว่าต้องการดำเนินการต่อ?
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction className="bg-pink-300 text-white rounded-md hover:bg-pink-500 hover:cursor-pointer"
             onClick={handleFunction} >ดำเนินการต่อ</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
}