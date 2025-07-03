'use client'
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
import { Trash } from "lucide-react";
import { deleteChapter } from "../api/del";


export default function DeleteChapterDialog({chapterId}: {
    chapterId: string;
}) {

    function onDeleteClick(chapterId: string) {
        deleteChapter(chapterId)
            .then((data) => {
                if (data) {
                    window.location.reload(); // Reload the page to reflect changes
                } else {
                    console.error("Failed to delete chapter.");
                }
            })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="hover:cursor-pointer">
                <Trash className='w-5 h-5' />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>คำเตือน</AlertDialogTitle>
                    <AlertDialogDescription>
                        การกระทำนี้ จะลบตอนนี้ออกจากนิยายของคุณอย่างถาวร <br />
                        คุณแน่ใจหรือไม่ว่าต้องการลบตอนนี้?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                    <AlertDialogAction className="bg-pink-300 text-white rounded-md hover:bg-pink-500 hover:cursor-pointer"
                        onClick={() => onDeleteClick(chapterId)} >ดำเนินการต่อ</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}