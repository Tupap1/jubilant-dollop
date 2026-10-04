# QA report: Looksmaxxing Evidence × Risk Map

Run on 2026-10-03 against `docs/index.html`, rebuilt from `data/practices.verified.json` with `node build.mjs` (output is byte-identical to the file that was already in `docs/`, so the page under test is current).
Checks 5 (mobile) and 6 (keyboard) are out of scope for this run; they are being done in a real browser by someone else.
No file under `data/`, `PROMPTS.md` or `README.md` was edited. `build.mjs` was not changed because no check failed.

## Summary

| # | Check | Result | Key evidence |
|---|---|---|---|
| 1 | No-JS content | **Pass** | 3 `<script>` tags stripped (2 JSON-LD, 1 inline JS). One H1, "Looksmaxxing Evidence × Risk Map". 28/28 practice names present as `<h3>`. 122/122 source URLs present as `href`. 28 chips and 25 grid cells in the static HTML. |
| 2 | Data fidelity | **Pass** | 28 `<article>` for 28 practices, ids unique, no extras. All 28 verdicts match the Prompt 3 rules (recomputed independently), the badge text, the article tint class, the grid cell and the mobile list. |
| 3 | Links | **Pass, 0 broken** | 18/18 looksmaxxing.guide links return 200, no redirects. 118 unique source URLs: 0 are 404/410/DNS failures. 33 could not be confirmed by curl alone (29 PubMed cookie walls, 4 bot blocks), listed below; 9 more were client-dependent but reachable. |
| 4 | Contrast | **Pass** | 53 text/background pairs (19 unique colour pairs) from the built CSS, 0 under 4.5:1. Lowest 4.55:1. |
| 5 | Mobile | Skipped | Done elsewhere. |
| 6 | Keyboard | Skipped | Done elsewhere. |
| 7 | Tone | **No dose, cycle or vendor in prose; 13 notes for the owner (4 likely need a call)** | See "Check 7". Nothing edited. |
| 8 | Weight | **Pass** | HTML 164.3 KB (35.5 KB gzip). 4 requests in a real browser: the page, the Google Fonts stylesheet and 2 font files. Fonts are the only external requests. |

Two findings outside the eight checks are in "Other findings" at the end. The more important one: every source line on the page begins with internal JSON field names.

## Check 1: No-JS content

Method: removed every `<script ...>...</script>` block from `docs/index.html` (including the JSON-LD blocks), then searched what was left.

- Scripts before: 3. After: 0.
- H1 count: 1. Text: `Looksmaxxing Evidence × Risk Map` (exact match).
- Practice names: 28 of 28 found as `<h3>`, and 28 of 28 found as text.
- Source URLs: 122 source entries (118 unique URLs) in the data. All 122 appear as an `href` in the stripped HTML.
- The grid and the mobile list are plain HTML: 25 `.cell` divs, 28 `.chip` links, 28 list links.
- The only element carrying `hidden` in the static HTML is the category filter bar, which the inline JS reveals. Without JS every practice is visible, as specified.

## Check 2: Data fidelity

Method: parsed the built HTML and compared it with the JSON. The verdict function was reimplemented from the Prompt 3 rule list (not imported from `build.mjs`), then compared with what the page shows.

- Articles: 28. Practices in JSON: 28. In JSON but no article: none. Article not in JSON: none. Duplicate ids anywhere in the page: none.
- For each of the 28: the article's verdict class, the verdict badge text, the grid cell the chip sits in, and the mobile-list group all equal the expected verdict. Each practice has exactly one chip and one mobile-list link.
- Each of the 25 cells: aria-label count equals the number of chips inside it, the cell tint equals the verdict for its coordinates, and every chip sits at its practice's evidence and risk coordinates.
- Distribution: Avoid 1 (DNP), Not worth the risk 11, Works — clinician first 6, Low harm low payoff 4, Worth doing 6. This matches the build log.
- DNP (evidence 2, risk 4) lands in "Avoid". Isotretinoin without supervision (evidence 3, risk 3) lands in "Works — clinician first", which matches `data/review-decisions.md`.
- Mobile group order: Avoid, Not worth the risk, Works — clinician first, Low harm low payoff, Worth doing (as specified).
- Extras: 1 H1, 3 H2, 28 H3. The JSON-LD `ItemList` has 28 items and every `url` ends in a real article id. `Dataset` is present, no `FAQPage`. `robots` is `noindex`; the canonical comment is present. All 21 `internal_link` values are on the closed list of 27 paths in Prompt 1. `docs/practices.json` is byte-identical to `data/practices.verified.json`.

