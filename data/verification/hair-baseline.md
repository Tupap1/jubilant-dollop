# Verification report: hair + baseline (6 practices, 36 sources)

Input: `data/parts/hair-baseline.json` (generated 2026-10-03). Verified 2026-10-03 in a fresh session, treating every citation as wrong until fetched.
Verified JSON: `data/verified/hair-baseline.json` (scores untouched; `verified` flag added to every source; nothing removed because no source was FABRICATED or MISMATCH).

## Summary

| Verdict | Count |
|---|---|
| VERIFIED | 35 |
| WEAK | 1 |
| MISMATCH | 0 |
| UNREACHABLE | 0 |
| FABRICATED | 0 |

Proposed score changes: none. Four borderline scores are noted below for the human reviewer, with no change proposed.
Internal links: 3 of 3 return the page (no failures).

## Fetch methods (per source type)

- **PubMed records** (PMIDs 26380504, 28396101, 39425514, 32516434, 38239003, 37665358, 40056230, 38725143, 34536199, 27328853, 23997369, 25266053, 26039963, 27672412): NCBI E-utilities `efetch` (rettype=abstract). Two of them (39425514, 26039963) were also read through the Europe PMC REST `search` core record to get the exact figures.
- **PMC-only records** (PMC11246695, PMC11942662, PMC3746236, PMC7068252, PMC3001961): Europe PMC REST `search?query=PMCID:...&resultType=core` (title, authors, journal, year, abstract). For the two where the supports sentence needed a detail not in the abstract (PMC3746236 completer count, PMC11246695 blood-pressure reading) I also read the Europe PMC `fullTextXML`.
- **Regulator and public-health pages** (FDALabel, FDA, Health Canada DPD and safety review, healthdirect, gov.uk, CDC): direct WebFetch of the cited URL.
- **MHRA Public Assessment Report (PDF)**: WebFetch returned only the raw PDF, so I extracted the text from the copy the fetch tool saved locally (pdftotext) and read it there.
- **AASM consensus statement (PMID 26039963)**: the abstract does not carry the hours figure, so I read the PMC full text page (PMC4434546) through WebFetch.

"Resolves / title / year" below is written as R/T/Y. Live regulator database records (Health Canada DPD) carry no date, so Y is "n/a".

## Source verdicts

### Topical minoxidil

| Practice | Source | Verdict | Note |
|---|---|---|---|
| topical-minoxidil | FDA Drug Facts label (FDALabel) | VERIFIED | R/T/Y y/y/y (effective 2024-09-06). Label text: use "to regrow hair on the top of the scalp (vertex only...)", OTC; stop-use list includes chest pain, rapid heartbeat, faintness, dizziness, swelling; "hair loss will begin again" if use stops. Backs evidence_rationale, legal_status.US, key_harms. |
| topical-minoxidil | Gupta & Charrette, Skinmed 2015 (PMID 26380504) | VERIFIED | R/T/Y y/y/y. Abstract: minoxidil beat placebo on total and nonvellus hair; "cosmetically acceptable results are present in only a subset of patients". |
| topical-minoxidil | Adil & Godwin, JAAD 2017 (PMID 28396101) | VERIFIED | R/T/Y y/y/y. "All treatments were superior to placebo" in 5 meta-analyses; minoxidil effective in men. |
| topical-minoxidil | Health Canada DPD code 7084 | VERIFIED | R/T y/y, Y n/a. Product record: minoxidil topical, schedule "NON-PRESCRIPTION DRUGS", status Marketed. |
| topical-minoxidil | healthdirect Australia, Regaine Men's Extra Strength listing | VERIFIED | R/T/Y y/y/y (page updated 2026-10-01). "Schedule 2: Pharmacy Medicine", available "from a pharmacy without prescription"; indicated for androgenic alopecia in adult males. Publisher typed `regulator`; healthdirect is a government health-information service that republishes TGA product data, not the regulator itself (labelling nit, see below). |
| topical-minoxidil | Ponomareva et al., Cureus 2024 case report (PMC11246695) | VERIFIED | R/T/Y y/y/y. 23-year-old man, dizziness and pre-syncope after applying large amounts for three days; full text gives resting BP 90/58 mmHg, 110/75 a week later, symptoms gone the day after stopping. |

