import { NovelInterface } from '@/interface/novel';
import { timeAgo } from '@/lib/utils';
import Link from 'next/link';


export default function NovelCard(novel: NovelInterface) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-2 carousel-item mx-2">
      <Link href={`/novel/${novel.novel_id}`} className="block">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-blue-800">{novel.author ? novel.author.name : "NONAME"}</div>
          <div className="text-xs text-pink-500">{timeAgo(novel.updated_at)}</div>
        </div>
        <div className="font-bold text-blue-900">{novel.title}</div>
        <div className="text-sm text-blue-600">{novel.description}</div>
        <div className="flex space-x-2 mt-2">
          {/* {novel.genre.map((tag, tagIdx) => ( */}
            <span
              // key={tagIdx}
              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
            >
              {novel.genre}
            </span>
          {/* ))} */}
        </div>
      </Link>
    </div>
  )
}