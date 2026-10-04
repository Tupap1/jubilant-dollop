# Verification report: procedure (6 practices, 19 sources)

Input: `data/parts/procedure.json` (generated 2026-10-03). Verified output: `data/verified/procedure.json`.
Verification date: 2026-10-03. Fresh session, every citation treated as wrong until fetched.

## Summary

| Verdict | Count |
|---|---|
| VERIFIED | 16 |
| WEAK | 3 |
| MISMATCH | 0 |
| UNREACHABLE | 0 |
| FABRICATED | 0 |

No source was removed (no FABRICATED or MISMATCH). Scores in the verified JSON are untouched. In the verified JSON `verified: true` means verdict VERIFIED; the 3 WEAK sources are kept with `verified: false` and a `verification_note`. Citation fields (title, url, year) were not edited; corrections are listed below for a human to apply.

Methods: "page" = WebFetch of the URL itself. "Europe PMC" = Europe PMC REST API record (title, journal, year, abstract). "E-utilities" = NCBI efetch abstract text. "full text" = Europe PMC fullTextXML. Where DOIs redirect to paywalled/cookie-walled publisher pages, the record was read through Europe PMC. HTTP status codes (which WebFetch does not expose) were read with `curl` for the internal links and for the one ISHRS redirect check.

## Source verdicts

