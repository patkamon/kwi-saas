'use client';
import { SelectButton } from 'primereact/selectbutton';
import React, { useEffect, useState } from "react";
import { NovelInterface } from '@/interface/novel';
import genreList from '@/data/genres.json' assert { type: 'json' };
import NovelCard from '../card/novelCard';
import { GenreOption } from '@/interface/genre';
import { getNovelByGenre } from '../api/get';


export default function MostPopularByGenre() {
  const [value, setValue] = useState(1);
  const items = genreList as GenreOption[];

  const [novels, setNovels] = useState<NovelInterface[]>([]);

  useEffect(() => {
    const fetchNovels = async () => {
      const genreName = items.find((item) => item.value === value)?.db_value;
      if (genreName) {
        const fetchedNovels = await getNovelByGenre(genreName) as NovelInterface[];
        setNovels(fetchedNovels);
      }
    };

    fetchNovels();
  }, [value]);

  console.log(novels)

  const justifyTemplate = (option: GenreOption) => {
    return <div className={`${value == option.value ? 'bg-blue-200 border-pink-400' : 'bg-white'} border-2 border-pink-200 hover:border-pink-500 m-[2px] px-2 rounded-2xl`}>{option.name}</div>;
  }

  return (
    <section className="px-6 pb-12">
      <h2 className="text-2xl font-semibold text-blue-900">นิยาย ยอดนิยมในหมวด
        <p className='text-pink-400 inline-block ml-2'>{`'${items.find((item) => item.value == value)?.name}'`} </p>
      </h2>
      <div className="card flex justify-end mb-4 items-center gap-1">
        <label className='text-blue-900 text-lg'> หมวด: </label>
        <SelectButton unselectable={false} value={value} onChange={(e) => setValue(e.value)} itemTemplate={justifyTemplate} optionLabel="name" options={items} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
        {novels.map((novel, idx) => (<NovelCard key={idx} {...novel} />))}
      </div>
    </section>
  )
}