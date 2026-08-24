# REALISM_CEIL

**Type:** threshold
**State:** live · computed
**Stage:** math
**Source:** `scoring.js` — declared with the scoring constants, applied in
`computeScore` via `Math.min`

---

## Current value

`90`

## What it is

A hard ceiling on the score before any guard runs. No application scores
above 90, regardless of how completely the candidate matches.

## What it gates

Whether the system is ever permitted to describe an application as a sure
thing.

## Why it is shaped this way

The score measures survivability, not merit. Even a perfect match faces a
hiring committee, an internal candidate, a budget, and a room the candidate
cannot see. A 100 would claim knowledge the system does not have.

## Hits

- `score` — capped at 90 before bonus adjustment, caps, and floors.
- Nothing else directly. Every downstream effect flows through `score`.

## Does not hit

- **The floor.** This is a ceiling only. A perfect-match application is
  capped; a hopeless one is untouched.
- **`EDGE_BONUS`.** The bonus is applied first and is itself scaled by
  `(1 - base/100)`, so a strong base already suppresses the bonus. The
  ceiling is a second, independent limit.
- **The verdict bands.** "Strong Candidate" opens at 75, well below this
  ceiling, so the ceiling never changes which band a run lands in.

## If you change it

Raising it toward 100 changes almost nothing in practice — the bonus
scaling already makes scores near 100 nearly unreachable. The number is a
statement of posture more than a mechanism: it is the system saying out loud
that it does not know the room.

Lowering it compresses the top of the range and pushes strong candidates
toward the "Viable but Exposed" boundary at 75.
