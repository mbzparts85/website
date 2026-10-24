import { Globe2, PackageSearch, ShoppingBag, TimerReset } from 'lucide-react';

const services = [
  {
    icon: PackageSearch,
    title: 'Parts sourcing',
    copy: 'We source automotive parts by OEM number, model or a specific requirement.',
  },
  {
    icon: ShoppingBag,
    title: 'Wholesale and bulk',
    copy: 'B2B supply for wholesalers, distributors, importers and retailers.',
  },
  {
    icon: TimerReset,
    title: 'Pre-orders',
    copy: 'Demand-based sourcing when a part is not currently in stock.',
  },
  {
    icon: Globe2,
    title: 'International supply',
    copy: 'A supplier network across the UAE, Thailand, Indonesia and China.',
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-mbz-surface py-16 lg:py-24">
      <div className="mbz-container">
        <h2 className="mbz-h2 max-w-[18ch]">Sourcing and wholesale supply</h2>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, copy }) => (
            <article key={title} className="border-t-4 border-mbz-red pt-5">
              <Icon size={30} className="text-mbz-ink" aria-hidden="true" />
              <h3 className="mt-4 text-2xl font-bold">{title}</h3>
              <p className="mt-2 text-base">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