### Low-dose oral minoxidil

| Practice | Source | Verdict | Note |
|---|---|---|---|
| low-dose-oral-minoxidil | Sobral et al., IJD 2025 meta-analysis (PMID 39425514) | VERIFIED | R/T/Y y/y/y. 4 RCTs, 279 patients, follow-up 24-39 weeks; no difference in hair density (SMD 0.02) or diameter (SMD -0.25); hypertrichosis higher with oral (RR 2.01), which matches "about twice as often". |
| low-dose-oral-minoxidil | Sharma et al., IJD 2020 systematic review (PMID 32516434) | VERIFIED | R/T/Y y/y/y. Objective improvement in 61-100% of androgenetic alopecia patients; hypertrichosis and postural hypotension most common adverse effects. |
| low-dose-oral-minoxidil | Jimenez-Cauhe et al., J Clin Med 2025 narrative review (PMC11942662) | VERIFIED | R/T/Y y/y/y. Off-label; hypertrichosis ~15%, fluid retention 1.3-10%, tachycardia/dizziness <5%, pericardial effusion "extremely rare and often linked to compounding errors". |
| low-dose-oral-minoxidil | FDA minoxidil tablets label (FDALabel) | VERIFIED | R/T/Y y/y/y (May 2026). "Rx only"; indicated only for symptomatic hypertension or hypertension with target-organ damage not controlled on a diuretic plus two other drugs; boxed warning opens with pericardial effusion and angina; "to promote hair growth is not an approved indication". Minor: the entry says "labeled for severe hypertension"; the US label's wording is the longer "symptomatic or target-organ damage, not manageable on maximum therapy" (the word "severe" appears elsewhere in the label). Paraphrase is fair. |
| low-dose-oral-minoxidil | healthdirect Australia, Loniten listing | VERIFIED | R/T/Y y/y/y. "Schedule 4: Prescription Only Medicine"; "adjunctive therapy in adults with severe refractory hypertension". Same `regulator` typing nit as above. |
| low-dose-oral-minoxidil | Health Canada DPD code 4010 | VERIFIED | R/T y/y, Y n/a. Schedule "PRESCRIPTION", ATC C02DC01 (antihypertensive). |

### Finasteride

