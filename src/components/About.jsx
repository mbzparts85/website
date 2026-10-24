import { site } from '../siteConfig.js';

const ranges = [
  ['Body parts', 'Bumpers, bonnets, fenders, doors and exterior components.'],
  ['Electrical', 'Sensors, switches, lighting, wiring and electrical assemblies.'],
  ['Suspension', 'Shock absorbers, control arms, bushes and ball joints.'],
  ['Engine', 'Mechanical, cooling, gaskets, belts and related components.'],
];

export default function About() {
  return (
    <section id="about" className="border-t border-mbz-line bg-white py-16 lg:py-24">
      <div className="mbz-container grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="mbz-h2">{site.aboutHeading}</h2>
          <p className="mt-6 max-w-[58ch] text-lg">
            <strong className="text-mbz-ink">{site.company}</strong> {site.aboutIntro}
          </p>
          <p className="mt-4 max-w-[58ch] text-lg">
            We import automotive spare parts from established markets and support wholesale buyers with
            dependable sourcing, pre-orders and bulk supply. We do not sell to walk-in retail customers.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">What we supply</h3>
          <dl className="mt-4 border-t-2 border-mbz-ink">
            {ranges.map(([title, copy]) => (
              <div key={title} className="grid gap-1 border-b border-mbz-line py-4 sm:grid-cols-[150px_1fr] sm:gap-6">
                <dt className="font-semibold text-mbz-ink">{title}</dt>
                <dd>{copy}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