## Check 3: Links

Method: curl with redirects followed, 20 s timeout, 10-redirect cap, GET (not HEAD). Two passes, because the result depended on the client: one with an identifying `User-Agent`, one with curl's default. A link is called OK if either pass got a 2xx/3xx. "Broken" would mean 404, 410 or DNS failure only.

### looksmaxxing.guide (18 links: 16 entry links + 2 footer links)

All 18 returned **200 with no redirect**, and the page titles are real (none is a soft 404).

```
/en/looks/does-mewing-work/                    /en/looks/hair-transplant-looksmaxxing/
/en/looks/is-bonesmashing-dangerous/           /en/looks/looksmaxxing-skincare-routine-men/
/en/looks/looksmaxxing-jawline/                /en/fitness/peptides-guide-for-men/
/en/looks/looksmaxxing-dangers-doctors-warn/   /en/looks/clavicular-trt-at-14-claim/
/en/looks/clavicular-aqualyx-jenny-popach/     /en/fitness/glp-1-for-men-guide/
/en/looks/hunter-eyes-explained/               /en/fitness/supplements-that-work/
/en/looks/rhinoplasty-for-men/                 /en/fitness/beginner-strength-program/
/en/looks/looksmaxxing-surgery-turkey/         /en/fitness/sleep-optimization-guide/
/en/legal/medical-disclaimer/                  /en/editorial-standards/
```

### Source URLs (118 unique)

| Outcome | Count | Notes |
|---|---|---|
| 200, no redirect | 69 | Includes 15 PMC pages, FDA, MHRA/GOV.UK, healthdirect, Health Canada drug database, Frontiers, others. |
| 200 after redirect | 7 | Listed below. |
| Blocked to bots: PubMed cookie wall | 29 | Every `pubmed.ncbi.nlm.nih.gov` URL returns HTTP 203 with a 5.6 KB cookie-wall page. A made-up PMID (99999999999) returns the same 203 page, so the 203 proves nothing. Existence was checked through NCBI E-utilities instead: all 29 PMIDs exist and return a title; the control bogus ID returns an error. |
| Blocked to bots: 403 on both passes | 4 | See list below. Cloudflare "Just a moment..." challenge. |
| Depends on the client (200 on one pass) | 9 | cdc.gov x2 (403 with the custom User-Agent, 200 with curl's default), www.canada.ca x6 (timeout with the custom User-Agent, 200 with curl's default), mater.org.au x1 (the reverse: 403 default, 200 custom). All are reachable, so these are OK. |
| Broken (404, 410, DNS) | **0** | |

Blocked to bots (not broken, content could not be read by script):

- https://academic.oup.com/ejo/article/43/3/313/6244623 (403, Cloudflare challenge)
- https://jamanetwork.com/journals/jamadermatology/fullarticle/2666801 (403, Cloudflare challenge)
- https://doi.org/10.1093/asjof/ojag013 (doi.org resolves to academic.oup.com, which returns 403)
- https://doi.org/10.1097/GOX.0000000000007372 (doi.org resolves to journals.lww.com, which returns 403)

For the two DOIs, the handle resolved, so the DOI is registered. The first two could not be confirmed by script; they were passed by the step 2 verification.

Redirects (all end in 200):

| Source URL | Hops | Lands on |
|---|---|---|
| https://pmc.ncbi.nlm.nih.gov/articles/PMC4265198 | 1 | same with trailing slash |
| https://pmc.ncbi.nlm.nih.gov/articles/PMC3404185 | 1 | same with trailing slash |
| https://pmc.ncbi.nlm.nih.gov/articles/PMC11547435 | 1 | same with trailing slash |
| https://einstein.elsevierpure.com/en/publications/a-retrospective-review-of-patients-undergoing-lateral-canthoplast-2 | 1 | same with trailing slash |
| https://doi.org/10.1097/iop.0b013e3181baa23f | 3 | ovid.com abstract page |
| https://doi.org/10.1007/s00266-024-04305-6 | 5 | link.springer.com article (URL carries `?error=cookies_not_supported`, a cookie interstitial, page title is the article) |
| https://doi.org/10.1186/s13018-025-05808-x | 5 | link.springer.com article (same cookie parameter) |

Soft-404 check: the `<title>` of every 200 page (non-PDF) was read; none says not found, error or moved. The 6 PDFs have no title to check (they returned 200).

## Check 4: Contrast

