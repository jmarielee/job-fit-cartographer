# centrality

**Type:** object
**State:** live · model-labeled
**Stage:** labels
**Source:** rule at `scoring.js:260`; weighted by `CENT_W`, `scoring.js:32`

---

## What it is

Core, supporting, or peripheral — judged against what **this** role
primarily exists to do.

`scoring.js:260` adds a domain rule: a tool or framework is usually
peripheral for a judgment or design role.

## Why it is shaped this way

The same item means different things in different roles. Figma is core for
a production designer and peripheral for a design director. Without
centrality, a job description's incidental tooling list would weigh the
same as its actual purpose.

## Hits

- `CENT_W` weighting — core 1.0, supporting 0.6, peripheral 0.3.
- `base`, through gap mass.
- **`CAP_VALUE`** — `_requiredCoreMissing` counts only core and supporting.
  A missing required *peripheral* item never counts toward the cap.
- **`GATE_CORE_CEIL`** — the same filter, plus one more: only a **core**
  gate triggers the 74 ceiling. A supporting gate is named as the gate and
  caps nothing.
- `EDGE_BONUS` — on strengths, centrality selects the bonus tier: core +12,
  supporting +6, peripheral +0.

## Does not hit

- **The confidence floor** or **`REALISM_CEIL`**. Neither reads labels.
- **`TIE_FACTOR`** — the wrong neighbour on the strengths side. Centrality
  sets how much a strength weighs in `S`. `TIE_FACTOR` sets how much `S`
  must exceed `G` to count as dominance. One changes the number, the other
  changes the test. They never touch.

## If you change it

Peripheral to core on a required missing item is the single largest
change available to a label. It raises the weight from 0.3 to 1.0, makes
the item eligible for the cap count, and makes it eligible to trigger the
74 ceiling as a core gate.

One label edit can move a run from "Strong Candidate" to a capped 45.
