import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site, waLink } from '../siteConfig.js';

const links = [
  ['#products', 'Catalogue'],
  ['#about', 'About'],
  ['#services', 'Services'],
  ['#quote', 'Request a quote'],
  ['#contact', 'Contact'],
];

const hello = 'Hello MBZ TRADING, I would like to enquire about auto spare parts.';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-mbz-line bg-white">
      <div className="mbz-container flex h-[72px] items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-3" aria-label={`${site.company} home`}>
          <span className="grid h-11 w-11 place-items-center rounded-md bg-mbz-red font-display text-xl font-bold tracking-wide text-white">
            MBZ
          </span>
          <span className="leading-none">
            <span className="block font-display text-2xl font-bold tracking-wide text-mbz-ink">
              {site.company}
            </span>
            <span className="mt-1 block text-xs font-semibold tracking-[0.14em] text-mbz-muted">
              {site.subtitle}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-[15px] font-semibold text-mbz-ink underline-offset-8 hover:text-mbz-red hover:underline"
            >
              {label}
            </a>
          ))}
          <a href={waLink(hello)} target="_blank" rel="noopener noreferrer" className="btn-red !py-2.5">
            WhatsApp us
          </a>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md border-2 border-mbz-ink text-mbz-ink lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-mbz-line bg-white pb-5 lg:hidden">
          <div className="mbz-container flex flex-col">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-mbz-line py-3.5 text-lg font-semibold text-mbz-ink"
              >
                {label}
              </a>
            ))}
            <a href={waLink(hello)} target="_blank" rel="noopener noreferrer" className="btn-red mt-4">
              WhatsApp us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
