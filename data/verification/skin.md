# Verification report: skin category (5 practices, 22 sources)

Input: `data/parts/skin.json` (generated 2026-10-03). Checked 2026-10-03 by a fact-checker with no part in writing the dataset. Every source was fetched in this session; nothing below is taken from the author's summaries.

## Summary

| Verdict | Count |
|---|---|
| VERIFIED | 22 |
| WEAK | 0 |
| MISMATCH | 0 |
| UNREACHABLE | 0 |
| FABRICATED | 0 |

Every source is a real document, and every title and year matches (brand names removed from titles were treated as matches). No source was removed from the verified JSON.

Verified does not mean the entry is clean. The sources hold up, but 6 sentences in the entries go beyond what the sources say (see "Flagged sentences"), and one evidence score (isotretinoin) is proposed for a change because of how the claim is worded, not because of a source failure.

Fetch methods used:
- **Direct** = WebFetch on the URL in the dataset.
- **E-utilities** = NCBI efetch (`eutils.ncbi.nlm.nih.gov/.../efetch.fcgi?db=pubmed&id=<PMID>&rettype=abstract&retmode=text`) for the same PMID. PubMed pages return a cookie wall and `pmc.ncbi.nlm.nih.gov/articles/PMC4265198` returns a reCAPTCHA to WebFetch.
- **Europe PMC** = Europe PMC REST API (`/search?query=...&resultType=core`) for the same PMID, PMCID or DOI.
- **PDF read** = the PDF was downloaded by WebFetch and read page by page with the Read tool.

## Source table

R = resolves, T = title matches, Y = year matches.

