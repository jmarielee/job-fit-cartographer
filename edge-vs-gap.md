# edgeVsGap

**Type** computed value (three-valued, used as two)
**State** live
**Stage** 3 — math
**Source** `scoring.js:110–113` defined · `:171` called · `:212` returned · `:184` read · `render.js:207–208, :219` displayed

---

## What it is

One word — `edge`, `gap`, or `balanced` — from comparing strength mass `S`
against gap mass `G` with `TIE_FACTOR` as the required margin. Not a score, not
a verdict, not a component of either.

## Why it is shaped this way

**A margin, not a plain `>`.** Both branches at `:111–112` demand strict
dominance by 1.3×; anything narrower falls through to `balanced`. Two
near-equal masses are treated as a real state rather than a tie to be broken.

**Computed after everything it cannot affect.** `:171` runs after the score is
rounded at `:169` and after both caps have fired (`:139`, `:165`). Its inputs
are the raw masses `str.S` and `gaps.G`, never the score. No guard can change
it; it can change no guard.

**The two masses are not on the same scale.** `G` is normalized only for `base`
(`:56`, `:128`); the comparison at `:111–112` uses the unnormalized values. `S`
sums `CENT_W` over mapped strengths with no tier weight (`:63`); `G` sums
tier × centrality × status over JD items (`:46–55`). This is a relative-mass
heuristic within one run, not a figure that compares across runs.

## Hits

- Exactly one decision: the clean `"Apply"` at `:184`, and only jointly with
  `score ≥ 55` and `vote.apply ≥ 2` — after which `:192` can still downgrade it
  if a gate is live.
- Two display strings in the collapsed receipt (`render.js:207–208`, `:219`).

That is the whole surface. Nothing else reads it.

## Does not hit

**Wrong neighbour: `EDGE_BONUS`** (`scoring.js:35`, `cards/edge-bonus.md`).
Same word, opposite reach. `edgeVsGap` never adds or removes a point — the
score is final at `:169` before this is computed. Its neighbour moves the number
and never the label; this moves the label and never the number.

**Second wrong neighbour: `vote` / `committeeNote`** (`:115–123`, `:194–205`).
Both feed the same line at `:184`, but only `vote` reaches the reader in plain
text. `edgeVsGap` is invisible outside a collapsed `<details>`.

Also not `verdict` (`:176–179` is score bands only), not `divergent` (`:207`,
ghost — `cards/divergent.md`), not the gate (`:84–103`).

## The surprise

`gap` and `balanced` are the same value to the system. `:184` tests only
`=== 'edge'`; nothing anywhere tests for `'gap'`. The three-way distinction
survives solely as a word in the receipt (`render.js:207–208`).

Empty inputs read as `balanced`: with `S = 0` and `G = 0` neither strict branch
at `:111–112` is satisfied.

## If you change it

The constant has its own card — `cards/tie-factor.md`. What belongs here:

- Raising `TIE_FACTOR` makes `edge` rarer and a clean *Apply* rarer, without
  moving a single score.
- Lowering it toward 1.0 makes `edge` nearly free and still cannot produce
  *Apply* while a gate is live (`:192`) — and `_identifyGate` returns non-null
  for any required core/supporting item at `partial` or worse (`:86–91`), which
  is most real runs.

**Receipt drift:** `render.js:209` hardcodes `1.3` twice — once as the literal
printed in the label, once inside `(1.3 * G)`. Change the constant and the
receipt both states and computes the old margin, printed directly beside a
`domWord` (`:207–208`) derived from the real one. The same line can display a
comparison that contradicts its own conclusion.
