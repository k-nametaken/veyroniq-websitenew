import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Files, FileSearch, Flag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DiscrepancyShuffler = () => {
  const [cards, setCards] = useState([
    { id: 1, label: "Retention Not Applied", amount: "+£1,100", status: "FLAGGED", type: "amber" },
    { id: 2, label: "Material Duplication", amount: "+£820", status: "RECOVERED", type: "green" },
    { id: 3, label: "Labour Rate Variance", amount: "+£340", status: "RECOVERED", type: "green" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr; // Force full re-render triggers GSAP logic if we had any, but simple CSS transform is better
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      {cards.map((card, i) => (
        <div 
          key={card.id}
          className="absolute w-full px-5 py-4 bg-vault border border-wire rounded-[1.5rem] shadow-xl flex items-center justify-between pointer-events-none"
          style={{
            zIndex: cards.length - i,
            transform: `translateY(${i * 14}px) scale(${1 - i * 0.05})`,
            opacity: 1 - i * 0.2,
            transition: 'all 800ms cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <div className="flex flex-col gap-1">
            <span className="font-body text-glacier text-sm font-medium">{card.label}</span>
            <span className={`font-data text-xs ${card.type === 'amber' ? 'text-amber' : 'text-signal'}`}>
              {card.amount}
            </span>
          </div>
          <span className={`font-data text-[10px] uppercase px-2 py-1 rounded-full border ${card.type === 'amber' ? 'border-amber/30 text-amber bg-amber/10' : 'border-signal/30 text-signal bg-signal/10'}`}>
            {card.status}
          </span>
        </div>
      ))}
    </div>
  );
};

const TelemetryTypewriter = () => {
  const [text, setText] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = [
    "Parsing INV-3012 against CONTRACT-78B...",
    "Clause 4.2: Uplift cap exceeded. Flag raised.",
    "Duplicate line item detected on row 14 & 31.",
    "PO-445 spend limit: £42,000. Invoice total: £44,800.",
    "Generating discrepancy report..."
  ];

  useEffect(() => {
    let currentText = "";
    let i = 0;
    const msg = messages[msgIndex];
    let typingInterval;
    
    typingInterval = setInterval(() => {
      if (i < msg.length) {
        currentText += msg.charAt(i);
        setText(currentText);
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setMsgIndex((prev) => (prev + 1) % messages.length);
        }, 2000);
      }
    }, 40);
    
    return () => clearInterval(typingInterval);
  }, [msgIndex]);

  return (
    <div className="h-48 w-full bg-[#080B0F] text-slate rounded-[1.5rem] border border-wire p-5 flex flex-col font-data relative overflow-hidden shadow-inner">
      <div className="flex items-center gap-2 mb-4 border-b border-wire pb-2">
        <div className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_rgba(0,194,203,0.8)]"></div>
        <span className="text-[10px] tracking-widest text-glacier/50 uppercase">Live Feed</span>
      </div>
      <div className="text-xs mt-auto leading-relaxed h-full flex items-end">
        <div>
          <span className="text-cyan mr-2">{'>'}</span><span className="text-glacier">{text}</span>
          <span className="inline-block w-1.5 h-3.5 bg-cyan ml-1 -mb-0.5 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

const ProtocolScheduler = () => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const targetMonRef = useRef(null);
  const targetWedRef = useRef(null);
  const targetFriRef = useRef(null);
  const saveBtnRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      const getPos = (ref) => {
        const bounds = ref.current.getBoundingClientRect();
        const container = containerRef.current.getBoundingClientRect();
        return {
          x: bounds.left - container.left + bounds.width / 2,
          y: bounds.top - container.top + bounds.height / 2
        };
      };
      
      const mon = getPos(targetMonRef);
      const wed = getPos(targetWedRef);
      const fri = getPos(targetFriRef);
      const btn = getPos(saveBtnRef);
      
      gsap.set(cursorRef.current, { x: 20, y: 30, opacity: 0 });
      gsap.set('.day-mon, .day-wed, .day-fri', { backgroundColor: 'transparent', color: '#6B7A8D', borderColor: 'transparent' });
      gsap.set(targetFriRef.current.querySelector('svg'), { opacity: 0 });
      gsap.set(saveBtnRef.current, { scale: 1 });
      
      tl.to(cursorRef.current, { opacity: 1, duration: 0.3 })
        // Mon Click
        .to(cursorRef.current, { x: mon.x, y: mon.y, duration: 0.6, ease: 'power2.inOut' })
        .to(cursorRef.current, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.day-mon', { backgroundColor: 'rgba(0,194,203,0.1)', borderColor: '#00C2CB', color: '#00C2CB', duration: 0.2 }, '-=0.1')
        // Wed Click
        .to(cursorRef.current, { x: wed.x, y: wed.y, duration: 0.5, ease: 'power2.inOut', delay: 0.2 })
        .to(cursorRef.current, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.day-wed', { backgroundColor: 'rgba(245,166,35,0.1)', borderColor: '#F5A623', color: '#F5A623', duration: 0.2 }, '-=0.1')
        // Fri Click
        .to(cursorRef.current, { x: fri.x, y: fri.y, duration: 0.5, ease: 'power2.inOut', delay: 0.2 })
        .to(cursorRef.current, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.day-fri', { backgroundColor: 'rgba(0,232,122,0.1)', borderColor: '#00E87A', color: '#00E87A', duration: 0.2 }, '-=0.1')
        .to(targetFriRef.current.querySelector('svg'), { opacity: 1, duration: 0.2 }, '-=0.1')
        // Close Button
        .to(cursorRef.current, { x: btn.x, y: btn.y, duration: 0.6, ease: 'power2.inOut', delay: 0.3 })
        .to(cursorRef.current, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 })
        .to(saveBtnRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }, '-=0.1')
        .to(saveBtnRef.current, { backgroundColor: '#1E2A38', duration: 0.2 }, '-=0.1')
        // Cleanup
        .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.5 })
        .to('.day-mon, .day-wed, .day-fri', { backgroundColor: 'transparent', color: '#6B7A8D', borderColor: 'transparent', duration: 0.2, delay: 0.3 })
        .to(targetFriRef.current.querySelector('svg'), { opacity: 0, duration: 0.2 }, '-=0.2')
        .to(saveBtnRef.current, { backgroundColor: '#111820', duration: 0.2 }, '-=0.2');
        
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div ref={containerRef} className="h-48 w-full bg-steel border border-wire rounded-[1.5rem] p-5 relative flex flex-col justify-between overflow-hidden shadow-inner">
      <div className="grid grid-cols-7 gap-1 flex-1 items-center">
        {days.map((d, i) => {
          let ref = null;
          let extraClass = '';
          if (i === 1) { ref = targetMonRef; extraClass = 'day-mon'; }
          if (i === 3) { ref = targetWedRef; extraClass = 'day-wed'; }
          if (i === 5) { ref = targetFriRef; extraClass = 'day-fri relative flex justify-center items-center'; }
          
          return (
            <div 
              key={i} 
              ref={ref}
              className={`aspect-square rounded-full flex gap-1 items-center justify-center text-xs font-data font-medium text-slate transition-colors border border-transparent ${extraClass}`}
            >
              {d}
              {i === 5 && <CheckCircle2 className="w-3 h-3 absolute top-0 -right-1 text-signal opacity-0" />}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between items-end mt-4">
        <div className="font-data text-[10px] text-slate/50 max-w-[120px] leading-tight flex flex-col gap-1">
          <span className="text-cyan">M: Review</span>
          <span className="text-amber">W: Query</span>
          <span className="text-signal">F: Resolve</span>
        </div>
        <div ref={saveBtnRef} className="px-4 py-2 border border-wire bg-vault text-glacier rounded-full text-[10px] uppercase tracking-wider font-heading whitespace-nowrap transition-colors">
          Close Report
        </div>
      </div>
      
      <div ref={cursorRef} className="absolute top-0 left-0 z-10 text-glacier pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] -ml-2 -mt-2">
        <MousePointer2 className="w-5 h-5 fill-slate text-glacier" />
      </div>
    </div>
  );
};

export default function Features() {
  const container = useRef(null);

  // Removed GSAP to fix opacity triggering issue
  useEffect(() => {
    // If we want to restore scroll anims, we can use an IntersectionObserver or fix the GSAP context
  }, []);

  return (
    <section id="audit-engine" ref={container} className="py-24 px-6 md:px-16 bg-vault max-w-7xl mx-auto">
      
      <div className="text-center mb-16">
        <h2 className="font-heading font-bold text-3xl md:text-5xl lg:text-5xl text-glacier tracking-tight mb-4">
          The Audit Engine
        </h2>
        <p className="font-body text-slate text-lg max-w-2xl mx-auto">
          We rebuilt the invoice audit from the ground up, replacing manual sampling with full-ledger precision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
        
        {/* Card 1 */}
        <div className="feature-card relative flex flex-col gap-4 p-8 lg:p-10 rounded-[2rem] bg-steel/40 backdrop-blur-xl border border-wire/60 overflow-hidden shadow-2xl hover:-translate-y-2 hover:border-cyan/50 hover:shadow-[0_15px_50px_-15px_rgba(0,194,203,0.3)] transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan/20 blur-[50px] rounded-full group-hover:bg-cyan/30 transition-colors duration-500 pointer-events-none"></div>
          
          <div className="relative w-16 h-16 rounded-2xl bg-vault/80 border border-wire/80 flex items-center justify-center text-cyan mb-4 group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_2px_15px_rgba(0,194,203,0.1)]">
            <div className="absolute inset-0 rounded-2xl border border-cyan/0 group-hover:border-cyan/40 animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Files size={32} strokeWidth={1.5} className="relative z-10 drop-shadow-[0_0_8px_rgba(0,194,203,0.8)]" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-white group-hover:text-cyan transition-colors duration-300">Full Ledger Coverage</h3>
          <p className="font-body text-slate text-base leading-[1.7] relative z-10">
            Every invoice line item is checked. Not a sample. Not a spot check. Every single one.
          </p>
        </div>

        {/* Card 2 */}
        <div className="feature-card relative flex flex-col gap-4 p-8 lg:p-10 rounded-[2rem] bg-steel/40 backdrop-blur-xl border border-wire/60 overflow-hidden shadow-2xl hover:-translate-y-2 hover:border-amber/50 hover:shadow-[0_15px_50px_-15px_rgba(245,166,35,0.3)] transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-amber/20 blur-[50px] rounded-full group-hover:bg-amber/30 transition-colors duration-500 pointer-events-none"></div>
          
          <div className="relative w-16 h-16 rounded-2xl bg-vault/80 border border-wire/80 flex items-center justify-center text-amber mb-4 group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_2px_15px_rgba(245,166,35,0.1)]">
            <div className="absolute inset-0 rounded-2xl border border-amber/0 group-hover:border-amber/40 animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <FileSearch size={32} strokeWidth={1.5} className="relative z-10 drop-shadow-[0_0_8px_rgba(245,166,35,0.8)]" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-white group-hover:text-amber transition-colors duration-300">Contract Intelligence</h3>
          <p className="font-body text-slate text-base leading-[1.7] relative z-10">
            Veyroniq reads your contracts, POs, and rate schedules and applies them automatically against each invoice.
          </p>
        </div>

        {/* Card 3 */}
        <div className="feature-card relative flex flex-col gap-4 p-8 lg:p-10 rounded-[2rem] bg-steel/40 backdrop-blur-xl border border-wire/60 overflow-hidden shadow-2xl hover:-translate-y-2 hover:border-signal/50 hover:shadow-[0_15px_50px_-15px_rgba(0,232,122,0.3)] transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-br from-signal/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-signal/20 blur-[50px] rounded-full group-hover:bg-signal/30 transition-colors duration-500 pointer-events-none"></div>
          
          <div className="relative w-16 h-16 rounded-2xl bg-vault/80 border border-wire/80 flex items-center justify-center text-signal mb-4 group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_2px_15px_rgba(0,232,122,0.1)]">
            <div className="absolute inset-0 rounded-2xl border border-signal/0 group-hover:border-signal/40 animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Flag size={32} strokeWidth={1.5} className="relative z-10 drop-shadow-[0_0_8px_rgba(0,232,122,0.8)]" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-white group-hover:text-signal transition-colors duration-300">Evidence-Backed Reports</h3>
          <p className="font-body text-slate text-base leading-[1.7] relative z-10">
            Every discrepancy is flagged with the exact clause, line item, and recoverable value. Ready to send to your supplier.
          </p>
        </div>

      </div>

      <div className="mt-16 md:mt-24 w-full flex justify-center feature-card">
        <div className="font-data text-cyan tracking-[0.1em] uppercase text-sm md:text-base border border-cyan/20 bg-cyan/5 px-8 py-4 rounded-full shadow-[0_0_30px_rgba(0,194,203,0.1)]">
          On average, 3–8% of invoice spend contains errors.
        </div>
      </div>

    </section>
  );
}
