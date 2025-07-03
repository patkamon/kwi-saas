'use client';
import { NovelInterface } from '@/interface/novel';
import { timeAgo } from '@/lib/utils';
import Link from 'next/link';
import { getImgByPath } from '../api/get';
import { useEffect, useState } from 'react';



export default function NovelCard(novel: NovelInterface) {

  const [img, setImg] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchImage = async () => {
      if (novel.image?.image_path) {
        const imagePath = await getImgByPath(novel.image.image_path);
        setImg(imagePath);
      } else {
        setImg('/default-novel-image.png'); // Set a default image if no image path is provided
      }
    }
    fetchImage();
  }
  , [novel]);

  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-2 carousel-item mx-2">
      <Link href={`/novel/${novel.novel_id}`} className="block">
    <div className='grid grid-cols-4 gap-4'>
      <div className='col-span-1'>
      <img className='w-24 h-32 rounded-xl object-cover' src={img}></img>
      </div>
      <div className='col-span-3'>
      <div className="flex justify-between items-center ">
          <div className="font-semibold text-blue-800">{novel.author ? novel.author.name : "NONAME"}</div>
          <div className="text-xs text-pink-500">{timeAgo(novel.updated_at)}</div>
        </div>
        <div className="font-bold text-blue-900">{novel.title}</div>
        <div className="text-sm text-blue-600 line-clamp-2">{novel.description}</div>
        <div className="flex space-x-2 mt-2">
            <span
              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
            >
              {novel.genre}
            </span>
        </div>
      </div>
    </div>
      </Link>
    </div>
  )
}