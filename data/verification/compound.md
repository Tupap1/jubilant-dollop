# Verification report: compound category

Input: `data/parts/compound.json` (6 practices, 31 sources). Verified JSON: `data/verified/compound.json`.
Checked: 2026-10-03. Fact-checker pass; every source was fetched in this session. Scores in the verified JSON are untouched.

## Fetch methods

| Code | Method |
|---|---|
| A | WebFetch of the exact URL in the entry (HTML page) |
| B | NCBI E-utilities (`efetch` abstract text / `esummary`) for the PMID. PubMed pages were not used |
| C | Europe PMC REST API (`search ... resultType=core` abstract, and `fullTextXML` for the position stand) |
| D | WebFetch of the exact PDF URL. The fetch tool returned the PDF as a binary file, which I converted to text locally with `pdftotext` and read |

Internal links and `claim_source` URLs were requested with `curl` (HTTP status), then the three claim_source pages were read with WebFetch to confirm they discuss the claim.

R/T/Y in the table = resolves / title matches / year matches (y, n, or n/a).

## Verdict counts

| VERIFIED | WEAK | MISMATCH | UNREACHABLE | FABRICATED |
|---|---|---|---|---|
| 31 | 0 | 0 | 0 | 0 |

No source was removed from the verified JSON. Every source has `"verified": true`. Caveats on several VERIFIED sources are in the Note column.

## Source table

