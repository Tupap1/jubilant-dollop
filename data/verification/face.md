# Verification report: face category (5 practices, 13 sources)

Input: `data/parts/face.json` (read only). Verified output: `data/verified/face.json`.
Checked: 2026-10-03. Fact-checker stance: every citation treated as wrong until fetched in this session.

## Summary

| Verdict | Count |
|---|---|
| VERIFIED | 12 |
| WEAK | 1 |
| MISMATCH | 0 |
| UNREACHABLE | 0 |
| FABRICATED | 0 |

- Proposed score changes: 1, low priority (jaw-gum `risk_supervised`). All other scores hold (see "Scores held but flagged").
- Internal links: 3 of 3 return HTTP 200, no redirects.
- Nothing removed from the verified file (no MISMATCH or FABRICATED). The WEAK source is kept with `"verified": false`.

## Fetch methods

- WebFetch on the cited URL: every source except the PubMed records.
- PubMed records (39215439, 32589302, 19082365, 24327764): NCBI E-utilities `efetch ... rettype=abstract&retmode=text`, through WebFetch and, for verbatim re-reads, `curl` from Bash.
- Cross-checks of metadata (title, year, DOI, abstract) through Europe PMC REST and E-utilities with `curl`: Frontiers review (PMC12714943), MARPE review (PMID 33882127), jofph review (PMID 41070532), JAMA Dermatology letter (PMID 29299598 / PMC5885810).
- AAO PDF: WebFetch could not parse the compressed PDF, so I read the saved file with the PDF reader in the Read tool.
- Internal links: `curl -L` against `https://looksmaxxing.guide{path}`.
- WebFetch answers come from a small summarising model. Where a quote mattered (Mater, JAMA Dermatology) I fetched twice with different prompts and compared.

## Source table

| Practice | Source | Resolves | Title | Year | Verdict | Method | Note |
|---|---|---|---|---|---|---|---|
| mewing | AAO press release PDF (Risks-of-Mewing.pdf) | y | y | y (dated 22 Jan 2024) | VERIFIED | WebFetch, saved PDF read | Says "no scientific evidence to support its claims of reshaping the jawline"; lists loosened teeth, misaligned bite, speech changes. Typed `guideline` but it is a press release. URL path says 2025/01, document says 2024. |
| mewing | AAO "Does Mewing Actually Reshape Your Jaw?" | y | y | y (25 Mar 2025) | VERIFIED | WebFetch | "no current research that suggests the technique provides any benefit to your jawline"; "improper tongue pressure can alter how the teeth and jaw align", malocclusion, TMJ pain, speech difficulties. Typed `guideline` but it is a web article. |
| bonesmashing | Mater, "Mater doctors warn of dangers of bone-smashing trend" | y | y | y (29 Apr 2026) | VERIFIED | WebFetch x3 | Dr Diana Kennedy (plastic surgeon, Mater Private Hospital Brisbane): trauma "can cause soft tissue swelling, and bony microfractures, but this does not translate to improved appearance"; also nerve damage, bite and tooth damage, scarring, permanent disfigurement. Typed `review`, but it is a hospital news release quoting one clinician; the entry already says "not a study". |
| bonesmashing | Frontiers in Oral Health, infra-orbital nerve injury in ZMC fractures, SR/MA | y | y | y (2025, DOI 10.3389/froh.2025.1726808) | VERIFIED | WebFetch; Europe PMC metadata | Pooled infraorbital nerve dysfunction 51.9% (95% CI 48-55%), 11 studies / 802 patients in the meta-analysis; authors say recovery "could not be full even with intervention". Entry correctly flags extrapolation from clinical fractures. |
| bonesmashing | StatPearls, Zygomatic Arch Fracture | y | y | y (last update 26 Jan 2024) | VERIFIED | WebFetch | "Some degree of postoperative asymmetry occurs in 20% to 40% of patients" (major asymmetry 3-4%); "Paresthesia may be persistent in the long term for 22% to 65% of patients." |
| thumbpulling | EJO, MARPE in late adolescents and adults, SR/MA | y | y | y (2021, PMID 33882127) | VERIFIED | WebFetch; Europe PMC abstract | 8 studies; significant dental tipping and decreased buccal bone thickness; very low GRADE; no mention of finger or thumb pressure. Imprecision: the entry says serious risk of bias "in its 8 included studies"; it is 7 of 8 serious, 1 moderate. |
| thumbpulling | J Clin Med, midpalatal suture maturation by CBCT | y | y | y (2022) | VERIFIED | WebFetch | 142 CBCT scans, ages 15-30; "CBCT is essential to determine the possibility of palatal disjunction, especially in postadolescents and young adults". Does not mention thumb pulling. Typed `cohort`; it is a retrospective cross-sectional imaging study. |
| jaw gum | J Oral Rehabil 2024, gum chewing training RCT (PMID 39215439) | y | y | y (2024, Jung et al.) | VERIFIED | E-utilities | 58 healthy adults, gum three times a day for 6 months vs no training; occlusal force up at 3 months; "no statistically significant difference in MMT or mandibular shape". It tested ordinary gum, not "very hard" gum or resistance trainers. |
| jaw gum | J Oral Rehabil 2020, chewing exercises in Koreans 65+ (PMID 32589302) | y | y | y (2020, Kim et al.) | VERIFIED | E-utilities | 40 healthy adults 65+, device-based chewing exercises 6 weeks; masseter thickness and occlusal force greater than control (P < .05). It was device exercise, not gum. |
| jaw gum | J Orofac Pain Headache 2025, TMD in chewing gum users, SR (PMID 41070532) | y | y | y (2025) | VERIFIED | WebFetch; Europe PMC abstract | 8 investigations; "a spectrum of effects, from negligible impact to a dose-dependent relationship"; dose-response with muscle discomfort and hypertrophy in some; symptoms transient and subsided when chewing stopped in others. |
| jaw gum | Braz J Otorhinolaryngol 2008, benign masseter hypertrophy (PMID 19082365) | y | y | y (2008) | VERIFIED | E-utilities | Single case; "bilateral bulging in the region of the mandible angle"; "Some authors associate it with the habit of chewing gum, temporo-mandibular joint disorder". Condition is described as idiopathic of unknown cause, and this patient reported no pain. The entry already notes "association only". |
| facial exercises | JAMA Dermatol 2018, Association of Facial Exercise With the Appearance of Aging (PMID 29299598) | y | y | y (2018) | **WEAK** | WebFetch (journal + PMC page); E-utilities | Half 1 verified: open-label, no control group; upper cheek fullness 1.8 to 1.1, lower 1.6 to 0.9 (P = .003); blinded age estimate 50.8 to 48.1 y (P = .002); 27 enrolled, 16 completers, women 40-65. Half 2 NOT supported: "adverse", "safety", "injury", "harm", "side effect" and "pain" do not appear anywhere in the letter. It is silent on safety, so "reported no adverse events" is a softer fact than the entry implies. Also: it is a 3-page Research Letter, and author G. Sikorski is "the founder of Happy Face Yoga, which was the exercise regimen used for training participants" (commercial conflict of interest, not mentioned in the entry). Typed `cohort`; it is a single-arm pilot trial. |
| facial exercises | Aesthet Surg J 2014, effectiveness of facial exercises, SR (PMID 24327764) | y | y | y (2014, Van Borsel et al.) | VERIFIED | E-utilities | Nine reports; "none of the studies used a control group and randomization process"; "The evidence to date is insufficient to determine whether facial exercises are effective for facial rejuvenation." |

