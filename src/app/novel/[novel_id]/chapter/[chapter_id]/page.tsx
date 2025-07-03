
import { ChapterInterface } from '@/interface/chapter';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { getChapterById } from '@/components/api/get';



export default async function ChapterPage({ params }: { params: Promise<{novel_id: string, chapter_id: string }> }) {
  const {novel_id, chapter_id} = await params;
  if (!novel_id || !chapter_id) {
    return <div>Novel ID and Chapter ID are required</div>;
  }
  const chapter = await getChapterById(chapter_id) as ChapterInterface

  return (
    <div>
      <main className="px-6 py-10 max-w-5xl mx-auto">
        <section className="px-6 py-5 bg-blue-200  rounded-t-md flex items-center">
          <Link href={`/novel/${novel_id}`}><Menu className='mr-4 hover:cursor-pointer' /></Link>
          <h1 className='text-xl'>{chapter.title}</h1>
        </section>

        <section className="px-6 py-6 bg-pink-50">
          <div style={{ whiteSpace: 'pre-line' }}>
            {chapter.content}
          </div>
        </section>

        <section className="px-6 py-5 bg-pink-200 rounded-b-md">
          <div className='flex items-center justify-between'>
            <div className="flex items-center space-x-4 text-sm text-gray-700 mt-2">
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                <span>{chapter.views || 0}</span>
              </div>
            </div>
            {/* <Link href={`/novel/${params.novel_id}/chapter/${Number(params.chapter_id) + 1}`}>คอนถัดไป {">>"}</Link> */}
          </div>
        </section>
      </main>
    </div>
  );
}