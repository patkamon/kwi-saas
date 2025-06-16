import FeatureChapter from '@/components/carousel/featureChapter';
import { Coins, User } from 'lucide-react';
import { ChapterInterface } from '@/interface/chapter';
import NovelCard from '@/components/card/novelCard';
import { NovelInterface } from '@/interface/novel';
import { AuthorInterface } from '@/interface/author';
import { getChapterByAuthorId, getNovelByAuthorId, getProfileById } from '@/components/api/get';

export default async function UserDashboardPage({params}: { params: { id: string } }) {
  const { id} = params;

  const featureChapters = await getChapterByAuthorId(id) as ChapterInterface[];
  const novels = await getNovelByAuthorId(id) as NovelInterface[];
  const profile = await getProfileById(id) as AuthorInterface;

  return (
    <div>

      <main className="px-6 py-10 max-w-5xl mx-auto">
        {/* User Info */}
        <div className="flex items-center space-x-4 mb-10">
          <img src={profile.image?.image_path} className=' rounded-full w-36 h-36 p-2 bg-pink-300' />
          <div>
            <h2 className="text-xl font-bold text-blue-900">{profile.name}</h2>
            <p className="text-sm text-gray-500">Member since {profile.created_at}</p>
            <div className="flex items-center space-x-2 text-sm text-blue-700 mt-1">
              <Coins className="w-4 h-4 text-yellow-800" />
              <span>{profile.credit} Credits</span>
            </div>
          </div>
        </div>
      </main>


      <FeatureChapter featureChapters={featureChapters} />

      {/* Your Novels */}
      <section className="px-6 pb-8">
        <h3 className="text-lg font-semibold mb-4 text-blue-900">นิยายที่คุณแต่ง</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {novels.map((story, idx) => (
            <NovelCard key={idx} {...story} />
          ))}
        </div>
      </section>


    </div>
  );
}