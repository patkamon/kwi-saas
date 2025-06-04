import FeatureChapter from '@/components/carousel/featureChapter';
import { Coins, User } from 'lucide-react';

export default function NovelPage() {

  const novel = { title: 'The Magic Portal', date: 'May 1, 2025', views: '2.5k', likes: 180 }

  const featureChapters = [
    {
      name: 'Sarah Parker',
      title: 'The Last Sunset',
      desc: 'A tale of mystery and adventure in the modern world...',
      date: 'May 16, 2025',
      likes: 245,
      comments: 18,
    },
    {
      name: 'Mike Johnson',
      title: 'Digital Dreams',
      desc: 'A cyberpunk story about artificial intelligence...',
      date: 'May 15, 2025',
      likes: 189,
      comments: 24,
    },
    {
      name: 'Emma Wilson',
      title: 'Echoes of Time',
      desc: 'A historical novel set in ancient Rome...',
      date: 'May 14, 2025',
      likes: 312,
      comments: 42,
    },
    {
      name: 'Emma Wilson',
      title: 'Echoes of Time',
      desc: 'A historical novel set in ancient Rome...',
      date: 'May 14, 2025',
      likes: 312,
      comments: 42,
    },
    {
      name: 'Emma Wilson',
      title: 'Echoes of Time',
      desc: 'A historical novel set in ancient Rome...',
      date: 'May 14, 2025',
      likes: 312,
      comments: 42,
    },
    {
      name: 'Sarah Parker',
      title: 'The Last Sunset',
      desc: 'A tale of mystery and adventure in the modern world...',
      date: 'May 16, 2025',
      likes: 245,
      comments: 18,
    },
    {
      name: 'Mike Johnson',
      title: 'Digital Dreams',
      desc: 'A cyberpunk story about artificial intelligence...',
      date: 'May 15, 2025',
      likes: 189,
      comments: 24,
    },
  ];

  return (
    <div>
      {/* Your Novels */}
      <main className="px-6 py-10 max-w-5xl mx-auto">
        <section className="px-6 pb-8">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">Novel</h3>
          <div className="grid gap-4">
            <div key={novel.date} className="bg-gray-50 p-4 rounded-xl space-y-1">
              <div className="font-semibold">{novel.title}</div>
              <div className="text-xs text-gray-500">Published: {novel.date}</div>
              <div className="flex items-center space-x-4 text-sm text-gray-700 mt-2">
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  <span>{novel.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6c-1.4-1.4-3.6-1.4-5 0l-.8.8-.8-.8c-1.4-1.4-3.6-1.4-5 0s-1.4 3.6 0 5l5.8 5.8 5.8-5.8c1.4-1.4 1.4-3.6 0-5z" /></svg>
                  <span>{novel.likes}</span>
                </div>
              </div>
            </div>
          </div>
          
        </section>



        {/* User Info */}
        <section className="px-6 pb-8">
        <div className="flex items-center space-x-4 mb-10">
          <User className="w-16 h-16 text-blue-900" />
          <div>
            <h2 className="text-xl font-bold text-blue-900">Sarah Parker</h2>
            <p className="text-sm text-gray-500">Member since January 2025</p>
            <div className="flex items-center space-x-2 text-sm text-blue-700 mt-1">
              <Coins className="w-4 h-4 text-yellow-800" />
              <span>2,500 Credits</span>
            </div>
          </div>
        </div>
        </section>

        {/* Featured Chapters */}
        <section className="px-6 pb-8">
        <div className="grid gap-1">
          {featureChapters.map((chapter, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-xl space-y-1">
              <div className="font-semibold">{chapter.title}</div>
              <div className="text-xs text-gray-500">Published: {chapter.date}</div>
              <div className="flex items-center space-x-4 text-sm text-gray-700 mt-2">
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  <span>{chapter.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6c-1.4-1.4-3.6-1.4-5 0l-.8.8-.8-.8c-1.4-1.4-3.6-1.4-5 0s-1.4 3.6 0 5l5.8 5.8 5.8-5.8c1.4-1.4 1.4-3.6 0-5z" /></svg>
                  <span>{chapter.likes}</span>
                </div>
              </div>
            </div>
             )
            )}
          </div>
        </section>
         
        
      </main>
    </div>
  );
}