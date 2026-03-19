import React from 'react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 md:px-16 bg-vault border-t border-wire relative z-10 w-full overflow-hidden flex items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,194,203,0.05)_0,transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-heading font-extrabold text-5xl md:text-7xl text-glacier mb-6 tracking-tight">
          We only get paid when you do.
        </h2>
        <div className="font-drama italic text-amber text-2xl md:text-3xl mb-8">
          Performance-based. Zero upfront cost.
        </div>
        <p className="font-body text-slate text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
          Veyroniq charges 30% of recovered funds only. If we don’t find anything, you pay nothing. No retainers. No subscriptions. No risk.
        </p>
        
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
          className="relative overflow-hidden group bg-cyan text-vault px-10 py-5 rounded-full font-heading font-bold text-xl hover:scale-[1.03] shadow-[0_0_30px_rgba(0,194,203,0.3)] hover:shadow-[0_0_50px_rgba(0,194,203,0.5)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] inline-flex items-center gap-2 click-pop"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Start Recovering Money <span className="group-hover:translate-x-2 transition-transform">→</span>
          </span>
          <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
        </button>
      </div>
    </section>
  );
}
