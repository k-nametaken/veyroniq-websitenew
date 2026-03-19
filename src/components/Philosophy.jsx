import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax blueprint background
      gsap.to('.blueprint-bg', {
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: '15%',
        ease: 'none'
      });

      // Split Text imitation
      const words = gsap.utils.toArray('.manifesto-word');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
        }
      });

      tl.from('.manifesto-intro', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out'
      })
      .from('.manifesto-wrong', {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, '-=0.4')
      .to('.manifesto-wrong', {
        textShadow: '0 0 40px rgba(245, 166, 35, 0.4)',
        duration: 0.3,
        yoyo: true,
        repeat: 1
      })
      .from(words, {
        opacity: 0,
        y: 15,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power2.out'
      }, '-=0.2')
      .from('.manifesto-stat', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out'
      }, '+=0.2');

    }, container);
    return () => ctx.revert();
  }, []);

  const manifestoText = "Veyroniq exists because the gap between what you agreed and what you're billed is where revenue silently disappears. We make that gap visible — in minutes, not months.";
  const wordsArray = manifestoText.split(" ");

  return (
    <section id="philosophy" ref={container} className="relative py-32 md:py-48 px-6 md:px-16 bg-vault text-glacier overflow-hidden border-t border-wire">
      
      {/* Background Texture Parallax (Blueprint Grid) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] overflow-hidden">
        <div className="blueprint-bg absolute inset-[-10%] w-[120%] h-[120%] bg-[linear-gradient(to_right,#E8EDF3_1px,transparent_1px),linear-gradient(to_bottom,#E8EDF3_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-16 md:gap-20">
        
        <div>
          <p className="manifesto-intro font-body text-slate text-xl md:text-2xl lg:text-[1.3rem] mb-4">
            Most businesses assume their invoices are correct.
          </p>
          <div className="manifesto-wrong font-drama italic text-amber text-6xl md:text-8xl lg:text-9xl leading-[1.1] tracking-tight pr-4">
            They're wrong.
          </div>
        </div>

        <div className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl max-w-4xl leading-[1.2] tracking-tight">
          {wordsArray.map((word, i) => (
            <span key={i} className="manifesto-word inline-block mr-2 md:mr-3 lg:mr-4 mt-2">
              {word === "visble" || word === "revenue" || word === "minutes," ? (
                <span className="text-cyan">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </div>

        <div className="manifesto-stat mt-8 p-6 md:p-8 border border-wire bg-steel/50 rounded-[1.5rem] w-fit backdrop-blur-sm self-start">
          <div className="font-data text-xs text-slate uppercase tracking-widest mb-2">Veyroniq Insight Data</div>
          <div className="font-data text-lg md:text-xl text-glacier">
            On average, <span className="text-amber">3–8%</span> of invoice spend contains errors.
          </div>
        </div>

      </div>
    </section>
  );
}
