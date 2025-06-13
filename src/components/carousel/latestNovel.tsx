'use client';
import { Carousel } from 'primereact/carousel';
import { NovelInterface } from '@/interface/novel';
import NovelCard from '../card/novelCard';

const latestNovelTemplate = (novel: NovelInterface) => {
  return (<NovelCard {...novel} />)
}

export default function LatestNovel({ latestNovels }: { latestNovels: NovelInterface[] }) {
  return (
    <section className="px-6 pb-12">
      <h2 className="text-2xl font-semibold mb-4 text-blue-900">นิยายใหม่</h2>
      <div className="card">
        <Carousel value={latestNovels} numVisible={2} numScroll={1} circular itemTemplate={latestNovelTemplate} />
      </div>
    </section>)
}