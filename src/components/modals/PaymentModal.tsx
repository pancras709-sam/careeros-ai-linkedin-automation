import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, CreditCard, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PaymentModal: React.FC = () => {
  const { isPaymentModalOpen, setIsPaymentModalOpen, selectedPlan, addToast, triggerConfetti, addXP } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');

  if (!isPaymentModalOpen || !selectedPlan) return null;

  const price = billingCycle === 'annual' ? selectedPlan.priceAnnual : selectedPlan.priceMonthly;

  const handleCompletePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      triggerConfetti();
      addToast('🎉 Payment Successful!', `Subscribed to ${selectedPlan.name}! Invoice sent to email.`, 'success');
      addXP(500, 'Upgraded Pro Membership');
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950 p-6 sm:p-8 shadow-2xl text-white"
        >
          {/* Close button */}
          <button
            onClick={() => setIsPaymentModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">{selectedPlan.name}</h3>
              <p className="text-xs text-zinc-400">{selectedPlan.description}</p>
            </div>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-between p-1.5 rounded-2xl bg-zinc-900 border border-white/5 mb-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Annual Billing <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">Save 25%</span>
            </button>
          </div>

          {/* Price breakdown */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 border border-white/5 mb-6 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold">${price}</span>
              <span className="text-zinc-400 text-xs"> / month</span>
              {billingCycle === 'annual' && <p className="text-[11px] text-zinc-500 mt-0.5">Billed annually (${price * 12}/year)</p>}
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 justify-end">
                <ShieldCheck className="w-3.5 h-3.5" /> 14-Day Money Back Guarantee
              </span>
            </div>
          </div>

          {/* Features check list */}
          <div className="space-y-2 mb-6">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Included Features</p>
            {(selectedPlan.features || []).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Mock Credit Card Form */}
          <div className="space-y-3 p-4 rounded-2xl bg-zinc-900/60 border border-white/5 mb-6">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span className="font-medium text-white flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-blue-400" /> Stripe Secure Checkout
              </span>
              <span className="text-[10px] text-zinc-500">256-bit SSL</span>
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 uppercase">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full mt-1 px-3 py-2 text-xs rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-zinc-400 uppercase">Expiry</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-400 uppercase">CVC / CWW</label>
                <input
                  type="password"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            disabled={isProcessing}
            onClick={handleCompletePayment}
            className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing Secure Order...
              </span>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-white" /> Complete Subscription (${price})
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-zinc-500 mt-3">
            By subscribing, you agree to Navricon Terms of Service. Cancel anytime from Settings.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
