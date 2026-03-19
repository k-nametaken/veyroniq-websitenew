import React from 'react';

export default function SocialProof() {
  return (
    <section className="py-24 px-6 md:px-16 bg-[#080B0F] border-t border-wire">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-glacier mb-4 tracking-tight">Early Clients</h2>
          <div className="font-data text-xs uppercase tracking-widest text-slate border border-wire/50 bg-steel/30 px-4 py-1.5 rounded-full inline-block">
            Beta Results Pending Publication
          </div>
        </div>



        <div className="pt-12 border-t border-wire/30 text-center">
           <div className="font-data text-[10px] uppercase tracking-widest text-slate mb-8">As featured in:</div>
           <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-20 grayscale">
              {['Bloomberg', 'Financial Times', 'TechCrunch', 'Forbes'].map((brand, i) => (
                 <div key={i} className="font-heading font-bold text-2xl text-glacier">{brand}</div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}
