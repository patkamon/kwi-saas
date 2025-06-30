'use client';
import { useState } from 'react';
import { Plan } from '@/interface/plan';
import plansData from '@/data/plans.json' assert { type: 'json' };
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function BuyCreditsPage() {
  const [plans, setPlans] = useState(plansData as Plan[]);

  function onSelectPlan(selectedPlan: Plan) {
    const updatedPlans = plans.map(plan =>
      plan.packageName === selectedPlan.packageName
        ? { ...plan, selected: true }
        : { ...plan, selected: false }
    );
    setPlans(updatedPlans);

    createCheckoutSession(selectedPlan)

  }

  async function createCheckoutSession(selectedPlan: Plan) {
     console.log(selectedPlan)
      const res = await fetch('/api/stripe', {
        method: 'POST',
        body: JSON.stringify({
          ...selectedPlan,
          user_id: sessionStorage.getItem('user_id')
        }),
      });
      console.log(selectedPlan)

      const data = await res.json();
      if (data.error) {
        console.error('Stripe error:', data.error);
        return;
      }
      
      const stripe = await stripePromise;
      stripe.redirectToCheckout({ sessionId: data.id });
  
  };

  return (
    <div >
      {/* Buy Credits Section */}
      <div className="px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Buy Credits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-xl text-blue-900 p-6 space-y-2 text-center border-2 ${plan.selected ? 'border-pink-600' : 'border-blue-900 hover:border-pink-400'}`}
            >
              <div className="text-lg font-semibold">{plan.packageName}</div>
              <div className="text-lg font-semibold">{plan.amount_string}</div>
              <div className="text-xl font-bold">{plan.price}฿</div>
              <div className="text-sm text-gray-600">{plan.desc}</div>
              <button onClick={() => onSelectPlan(plan)} className={`hover:cursor-pointer mt-4 w-full py-2 text-white rounded-md font-semibold hover:bg-pink-600 ${plan.selected ? 'bg-pink-600' : 'bg-black'}`}>Select</button>
            </div>
          ))}
        </div>

        {/* Credit History */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold mb-4 text-blue-900">Credit History</h3>
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
      </div>



    </div>
  );
}
