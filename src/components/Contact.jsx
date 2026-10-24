import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { site, waLink } from '../siteConfig.js';

export default function Contact() {
  const [status, setStatus] = useState('');

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const msg = `Hello MBZ TRADING
Name: ${data.get('name')}
Email: ${data.get('email')}
Message: ${data.get('message')}`;
    window.open(waLink(msg), '_blank', 'noopener,noreferrer');
    setStatus('Your message is ready in WhatsApp. Press send there to finish.');
  }

  const rowClass = 'flex items-center gap-4 border-b border-mbz-line py-5';

  return (
    <section id="contact" className="bg-white py-16 lg:py-24">
      <div className="mbz-container grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="mbz-h2">Contact us</h2>
          <p className="mbz-lead mt-4">Talk to us about your business requirements.</p>
          <div className="mt-8 border-t-2 border-mbz-ink">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className={`${rowClass} hover:bg-mbz-surface`}>
              <Phone className="shrink-0 text-mbz-red" size={24} aria-hidden="true" />
              <span>
                <strong className="block text-mbz-ink">WhatsApp</strong>
                <span className="text-lg">{site.whatsappDisplay}</span>
              </span>
            </a>
            <a href={`mailto:${site.email}`} className={`${rowClass} hover:bg-mbz-surface`}>
              <Mail className="shrink-0 text-mbz-red" size={24} aria-hidden="true" />
              <span className="min-w-0">
                <strong className="block text-mbz-ink">Email</strong>
                <span className="break-all text-lg">{site.email}</span>
              </span>
            </a>
            <div className={rowClass}>
              <MapPin className="shrink-0 text-mbz-red" size={24} aria-hidden="true" />
              <span>
                <strong className="block text-mbz-ink">Location</strong>
                <span className="text-lg">{site.location}</span>
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-md border-2 border-mbz-line bg-white p-6 md:p-8">
          <h3 className="mb-5 text-2xl font-bold">Send a message</h3>
          <div className="mb-5">
            <label htmlFor="c-name" className="mbz-label">Your name</label>
            <input id="c-name" name="name" className="mbz-input" required autoComplete="name" />
          </div>
          <div className="mb-5">
            <label htmlFor="c-email" className="mbz-label">Email</label>
            <input id="c-email" name="email" type="email" className="mbz-input" required autoComplete="email" />
          </div>
          <div className="mb-6">
            <label htmlFor="c-message" className="mbz-label">Message</label>
            <textarea id="c-message" name="message" className="mbz-input min-h-[130px]" required />
          </div>
          <button type="submit" className="btn-dark w-full">
            Open in WhatsApp
          </button>
          {status ? (
            <p className="mt-3 text-sm font-semibold text-emerald-800" role="status">
              {status}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
