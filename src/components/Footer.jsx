import { site } from '../siteConfig.js';

const links = [
  ['#products', 'Catalogue'],
  ['#about', 'About'],
  ['#services', 'Services'],
  ['#quote', 'Request a quote'],
  ['#contact', 'Contact'],
];

export default function Footer() {
  return (
    <footer className="border-t border-mbz-line bg-mbz-surface py-10">
      <div className="mbz-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <strong className="font-display text-2xl text-mbz-ink">{site.company}</strong>
          <span className="ml-2 text-sm font-semibold tracking-[0.12em] text-mbz-muted">{site.subtitle}</span>
          <p className="mt-1 text-sm text-mbz-muted">
            © {new Date().getFullYear()} {site.company}. All rights reserved.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-semibold">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-mbz-ink hover:text-mbz-red">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
