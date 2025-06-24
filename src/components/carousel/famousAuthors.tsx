import { AuthorInterface } from '@/interface/author';
import Image from 'next/image';
import Link from 'next/link';

export default function FamousAuthors({authors} : {authors: AuthorInterface[]}) {
  return (
    <section className="px-6 pb-12">
      <h2 className="text-2xl font-semibold text-blue-900">นักเขียนยอดนิยม</h2>
      <div className="grid grid-cols-8 items-center gap-2 justify-center mt-6 mb-4">
        {authors.map((item, index) =>
        (<div key={index} className="flex flex-col justify-center gap-2">
          <Link href={`/profile/${item.user_id}`}>
            {
              item.image ?
              <Image alt='author profile' width={106} height={106} className='bg-pink-300 w-26 h-26 rounded-full border-white border-4 hover:border-blue-900' src={item.image.image_path} />
              :
              <div className='bg-pink-300 w-26 h-26 rounded-full border-white border-4 hover:border-blue-900' />
            }
            <p className='flex justify-center'>
              {item.name || 'ไม่ระบุชื่อ'}
            </p>
          </Link>
        </div>)
        )}
      </div>
    </section>)
}