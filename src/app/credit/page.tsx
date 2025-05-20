export default function BuyCreditsPage() {
  return (
    <div >

      {/* Buy Credits Section */}
      <main className="px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Buy Credits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { amount: '100 Credits', price: '$9.99', desc: 'Perfect for casual readers', selected: false },
            { amount: '500 Credits', price: '$39.99', desc: 'Most popular choice', selected: true },
            { amount: '1000 Credits', price: '$69.99', desc: 'Best value for money', selected: false },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`border rounded-xl p-6 space-y-2 text-center hover:border-black ${plan.selected ? 'border-black' : 'border-gray-200'}`}
            >
              <div className="text-lg font-semibold">{plan.amount}</div>
              <div className="text-xl font-bold">{plan.price}</div>
              <div className="text-sm text-gray-600">{plan.desc}</div>
              <button className="mt-4 w-full py-2 bg-black text-white rounded-md font-semibold">Select</button>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        <div className="border rounded-xl p-6 space-y-6">
          <h3 className="font-semibold text-lg">Payment Method</h3>
          <div className="flex space-x-4">
            <button className="border rounded-md p-3 flex-1 text-center">💳</button>
            <button className="border rounded-md p-3 flex-1 text-center">💰</button>
            <button className="border rounded-md p-3 flex-1 text-center">💸</button>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full border rounded-md px-4 py-2 text-sm text-gray-700"
            />
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="flex-1 border rounded-md px-4 py-2 text-sm text-gray-700"
              />
              <input
                type="text"
                placeholder="123"
                className="w-24 border rounded-md px-4 py-2 text-sm text-gray-700"
              />
            </div>
            <button className="w-full bg-black text-white py-2 rounded-md font-semibold">Pay Now</button>
          </div>
        </div>
      </main>

    </div>
  );
}
