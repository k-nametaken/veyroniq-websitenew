import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

export default function UseCases() {
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const panelRef = useRef(null);

  const tabs = [
    {
      title: "Construction SMEs",
      desc: "Subcontractor billing, retention disputes, day-rate overruns.",
      discrepancies: ["Labour Uplifts", "Material Dupes", "Retention Missing"],
      recovery: "£4,200/month"
    },
    {
      title: "Letting Agencies",
      desc: "Maintenance contractor invoices vs. agreed schedules of rates.",
      discrepancies: ["Callout Fees", "Part Markups", "SLA Penalties"],
      recovery: "£2,850/month"
    },
    {
      title: "Professional Services",
      desc: "Timesheet billing vs. engagement letters and fee caps.",
      discrepancies: ["Rate Card Variance", "Over-utilization", "Expense Caps"],
      recovery: "£5,400/month"
    },
    {
      title: "Facilities Management",
      desc: "Multi-site service contracts vs. reactive maintenance invoices.",
      discrepancies: ["Ghost Visits", "Premium Rates", "Consumables"],
      recovery: "£8,100/month"
    }
  ];

  useEffect(() => {
    // Crossfade animation on tab change
    let ctx = gsap.context(() => {
      gsap.fromTo(panelRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }, panelRef);
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section id="use-cases" className="py-24 md:py-32 px-6 md:px-16 bg-fog text-steel selection:bg-cyan/20 selection:text-steel">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-wire/10 pb-12">
          <div className="max-w-2xl">
            <h2 className="font-heading font-bold text-3xl md:text-5xl lg:text-5xl tracking-tight mb-4">
              Industries that bleed money on billing errors.
            </h2>
            <div className="font-drama italic text-slate text-2xl md:text-4xl text-amber">
              We stop the bleeding.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Vertical Tab List */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`text-left p-6 md:p-8 rounded-[1.5rem] transition-all duration-300 relative overflow-hidden group click-pop ${
                    isActive ? 'bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-wire/10' : 'hover:bg-white/50 border border-transparent'
                  }`}
                >
                  {/* Active Indicator Line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-cyan transform origin-top transition-transform duration-300 ${
                    isActive ? 'scale-y-100' : 'scale-y-0'
                  }`}></div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-heading font-bold text-xl md:text-2xl transition-colors ${isActive ? 'text-steel' : 'text-steel/60 group-hover:text-steel'}`}>
                      {tab.title}
                    </h3>
                    <div className={`font-data text-xs tracking-widest uppercase transition-opacity ${isActive ? 'opacity-100 text-cyan' : 'opacity-0'}`}>
                      Active
                    </div>
                  </div>
                  <p className={`font-body text-sm leading-relaxed transition-colors ${isActive ? 'text-slate' : 'text-slate/60'}`}>
                    {tab.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Dynamic Content Panel */}
          <div className="lg:col-span-7 flex items-center">
            <div 
              ref={panelRef} 
              className="w-full bg-white rounded-[2rem] p-8 md:p-12 border border-wire/10 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
            >
              <div className="font-data text-xs uppercase tracking-widest text-slate mb-6">
                Audit Profile — {tabs[activeTab].title}
              </div>
              
              <h4 className="font-heading font-bold text-2xl md:text-3xl text-steel mb-4">
                {tabs[activeTab].desc}
              </h4>
              
              <div className="mt-12">
                <div className="font-body text-sm text-slate mb-4 font-medium">Common discrepancy types:</div>
                <div className="flex flex-wrap gap-3">
                  {tabs[activeTab].discrepancies.map((d, i) => (
                    <span key={i} className="font-data text-xs text-steel bg-fog border border-wire/10 px-4 py-2 rounded-full">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-wire/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="font-body text-sm text-slate mb-1">Target Recovery Benchmark</div>
                  <div className="font-data text-3xl font-bold text-signal tracking-tight">
                    {tabs[activeTab].recovery}
                  </div>
                </div>
                <button onClick={() => setModalOpen(true)} className="bg-vault text-glacier hover:text-cyan px-6 py-3 rounded-full font-heading font-semibold text-sm transition-colors border border-transparent hover:border-cyan/30 click-pop">
                  View Case Study
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Case Study Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-vault/80 backdrop-blur-md">
          <div className="bg-steel border border-wire p-8 md:p-12 rounded-[2rem] max-w-2xl w-full relative shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-slate hover:text-cyan transition-colors click-pop"
            >
              <X size={24} />
            </button>
            <div className="font-data text-cyan tracking-widest text-xs uppercase mb-4">Case Study</div>
            <h3 className="font-heading font-bold text-3xl text-glacier mb-6">{tabs[activeTab].title} Recovery Example</h3>
            <p className="font-body text-slate leading-relaxed mb-6">
              This is a placeholder case study detailing how Veyroniq's AI audit engine discovered and recovered lost revenue for a client in the {tabs[activeTab].title.toLowerCase()} sector. By cross-referencing their specific signed contracts against years of historical line-item data, our system identified significant clawback opportunities without manual intervention.
            </p>
            <div className="bg-vault p-6 rounded-2xl border border-wire flex flex-col gap-2">
              <div className="font-data text-xs text-slate uppercase">Total Recovered</div>
              <div className="font-heading font-bold text-4xl text-signal">{tabs[activeTab].recovery}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