| Practice | Source (as cited) | R/T/Y | Method | Verdict | Note |
|---|---|---|---|---|---|
| TRT without a prescription | FDA, class-wide labeling changes for testosterone products (2025) | y/y/y | A | VERIFIED | Page dated 28 Feb 2025. States that all testosterone products raise blood pressure, adds a new warning, and retains the "Limitation of Use" for age-related hypogonadism. Supports both cited uses. |
| TRT without a prescription | Endocrine Society guideline, testosterone therapy in men with hypogonadism (2018) | y/y/y | A + B (PubMed abstract 29562364 as corroboration) | VERIFIED | Diagnosis only with symptoms plus unequivocally and consistently low testosterone; advises against therapy in men planning fertility and with elevated hematocrit; monitoring of testosterone and hematocrit in year one. Harms are implied via contraindications and monitoring, not listed as a harm table. Fine for the cited sentence. |
| TRT without a prescription | NEJM 2023, Cardiovascular Safety of Testosterone-Replacement Therapy (PMID 37326322) | y/y/y | B | VERIFIED | 5,246 hypogonadal men aged 45-80 with or at high risk of cardiovascular disease. Non-inferior for major cardiac events; higher atrial fibrillation, acute kidney injury and pulmonary embolism with testosterone. Sentence is accurate as written; note the population is older men with cardiovascular risk, not healthy young men. |
| TRT without a prescription | BMC Public Health 2022, fake AAS on the black market (PMC9288681) | y/y/y | A | VERIFIED | Pooled estimate 36% counterfeit plus 37% substandard. Matches "about a third counterfeit, a similar share substandard". |
| TRT without a prescription | Health Canada 2006 advisory, unauthorized anabolic steroid products | y/y/y | A | VERIFIED | Dated 21 Apr 2006. States anabolic steroids are Schedule IV under the CDSA; lists reduced fertility among harms. Old page, but the schedule statement is still the cited fact. |
| TRT without a prescription | DEA Diversion, Controlled Substance Schedules | y/y/n/a | A | VERIFIED | Live page lists anabolic steroids under Schedule III (IIIN). Page is undated; year 2026 in the entry is the fetch year, as the entry itself says. |
| TRT without a prescription | Home Office Circular 039/2003, Controlled Drugs | y/y/y | A | VERIFIED | Published 25 Jun 2003. Says four anabolic substances are added to Schedule 4 Part II of the 2001 Regulations and are controlled as Class C; a written Home Office authority is needed to produce or supply for people not already authorised. Indirect: it names the four added substances, not testosterone, and is 23 years old. It also says individuals are exempt for personal-use import in medicinal form, which the entry does not mention. Supports the sentence; a current classification page would be a stronger UK citation. |
| SARMs | FDA, warns of SARMs use among teens and young adults (2023) | y/y/y | A | VERIFIED | Dated 26 Apr 2023. "Cannot be legally marketed in the U.S. as a dietary supplement or drug"; lists liver injury and increased heart attack or stroke risk. |
| SARMs | Health Canada, Using bodybuilding products | y/y/y | A | VERIFIED | Last updated 14 May 2026. "SARMs haven't been authorized in Canada for any medical use"; lists hormonal suppression and heart and liver disease. |
| SARMs | JAMA 2017, composition and labeling of SARMs sold via the internet (PMID 29183075) | y/y/y | B | VERIFIED | 44 products: 41% matched label for the active compound; a further 39% contained another unapproved drug. Exactly as stated. Research letter, observational product testing. |
| SARMs | J Xenobiotics 2023, systematic review of SARM safety in healthy adults | y/y/y | A | VERIFIED | 33 studies (15 case reports, 18 trials). 15 drug-induced liver injury case reports; HDL reductions in 8 trials; lower total testosterone. Authors say recreational use should be strongly discouraged. |
| SARMs | Clin Endocrinol 2025, SARMs and physical performance, systematic review of RCTs (PMID 39285652) | y/y/y | B | VERIFIED | Nine RCTs, 970 participants, mean age 57.1. Modest lean-mass and performance gains. Epub 16 Sep 2024, issue Jan 2025, so year 2025 is the issue year. |
| DNP | J Med Toxicol 2011, DNP: weight-loss agent with significant acute toxicity (PMC3550200) | y/y/y | A | VERIFIED | "Rapid loss of weight"; 62 published deaths; no specific antidote; hyperthermia, tachycardia, sweating. Source says the 1938 Act labelled DNP "not fit for human consumption"; the entry's "banned for that purpose" is a fair paraphrase, not a quote. |
| DNP | AWTTC page for the EAPCCT 2014 abstract, severe toxicity reported to the UK NPIS | y/y/y | A | VERIFIED | 23 exposures, 5 deaths; 20 males, median age 24. Typed `case-report` in the entry; it is a case series (known schema gap). |
| DNP | PHE, supports FSA warnings over deadly weight loss supplement (2013) | y/y/y | A | VERIFIED | Published 21 Oct 2013. DNP "deemed unfit for human consumption in 1938"; 4 deaths among 21 poison-service inquiries Jan 2012 to Aug 2013. |
| DNP | ACMD letter, Advice on 2,4-Dinitrophenol (GOV.UK, 2019) | y/y/y | A | VERIFIED | Published 18 Feb 2019. ACMD advises DNP is a poison, not a drug, and that the Misuse of Drugs Act is not the appropriate control. This is advice from an independent advisory council; see flagged sentence F3. |
| DNP | FDA OCI, retired New Jersey doctor sentenced for selling toxic DNP online (2023) | y/y/y | A | VERIFIED | Dated 1 Jun 2023. FDA "has never approved DNP for human consumption"; harms listed as dehydration, cataracts, liver damage and death. Title is verbatim and names the product only as a case headline. |
| DNP | MJA 2020, DNP exposures and deaths in Australia after the 2017 up-scheduling | y/y/y | A | VERIFIED | 24 exposures to the NSW poisons centre 2004-2018; four deaths in total, all since 2015, two since the 2017 rescheduling. |
| GLP-1 non-pharmacy | FDA, concerns with unapproved GLP-1 drugs used for weight loss (2026) | y/y/y | A | VERIFIED | Last updated 1 Oct 2026. Counterfeits may contain wrong, too little, too much or no active ingredient; unapproved versions do not get FDA review for safety, effectiveness and quality; dosing errors "some requiring hospitalization"; obtain a prescription and fill it at a state-licensed pharmacy. Contamination wording is about multi-dose vial and needle handling and counterfeits, not lab-confirmed contamination of grey-market stock; the lab evidence is the JMIR source. |
| GLP-1 non-pharmacy | MHRA, warns of unsafe fake weight loss pens (2023) | y/y/y | A | VERIFIED | Dated 26 Oct 2023. A very small number hospitalised; hypoglycaemic shock and coma "indicate that the pens may contain insulin"; semaglutide and liraglutide are prescription-only; pharmacies including online must be GPhC-registered. Entry's "appeared to contain insulin" is appropriately hedged. |
| GLP-1 non-pharmacy | JMIR 2024, multifactor quality and safety analysis of semaglutide from online sellers (PMID 39509151) | y/y/y | B | VERIFIED | Test purchases from 6 illegal online pharmacies; 3 vials delivered and tested. Purity 7.7-14.37% vs 99% claimed; endotoxin in all samples; all probable substandard or falsified. Sample is three vials, so "small" is accurate. |
| GLP-1 non-pharmacy | NEJM 2021, once-weekly semaglutide in adults with overweight or obesity (PMID 33567185) | y/y/y | B | VERIFIED | 1,961 adults, 68 weeks; mean change -14.9% vs -2.4% placebo; nausea and diarrhoea most common adverse events. |
| Research peptides (BPC-157) | HSS Journal 2025, BPC-157 in orthopaedic sports medicine, systematic review (PMC12313605) | y/y/y | C (the PMC page itself returned a CAPTCHA to WebFetch; `fullTextXML` returned HTTP 500 twice) | VERIFIED | 36 studies, 35 preclinical, 1 clinical; the clinical study is described as retrospective, 7 of 12 patients with chronic knee pain reported relief; "No clinical safety data were found." The entry's "uncontrolled" is the author's inference from a single-arm retrospective description; consistent with it. Checked from the abstract only. |
| Research peptides (BPC-157) | FDA, bulk drug substances that may present significant safety risks | y/y/y | A | VERIFIED | Last updated 22 Apr 2026. BPC-157 sits under nominated-but-withdrawn; text cites immunogenicity risk and that FDA "lacks sufficient information to know whether the drug would cause harm". Page predates the July 2026 meeting; see flagged sentence F2. |
| Research peptides (BPC-157) | FDA, Pharmacy Compounding Advisory Committee meeting page, 23-24 Jul 2026 | y/y/y | A | VERIFIED | BPC-157 on the 23 Jul agenda, indication ulcerative colitis; committee is advisory ("non-binding recommendations"). No minutes, vote result or transcript posted on the page. |
| Research peptides (BPC-157) | FDA briefing document, PCAC meeting, 23-24 Jul 2026 | y/y/y | D | VERIFIED | Cover text: FDA "does not intend to issue a final determination" until the advisory process is considered and reviews finalised. The same document says FDA is proposing that BPC-157 (free base and acetate) NOT be included on the 503A Bulks List, which the entry omits (F2). The excerpt I could read has no ulcerative colitis text; that detail is supported by the meeting page above. |
| Research peptides (BPC-157) | Health Canada, think twice before injecting peptides bought online | y/y/y | A | VERIFIED | Dated 9 Apr 2026. May contain too much, too little or none of the active ingredient, plus contaminants; infections and allergic reactions; "research use only" labelling "does not make these products legal or exempt from regulatory requirements"; BPC-157 appears in the affected-products list. |
| Creatine monohydrate | ISSN position stand 2017 (PMC5469049) | y/y/y | C | VERIFIED | Full text: "The only consistently reported side effect ... has been weight gain." Safe and well-tolerated in healthy individuals; most effective ergogenic supplement for lean body mass. Note this is a position stand (narrative consensus), which is the only cited basis for the lean-mass half of the claim. |
| Creatine monohydrate | Nutrients 2024, creatine and resistance training, adults under 50 (PMC11547435) | y/y/y | C | VERIFIED | 23 studies; creatine plus training raised upper-body and lower-body strength vs placebo; significant in males, not in females; authors: "greater benefits likely ... in males". Strength outcome only. |
| Creatine monohydrate | BMC Nephrology 2025, creatine and kidney function (PMC12590749) | y/y/y | C | VERIFIED | 21 studies, 12 in the meta-analysis (440 participants). Small significant rise in serum creatinine; no significant change in GFR. Matches the entry. |
| Creatine monohydrate | FDA GRAS Notice GRN 000931 response letter, corrected (2020) | y/y/y | D | VERIFIED | Corrected letter (original 12 Nov 2020, corrected letter signed 3 Dec 2020). Subject: creatine monohydrate as an ingredient in listed foods and drinks. FDA has "no questions at this time" about the notifier's GRAS conclusion, and the letter says it is not an affirmation of GRAS status; the entry's wording is accurate. |

