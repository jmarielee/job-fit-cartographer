# THE GATE

**Type:** computed value
**State:** live
**Stage:** 5 — VERDICT
**Source:** `scoring.js:76–83` (the intent), `:84–103` (`_identifyGate`), `:162` (call site), `:164–167` (the ceiling), `:192` (the demotion), `:213` (returned); displayed at `render.js:277–287`

## What it is

One requirement, picked out of the list, named as the thing most likely to end
the application before anyone weighs the rest. Not a score — a second,
independent reading of the same labels.

Four conditions to be eligible (`:86–91`):

```js
it.tier === 'required' &&
(it.centrality === 'core' || it.centrality === 'supporting') &&
(it.status === 'missing' || it.status === 'partial') &&
!it.obtainable
```

Then the survivors are sorted and the first one wins (`:94–102`): most severe
status, then most central, then heaviest combined weight.

## Why it is shaped this way

The score answers *how well do you match overall*. It cannot answer *what gets
you thrown out*, because a single blocking requirement is averaged away by six
met ones. The gate is the answer to the second question, and it is computed
rather than written so it cannot be softened.

`partial` counts on purpose (`:83`). "Stated but not demonstrated" is precisely
how people get screened out, so a half-met requirement is gate-eligible.
`obtainable` items are excluded because the job itself said they can be
acquired.

## Hits

- **The score, but only in one narrow case** (`:164–167`): a `core` gate whose
  status is `missing` clamps the score to `GATE_CORE_CEIL` (74). A `supporting`
  gate never clamps. A `partial` core gate never clamps — the partial already
  cost score in the base math.
- **`recommendation`, always** (`:192`): any live gate, core or supporting,
  demotes a clean `Apply` to `Apply with Caution`.
- **The gate flag on the page** (`render.js:277–287`), one of only two places
  `render` reads computed math.

## Does not hit

**The required-gate cap. The wrong neighbour is `reqMiss` (`scoring.js:68–75`).**

The two filters look almost identical and are not. Side by side:

| | statuses | needs | effect |
|---|---|---|---|
| `_requiredCoreMissing` | `missing` only | **2 or more** | score clamped to 45 |
| `_identifyGate` | `missing` **or `partial`** | **exactly one, the worst** | 74 ceiling, or none |

One counts, the other ranks. One ignores partials, the other treats them as the
signature case. A run can have a live gate and no cap, which is the shipped
demo.

Also does not hit:

- **`verdict`,** except through the score. The bands at `:176–179` never mention
  the gate.
- **The `Do Not Apply` path.** `:192` only rewrites `Apply`. A gate never makes
  a recommendation worse than caution, and never rescues a weak one — the
  comment at `:160–161` says so outright.
- **Preferred items, ever.** `:87` excludes them. A missing "nice to have"
  cannot be the deal-breaker no matter how central.

## In the shipped demo

The gate is **"Drives independent technical decisions at scale"** — required,
supporting, missing. Because it is `supporting` rather than `core`, no ceiling
fires. It still blocks a clean `Apply` at `:192`, though in this run the
recommendation was already `Apply with Caution` for other reasons, so the
demotion is invisible.
