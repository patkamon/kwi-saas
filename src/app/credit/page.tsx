'use client';
import { useState } from 'react';

export default function BuyCreditsPage() {
  const [plans , setPlans] = useState([
    { packageName: 'Elementary Student', amount: '100 Credits', price: '฿99', desc: 'Perfect for casual readers', selected: false },
    { packageName: 'High school Student', amount: '500 Credits', price: '฿499', desc: 'Most popular choice', selected: false },
    { packageName: 'College Student', amount: '1000 Credits', price: '฿999', desc: 'Best value for money', selected: false },
    { packageName: 'Newbie Author', amount: '1600 Credits', price: '฿1500', desc: 'Best value for money', selected: false },
    { packageName: 'Intermidiate Author', amount: '2700 Credits', price: '฿2500', desc: 'Best value for money', selected: false },
    { packageName: 'Professional Author', amount: '3800 Credits', price: '฿3500', desc: 'Best value for money', selected: false },
  ])

  function onSelectPlan(selectedPlan) {
    const updatedPlans = plans.map(plan =>
      plan.packageName === selectedPlan.packageName
        ? { ...plan, selected: true }
        : { ...plan, selected: false } 
    );
    setPlans(updatedPlans);
  }

  return (
    <div >
      {/* Buy Credits Section */}
      <main className="px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Buy Credits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-xl text-blue-900 p-6 space-y-2 text-center border-2 ${plan.selected ? 'border-pink-600' : 'border-blue-900 hover:border-pink-400'}`}
            >
              <div className="text-lg font-semibold">{plan.packageName}</div>
              <div className="text-lg font-semibold">{plan.amount}</div>
              <div className="text-xl font-bold">{plan.price}</div>
              <div className="text-sm text-gray-600">{plan.desc}</div>
              <button onClick={() => onSelectPlan(plan)} className={`hover:cursor-pointer mt-4 w-full py-2 text-white rounded-md font-semibold hover:bg-pink-600 ${plan.selected ? 'bg-pink-600' : 'bg-black'}`}>Select</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