## Internal links

| Practice | Path | HTTP | Redirect |
|---|---|---|---|
| mewing | /en/looks/does-mewing-work/ | 200 | none |
| bonesmashing | /en/looks/is-bonesmashing-dangerous/ | 200 | none |
| jaw gum | /en/looks/looksmaxxing-jawline/ | 200 | none |
| thumbpulling | null | n/a | n/a |
| facial exercises | null | n/a | n/a |

No failed internal links.

## Proposed score changes (not applied)

| Practice | Field | Current | Proposed | Reason |
|---|---|---|---|---|
| jawline-gum-jaw-exercisers | risk_supervised | 0 | null (low priority, editorial call) | Rubric says null when no legitimate supervised version exists. No fetched source describes a clinician-supervised hard-gum or jaw-trainer regimen, and the entry gives no basis for 0. Mewing and thumbpulling, with the same situation, are null. Keep 0 if you count TMD jaw rehabilitation as the supervised version. |

No evidence-score or risk_as_practiced changes proposed.

## Scores held but flagged

| Practice | Field | Current | Why it holds | What to watch |
|---|---|---|---|---|
| mewing | evidence | 0 | Both AAO sources say there is no evidence. My own PubMed title/abstract search for "mewing" returned only commentary (J Clin Orthod 2026 "The mewing trend", JOMS 2019 "Mewing: Social Media's Alternative to Orthognathic Surgery?", looksmaxxing reviews); no trial or imaging study. | none |
| mewing | risk_as_practiced | 1 | The AAO warnings are expert opinion, unquantified, and the entry says so. | Borderline 1 vs 2: AAO lists "may require complicated treatment to resolve issues", which could read as a real chance of unwanted permanent result. Also rubric 1 asks for "well-characterized" harms, and these are not. |
| bonesmashing | evidence 0, risk 3 | 0 / 3 | Mater quotes nerve damage and "likely permanent disfigurement"; fracture literature backs nerve and asymmetry outcomes. No documented deaths or disability series, so 3 not 4. | Risk is extrapolated from clinical fractures, as the entry states. |
| thumbpulling | evidence | 0 | PubMed title/abstract search for "thumb pulling" or "thumbpulling": 0 results (my search). | The vendor page itself calls the evidence "largely anecdotal and community-reported"; under the rubric, testimonials would be 1, but vendor pages cannot count as evidence, so 0 stands. |
| thumbpulling | risk_as_practiced | 1 | Not supported by any source; it is a mechanism-only inference, which the entry admits (confidence low). | Rubric 1 means "well-characterized" side effects, which is not the case here. Keep needs_human_review true. |
| jaw gum | evidence | 0 | The healthy-adult RCT contradicts the jawline and masseter outcome. | Borderline: the 2020 RCT shows masseter thickening, but only in people 65+ and with device exercises, which the rubric would put at 2 for the "builds muscle" half of the claim. The jawline half is contradicted, so 0 is defensible. |
| facial exercises | evidence | 2 | Uncontrolled pilot in a different population plus SR of uncontrolled studies fits rubric 2. | none |
| facial exercises | risk_as_practiced / risk_supervised | 0 / 0 | 0 is plausible from mechanism. | The stated reason (no adverse events reported) is not supported by the source. Reword the rationale; the score itself is not contradicted. |

