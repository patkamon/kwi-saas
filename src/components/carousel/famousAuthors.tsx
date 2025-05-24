'use client';
export default function FamousAuthors({}) {
  return (
    <section className="px-6 pb-12">
    <h2 className="text-2xl font-semibold text-blue-900">Famous Authors</h2>
    <div className="flex justify-between mt-6 mb-4">
      {['user 1', 'user 2', 'user 3', 'user 4', 'user 5', 'user 6', 'user 7', 'user 8', 'user 9'
      ].map((item, index) =>
      (<div key={index} className="flex flex-col items-center gap-2">
        <div className='bg-pink-300 w-26 h-26 rounded-full border-white border-4 hover:border-blue-900'>  </div>
        {item}
      </div>)
      )}
    </div>
  </section>)
}