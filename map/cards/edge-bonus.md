# EDGE_BONUS

**Type:** object
**State:** live
**Stage:** 3 — MATH
**Source:** `scoring.js:35` (declaration), `scoring.js:58–67` (`_computeStrength`), `scoring.js:129–131` (application), `scoring.js:210` (returned as `bonus`)

## What it is

A lookup table from **one** strength to a number of points:

```js
const EDGE_BONUS = { core: 12, supporting: 6, peripheral: 0, none: 0 };   // :35
```

Not a sum. `_computeStrength` walks the strengths list twice over in one pass:
it accumulates `S` (`:63`) and it tracks `best` — the highest centrality seen
(`:64`). `EDGE_BONUS` reads **only `best`**. Ten mapped core strengths and one
mapped core strength produce the identical bonus.

It is then scaled before it lands:

```js
const bonus          = EDGE_BONUS[str.best] || 0;        // :129
const effectiveBonus = bonus * (1 - base / 100);         // :130
let score = Math.min(REALISM_CEIL, base + effectiveBonus); // :131
```

## Why it is shaped this way

The base score is built entirely out of absence: `100 × (1 − G/Σw)` (`:128`).
Gaps subtract; nothing in that formula lets a resume add. `EDGE_BONUS` is the
only route strengths have into the number at all.

It is a single lookup rather than a sum because a summed bonus would let a pile
of small mapped strengths outweigh a missing required core item — the exact
inversion the whole scoring brain exists to prevent. It is scaled by headroom
(`:130`) so that it can lift a candidate who is close, and cannot manufacture
one who is not.

## Hits

- `bonus` in `_brain` (`:210`), displayed in the Score Receipt at `render.js:228`.
- `score`, via `effectiveBonus` (`:130–131`).
- `verdict`, indirectly — the score bands at `:176–179` are the only consumer.
- `recommendation`, indirectly, through the same score (`:183–189`).

That is the whole list.

## Does not hit

**`edgeVsGap` — the wrong neighbour is `TIE_FACTOR` (`scoring.js:39`).**

These two are the only strength-side terms in the brain and they sit four lines
apart in the constants block, which is exactly why they get confused. They read
different products of the same loop:

| | reads | line | moves |
|---|---|---|---|
| `EDGE_BONUS` | `str.best` — max centrality | `:64` | the score |
| `TIE_FACTOR` | `str.S` — the sum | `:63` | `edgeVsGap`, never the score |

Add a fourth `supporting` strength to a resume: `S` rises by 0.6 and can flip
`edgeVsGap`; `best` is still `supporting` and the bonus is still 6. Nothing about
the number changes.

Also does not hit:

- **THE GATE, the required-gate cap, the confidence floor.** All three run *after*
  line 131 and can delete the bonus outright — `CAP_VALUE` at `:139`, the
  40–65 clamp at `:150`, `GATE_CORE_CEIL` at `:165`.
- **Unlabeled strengths.** `mapsToNeed` is checked at `:62` before either `S` or
  `best` is touched. A strength that doesn't map contributes to neither.
- **Unknown centrality strings — and here the two terms diverge silently.**
  `S` defaults an unrecognised centrality to `CENT_W.supporting` (`:63`), but
  `rank[unknown] > rank[best]` is `false` (`:64`), so `best` stays `'none'` and
  `EDGE_BONUS['none']` is 0. A strengths list with all-malformed centrality
  values produces a positive `S` and a zero bonus. Neither path throws.

## If you change it

**The face value never lands.** In the shipped demo (`app.js:54`): base 62.19,
`best` = `supporting`, face bonus 6, delivered **2.27**, final score **64**.
The receipt shows 6.

**Raising it does far less than the number suggests.** Set `supporting: 30` —
two and a half times its current value — and the demo moves from 64 to 74. Still
`Viable but Exposed`. The value required to push that one demo across the 75 band
is ≈ 33.

**The band it can actually move is not the one you'd expect.** Because the
scaling is inverted, the bonus pays most to the weakest candidates: at base 30,
`core: 12` delivers 8.4; at base 90 it delivers 1.2. To cross 75 from below you
need base ≥ 71.59 with `core`, or ≥ 73.40 with `supporting`. Its real leverage
lives at the 35 and 55 boundaries — it rescues Long Shots, it does not make
Strong Candidates.

**`peripheral` and `none` are the same key.** Both 0 (`:35`). A candidate whose
only mapped strengths are peripheral is scored identically to a candidate with
no mapped strengths whatsoever. Making `peripheral` nonzero is the only edit here
that changes *which candidates the bonus reaches* rather than how much it pays.

### Receipt drift

`EDGE_BONUS` is **not** one of the four constants the Score Receipt hardcodes —
`render.js:228` reads `b.bonus` from the brain, honestly. The drift here is a
different fault: it prints the **face** value, not the delivered one.

```js
row('Edge bonus', '+' + b.bonus + ' max, scaled by headroom')   // render.js:228
```

`effectiveBonus` is a local at `:130`, never returned at `:210`, never displayed.
So the receipt's arithmetic does not close and cannot be made to: it shows
base 62, bonus +6, final 64. The words "scaled by headroom" are doing the work
of a missing row. Editing `EDGE_BONUS` updates the receipt correctly and leaves
it just as unreconcilable.

> Compare `cards/tie-factor.md` (the hardcoded-`1.3` drift) and
> `cards/score-receipt.md` (the 90/45/74 literals at `render.js:212–214`).
> This card is the exception to that pattern, not an instance of it.