## Proposed score changes

None proposed. Every current score is still justified by the VERIFIED sources.

| Practice | Field | Current | Proposed | Reason |
|---|---|---|---|---|
| (none) | | | | |

Scores reviewed and held, with the reasoning, so the human reviewer can overrule:

| Practice | Field | Score | Why it holds | Judgement call for the editor |
|---|---|---|---|---|
| TRT without a prescription | evidence | 2 | The cited trials and guideline cover hypogonadal men only (rubric 2: different population). | The "build muscle" half of the claim has controlled-trial support in healthy men (see F1), which argues for 3; the "safe" half has none. 2 is a defensible blend. |
| TRT without a prescription | risk_as_practiced / risk_supervised | 3 / 2 | Counterfeit and substandard supply is documented (systematic review); supervised use is prescription-only with monitoring. | |
| SARMs | evidence | 2 | Trials are in older or clinical populations and show modest gains. | "No side effects" half is contradicted, which argues lower. |
| SARMs | risk_as_practiced | 3 | Unregulated supply with documented mislabeling; liver injury case reports. | No source documents deaths, so 4 is not supported. |
| DNP | evidence | 2 | Historical uncontrolled weight-loss reports only. | Could be read as 1 (case-level). Not changed. |
| DNP | risk_as_practiced | 4 | 62 published deaths worldwide, 5 deaths among 23 UK exposures, 4 in Australia. | |
| GLP-1 non-pharmacy | evidence | 1 | Real drug works in RCTs (regulated product); equivalence for outside-pharmacy product is extrapolation. The only direct testing (3 vials) undermines equivalence but does not measure weight loss. | A stricter reading of rubric 0 ("evidence contradicts the claim") would give 0. Not proposed because the testing did not measure the outcome. |
| GLP-1 non-pharmacy | risk_as_practiced / risk_supervised | 3 / 2 | Regulator warnings plus lab testing; supervised is prescription-only with common GI effects. | |
| Research peptides | evidence | 1 | Overwhelmingly preclinical; one small retrospective single-arm patient report. | Literal rubric 2 wording ("uncontrolled studies, small samples") could apply to the 12-patient report, but it covers one injury site only. Not changed. |
| Research peptides | risk_as_practiced | 3 | Regulator statements on unknown safety, immunogenicity, contamination. | Sources say "may contain"; no source documents a harm event. Held at 3 on "serious harm plausible". |
| Creatine monohydrate | evidence | 4 | Meta-analysis of strength gains plus a kidney-safety meta-analysis plus position stand. | Lean-mass half rests on the position stand, not a cited meta-analysis. An added lean-mass meta-analysis would close this; I did not fetch one, so none is added. |
| Creatine monohydrate | risk_as_practiced / risk_supervised | 1 / 0 | Weight gain only consistent effect; small creatinine rise without GFR change. | |