| Practice | Source | Verdict | Note |
|---|---|---|---|
| dermal-fillers-jaw-chin | FDA, Dermal Fillers (Soft Tissue Fillers), 2023 | VERIFIED | Lists chin augmentation as an approved use; blocked vessels, tissue death, blindness, stroke; injectable silicone not approved; nose, glabella, periorbital, forehead, neck not approved; adults over 21. |
| dermal-fillers-jaw-chin | FDA, JUVEDERM VOLUX XC P110033/S065, 2022 | VERIFIED | Approved 29 Jul 2022 for jawline definition in adults over 21. Only one product carries this indication. |
| dermal-fillers-jaw-chin | Cureus 2023, HA filler chin systematic review | VERIFIED | 24 studies, 2,259 patients, 4 RCTs, 17 of 24 significant, 82-100% early falling to 52-77% at 12-18 months, one necrosis, one vascular occlusion, nodules resolved with hyaluronidase (5 studies). |
| fat-dissolving-injections | FDA drug safety communication on deoxycholic acid injection, 2026 | WEAK | Real (15 Sep 2026). FDA: 129 "cases of adverse events" outside the submental region, "some" serious (blurred vision with periorbital use, muscle or nerve injury). The entry says "129 cases of serious events". FDA gives 117 unresolved nodule/mass cases (mean 143 days) without saying injection site, so "even under the chin" is an inference. |
| fat-dissolving-injections | FDA, Using Fat-Dissolving Injections That Are Not FDA Approved Can Be Harmful, 2023 | VERIFIED | Dated 20 Dec 2023. Permanent scars, serious infections, skin deformities, cysts, deep painful knots; "do not purchase ... and attempt to inject them yourself"; one approved product for under-chin fat. Nerve injury is not on this page (the entry does not claim it from here). |
| fat-dissolving-injections | Aesthetic Surgery Journal 2021, REFINE 3-year follow-up | WEAK | Real RCT follow-up (PMID 33617632). 82.4% vs 65.0% is maintenance of response among patients who were responders 12 weeks after the last REFINE treatment (224 enrolled), not "82% of treated patients". Sponsor-affiliated author. Supports a softer wording. |
| fat-dissolving-injections | healthdirect Australia, Belkyra | VERIFIED | Prescription-only, Schedule 4, submental fat in adults. Page title is "Belkyra \| healthdirect", not the recorded title. healthdirect is a government-funded information service reporting ARTG data, not the regulator, so type "regulator" is generous. |
| lateral-canthoplasty | Taban et al., Aesthetic Lateral Canthoplasty, OPRS 2010 (PDF) | VERIFIED | Full text read: 600 patients (1,050 eyelids), 806 reconstructive + 244 cosmetic, mean age 55, chemosis 28, one retrobulbar hematoma (conservative management only), 18 reoperations in 2 years, rounding of the canthal angle under undue tension. The paper calls complications "rare and minor". PDF host is the first author's commercial practice site (tabanmd.com). |
| lateral-canthoplasty | Tepper et al., PRS 2015 (Elsevier Pure repository) | VERIFIED | 146 patients from 288 consecutive procedures, 86% surgeon-rated and 91% patient-rated success, for lower eyelid malposition. |
| lateral-canthoplasty | Kempa et al., JPRAS 2025 (Erasmus repository) | VERIFIED | PMID 40174260. 2,081 raters, edited unisex face. PubMed abstract: lateral canthus elevation affected "attractiveness, femininity, masculinity, and trustworthiness negatively". Two WebFetch summaries of the repository page disagreed about masculinity; the raw PubMed abstract settles it in favour of the entry. |
| rhinoplasty | Plastic and Aesthetic Research 2024, persistent dissatisfaction | WEAK | Real. Supports 72-89% satisfaction, revision 5-15%, residual dorsal hump (20%) and tip fullness (17%), excessive scarring. It is a literature review (Medline/Embase search, 40 references), not a systematic review. Male sex and BDD are described as "frequently labeled" and "potentially" risk factors, softer than the entry. |
| rhinoplasty | PRS Global Open 2026, psychosocial factors systematic review | VERIFIED | PMID 41541245, PRISMA systematic review. Pre-existing BDD, anxiety, depression: lower satisfaction despite technically successful results; recommends preoperative mental health assessment. |
| rhinoplasty | ASJ Open Forum 2026, cosmetic surgery and self-esteem meta-analysis | VERIFIED | PMID 41756809. Facial subgroup g = 0.23, P = .268 (abstract), nonsignificant. Publisher page shows P = .277. Outcome is self-esteem, not the cosmetic result. |
| hair-transplant-abroad | Frontiers in Medicine 2026, FUE complications | VERIFIED | PMID 41709896. "Most widely used technique ... natural-looking results" (abstract intro); overall complication rates 1.2-4.7%, mostly mild and self-limited; donor over-harvesting and depletion; scarring. Efficacy is asserted, not tested; not specific to Turkey. |
| hair-transplant-abroad | ISHRS, Buyer Beware (2016, updated 2024) | VERIFIED | Turkish restrictions led to "black market surgeries, with technicians illegally performing hair transplants"; advises verifying who makes incisions and harvests grafts. Advocacy page, so type "guideline" is generous. |
| hair-transplant-abroad | ISHRS, "Beware of Illegal Hair Restoration Practices" (2019) | VERIFIED | Content supports the sentence (Turkey named; technicians without licences; scarring, unnatural hairlines, poor growth, depleted donor area, infections "ISHRS members report encountering"). Title does not match: the URL 301-redirects to `/ishrs-launches-fight-the-fight-public-awareness-campaign/`, titled "ISHRS Launches Fight the FIGHT Public Awareness Campaign to Combat Fraudulent Hair Restoration Practices Worldwide" (1 Nov 2019). The recorded title does not appear on the page. |
| hair-transplant-abroad | Aesthetic Plastic Surgery 2024, recipient site necrosis after FUE | VERIFIED | PMID 39160404. 18 patients, all had scarring and graft failure. A case series, not a case report. |
| limb-lengthening-surgery | Bone & Joint Research 2020, cosmetic stature lengthening | VERIFIED | PMID 32670567. 11 studies, 795 patients, mean gain 6.7 cm, all level IV, no RCTs, 0.15 complications per patient. Full-text tables list common peroneal neuropathy, fractures through the regenerate and intraoperative fractures. Authors conclude "low rate of major complications". |
| limb-lengthening-surgery | JOSR 2025, aesthetic lower limb lengthening systematic review | VERIFIED | PMID 40275369. 12 studies, 760 patients, average 67 mm, satisfaction 88.8-98%. Full text (PMC12020155): neurological, infectious (197), joint/tendon (425), bone (100) and material-related (82) complication mentions. |

## Fetch record

