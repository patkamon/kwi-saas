'use client';
import { Pen } from 'lucide-react';
import { Carousel } from 'primereact/carousel';

export default function StoryVersePage() {
  const productTemplate = (story) => {
    return (
      <div className="bg-white surface-border rounded-2xl shadow p-4 space-y-2 m-4">
      <div className="font-semibold text-blue-800">{story.name}</div>
      <div className="font-bold text-blue-900">{story.title}</div>
      <div className="text-sm text-blue-600">{story.desc}</div>
      <div className="text-xs text-pink-500">Updated {story.date}</div>
      <div className="flex space-x-4 text-sm text-gray-600">
        <div>💗 {story.likes}</div>
        <div>💬 {story.comments}</div>
      </div>
    </div>
    );
};

const products = [
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
    desc: 'A historical fiction set in ancient Rome...',
    date: 'May 14, 2025',
    likes: 312,
    comments: 42,
  },
  {
    name: 'Emma Wilson',
    title: 'Echoes of Time',
    desc: 'A historical fiction set in ancient Rome...',
    date: 'May 14, 2025',
    likes: 312,
    comments: 42,
  },
  {
    name: 'Emma Wilson',
    title: 'Echoes of Time',
    desc: 'A historical fiction set in ancient Rome...',
    date: 'May 14, 2025',
    likes: 312,
    comments: 42,
  },
];
  return (
      <div>
        <section className="px-6 pt-4 flex justify-end">
          <button className="bg-pink-400 border-white text-white border-1 py-1 px-4 rounded-xl flex items-center">
            <Pen className="w-4 h-4 mr-2" />
            Write</button>
          </section>

         
      <section className="px-6 pb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Featured Episodes</h2>
        <div className='card'>
          <Carousel  value={products} numVisible={3} numScroll={1} circular itemTemplate={productTemplate} />
        </div>
      </section>

      

      {/* Latest Stories */}
      <section className="px-6 pb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Latest Novels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
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
              desc: 'A science fiction epic about interstellar exploration...',
              time: '5 hours ago',
              tags: ['Sci-Fi', 'Adventure'],
            },
            {
              name: 'Lisa Thompson',
              title: 'Beyond the Stars',
              desc: 'A science fiction epic about interstellar exploration...',
              time: '5 hours ago',
              tags: ['Sci-Fi', 'Adventure'],
            },
          ].map((story, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-4 space-y-2 carousel-item">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-blue-800">{story.name}</div>
                <div className="text-xs text-pink-500">{story.time}</div>
              </div>
              <div className="font-bold text-blue-900">{story.title}</div>
              <div className="text-sm text-blue-600">{story.desc}</div>
              <div className="flex space-x-2 mt-2">
                {story.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