## Flagged sentences

### Content rule: dose, cycle, protocol, vendor, sourcing hint, or encouragement

No sentence in any prose field gives a dose, cycle, schedule, protocol, vendor, brand, or place to buy. Scanned: `claim`, `evidence_rationale`, `risk_rationale`, `key_harms`, `safer_alternative`, all `legal_status` values, and the `proposed` array. Brand names appear only inside verbatim source titles and URLs. Borderline sentences reviewed and judged acceptable (listed so they are a conscious decision):

1. TRT `safer_alternative`: "See a GP or endocrinologist for repeat morning blood tests and a proper work-up before any hormone treatment." Diagnostic advice that routes to a clinician; not a use protocol.
2. SARMs `risk_rationale`: "Lab testing of products sold online as SARMs found ..." Names a sales channel generically, no site or vendor. Acceptable.
3. GLP-1 `claim`: "GLP-1 weight-loss injections bought outside regulated pharmacies give the same large, fast fat loss as prescribed ones, for less money." States the community claim; no sourcing hint.
4. Peptides `legal_status.US`: "Under FDA review for possible inclusion on the pharmacy-compounding bulks list ..." Regulatory fact, but can read as a future legitimate access route; see F2.
5. SARMs `safer_alternative`: "creatine monohydrate is the supplement with strong evidence." Points to a low-risk alternative; no dose.
6. Peptides `safer_alternative`: "a supervised loading-based rehabilitation plan." Generic clinical term, no protocol.
7. Proposed addition "Clomiphene / enclomiphene as a 'natural TRT' alternative": generic drug names only, no dose or source. Acceptable as a proposal.

### Accuracy flags (not content-rule violations)

