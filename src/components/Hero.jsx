import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const AuditWidget = () => {
  const lines = [
    { text: "Day Rate × 23 days", flag: "OVERBILLED +£1,240", type: "amber" },
    { text: "Retention clause: 3%", flag: "NOT APPLIED -£870", type: "amber" },
    { text: "Material uplift: N/A", flag: "✓ COMPLIANT", type: "green" },
  ];

  const [activeLine, setActiveLine] = useState(-1);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setActiveLine(i);
      i = (i + 1) % (lines.length + 1); // +1 cycle for reset
    }, 1500);
    return () => clearInterval(interval);
  }, [lines.length]);

  return (
    <div className="bg-steel border border-wire rounded-[2rem] p-6 lg:p-8 shadow-2xl relative w-full max-w-md mx-auto xl:mx-0 font-body">
      <div className="flex items-center gap-3 mb-8 border-b border-wire pb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-signal animate-pulse shadow-[0_0_10px_rgba(0,232,122,0.5)]"></div>
        <div className="font-data text-xs tracking-widest text-slate uppercase">
          LIVE AUDIT — INV-2847
        </div>
      </div>

      <div className="flex flex-col gap-5 mb-8">
        {lines.map((item, idx) => (
          <div key={idx} className="relative py-2 overflow-hidden">
            {/* Base Text */}
            <div className="flex justify-between items-center text-sm font-data">
              <span className="text-glacier/70">{item.text}</span>
              <span className={`text-xs ${activeLine >= idx ? (item.type === 'amber' ? 'text-amber' : 'text-signal') : 'opacity-0'} transition-opacity duration-300`}>
                {item.flag}
              </span>
            </div>
            
            {/* Scanning line mask */}
            {activeLine === idx && (
              <div className="absolute inset-0 bg-cyan/10 animate-[scan_1.5s_ease-in-out]">
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-cyan shadow-[0_0_10px_rgba(0,194,203,0.8)]"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-wire pt-5 flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <span className="font-data text-[10px] text-slate uppercase tracking-wider">Discrepancies found</span>
          <span className="font-data text-glacier text-lg">2</span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="font-data text-[10px] text-slate uppercase tracking-wider">Recoverable</span>
          <span className="font-data text-signal text-lg font-bold">£2,110</span>
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Node definitions - denser and larger
    // Capped to a maximum of 35 cubes to ensure lock-solid 60 FPS on all devices
    const numCubes = Math.min(Math.floor(window.innerWidth / 40), 35); 
    const cubes = Array.from({ length: numCubes }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: (Math.random() - 0.5) * 2000 + 1000, 
      size: Math.random() * 25 + 15, // bigger cubes
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      rz: Math.random() * Math.PI,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
      dz: (Math.random() - 0.5) * 0.8,
      drx: (Math.random() - 0.5) * 0.02,
      dry: (Math.random() - 0.5) * 0.02,
      drz: (Math.random() - 0.5) * 0.02,
      pulseOffset: Math.random() * Math.PI * 2, // for glowing logic
    }));

    const fov = 400;

    // Helper: rotate 3D point
    const rotate3D = (x, y, z, rx, ry, rz) => {
      let y1 = y * Math.cos(rx) - z * Math.sin(rx);
      let z1 = y * Math.sin(rx) + z * Math.cos(rx);
      let x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
      let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
      let x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
      let y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
      return [x3, y3, z2];
    };

    let reqId;
    const draw = () => {
      // Clear background
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#080B0F'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Update positions
      cubes.forEach(c => {
        c.x += c.dx; c.y += c.dy; c.z += c.dz;
        c.rx += c.drx; c.ry += c.dry; c.rz += c.drz;
        
        // Wrap around bounds
        if (c.x > 1000) c.x -= 2000; if (c.x < -1000) c.x += 2000;
        if (c.y > 1000) c.y -= 2000; if (c.y < -1000) c.y += 2000;
        if (c.z > 2000) c.z -= 2000; if (c.z < 100) c.z += 1900;
      });

      // Calculate projected centers for line connecting
      const projected = cubes.map(c => {
        const scale = fov / (fov + c.z);
        return {
          ...c,
          px: c.x * scale + cx,
          py: c.y * scale + cy,
          scale
        };
      });

      ctx.lineWidth = 1.2;
      // Draw connecting lines (network)
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dist = Math.hypot(p1.px - p2.px, p1.py - p2.py);
          if (dist < 200) { 
            const opacity = (1 - dist / 200) * 0.4; // highly visible lines
            ctx.strokeStyle = `rgba(0, 194, 203, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw wireframe cubes and glowing cores
      const vertices = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
      ];
      const edges = [
        [0,1], [1,2], [2,3], [3,0], // back
        [4,5], [5,6], [6,7], [7,4], // front
        [0,4], [1,5], [2,6], [3,7]  // connecting
      ];

      projected.sort((a, b) => b.z - a.z); // draw back to front

      projected.forEach(c => {
        const intensity = (Math.sin(Date.now() * 0.001 + c.pulseOffset) + 1) * 0.5;
        const alpha = 0.2 + c.scale * 0.6 + (intensity * 0.2); 
        
        ctx.strokeStyle = `rgba(0, 194, 203, ${alpha})`; 
        ctx.lineWidth = c.scale * 3.0;
        
        // Remove heavy drop shadow from edges to preserve 60FPS
        ctx.shadowBlur = 0;
        
        ctx.beginPath();
        edges.forEach(([v1, v2]) => {
          const [x1, y1, z1] = rotate3D(vertices[v1][0]*c.size, vertices[v1][1]*c.size, vertices[v1][2]*c.size, c.rx, c.ry, c.rz);
          const p1s = fov / (fov + c.z + z1);
          const px1 = (c.x + x1) * p1s + cx;
          const py1 = (c.y + y1) * p1s + cy;

          const [x2, y2, z2] = rotate3D(vertices[v2][0]*c.size, vertices[v2][1]*c.size, vertices[v2][2]*c.size, c.rx, c.ry, c.rz);
          const p2s = fov / (fov + c.z + z2);
          const px2 = (c.x + x2) * p2s + cx;
          const py2 = (c.y + y2) * p2s + cy;

          ctx.moveTo(px1, py1);
          ctx.lineTo(px2, py2);
        });
        ctx.stroke();

        // Draw a central data core - hardware accelerated without drop shadow
        ctx.fillStyle = `rgba(0, 194, 203, ${0.4 + intensity * 0.6})`;
        ctx.beginPath();
        ctx.arc(c.px, c.py, c.scale * 2.5, 0, Math.PI*2);
        ctx.fill();
      });

      reqId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full pointer-events-none" />;
};

export default function Hero() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });
      
      gsap.to('.hero-bg-scale', {
        scale: 1.05,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, container);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative w-full min-h-[100dvh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* 3D Animated Canvas Background */}
      <NetworkBackground />

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-8 items-center h-full">
        
        <div className="flex flex-col justify-end xl:justify-center pt-10 xl:pt-0">
          <h1 className="hero-reveal font-heading font-extrabold text-glacier text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] tracking-tight mb-2">
            Your invoices are leaking money.
          </h1>
          <div className="hero-reveal font-drama italic text-cyan text-[clamp(3rem,7vw,6.5rem)] leading-none mb-8 pr-4">
            Veyroniq finds it back.
          </div>
          <p className="hero-reveal max-w-xl text-slate font-body text-lg md:text-xl mb-12 leading-[1.8]">
            We cross reference every invoice against your contracts and POs surfacing overbillings, duplicate charges, and clause violations. We recover what you’re owed, and only charge when we do.
          </p>
          
          <div className="hero-reveal flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button onClick={() => document.getElementById('audit-engine')?.scrollIntoView({behavior: 'smooth'})} className="relative overflow-hidden group bg-cyan text-vault px-8 py-4 rounded-full font-heading font-bold text-lg hover:scale-[1.03] shadow-[0_0_20px_rgba(0,194,203,0.2)] hover:shadow-[0_0_40px_rgba(0,194,203,0.4)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] click-pop">
              <span className="relative z-10 flex items-center justify-center">See It In Action</span>
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
            </button>
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior: 'smooth'})} className="font-body text-glacier/70 hover:text-cyan transition-colors flex items-center gap-2 group click-pop">
              How It Works <span className="group-hover:translate-y-1 transition-transform">↓</span>
            </button>
          </div>
        </div>

        <div className="hero-reveal flex items-center justify-center xl:justify-end w-full">
          <AuditWidget />
        </div>

      </div>
    </section>
  );
}