| Source | Resolves | Title matches | Year matches | Method |
|---|---|---|---|---|
| FDA Dermal Fillers | y | y | y (updated 07/06/2023) | page |
| FDA Volux | y | y | y (29 Jul 2022) | page |
| Cureus PMC10719547 | y | y | y (Nov 2023) | page |
| FDA Kybella DSC | y | y | y (15 Sep 2026) | page (x3) |
| FDA unapproved fat-dissolving | y | y | y (20 Dec 2023) | page |
| REFINE PMC8520020 | y | y | y (2021) | page, Europe PMC, E-utilities (curl) |
| healthdirect Belkyra | y | partial | y (2026) | page |
| Taban PDF | y | y | y (2010) | page (PDF, text extracted with pdftotext), Europe PMC |
| Tepper (Elsevier Pure) | y | y | y (2015) | page |
| Kempa (Erasmus Pure) | y | y | y (2025) | page, Europe PMC, E-utilities (WebFetch and curl) |
| OAE rhinoplasty | y | y | y (2024) | page (x2) |
| GOX 7372 | y (302) | y | y (2026) | page (302, then 402 paywall), Europe PMC |
| ASJ OF ojag013 | y (302) | y | y (2026) | page (publisher page after redirect), Europe PMC |
| Frontiers 1750989 | y | y | y (2026) | page, Europe PMC |
| ISHRS Buyer Beware | y | y | y (2016) | page |
| ISHRS illegal-hair-transplant | y (301) | n | y (2019) | page (redirect target), curl for title and 301 |
| APS 2024 necrosis | y (302) | y | y (2024) | page (302, not followed), Europe PMC |
| BJR 2020 | y | y | y (2020) | page (x2), Europe PMC |
| JOSR 2025 | y (redirect chain ends at a cookie handshake, not followed) | y | y (2025) | page (302), Europe PMC abstract, Europe PMC fullTextXML |

## Proposed score changes

Firm changes: none. In every entry the VERIFIED sources still justify the current scores under the rubric. The three WEAK sources each back wording, not a score: the fat-dissolving risk 3 and 2 are still carried by the VERIFIED FDA unapproved-products page and by prescription-only status; the evidence 3 is still carried by the REFINE RCTs; the rhinoplasty evidence 2 is still observational.

Judgment calls for the editor (no change proposed):

| practice | field | current | proposed | reason |
|---|---|---|---|---|
| lateral-canthoplasty | evidence | 1 | keep 1 (could be 0 or 2) | Observational canthoplasty series in a different population (rubric 2) versus the only direct data on the payoff, which points the wrong way (rubric 0, "contradicts the claim"). 1 sits between the two readings. |
| lateral-canthoplasty | risk_as_practiced | 3 | keep 3 | No verified source documents harm in community or cosmetic practice; the entry says so itself, and the Taban paper calls its own complications "rare and minor". 3 rests on irreversibility plus one retrobulbar hematoma, so it is a judgment. |
| dermal-fillers-jaw-chin | risk_as_practiced | 2 | keep 2 (3 under a literal reading) | FDA documents blindness, stroke and necrosis ("serious or irreversible harm is plausible", rubric 3), but the Cureus review found 2 serious events in 2,259 patients and HA is dissolvable. 2 is defensible; say so if challenged. |
| hair-transplant-abroad | evidence | 2 | keep 2 | No verified source is an efficacy study (the Frontiers paper is a complications review). Score 2 rests on the statement that supporting data are uncontrolled series. Adding one fetched efficacy source would settle it. |

## Text corrections (not score changes)

