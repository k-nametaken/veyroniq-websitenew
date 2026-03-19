import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Features from './components/Features';
import UseCases from './components/UseCases';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Calculator from './components/Calculator';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentPath === '/privacy') {
    return <PrivacyPolicy />;
  }

  if (currentPath === '/terms') {
    return <TermsOfService />;
  }

  return (
    <div className="min-h-screen bg-vault text-glacier relative overflow-x-hidden selection:bg-cyan/30 selection:text-white font-body">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <Protocol />
        <Calculator />
        <UseCases />
        <Philosophy />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