## Flagged sentences

Doses, cycles, protocols, vendors: none found. No brands, no places to buy, no frequencies or quantities recommended. Two trial durations appear as study description only, not as advice:

- jaw gum, evidence_rationale: "The one randomized trial in healthy adults (58 participants, six months of gum-chewing training) raised bite force..."
- facial exercises, evidence_rationale: "One uncontrolled 20-week pilot of 16 completers (27 enrolled)..."

Technique is described at claim level only (no quantities): mewing "Holding the tongue flat against the roof of the mouth...", bonesmashing "Striking the cheekbones and jaw with a hammer or similar tool...", thumbpulling "Pulling outward on the roof of the mouth with the thumbs...". Acceptable as the stated community claim.

Sentences not supported by what the cited sources say, or reading as reassurance:

1. facial-exercises, risk_rationale: "The pilot trial reported no adverse events, and the practice involves no product or procedure." The JAMA letter never mentions adverse events or safety, and reads as an all-clear.
2. facial-exercises, evidence_rationale: "nothing has been tested in men or for jawline definition." An absence claim; neither cited source establishes it (the JAMA study enrolled women only, which covers that trial and nothing else).
3. mewing, risk_rationale: "ordinary tongue resting is usually harmless and reversible." No cited source says this; the AAO pages say improper tongue pressure can alter alignment.
4. thumbpulling, evidence_rationale: "Where adult upper-jaw expansion is studied, it uses specialist miniscrew-anchored appliances, not finger pressure." The cited review covers MARPE only; it does not say MARPE is the only studied route. Suggested softening: "One studied non-surgical route is a miniscrew-anchored appliance, not finger pressure." (Surgically assisted expansion exists too, but I did not fetch a source for that.)
5. thumbpulling, sources[0].supports: "the review itself notes serious risk of bias in its 8 included studies". Source: 7 of 8 serious, 1 moderate.
6. thumbpulling, evidence_rationale: "even a page promoting the practice concedes there are no randomized trials." Accurate (verified quote: "There are no randomized clinical trials isolating 'thumb pulling' in adults. Evidence today is largely anecdotal and community-reported."), but the page is a vendor's (it sells an app) and the source rules allow vendors only in claim_source. Editor's call.
7. jaw gum, evidence_rationale: "a thicker masseter bulges at the jaw angle rather than sharpening the line." Backed only by one case report of idiopathic hypertrophy plus a news quote; a mechanism inference.

## Other checks (outside sources[])

- claim_source URLs: all resolve. Thumbpulling (a coaching-app vendor) states the claim as widening and advancing the upper jaw and "creating more tongue space"; The National (6 Aug 2024) discusses hard chewing gum for jawline and rejects it; Cleveland Clinic (21 Sep 2022) describes face exercises targeting cheeks, jawline and neck and says "more and bigger studies are needed". Mewing and bonesmashing claim_sources are the AAO PDF and Mater page verified above.
- proposed[0] "Mouth taping at night": the "why" is accurate. PLoS One 2025 (PMID 40397877) systematic review: 10 studies, 213 patients, "a potentially serious risk of harm for individuals indiscriminately practicing this trend". Note the review is about mouth breathing and sleep apnea, not jaw or facial structure; the link to oral-posture queries is the entry's own framing.
- `type` labels that do not match the document: AAO press release and AAO web article labelled `guideline`; Mater news release labelled `review`; JAMA Dermatology pilot and J Clin Med imaging study labelled `cohort`. These do not change any verdict, but the build may show these badges.