| Practice | Source | Verdict | Note |
|---|---|---|---|
| finasteride | FDA finasteride 1 mg label (FDALabel) | VERIFIED | R/T y/y. Content checks out: three double-blind placebo-controlled studies, 1,879 men; 5-year photo ratings 48% increase, 42% no change, 10% worse (so about 9 in 10 no further visible loss, about half regrowth); postmarketing sexual dysfunction continuing after discontinuation; depression and suicidal ideation; possible high-grade prostate cancer risk. **Y n:** title says "(revised 11/2023)" and year is 2023, but the live document is effective 2024-10-14 and shows no 11/2023 text. Update the metadata to 2024. |
| finasteride | Adil & Godwin, JAAD 2017 (PMID 28396101) | VERIFIED | R/T/Y y/y/y. Finasteride listed among treatments superior to placebo in pooled RCTs in men. |
| finasteride | MHRA Public Assessment Report, April 2024 (PDF) | VERIFIED | R/T/Y y/y/y. Read from the extracted PDF text: approved in the UK for male pattern hair loss (1 mg); persistent sexual dysfunction and suicidal thoughts are known, labelled effects; "depression is multifactorial"; MHRA met online pharmacies and "some do have thorough screening and monitoring processes in place, others do not". |
| finasteride | MHRA press release, 29 April 2024 | VERIFIED | R/T/Y y/y/y. "only available via a private prescription and is commonly prescribed online"; lists depressed mood, depression, suicidal thoughts, sexual dysfunction; sexual dysfunction "has persisted in patients even after they have stopped taking finasteride". |
| finasteride | MHRA, "strengthens safety warnings", 11 May 2026 | **WEAK** | R/T/Y y/y/y. The strengthened wording is about finasteride sexual dysfunction and mood ("sexual dysfunction may contribute to mood disorders... reported with and without mood alterations") and a new precautionary mood warning for dutasteride. Suicidal thoughts appear only as part of the existing 2024 patient-alert-card text, not as newly strengthened wording. The supports sentence ("warnings on sexual dysfunction, depression and suicidal thoughts were strengthened again in May 2026") overstates it. Softer version that holds: warnings on sexual dysfunction and mood alterations were strengthened in May 2026. |
| finasteride | Health Canada summary safety review, 2015 | VERIFIED | R/T/Y y/y/y (dated 2015-12-17). "Propecia has been sold in Canada since 1998"; "evidence was too limited to determine whether or not a link between finasteride and suicidality exists". |
| finasteride | Health Canada DPD code 61606 | VERIFIED | R/T y/y, Y n/a. Finasteride 1 mg, schedule "PRESCRIPTION", marketed. (The record does not mention hair loss; the CA indication rests on the safety-review source above.) |
| finasteride | healthdirect Australia, finasteride listing | VERIFIED | R/T/Y y/y/y. "Schedule 4: Prescription Only Medicine"; indicated for male pattern hair loss in men 18 or older. |
| finasteride | Hirshburg et al., JCAD 2016 (PMID 27672412) | VERIFIED | R/T/Y y/y/y. Sexual adverse effects "as many as 3.4 to 15.8 percent"; "no direct link" between 5-alpha reductase inhibitors and depression; "well-tolerated... but not without risk"; possibly higher high-grade prostate cancer detection. |

### Scalp microneedling

| Practice | Source | Verdict | Note |
|---|---|---|---|
| scalp-microneedling | Dhurat et al., Int J Trichology 2013 RCT (PMC3746236) | VERIFIED | R/T/Y y/y/y. Full text: 100 men enrolled, 94 completed 12 weeks (50 microneedling + minoxidil vs 44 minoxidil alone); hair count rise 91.4 vs 22.2. |
| scalp-microneedling | Pei et al., J Cosmet Dermatol 2024 (PMID 38239003) | VERIFIED | R/T/Y y/y/y. 13 RCTs, 696 patients; combined microneedling better for density and diameter. |
| scalp-microneedling | Abdi et al., Arch Dermatol Res 2023 (PMID 37665358) | VERIFIED | R/T/Y y/y/y. 10 RCTs, 466 patients (8 in meta-analysis); higher total hair count, no significant diameter gain; "no scarring nor serious adverse events" in the included studies. |
| scalp-microneedling | Ahmed et al., Arch Dermatol Res 2025 (PMID 40056230) | VERIFIED | R/T/Y y/y/y. 12 RCTs, 631 patients; hair count I2 = 88% (very high heterogeneity); adverse events "mild or self-limiting". |
| scalp-microneedling | Gupta et al., J Cosmet Dermatol 2024 network meta-analysis (PMID 38725143) | VERIFIED | R/T/Y y/y/y. Oral 5-alpha reductase inhibitors "more effective than oral minoxidil and other newer agents" including microneedling. |
| scalp-microneedling | FDA, Microneedling Devices page | VERIFIED | R/T/Y y/y/y (page dated 2025-10-15). Authorized for facial acne scars, facial wrinkles, abdominal scars in patients 22+; no hair-loss use; "Some side effects may be permanent"; cold-sore reactivation, pigmentation changes and infection listed; cartridge re-use unsafe; not approved to deliver topical drugs; off-label and combination risks "not known". Also supports the "trained provider, new cartridge each session" route in safer_alternative. The FDA page does not discuss home use, so "Home use leaves sterility and technique unchecked" is the author's inference, not an FDA statement. |

### Resistance training

