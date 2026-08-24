# computeScore

**Type:** function
**State:** live
**Stage:** 3 — MATH
**Source:** `scoring.js:124–215`; called from `scoring.js:345` (real run) and `app.js:70` (demo)

## What it is

The whole decision, one function. It takes labels and returns a verdict:

```js
function computeScore(model)   // :124
```

**In:** `jdItems`, `strengths`, `evaluators` (as leans, not scores), `resumeLen`, `jdLen`.
**Out:** one object, seventeen fields (`:209–214`) — the score, the verdict, the
recommendation, the gate, and the working that produced them.

It reads nothing else. No DOM, no fetch, no clock, no randomness. Same input,
same output, every run — which is the claim the entire tool rests on.

## Why it is shaped this way

The model is unreliable at arithmetic and good at reading. So the split: the
model labels the evidence (Mode 1, `scoring.js:220–224`), and this function
decides what the labels mean. Nothing between the label and the number is
generated.

The shape is a pipeline with guards, not a formula. A single expression could
produce the score, but it could not produce a *survivable* score — it would let
a pile of small matches outweigh a missing core requirement, or let a
two-sentence resume produce a confident verdict. Each guard exists to stop one
specific way the arithmetic lies.

## The order is load-bearing

Read top to bottom; each step sees what the last one left.

| line | step | effect |
|---|---|---|
| `:128` | `base = 100 × (1 − G/Σw)` | absence only |
| `:129–131` | edge bonus, scaled, `REALISM_CEIL` | the only additive term |
| `:135–141` | required-gate cap (`CAP_VALUE` 45) | fires at `reqMiss >= 2` |
| `:143–150` | confidence floor | clamps into 40–65 |
| `:162–167` | `GATE_CORE_CEIL` 74 | live *missing core* gate only |
| `:169` | `Math.round` | after every clamp, so caps land exact |
| `:171–172` | `edgeVsGap`, `vote` | computed *after* the number is final |
| `:175–179` | verdict | score bands, nothing else |
| `:182–189` | recommendation | score first, committee second |
| `:192` | gate demotion | `Apply` → `Apply with Caution` |

Two consequences that are not obvious from any single line:

**The confidence floor is a floor, and it lifts.** It runs at `:150` as
`Math.max(40, Math.min(65, score))`. Called with an empty `jdItems` list, the
base is 100 (`gaps.total` is 0, so `gNorm` is 0) and the score would be 90 —
a flawless verdict from no evidence at all. The floor catches it and returns
**65, Viable but Exposed**. It is the only thing standing between a blank
analysis and a strong one. Both call sites also guard with
`if (jdItems && jdItems.length)` (`scoring.js:343`, `app.js:68`), so this is
defence in depth, not dead code.

**It also lifts genuinely bad candidates.** One missing core requirement plus a
50-character resume returns **40, Long Shot** — not `Do Not Apply`. The same
labels with enough text to clear the floor return **0**. Thin inputs cannot
produce an extreme verdict in either direction, which is the intent, but it
means a `Long Shot` at exactly 40 is often a statement about the input length
rather than the candidate.

## Hits

- Everything downstream. `survivabilityScore`, `verdict`, and `recommendation`
  are assigned from its return at `scoring.js:346–348` and `app.js:71–73`.
- `_brain`, attached at `scoring.js:350` / `app.js:74` — the sole source for the
  gate flag (`render.js:278`), the cap note (`render.js:462`), and every row of
  the Score Receipt (`render.js:185–237`).
- `confidenceLevel`, overwritten to `"low"` at `scoring.js:349` when the floor fires.

## Does not hit

**Its own input. The wrong neighbour is the assignment block at `scoring.js:345–350`.**

`computeScore` mutates nothing. It returns an object; the *caller* copies three
fields onto the parsed report and discards the rest into `_brain`. The model's
own `survivabilityScore`, `verdict`, and `recommendation` — which it still emits,
per the schema at `:302` — are overwritten there, not here. Delete those five
lines and the tool silently reverts to displaying model-generated numbers with
no other symptom. That is where the determinism claim actually lives.

Also does not hit:

- **The narrative.** Every string in the report is the model's. This function
  produces numbers and one `committeeNote` (`:194–205`).
- **`divergent`.** Computed at `:207`, returned at `:213`, read nowhere.
  See `cards/divergent.md`.
- **A `benchmark` evaluator.** Filtered at `:172`; no such id is ever produced.
  See `cards/benchmark-evaluator.md`.

## The one leak

The system prompt claims Mode 1 (neutral labelling) "drives the computed
survivability score" (`scoring.js:224`). For the **score**, that holds exactly —
nothing from the cynical narrative mode reaches lines 128–169.

For the **recommendation**, it does not. Both call sites derive the vote from
`evaluator.score` (`scoring.js:344`, `app.js:69`), and those scores are Mode 2
output — written in the adversarial voice alongside the objections and gut
takes. That vote reaches `:184` and `:186`. So a cynical evaluator score cannot
move the number, but it can move `Apply` to `Apply with Caution`, and below 55
it can move `Apply with Caution` to `Do Not Apply` outright.

Precisely: **Mode 2 cannot touch the score. It can change the recommendation.**
See `cards/vote.md`.

## A behaviour worth knowing before you trust the output

A candidate who meets every requirement, with two evaluators leaning apply,
returns **90 / Strong Candidate / Apply with Caution** — not `Apply`. The clean
`Apply` at `:184` also requires `edgeVsGap === 'edge'`, and with no mapped
strengths `S` is 0, so `_edgeVsGap` returns `'balanced'` (`:113`). A perfect
match with an unlabelled strengths list can never earn a clean `Apply`.
See `cards/edge-vs-gap.md`.

## Note

The guard comments number themselves `Guard 1` (`:134`) and `Guard 3` (`:143`).
There is no Guard 2 in the code. See `cards/guard-numbering.md`.