| Practice | Source | R / T / Y | Method | Verdict | Note |
|---|---|---|---|---|---|
| daily-sunscreen | FDA, "Sunscreen: How to Help Protect Your Skin from the Sun" | y / y / y (page current as of 2026) | Direct | VERIFIED | Quote: sunscreens "if used as directed with other sun protection measures, help to prevent sunburn and/or to reduce the risks of skin cancer and early skin aging". Also: "at least some sunscreen active ingredients are absorbed through the skin and enter the body" and "FDA has requested data from industry to confirm the safety of sunscreen active ingredients". Regulated as drugs under nonprescription standards. Supports evidence sentence 1, the risk rationale and legal_status.US. |
| daily-sunscreen | Hughes 2013, Ann Intern Med, "Sunscreen and prevention of skin aging: a randomized trial" | y / y / y | E-utilities (PMID 23732711) | VERIFIED | 903 adults under 55, 4.5 years. Skin aging was "24% less in the daily sunscreen group than in the discretionary sunscreen group". Supports "less skin aging with daily use". |
| daily-sunscreen | Green 2011, J Clin Oncol, "Reduced melanoma after regular sunscreen use: randomized trial follow-up" | y / y / y | E-utilities (PMID 21135266) | VERIFIED | 11 melanomas in the daily group vs 22 in the discretionary group, HR 0.50 (95% CI 0.24 to 1.02), P = .051. "About half as many, at the edge of significance" is accurate. Invasive melanoma only: HR 0.27 (0.08 to 0.97). |
| daily-sunscreen | Health Canada, "Sunscreens" | y / y / y (modified 2026-06-11) | Direct | VERIFIED | Quote: "classified as non-prescription drugs or natural health products"; must have "a Drug Identification Number (DIN) or Natural Product Number (NPN)"; regulated under the Food and Drugs Act. Matches legal_status.CA. |
| topical-tretinoin | Sitohang 2022, Int J Womens Dermatol, "Topical tretinoin for treating photoaging: A systematic review of randomized controlled trials" | y / y / y | E-utilities and Europe PMC (PMID 35620028) | VERIFIED | 7 RCTs; all reported efficacy for "wrinkling, mottled hyperpigmentation, sallowness, and lentigines". Four trials enrolled only women and the rest mostly women, so the population is not clearly comparable to the male readers. |
| topical-tretinoin | FDA label (the entry's title has the brand name removed; the document is the brand-name tretinoin 0.05% cream label, revised July 2000) | y / y (brand removed) / y (2000) | Direct (PDF) | VERIFIED | Quotes: "does not remove wrinkles or repair sun-damaged skin"; "Rx only"; local reactions "reported by almost all subjects", "usually of mild to moderate severity and generally occurred early in therapy"; 4% discontinued for skin irritation. Supports everything named in `supports`. This is a 2000 label for the photoaging indication only; a current label would be a better citation. |
| topical-tretinoin | AAD acne guideline, J Am Acad Dermatol 2024 | y / y / y | E-utilities and Europe PMC (PMID 38300170) | VERIFIED | "Strong recommendations are made for benzoyl peroxide, topical retinoids, topical antibiotics, and oral doxycycline." Supports both named sentences. |
| isotretinoin-unsupervised | FDA, "Isotretinoin Capsule Information" | y / y / y (current as of 2026) | Direct (two passes) | VERIFIED | Approved for "severe recalcitrant nodular acne"; "birth defects, miscarriage, premature births, and death in babies"; "depression and suicide, have been reported"; restricted distribution under the iPLEDGE REMS; "You should NEVER buy isotretinoin without first seeing your healthcare professional"; "Some websites sell prescription drugs without a prescription." The page does NOT name anxiety or any sexual side effect (see flagged sentences). |
| isotretinoin-unsupervised | MHRA Drug Safety Update, Oct 2023 | y / y / y (31 Oct 2023) | Direct (three passes) | VERIFIED | The lead prescriber "must have expertise in the use of systemic retinoids for the treatment of severe acne"; black triangle medicine; healthcare professionals must "monitor patients for side effects including mental health and sexual function side effects at each follow up appointment". Sexual and psychiatric effects are named only in general terms; erectile dysfunction, low libido, anxiety and depression are not named. |
| isotretinoin-unsupervised | Lagan 2014, Pharmacoepidemiol Drug Saf, survey of e-pharmacies | y / y / y | Europe PMC, abstract and full-text XML (PMC4265198) | VERIFIED | 50 e-pharmacies (UK-accessible, September 2011). "Isotretinoin could be purchased from 42 sites without a valid prescription." Birth-defect information was lacking at 25 of 50 sites, "not taking in pregnancy" information at 24, and "planning or at risk of a pregnancy" information at 33. Supports the `supports` text as written, but the risk_rationale wording "often with little or no safety information" is stronger than this. The survey is 15 years old. |
| isotretinoin-unsupervised | AAD acne guideline, J Am Acad Dermatol 2024 | y / y / y | E-utilities and Europe PMC (PMID 38300170) | VERIFIED | "Oral isotretinoin is strongly recommended for acne that is severe, causing psychosocial burden or scarring, or failing standard oral or topical therapy." Supports evidence sentence 1. The abstract does not use the words "first-line" or "reserved" (see flagged sentences). |
| tanning-beds | Boniol 2012, BMJ, "Cutaneous melanoma attributable to sunbed use: systematic review and meta-analysis" | y / y / y | Direct (PMC page) and Europe PMC | VERIFIED | Numbers confirmed against the abstract: "Based on 27 studies ever use of sunbeds was associated with a summary relative risk of 1.20 (95% confidence interval 1.08 to 1.34)". "Based on 13 informative studies, first use of sunbeds before age 35 years was associated with a summary relative risk of 1.87 (1.41 to 2.48)". So 27 studies, RR 1.20 and RR 1.87 are all correct. Note the 27 are observational studies, and the 1.87 comes from 13 of them. |
| tanning-beds | Health Canada, "Tanning beds and equipment" | y / y / y (modified 2023-06-01) | Direct | VERIFIED | Quotes: a tan from sunlamps or tanning beds "will only provide very limited protection"; "Tanning equipment should NOT be used as a source of vitamin D"; lists skin cancer, premature aging, photokeratitis, cataracts; "Health Canada recommends you do not use tanning equipment"; "Many provinces ... have banned the use of tanning equipment for people under the age of 18". |
| tanning-beds | Health Canada, "Tanning products" | y / y / y (modified 2018-09-05) | Direct | VERIFIED | Self-tanners "colour your skin and make it look like you have a tan" and give "little or no protection from the sun's rays". The entry says "give no sun protection", a small overstatement (see flagged sentences). |
| tanning-beds | FDA, "Sunlamps and Sunlamp Products (Tanning Beds/Booths)" | y / y / y (current as of 2020-09-28) | Direct | VERIFIED | UV exposure "can cause: Skin cancer" and "Premature skin aging". The required label warning is "This sunlamp product should not be used on persons under the age of 18 years." The page does not state in so many words that use is "legal for adults". |
| tanning-beds | UK legislation, "Sunbeds (Regulation) Act 2010: Explanatory Notes" | y / y / y | Direct | VERIFIED | Section 2(1): the business must "ensure that no person aged under 18 uses, or is offered the use of, one of the business's sunbeds on the business premises". Supports legal_status.UK. |
| melanotan-ii | Dorr 1996, Life Sci, pilot phase-I study of melanotan-II | y / y / y | E-utilities and Europe PMC (PMID 8637402) | VERIFIED | Full abstract read. "A single-blind, alternating day (saline or MT-II), placebo-controlled trial was conducted in 3 normal male volunteers". "Two subjects had increased pigmentation in the face, upper body and buttock ... 1 week after MT-II dosing ended." Also: mild nausea; grade II somnolence and fatigue in one of two subjects at the top dose; spontaneous erections "intermittently experienced for 1-5 hours". "Two of three men" is correct. The entry's `type` of "case-report" is wrong for a placebo-controlled trial (already logged as schema gap #3). |
| melanotan-ii | Habbema 2017, Int J Dermatol, "Risks of unregulated use of alpha-melanocyte-stimulating hormone analogues: a review" | y / y / y | Direct (repub.eur.nl abstract, full text behind a sign-in) and Europe PMC by DOI 10.1111/ijd.13585 | VERIFIED | Full abstract read: "Four case reports have described melanomas emerging from existing moles either during or shortly after the use of melanotan. Although conclusive evidence linking these phenomena is lacking ..." Also "melanocytic changes in existing moles and newly emerging (dysplastic) nevi". "Four case reports" is correct. The entry says "case reports" with no count, which is fine. Only the abstract could be read. |
| melanotan-ii | Health Canada advisory, "Think twice before injecting peptides bought online ..." | y / y / y (2026-04-09) | Direct | VERIFIED | Unauthorized injectable peptides "contain contaminants, such as solvents, heavy metals, particles ..., or microbials", can "lead to infections, allergic reactions, and other serious complications"; Melanotan I and II are named in the list; "Unauthorized drug products are illegal in Canada". The contamination warning is general to the product class, not specific to Melanotan II. |
| melanotan-ii | MHRA FOI 24/274, side effects reports of melanotan II products | y / y / y (letter dated 17 April 2024) | PDF read (WebFetch could not parse it, so the saved PDF was read directly) | VERIFIED | Quote: "there are no safeguards that these products meet our standards for quality, safety or effectiveness"; "the sale, supply and advertising of unauthorised medicines is not permitted under the Human Medicines Regulations"; injectable or pen products are classed as medicines; 16 UK Yellow Card reports 2012 to 2022. |
| melanotan-ii | FDA, Notice of Opportunity for Hearing, Manookian, Edward (8/5/16) | y / y / y (2016) | Direct | VERIFIED | The notice text is on the page: Melanotan II "constituted a new drug under the FDCA that could not be introduced or delivered for introduction into interstate commerce without an FDA approved application". This is an enforcement notice about one person, so it supports the US status indirectly but adequately. |
| melanotan-ii | Health Canada, "Tanning products" | y / y / y | Direct | VERIFIED | "Currently, no oral tanning drugs have been authorized for sale in Canada." Self-tanner wording as in the tanning-beds row. The oral-drug line is only loosely related to a safer alternative for an injectable. |

## Spot checks the dataset author could not make from summaries

| Item | Source text | Result |
|---|---|---|
| Boniol 27 studies | "Based on 27 studies ever use of sunbeds was associated with a summary relative risk of 1.20" | Correct (27 observational studies; the cohort/population-based subset gave RR 1.25) |
| Boniol RR 1.20 | 1.20 (95% CI 1.08 to 1.34) | Correct ("about 20%") |
| Boniol RR 1.87 | "Based on 13 informative studies, first use ... before age 35 years ... 1.87 (1.41 to 2.48)" | Correct ("nearly double") |
| Dorr 1996 "2 of 3 men" | 3 normal male volunteers; "Two subjects had increased pigmentation"; single-blind, saline-controlled | Correct, and the "placebo-controlled" label is also correct |
| Habbema "four case reports" | "Four case reports have described melanomas emerging from existing moles ... conclusive evidence linking these phenomena is lacking" | Correct |
| Green 2011 | 11 vs 22 melanomas, HR 0.50, 95% CI 0.24 to 1.02, P = .051 | Correct ("about half", "edge of significance") |

## Proposed score changes (not applied)

| Practice | Field | Current | Proposed | Reason |
|---|---|---|---|---|
| isotretinoin-unsupervised | evidence | 3 | 2 | This is a judgment about how the claim is worded, not a source failure. The claim has two parts: "clears even severe acne" and "you can get and take it without a dermatologist". The verified sources back the first part strongly (FDA approval, AAD strong recommendation). For the second part, the entry itself says no study supports skipping the prescriber, and FDA says "NEVER buy isotretinoin without first seeing your healthcare professional". Under design decision 1 the score should cover the whole claim. All the efficacy evidence is from prescribed, monitored use, which fits rubric level 2 ("evidence only in a different population or indication") better than level 3. A harsher reading (0, evidence contradicts part of the claim) is arguable. If applied, the derived verdict moves from "Works, clinician first" (evidence 3, risk 3) to "Not worth the risk" (evidence 2, risk 3). That may be the better message for a page about unsupervised use, but it is your call. |

Reviewed, no change proposed:
- daily-sunscreen evidence 4 / risk 0 / supervised 0: FDA states the skin cancer and early skin aging indication, backed by the Nambour RCT and its follow-up. Risk 0 holds; the absorption question is flagged by FDA but no harm is shown.
- topical-tretinoin evidence 3: a systematic review of 7 RCTs plus the AAD recommendation, held below 4 because the FDA label contradicts "reverses sun damage" and the trials were mostly in women. Risk 2 / supervised 1: the label data (almost all subjects had mild to moderate local reactions, 4% discontinued) fit level 1. The 2 for as-practiced rests only on "prescription-only" in the rubric. That rubric wording would also apply to the supervised version, so the pair is slightly inconsistent, but I would not change either number.
- isotretinoin risk 3 / supervised 2: 42 of 50 e-pharmacies supplied without a valid prescription, irreversible birth defects, psychiatric warnings. Fits levels 3 and 2.
- tanning-beds evidence 0 / risk 3 / supervised null: the evidence contradicts the "safe" part of the claim (RR 1.20 and 1.87). Level 4 risk would need documented deaths or disability at typical use, which the cited sources do not state.
- melanotan-ii evidence 2: a single-blind, placebo-controlled pilot in 3 men fits "small samples". It shows increased pigmentation, not "deep, lasting"; the entry already says so. Risk 3 / supervised null: no authorization for tanning, contamination warning from Health Canada, melanoma case reports (four, causation unproven).

## Flagged sentences

Dose, cycle, protocol, vendor or encouragement: none found in any of the five entries. Brand names appear only in source titles and agency program names (iPLEDGE). The "regulated telehealth service" mention in tretinoin safer_alternative names a channel, not a vendor, and is fine.

Accuracy flags (sentences the cited sources do not fully back). None of these changes a source verdict, but they should be rewritten or trimmed:

1. isotretinoin-unsupervised, key_harms[0]: "Depression, anxiety and suicidal thoughts reported". FDA names depression and suicide; neither FDA nor MHRA names anxiety.
2. isotretinoin-unsupervised, key_harms[1]: "Sexual side effects such as erectile dysfunction and low libido". MHRA names "sexual function side effects" without specifics, and FDA's page does not mention sexual effects. The specific examples are not in the cited sources.
3. isotretinoin-unsupervised, risk_rationale sentence 2: "...found most would supply it without a valid prescription, often with little or no safety information." The "most" is right (42 of 50). "Little or no safety information" is stronger than the survey, which found specific birth-defect and pregnancy information missing at 24 to 33 of 50 sites. Suggest "often with gaps in safety information".
4. isotretinoin-unsupervised, safer_alternative: "guidelines strongly recommend benzoyl peroxide and topical retinoids as first-line acne treatment, and isotretinoin is reserved for severe or treatment-resistant acne". The abstract says "strongly recommend" but not "first-line", and the isotretinoin recommendation also covers acne "causing psychosocial burden or scarring", so "reserved for severe or treatment-resistant" is narrower than the guideline. I could not read the full text (the JAAD page returned 403).
5. tanning-beds, safer_alternative: "Topical self-tanners ... give no sun protection". Health Canada says "little or no protection".
6. melanotan-ii, key_harms[0]: "Nausea, fatigue and prolonged spontaneous erections". Dorr reports mild nausea, fatigue (grade II somnolence and fatigue in one of two subjects at the top dose) and spontaneous erections lasting 1 to 5 hours. "Prolonged" is a fair reading but the source does not use it. This is the Dorr trial in 3 men, so "reported in a 3-man trial" is more accurate than a general harm.

Minor notes, no action needed:
- tanning-beds legal_status.US and CA say "Legal for adults". Neither fetched page states that outright; it is inferred from the age restrictions.
- isotretinoin legal_status.UK says "Prescription-only". The MHRA page describes lead-prescriber initiation and never uses the phrase.
- melanotan-ii claim_source (peptides guide) says Melanotan II "stimulates melanin production for tanning"; it does not say "deep, lasting tan". daily-sunscreen claim_source (skincare routine) covers skin aging but did not mention skin cancer risk in the fetch. claim_source only needs to show that the claim exists, so this is acceptable.
- The Dorr source `type` ("case-report") and the Lagan source `type` ("cohort") are the nearest allowed values; the real designs are a placebo-controlled pilot and a cross-sectional survey (schema gap #3 in the iteration log).

## Internal links

Fetched with WebFetch at `https://looksmaxxing.guide{internal_link}`. WebFetch does not expose the HTTP status code; a 200 is inferred from a successful load with the expected page content and no error or redirect reported. A curl check would confirm the literal status.

| Path | Used by | Result |
|---|---|---|
| /en/looks/looksmaxxing-skincare-routine-men/ | daily-sunscreen, topical-tretinoin, isotretinoin-unsupervised | Loads, title "The Looksmaxxing Skincare Routine for Men" |
| /en/fitness/peptides-guide-for-men/ | melanotan-ii | Loads, title "Peptides for Men — Honest Guide to BPC-157, TB-500, CJC-1295 and More" |

tanning-beds has `internal_link: null`. Both links are on the closed list. No failed links.

## Output files

- `data/verified/skin.json`: same top-level shape as the input, `"verified": true` added to all 22 sources, no sources removed, scores and text untouched.
