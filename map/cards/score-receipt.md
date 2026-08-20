# Score Receipt

**Type:** object
**State:** live · computed
**Stage:** display
**Source:** `render.js:185` — `buildScoreReceipt(d)`, called at `render.js:290`

---

## What it is

The read-only proof panel. It prints the gap mass, the strength mass, the
dominance test, and which guards fired, so a reader can check the number
rather than trust it.

It is the surviving half of "show your work." The interactive half — the
Evidence Ledger — was removed on 2026-07-14. See `cards/evidence-ledger.md`.

## Why it is shaped this way

The score is computed, not generated. The receipt is what makes that
claim checkable by a user who cannot read the source.

## Hits

- Nothing downstream. It is terminal — it reads `_brain` and writes DOM.

## Does not hit

- **The score.** It reports; it does not compute. Editing the receipt
  changes no verdict.
- **The Evidence Ledger** — the wrong neighbour. Both exist to show the
  work. This one runs on every report and is read-only; the ledger was
  interactive, recomputed on edit, and is dead. Unrelated code paths.

## The receipt reports stale thresholds

**This is the defect worth knowing about.**

`render.js:209–214` hardcodes four threshold values as literal text rather
than reading the constants:

```
209  `S ${S} vs 1.3×G ${(1.3 * G).toFixed(2)} → ${domWord}`
212  `realism ceiling 90 — ...`
213  `required-gate cap 45 — ...`
214  `core-gate ceiling 74 — ...`
```

Line 209 is the worst of the four: it does not merely *print* 1.3, it
**recomputes the dominance test with the literal 1.3** rather than with
`TIE_FACTOR`. Change the constant and the receipt shows a different test
than the one that decided the recommendation.

Change `CAP_VALUE` to 40 and the receipt still says `required-gate cap 45`,
while the score is clamped to 40.

The panel whose purpose is proving the math is honest is the one place the
displayed numbers can drift from the running ones.

## Contrast worth noting

`updateLedgerPreview` at `render.js:656–657` does this correctly —
`${CAP_VALUE}` and `${GATE_CORE_CEIL}`, read from the constants.

The dead code is right. The live code is stale. A reader who copies the
pattern from the visible panel will copy the bug.

## Recommended fix, outside the map

Replace the four literals with the constants. Four edits in one function.
The map only reports.