Method: parsed the colour tokens and per-verdict colours from the built CSS, listed every CSS rule that sets `color`, mapped each to the backgrounds it can appear on (page, `--s1` panel and entry, `--s2` target state and badge, gold button, each verdict tint), and computed WCAG 2.x ratios. A coverage check confirmed all 27 selectors that set `color` are in the table. The CSS contains no colour literal other than the declared tokens and the derived verdict colours.

- Pairs checked: 53 (19 unique foreground/background combinations). Under 4.5:1: **0**.
- No text reaches the 3:1 large-text exception, and none needed it (all pairs are at or above 4.55:1).
- Lowest ratios, all the verdict badge `.vb` in the entry header (text on its own verdict tint): low payoff 4.55 (`#9CA3AF` on `#383845`), avoid 4.57, clinician 4.59, worth 4.70. Every other pair is higher.
- Gold focus ring against every background it can sit on (page, panels, all five cell tints): 4.55 to 7.72, above the 3:1 non-text minimum.
- Filter-button and badge borders (`--muted`): 5.67 to 7.54.

## Check 7: Tone

Method: every sentence the page renders (claim, both rationales, key harms, safer alternative, legal status, the "Supports" lines) was regex-screened for doses, frequency, cycles, protocols and vendor/brand names, then all 13 entries with risk 3 or 4 were read in full along with the rest. Source titles are verbatim publisher titles and are listed separately. This section reports; nothing in `data/` was changed.

**Doses, cycles, protocols: none found.** No sentence gives a quantity to take, a schedule of use, a cycle, a stack or a how-to. Sentences that matched the screen are study statistics (percentages, patient counts, trial lengths) or non-numeric words ("low-dose" in the name of oral minoxidil, "dose-dependent" in a review summary).

**Frequency wording (all low risk or deferring to a prescriber):**

1. facial-exercises (risk 0), claim: "Daily facial exercises build the facial muscles, lifting the cheeks and tightening the jaw so the face looks more defined and younger."
2. daily-sunscreen (risk 0), claim: "Daily broad-spectrum sunscreen slows skin aging and lowers skin cancer risk."
3. consistent-sleep (risk 0), claim: "Getting consistent sleep of 7 or more hours a night makes your skin, eyes and face look healthier and more attractive."
4. topical-tretinoin (risk 2), safer alternative: "Get it through a licensed prescriber (GP, dermatologist or regulated telehealth service) who sets the strength and pace, and use daily sunscreen alongside."
5. trt-without-prescription (risk 3), safer alternative: "See a GP or endocrinologist for repeat morning blood tests and a proper work-up before any hormone treatment." (testing advice, not a use protocol)

**Vendors, brands, places (Prompt 1 says no brands or places to buy; the owner decided brands are allowed only in verbatim source titles and URLs):**

6. fat-dissolving-injections, practice name (rendered as the H3): "Fat-dissolving injections (deoxycholic acid, incl. Aqualyx-type products)". Brand in a name. Owner decision on record: kept on purpose because it is the search term.
7. hair-transplant-abroad, practice name, claim and risk rationale name Turkey: "A cheap, all-inclusive FUE hair transplant in Turkey gives a dense, natural, permanent hairline for a fraction of the home-country price." A country, not a clinic or vendor. Owner decision on record: kept on purpose.
8. Brands that appear only inside verbatim source titles: "JUVÉDERM VOLUX XC – P110033/S065", "FDA Approves Additional Information in Labeling for Kybella (Deoxycholic Acid) Injection Warning...", "Belkyra | healthdirect". Also 7 source URLs contain brand names. Within the stated rule.
9. Not vendors, noted for completeness: "iPLEDGE REMS" (US regulatory programme, isotretinoin legal status), and "Mater Private Hospital Brisbane" (the bonesmashing expert statement is attributed to it).

**Reads as encouragement or accommodation for a practice with risk 3 or 4.** None of these says "try it". They are the sentences a hostile reader could lift out of context:

10. lateral-canthoplasty (risk 3), safer alternative: "If you still want surgery, see an oculoplastic surgeon (an eye surgeon) in your own country and ask frankly what is and isn't reversible." The same pattern appears in hair-transplant-abroad ("If you do travel, verify credentials and arrange aftercare before you go.") and limb-lengthening-surgery ("If you still pursue surgery, use a specialist limb-reconstruction orthopaedic unit with published outcomes rather than a cosmetic clinic."). The owner already decided to keep this harm-reduction framing (`data/review-decisions.md`); listed so the decision stays visible.
11. melanotan-ii (risk 3), key harm: "Nausea, fatigue and spontaneous erections reported in a three-man trial". Under "Key harms", the last item may read as a perk to some readers.
12. Efficacy statements inside high-risk entries, each followed by a caveat in the same or next sentence:
    - trt-without-prescription: "one short randomized trial in healthy men with normal levels found larger muscles and more strength at above-normal exposure, especially alongside training, but it aimed at muscle outcomes and says little about long-term safety, so the 'safe shortcut' claim has no direct support."
    - dnp (risk 4): "Reviews report rapid weight loss with DNP, which was used as a weight-loss drug before the US declared it not fit for human consumption in 1938, but this rests on historical and uncontrolled reports and no modern controlled trials were found."
    - sarms: "Randomized trials, mostly in older and clinical populations, show a modest gain in lean mass and physical performance, not steroid-like changes in healthy young men."
