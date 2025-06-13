import FeatureChapter from '@/components/carousel/featureChapter';
import { Coins, User } from 'lucide-react';
import chapterList from '@/data/chapters.json' assert { type: 'json' };
import { ChapterInterface } from '@/interface/chapter';
import NovelCard from '@/components/card/novelCard';
import { NovelInterface } from '@/interface/novel';
import novelList from '@/data/novels.json' assert { type: 'json' };

export default function UserDashboardPage() {
  const featureChapters = chapterList as ChapterInterface[];
  const novels = novelList.slice(2) as NovelInterface[];

  return (
    <div>

      <main className="px-6 py-10 max-w-5xl mx-auto">
        {/* User Info */}
        <div className="flex items-center space-x-4 mb-10">
          <User className="w-16 h-16 text-blue-900" />
          <div>
            <h2 className="text-xl font-bold text-blue-900">หมูบิน</h2>
            <p className="text-sm text-gray-500">Member since January 2025</p>
            <div className="flex items-center space-x-2 text-sm text-blue-700 mt-1">
              <Coins className="w-4 h-4 text-yellow-800" />
              <span>2,500 Credits</span>
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