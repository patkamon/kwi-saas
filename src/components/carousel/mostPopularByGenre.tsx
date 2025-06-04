'use client';
import { SelectButton } from 'primereact/selectbutton';
import React, { useState } from "react";
import { NovelInterface } from '@/interface/novel';
import novelList from '@/data/novels.json' assert { type: 'json' };
import genreList from '@/data/genres.json' assert { type: 'json' };


export interface GenreOption {
    name: string;
    value: number;
}

export default function MostPopularByGenre(){
    const [value, setValue] = useState(1);
    const items = genreList as GenreOption[];
    const novels = novelList as NovelInterface[];

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