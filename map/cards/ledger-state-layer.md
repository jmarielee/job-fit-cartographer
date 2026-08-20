# RUN · LAST_REPORT · ledgerScore · applyLedgerEdit

**Type:** ghost
**State:** ghost — four identifiers referenced, none declared
**Stage:** ledger
**Source:** referenced at `render.js:600, 638, 665, 667, 673, 677`

---

## What the names suggest

The state layer behind the Evidence Ledger.

- `RUN` — the current run: job description, resume, cache key, ledger.
- `LAST_REPORT` — the rendered report, held so it can be re-scored in place.
- `ledgerScore()` — recompute from current ledger labels.
- `applyLedgerEdit()` — apply one human correction and re-run the math.

## Proof of absence

```
grep -n "RUN\b\|applyLedgerEdit\|ledgerScore\|LAST_REPORT" scoring.js render.js app.js index.html
→ 11 hits, all between render.js:600 and render.js:677
→ zero declarations
```

`index.html:327–331` loads `scoring.js`, `render.js`, `app.js` and nothing
else. No fourth script, no module import, no inline block declares them.

## Why a reader will trip on it

These read as globals defined in a file the reader hasn't opened yet. That
is a reasonable assumption in a three-script page with shared globals —
`CAP_VALUE` and `GATE_CORE_CEIL` genuinely do work that way, declared in
`scoring.js` and used in `render.js:656–657`.

So the pattern is real. These four just aren't part of it.

A reader who assumes they exist will conclude the ledger works and that
something else is preventing it from showing.

## They did exist

Recoverable from `09d4ab3^:scoring.js`:

```
464  let RUN = null;         // { jd, resume, cacheKey, ledger }
465  let LAST_REPORT = null; // live re-scored when the ledger is edited
467  function ledgerScore() {
507    RUN = { jd, resume, cacheKey, ledger: null };
567  function applyLedgerEdit(kind, index, field, value) {
586    if (LAST_REPORT) { ...re-vote, re-score, render(LAST_REPORT) }
```

Lines 586–596 are the loop that made the ledger a decision surface rather
than a display: edit a label → recompute the vote → run `computeScore` →
re-render. No API call.

## Hits

Nothing. They are not present at runtime.

## Does not hit

- **`computeScore`.** Complete and self-contained in the current
  `scoring.js`. It never referenced these.
- **`DEMO_DATA` and `runDemo`.** The demo builds its own `_vote` array in
  `app.js:70` and calls `computeScore` directly, bypassing this layer
  entirely. That is why the demo still works.
- **`CAP_VALUE` / `GATE_CORE_CEIL`** — the wrong neighbours. Also globals
  declared in `scoring.js` and used in `render.js`. Those survived the
  July 14 replacement. These did not. Same pattern, opposite outcome.
