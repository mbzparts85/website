import { useState } from 'react';
import { Search } from 'lucide-react';
import { site } from '../siteConfig.js';

const steps = [
  ['Send a part number or a list', 'Search below, use the quote form, or message us on WhatsApp.'],
  ['We reply with price, availability and origin', 'Where possible, in the same conversation.'],
  ['Not in stock? We pre-order it', 'Sourced on demand from our suppliers abroad.'],
];

export default function Hero({ onSearch }) {
  const [value, setValue] = useState('');

  function submit(event) {
    event.preventDefault();
    onSearch(value.trim());
  }

  return (
    <section id="home" className="bg-white">
      <div className="mbz-container grid gap-12 py-14 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16 lg:py-24">
        <div>
          <h1 className="max-w-[16ch] text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]">
            {site.heroHeading}
          </h1>
          <p className="mbz-lead mt-6">{site.heroText}</p>

          <form onSubmit={submit} className="mt-9 max-w-xl" role="search">
            <label htmlFor="hero-search" className="mbz-label text-base">
              Look up a Toyota part number
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="hero-search"
                type="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="For example 17801-0L040"
                className="mbz-input !border-mbz-ink !py-3.5 text-lg"
                autoComplete="off"
              />
              <button type="submit" className="btn-red shrink-0 !py-3.5">
                <Search size={18} aria-hidden="true" />
                Search catalogue
              </button>
            </div>
            <p className="mt-3 text-sm text-mbz-muted">
              Can’t find it? <a href="#quote" className="font-semibold text-mbz-red underline">Request a quote</a> and we will source it.
            </p>
          </form>
        </div>

        <aside className="border-l-4 border-mbz-red bg-mbz-surface p-7 md:p-9">
          <h2 className="text-3xl font-bold">How an enquiry works</h2>
          <ol className="mt-6 space-y-6">
            {steps.map(([title, copy], i) => (
              <li key={title} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mbz-ink font-display text-lg font-bold text-white">
                  {i + 1}
                </span>
                <span>
                  <strong className="block text-lg leading-snug text-mbz-ink">{title}</strong>
                  <span className="mt-1 block text-[15px] text-mbz-body">{copy}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-7 border-t border-mbz-line pt-5 text-sm text-mbz-muted">
            We supply businesses only: importers, wholesalers, retailers and workshops.
          </p>
        </aside>
      </div>
    </section>
  );
}
