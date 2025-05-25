import { Pen } from 'lucide-react';
import Link from 'next/link';
import FeatureChapter from '@/components/carousel/featureChapter';
import MostPopularByGenre from '@/components/carousel/mostPopularByGenre';
import FamousAuthors from '@/components/carousel/famousAuthors';
import LatestNovel from '@/components/carousel/latestNovel';

export default function StoryVersePage() {
  const latestNovels = [
    {
      name: 'Alex Chen',
      title: 'The Silent Guardian',
      desc: 'A supernatural thriller about a mysterious protector...',
      time: '2 hours ago',
      tags: ['Fantasy', 'Thriller'],
    },
    {
      name: 'Lisa Thompson',
      title: 'Beyond the Stars',
      desc: 'A science novel epic about interstellar exploration...',
      time: '5 hours ago',
      tags: ['Sci-Fi', 'Adventure'],
    },
    {
      name: 'Lisa Thompson',
      title: 'Beyond the Stars',
      desc: 'A science novel epic about interstellar exploration...',
      time: '5 hours ago',
      tags: ['Sci-Fi', 'Adventure'],
    },
  ]

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
      <section className="px-6 pt-4 flex justify-end">
        <Link href='/create' className="bg-pink-400 hover:bg-white hover:border-pink-400 hover:text-pink-400 border-white text-white border-1 py-1 px-4 rounded-xl flex items-center">
          <Pen className="w-4 h-4 mr-2" />
          Write
        </Link>
      </section>


      {/* Featured Chapters */}
      <FeatureChapter featureChapters={featureChapters} />


      {/* Latest Stories */}
      <LatestNovel latestNovels={latestNovels} />


      {/* Famous Authors */}
      <FamousAuthors />

      {/* Most Popular by Genre */}
      <MostPopularByGenre />

    </div>
  );
}
