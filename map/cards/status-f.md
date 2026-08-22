# STATUS_F

**Type:** threshold
**State:** live
**Stage:** 3 — MATH
**Source:** `scoring.js:34` (declaration), read at `:51` and `:53`, applied at `:54`

## What it is

What a gap costs, as a fraction of the item's weight:

```js
const STATUS_F = { missing: 1.0, partial: 0.5, meets: 0.0 };   // :34
```

`meets` is 0 — a requirement you satisfy costs nothing. `missing` is the full
weight. `partial` is exactly half.

## Why it is shaped this way

Half is a deliberate refusal to argue. There is no evidence for 0.4 or 0.6, and
any number in between would be invented precision on top of a label a model
assigned. Half says: this counts, and we are not pretending to know how much.

## Hits

- `G`, the gap mass (`:54`), and through it `base` and the whole score.

That is the entire list. One reader, one line.

## Does not hit

**Which items can be capped or gated. The wrong neighbour is `obtainable`
(`scoring.js:53`).**

`obtainable` is the only thing that overrides this table:

```js
if (it.obtainable && it.status === 'missing') sf = STATUS_F.partial;   // :53
```

A `missing` item the job says you can acquire is charged the `partial` rate
instead. The label on the page still reads `missing`; the arithmetic quietly
does not. That rewrite happens here, not in the labelling. See
`cards/obtainable.md`.

Also does not hit:

- **THE GATE's eligibility or the required-gate cap.** Both test status strings
  directly (`:72`, `:89`) and never consult the weights.

## If you change it

**`partial` is the load-bearing one.** `missing` at 1.0 and `meets` at 0.0 are
the ends of the scale; moving them rescales everything and changes no ranking.
Moving `partial` changes which candidates cross a band, because "stated but not
demonstrated" is the most common label on a real resume.

**An unrecognised status costs nothing at all.** `:51` falls back to `0` — the
`meets` rate. A typo in a label is scored as though the candidate satisfied the
requirement. This runs opposite to `TIER_W`, whose fallback is the harshest
option (`:42`). Same kind of bad input, opposite bias, neither one throws.

### Receipt drift

Not printed. Only the resulting `G` appears (`render.js:225`).
