import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Counter = ({ endValue, prefix = '', suffix = '', decimals = 0, label }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: endValue,
        duration: 2.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: nodeRef.current,
          start: 'top 85%',
        },
        onUpdate: () => {
          if (nodeRef.current) {
            const formatted = obj.val.toFixed(decimals);
            nodeRef.current.innerText = `${prefix}${formatted}${suffix}`;
          }
        }
      });
    });
    return () => ctx.revert();
  }, [endValue, prefix, suffix, decimals]);

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div 
        ref={nodeRef} 
        className="font-data text-4xl lg:text-5xl font-bold text-cyan mb-2 tracking-tight"
      >
        {prefix}0{suffix}
      </div>
      <div className="font-body text-slate text-sm font-medium">
        {label}
      </div>
    </div>
  );
};

export default function TrustBar() {
  return (
    <section className="bg-steel border-y border-wire relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-wire divide-y md:divide-y-0">
          
          <Counter 
            endValue={2.4} 
            prefix="£" 
            suffix="M+" 
            decimals={1}
            label="Revenue recovered for clients" 
          />
          
          <Counter 
            endValue={99.2} 
            suffix="%" 
            decimals={1}
            label="Invoice accuracy rate post-audit" 
          />
          
          <Counter 
            endValue={14} 
            suffix="min" 
            label="Average time to full audit report" 
          />
          
          <Counter 
            endValue={100} 
            suffix="%" 
            label="Contractual compliance verified" 
          />

        </div>
        
        <div className="py-6 text-center border-t border-wire border-opacity-50">
          <p className="font-body italic text-slate text-sm">
            Trusted by construction project managers, letting agencies, and operations teams.
          </p>
        </div>
      </div>
    </section>
  );
}
