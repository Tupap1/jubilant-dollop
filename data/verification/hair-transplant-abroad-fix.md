# Verification report: hair-transplant-abroad, revised entry (5 new sources)

Input: `data/fixes/hair-transplant-abroad.json`. Verified output: `data/fixes/hair-transplant-abroad.verified.json`.
Verification date: 2026-10-03. Fresh session; every citation treated as wrong until fetched.

Scope: only the 5 sources that carried `"verified": false`. The other 4 (verified earlier) are untouched. The risk scores and the risk side of the entry were not re-checked in this pass. The evidence_rationale was checked sentence by sentence and number by number against the 5 new sources; the other 4 sources do not bear on it.

## Summary

| Verdict | Count |
|---|---|
| VERIFIED | 5 |
| WEAK | 0 |
| MISMATCH | 0 |
| UNREACHABLE | 0 |
| FABRICATED | 0 |

No source removed. Scores untouched (evidence 2, risk_as_practiced 3, risk_supervised 1). In the verified JSON `verified: true` means verdict VERIFIED (as in the earlier reports); each new source also carries a `verification_note`. Titles, years, URLs and `type` values were not edited.

The sources are real and support the sentence named in `supports`. The problems are in the evidence_rationale wording itself, mainly sentence 2 (see "Rationale check" below): it states two absolute negatives ("No study...", "the only related numbers") that none of these sources can support, and it leans on a survey that never mentions Turkey.

Methods: "curl + pdftotext" = PDF downloaded with curl, text extracted with pdftotext. "efetch" = NCBI E-utilities efetch abstract (PubMed XML). "Europe PMC" = Europe PMC REST (search record, or fullTextXML). "page" = publisher HTML via curl. WebFetch was not usable for the PDFs and returned a cookie-handshake redirect for Springer.

## Source verdicts

