# CATALOG — Job Fit Scanner

The front desk. Find your row, open **one** card, stop.

This file points. It does not explain. If a row tells you a value, the row
is wrong — the card holds it, and the source file beats the card.

Grouped by decision order, not by folder. The folder tree does not show this
order; it is the real spine of the territory.

Four words in this territory mean three things each. Read
`../cartographer/reference/collisions.md` before trusting any row.

**Lineage matters here.** `operator/` is the original specification build.
The root JS files are a later standalone site. Where they disagree, the
running code wins and the spec is stale. See `cards/operator-folder.md`.

---

## 1 — LABELS · model-labeled

| Noun | What it is | State | Card |
|---|---|---|---|
| systemPrompt | the labeling instructions that run | live | cards/system-prompt.md |
| jdItems | job posting broken into line-items | live | cards/jd-items.md |
| strengths | candidate strengths, mapped or not | live | cards/strengths.md |
| tier | required vs preferred | live | cards/tier.md |
| centrality | core / supporting / peripheral | live | cards/centrality.md |
| status | meets / partial / missing | live | cards/status.md |
| obtainable | acquirable, not disqualifying | live | cards/obtainable.md |
| mapsToNeed | whether a strength answers a real need | live | cards/maps-to-need.md |

## 2 — LEDGER · removed 2026-07-14

| Noun | What it is | State | Card |
|---|---|---|---|
| Evidence Ledger | built July, removed July, display left | ghost | cards/evidence-ledger.md |
| ledger state layer | four names, no declarations | ghost | cards/ledger-state-layer.md |


## 3 — MATH · computed

| Noun | What it is | State | Card |
|---|---|---|---|
| computeScore | the whole decision, one function | live | cards/compute-score.md |
| base | score before any adjustment | live | cards/base.md |
| TIER_W | weight, required vs preferred | live | cards/tier-w.md |
| CENT_W | weight, how central an item is | live | cards/cent-w.md |
| STATUS_F | weight, what a gap costs | live | cards/status-f.md |
| EDGE_BONUS | points added for the best strength | live | cards/edge-bonus.md |
| TIE_FACTOR | dominance threshold for edge vs gap | live | cards/tie-factor.md |
| edgeVsGap | edge / gap / balanced | live | cards/edge-vs-gap.md |

## 4 — GUARDS · computed

| Noun | What it is | State | Card |
|---|---|---|---|
| REALISM_CEIL | nothing is ever a sure thing | live | cards/realism-ceil.md |
| CAP_VALUE | ceiling when required items unmet | live | cards/cap-value.md |
| GATE_CORE_CEIL | ceiling when a core gate is live | live | cards/gate-core-ceil.md |
| confidence floor | clamp when inputs are thin | live | cards/confidence-floor.md |
| guard numbering | code and spec number them differently | drift | cards/guard-numbering.md |

## 5 — VERDICT · computed

| Noun | What it is | State | Card |
|---|---|---|---|
| THE GATE | the one thing likely to screen you out | live | cards/the-gate.md |
| verdict | four score bands | live | cards/verdict.md |
| recommendation | apply / caution / do not | live | cards/recommendation.md |
| vote | evaluators counted as apply or skip | live | cards/vote.md |
| committeeNote | plain statement of the split | live | cards/committee-note.md |
| divergent | computed, never read | ghost | cards/divergent.md |
| benchmark evaluator | filtered out, never exists | ghost | cards/benchmark-evaluator.md |
| evaluator vote threshold | unnamed, duplicated across files | drift | cards/vote-threshold.md |

## 6 — DISPLAY

| Noun | What it is | State | Card |
|---|---|---|---|
| render | draws everything | live | cards/render.md |
| Score Receipt | shows the math, with stale numbers | live | cards/score-receipt.md |
| DEMO_DATA | sample labels, real math | live | cards/demo-data.md |
| section reveal | which sections appear when | live | cards/section-reveal.md |


## 0 — THE SPEC FOLDER · not read by the running system

| Noun | What it is | State | Card |
|---|---|---|---|
| operator/ | the original spec, still accurate | leftover | cards/operator-folder.md |
| scoring-rubric.md | a spec generation older than the code | ghost | cards/scoring-rubric-file.md |
| report-template.md | output format nothing consumes | leftover | cards/report-template.md |
