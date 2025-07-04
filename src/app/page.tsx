import { Pen } from 'lucide-react';
import Link from 'next/link';
import FeatureChapter from '@/components/carousel/featureChapter';
import MostPopularByGenre from '@/components/carousel/mostPopularByGenre';
import FamousAuthors from '@/components/carousel/famousAuthors';
import LatestNovel from '@/components/carousel/latestNovel';
import { NovelInterface } from '@/interface/novel';
import { ChapterInterface } from '@/interface/chapter';
import { getLatestAuthor, getLatestChapters, getLatestNovels } from '@/components/api/get';
import { AuthorInterface } from '@/interface/author';

export default async function StoryVersePage() {
  const latestNovels = await getLatestNovels() as unknown as NovelInterface[];
  const featureChapters = await getLatestChapters() as ChapterInterface[];
  const authors = await getLatestAuthor() as AuthorInterface[]

  return (
    <div>
      <section className="px-6 pt-4 flex justify-end">
        <Link href='/create' className="bg-pink-400 hover:bg-white hover:border-pink-400 hover:text-pink-400 border-white text-white border-1 py-1 px-4 rounded-xl flex items-center">
          <Pen className="w-4 h-4 mr-2" />
          แต่งนิยาย!
        </Link>
      </section>


      {/* Featured Chapters */}
      <FeatureChapter featureChapters={featureChapters} />
      {/* Latest Stories */}
      <LatestNovel latestNovels={latestNovels} />
      {/* Famous Authors */}
      <FamousAuthors authors={authors}/>
      {/* Most Popular by Genre */}
      <MostPopularByGenre />

    </div>
  );
}
