'use client';

import authorList from '@/data/authors.json' assert { type: 'json' };
import { AuthorInterface } from '@/interface/authors';
import Link from 'next/link';

export default function FamousAuthors({ }) {
  const authors = authorList as AuthorInterface[];
  return (
    <section className="px-6 pb-12">
      <h2 className="text-2xl font-semibold text-blue-900">นักเขียนยอดนิยม</h2>
      <div className="flex justify-between mt-6 mb-4">
        {authors.map((item, index) =>
        (<div key={index} className="flex flex-col items-center justify-center gap-2">
          <Link href={`/profile/${item.id}`}>
            <img className='bg-pink-300 w-26 h-26  rounded-full border-white border-4 hover:border-blue-900' src={item.profileImg} />
            <p className='flex justify-center'>
              {item.name}
            </p>
          </Link>
        </div>)
        )}
      </div>
    </section>)
}