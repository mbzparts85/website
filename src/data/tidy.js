// Display-only cleanup for the catalogue. src/data/products.js stays exactly as exported.

const rules = [
  ['Brake', /brake/i],
  ['Filters', /filter|air cleaner/i],
  ['Electrical', /lamp|switch|transponder/i],
  ['Bumper & grille', /bumper|grille|radiator (support|air guide)/i],
  [
    'Body & glass',
    /fender|hood|apron|door|glass|windshield|mirror|emblem|moulding|roof|reflector|protector|step plate|wheel arch|liner|panel/i,
  ],
  ['Suspension', /tie rod|steering gear|rack end|bearing|shock|control arm|bush/i],
  ['Cooling', /radiator|coolent|coolant|atf|fan cooling|compressor|hose|reserve tank/i],
  ['Engine', /gasket|seal|mount|insulator|pump|belt|tensioner|fuel|clutch|engine/i],
];

export const categoryOrder = [
  'Bumper & grille',
  'Body & glass',
  'Engine',
  'Cooling',
  'Electrical',
  'Suspension',
  'Brake',
  'Filters',
  'Other',
];

export function tidyCategory(name, fallback) {
  const hit = rules.find(([, re]) => re.test(name));
  return hit ? hit[0] : fallback;
}

export function tidyName(raw) {
  let s = String(raw)
    .replace(/COOLENT/gi, 'coolant')
    .replace(/\s*-{2,}\s*/g, ' ')
    .replace(/\s+-(?=\w)/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  if (s === s.toUpperCase()) s = s.toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function tidyParts(parts) {
  return parts.map((p) => ({
    ...p,
    name: tidyName(p.name),
    category: tidyCategory(p.name, p.category),
  }));
}