**F1. TRT `evidence_rationale`, sentence 1 (factually overstated).**
"Testosterone therapy has been tested in men with symptoms and repeatedly low blood levels, not in healthy men with normal levels, so the 'safe shortcut' claim has no direct support."
The clause "not in healthy men with normal levels" is contradicted by a randomized controlled trial in healthy men (NEJM 1996, "The effects of supraphysiologic doses of testosterone on muscle size and strength in normal men", PMID 8637535, read via E-utilities): 43 healthy men; testosterone increased muscle size and strength, especially with training. The conclusion that "safe" has no direct support still stands. I did not add that paper to the sources (it is not cited by the entry). Suggested rewrite: trials in healthy men with normal levels exist but are short, at supraphysiologic exposure, and aimed at muscle outcomes, so they say little about long-term safety; the safety record comes from men with deficiency.

**F2. Peptides `legal_status.US` (stale and one-sided).**
"Under FDA review for possible inclusion on the pharmacy-compounding bulks list (advisory committee, July 2026, ulcerative colitis use); advisory only, with no final FDA determination stated."
The fetched FDA briefing document says FDA is proposing that BPC-157 NOT be included on the list; the entry omits this. The meeting took place on 23 Jul 2026 and today is 2026-10-03, so "under review" lags the facts. The FDA meeting page I fetched posts no minutes or vote. A web search returned secondary reports (trade and vendor press items, which I do not accept as evidence and did not use in any score) saying the committee recommended inclusion; that is unverified here. Needs a human check against FDA minutes or the 503A bulks-list page before the entry is published. The entry already has `needs_human_review: true`.

**F3. DNP `legal_status.UK` (attribution).**
"Not treated as a controlled drug; UK government advice classes it as a poison and says it is unfit for human consumption."
"Poison, not a drug" is advice from the ACMD (an independent advisory council); "unfit for human consumption" is from PHE (government). Suggest "UK advisory bodies and Public Health England describe it as a poison and unfit for human consumption". Minor.

**F4. TRT `risk_rationale`, sentence 2 (population).**
"Even under supervision, the largest trial in men with low testosterone saw more atrial fibrillation, pulmonary embolism and kidney injury than placebo, so treatment needs monitoring."
Accurate. The trial enrolled men aged 45-80 with or at high risk of cardiovascular disease, so applying it to young healthy readers is an extrapolation. Consider adding "older men with heart-disease risk".

**F5. DNP `evidence_rationale` (paraphrase).**
"... banned for that purpose in the US in 1938 ..." The source says the 1938 Act labelled DNP "extremely dangerous and not fit for human consumption". Consider "declared unfit for human consumption in 1938".

**F6. GLP-1 `evidence_rationale` ("the one ...").**
"The one small product-testing study of such sellers ..." The JMIR paper is by the Ashraf, Mackey, Fittler group; a companion JAMA Network Open 2024 report by the same authors (PMID 39093567) exists on the same subject, whose abstract I could only partly read. "The one" is an exhaustive claim I cannot confirm; consider "one small product-testing study".

## Internal links

| Practice | Path | Status |
|---|---|---|
| TRT without a prescription | /en/looks/clavicular-trt-at-14-claim/ | 200 |
| SARMs | /en/looks/looksmaxxing-dangers-doctors-warn/ | 200 |
| DNP | null | n/a |
| GLP-1 non-pharmacy | /en/fitness/glp-1-for-men-guide/ | 200 |
| Research peptides | /en/fitness/peptides-guide-for-men/ | 200 |
| Creatine monohydrate | /en/fitness/supplements-that-work/ | 200 |

No redirects. Failed internal links: none.

`claim_source` pages (same three URLs as above, all 200) were read and do discuss the claim: the TRT page describes obtaining testosterone without blood work from grey-market sources; the SARMs page sells them as "safer steroids" and warns against; the creatine page endorses creatine as effective and safe.

## Notes on the schema

- Three sources (the AWTTC/EAPCCT abstract typed `case-report`; the JAMA 2017 and JMIR 2024 product-testing studies typed `cohort`) are squeezed into those types because the schema has no value for case series or product-testing studies. This is the same gap already in the iteration log; the entries flagged it in their own `supports` text.
- The Home Office circular (2003) and the 2006 Health Canada advisory are old but still the cited legal facts. Both are real and support the stated schedule or class.