| Source | Verdict | Note |
|---|---|---|
| EDF S3 guideline on androgenetic alopecia (PDF) | VERIFIED | Section 3.4.3: "no randomised controlled studies (RCT) comparing hair transplantation versus no hair transplantation". Only 4 studies, all comparing transplantation with or without add-on treatment, met inclusion; "LEVEL OF EVIDENCE 2" (the guideline's own scale, not the project rubric). Literature search ran to 15 Oct 2015. The PDF prints no publication year (filename says 2017; "Expiry date: 06/2020"). |
| BMC Surgery 2024, FUE in male AGA (158 men) | VERIFIED | PMID 39543552, PMC11566358. Retrospective single-centre series, Xi'an, China. Abstract and results: follicle survival over 90% in 158 men. Table 3 gives mean 91%, range 89-95%, estimated from before/after photographs (authors: "may be subject to subjective errors"). The abstract's second figure (more than 85% of patients above 95% at 12 months) is not in the body and conflicts with Table 3. |
| Medical Journal Armed Forces India 2020, FUE retrospective study (52 men) | VERIFIED | PMID 33162652, PMC7606102. 52 men, two hospitals in India, January 2016 to October 2017. Recipient-area density 6.21 to 36.82 follicular units per cm2 at 9 months (gain 30.61), by trichoscopy and photographs. Retrospective, no control group. |
| Aesthetic Plastic Surgery 2025, hair transplant tourism review | VERIFIED | PMID 40660034. Published 14 Jul 2025, vol 49. Abstract read (full text paywalled; not read). Quote is exact: "lacking standardization, oversight, and consistent reporting, creating a 'data black hole.'" Applied to the transplant tourism industry with Turkey as case study. Level of Evidence V narrative review ("review of existing literature and reports"). The abstract also says the industry "can offer effective solutions and high graft survival in some centers". |
| ISHRS 2022 Practice Census Results (PDF) | VERIFIED | Sampling: 858 invited, 822 valid, 197 responses (24%), online, voluntary, margin of error "an estimate". Item: "repair of previous surgery from another physician / black market hair transplant" = 5.4% (chart "Percent Hair Restoration Patients by Treatment Need", n=157). The word Turkey does not appear anywhere in the report. |

## Fetch record

| Source | Resolves | Title matches | Year matches | Method |
|---|---|---|---|---|
| EDF guideline PDF | y (301 from guidelines.edf.one to www.guidelines.edf.one, then 200, application/pdf, 2.4 MB) | y (exact on first page) | partial: no year printed in the PDF; filename "2017", expiry 06/2020 | curl + pdftotext (sections 1.4, 3.4.1 to 3.4.9 read) |
| BMC Surgery 2024 | y (doi.org 200, lands on link.springer.com) | y | y (published 15 Nov 2024) | efetch (PMID 39543552), Europe PMC search record, Europe PMC fullTextXML (PMC11566358) |
| MJAFI 2020 | y (doi.org 200, linkinghub.elsevier.com) | y | y (2020) | efetch (PMID 33162652), Europe PMC search record, PMC page HTML via curl (Europe PMC fullTextXML returned HTTP 500; efetch db=pmc withholds the full text) |
| Aesthetic Plastic Surgery 2025 | y (doi.org 200 after Springer cookie handshake) | y | y (14 Jul 2025) | efetch (PMID 40660034), Europe PMC search record, publisher page (curl with cookie jar; abstract and reference list only) |
| ISHRS 2022 Practice Census | y (200, application/pdf, 427 KB) | y | y (April 2022) | curl + pdftotext (introduction, treatment-need item, black-market items, Appendix A read) |

Also requested: `https://looksmaxxing.guide/en/looks/looksmaxxing-surgery-turkey/` returns HTTP 200 (no redirect), the entry's `internal_link`.

## Rationale check, sentence by sentence

Current text:

> FUE outcomes have been measured in uncontrolled series, such as over 90% follicle survival in 158 men in China and recipient-area density rising from about 6 to 37 grafts per cm² at nine months in 52 men in India, and a European guideline found no trial comparing transplantation with no transplantation. No study measures results at high-volume package clinics in Turkey (a 2025 review calls the data there a "data black hole"), and the only related numbers come from a surgeon survey in which about 5% of patients came to repair earlier surgery, so the dense, permanent hairline promised for that setting is untested.

### Sentence 1

| Phrase | Status | Detail |
|---|---|---|
| "measured in uncontrolled series" | Supported | Both studies are retrospective with no comparison group. |
| "over 90% follicle survival in 158 men in China" | Supported, imprecise | Abstract says "over 90% of the hair follicles survived in 158 patients"; Table 3 gives mean 91%, range 89-95%, estimated from photographs. "Over 90%" holds as a mean, not for every man. Xi'an, China is correct. |
| "about 6 to 37 grafts per cm² at nine months in 52 men in India" | Supported, one word off | 6.21 to 36.82 is exact, at 9 months, 52 men, two Indian hospitals. The unit in the paper is follicular units per cm2 of recipient area, measured by trichoscopy, not "grafts". |
| "a European guideline found no trial comparing transplantation with no transplantation" | Slightly over-stated | The guideline says no randomised controlled studies (RCT). "No trial" would also exclude non-randomised controlled studies, which the guideline does not rule out. It is also dated: the search ended October 2015. |

### Sentence 2

| Phrase | Status | Detail |
|---|---|---|
| "No study measures results at high-volume package clinics in Turkey" | NOT supported | None of the 5 sources says this. The 2025 review says reporting is inconsistent ("lacking standardization, oversight, and consistent reporting"), not that no study exists, and its abstract cites "alarming complication rates reported by regulatory bodies" and "high graft survival in some centers". A Europe PMC title search also surfaced "Cluster of genomically linked Mycobacterium abscessus infections following hair transplantation in Turkey" (J Travel Med 2026); I did not read it, so it is a lead, not a source, but it shows outcome reports from Turkish transplants exist. An absolute negative cannot be backed by these sources. |
| "a 2025 review calls the data there a 'data black hole'" | Quote correct, scope loose | The review applies the phrase to the hair-transplant tourism industry, with Turkey as its case study. It is a narrative review (Level of Evidence V), and the same abstract credits the industry with "high graft survival in some centers". |
| "the only related numbers come from a surgeon survey" | NOT supported | "Only" is unsupportable. The survey never mentions Turkey, package clinics or FUE complications, so it is not "related" in the sense the sentence implies. |
| "about 5% of patients came to repair earlier surgery" | Supported with caveats | 5.4% is the category "repair of previous surgery from another physician / black market hair transplant" (two things combined). Appendix A says such figures can be the average percent reported by surgeons, not a pooled share of all patients. n=157 of 197 respondents; 24% response to the invitation; voluntary online survey of ISHRS member surgeons, a self-selected group of specialists, and the report says it has not verified the accuracy of the information. |
| "so the dense, permanent hairline promised for that setting is untested" | Inference, over-stated | Follows only from the unsupported "no study" claim. Safer: "is not backed by outcome data from that setting". |

### Corrected wording

Phrase by phrase:

1. "over 90% follicle survival in 158 men in China" becomes "mean follicle survival of about 91% in 158 men in China (estimated from photographs)".
2. "about 6 to 37 grafts per cm² at nine months" becomes "about 6 to 37 follicular units per cm² at nine months".
3. "a European guideline found no trial comparing transplantation with no transplantation" becomes "the 2017 European guideline (search to October 2015) found no randomised controlled trial comparing transplantation with no transplantation".
4. "No study measures results at high-volume package clinics in Turkey" becomes "Outcome data from high-volume package clinics in Turkey are scarce and not standardised".
5. "(a 2025 review calls the data there a 'data black hole')" becomes "(a 2025 narrative review of hair transplant tourism, with Turkey as its case study, calls the lack of consistent reporting a 'data black hole')".
6. "the only related numbers come from a surgeon survey in which about 5% of patients came to repair earlier surgery" becomes "a 2022 survey of ISHRS member surgeons found that, on average, about 5% of their patients came for repair of earlier surgery by another doctor or a black-market clinic, which says nothing specific about Turkey".
7. "is untested" becomes "is not backed by outcome data from that setting".

Full replacement (two sentences):

> FUE outcomes have been measured in uncontrolled series, such as a mean follicle survival of about 91% in 158 men in China and recipient-area density rising from about 6 to 37 follicular units per cm² at nine months in 52 men in India, and the 2017 European guideline found no randomised controlled trial comparing transplantation with no transplantation. Outcome data from high-volume package clinics in Turkey are scarce and not standardised (a 2025 narrative review of hair transplant tourism, with Turkey as its case study, calls this a "data black hole"), and a survey of ISHRS member surgeons found that, on average, about 5% of their patients came for repair of earlier surgery by another doctor or a black-market clinic (it does not mention Turkey), so the dense, permanent hairline promised for that setting is not backed by outcome data.

Wording in `supports` fields to correct (the verified JSON keeps them as written):

- BMC Surgery: drop "and more than 85% of patients had survival above 95% at 12 months" (abstract only; contradicts Table 3), or restate as "mean survival 91%, range 89-95%".
- Aesthetic Plastic Surgery 2025: "notes high graft survival only 'in some centers'". The word "only" is not in the source; the abstract says the industry "can offer effective solutions and high graft survival in some centers".
- ISHRS census: "5.4% of hair restoration patients in 2021". The year is not stated for this item; the item is an average of surgeons' reported percentages (n=157).
- `type`: BMC Surgery and MJAFI are typed `cohort` but are uncontrolled retrospective case series; `case-series` fits and matches the rationale's own "uncontrolled series". Not changed here.

## Proposed score changes

| practice | field | current | proposed | reason |
|---|---|---|---|---|
| hair-transplant-abroad | evidence | 2 | keep 2 | Rubric 2 explicitly covers uncontrolled studies and "evidence only in a different population or indication": two objective uncontrolled FUE series (survival and density at 9 to 24 months) sit above rubric 1 (anecdotal), and the EDF guideline's finding of no randomised trial keeps it below 3. |

Reasoning in more detail. The claim is "a cheap, all-inclusive FUE hair transplant in Turkey gives a dense, natural, permanent hairline for a fraction of the home-country price", and the rubric grades against that exact claim. What the fetched sources show is efficacy of FUE in other settings (Chinese hospital, two Indian military hospitals) with follow-up of 9 months to 2 years, no control groups, and objective but photo-based measures. Nothing measures the claim's own setting (high-volume package clinics in Turkey), "permanent" (no follow-up beyond 1 to 2 years) or "natural" (satisfaction scales only). That is the "different population or indication" case the rubric places at 2, not 0 (nothing found contradicts that FUE grows hair) and not 3 (no RCT; the EDF found none against no treatment). The strongest case for 1 is that every setting-specific part of the claim has no study and only expert statements (ISHRS) speak to it, but those statements are about harm, so they feed the risk score, not a reason to cut the efficacy score. Keep 2. The earlier open item (score 2 with no cited efficacy study) is now resolved: two verified efficacy series are cited.

## Flagged sentences (dose, cycle, protocol, vendor, or reads as encouragement)

Only the new evidence_rationale was re-read in this pass. No dose, cycle, protocol, brand or place to buy. "Turkey" appears as the scope of the practice, inherited from the claim. Nothing reads as encouragement.

## Not verified in this pass

The other 4 sources (Frontiers in Medicine 2026, ISHRS Buyer Beware, ISHRS Fight the FIGHT, Aesthetic Plastic Surgery 2024 necrosis series), the risk scores and risk_rationale, `safer_alternative`, `legal_status`, and the `claim_source` page.
