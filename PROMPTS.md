# Looksmaxxing Evidence × Risk Map — Prompt Plan

A one-page tool for [looksmaxxing.guide](https://looksmaxxing.guide) that places 28 looksmaxxing practices on a grid: **how well the community's claim holds up** vs. **how much harm the practice does the way people actually do it**, with a safer alternative for every risky entry.

This file holds the prompts that build it, in the order they run, and the decisions behind them. The iteration log at the bottom is filled in while executing — real failures only.

**Status:** prompts written, not yet executed.

---

## Why this tool

- The site already has a self-rating quiz (`/en/looksmax-score/`). Another "rate yourself" tool would be a duplicate.
- Its recent editorial line is harm reduction — bonesmashing, the "pentastack" overdose, the Aqualyx livestream injection — but every article covers one practice at a time. Nothing lets a reader compare mewing vs. finasteride vs. SARMs on the same scale.
- Each practice maps to a real query ("does mewing work", "is bonesmashing dangerous", "are SARMs safe"), and each entry gets a deep-linkable anchor the existing articles can link into.

## Design decisions (made before prompting)

| # | Decision | Why |
|---|---|---|
| 1 | **Score the claim, not the practice.** Each entry states the specific outcome the community promises ("mewing reshapes adult jaw bone") and evidence is graded against that. | "Mewing = good tongue posture" is harmless and loosely supported. "Mewing changes your bone structure as an adult" has no evidence. Grading the charitable version flatters it. |
| 2 | **Risk is scored as practiced**, with a secondary "supervised" score. | Isotretinoin from a dermatologist with blood work is not isotretinoin bought online. The plotted score is what the reader is likely to actually do. |
| 3 | **Integer 0–4 rubric → 5×5 grid of cells, not a scatter plot.** | A scatter plot implies precision the rubric doesn't have. Cells are honest about it. |
| 4 | **Calibration anchors** (sunscreen, resistance training, sleep). | Without things that clearly work and are safe, the grid is a wall of red and the reader has nowhere to go. |
| 5 | **Every entry with risk ≥ 2 must have a safer alternative.** | Harm reduction means redirecting, not just warning. |
| 6 | **No doses, cycles, protocols or vendors anywhere.** | Harm reduction without becoming a how-to guide. |
| 7 | **All content lives in the static HTML; JS only enhances.** | The live homepage H1 is empty in the server HTML (it's typed in by JS), and most AI crawlers (GPTBot, ClaudeBot, PerplexityBot) don't execute JS. Not repeating that here. |
| 8 | **Internal links come from a closed list** pulled from the live sitemap. | Stops the model from inventing plausible-looking URLs. |
| 9 | **Sources are verified in a separate session** from the one that generated them. | A model re-reading its own citations in the same context tends to confirm them. |
| 10 | **Score changes from verification are proposed, not applied.** I apply them by hand. | The scores are the editorial judgment of the page; that stays with a human. |
| 11 | **`ItemList` + `Dataset` JSON-LD, no `FAQPage`.** | Since Aug 2023 Google only shows FAQ rich results for well-known government and health sites. |
| 12 | **Visual tokens copied from the live site** — bg `#0F0F12`, text `#F0EDE8`, gold `#D19C14`, Space Grotesk + Dosis, the site's own success/warning/error colors. | It should look like it belongs on looksmaxxing.guide, not like a template. |
| 13 | **The prototype is `noindex`** and labelled as unofficial; the intended production path is documented. | It shouldn't compete with or pass itself off as the real domain. |

## Pipeline

| Step | Prompt | Runs in | Output |
|---|---|---|---|
| 1 | Dataset | Claude Code with web search + fetch | `data/practices.json` |
| 2 | Verification | **Fresh** Claude Code session (no access to step 1) | `data/verification-report.md`, `data/practices.verified.json` |
| — | Human review | Me | Apply/reject proposed score changes |
| 3 | Build | Claude Code | `build.mjs`, `docs/index.html`, `docs/practices.json` |
| 4 | QA | Claude Code | `qa-report.md`, fixes |

---

## Prompt 1 — Dataset

```text
ROLE
You are a research assistant for an evidence-led men's grooming and health
publication (looksmaxxing.guide). Readers are men 18–35 in the US, UK,
Australia and Canada. Tone: harm reduction. No moralizing, no hype.

TASK
Build data/practices.json: one entry per practice listed below, each graded
on two 0–4 scales using the rubrics in this prompt. Use web search and fetch
to find sources. Do not grade from memory.

PRACTICES — scope is fixed. Do not add or drop entries. You may suggest up to
5 additions in the separate "proposed" array.
  face:      mewing; bonesmashing; thumbpulling; jawline chewing gum / jaw
             exercisers; facial exercises ("face yoga")
  procedure: dermal fillers (jaw/chin); fat-dissolving injections (deoxycholic
             acid, incl. Aqualyx-type products); lateral canthoplasty ("hunter
             eyes" surgery); rhinoplasty; hair transplant abroad (FUE, Turkey);
             limb-lengthening surgery
  hair:      topical minoxidil; low-dose oral minoxidil; finasteride;
             scalp microneedling
  skin:      daily broad-spectrum sunscreen; topical tretinoin; isotretinoin
             without dermatologist supervision; tanning beds; Melanotan II
  compound:  TRT without a prescription; SARMs; DNP; GLP-1 agonists from
             non-pharmacy sources; research peptides (e.g. BPC-157);
             creatine monohydrate
  baseline:  resistance training; consistent 7–9 h sleep

STEP 1 — STATE THE CLAIM
For each practice, write in one sentence the specific outcome the looksmaxxing
community says it delivers. Grade evidence against THAT claim, never against a
weaker or more charitable version of it.

EVIDENCE RUBRIC (graded against the claim)
  4 Strong      Meta-analysis or multiple RCTs in a comparable population, or
                regulatory approval for this exact indication.
  3 Moderate    At least one RCT, or consistent controlled studies.
  2 Limited     Observational or uncontrolled studies, small samples, or
                evidence only in a different population or indication.
  1 Anecdotal   Case reports, mechanism-only arguments, testimonials.
  0 None        No evidence found, or the evidence contradicts the claim.

RISK RUBRIC
  risk_as_practiced: how the community typically does it — self-administered,
  unregulated supply, no monitoring. This is the value that gets plotted.
  risk_supervised: done by a licensed clinician with a regulated product.
  null if no legitimate supervised version exists.
  0 Negligible  No meaningful harm expected.
  1 Low         Minor, reversible, well-characterized side effects.
  2 Moderate    Side effects that need monitoring, prescription-only, or a
                real chance of an unwanted permanent result.
  3 High        Serious or irreversible harm is plausible, or the supply is
                unregulated with documented contamination or mislabeling.
  4 Severe      Documented deaths or permanent disability at typical use.

SOURCE RULES
- Preference order: regulators (FDA, MHRA, TGA, Health Canada) > systematic
  reviews / Cochrane > RCTs > professional bodies (AAD, British Association of
  Dermatologists, ASPS, BAAPS) > cohort studies > case reports/series.
- Never valid as evidence: blogs, Reddit, YouTube, influencers, supplement or
  clinic vendors. These may appear ONLY in claim_source, to show the claim
  exists.
- Every source must be a page you actually fetched in this session; record the
  URL or DOI you fetched. If you can't find one, leave sources short and set
  needs_human_review: true. An empty sources array is acceptable. An invented
  one is not.
- legal_status: fill a market only if a regulator or government page supports
  it. Otherwise null.

CONTENT RULES
- No doses, cycles, protocols, brands or places to buy. Anywhere.
- safer_alternative is required when risk_as_practiced >= 2: a real,
  lower-risk route to the same goal (e.g. bonesmashing -> orthodontist or
  maxillofacial consult; DNP -> supervised weight-loss care).
- Each rationale: max 2 sentences, plain English, no boilerplate hedging.

INTERNAL LINKS
internal_link must be one of these exact paths, or null. Do not create URLs.
  /en/looks/does-mewing-work/
  /en/looks/is-bonesmashing-dangerous/
  /en/looks/clavicular-hammer-bonesmashing-routine/
  /en/looks/clavicular-aqualyx-jenny-popach/
  /en/looks/clavicular-overdose-pentastack-explained/
  /en/looks/clavicular-trt-at-14-claim/
  /en/looks/hunter-eyes-explained/
  /en/looks/looksmaxxing-jawline/
  /en/looks/looksmaxxing-nose/
  /en/looks/rhinoplasty-for-men/
  /en/looks/hair-transplant-looksmaxxing/
  /en/looks/looksmaxxing-surgery-guide/
  /en/looks/looksmaxxing-surgery-turkey/
  /en/looks/looksmaxxing-skincare-routine-men/
  /en/looks/looksmaxxing-skincare-products/
  /en/looks/looksmaxxing-supplements/
  /en/looks/looksmaxxing-dangers-doctors-warn/
  /en/fitness/peptides-guide-for-men/
  /en/fitness/glp-1-for-men-guide/
  /en/fitness/boost-testosterone-naturally/
  /en/fitness/supplements-that-work/
  /en/fitness/beginner-strength-program/
  /en/fitness/sleep-optimization-guide/
  /en/glossary/mewing/
  /en/glossary/bonesmashing/
  /en/glossary/hunter-eyes/
  /en/glossary/norwood-scale/

OUTPUT
Write this JSON to data/practices.json — nothing else in the file:
{
  "generated": "YYYY-MM-DD",
  "practices": [ <entry>, ... ],
  "proposed":  [ { "name": "", "why": "" } ]
}
<entry>:
{
  "id": "kebab-case; used as the HTML anchor",
  "name": "",
  "category": "face | procedure | hair | skin | compound | baseline",
  "claim": "",
  "claim_source": "url | null",
  "evidence": 0-4,
  "evidence_rationale": "",
  "risk_as_practiced": 0-4,
  "risk_supervised": 0-4 | null,
  "risk_rationale": "",
  "key_harms": ["max 4 short items"],
  "safer_alternative": "string | null",
  "legal_status": { "US": null, "UK": null, "AU": null, "CA": null },
  "sources": [{
    "title": "", "publisher": "", "year": 0, "url": "",
    "type": "regulator | systematic-review | rct | guideline | cohort | case-report | review",
    "supports": "which sentence of this entry the source backs"
  }],
  "internal_link": "/en/... | null",
  "confidence": "high | medium | low",
  "needs_human_review": true | false
}

Then, in your chat reply (not in the file), list the 5 entries you are least
confident about and why.
```

## Prompt 2 — Verification (fresh session)

```text
ROLE
You are a fact-checker. You did not write data/practices.json and you have no
stake in it being right. Treat every citation as wrong until you have fetched
it yourself.

TASK
For every object in practices[].sources:
  1. Fetch the URL or DOI. Record: resolves (y/n), title matches (y/n),
     year matches (y/n).
  2. Read enough of the page or abstract to decide whether it supports the
     exact sentence named in "supports".
  3. Verdict:
       VERIFIED     real, and supports the sentence
       WEAK         real, but only supports a softer version of the sentence
       MISMATCH     real, does not support the sentence
       UNREACHABLE  could not be fetched
       FABRICATED   no such document exists

Then, per practice:
  - If the VERIFIED sources left no longer justify the evidence score under
    the rubric below, propose a new score with a one-line reason. Do NOT
    change it in the file.
  - Same check for both risk scores.
  - Flag any sentence in the entry that gives a dose, cycle, protocol or
    vendor, or reads as encouragement.
  - Request https://looksmaxxing.guide{internal_link} and confirm HTTP 200.

<paste EVIDENCE RUBRIC and RISK RUBRIC from Prompt 1>

RULES
- Never "repair" a bad citation by swapping in a source you haven't fetched.
  You may add a replacement only if you fetched it and it passes the same
  check.

OUTPUT
1. data/verification-report.md
   - table: practice | source | verdict | note
   - proposed score changes: practice | field | current | proposed | reason
   - flagged sentences, quoted
2. data/practices.verified.json
   - same structure, with "verified": true|false on every source
   - FABRICATED and MISMATCH sources removed
   - scores untouched (I apply proposed changes by hand)
```

## Prompt 3 — Build

```text
CONTEXT
data/practices.verified.json is the reviewed dataset (28 practices, each with
evidence 0–4 and risk_as_practiced 0–4). Build a one-page tool from it for
looksmaxxing.guide. It ships as a static page on GitHub Pages; the intended
production home is /en/looks/looksmaxxing-evidence-risk-map/ on the real
(Astro) site.

STACK — hard constraints
- Node 18+, zero npm dependencies. One script, build.mjs: reads the JSON,
  writes docs/index.html, copies the JSON to docs/practices.json.
- Everything readable is in the generated HTML. JS is progressive enhancement
  only: inline, under 6 KB. With JS disabled the page still shows the grid,
  every practice, and every source.
- No frameworks, no chart libraries. The grid is CSS grid, not canvas or SVG.
- Rubric text lives in one object in build.mjs and is rendered from there.

LAYOUT
1. Header: static H1 "Looksmaxxing Evidence × Risk Map" — no typing effect,
   no JS-dependent text. Deck: "{n} practices, graded on whether the claim
   holds up and what it costs you." ({n} computed from the data.)
2. "How to read this": both rubrics as compact definition lists.
3. Grid: x = evidence 0→4 (left→right), y = risk_as_practiced 0→4
   (bottom→top). 25 cells. Each practice is a chip linking to #{id}.
   Axis labels in words, not just numbers.
4. Verdict, derived in build.mjs (not stored in the JSON), rules in order:
     risk == 4                     -> "Avoid"
     evidence >= 3 && risk <= 1    -> "Worth doing"
     evidence >= 3 && risk >= 2    -> "Works — clinician first"
     evidence <= 2 && risk <= 1    -> "Low harm, low payoff"
     evidence <= 2 && risk >= 2    -> "Not worth the risk"
   ("Avoid" goes first: DNP has real evidence of fat loss and must still never
   land in "clinician first".)
   Tint each cell by the verdict its coordinates produce. Never convey the
   verdict by color alone — chips carry a text label or symbol too.
5. Category filter (face, procedure, hair, skin, compound, baseline): JS only;
   without JS everything is shown.
6. Entries below the grid, one <article id="{id}"> each: name, claim, both
   scores in words, verdict, rationales, key harms, safer alternative
   (visually prominent when present), legal status only for markets that have
   data, sources as an ordered list with type badges, "Read the full guide ->"
   as an absolute link to looksmaxxing.guide when internal_link exists.
   Clicking a chip scrolls to the entry; :target highlighting works without JS.
7. Footer: links to https://looksmaxxing.guide/en/legal/medical-disclaimer/
   and /en/editorial-standards/, the data's last-reviewed date, a link to
   practices.json, and: "Unofficial prototype built for looksmaxxing.guide.
   Not medical advice."

MOBILE (<= 640px)
The 5x5 grid doesn't fit at 375px with labels. Below 640px, swap it for a list
grouped by verdict in this order: Avoid, Not worth the risk, Works — clinician
first, Low harm low payoff, Worth doing. Render both in HTML and hide one per
breakpoint with display:none so screen readers never get both. No horizontal
scroll at 320px.

VISUAL — match the live site
- bg #0F0F12; surfaces #1F1D2B / #2A2838; text #F0EDE8; muted #9CA3AF;
  accent gold #D19C14 with #0F0F12 text on it.
- Verdict colors from the site's own status tokens: #10B981, #F59E0B,
  #EF4444, #3B82F6, plus neutral gray for "Low harm, low payoff". Every
  text/background pair must pass WCAG AA (4.5:1); if one fails, change
  lightness, not hue.
- Fonts: Space Grotesk (headings), Dosis (body) from Google Fonts,
  display=swap, weights 400/600/700 only.
- Dark only. No gradients, no glassmorphism, no emoji.

SEO / METADATA
- <title>: "Looksmaxxing Evidence × Risk Map — What Works, What Hurts"
- meta description <= 155 chars, written from the data, naming 3 practices.
- <meta name="robots" content="noindex"> on this prototype, plus an HTML
  comment with the intended canonical URL.
- Open Graph tags + twitter:card summary_large_image.
- JSON-LD: one ItemList (each practice a ListItem with url = page#id) and one
  Dataset (name, description, dateModified, distribution -> practices.json).
  No FAQPage.
- lang="en", exactly one H1, H2 per section, H3 per practice.

ACCESSIBILITY
- Each grid cell has an aria-label, e.g. "Evidence limited, risk high:
  3 practices".
- Everything interactive is keyboard reachable with a visible gold focus ring.
- prefers-reduced-motion: no smooth scrolling.

OUTPUT
build.mjs, docs/index.html, docs/practices.json, and a "How to rebuild"
section in README.md. Run `node build.mjs` and report the size of
docs/index.html in KB.
```

## Prompt 4 — QA

```text
Review docs/index.html as someone who wants it to fail. Run each check, report
pass/fail with evidence, fix only the failures, rerun.

1. No-JS content: strip every <script> from the built HTML. The H1 text, every
   practice name, and every source URL must still be present. (This is the
   bug the live homepage has.)
2. Data fidelity: every practice in practices.verified.json appears exactly
   once as an <article>, and its verdict matches the rules in build.mjs.
3. Links: every looksmaxxing.guide link returns 200; every source URL returns
   < 400. List redirects separately.
4. Contrast: compute the ratio for every text/background pair in the CSS;
   list any under 4.5:1 (3:1 for text >= 24px).
5. Mobile: at 320px and 375px, documentElement.scrollWidth <= innerWidth, and
   the grid is replaced by the grouped list.
6. Keyboard: tab through the page. Every chip reachable, focus visible, Enter
   on a chip moves focus to its entry.
7. Tone: quote any sentence that contains a dose, frequency, cycle or vendor,
   or reads as encouragement to try a practice with risk >= 3.
8. Weight: HTML size, number of requests, and confirm fonts are the only
   external requests.

Write the results to qa-report.md.
```

---

## Iteration log

Filled in while running the prompts. Real failures only.

| # | Prompt | What went wrong | How I noticed | What I changed |
|---|---|---|---|---|
| | | | | |
