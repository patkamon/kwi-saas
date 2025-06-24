// 'use client'
import { getChaptersByNovelId, getNovelById } from '@/components/api/get';
import { ChapterInterface } from '@/interface/chapter';
import { NovelInterface } from '@/interface/novel';
import { timeAgo } from '@/lib/utils';
import Link from 'next/link';


export default async function NovelPage({ params } : { params: { novel_id: string } }) {
  const {novel_id} = params;
  const novel = await getNovelById(novel_id) as NovelInterface;
  const chapters = await getChaptersByNovelId(novel_id) as ChapterInterface[];

  return (
    <div>
      <main className="px-6 py-10 max-w-5xl mx-auto">
        <section className="px-6 pb-8">
          <div className="grid gap-4">
            <div key={novel.novel_id} className="p-8 shadow rounded-xl space-y-1 bg-linear-to-r/srgb from-indigo-200 to-pink-200 flex gap-6">
              <img src={novel.image?.image_path || "/lovecraft_brew.jpeg"} className='rounded-xl w-32' />
              <div className='flex flex-col'>
                <div className="font-semibold text-3xl">{novel.title}</div>
                <div className="text-xs text-gray-500">อัปเดท: {novel.updated_at}</div>
                <div className="flex items-center space-x-4 text-sm text-gray-700 mt-2">
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    {/* <span>{novel.views || 0}</span> */}
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6c-1.4-1.4-3.6-1.4-5 0l-.8.8-.8-.8c-1.4-1.4-3.6-1.4-5 0s-1.4 3.6 0 5l5.8 5.8 5.8-5.8c1.4-1.4 1.4-3.6 0-5z" /></svg>
                    {/* <span>{novel.likes || 0}</span> */}
                  </div>
                </div>
                <div>{novel.description}</div>
                <div className="flex space-x-2 mt-2">
                  {/* {novel.genre.map((tag, tagIdx) => ( */}
                    <span
                      // key={tagIdx}
                      className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                    >
                      {novel.genre}
                    </span>
                  {/* ))} */}
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Featured Chapters */}
        <section className="px-6 pb-8">
          <div className="grid gap-1">
            <p className='font-bold text-3xl my-2'>สารบัญ ({chapters.length})</p>
            {chapters.map((chapter, index) => (
              <Link key={chapter.chapter_id} href={`/novel/${novel_id}/chapter/${chapter.chapter_id}`} className="bg-white shadow-md p-4 rounded-xl space-y-1">
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
                  <h1 className=''>{">"}</h1>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-700 mt-2">
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    <span>{chapter.views || 0}</span>
                  </div>
                  {/* <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6c-1.4-1.4-3.6-1.4-5 0l-.8.8-.8-.8c-1.4-1.4-3.6-1.4-5 0s-1.4 3.6 0 5l5.8 5.8 5.8-5.8c1.4-1.4 1.4-3.6 0-5z" /></svg>
                    <span>{chapter.likes || 0}</span>
                  </div> */}
                </div>
              </Link>
            )
            )}
          </div>
        </section>


      </main>
    </div>
  );
}