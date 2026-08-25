# mapsToNeed

**Type:** object
**State:** live
**Stage:** labels · model-labeled
**Source:** schema at `scoring.js:302`; filtered in `_computeStrength`, `scoring.js:62`

---

## What it is

A flag on each strength: true only if the strength answers a real need
stated in the job description. Strengths that do not map are excluded from
the strength mass `S` entirely.

`scoring.js:263` states the rule: *mapsToNeed (true only if it answers a
real JD need).*

## Why it is shaped this way

A candidate's genuine strengths are not automatically relevant. Without the
flag, impressive but unrelated experience would inflate `S`, flip
`edgeVsGap` to `edge`, and earn a clean "Apply" on a role the strength has
nothing to do with.

## The schema forbids the value the filter tests for

`_computeStrength` opens with a guard:

```js
if (!s.mapsToNeed) return;
```

The schema the model is handed cannot produce a strength that fails it.
Compare the two booleans in the same template at `scoring.js:302`:

```
"obtainable":boolean          ← the model chooses
"mapsToNeed":true             ← a literal
```

Every other boolean field in that schema is declared as `boolean`. This one
is written as the value `true`. A model following the template emits `true`
on every strength.

The prose instruction at line 263 says to use judgment. The schema at line
302 says the answer is always true. **When a schema and a prose instruction
disagree, the schema usually wins** — it is the thing being pattern-matched.

## Hits

- `S`, the strength mass, in `_computeStrength`.
- `edgeVsGap`, indirectly — `S` is one of its two inputs.
- `recommendation`, indirectly — a clean "Apply" requires edge dominance.

## Does not hit

- **`base`, and therefore the bulk of the score.** Strengths only reach the
  score through `EDGE_BONUS`, which takes the single *best* mapped strength
  and scales it by remaining headroom. `S` itself never enters the base
  calculation. Verify: `_computeGaps` reads only `jdItems`.
- **Any cap or floor.** `CAP_VALUE`, `GATE_CORE_CEIL`, and the confidence
  floor read `jdItems` and input lengths. None reads a strength.
- `centrality` on the same strength — the wrong neighbour. Both are strength
  fields and both affect `S`. `centrality` sets the weight; `mapsToNeed`
  decides whether the weight is counted at all. Setting centrality to
  `peripheral` still contributes 0.3. Setting `mapsToNeed` false contributes
  nothing.

## If you change it

Making the schema honest — `"mapsToNeed":boolean` — would activate a filter
that has likely never fired. Some strengths would stop counting, `S` would
fall, `edgeVsGap` would tip toward `balanced` more often, and clean "Apply"
recommendations would become rarer.

That is a real behaviour change produced by a one-word edit to a string.

**This map does not claim the current behaviour is wrong.** It claims the
filter and the schema disagree, and that a reader changing one should know
about the other.
