import fs from 'fs';

const src = fs.readFileSync('script.js', 'utf8');
const match = src.match(/const products=(\[[\s\S]*?\]);/);
if (!match) throw new Error('Could not find products array');
const products = Function(`return ${match[1]}`)();
const out = products.map(([partNumber, name, category, application]) => ({
  partNumber,
  name,
  category,
  application,
}));
fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync(
  'src/data/products.js',
  `export const catalogParts = ${JSON.stringify(out, null, 2)};\nexport const categories = [...new Set(catalogParts.map((p) => p.category))].sort();\n`
);
console.log(`wrote ${out.length} parts`);
