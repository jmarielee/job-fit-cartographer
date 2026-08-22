# TIER_W

**Type:** threshold
**State:** live
**Stage:** 3 — MATH
**Source:** `scoring.js:32` (declaration), `scoring.js:42` (only read), inside `_itemWeight` (`:41–45`)

## What it is

How much a requirement counts, depending on whether the job says you must have
it or would like you to:

```js
const TIER_W = { required: 1.0, preferred: 0.35 };   // :32
```

Multiplied by `CENT_W` to give one item's weight (`:44`). Read in one place and
one place only.

## Why it is shaped this way

0.35 is low on purpose. A missing "nice to have" should cost something —
enough to show in the total — without ever reading as a blocker. The system
prompt says it outright: a preferred gap is friction, never a disqualifier
(`scoring.js:264`).

## Hits

- Every item's weight (`:44`), which feeds both the gap mass `G` and the total
  `Σw` (`:49–50`).
- `base`, through `gNorm`.
- The gate's final tiebreak (`:99`), when two candidate gates match on status
  and centrality.

## Does not hit

**Strengths. The wrong neighbour is `CENT_W` (`scoring.js:33`).**

The two sit one line apart and get multiplied together on `:44`, which is why
they blur. But `CENT_W` is read three times — items (`:43`), strengths (`:63`),
and the gate sort (`:97`) — while `TIER_W` is read once, at `:42`. Strengths
have no tier. A strength is never required or preferred; only a job's demands
are.

Also does not hit:

- **The required-gate cap or THE GATE's eligibility.** Both test the literal
  string `it.tier === 'required'` (`:70`, `:87`), not the weight. Setting
  `preferred: 1.0` would make preferred items cost as much as required ones in
  the score and still leave them unable to trigger a cap or become the gate.

## If you change it

**Raising `preferred` breaks the framing, not just the arithmetic.** The report
tells the candidate a preferred gap is neutralisable friction. Push 0.35 toward
1.0 and the number stops agreeing with the words, silently — the score drops
and no field on the page explains why.

**An unrecognised tier is treated as `required`.** `:42` falls back to
`TIER_W.required`, the harsher of the two. A typo in a label costs the
candidate the full 1.0. Compare `STATUS_F`, whose fallback runs the other way.

### Receipt drift

None of these weights is printed anywhere. The receipt shows `G` (`render.js:225`)
and the base formula (`:227`) — the product, never the factors. Change this
table and every number on the receipt moves with no visible cause.
