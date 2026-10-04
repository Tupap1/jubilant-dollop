# Human review decisions

Score changes proposed by the verification step (Prompt 2) are applied only after I approve them. This is the record.

| Date | Practice | Field | From | To | Decision | Why |
|---|---|---|---|---|---|---|
| 2026-10-03 | jawline-gum-jaw-exercisers | risk_supervised | 0 | null | Accepted | No clinician supervises gum chewing or jaw trainers, so there is no legitimate supervised version; same treatment as mewing and thumbpulling. |
| 2026-10-03 | isotretinoin-unsupervised | evidence | 3 | 2 | **Rejected** | The drug works the same with or without a doctor; what changes without one is the risk, which is already scored (3 as practiced vs 2 supervised). Keeping 3 lands it on "Works — clinician first", which is the right message. "Not worth the risk" would tell readers isotretinoin itself doesn't work, when it is the standard treatment for severe acne. |
| 2026-10-03 | tanning-beds | risk_as_practiced | 3 | 4 | Kept at 3 | Raised by the research agent, not proposed by the verifier. The deaths are population-level estimates, not deaths at typical individual use. |

## Other decisions

- **Text corrections: accepted.** About 30 sentences across the five categories said more than their sources do (e.g. "129 serious cases" vs the FDA's "129 adverse events, some serious"; "7–9 h" vs "7 or more hours"; BPC-157's FDA status). All are applied by an editor pass and logged in `data/corrections-log.md`. No scores change.
- **Kept on purpose, despite low-severity flags:** "Aqualyx-type" and "Turkey" in practice names (they are the terms people search for), and safer alternatives like "If you still want surgery, see a specialist…" (harm reduction talks to people who have already decided, not only to the ones it can talk out of it).