| Practice | Source | Verdict | Note |
|---|---|---|---|
| resistance-training | Benito et al., IJERPH 2020 (PMC7068252) | VERIFIED | R/T/Y y/y/y. 111 studies, 1,927 healthy males; pooled gain 1.53 kg, I2 = 0%. |
| resistance-training | Wewege et al., Sports Med 2022 (PMID 34536199) | VERIFIED | R/T/Y y/y/y. Randomized trials vs control: body-fat percentage -1.46%, fat mass -0.55 kg, visceral fat SMD -0.49. Review has 58 studies, 54 in the meta-analysis (the supports line says "58 randomized trials"; trivial). Effect is modest, as the entry says. |
| resistance-training | CDC, Adult Activity: An Overview | VERIFIED | R/T y/y. Muscle-strengthening on 2 or more days a week for all major muscle groups. **Y n:** page shows "last reviewed" Dec 20, 2023; entry says 2025. |
| resistance-training | Keogh & Winwood, Sports Med 2017 (PMID 27328853) | VERIFIED | R/T/Y y/y/y. Competitive athletes; low injury rates vs team sports; shoulder, lower back, knee, elbow, wrist/hand most affected; strains, tendinitis, sprains predominate. |

### Consistent 7-9 h sleep

| Practice | Source | Verdict | Note |
|---|---|---|---|
| consistent-sleep | Axelsson et al., BMJ 2010 "Beauty sleep" (PMC3001961) | VERIFIED | R/T/Y y/y/y. 23 adults photographed after normal sleep and after 31 h awake; 65 observers rated them less healthy, less attractive, more tired. Typed `cohort`; it is an experimental study (schema issue already logged). |
| consistent-sleep | Sundelin et al., Sleep 2013 "Cues of fatigue" (PMID 23997369) | VERIFIED | R/T/Y y/y/y. 10 faces, 40 observers, 31 h deprivation: darker circles, paler skin, more wrinkles/fine lines, sadder look. Supports its stated line. It does not rate health or attractiveness (see sentence note below). Typed `cohort`; experimental. |
| consistent-sleep | Oyetakin-White et al., Clin Exp Dermatol 2015 (PMID 25266053) | VERIFIED | R/T/Y y/y/y. 60 healthy women; good sleepers had lower intrinsic ageing scores, 30% better barrier recovery at 72 h, better self-rated appearance. Cross-sectional comparison, typed `cohort`. |
| consistent-sleep | Watson et al., AASM/SRS consensus, Sleep 2015 (PMID 26039963) | VERIFIED | R/T/Y y/y/y. Consensus on the sleep amount needed for optimal health. The statement says "7 or more hours per night", not 7-9, and has no mention of appearance or skin. Backs the "amount adults need for health" line only. |
| consistent-sleep | CDC, About Sleep | VERIFIED | R/T y/y. Adults 18-60: "7 or more hours"; "Talk to your healthcare provider if you have problems sleeping"; no mention of appearance or skin. Backs the stated recommendations-and-consequences line only. **Y n:** page dated May 15, 2024; entry says 2025. |

## Proposed score changes

None required by source verification. Every score is within what the verified sources support.

| practice | field | current | proposed | reason |
|---|---|---|---|---|
| (none) | | | | |

Borderline calls the human reviewer may want to look at (no change proposed):

- **finasteride / evidence 4:** The claim says regrowth "in most" men. The label's 5-year photo ratings show 48% with increased growth (90% with no further visible loss, which does fit "nearly all"). The entry's rationale already discloses this. 4 stands on regulatory approval for this exact indication plus multiple RCTs and a meta-analysis; graded strictly on the "most" wording, 3 is arguable.
- **finasteride / risk_as_practiced 2:** FDA and MHRA both document sexual dysfunction continuing after stopping, which touches rubric level 3 ("irreversible harm is plausible"). 2 is defensible because frequency is low and MHRA says causation of the psychiatric reports is unsettled. Keep unless the editor wants the stricter reading.
- **scalp-microneedling / risk_as_practiced 1:** The entry's own risk_rationale cites the FDA line that some side effects may be permanent. The rubric reserves permanence for level 2 only when there is a "real chance"; the FDA gives no frequency, so 1 holds.
- **consistent-sleep / evidence 3:** Literal rubric match ("consistent controlled studies"), but only the BMJ study rates health and attractiveness, both experiments use 31 h of total deprivation with tiny samples, and the only habitual-sleep study is the 60-woman comparison. 2 is arguable. `needs_human_review` is already true.
- Low-dose oral minoxidil evidence 3 is conservative: a meta-analysis of 4 RCTs showing parity with topical could literally meet level 4 for "as well as the topical". Held at 3 for small n, short follow-up and no approval for this use. No change proposed.

