'use client';
import { SelectButton } from 'primereact/selectbutton';
import React, { useState } from "react";
import { NovelInterface } from '@/interface/novel';

export interface GenreOption {
    name: string;
    value: number;
}

export default function MostPopularByGenre(){
    const [value, setValue] = useState(1);
    const items = [
      { name: 'Romance', value: 1 },
      { name: 'Boys / Girls Love', value: 2 },
      { name: 'Fantasy', value: 3 },
      { name: 'Horror', value: 4 },
    ] as GenreOption[];

    const novels = [
      {
        name: 'Rank 1',
        title: 'The Love Chronicles',
        desc: 'A heartwarming tale of love and friendship.',
        time: '2 hours ago',
        tags: ['romance', 'friendship']
      },
      {
        name: 'Rank 2',
        title: 'Mystic Adventures',
        desc: 'An epic fantasy journey through mystical lands.',
        time: '5 hours ago',
        tags: ['fantasy', 'adventure']
      },
      {
        name: 'Rank 3',
        title: 'Dark Secrets',
        desc: 'A chilling horror story that will keep you on the edge.',
        time: '1 day ago',
        tags: ['horror', 'thriller']
      },
      {
        name: 'Rank 4',
        title: 'Love Beyond Borders',
        desc: 'A touching romance that transcends boundaries.',
        time: '3 days ago',
        tags: ['romance', 'drama']
      },
      {
        name: 'Rank 5',
        title: 'The Enchanted Forest',
        desc: 'A magical adventure in a world of fantasy.',
        time: '1 week ago',
        tags: ['fantasy', 'magic']
      },
      {
        name: 'Rank 6',
        title: 'Whispers in the Dark',
        desc: 'A suspenseful horror story that will haunt you.',
        time: '2 weeks ago',
        tags: ['horror', 'suspense']
      },
    ] as NovelInterface[];

    const justifyTemplate = (option: GenreOption) => {
        return <div className={`${value == option.value ? 'bg-blue-200 border-pink-400' : 'bg-white'} border-2 border-pink-200 hover:border-pink-500 m-[2px] px-2 rounded-2xl`}>{option.name}</div>;
      }

    return (
        <section className="px-6 pb-12">
        <h2 className="text-2xl font-semibold text-blue-900">Most Popular
          <p className='text-pink-400 inline-block ml-2'>{`'${items.find((item) => item.value == value)?.name}'`} </p>
        </h2>
        <div className="card flex justify-end mb-4 items-center gap-1">
          <label className='text-blue-900 text-lg'> Genre: </label>
          <SelectButton unselectable={false} value={value} onChange={(e) => setValue(e.value)} itemTemplate={justifyTemplate} optionLabel="name" options={items} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {novels.map((novel, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-4 space-y-2 carousel-item">
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
            </div>
          ))}
        </div>
      </section>
    )
}