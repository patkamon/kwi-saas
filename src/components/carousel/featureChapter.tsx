'use client';
import { Carousel } from 'primereact/carousel';
import { ChapterInterface } from '@/interface/chapter';
import { timeAgo } from '@/lib/utils';
import Link from 'next/link';

const featureChapterTemplate = (chapter: ChapterInterface) => {
  return (
    <div  className="bg-white surface-border rounded-2xl shadow p-4 space-y-2 m-4 h-32">
    <Link href={`/novel/${chapter.novel_id}/chapter/${chapter.chapter_id}`}>
      <div className="font-semibold text-blue-800">{chapter.novel ? chapter.novel.title : "No Name"}</div>
      <div className="font-bold text-blue-900">{chapter.title}</div>
      <div className="text-sm text-blue-600">{chapter.author ? chapter.author.name : "No Name"}</div>
      <div className="text-xs text-pink-500">อัปเดท {timeAgo(chapter.updated_at)}</div>
      <div className="flex space-x-4 text-sm text-gray-600">
        <div>💗 {chapter.views}</div>
        {/* <div>💬 {chapter.comments}</div> */}
      </div>
    </Link>
    </div>

  );
};

export default function FeatureChapter({ featureChapters }:
  { featureChapters: ChapterInterface[] }) {
  return (
    <section className="px-6 pb-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-900">นิยายตอนใหม่</h2>
      <div className='card'>
        <Carousel value={featureChapters} numVisible={3} numScroll={1} autoplayInterval={3000} circular itemTemplate={featureChapterTemplate} />
      </div>
    </section>)
}