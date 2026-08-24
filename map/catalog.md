# CATALOG — Job Fit Scanner

The front desk. Find your row, open **one** card, stop.

This file points. It does not explain. If a row tells you a value, the row
is wrong — the card holds it, and the source file beats the card.

Grouped by decision order, not by folder. The folder tree does not show this
order; it is the real spine of the territory.

Five words in this territory carry more than one meaning. Read
`../cartographer/reference/collisions.md` before trusting any row.

`operator/` and the root JS files disagree about how scoring works. Before
trusting either, see `cards/operator-folder.md`.

A cold reader once answered a question straight off this page and got the
rule wrong. The row is not the card. See `../walks/walk-cold-cap-value.md`.

---

## 1 — LABELS · model-labeled

| Noun | What it is | State | Card |
|---|---|---|---|
| systemPrompt | the labeling instructions that run | live | [cards/system-prompt.md](cards/system-prompt.md) |
| jdItems | job posting broken into line-items | live | [cards/jd-items.md](cards/jd-items.md) |
| strengths | candidate strengths, mapped or not | live | [cards/strengths.md](cards/strengths.md) |
| tier | required vs preferred | live | [cards/tier.md](cards/tier.md) |
| centrality | core / supporting / peripheral | live | [cards/centrality.md](cards/centrality.md) |
| status | meets / partial / missing | live | [cards/status.md](cards/status.md) |
| obtainable | acquirable, not disqualifying | live | [cards/obtainable.md](cards/obtainable.md) |
| mapsToNeed | whether a strength answers a real need | live | [cards/maps-to-need.md](cards/maps-to-need.md) |

## 2 — LEDGER · removed 2026-07-14

| Noun | What it is | State | Card |
|---|---|---|---|
| Evidence Ledger | built July, removed July, display left | ghost | [cards/evidence-ledger.md](cards/evidence-ledger.md) |
| ledger state layer | four names, no declarations | ghost | [cards/ledger-state-layer.md](cards/ledger-state-layer.md) |


## 3 — MATH · computed

| Noun | What it is | State | Card |
|---|---|---|---|
| computeScore | the whole decision, one function | live | [cards/compute-score.md](cards/compute-score.md) |
| base | score before any adjustment | live | [cards/base.md](cards/base.md) |
| TIER_W | weight, required vs preferred | live | [cards/tier-w.md](cards/tier-w.md) |
| CENT_W | weight, how central an item is | live | [cards/cent-w.md](cards/cent-w.md) |
| STATUS_F | weight, what a gap costs | live | [cards/status-f.md](cards/status-f.md) |
| EDGE_BONUS | points added for the best strength | live | [cards/edge-bonus.md](cards/edge-bonus.md) |
| TIE_FACTOR | dominance threshold for edge vs gap | live | [cards/tie-factor.md](cards/tie-factor.md) |
| edgeVsGap | edge / gap / balanced | live | [cards/edge-vs-gap.md](cards/edge-vs-gap.md) |

## 4 — GUARDS · computed

| Noun | What it is | State | Card |
|---|---|---|---|
| REALISM_CEIL | nothing is ever a sure thing | live | [cards/realism-ceil.md](cards/realism-ceil.md) |
| CAP_VALUE | ceiling; count and conditions on the card | live | [cards/cap-value.md](cards/cap-value.md) |
| GATE_CORE_CEIL | ceiling when a core gate is live | live | [cards/gate-core-ceil.md](cards/gate-core-ceil.md) |
| confidence floor | clamp when inputs are thin | live | [cards/confidence-floor.md](cards/confidence-floor.md) |
| guard numbering | code and spec number them differently | drift | [cards/guard-numbering.md](cards/guard-numbering.md) |

## 5 — VERDICT · computed

| Noun | What it is | State | Card |
|---|---|---|---|
| THE GATE | the one thing likely to screen you out | live | [cards/the-gate.md](cards/the-gate.md) |
| verdict | four score bands | live | [cards/verdict.md](cards/verdict.md) |
| recommendation | apply / caution / do not | live | [cards/recommendation.md](cards/recommendation.md) |
| vote | evaluators counted as apply or skip | live | [cards/vote.md](cards/vote.md) |
| committeeNote | plain statement of the split | live | [cards/committee-note.md](cards/committee-note.md) |
| divergent | computed, never read | ghost | [cards/divergent.md](cards/divergent.md) |
| benchmark evaluator | filtered out, never exists | ghost | [cards/benchmark-evaluator.md](cards/benchmark-evaluator.md) |
| evaluator vote threshold | unnamed, duplicated across files | drift | [cards/vote-threshold.md](cards/vote-threshold.md) |

## 6 — DISPLAY

| Noun | What it is | State | Card |
|---|---|---|---|
| render | draws everything | live | [cards/render.md](cards/render.md) |
| Score Receipt | shows the math, with stale numbers | live | [cards/score-receipt.md](cards/score-receipt.md) |
| DEMO_DATA | sample labels, real math | live | [cards/demo-data.md](cards/demo-data.md) |
| section reveal | which sections appear when | live | [cards/section-reveal.md](cards/section-reveal.md) |


## 0 — THE SPEC FOLDER · not read by the running system

| Noun | What it is | State | Card |
|---|---|---|---|
| operator/ | the original spec, still accurate | leftover | [cards/operator-folder.md](cards/operator-folder.md) |
| scoring-rubric.md | a spec generation older than the code | ghost | [cards/scoring-rubric-file.md](cards/scoring-rubric-file.md) |
| report-template.md | output format nothing consumes | leftover | [cards/report-template.md](cards/report-template.md) |