1. fat-dissolving-injections, risk_rationale: "has logged 129 cases of serious events when the approved drug was used outside the chin". FDA says 129 cases of adverse events, some serious. Also "Even under the chin, the approved drug can leave lumps ... (117 unresolved cases ...)": the FDA does not say the 117 cases were under the chin.
2. fat-dissolving-injections, evidence_rationale: "82% of treated patients still improved at three years". It is 82.4% of patients who were responders at 12 weeks and stayed in follow-up.
3. rhinoplasty, evidence_rationale: "a systematic review reports 72-89% patient satisfaction". The cited source is a literature review (type should be `review`).
4. hair-transplant-abroad, ISHRS 2019 source: title should read "ISHRS Launches Fight the FIGHT Public Awareness Campaign to Combat Fraudulent Hair Restoration Practices Worldwide" and the URL should be `https://ishrs.org/ishrs-launches-fight-the-fight-public-awareness-campaign/`. Both are the same document I fetched. The recorded title is not on the page.
5. lateral-canthoplasty, Taban source: URL is a surgeon's practice site. The same article was fetched via Europe PMC at DOI 10.1097/iop.0b013e3181baa23f (PMID 20489545) and passes the same check, so the URL can be swapped for the DOI.
6. lateral-canthoplasty, risk_rationale: "or pull the lid away from the eye" and key_harms "(rare, can threaten vision)" are not in any fetched source. Taban reports no lower eyelid retraction or ectropion and manages the single retrobulbar hematoma conservatively. The "rare and minor" conclusion of the source is omitted.
7. dermal-fillers-jaw-chin, legal_status.US: "approved fillers are indicated for chin augmentation and jawline definition". Jawline definition is one product's indication (the evidence_rationale correctly says "one filler"); chin augmentation is listed on the FDA page for approved fillers generally.
8. healthdirect Australia (fat-dissolving AU legal_status): a government-funded information service, not the regulator. The TGA/ARTG entry would be the stronger citation; I did not fetch it, so nothing was swapped in.

## Flagged sentences (dose, cycle, protocol, vendor, or reads as encouragement)

Doses, cycles and protocols: none found in any entry. Brand names: only inside verbatim source titles (Kybella, JUVEDERM VOLUX XC, Belkyra, ATX-101), which is allowed.

1. Vendor/brand in author prose, `fat-dissolving-injections.name`: "Fat-dissolving injections (deoxycholic acid, incl. Aqualyx-type products)". The brand is inherited from the Prompt 1 scope list; the editor decides whether to keep it in a display name.
2. Destination named, `hair-transplant-abroad.name`: "Hair transplant abroad (FUE, Turkey)" and claim: "A cheap, all-inclusive FUE hair transplant in Turkey gives a dense, natural, permanent hairline for a fraction of the home-country price." Inherited from the scope list and written as the community claim, not a recommendation. Low.
3. Possible encouragement (risk 3), `hair-transplant-abroad.safer_alternative`: "If you do travel, verify credentials and arrange aftercare before you go." Harm reduction, but it accommodates the risky route. Low.
4. Possible encouragement (risk 3), `lateral-canthoplasty.safer_alternative`: "If you still want surgery, see an oculoplastic surgeon (an eye surgeon) in your own country and ask frankly what is and isn't reversible." Low.
5. Possible encouragement (risk 3), `limb-lengthening-surgery.safer_alternative`: "If you still pursue surgery, use a specialist limb-reconstruction orthopaedic unit with published outcomes rather than a cosmetic clinic." Low.

## Internal links

All requested with `curl -L` against `https://looksmaxxing.guide`; none redirected. Content also loaded with WebFetch.

| Practice | Path | HTTP |
|---|---|---|
| dermal-fillers-jaw-chin | /en/looks/looksmaxxing-dangers-doctors-warn/ | 200 |
| fat-dissolving-injections | /en/looks/clavicular-aqualyx-jenny-popach/ | 200 |
| lateral-canthoplasty | /en/looks/hunter-eyes-explained/ | 200 |
| rhinoplasty | /en/looks/rhinoplasty-for-men/ | 200 |
| hair-transplant-abroad | /en/looks/looksmaxxing-surgery-turkey/ | 200 |
| limb-lengthening-surgery | null | n/a |

Failed internal links: none.

`claim_source` pages (not in `sources[]`): rhinoplasty `/en/looks/looksmaxxing-surgery-guide/` also returns 200; the other three equal the internal links above. All four pages mention the practice. The hunter-eyes page treats canthoplasty as a risky, inconsistent procedure rather than promoting it, and the Aqualyx page describes an incident rather than stating the "permanently melts fat" claim, so they show the topic exists but not the exact claim wording.

## Not verified

The `proposed` array (orthognathic surgery) has no sources and was not checked.
