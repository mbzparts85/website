import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { site, waLink } from '../siteConfig.js';

const PAGE_SIZE = 15;
const PLACEHOLDER = 'Toyota / selected application';

export default function Products({ query, setQuery }) {
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const tableTop = useRef(null);

  useEffect(() => setPage(1), [query]);

  const counts = useMemo(() => {
    const map = {};
    site.parts.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return site.parts.filter((part) => {
      const hay = `${part.partNumber} ${part.name} ${part.category}`.toLowerCase();
      return (!q || hay.includes(q)) && (category === 'all' || part.category === category);
    });
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const slice = filtered.slice(start, start + PAGE_SIZE);

  function chooseCategory(value) {
    setCategory(value);
    setPage(1);
  }

  function goTo(next) {
    setPage(next);
    tableTop.current?.scrollIntoView({ block: 'start' });
  }

  const chip = (active) =>
    `rounded-full border-2 px-4 py-1.5 text-[15px] font-semibold transition-colors ${
      active
        ? 'border-mbz-ink bg-mbz-ink text-white'
        : 'border-mbz-line bg-white text-mbz-ink hover:border-mbz-ink'
    }`;

  return (
    <section id="products" className="bg-white py-16 lg:py-24">
      <div className="mbz-container">
        <h2 className="mbz-h2">Toyota parts catalogue</h2>
        <p className="mbz-lead mt-4">
          {site.parts.length} parts. Search by part number or name, or pick a category. Ask for a price on any
          line.
        </p>

        <div className="mt-8">
          <label htmlFor="catalogue-search" className="mbz-label">
            Search the catalogue
          </label>
          <input
            id="catalogue-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mbz-input max-w-xl !border-mbz-ink text-lg"
            type="search"
            placeholder="Part number or name, for example 17801-0L040 or headlamp"
            autoComplete="off"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button type="button" className={chip(category === 'all')} onClick={() => chooseCategory('all')}>
            All ({site.parts.length})
          </button>
          {site.categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={chip(category === cat)}
              onClick={() => chooseCategory(cat)}
            >
              {cat} ({counts[cat] || 0})
            </button>
          ))}
        </div>

        <p ref={tableTop} className="mt-8 scroll-mt-24 text-base font-semibold text-mbz-ink" aria-live="polite">
          {filtered.length
            ? `Showing ${start + 1}–${start + slice.length} of ${filtered.length} parts`
            : '0 parts found'}
        </p>

        {slice.length ? (
          <div className="mt-3 border-t-2 border-mbz-ink">
            <div className="hidden grid-cols-[180px_1fr_130px_150px] gap-4 border-b border-mbz-line py-3 text-sm font-semibold text-mbz-muted md:grid">
              <span>Part number</span>
              <span>Description</span>
              <span>Category</span>
              <span className="text-right">Price</span>
            </div>
            <ul>
              {slice.map((part) => {
                const note = part.application && part.application !== PLACEHOLDER ? part.application : '';
                return (
                  <li
                    key={part.partNumber + part.name}
                    className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 border-b border-mbz-line py-4 hover:bg-mbz-surface md:grid-cols-[180px_1fr_130px_150px] md:px-0"
                  >
                    <span className="font-display text-2xl font-bold leading-none tracking-wide text-mbz-ink">
                      {part.partNumber}
                    </span>
                    <span className="order-3 col-span-2 text-base text-mbz-ink md:order-none md:col-span-1">
                      {part.name}
                      {note ? <span className="block text-sm text-mbz-muted">{note}</span> : null}
                    </span>
                    <span className="order-2 justify-self-end text-sm text-mbz-muted md:order-none md:justify-self-start">
                      {part.category}
                    </span>
                    <a
                      className="btn-line order-4 col-span-2 mt-2 !px-4 !py-2 text-[15px] md:order-none md:col-span-1 md:mt-0 md:justify-self-end"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={waLink(
                        `Hello MBZ TRADING, please quote Toyota part ${part.partNumber}. Please share price, availability and origin.`
                      )}
                      aria-label={`Get a quote for ${part.partNumber}`}
                    >
                      <MessageCircle size={16} aria-hidden="true" /> Get quote
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="mt-3 border-t-2 border-mbz-ink bg-mbz-surface p-8">
            <p className="text-xl font-semibold text-mbz-ink">
              {query ? `No part matches “${query}”.` : 'No parts in this category.'}
            </p>
            <p className="mt-2 max-w-[55ch]">
              The catalogue is only part of what we can supply. Send us the part number and we will source it.
            </p>
            <a
              href={waLink(`Hello MBZ TRADING, please quote Toyota part ${query || '(part number)'}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red mt-5"
            >
              Ask about this part
            </a>
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-8 flex items-center justify-between gap-3" aria-label="Catalogue pages">
            <button
              type="button"
              disabled={current === 1}
              onClick={() => goTo(current - 1)}
              className="btn-line !px-4 !py-2 disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronLeft size={18} aria-hidden="true" /> Previous
            </button>
            <span className="text-base font-semibold text-mbz-ink">
              Page {current} of {totalPages}
            </span>
            <button
              type="button"
              disabled={current === totalPages}
              onClick={() => goTo(current + 1)}
              className="btn-line !px-4 !py-2 disabled:pointer-events-none disabled:opacity-35"
            >
              Next <ChevronRight size={18} aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
