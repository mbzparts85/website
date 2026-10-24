import { useState } from 'react';
import { site, waLink } from '../siteConfig.js';

const empty = { name: '', company: '', parts: '', details: '' };

export default function Quote() {
  const [form, setForm] = useState(empty);

  function onSubmit(event) {
    event.preventDefault();
    const msg = `Hello MBZ TRADING, I would like a quotation.
Name: ${form.name}
Company: ${form.company || 'Not provided'}
Parts: ${form.parts}
Additional details: ${form.details || 'None'}`;
    window.open(waLink(msg), '_blank', 'noopener,noreferrer');
  }

  function field(key) {
    return {
      value: form[key],
      onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  return (
    <section id="quote" className="bg-mbz-ink py-16 text-white lg:py-24">
      <div className="mbz-container grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="mbz-h2 !text-white">Tell us which parts you need</h2>
          <p className="mt-5 max-w-[48ch] text-lg text-white/80">
            Fill in the form and it opens in WhatsApp, ready to send. We reply with price, availability and
            origin where possible.
          </p>
          <dl className="mt-8 space-y-4">
            <div>
              <dt className="text-sm font-semibold text-white/60">WhatsApp</dt>
              <dd className="text-2xl font-semibold">{site.whatsappDisplay}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-white/60">Email</dt>
              <dd className="break-all text-2xl font-semibold">{site.email}</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={onSubmit} className="rounded-md bg-white p-6 text-mbz-body md:p-8">
          <div className="mb-5">
            <label htmlFor="q-name" className="mbz-label">Your name</label>
            <input id="q-name" className="mbz-input" required autoComplete="name" {...field('name')} />
          </div>
          <div className="mb-5">
            <label htmlFor="q-company" className="mbz-label">Company (optional)</label>
            <input id="q-company" className="mbz-input" autoComplete="organization" {...field('company')} />
          </div>
          <div className="mb-5">
            <label htmlFor="q-parts" className="mbz-label">Part numbers and quantities</label>
            <textarea
              id="q-parts"
              className="mbz-input min-h-[110px]"
              required
              placeholder="Example: 17801-0L040 x 50 pcs"
              {...field('parts')}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="q-details" className="mbz-label">Other details (optional)</label>
            <textarea
              id="q-details"
              className="mbz-input min-h-[80px]"
              placeholder="Vehicle model, delivery country, preferred origin"
              {...field('details')}
            />
          </div>
          <button type="submit" className="btn-red w-full">
            Send enquiry on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
