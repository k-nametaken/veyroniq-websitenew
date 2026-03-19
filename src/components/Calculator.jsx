import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const valRef = useRef({ val: displayValue });

  useEffect(() => {
    gsap.to(valRef.current, {
      val: value,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => setDisplayValue(Math.round(valRef.current.val))
    });
  }, [value]);

  return <>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(displayValue)}</>;
};

export default function Calculator() {
  const [spend, setSpend] = useState(100000);

  const cons = spend * 0.03;
  const likely = spend * 0.055;
  const high = spend * 0.08;

  const annualCons = cons * 12;
  const annualHigh = high * 12;

  return (
    <section id="calculator" className="py-24 px-6 md:px-16 bg-vault border-t border-wire overflow-hidden text-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,194,203,0.05)_0,transparent_50%)] pointer-events-none"></div>
      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl lg:text-5xl text-glacier tracking-tight mb-4">
            Move the slider to see your estimated recovery potential.
          </h2>
        </div>

        {/* Interactive Slider Input */}
        <div className="bg-steel/40 border border-wire rounded-3xl p-8 md:p-12 mb-16 max-w-3xl mx-auto shadow-xl">
          <div className="flex justify-between items-end mb-6">
            <label className="font-data text-sm tracking-widest uppercase text-slate">Monthly Invoice Spend</label>
            <div className="font-heading font-bold text-3xl md:text-4xl text-white">
              <AnimatedNumber value={spend} />
            </div>
          </div>
          <div className="relative py-4">
            <input 
              type="range" 
              min="10000" 
              max="5000000" 
              step="10000" 
              value={spend} 
              onChange={(e) => setSpend(Number(e.target.value))}
              className="w-full h-2 bg-vault rounded-lg appearance-none cursor-pointer focus:outline-none accent-cyan relative z-10"
              style={{
                background: `linear-gradient(to right, #00C2CB 0%, #00C2CB ${(spend - 10000) / (5000000 - 10000) * 100}%, #111820 ${(spend - 10000) / (5000000 - 10000) * 100}%, #111820 100%)`
              }}
            />
            {/* Custom runner track styles for webkit browsers for better aesthetic */}
            <style>{`
              input[type=range]::-webkit-slider-thumb {
                appearance: none;
                width: 24px;
                height: 24px;
                background: #00C2CB;
                border: 3px solid #111820;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 0 15px rgba(0, 194, 203, 0.5);
                transition: transform 0.1s;
              }
              input[type=range]::-webkit-slider-thumb:hover {
                transform: scale(1.2);
              }
            `}</style>
          </div>
          <div className="flex justify-between font-data text-xs text-slate/50">
            <span>£10k</span>
            <span>£5m</span>
          </div>
        </div>

        {/* Output Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          <div className="bg-steel border border-wire p-8 rounded-[2rem] flex flex-col gap-2 shadow-lg">
            <h3 className="font-heading font-bold text-lg text-white mb-2">Conservative Estimate</h3>
            <div className="font-data text-sm tracking-widest text-slate/70 uppercase mb-2 border-b border-wire/50 pb-4">Monthly Leakage</div>
            <div className="font-heading font-bold text-4xl text-cyan mt-2">
              <AnimatedNumber value={cons} />
            </div>
          </div>
          
          <div className="bg-steel border border-wire p-8 rounded-[2rem] flex flex-col gap-2 shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-amber/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">Likely Recovery</h3>
            <div className="font-data text-sm tracking-widest text-slate/70 uppercase mb-2 border-b border-wire/50 pb-4">Monthly Leakage</div>
            <div className="font-heading font-bold text-4xl text-amber mt-2">
              <AnimatedNumber value={likely} />
            </div>
          </div>

          <div className="bg-steel border border-wire p-8 rounded-[2rem] flex flex-col gap-2 shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-signal/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">High Leakage Scenario</h3>
            <div className="font-data text-sm tracking-widest text-slate/70 uppercase mb-2 border-b border-wire/50 pb-4">Monthly Leakage</div>
            <div className="font-heading font-bold text-4xl text-signal mt-2">
              <AnimatedNumber value={high} />
            </div>
          </div>
        </div>

        {/* Annual Footer */}
        <div className="flex flex-col items-center gap-6">
          <div className="font-heading font-bold text-3xl md:text-5xl text-cyan tracking-tight mb-2 flex flex-col md:flex-row items-center gap-4">
            <span className="text-white">Annual recovery potential:</span> 
            <span><AnimatedNumber value={annualCons} /> — <AnimatedNumber value={annualHigh} /></span>
          </div>
          
          <div className="font-body text-sm text-slate opacity-70 mb-8">
            Veyroniq charges 30% of recovered funds only. You keep the rest.
          </div>
          
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
            className="group bg-cyan text-vault px-8 py-4 rounded-full font-heading font-bold text-lg hover:scale-[1.03] shadow-[0_0_20px_rgba(0,194,203,0.2)] hover:shadow-[0_0_40px_rgba(0,194,203,0.4)] transition-all duration-300 flex items-center gap-2 click-pop"
          >
            See What We Can Find <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

      </div>
    </section>
  );
}
