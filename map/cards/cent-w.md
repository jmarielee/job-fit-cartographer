# CENT_W

**Type:** threshold
**State:** live
**Stage:** 3 — MATH
**Source:** `scoring.js:33` (declaration), read at `:43` (items), `:63` (strengths), `:97` (gate sort)

## What it is

How much something matters to what the job actually is:

```js
const CENT_W = { core: 1.0, supporting: 0.6, peripheral: 0.3 };   // :33
```

The busiest constant in the brain. Three readers, three different jobs.

## Why it is shaped this way

`peripheral` is 0.3 rather than 0 so that a missing side-detail registers
without punishing. Nothing in the table is zero: everything the job names counts
for something.

## Hits

- **Item weight** (`:43`), multiplied by `TIER_W` — feeds `G` and the total.
- **Strength mass `S`** (`:63`) — a raw sum, with no tier multiplier, because
  strengths have no tier. This is what `TIE_FACTOR` compares against `G`.
- **Which item becomes THE GATE** (`:97`), as the second sort key after status.

## Does not hit

**The bonus. The wrong neighbour is `EDGE_BONUS` (`scoring.js:35`).**

Both are keyed by the same three words, which is exactly the trap. `CENT_W`
turns a centrality into a *weight* and sums it. `EDGE_BONUS` turns a centrality
into *points* and takes only the highest one (`:64`). A fourth `supporting`
strength adds 0.6 here and adds nothing there. See `cards/edge-bonus.md`.

Also does not hit:

- **The required-gate cap.** `:71` tests the strings `'core'` and `'supporting'`
  directly. Weights are irrelevant to it.
- **Unrecognised centrality, consistently.** Items and strengths both fall back
  to `supporting` (`:43`, `:63`), but the gate sort uses `|| 0` (`:97`) and the
  bonus rank leaves `best` at `'none'` (`:64`). Same bad label, three different
  outcomes.

## If you change it

**This is the one table that moves both readings at once.** Edit `TIER_W` and
only the score moves. Edit `CENT_W` and the score moves *and* `S` moves, which
can flip `edgeVsGap`, which can flip the recommendation at `:184`. It is the
only constant in the brain with a path to both numbers.

**Widening the spread pushes gates around.** Because `:97` sorts by weight, a
larger gap between `core` and `supporting` makes it likelier that a core
`partial` outranks a supporting `missing` for the gate slot — changing what the
report names as the deal-breaker without changing the score at all.

### Receipt drift

Not printed. The receipt shows `G` and `S` (`render.js:225–226`) — the sums,
never the weights that built them.
