import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Sparkles, Shield } from 'lucide-react';

export const PricingView: React.FC = () => {
  const { pricingPlans, triggerCheckout } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-12">
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-wider">
          Simple SaaS Subscription
        </span>
        <h1 className="text-4xl sm:text-6xl font-black">Invest in Your Career Acceleration</h1>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto">
          Choose a plan to unlock unlimited Gemini 3.6 ATS resume scans, voice mock interviews, and startup referral passes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`p-8 rounded-3xl border flex flex-col justify-between transition-all ${
              plan.popular
                ? 'border-blue-500 bg-gradient-to-b from-blue-950/30 via-zinc-950 to-zinc-950 shadow-2xl shadow-blue-500/20'
                : 'border-white/10 bg-zinc-950/60'
            }`}
          >
            <div>
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-xs text-zinc-400 mt-2 min-h-[32px]">{plan.description}</p>

              <div className="mt-6 mb-6">
                <span className="text-4xl font-extrabold">${plan.priceMonthly}</span>
                <span className="text-zinc-500 text-xs"> / month</span>
              </div>

              <div className="space-y-3 mb-8">
                {(plan.features || []).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => triggerCheckout(plan)}
              className={`w-full py-3 rounded-2xl font-bold text-xs transition-all ${
                plan.popular
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {plan.ctaText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
