import React, { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '', email: '', business: '', industry: '', invoices: '', message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) setSubmitted(true);
    } catch (error) {
      console.error('Failed to send:', error);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-16 bg-[#080B0F] border-t border-wire relative z-10 w-full overflow-hidden">
      <div className="max-w-3xl mx-auto rounded-[2rem] bg-steel/50 border border-wire p-8 md:p-12 shadow-2xl relative">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <div className="w-32 h-32 rounded-full border border-cyan absolute top-4 right-4 animate-ping"></div>
          <div className="w-24 h-24 rounded-full border border-cyan absolute top-8 right-8 animate-pulse"></div>
        </div>

        <div className="mb-10 relative z-10">
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-glacier mb-4 tracking-tight">Let’s find what you’re owed.</h2>
          <p className="font-body text-slate text-lg">Tell us about your business and we’ll be in touch within 24 hours.</p>
        </div>

        {submitted ? (
          <div className="bg-vault border border-wire rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 rounded-full bg-signal/10 text-signal flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-2xl text-glacier mb-2">Request Received</h3>
            <p className="font-body text-slate">Thanks — we’ll review your details and be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-data text-xs uppercase tracking-widest text-slate">Full Name *</label>
                <input required type="text" className="bg-vault border border-wire rounded-xl px-4 py-3 text-glacier placeholder-slate/40 focus:outline-none focus:border-cyan transition-colors" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-data text-xs uppercase tracking-widest text-slate">Business Email *</label>
                <input required type="email" className="bg-vault border border-wire rounded-xl px-4 py-3 text-glacier placeholder-slate/40 focus:outline-none focus:border-cyan transition-colors" placeholder="john@company.com" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-data text-xs uppercase tracking-widest text-slate">Business Name *</label>
              <input required type="text" className="bg-vault border border-wire rounded-xl px-4 py-3 text-glacier placeholder-slate/40 focus:outline-none focus:border-cyan transition-colors" placeholder="Company Ltd" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-data text-xs uppercase tracking-widest text-slate">Industry *</label>
                <select required className="bg-vault border border-wire rounded-xl px-4 py-3 text-glacier focus:outline-none focus:border-cyan transition-colors appearance-none cursor-pointer">
                  <option value="">Select Industry</option>
                  <option value="Construction SMEs">Construction SMEs</option>
                  <option value="Letting Agencies">Letting Agencies</option>
                  <option value="Professional Services">Professional Services</option>
                  <option value="Facilities Management">Facilities Management</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-data text-xs uppercase tracking-widest text-slate">Invoices per month *</label>
                <select required className="bg-vault border border-wire rounded-xl px-4 py-3 text-glacier focus:outline-none focus:border-cyan transition-colors appearance-none cursor-pointer">
                  <option value="">Select Volume</option>
                  <option value="Under 20">Under 20</option>
                  <option value="20-50">20–50</option>
                  <option value="50-200">50–200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-data text-xs uppercase tracking-widest text-slate">Anything else we should know?</label>
              <textarea rows={4} className="bg-vault border border-wire rounded-xl px-4 py-3 text-glacier placeholder-slate/40 focus:outline-none focus:border-cyan transition-colors resize-none" placeholder="Optional details..."></textarea>
            </div>

            <button type="submit" className="w-full mt-4 bg-cyan text-vault py-4 rounded-xl font-heading font-bold text-lg hover:shadow-[0_0_20px_rgba(0,194,203,0.3)] transition-all duration-300 click-pop">
              Request My Free Audit
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-slate font-body text-sm relative z-10">
          Prefer to reach us directly? Email us at <a href="mailto:contact@veyroniq-limited.com" className="text-cyan hover:text-white transition-colors font-medium">contact@veyroniq-limited.com</a>
        </div>
      </div>
    </section>
  );
}
