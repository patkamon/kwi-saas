import { AuthorInterface } from '@/interface/author';
import Image from 'next/image';
import Link from 'next/link';

const randomColor = (name: string) => {
  const colors = ['bg-red-300', 'bg-green-300', 'bg-blue-300', 'bg-yellow-300', 'bg-purple-300'];

  // Better hashing by summing all char codes
  const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % colors.length;

  return colors[index];
};

export default function FamousAuthors({authors} : {authors: AuthorInterface[]}) {

  function className(name: string) {
    return `${randomColor(name)} w-26 h-26 rounded-full border-white border-4 hover:border-blue-900`;
  } 

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
              // random color
              <div 
              className={className(item.name)} />
            }
            <p className='flex justify-center'>
              {item.name.slice(0,10) || 'ไม่ระบุชื่อ'}
            </p>
          </Link>
        </div>)
        )}
      </div>
    </section>)
}