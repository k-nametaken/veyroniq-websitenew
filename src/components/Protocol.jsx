import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, AlertTriangle, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Protocol() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: container.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          id: `pin-${index}`
        });

        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.4,
            filter: "blur(16px)",
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top bottom",
              end: "top top",
              scrub: true
            }
          });
        }
      });

      // Canvas Animations
      
      // Step 1: Ingest
      gsap.to('.ingest-doc', {
        x: 100,
        y: 60,
        scale: 0.5,
        opacity: 0,
        duration: 2,
        stagger: 0.5,
        repeat: -1,
        ease: 'power1.out'
      });
      gsap.to('.ingest-node', {
        boxShadow: '0 0 30px rgba(0,194,203,0.8)',
        duration: 1,
        yoyo: true,
        repeat: -1
      });

      // Step 2: Analyse
      gsap.to('.analyse-laser', {
        x: '100%',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'linear'
      });
      // Randomly stagger icon flips
      gsap.to('.analyse-icon-group', {
        rotationY: 180,
        duration: 0.4,
        stagger: { amount: 3, from: "random", repeat: -1, yoyo: true, repeatDelay: 1 }
      });

      // Step 3: Recover
      gsap.to('.recover-spike', {
        strokeDashoffset: 0,
        duration: 1.5,
        repeat: -1,
        ease: 'power2.inOut',
        repeatDelay: 0.5
      });

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={container} className="relative pb-32 bg-vault">
      <div className="w-full flex flex-col">
        
        {/* Step 1: Ingest */}
        <div className="protocol-card w-full h-screen bg-vault text-glacier flex items-center justify-center p-6 md:p-16 border-t border-wire overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,194,203,0.05)_0,transparent_50%)]"></div>
          <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="flex-1 relative w-full aspect-square max-w-[450px] flex items-center justify-center bg-steel/30 rounded-full border border-wire">
              <div className="relative w-full h-full">
                {/* Visualizer */}
                <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-8">
                  <FileText className="ingest-doc w-8 h-8 text-slate" />
                  <FileText className="ingest-doc w-8 h-8 text-slate" />
                  <FileText className="ingest-doc w-8 h-8 text-slate" />
                </div>
                {/* Node */}
                <div className="ingest-node absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-steel border-2 border-cyan rounded-[2rem] flex items-center justify-center font-data text-xs text-cyan tracking-widest">
                  PROCESS
                </div>
                {/* Dashed lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100">
                  <path d="M 20 50 Q 50 10 80 50" fill="none" stroke="#00C2CB" strokeWidth="0.5" strokeDasharray="2 2" />
                  <path d="M 20 50 Q 50 90 80 50" fill="none" stroke="#00C2CB" strokeWidth="0.5" strokeDasharray="2 2" />
                </svg>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start xl:pl-16">
              <div className="font-data text-cyan/70 font-semibold mb-6 tracking-widest text-sm uppercase">01 / Ingest</div>
              <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight text-white leading-tight">Data Assimilation</h2>
              <p className="font-body text-xl text-slate max-w-lg leading-[1.8]">
                Upload your invoices, contracts, and POs. Veyroniq accepts PDF, Excel, and direct integrations. No reformatting required.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Analyse */}
        <div className="protocol-card w-full h-screen bg-[#0E131A] text-glacier flex items-center justify-center p-6 md:p-16 border-t border-wire overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="flex-1 relative w-full aspect-square max-w-[450px] bg-vault border border-wire rounded-[2rem] p-8 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
              <div className="relative w-full h-full grid grid-cols-4 grid-rows-4 gap-3 perspective-1000">
                {Array.from({length: 16}).map((_, i) => (
                  <div key={i} className="bg-steel/50 rounded-lg border border-wire/50 flex flex-col justify-center items-center overflow-hidden preserve-3d">
                    <div className="analyse-icon-group w-full h-full relative transform-style-3d text-slate opacity-30">
                      <div className="absolute inset-0 flex items-center justify-center backface-hidden">
                        <FileText size={20} />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center backface-hidden [transform:rotateY(180deg)]">
                        {i % 4 === 0 ? <AlertTriangle size={20} className="text-amber" /> : <Check size={20} className="text-signal" />}
                      </div>
                    </div>
                  </div>
                ))}
                {/* Laser scan */}
                <div className="analyse-laser absolute top-0 -left-[100%] bottom-0 w-[50%] bg-gradient-to-r from-transparent via-cyan/20 to-cyan/80 z-20 border-r border-cyan shadow-[20px_0_30px_rgba(0,194,203,0.3)]"></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start xl:pl-16">
              <div className="font-data text-amber/80 font-semibold mb-6 tracking-widest text-sm uppercase">02 / Analyse</div>
              <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight text-white leading-tight">Precision Mapping</h2>
              <p className="font-body text-xl text-slate max-w-lg leading-[1.8]">
                Our AI engine maps every line item against your agreed terms — rates, quantities, clauses, retention, uplifts. Discrepancies are flagged with evidence.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Recover */}
        <div className="protocol-card w-full h-screen bg-steel text-glacier flex items-center justify-center p-6 md:p-16 border-t border-wire overflow-hidden">
           <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,232,122,0.03)_0,transparent_60%)]"></div>
          <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="flex-1 relative w-full aspect-square max-w-[450px] flex items-center justify-center bg-vault rounded-[2rem] border border-wire shadow-2xl">
              <svg width="100%" height="50%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="px-8">
                {/* Flatline baseline */}
                <path d="M0 100 L400 100" stroke="#1E2A38" strokeWidth="2" />
                {/* Spike */}
                <path className="recover-spike" d="M0 100 L150 100 L170 40 L190 160 L220 20 L250 100 L400 100" stroke="#00E87A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="600" strokeDashoffset="600" />
                
                {/* Grid Overlay */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E2A38" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" className="opacity-30" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col items-start xl:pl-16">
              <div className="font-data text-signal/80 font-semibold mb-6 tracking-widest text-sm uppercase">03 / Recover</div>
              <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight text-white leading-tight">Cash Returned</h2>
              <p className="font-body text-xl text-slate max-w-lg leading-[1.8]">
                A clear discrepancy report is generated with the exact value at risk and supporting clause references. Share with your supplier and recover what's yours.
              </p>
            </div>
          </div>
        </div>

      </div>
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </section>
  );
}
