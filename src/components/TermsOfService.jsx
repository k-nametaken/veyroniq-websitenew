import React, { useEffect } from 'react';
import Footer from './Footer';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-vault text-glacier font-body pt-32 selection:bg-cyan/30 selection:text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-16 mb-32">
        <a href="/" className="text-cyan hover:text-white mb-8 inline-block transition-colors font-medium">← Back to Home</a>
        
        <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-glacier mb-6 tracking-tight">Terms of Service</h1>
        <p className="text-slate mb-12">Effective Date: March 2026</p>

        <div className="space-y-12 text-slate leading-relaxed">
          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the Veyroniq Ltd. website and invoice auditing platform, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions outlined herein, you may not access our services.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">2. Description of Service</h2>
            <p>Veyroniq provides an AI-powered financial platform designed to analyze, cross-reference, and audit corporate supply chain invoices against corresponding purchase orders (POs) and contractual rate cards. Our system surfaces overbillings, duplicate charges, and calculation errors ("Discrepancies") to facilitate the seamless recovery of funds.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">3. Performance-Based Fees & Billing</h2>
            <p>Veyroniq operates strictly on a contingency recovery basis. We only charge a processing fee when we successfully identify and verify recoverable funds.</p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-white/80">
              <li>Our total fee is <strong>30%</strong> of the funds successfully recovered or credited back to your organization as a direct result of our discrepancy reports.</li>
              <li>There are absolutely <strong>zero upfront costs</strong>, integration fees, or ongoing subscription charges for utilizing the base platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">4. User Obligations & Data Accuracy</h2>
            <p>To provide accurate audits, you must supply Veyroniq with complete, high-fidelity, and unmodified copies of your historical invoices, corresponding contracts, and PO ledgers. You represent and warrant that you hold the necessary rights and authorizations to share these financial documents securely with us for the sole purpose of automated auditing.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">5. Confidentiality & Intellectual Property</h2>
            <p>We treat all uploaded financial data as strictly Confidential Information, ring-fenced and protected under the strict conditions defined in our <a href="/privacy" className="text-cyan hover:underline transition-colors">Privacy Policy</a>. In addition, all intellectual property rights related to the Veyroniq auditing engine algorithms, machine learning methodologies, software code, and UI elements remain the exclusive property of Veyroniq Ltd.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">6. Limitation of Liability</h2>
            <p>While our systems achieve extremely high detection precision, Veyroniq Ltd. does not guarantee the recovery of any specific monetary amount or timeline. To the maximum extent permitted by applicable law, Veyroniq Ltd. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">7. Contact & Legal</h2>
            <p>These terms shall be governed by and defined following the laws of the United Kingdom. For enterprise legal inquiries or to discuss a master services agreement, contact our legal team at:</p>
            <a href="mailto:legal@veyroniq-limited.com" className="text-cyan font-bold hover:text-white transition-colors mt-2 inline-block">legal@veyroniq-limited.com</a>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
