import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        onUpdate: (self) => {
          setIsScrolled(self.isActive);
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.mobile-link', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <div ref={containerRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
        <nav 
          className={`flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 ${
            isScrolled 
              ? 'bg-steel/80 backdrop-blur-xl border border-wire shadow-lg' 
              : 'bg-transparent text-glacier'
          }`}
        >
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-data font-semibold text-lg tracking-[0.2em] uppercase text-glacier hover:text-white transition-colors cursor-pointer"
          >
            Veyroniq
          </button>
          
          <div className="hidden md:flex items-center space-x-10 font-body font-medium text-sm text-slate">
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({behavior: 'smooth'})}} className="hover:text-glacier hover:-translate-y-[1px] transition-all">How It Works</a>
            <a href="#use-cases" onClick={(e) => { e.preventDefault(); document.getElementById('use-cases')?.scrollIntoView({behavior: 'smooth'})}} className="hover:text-glacier hover:-translate-y-[1px] transition-all">Use Cases</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}} className="hover:text-glacier hover:-translate-y-[1px] transition-all">Contact</a>
          </div>
          
          <div className="hidden md:block">
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="relative overflow-hidden group bg-cyan text-vault px-6 py-2.5 rounded-full font-heading font-bold text-sm transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(0,194,203,0.3)] duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] click-pop">
              <span className="relative z-10 flex items-center justify-center">Request Free Audit</span>
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
            </button>
          </div>

          <button className="md:hidden text-glacier p-2" onClick={toggleMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-vault/95 backdrop-blur-2xl flex flex-col justify-center items-center px-6">
          <div className="flex flex-col items-center space-y-8 font-heading text-2xl text-glacier">
            <a href="#how-it-works" className="mobile-link" onClick={(e) => { e.preventDefault(); toggleMenu(); setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({behavior: 'smooth'}), 100); }}>How It Works</a>
            <a href="#use-cases" className="mobile-link" onClick={(e) => { e.preventDefault(); toggleMenu(); setTimeout(() => document.getElementById('use-cases')?.scrollIntoView({behavior: 'smooth'}), 100); }}>Use Cases</a>
            <a href="#contact" className="mobile-link" onClick={(e) => { e.preventDefault(); toggleMenu(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}), 100); }}>Contact</a>
            <button onClick={() => { toggleMenu(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="mobile-link mt-8 bg-cyan text-vault px-8 py-3 rounded-full font-heading font-bold text-lg hover:shadow-[0_0_30px_rgba(0,194,203,0.4)] transition-shadow">
              Request Free Audit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
