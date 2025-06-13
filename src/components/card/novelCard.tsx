import { NovelInterface } from '@/interface/novel';
import Link from 'next/link';


export default function NovelCard(novel: NovelInterface) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-2 carousel-item">
      <Link href={`/novel/${novel.id}`} className="block">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-blue-800">{novel.name}</div>
          <div className="text-xs text-pink-500">{novel.time}</div>
        </div>
        <div className="font-bold text-blue-900">{novel.title}</div>
        <div className="text-sm text-blue-600">{novel.desc}</div>
        <div className="flex space-x-2 mt-2">
          {novel.tags.map((tag, tagIdx) => (
            <span
              key={tagIdx}
              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </div>
  )
}