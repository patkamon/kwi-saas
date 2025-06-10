'use client';
import { Carousel } from 'primereact/carousel';
import { ChapterInterface } from '@/interface/chapter';

const featureChapterTemplate = (chapter: ChapterInterface) => {
  return (
    <div className="bg-white surface-border rounded-2xl shadow p-4 space-y-2 m-4">
      <div className="font-semibold text-blue-800">นิยายชื่อ {chapter.novelId}</div>
      <div className="font-bold text-blue-900">ตอน {chapter.title}</div>
      <div className="text-sm text-blue-600">ชื่อนักเขียน {chapter.desc}</div>
      <div className="text-xs text-pink-500">อัปเดท {chapter.date}</div>
      <div className="flex space-x-4 text-sm text-gray-600">
        <div>💗 {chapter.likes}</div>
        <div>💬 {chapter.comments}</div>
      </div>
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