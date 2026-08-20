# status

**Type:** object
**State:** live · model-labeled
**Stage:** labels
**Source:** rule at `scoring.js:260`; weighted by `STATUS_F`, `scoring.js:33`

---

## What it is

Meets, partial, or missing — read strictly from the resume.

`scoring.js:260` carries the calibration in both directions: vocabulary
overlap alone is not `meets`, but demonstrated work that genuinely
satisfies the requirement **is** `meets`, even when described in the job
description's own language. Downgrade to `partial` only when evidence is
adjacent or incomplete; `missing` only when there is no evidence at all.

The last sentence is the guard against over-correction: *do not downgrade a
real, demonstrated capability merely because it shares wording with the JD.*

## Why it is shaped this way

Both failure modes are real. A screener that rewards keyword matching passes
anyone who copied the posting into their resume. A screener that punishes
shared vocabulary punishes candidates who actually did the work and
described it accurately.

## Hits

- `STATUS_F` weighting — missing 1.0, partial 0.5, meets 0.0.
- `base`, through gap mass. A `meets` item contributes zero gap regardless
  of tier or centrality.
- **`CAP_VALUE`** — counts only `status === 'missing'`. Partials never
  reach the cap count.
- **`GATE_CORE_CEIL`** — `_identifyGate` accepts *both* missing and
  partial as gate candidates, ranking missing first. But only a **missing**
  core gate triggers the ceiling. A partial core gate is named as the gate,
  blocks a clean "Apply," and does not clamp the number.

## Does not hit

- **Anything, when `obtainable` is true and status is `missing`.**
  `_computeGaps` silently rewrites the status factor to `partial` in that
  case. See `cards/obtainable.md`.
- **The confidence floor**, which counts items rather than reading them.
- `evidenceStrength` — the wrong neighbour. A narrative field written by the
  adversarial voice, describing the report's confidence in prose. It shares
  the vocabulary of evidence and touches no math.

## If you change it

Missing to partial on a required core item halves its gap contribution and
removes it from the cap count. Two such edits can take a run from a capped
45 to an uncapped score in the sixties.

Status is the label a reader will most want to argue with, and the one the
prompt spends the most words defending against motivated reading.
