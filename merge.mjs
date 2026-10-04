// Joins the verified category files into the single dataset build.mjs reads.
// Usage: node merge.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const PARTS = ['face', 'procedure', 'hair-baseline', 'skin', 'compound'];
const CATEGORY_ORDER = ['face', 'procedure', 'hair', 'skin', 'compound', 'baseline'];
const REVIEWED = '2026-10-03';

const parts = PARTS.map((p) => JSON.parse(readFileSync(`data/verified/${p}.json`, 'utf8')));

const practices = parts
  .flatMap((d) => d.practices)
  .sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category));

const ids = new Set();
for (const p of practices) {
  if (ids.has(p.id)) throw new Error(`Duplicate id: ${p.id}`);
  ids.add(p.id);
}

const out = {
  generated: REVIEWED,
  last_reviewed: REVIEWED,
  practices,
  proposed: parts.flatMap((d) => d.proposed ?? []),
};

writeFileSync('data/practices.verified.json', JSON.stringify(out, null, 2) + '\n');
console.log(`${practices.length} practices, ${out.proposed.length} proposed -> data/practices.verified.json`);
