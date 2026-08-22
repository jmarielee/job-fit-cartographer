# base

**Type:** computed value
**State:** live
**Stage:** 3 — MATH
**Source:** `scoring.js:128` (the formula), `scoring.js:56` (`gNorm`), `scoring.js:131` (consumed), `scoring.js:210` (returned, rounded); displayed at `render.js:227`

## What it is

The score before anything is added to it or clamped off it:

```js
const base = 100 * (1 - gaps.gNorm);   // :128
```

`gNorm` is the share of the job's total weight that the candidate is missing
(`:56`). Nothing else feeds it.

## Why it is shaped this way

`base` is built entirely out of absence. It starts at 100 and gaps take points
away; no strength can put a point back. That asymmetry is the whole design —
strengths reach the number through exactly one narrow door, `EDGE_BONUS`, and
nowhere else.

## Hits

- `score`, at `:131`, before any guard runs.
- `EDGE_BONUS`, indirectly — the bonus is scaled by `(1 - base / 100)` (`:130`),
  so `base` decides how much of the bonus is delivered.
- `b.base` (`:210`), the receipt's third row (`render.js:227`). This is the only
  place in the report where the pre-guard number is visible.

## Does not hit

**The verdict directly. The wrong neighbour is `score`.**

The receipt prints both, one line apart, and they are routinely different
numbers. `base` is what the labels alone say; `score` is what survives the
bonus, the caps, the floor, and rounding. In the shipped demo: base **62**,
score **64**. Every band in `:176–179` reads `score`.

Also does not hit:

- **Anything, when there are no jdItems.** `gNorm` returns 0 when `total` is 0
  (`:56`), so `base` is **100** for an empty list. The confidence floor catches
  it — an empty run scores **65, Viable but Exposed, Apply with Caution** — but
  it is caught by the floor, not by the formula. `base` on its own reads a job
  with no requirements as a perfect match.
