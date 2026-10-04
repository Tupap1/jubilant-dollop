#!/usr/bin/env node
// Looksmaxxing Evidence × Risk Map — static build.
// Node 18+, zero dependencies.
//
//   node build.mjs [path/to/practices.json]
//
// Input defaults to data/practices.verified.json. Output always goes to docs/:
//   docs/index.html     the page (all content in the HTML, inline CSS, < 6 KB inline JS)
//   docs/practices.json byte-for-byte copy of the input

import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const INPUT = process.argv[2] ? resolve(process.argv[2]) : join(ROOT, 'data', 'practices.verified.json');
const OUT_DIR = join(ROOT, 'docs');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const SITE = 'https://looksmaxxing.guide';
const CANONICAL = `${SITE}/en/looks/looksmaxxing-evidence-risk-map/`;
// Where this prototype is hosted (GitHub Pages). Used only for absolute URLs in
// JSON-LD and og:url. Override with PAGE_URL=https://... node build.mjs
const PAGE_URL = (process.env.PAGE_URL || 'https://tupap1.github.io/jubilant-dollop/').replace(/\/?$/, '/');
const OG_IMAGE = process.env.OG_IMAGE || null; // absolute URL; og:image is emitted only when set
const JS_BUDGET_BYTES = 6 * 1024;
const EXPECTED_COUNT = 28;

const TITLE = 'Looksmaxxing Evidence × Risk Map — What Works, What Hurts';
const H1 = 'Looksmaxxing Evidence × Risk Map';

