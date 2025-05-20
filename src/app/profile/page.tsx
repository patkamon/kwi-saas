import { Coins } from 'lucide-react';

export default function UserDashboardPage() {
  return (
    <div>

      <main className="px-6 py-10 max-w-5xl mx-auto">
        {/* User Info */}
        <div className="flex items-center space-x-4 mb-10">
          <img src="https://via.placeholder.com/64" alt="Avatar" className="rounded-full w-16 h-16" />
          <div>
            <h2 className="text-xl font-bold">Sarah Parker</h2>
            <p className="text-sm text-gray-500">Member since January 2025</p>
            <div className="flex items-center space-x-2 text-sm text-gray-700 mt-1">
              <Coins className="w-4 h-4" />
              <span>2,500 Credits</span>
            </div>
          </div>
        </div>

        {/* Credit History */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4">Credit History</h3>
          <div className="space-y-3 bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between text-sm border-b pb-2">
              <div>
                <div>{'Story Purchase: "The Lost Kingdom"'}</div>
                <div className="text-gray-500 text-xs">May 15, 2025</div>
              </div>
              <div className="text-red-600 font-semibold">-200 Credits</div>
            </div>
            <div className="flex justify-between text-sm border-b pb-2">
              <div>
                <div>Credit Top-up</div>
                <div className="text-gray-500 text-xs">May 10, 2025</div>
              </div>
              <div className="text-green-600 font-semibold">+1000 Credits</div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <div>{'Story Earnings: "The Magic Portal"'}</div>
                <div className="text-gray-500 text-xs">May 5, 2025</div>
              </div>
              <div className="text-green-600 font-semibold">+350 Credits</div>
            </div>
          </div>
        </section>

        {/* Your Stories */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Your Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'The Magic Portal', date: 'May 1, 2025', views: '2.5k', likes: 180 },
              { title: 'Echoes of Tomorrow', date: 'April 15, 2025', views: '1.8k', likes: 150 },
            ].map((story, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-xl space-y-1">
                <div className="font-semibold">{story.title}</div>
                <div className="text-xs text-gray-500">Published: {story.date}</div>
                <div className="flex items-center space-x-4 text-sm text-gray-700 mt-2">
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <span>{story.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6c-1.4-1.4-3.6-1.4-5 0l-.8.8-.8-.8c-1.4-1.4-3.6-1.4-5 0s-1.4 3.6 0 5l5.8 5.8 5.8-5.8c1.4-1.4 1.4-3.6 0-5z"/></svg>
                    <span>{story.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

  
    </div>
  );
}