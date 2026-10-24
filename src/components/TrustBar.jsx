const markets = [
  ['UAE', 'Gulf sourcing'],
  ['Thailand', 'OEM supply'],
  ['Indonesia', 'Volume parts'],
  ['China', 'Broad catalogue'],
];

export default function TrustBar() {
  return (
    <section className="border-y border-mbz-line bg-white" aria-label="Where we source from">
      <div className="mbz-container grid grid-cols-2 gap-y-6 py-7 md:grid-cols-[auto_repeat(4,1fr)] md:items-center md:gap-x-10">
        <p className="col-span-2 text-base font-semibold text-mbz-muted md:col-span-1">We source from</p>
        {markets.map(([country, note]) => (
          <div key={country}>
            <div className="font-display text-3xl font-bold leading-none text-mbz-ink">{country}</div>
            <div className="mt-1 text-sm text-mbz-muted">{note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