13. Verdict label "Works — clinician first" is applied to two risk-3 entries: isotretinoin-unsupervised (owner approved this label, recorded in `data/review-decisions.md`) and fat-dissolving-injections. The isotretinoin entry also says "the AAD guideline strongly recommends it for severe or treatment-resistant acne", qualified in the same sentence by "but that evidence comes from prescribed, monitored use."

Counting by the strict reading of the check (dose, frequency, cycle, vendor, or encouragement toward risk 3 or higher), items 6, 7, 10 and 11 are the ones most likely to need an owner call; 1 to 5, 8, 9, 12 and 13 are context notes.

## Check 8: Weight

- `docs/index.html`: 168,263 bytes = **164.3 KB** uncompressed, 35.5 KB gzip, 29.4 KB brotli. Of this, inline CSS 8.0 KB, inline JS 1,410 bytes (budget 6 KB), JSON-LD 4.7 KB.
- `docs/practices.json`: 121.7 KB, fetched only if the reader clicks the link; not loaded by the page.
- No `<img>`, `<iframe>`, `<video>`, external `<script src>`, `@import`, `url()` or `@font-face` in the page or CSS. The inline JS has no `fetch`, XHR, beacon or dynamic `src`. The favicon is `data:,`, so there is no favicon request.
- Requests in a real browser (page loaded from a local server; the tool's network log only lists documents, so the font count comes from `document.fonts` plus the Google stylesheet): **4**.
  1. the HTML document
  2. `fonts.googleapis.com` stylesheet (7.5 KB decoded)
  3. `fonts.gstatic.com` Dosis variable font, latin subset (30.7 KB)
  4. `fonts.gstatic.com` Space Grotesk variable font, latin subset (22.3 KB)
- The stylesheet declares 18 faces (2 families x 3 weights x 3 subsets). The browser loaded 4 of them, which resolve to 2 files because the weights share one variable font. The page's non-ASCII characters all fall in the latin subset, so no latin-ext or vietnamese file is fetched. `✓` and `→` are in no subset and fall back to a system font with no request.
- External hosts contacted: `fonts.googleapis.com`, `fonts.gstatic.com` (plus two `preconnect` hints to the same hosts). Nothing else. Fonts are the only external requests.
- Rough transfer for a cold load: 35.5 KB page (gzip) + about 53 KB fonts = about 89 KB.

## Other findings (not part of the eight checks; not changed)

1. **Internal field names are printed on the public page.** Prompt 3 does not ask for the `supports` text to be shown, but `build.mjs` renders it under every source as "Supports: ...". All 122 `supports` strings in the data begin with or contain JSON field names, for example "Supports: evidence_rationale sentence 1 (no scientific evidence that mewing reshapes the jawline); risk_rationale sentence 1 and key_harms (...)", "legal_status.US", "key_harms items 1, 2 and 4", and one internal note: "undated live page, year is the year fetched". Readers will see these as gibberish. The same lines also hold useful caveats (for example "An author is employed by the drug's manufacturer.", "Expert statement by a plastic surgeon, not a study."). Options for the owner: stop rendering the line in `build.mjs` (one-line change), or rewrite the strings in the data into reader-facing text. I did not choose, because the second option is a content decision and the first drops the caveats.
2. **Iteration log entry 5 is slightly off.** It says red `#EF4444` and blue `#3B82F6` fail 4.5:1 as text on the dark background. Measured: they pass on `#0F0F12` (5.09:1 and 5.20:1). They fail on their own 20% tint, which sits behind the verdict badge (3.51:1 and 3.47:1). The fix in the build (lighter text, same hue) is still needed and correct; only the stated reason differs.
3. `twitter:card` is `summary_large_image` but no `og:image` or `twitter:image` is set (the `OG_IMAGE` environment variable is unset), so shared links will show no image.

## build.mjs changes

None. None of the checks that were run failed (check 7 produced notes for the owner, not a build failure), so there was nothing to fix and rerun.
