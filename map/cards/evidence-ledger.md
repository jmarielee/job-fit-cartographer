# Evidence Ledger

**Type:** ghost
**State:** ghost — built, removed, display layer orphaned
**Stage:** ledger (between labels and math)
**Source:** `render.js:555–680`, `index.html:140–163`, `styles.css`

---

## What the name suggests

The human-audit stage between labeling and scoring. `render.js:556–559`
states it in the file's own words: the model extracts, the vote stabilizes,
the human corrects, and the math scores only what the ledger says — every
control re-running `computeScore` locally, with no API call.

A reader will take that comment as a description of running behaviour. It
is a description of behaviour that ran for ten days in July.

## Proof of absence

Three searches, each independently sufficient.

**1. The entry point is never called.**
```
grep -n "renderLedgerSection" render.js app.js scoring.js index.html
→ render.js:663 (the definition)
→ no call sites
```
It is the only function in this codebase that is defined and never invoked.
All 26 others resolve — including `copyOpener`, `saveApiKey`, and
`resetToInput`, which are wired through `addEventListener` in `app.js:136–140`.

**2. Its dependencies do not exist.**
```
grep -n "RUN\b\|applyLedgerEdit\|ledgerScore\|LAST_REPORT" *.js *.html
→ every hit is inside render.js:597–680
→ no declaration anywhere
```
`index.html:327–331` loads exactly three scripts. None declares them.

**3. The section can never become visible.**
`index.html:140` carries inline `style="display:none"`. The only line that
clears it is `render.js:678` — inside the function that never runs.

## Why a reader will trip on it

If `renderLedgerSection()` were called, the page would throw a
`ReferenceError` on `RUN` immediately and the failure would be obvious.

The missing call is what keeps it quiet. A dead subsystem with a broken
entry point announces itself. This one has no entry point at all.

## The death certificate

| | |
|---|---|
| Built | 2026-07-04, commit `580d613` |
| Removed | 2026-07-14, commit `09d4ab3` |
| Lifespan | 10 days |

`580d613` added 152 lines to `render.js`, the ledger engine to `scoring.js`,
the UI block to `index.html`, and 115 lines to `styles.css`.

`09d4ab3` touched **one file**. `scoring.js` went from 456 lines to 80
insertions against 376 deletions. The scoring brain survived — `CAP_VALUE`,
`GATE_CORE_CEIL`, and `computeScore` all carried over. Everything from the
ledger state layer down was cut.

`render.js` was not in that commit. That is why the display half is still
here.

**Whether the removal was deliberate is not established by this map.** What
is established is which commit did it and what it took.

## Recovering it

```
git show 09d4ab3^:scoring.js
```

| Identifier | Line in the recovered file |
|---|---|
| `RUN` | 464 |
| `LAST_REPORT` | 465 |
| `ledgerScore()` | 467 |
| `RUN` populated | 507 |
| `applyLedgerEdit()` | 567 |
| edit → re-vote → re-score → re-render | 586–596 |

## Hits

Nothing. It does not run.

## Does not hit

- **The score.** `computeScore` is complete and correct without it. Every
  run produces a number the same way it always did.
- **`buildScoreReceipt`** — the wrong neighbour, and the one a reader will
  reach for. Both are "showing the work." The Score Receipt
  (`render.js:185`) is live, renders on every run, and is read-only. The
  Ledger was interactive and is dead. They are unrelated code paths that
  share a purpose.
- **The three evaluators.** The committee is model-produced and never passed
  through the ledger.

## What this means for the system's claims

`index.html:162` states in visible page markup that three independent
readings labeled the evidence and the majority decided each label.

That sentence describes the ledger. The ledger does not run. The sentence
never renders either — it sits inside the hidden section — so no user of the page has been shown it. 
The repo's front page is another matter — see job-fit/README.md:27. But a reader of the source will find it and
believe it.

**"Model labels, math decides" is intact and verified.** `computeScore`
overwrites the model's `survivabilityScore` on every run. The
human-in-the-loop leg is the part that was removed.

## What to do instead

To restore it: recover the state layer from `09d4ab3^:scoring.js` lines
464–600 and add the `renderLedgerSection()` call to `render()`.

To remove it cleanly: delete `render.js:555–680`, `index.html:140–163`, and
the ledger styles. Leaving it in place is what makes it a tripwire.