// ---------------------------------------------------------------------------
// Rubrics — the one place rubric text lives (wording copied from Prompt 1).
// Levels are indexed by score, 0..4.
// ---------------------------------------------------------------------------
const RUBRIC = {
  evidence: {
    title: 'Evidence',
    subtitle: 'graded against the claim',
    levels: [
      { label: 'None', text: 'No evidence found, or the evidence contradicts the claim.' },
      { label: 'Anecdotal', text: 'Case reports, mechanism-only arguments, testimonials.' },
      { label: 'Limited', text: 'Observational or uncontrolled studies, small samples, or evidence only in a different population or indication.' },
      { label: 'Moderate', text: 'At least one RCT, or consistent controlled studies.' },
      { label: 'Strong', text: 'Meta-analysis or multiple RCTs in a comparable population, or regulatory approval for this exact indication.' },
    ],
  },
  risk: {
    title: 'Risk',
    as_practiced: 'how the community typically does it — self-administered, unregulated supply, no monitoring. This is the value that gets plotted.',
    supervised: 'done by a licensed clinician with a regulated product. null if no legitimate supervised version exists.',
    levels: [
      { label: 'Negligible', text: 'No meaningful harm expected.' },
      { label: 'Low', text: 'Minor, reversible, well-characterized side effects.' },
      { label: 'Moderate', text: 'Side effects that need monitoring, prescription-only, or a real chance of an unwanted permanent result.' },
      { label: 'High', text: 'Serious or irreversible harm is plausible, or the supply is unregulated with documented contamination or mislabeling.' },
      { label: 'Severe', text: 'Documented deaths or permanent disability at typical use.' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Design tokens (copied from the live site)
// ---------------------------------------------------------------------------
const C = { bg: '#0F0F12', s1: '#1F1D2B', s2: '#2A2838', text: '#F0EDE8', muted: '#9CA3AF', gold: '#D19C14' };

// Verdicts, in mobile display order. `color` is the site's status token;
// text uses a lightness-adjusted `fg` computed below when the token fails AA.
const VERDICTS = [
  { key: 'avoid', label: 'Avoid', symbol: '×', color: '#EF4444', rule: 'Risk 4, whatever the evidence.', gloss: 'Severe harm at typical use.' },
  { key: 'notworth', label: 'Not worth the risk', symbol: '!', color: '#F59E0B', rule: 'Evidence 0–2, risk 2–3.', gloss: 'Little or no proof, real downside.' },
  { key: 'clinician', label: 'Works — clinician first', symbol: 'Rx', color: '#3B82F6', rule: 'Evidence 3–4, risk 2–3.', gloss: 'Real evidence, real risk if you go it alone.' },
  { key: 'lowlow', label: 'Low harm, low payoff', symbol: '–', color: '#9CA3AF', rule: 'Evidence 0–2, risk 0–1.', gloss: 'Unlikely to hurt, unlikely to help much.' },
  { key: 'worth', label: 'Worth doing', symbol: '✓', color: '#10B981', rule: 'Evidence 3–4, risk 0–1.', gloss: 'The evidence holds up and the downside is small.' },
];
const VBY = Object.fromEntries(VERDICTS.map((v) => [v.key, v]));

// Rules in order — "Avoid" goes first so DNP-type entries can never land in "clinician first".
function verdictOf(evidence, risk) {
  if (risk === 4) return 'avoid';
  if (evidence >= 3 && risk <= 1) return 'worth';
  if (evidence >= 3 && risk >= 2) return 'clinician';
  if (evidence <= 2 && risk <= 1) return 'lowlow';
  return 'notworth'; // evidence <= 2 && risk >= 2
}

const CATEGORIES = [
  ['face', 'Face'], ['procedure', 'Procedure'], ['hair', 'Hair'],
  ['skin', 'Skin'], ['compound', 'Compound'], ['baseline', 'Baseline'],
];
const CATEGORY_LABEL = Object.fromEntries(CATEGORIES);
const MARKETS = [['US', 'United States'], ['UK', 'United Kingdom'], ['AU', 'Australia'], ['CA', 'Canada']];
const SOURCE_TYPES = {
  regulator: 'Regulator', 'systematic-review': 'Systematic review', rct: 'RCT', guideline: 'Guideline',
  cohort: 'Cohort study', 'case-report': 'Case report', review: 'Review',
};
const GUIDE_PATH = /^\/en\/[a-z0-9\-/]+\/$/;
// Ids used by the page itself; a practice may not take one.
const RESERVED_IDS = new Set(['main', 'sec-read', 'sec-map', 'sec-practices', 'filters', 'fstatus', 'top']);

// ---------------------------------------------------------------------------
// Colour maths (WCAG 2.x relative luminance)
// ---------------------------------------------------------------------------
const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgb2hex = (c) => '#' + c.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('').toUpperCase();
const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = (h) => { const [r, g, b] = hex2rgb(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const mix = (a, b, t) => { const A = hex2rgb(a), B = hex2rgb(b); return rgb2hex(A.map((v, i) => v + (B[i] - v) * t)); };

function rgb2hsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0, s = 0; const l = (mx + mn) / 2;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (mx === r) h = ((g - b) / d) % 6; else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  return [h, s, l];
}
function hsl2rgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}
// Keep hue and saturation; raise lightness until `hex` reaches `min` against every background.
function liftToRatio(hex, bgs, min) {
  if (bgs.every((bg) => ratio(hex, bg) >= min)) return hex;
  const [h, s, l] = rgb2hsl(hex2rgb(hex));
  for (let i = 1; i <= 100; i++) {
    const c = rgb2hex(hsl2rgb(h, s, Math.min(1, l + i / 100)));
    if (bgs.every((bg) => ratio(c, bg) >= min)) return c;
  }
  throw new Error(`Cannot reach ${min}:1 for ${hex}`);
}

// Per-verdict derived colours: tint (cell/badge background), edge (cell border), fg (text).
for (const v of VERDICTS) {
  v.tint = mix(C.s1, v.color, 0.2);
  v.edge = mix(C.s1, v.color, 0.45);
  v.fg = liftToRatio(v.color, [C.bg, C.s1, C.s2, v.tint], 4.5);
}

// Every text/background pair used in the CSS, checked at build time.
function checkContrast() {
  const pairs = [];
  for (const bg of [C.bg, C.s1, C.s2]) pairs.push([`text on ${bg}`, C.text, bg], [`muted on ${bg}`, C.muted, bg], [`gold on ${bg}`, C.gold, bg]);
  pairs.push(['bg text on gold', C.bg, C.gold]);
  for (const v of VERDICTS) for (const bg of [C.bg, C.s1, C.s2, v.tint]) pairs.push([`${v.key} fg on ${bg}`, v.fg, bg]);
  for (const v of VERDICTS) pairs.push([`text on ${v.key} tint`, C.text, v.tint]);
  const rows = pairs.map(([name, fg, bg]) => ({ name, fg, bg, r: ratio(fg, bg) }));
  const bad = rows.filter((x) => x.r < 4.5);
  const min = rows.reduce((a, b) => (b.r < a.r ? b : a));
  return { rows, bad, min };
}

// ---------------------------------------------------------------------------
// Load + validate
// ---------------------------------------------------------------------------
function fail(lines) {
  console.error('\nBuild failed:\n' + lines.map((l) => '  - ' + l).join('\n'));
  process.exit(1);
}

let raw, data;
try { raw = readFileSync(INPUT, 'utf8'); } catch (e) { fail([`Cannot read ${INPUT}: ${e.message}`]); }
try { data = JSON.parse(raw); } catch (e) { fail([`${INPUT} is not valid JSON: ${e.message}`]); }

const errors = [], warnings = [];
const isInt04 = (x) => Number.isInteger(x) && x >= 0 && x <= 4;
const isStr = (x) => typeof x === 'string' && x.trim() !== '';

if (!data || !Array.isArray(data.practices) || data.practices.length === 0) fail(['"practices" must be a non-empty array']);
const REVIEWED = data.last_reviewed ?? data.reviewed ?? data.generated;
if (!/^\d{4}-\d{2}-\d{2}$/.test(REVIEWED || '')) errors.push('missing or malformed "generated" date (expected YYYY-MM-DD)');
if (data.practices.length !== EXPECTED_COUNT) warnings.push(`expected ${EXPECTED_COUNT} practices, found ${data.practices.length}`);

const seen = new Set();
data.practices.forEach((p, i) => {
  const at = `practices[${i}]${p && p.id ? ` (${p.id})` : ''}`;
  if (!p || typeof p !== 'object') { errors.push(`${at}: not an object`); return; }
  if (!isStr(p.id) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id)) errors.push(`${at}: id must be kebab-case`);
  else if (seen.has(p.id)) errors.push(`${at}: duplicate id`);
  else if (RESERVED_IDS.has(p.id)) errors.push(`${at}: id "${p.id}" is reserved by the page`);
  else seen.add(p.id);
  if (!isStr(p.name)) errors.push(`${at}: name missing`);
  if (!CATEGORY_LABEL[p.category]) errors.push(`${at}: category "${p.category}" is not one of ${CATEGORIES.map((c) => c[0]).join(', ')}`);
  if (!isStr(p.claim)) errors.push(`${at}: claim missing`);
  if (!isInt04(p.evidence)) errors.push(`${at}: evidence must be an integer 0-4`);
  if (!isInt04(p.risk_as_practiced)) errors.push(`${at}: risk_as_practiced must be an integer 0-4`);
  if (p.risk_supervised !== null && p.risk_supervised !== undefined && !isInt04(p.risk_supervised)) errors.push(`${at}: risk_supervised must be null or an integer 0-4`);
  for (const k of ['evidence_rationale', 'risk_rationale']) if (!isStr(p[k])) errors.push(`${at}: ${k} missing`);
  if (!Array.isArray(p.key_harms)) errors.push(`${at}: key_harms must be an array`);
  else if (p.key_harms.length > 4) warnings.push(`${at}: more than 4 key_harms`);
  if (p.safer_alternative != null && !isStr(p.safer_alternative)) errors.push(`${at}: safer_alternative must be a string or null`);
  if (isInt04(p.risk_as_practiced) && p.risk_as_practiced >= 2 && !isStr(p.safer_alternative)) warnings.push(`${at}: risk >= 2 but no safer_alternative`);
  if (p.legal_status != null && typeof p.legal_status !== 'object') errors.push(`${at}: legal_status must be an object`);
  if (!Array.isArray(p.sources)) errors.push(`${at}: sources must be an array (may be empty)`);
  else p.sources.forEach((s, j) => {
    if (!s || !isStr(s.title)) errors.push(`${at}: sources[${j}].title missing`);
    if (!s || !/^https?:\/\//i.test(s.url || '')) errors.push(`${at}: sources[${j}].url must start with http(s)://`);
    if (s && s.type && !SOURCE_TYPES[s.type]) warnings.push(`${at}: sources[${j}].type "${s.type}" is not a known type`);
  });
  if (p.internal_link != null) {
    if (typeof p.internal_link !== 'string' || !p.internal_link.startsWith('/')) errors.push(`${at}: internal_link must be a path starting with "/" or null`);
    else if (!GUIDE_PATH.test(p.internal_link)) warnings.push(`${at}: internal_link "${p.internal_link}" does not look like /en/.../`);
  }
});
if (errors.length) fail(errors);
warnings.forEach((w) => console.warn('warning: ' + w));

const contrast = checkContrast();
if (contrast.bad.length) fail(contrast.bad.map((b) => `contrast ${b.r.toFixed(2)}:1 < 4.5 for ${b.name} (${b.fg} on ${b.bg})`));

// ---------------------------------------------------------------------------
// Derived data
// ---------------------------------------------------------------------------
const practices = data.practices.map((p) => ({ ...p, verdict: verdictOf(p.evidence, p.risk_as_practiced) }));
const N = practices.length;
const counts = Object.fromEntries(VERDICTS.map((v) => [v.key, practices.filter((p) => p.verdict === v.key).length]));

// ---------------------------------------------------------------------------
// HTML helpers
// ---------------------------------------------------------------------------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const jsonLd = (o) => JSON.stringify(o).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
const lc = (s) => s.toLowerCase();
const evLabel = (n) => RUBRIC.evidence.levels[n].label;
const rkLabel = (n) => RUBRIC.risk.levels[n].label;
const sym = (v) => `<span class="sym" aria-hidden="true">${esc(v.symbol)}</span>`;

// Meta description: <= 155 chars, from the data, naming three practices.
function describe() {
  const first = (k) => practices.find((p) => p.verdict === k);
  const diverse = ['worth', 'clinician', 'avoid', 'notworth', 'lowlow'].map(first).filter(Boolean).slice(0, 3);
  const shortest = [...practices].sort((a, b) => a.name.length - b.name.length).slice(0, 3);
  const triples = [diverse, shortest].filter((t) => t.length === 3);
  const templates = [
    ([a, b, c]) => `What works, what hurts: ${N} looksmaxxing practices graded on evidence and risk, including ${a}, ${b} and ${c}.`,
    ([a, b, c]) => `${N} practices graded on evidence and risk: ${a}, ${b} and ${c}.`,
    ([a, b, c]) => `${a}, ${b}, ${c}: ${N} practices graded on evidence vs risk.`,
  ];
  for (const t of triples) for (const tpl of templates) {
    const s = tpl(t.map((p) => p.name));
    if (s.length <= 155) return s;
  }
  const s = templates[2](shortest.map((p) => p.name));
  warnings.push(`meta description is ${s.length} chars (> 155): practice names are too long`);
  console.warn('warning: ' + warnings[warnings.length - 1]);
  return s;
}
const DESCRIPTION = describe();

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------
function renderRead() {
  const ev = RUBRIC.evidence, rk = RUBRIC.risk;
  const dl = (levels) => `<dl class="rub">${levels.map((l, i) => `<dt><span class="n">${i}</span> ${esc(l.label)}</dt><dd>${esc(l.text)}</dd>`).join('')}</dl>`;
  const supervised = rk.supervised.replace('. null if', '. Not rated if');
  return `<section id="sec-read" aria-labelledby="h-read">
  <h2 id="h-read">How to read this</h2>
  <p class="lead">Every practice is graded twice. Evidence is scored against the specific outcome the community promises for it, never a weaker or kinder version. Risk is scored for how people actually do it. Each practice sits on the grid at its evidence score (left to right) and its risk (bottom to top).</p>
  <div class="rubrics">
    <div class="panel">
      <p class="dl-title">${esc(ev.title)} <span class="sub">${esc(ev.subtitle)}</span></p>
      ${dl(ev.levels)}
    </div>
    <div class="panel">
      <p class="dl-title">${esc(rk.title)} <span class="sub">0 to 4</span></p>
      <p class="rk-note"><strong>Risk as practiced:</strong> ${esc(rk.as_practiced)}</p>
      <p class="rk-note"><strong>Risk, supervised:</strong> ${esc(supervised)}</p>
      ${dl(rk.levels)}
    </div>
  </div>
</section>`;
}

function renderMap() {
  // bucket[risk][evidence]
  const bucket = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => []));
  for (const p of practices) bucket[p.risk_as_practiced][p.evidence].push(p);

  const chip = (p) => {
    const v = VBY[p.verdict];
    return `<li data-cat="${esc(p.category)}"><a class="chip" href="#${esc(p.id)}">${sym(v)}<span class="nm">${esc(p.name)}</span><span class="sr">, verdict: ${esc(v.label)}</span></a></li>`;
  };

  let cells = '';
  for (let r = 4; r >= 0; r--) {
    cells += `<div class="yl" aria-hidden="true"><span class="n">${r}</span> ${esc(rkLabel(r))}</div>`;
    for (let e = 0; e <= 4; e++) {
      const list = bucket[r][e];
      const v = VBY[verdictOf(e, r)];
      const prefix = `Evidence ${lc(evLabel(e))}, risk ${lc(rkLabel(r))}`;
      cells += `<div class="cell v-${v.key}" role="group" data-p="${esc(prefix)}" aria-label="${esc(prefix)}: ${plural(list.length, 'practice')}">${list.length ? `<ul class="chips">${list.map(chip).join('')}</ul>` : ''}</div>`;
    }
  }
  let xl = '<div aria-hidden="true"></div>';
  for (let e = 0; e <= 4; e++) xl += `<div class="xl" aria-hidden="true"><span class="n">${e}</span> ${esc(evLabel(e))}</div>`;

  const legend = VERDICTS.map((v) => `<li class="v-${v.key}">${sym(v)}<span><strong>${esc(v.label)}</strong> <span class="rule">${esc(v.rule)}</span></span></li>`).join('');

  // Mobile: list grouped by verdict.
  const groups = VERDICTS.map((v) => {
    const list = practices.filter((p) => p.verdict === v.key);
    if (!list.length) return '';
    const items = list.map((p) => `<li data-cat="${esc(p.category)}"><a href="#${esc(p.id)}"><span class="nm">${esc(p.name)}</span><span class="co">Evidence: ${esc(evLabel(p.evidence))} · Risk: ${esc(rkLabel(p.risk_as_practiced))}</span></a></li>`).join('');
    return `<div class="vgroup v-${v.key}" role="group" aria-labelledby="vg-${v.key}">
      <p class="vg-title" id="vg-${v.key}">${sym(v)}<span>${esc(v.label)}</span> <span class="vg-count">(${list.length})</span></p>
      <p class="vg-rule">${esc(v.rule)} ${esc(v.gloss)}</p>
      <ul>${items}</ul>
    </div>`;
  }).join('');

  const filters = `<div class="filters" id="filters" role="group" aria-label="Filter by category" hidden>
    <button type="button" data-cat="all" aria-pressed="true">All (${N})</button>${CATEGORIES.map(([k, label]) => {
      const n = practices.filter((p) => p.category === k).length;
      return n ? `<button type="button" data-cat="${k}" aria-pressed="false">${esc(label)} (${n})</button>` : '';
    }).join('')}
  </div>
  <p class="sr" id="fstatus" role="status" aria-live="polite"></p>`;

  return `<section id="sec-map" aria-labelledby="h-map">
  <h2 id="h-map">The map</h2>
  ${filters}
  <div class="gridwrap">
    <ul class="legend" aria-label="Verdict key">${legend}</ul>
    <p class="axis ax-y"><span aria-hidden="true">↑ </span>Risk as practiced: how much harm, the way people actually do it</p>
    <div class="map">${cells}${xl}</div>
    <p class="axis ax-x">Evidence for the claim: how well it holds up <span aria-hidden="true">→</span></p>
  </div>
  <div class="vlist">${groups}</div>
</section>`;
}

function renderEntry(p) {
  const v = VBY[p.verdict];
  const sup = p.risk_supervised == null
    ? 'No legitimate supervised version exists'
    : `${rkLabel(p.risk_supervised)} (${p.risk_supervised} of 4)`;
  const harms = p.key_harms.length ? `<div class="block"><p class="label">Key harms</p><ul class="harms">${p.key_harms.map((h) => `<li>${esc(h)}</li>`).join('')}</ul></div>` : '';
  const safer = isStr(p.safer_alternative) ? `<div class="safer"><p class="label">Safer alternative</p><p>${esc(p.safer_alternative)}</p></div>` : '';
  const ls = p.legal_status || {};
  const markets = MARKETS.filter(([k]) => isStr(ls[k]));
  const legal = markets.length ? `<div class="block"><p class="label">Legal status</p><dl class="legal">${markets.map(([k, name]) => `<dt>${esc(name)}</dt><dd>${esc(ls[k])}</dd>`).join('')}</dl></div>` : '';
  const sources = p.sources.length
    ? `<ol class="sources">${p.sources.map((s) => {
        const meta = [s.publisher, s.year > 0 ? s.year : null].filter(Boolean).map(esc).join(', ');
        return `<li><span class="badge">${esc(SOURCE_TYPES[s.type] || s.type || 'Source')}</span> <a href="${esc(s.url)}" rel="noopener noreferrer">${esc(s.title)}</a>${meta ? `<span class="src-meta"> — ${meta}</span>` : ''}${s.verified === false ? ' <span class="unv">(not independently verified)</span>' : ''}${isStr(s.supports) ? `<span class="supports">Supports: ${esc(s.supports)}</span>` : ''}</li>`;
      }).join('')}</ol>`
    : '<p class="nosrc">No sources listed for this entry yet.</p>';
  const guide = isStr(p.internal_link) ? `<p><a class="guide" href="${esc(SITE + p.internal_link)}">Read the full guide <span aria-hidden="true">→</span></a></p>` : '';

  return `<article id="${esc(p.id)}" class="entry v-${v.key}" data-cat="${esc(p.category)}" tabindex="-1">
  <p class="eyebrow">${esc(CATEGORY_LABEL[p.category])}</p>
  <h3>${esc(p.name)}</h3>
  <p class="claim"><strong>The claim:</strong> ${esc(p.claim)}</p>
  <dl class="scores">
    <div><dt>Evidence</dt><dd>${esc(evLabel(p.evidence))} (${p.evidence} of 4)</dd></div>
    <div><dt>Risk as practiced</dt><dd>${esc(rkLabel(p.risk_as_practiced))} (${p.risk_as_practiced} of 4)</dd></div>
    <div><dt>Risk, supervised</dt><dd>${esc(sup)}</dd></div>
    <div><dt>Verdict</dt><dd><span class="vb">${sym(v)}${esc(v.label)}</span></dd></div>
  </dl>
  <div class="block"><p class="label">Why this evidence score</p><p>${esc(p.evidence_rationale)}</p></div>
  <div class="block"><p class="label">Why this risk score</p><p>${esc(p.risk_rationale)}</p></div>
  ${harms}
  ${safer}
  ${legal}
  <div class="block"><p class="label">Sources</p>${sources}</div>
  ${guide}
</article>`;
}

function renderFooter() {
  return `<footer class="foot wrap">
  <ul class="foot-links">
    <li><a href="${SITE}/en/legal/medical-disclaimer/">Medical disclaimer</a></li>
    <li><a href="${SITE}/en/editorial-standards/">Editorial standards</a></li>
    <li><a href="practices.json">Data (practices.json)</a></li>
  </ul>
  <p>Data last reviewed: <time datetime="${esc(REVIEWED)}">${esc(REVIEWED)}</time></p>
  <p>Unofficial prototype built for looksmaxxing.guide. Not medical advice.</p>
</footer>`;
}

// ---------------------------------------------------------------------------
// CSS
// ---------------------------------------------------------------------------
const verdictVars = VERDICTS.map((v) => `.v-${v.key}{--vc:${v.color};--vf:${v.fg};--vt:${v.tint};--ve:${v.edge}}`).join('\n');
const SG = '"Space Grotesk",system-ui,-apple-system,"Segoe UI",sans-serif';

const CSS = `
:root{color-scheme:dark;--bg:${C.bg};--s1:${C.s1};--s2:${C.s2};--text:${C.text};--muted:${C.muted};--gold:${C.gold}}
${verdictVars}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
@media (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}
body{margin:0;background:var(--bg);color:var(--text);font:400 1.125rem/1.55 "Dosis",system-ui,-apple-system,"Segoe UI",sans-serif;overflow-wrap:break-word}
[hidden]{display:none!important}
h1,h2,h3{font-family:${SG};font-weight:700;line-height:1.15;margin:0;overflow-wrap:anywhere}
p{margin:0 0 .75rem}
a{color:var(--gold)}
:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.wrap{max-width:72rem;margin:0 auto;padding:0 clamp(1rem,4vw,2rem)}
.top{padding-top:clamp(2rem,6vw,4rem);padding-bottom:1.5rem}
h1{font-size:clamp(1.9rem,6vw,3.25rem);letter-spacing:-.02em}
.deck{font-size:clamp(1.15rem,3vw,1.5rem);color:var(--muted);max-width:44rem;margin:.75rem 0 0}
main>section{margin-bottom:clamp(2.5rem,6vw,4rem)}
h2{font-size:clamp(1.4rem,3.5vw,1.9rem);margin-bottom:1rem}
.n{font-weight:700;color:var(--text)}
.lead{max-width:46rem}

/* How to read */
.rubrics{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
@media (min-width:60rem){.rubrics{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}}
.panel{background:var(--s1);border:1px solid var(--s2);border-radius:.5rem;padding:1rem 1.25rem}
.dl-title{font:700 1.2rem/1.2 ${SG};margin:0 0 .6rem}
.sub{font:400 1rem "Dosis",system-ui,sans-serif;color:var(--muted)}
.rk-note{font-size:1rem;margin:0 0 .5rem}
.rub{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:.35rem 1rem;margin:.75rem 0 0;font-size:1rem}
.rub dt{font:600 1rem/1.4 ${SG}}
.rub dd{margin:0}
@media (max-width:30rem){.rub{grid-template-columns:minmax(0,1fr);gap:0}.rub dd{margin-bottom:.6rem}}

/* Filter */
.filters{display:flex;flex-wrap:wrap;gap:.5rem;margin:0 0 1.25rem}
.filters button{font:600 1rem/1 ${SG};min-height:2.5rem;padding:.4rem .9rem;background:var(--s1);color:var(--text);border:1px solid var(--muted);border-radius:.375rem;cursor:pointer}
.filters button[aria-pressed="true"]{background:var(--gold);color:var(--bg);border-color:var(--gold)}

/* Grid (desktop) */
.legend{list-style:none;margin:0 0 1.25rem;padding:0;display:flex;flex-wrap:wrap;gap:.5rem 1.5rem;font-size:1rem}
.legend li{display:flex;align-items:baseline;gap:.5rem}
.legend .rule{color:var(--muted)}
.sym{flex:none;display:inline-block;min-width:1.5rem;text-align:center;font:700 1rem/1 ${SG};color:var(--vf)}
.axis{font:600 1rem/1.3 ${SG};margin:0 0 .5rem}
.ax-x{margin:.5rem 0 0;text-align:center}
.map{display:grid;grid-template-columns:5.25rem repeat(5,minmax(0,1fr));gap:.375rem}
.yl,.xl{font-size:.9375rem;line-height:1.2;color:var(--muted)}
.yl{align-self:center;text-align:right;padding-right:.4rem}
.xl{text-align:center;padding-top:.25rem}
.cell{min-height:6rem;padding:.4rem;background:var(--vt);border:1px solid var(--ve);border-radius:.5rem;min-width:0}
.chips{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:minmax(0,1fr);gap:.3rem}
.chip{display:flex;align-items:baseline;gap:.3rem;padding:.3rem .45rem;background:var(--bg);border:1px solid var(--vc);border-radius:.375rem;color:var(--text);text-decoration:none;font-size:.9375rem;line-height:1.2;overflow-wrap:anywhere}
.chip:hover .nm{text-decoration:underline}
.chip .sym{min-width:1.1rem}

/* Mobile list */
.vlist{display:none}
.vgroup{margin:0 0 1.5rem;border-left:4px solid var(--vc);padding-left:.9rem}
.vg-title{display:flex;align-items:baseline;gap:.5rem;font:700 1.25rem/1.2 ${SG};color:var(--vf);margin:0}
.vg-count{color:var(--muted);font-weight:400}
.vg-rule{color:var(--muted);font-size:1rem;margin:.15rem 0 .6rem}
.vlist ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:minmax(0,1fr);gap:.4rem}
.vlist a{display:block;min-height:2.75rem;padding:.55rem .75rem;background:var(--s1);border:1px solid var(--s2);border-radius:.375rem;color:var(--text);text-decoration:none;overflow-wrap:anywhere}
.vlist .co{display:block;color:var(--muted);font-size:.9375rem}
@media (max-width:640px){.gridwrap{display:none}.vlist{display:block}}

/* Entries */
.entry{background:var(--s1);border:1px solid var(--s2);border-left:4px solid var(--vc);border-radius:.5rem;padding:1.25rem 1.25rem .75rem;margin:0 0 1.25rem;max-width:52rem;scroll-margin-top:1rem}
.entry:target{background:var(--s2);outline:2px solid var(--gold);outline-offset:2px}
.entry:focus-visible{outline-width:3px}
.eyebrow{font:600 .875rem/1 ${SG};letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin:0 0 .4rem}
.entry h3{font-size:clamp(1.3rem,3.5vw,1.6rem);margin-bottom:.6rem}
.claim{margin-bottom:1rem}
.scores{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.6rem 1rem;margin:0 0 1.25rem;padding:.8rem 1rem;background:var(--bg);border-radius:.375rem}
@media (min-width:48rem){.scores{grid-template-columns:repeat(4,minmax(0,1fr))}}
.scores dt{font:600 .875rem/1.2 ${SG};letter-spacing:.04em;text-transform:uppercase;color:var(--muted);margin-bottom:.15rem}
.scores dd{margin:0;line-height:1.3}
.vb{display:inline-flex;align-items:baseline;gap:.35rem;padding:.2rem .55rem;background:var(--vt);border:1px solid var(--vc);border-radius:.375rem;font:700 1rem/1.3 ${SG};color:var(--vf)}
.vb .sym{min-width:1rem}
.block{margin:0 0 1.1rem}
.block p{margin:0 0 .4rem}
.label{font:600 .875rem/1.2 ${SG};letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin:0 0 .3rem}
.block .label{margin-bottom:.3rem}
.harms{margin:0;padding-left:1.25rem}
.safer{margin:0 0 1.25rem;padding:.9rem 1.1rem;background:var(--bg);border:2px solid var(--gold);border-radius:.5rem}
.safer .label{color:var(--gold)}
.safer p:last-child{margin:0;font-size:1.2rem;line-height:1.45}
.legal{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:.2rem 1rem;margin:0}
.legal dt{font-weight:700}
.legal dd{margin:0}
@media (max-width:30rem){.legal{grid-template-columns:minmax(0,1fr);gap:0}.legal dd{margin-bottom:.4rem}}
.sources{margin:.2rem 0 0;padding-left:1.4rem;display:grid;gap:.65rem}
.sources li{padding-left:.2rem;overflow-wrap:anywhere}
.badge{display:inline-block;padding:.15rem .45rem;margin-right:.15rem;background:var(--s2);color:var(--text);border:1px solid var(--muted);border-radius:.25rem;font:600 .75rem/1.2 ${SG};letter-spacing:.05em;text-transform:uppercase;vertical-align:.1em}
.entry:target .badge{background:var(--bg)}
.src-meta,.unv{color:var(--muted)}
.supports{display:block;color:var(--muted);font-size:1rem}
.nosrc{color:var(--muted);margin:0}
.guide{display:inline-block;margin:.25rem 0 .5rem;padding:.6rem 1.1rem;background:var(--gold);color:var(--bg);font:700 1rem/1.2 ${SG};text-decoration:none;border-radius:.375rem}
.guide:hover{text-decoration:underline}

/* Footer */
.foot{border-top:1px solid var(--s2);padding-top:1.5rem;padding-bottom:3rem;color:var(--muted);font-size:1rem}
.foot-links{list-style:none;margin:0 0 1rem;padding:0;display:flex;flex-wrap:wrap;gap:.5rem 1.5rem}
`.trim();

// ---------------------------------------------------------------------------
// Inline JS (progressive enhancement only): category filter + focus the entry on navigation.
// ---------------------------------------------------------------------------
const JS = `
(function(){
var d=document,bar=d.getElementById('filters');
if(!bar||!d.querySelectorAll||!bar.addEventListener)return;
function q(s,r){return(r||d).querySelectorAll(s)}
var items=q('[data-cat]'),cells=q('.cell'),groups=q('.vgroup'),btns=q('button',bar),
status=d.getElementById('fstatus'),total=q('article[data-cat]').length;
function apply(cat,name){
var shown=0;
items.forEach(function(el){
var on=cat==='all'||el.getAttribute('data-cat')===cat;
el.hidden=!on;
if(on&&el.tagName==='ARTICLE')shown++;
});
cells.forEach(function(c){
var k=q('li:not([hidden])',c).length;
c.setAttribute('aria-label',c.getAttribute('data-p')+': '+k+(k===1?' practice':' practices'));
});
groups.forEach(function(g){g.hidden=!q('li:not([hidden])',g).length});
btns.forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-cat')===cat))});
status.textContent=cat==='all'?'Showing all '+total+' practices.':'Showing '+shown+' of '+total+' practices in '+name+'.';
}
bar.addEventListener('click',function(e){
var b=e.target.closest&&e.target.closest('button');
if(b)apply(b.getAttribute('data-cat'),b.textContent.replace(/\\s*\\(\\d+\\)$/,''));
});
bar.hidden=false;
function focusEntry(){
var t;
try{t=d.getElementById(decodeURIComponent(location.hash.slice(1)))}catch(x){return}
if(t&&t.tagName==='ARTICLE'&&t.focus)t.focus({preventScroll:true});
}
addEventListener('hashchange',focusEntry);
focusEntry();
})();
`.trim();

const jsBytes = Buffer.byteLength(JS, 'utf8');
if (jsBytes >= JS_BUDGET_BYTES) fail([`inline JS is ${jsBytes} bytes; budget is < ${JS_BUDGET_BYTES}`]);

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------
const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: H1,
  description: DESCRIPTION,
  numberOfItems: N,
  itemListOrder: 'https://schema.org/ItemListUnordered',
  itemListElement: practices.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `${PAGE_URL}#${p.id}` })),
};
const dataset = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Looksmaxxing practices graded on evidence and risk',
  description: `${N} looksmaxxing practices, each graded 0-4 on how well the community's claim holds up and 0-4 on the risk of doing it as people typically do, with sources and safer alternatives. Unofficial prototype for looksmaxxing.guide.`,
  url: PAGE_URL,
  inLanguage: 'en',
  isAccessibleForFree: true,
  dateModified: REVIEWED,
  distribution: [{ '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: `${PAGE_URL}practices.json` }],
};

// ---------------------------------------------------------------------------
// Assemble
// ---------------------------------------------------------------------------
const FONTS = 'https://fonts.googleapis.com/css2?family=Dosis:wght@400;600;700&family=Space+Grotesk:wght@400;600;700&display=swap';
const deck = `${N} practices, graded on whether the claim holds up and what it costs you.`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(TITLE)}</title>
<meta name="description" content="${esc(DESCRIPTION)}">
<meta name="robots" content="noindex">
<!-- Intended canonical URL once this ships on the real site: ${CANONICAL} -->
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="${C.bg}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="looksmaxxing.guide (unofficial prototype)">
<meta property="og:title" content="${esc(TITLE)}">
<meta property="og:description" content="${esc(DESCRIPTION)}">
<meta property="og:url" content="${esc(PAGE_URL)}">${OG_IMAGE ? `\n<meta property="og:image" content="${esc(OG_IMAGE)}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(TITLE)}">
<meta name="twitter:description" content="${esc(DESCRIPTION)}">${OG_IMAGE ? `\n<meta name="twitter:image" content="${esc(OG_IMAGE)}">` : ''}
<link rel="icon" href="data:,">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>
${CSS}
</style>
<script type="application/ld+json">${jsonLd(itemList)}</script>
<script type="application/ld+json">${jsonLd(dataset)}</script>
</head>
<body>
<header class="top wrap">
  <h1>${esc(H1)}</h1>
  <p class="deck">${esc(deck)}</p>
</header>
<main class="wrap" id="main">
${renderRead()}
${renderMap()}
<section id="sec-practices" aria-labelledby="h-practices">
  <h2 id="h-practices">Every practice, in detail</h2>
${practices.map(renderEntry).join('\n')}
</section>
</main>
${renderFooter()}
<script>
${JS}
</script>
</body>
</html>
`;

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'index.html'), html);
copyFileSync(INPUT, join(OUT_DIR, 'practices.json'));

const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
console.log(`Built docs/index.html (${kb} KB; inline JS ${jsBytes} bytes) from ${relative(process.cwd(), INPUT) || INPUT}`);
console.log(`${N} practices — ` + VERDICTS.map((v) => `${v.label}: ${counts[v.key]}`).join(' | '));
console.log(`Contrast: ${contrast.rows.length} text/background pairs checked, lowest ${contrast.min.r.toFixed(2)}:1 (${contrast.min.name})`);
const lifted = VERDICTS.filter((v) => v.fg.toLowerCase() !== v.color.toLowerCase());
if (lifted.length) console.log('Text colours lightened for AA (same hue): ' + lifted.map((v) => `${v.key} ${v.color} -> ${v.fg}`).join(', '));