## Flagged sentences

No dose, cycle, vendor, or place-to-buy found. No brand names in dataset-authored prose (brand names appear only in source URLs, e.g. healthdirect paths, which is allowed). Items to consider, all low severity:

1. `low-dose-oral-minoxidil.claim`: "A daily low-dose minoxidil tablet regrows hair across the scalp..." gives a frequency ("daily") and "low-dose". It is the community's claim, with no number, but it is the closest thing to a protocol in the file.
2. `scalp-microneedling.safer_alternative`: "If you want to try it, a trained provider using a new single-use needle cartridge is the route the FDA describes." The FDA page does say to pick a trained provider and ask about a new cartridge each session. The "If you want to try it" opener reads slightly permissive; risk is 1, so it is not a risk-3-or-higher encouragement.
3. `finasteride.safer_alternative`: "...a licensed topical minoxidil is a non-hormonal option to try first." Directive, but it points to a lower-risk route. No change needed.
4. Unsourced editorial assertion, `proposed[0].why`: "the 'stronger finasteride' that looksmaxxing hair content points readers to". Not checked against any source and not citable. The two sourced parts of that sentence are fine (2024 network meta-analysis ranked dutasteride highest for hair density; MHRA announced a precautionary mood warning for dutasteride in May 2026).

## Sentence-to-source notes (no verdict change)

- `consistent-sleep.evidence_rationale`: "Two controlled lab experiments found sleep-deprived faces were rated less healthy and less attractive". Only the BMJ study says that. The Sleep 2013 study reports fatigue cues (eye circles, pale skin, wrinkles) and sadness, not health or attractiveness ratings. Suggest "one found less healthy and less attractive, and a second found more visible fatigue cues".
- `consistent-sleep` (name and claim use "7-9 h"): neither the AASM statement nor the CDC page gives 7-9 h for adults under 61; both say "7 or more hours".
- Source typing: BMJ 2010, Sleep 2013 and CED 2015 are typed `cohort` (experimental or cross-sectional designs; known schema gap). The two healthdirect pages and the Health Canada DPD pages are typed `regulator`; healthdirect is a government health-information service, DPD is the regulator's own database.

## Internal links

Requested via WebFetch (it returns page content or an error, not a raw status code; a returned page with no error or redirect notice is treated as HTTP 200).

| practice | internal_link | Result |
|---|---|---|
| topical-minoxidil, finasteride | https://looksmaxxing.guide/en/looks/hair-transplant-looksmaxxing/ | Loads. H1 "Hair Transplants for Looksmaxxing — What to Expect"; the page mentions both finasteride and minoxidil, so the link is topically defensible. |
| resistance-training | https://looksmaxxing.guide/en/fitness/beginner-strength-program/ | Loads. H1 "A Beginner Strength Program That Actually Works". |
| consistent-sleep | https://looksmaxxing.guide/en/fitness/sleep-optimization-guide/ | Loads. H1 "Sleep Optimization — The Real Guide". |
| low-dose-oral-minoxidil, scalp-microneedling | null | Nothing to check. |

Failed internal links: none.

## Not checked

- `claim_source` URLs (community and forum pages) were out of scope; the prompt verifies `sources[]` only.
- The `internal_link` for topical minoxidil and finasteride points at a hair-transplant page; it was checked for existence and topic only, not for tone.
