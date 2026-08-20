# edgeVsGap

**Type:** computed value — the threshold that produces it lives in `cards/tie-factor.md`
**State:** live
**Stage:** 3 — MATH
**Source:** `scoring.js:110–114` (`_edgeVsGap`), `scoring.js:171` (call site), `scoring.js:184` (only consumer), `scoring.js:212` (returned); displayed at `render.js:207–209, 219`

## What it is

A three-valued label — `edge` / `gap` / `balanced` — decided by which mass is
louder than the other by a margin:

```js
function _edgeVsGap(S, G) {
  if (S > TIE_FACTOR * G) return 'edge';   // :111
  if (G > TIE_FACTOR * S) return 'gap';    // :112
  return 'balanced';                        // :113
}
```

Called at `:171` with `str.S` and `gaps.G`.

## Why it is shaped this way

The score already answers *how much is missing*. It cannot answer *which side of
the ledger is louder*, because strengths barely enter it — the base is pure
absence and the bonus is one scaled lookup. `edgeVsGap` is the second reading of
the same two masses, and it is the only strength-side signal permitted to change
what the report recommends without changing what it scores.

The 1.3 margin exists so that near-ties resolve to `balanced` rather than
flipping on noise. A resume that is 51/49 strengths-to-gaps is not a resume with
an edge.

## Hits

- **`recommendation`, one branch only:**

  ```js
  if (score >= 55) {
    recommendation = (vote.apply >= 2 && evg === 'edge') ? 'Apply' : 'Apply with Caution';  // :184
  }
  ```

  This is the sole place in the codebase where the value is read for a decision.
- `_brain.edgeVsGap` (`:212`) → the Score Receipt's dominance row (`render.js:207–209`)
  and routing string (`render.js:219`).

## Does not hit

**The score. The wrong neighbour is `EDGE_BONUS` (`scoring.js:35`).**

`edgeVsGap` is computed at `:171` — *two lines after* `score = Math.round(score)`
at `:169`. It is structurally incapable of moving the number; by the time it
exists, the number is final. `EDGE_BONUS` is the mirror image: computed at `:129`,
before everything, moves the number, and never appears in the recommendation
branch at `:184`. One term per direction. See `cards/edge-bonus.md`.

Also does not hit:

- **`verdict`.** Score bands only (`:176–179`). A resume can be labelled `edge`
  and still read `Long Shot`.
- **The 45–55 branch.** `:186` tests `vote.apply` alone. Below 55, dominance is
  not consulted.
- **Anything, when the value is `gap`.** Line `:184` tests `=== 'edge'` and
  nothing else. `gap` and `balanced` are behaviourally identical everywhere in
  the system. The `gap` return at `:112` is live code with no consequence — it
  exists to be printed as "gaps dominate" at `render.js:208`. It is a
  distinction in the display, not in the math.
- **The recommendation, whenever a gate is live.** The demotion at `:192`
  (`if (gate && recommendation === 'Apply')`) fires after `:184` and overwrites
  the one outcome `edge` can produce. In the shipped demo this is already true:
  2/3 apply leans, `S` = 1.8 against a 1.976 threshold — 0.18 short of `edge` —
  and even if it cleared, the live supporting gate would demote `Apply` back to
  `Apply with Caution`. The demo's output is invariant to this value entirely.

## Receipt drift

`render.js:209` writes the margin as a literal instead of reading `TIE_FACTOR`:

```js
const domTest = `S ${S} vs 1.3×G ${(1.3 * G).toFixed(2)} → ${domWord}`;   // render.js:209
```

Two hardcodings in one line — the label `1.3×G` and the multiplication that
produces the printed product. Change `scoring.js:39` and the receipt will report
the old threshold *and* the wrong number, while the verdict it explains was
decided by the new one. Same fault class as the `90` / `45` / `74` literals at
`render.js:212–214`.
