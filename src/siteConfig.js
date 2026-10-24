import { catalogParts } from './data/products.js';
import { categoryOrder, tidyParts } from './data/tidy.js';

const fallback = {
  company: 'MBZ TRADING',
  subtitle: 'AUTO SPARE PARTS',
  whatsapp: '923335173910',
  whatsappDisplay: '+92-333-5173910',
  email: 'mbztrading0086@gmail.com',
  location: 'Pakistan',
  heroHeading: 'Your reliable partner for genuine parts',
  heroText:
    'International sourcing and wholesale supply of automotive spare parts for business customers.',
  aboutHeading: 'MBZ TRADING — auto spare parts importer',
  aboutIntro:
    'is an international auto spare parts importing and wholesale trading company specializing in sourcing and supplying automotive components to businesses worldwide.',
};

const boot = typeof window !== 'undefined' ? window.MBZ || {} : {};

const fallbackParts = tidyParts(catalogParts);
const fallbackCategories = categoryOrder.filter((c) => fallbackParts.some((p) => p.category === c));

export const site = {
  ...fallback,
  ...boot,
  parts: Array.isArray(boot.parts) && boot.parts.length ? boot.parts : fallbackParts,
  categories:
    Array.isArray(boot.categories) && boot.categories.length ? boot.categories : fallbackCategories,
};

export function waLink(text) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
