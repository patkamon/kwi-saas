"use client"
import { ChapterInterface } from "@/interface/chapter"
import { timeAgo } from '@/lib/utils';
import { Edit, MousePointerClick } from 'lucide-react';
import Link from 'next/link';
import DeleteChapterDialog from '@/components/dialog/deleteChapterDialog';
import { getUserId } from "../api/get";
import { useEffect, useState } from "react";
import { NovelInterface } from "@/interface/novel";


export default function ListChapter({ novel, chapters }:
    { novel: NovelInterface, chapters: ChapterInterface[] }) {
    const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId();
            setUserId(id);
            console.log("Fetched userId:", id);
        }
        fetchUserId();
    }
        , []);

    return (
        <div className="grid gap-1">
            <p className='font-bold text-3xl my-2'>สารบัญ ({chapters.length})</p>
            {chapters.map((chapter, index) => (
                <div key={chapter.chapter_id}
                    className="bg-white shadow-md p-4 rounded-xl space-y-1">
                    {/* href={`/novel/${novel_id}/chapter/${chapter.chapter_id}`}  */}
                    <div className='flex items-center gap-4'>
                        <span
                            className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                        >
                            ตอนที่ {index + 1}
                        </span>
                        <div className="text-xs text-gray-500">อัปเดท: {timeAgo(chapter.updated_at)}</div>
                    </div>
                    <div className='flex justify-between'>
                        <div className="font-semibold">{chapter.title}</div>
                        <div className='flex gap-4 items-center'>
                            {userId === novel.user_id &&
                                <>
                                    <Link key={chapter.chapter_id} href={`/novel/${novel.novel_id}/chapter/${chapter.chapter_id}/edit`} className='hover:cursor-pointer'>
                                        <Edit className='w-5 h-5' />
                                    </Link>
                                    <DeleteChapterDialog chapterId={chapter.chapter_id} />
                                </>

                            }
                            <Link className='w-5 h-5 hover:cursor-pointer' href={`/novel/${novel.novel_id}/chapter/${chapter.chapter_id}`} >
                                <MousePointerClick className='w-5 h-5' />
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-700 mt-2">
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                            <span>{chapter.views || 0}</span>
                        </div>
                    </div>
                </div>
            )
            )}
        </div>
    )
}