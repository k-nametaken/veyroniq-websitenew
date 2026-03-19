import React, { useEffect } from 'react';
import Footer from './Footer';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-vault text-glacier font-body pt-32 selection:bg-cyan/30 selection:text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-16 mb-32">
        <a href="/" className="text-cyan hover:text-white mb-8 inline-block transition-colors font-medium">← Back to Home</a>
        
        <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-glacier mb-6 tracking-tight">Privacy Policy</h1>
        <p className="text-slate mb-12">Effective Date: March 2026</p>

        <div className="space-y-12 text-slate leading-relaxed">
          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">1. Introduction</h2>
            <p>Welcome to Veyroniq Ltd. ("we", "our", or "us"). We understand that you are trusting us with highly sensitive financial and contractual data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AI-powered invoice auditing platform.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">2. Information We Collect</h2>
            <p>We collect information that you voluntarily provide to us when you register for the platform, express an interest in obtaining information about us, or otherwise contact us. The personal and corporate information we collect may include:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-white/80">
              <li><strong className="text-white">Contact Data:</strong> Name, business email address, phone number.</li>
              <li><strong className="text-white">Corporate Data:</strong> Company name, industry, registration numbers.</li>
              <li><strong className="text-white">Financial Data:</strong> Invoices, ledgers, contracts, and purchase orders submitted specifically for auditing.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">3. Data Security & Isolation</h2>
            <p>Your financial data is our highest priority. We employ enterprise-grade security protocols to protect your information:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-white/80">
              <li><strong>Encryption:</strong> Data is encrypted at rest using AES-256 and in transit using TLS 1.3 or higher.</li>
              <li><strong>Data Isolation:</strong> All uploaded contracts and invoices are processed within isolated, ephemeral container environments.</li>
              <li><strong>No Cross-Training:</strong> Your proprietary data, billing rates, and contract clauses are <em>never</em> used to train generalized AI models outside of your organization's specific instance.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">4. How We Use Your Information</h2>
            <p>We use the information collected via our website and platform for a variety of business purposes, primarily including:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-white/80">
              <li>To provide, operate, and maintain our auditing services.</li>
              <li>To cross-reference your specific invoices against your specific contracts.</li>
              <li>To generate discrepancy reports and alert you to potential recovery opportunities.</li>
              <li>To respond to your inquiries and offer dedicated support.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">5. Information Sharing</h2>
            <p>We do not sell, trade, or rent your identifying information or your financial data to third parties under any circumstances. We may share information with trusted third-party service providers (such as cloud hosting infrastructure) who assist us in operating our platform, provided those parties agree to keep this information strictly confidential under rigorous NDAs and DPA agreements.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">6. Your Data Rights</h2>
            <p>Depending on your location, you may have rights under the GDPR or UK GDPR to access, correct, delete, or restrict the use of your personal data. You can also request a full destruction of all processing environments holding your financial documents at any time.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">7. Contact Us</h2>
            <p>If you have questions, comments, or concerns about this Privacy Policy or our data processing practices, please contact our Data Protection Officer at:</p>
            <a href="mailto:privacy@veyroniq-limited.com" className="text-cyan font-bold hover:text-white transition-colors mt-2 inline-block">privacy@veyroniq-limited.com</a>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
