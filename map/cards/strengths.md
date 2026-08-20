# strengths

**Type:** object
**State:** live · model-labeled
**Stage:** labels
**Source:** rule at `scoring.js:263`; consumed by `_computeStrength`,
`scoring.js:58`

---

## What it is

The candidate's real strengths for this role. Each carries `centrality` and
`mapsToNeed`. Unlike `jdItems`, there is no `tier` and no `status` — a
strength is something the candidate has, so those dimensions do not apply.

## Why it is shaped this way

Gaps alone would make every application look like a list of deficits. The
strengths array is the only channel through which something the candidate
brings can raise the number.

That channel is deliberately narrow. See below.

## Hits

- `S`, the strength mass, summed from `CENT_W` over mapped strengths.
- `str.best`, the single highest-centrality mapped strength, which selects
  the `EDGE_BONUS` tier.
- `edgeVsGap`, via `S` versus `G`.
- `recommendation`, indirectly — a clean "Apply" needs edge dominance.

## Does not hit

- **`base`. At all.** This surprises most readers. `_computeGaps` reads
  only `jdItems`; the base score is entirely a function of what is missing.
  Strengths enter the score exclusively through `EDGE_BONUS`, which takes
  the *single best* mapped strength and scales it by remaining headroom:
  `bonus × (1 - base/100)`. Ten excellent strengths and one excellent
  strength produce **the same bonus**.
- **Any cap, floor, or ceiling.** All four guards read `jdItems` and input
  lengths. No guard has ever read a strength.
- `strategicBrief.credibility` — the wrong neighbour. A narrative list of
  the candidate's strengths, written by the adversarial voice for the
  report. Same subject, no connection to the math. A strength can appear
  there and be absent from this array entirely.

## If you change it

Adding strengths barely moves the score. The headroom scaling and the
single-best rule are both designed to prevent strength inflation from
rescuing a gated application — `operator/rules.md` states it plainly: the
cap and bands keep the bonus from rescuing a gated case.

What strengths *can* do is flip `edgeVsGap` to `edge`, which is the
difference between "Apply with Caution" and a clean "Apply" on a run that
already scores 55 or better.
