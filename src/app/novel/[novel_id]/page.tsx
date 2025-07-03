import { getChaptersByNovelId, getImgByPath, getNovelById } from '@/components/api/get';
import ListChapter from '@/components/list/listChapter';
import { ChapterInterface } from '@/interface/chapter';
import { NovelInterface } from '@/interface/novel';


export default async function NovelPage({ params }: { params: Promise<{ novel_id: string }> }){
  const {novel_id} = await params
  if (!novel_id) {
    return <div>Novel ID is required</div>;
  }
  const novel = await getNovelById(novel_id) as NovelInterface;
  const chapters = await getChaptersByNovelId(novel_id) as ChapterInterface[];

  const img = await getImgByPath(novel.image?.image_path || null);

  return (
    <div>
      <main className="px-6 py-10 max-w-5xl mx-auto">
        <section className="px-6 pb-8">
          <div className="grid gap-4">
            <div key={novel.novel_id} className="p-6 shadow rounded-xl space-y-1 bg-linear-to-r/srgb from-indigo-200 to-pink-200 flex gap-6">
              <img src={img || ''} className='rounded-xl w-36 h-48 aspect-[3/4] object-cover' />
              <div className='flex flex-col'>
                <div className="font-semibold text-3xl">{novel.title}</div>
                <div className="text-xs text-gray-500">อัปเดท: {novel.updated_at}</div>
                <div className="flex items-center space-x-4 text-sm text-gray-700 mt-2">
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    {/* <span>{novel.views || 0}</span> */}
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6c-1.4-1.4-3.6-1.4-5 0l-.8.8-.8-.8c-1.4-1.4-3.6-1.4-5 0s-1.4 3.6 0 5l5.8 5.8 5.8-5.8c1.4-1.4 1.4-3.6 0-5z" /></svg>
                    {/* <span>{novel.likes || 0}</span> */}
                  </div>
                </div>
                <div>{novel.description}</div>
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
              </div>
            </div>
          </div>
        </section>



        {/* Featured Chapters */}
        <section className="px-6 pb-8">
          <ListChapter novel={novel} chapters={chapters} />
        </section>


      </main>
    </div>
  );
}