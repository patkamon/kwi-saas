'use client'

import { useParams } from 'next/navigation'
import chapterList from '@/data/chapters.json' assert { type: 'json' };
import novelList from '@/data/novels.json' assert { type: 'json' };
import { ChapterInterface } from '@/interface/chapter';
import { NovelInterface } from '@/interface/novel';
import { Menu } from 'lucide-react';
import DOMPurify from "isomorphic-dompurify";
import Link from 'next/link';

export default function ChapterPage() {

  const novel = novelList[0] as NovelInterface;
  const chapter = chapterList[0] as ChapterInterface;

  const params = useParams<{ novel_id: string, chapter_id: string }>()
  const clean = DOMPurify.sanitize(chapter.content || '', {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3'],
    ALLOWED_ATTR: ['href', 'target'],
    // Removed invalid FORBID_CONTENTS option
  }
  );
  return (
    <div>
      <main className="px-6 py-10 max-w-5xl mx-auto">
        <section className="px-6 py-5 bg-blue-200  rounded-t-md flex items-center">
          <Link href={`/novel/${params.novel_id}`}><Menu className='mr-4 hover:cursor-pointer' /></Link>
          <h1 className='text-xl'>ตอน {chapter.title}</h1>
        </section>

        <section className="px-6 py-6 bg-pink-50">
          <div dangerouslySetInnerHTML={{ __html: clean }} />
        </section>

        <section className="px-6 py-5 bg-pink-200 rounded-b-md">
          <div className='flex items-center justify-between'>
            <div className="flex items-center space-x-4 text-sm text-gray-700 mt-2">
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                <span>{chapter.views || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6c-1.4-1.4-3.6-1.4-5 0l-.8.8-.8-.8c-1.4-1.4-3.6-1.4-5 0s-1.4 3.6 0 5l5.8 5.8 5.8-5.8c1.4-1.4 1.4-3.6 0-5z" /></svg>
                <span>{chapter.likes || 0}</span>
              </div>
            </div>
            <Link href={`/novel/${params.novel_id}/chapter/${Number(params.chapter_id) + 1}`}>Next {">>"}</Link>
          </div>
        </section>
      </main>
    </div>
  );
}