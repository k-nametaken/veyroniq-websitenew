import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-vault border-t border-wire pt-24 pb-12 px-6 md:px-16 rounded-t-[4rem] relative z-20 w-full mb-0 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        
        <div className="col-span-1 lg:col-span-2">
          <div className="font-data font-bold text-3xl tracking-[0.2em] mb-4 text-glacier uppercase">
            Veyroniq
          </div>
          <p className="font-body text-slate max-w-sm mb-10 leading-relaxed">
            Every invoice. Every discrepancy. <br />
            Every penny recovered.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-signal animate-pulse shadow-[0_0_10px_rgba(0,232,122,0.6)]"></div>
            <div className="font-data text-xs uppercase tracking-widest text-slate">
              Audit Engine: Operational
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="font-heading font-semibold text-lg mb-2 text-glacier">Product</div>
          <a href="#how-it-works" className="font-body text-slate hover:text-cyan transition-colors text-sm">How It Works</a>
          <a href="#use-cases" className="font-body text-slate hover:text-cyan transition-colors text-sm">Use Cases</a>

          <a href="#" className="font-body text-slate hover:text-cyan transition-colors text-sm">API Documentation</a>
        </div>

        <div className="flex flex-col gap-4">
          <div className="font-heading font-semibold text-lg mb-2 text-glacier">Company</div>
          <a href="#" className="font-body text-slate hover:text-cyan transition-colors text-sm">About Us</a>
          <a href="#" className="font-body text-slate hover:text-cyan transition-colors text-sm">Contact</a>
          <div className="mt-8 flex gap-4 text-sm font-body text-slate/50">
            <a href="/privacy" className="hover:text-glacier transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-glacier transition-colors">Terms</a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-wire/30 pt-8 flex items-center justify-between font-data text-[10px] text-slate uppercase tracking-widest">
        <div>© 2026 VEYRONIQ LTD.</div>
        <div>ALL RIGHTS RESERVED.</div>
      </div>
    </footer>
  );
}
