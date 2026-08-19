# Corrections — inventory errors caught before shipping

Recorded as they happened. Not cleaned up after.

The protocol in `PROTOCOL.md` requires that a ghost be proven by search
rather than asserted. Running those searches corrected four of my own
claims. Three were mine; one was a card I had already written.

---

## C1 — "Guard 2 is missing" — WRONG

**Claimed:** `scoring.js` comments number guards 1 and 3 with nothing
between them, so a Guard 2 was deleted. Filed as a ghost.

**Search that corrected it:**
```
grep -n "Guard" operator/rules.md
→ Guard 1 required-gate cap
→ Guard 2 confidence floor
→ Guard 3 core-gate ceiling
```

**Actual:** No guard is missing. All three run. The `scoring.js` comments
call the confidence floor "Guard 3" and leave the core-gate ceiling
unnumbered — the code's comment numbering drifted from the spec's.

**Resolution:** ghost card deleted. Replaced with `cards/guard-numbering.md`,
state `drift`.

---

## C2 — "operator/ is a ghost" — HALF WRONG

**Claimed:** a folder of scoring rules the app cannot read, therefore a ghost.

**Verification run:** recomputed the demo case by hand from `DEMO_DATA`
through `computeScore` and compared against `operator/examples.md`.

| Value | operator/examples.md | recomputed |
|---|---|---|
| base | 62.2 | 62.19 |
| bonus | +2.3 | +2.27 |
| cap fires | no (needs 2+) | no (1 missing) |
| score | 64 | 64 |
| routing | Apply with Caution | Apply with Caution |

**Actual:** the app genuinely cannot read the folder — that part held. But
the files are **accurate**. `rules.md`, `identity.md`, and
`evaluator-personas.md` describe the running system correctly.

That makes it a **leftover**, not a ghost, and a more dangerous one: an
obviously stale file is harmless, a correct file that does nothing is not.

**Resolution:** state changed to leftover. Card rewritten to say the
contents check out.

---

## C3 — one file inside operator/ IS a ghost — MISSED ENTIRELY

**Found while verifying C2.** `operator/reference/scoring-rubric.md` is a
near-duplicate of `operator/rules.md` with `GATE_CORE_CEIL` and Guard 3
absent. It describes a two-guard system that no longer exists.

Two generations of drift in one folder. The original inventory treated the
folder as uniform and missed it.

**Resolution:** new card, `cards/scoring-rubric-file.md`, state ghost.

---

## C4 — "TIE_FACTOR does not hit the display" — WRONG

**Claimed, in the first version of `cards/tie-factor.md`:** changing
`TIE_FACTOR` moves no number on screen.

**Search that corrected it:**
```
grep -n "1\.3" render.js
→ 209:  const domTest = `S ${S} vs 1.3×G ${(1.3 * G).toFixed(2)} → ${domWord}`;
```

**Actual:** the Score Receipt hardcodes `1.3` rather than reading
`TIE_FACTOR`. Lines 212–214 hardcode `90`, `45`, and `74` the same way.

Change any threshold and the receipt keeps printing the old value **and
computes the dominance test with it** — the receipt disagrees with the
system while claiming to show its work.

**Resolution:** every threshold card gains a receipt-drift line.
New card: `cards/score-receipt.md`.

---

## C5 — the decision order was wrong — STRUCTURAL

**Claimed:** five stages — labels, math, guards, verdict, display. The
Evidence Ledger was filed under display as "shows the math in the open."

**Source that corrected it:** `render.js:556`

The Evidence Ledger is the human-audit stage *between* labeling and scoring.
It carries live controls for tier, centrality, and status, a checkbox for
obtainable, consensus chips reading UNANIMOUS / SPLIT / OPERATOR, and it
recomputes on every change.

It is not display. It is a stage, and it is the stage where the
human-in-the-loop actually lives.

**Resolution:** catalog rebuilt with six stages. Ledger promoted to its own
group with six cards.

---

## What this changes about the map

Four of the five corrections came from the same root cause: `operator/` is
the original specification build and the root JS files are a later
standalone site. The spec stayed put and the implementation moved.

That lineage is now stated at the top of `catalog.md`, because a reader who
does not know it will trust the wrong file every time.
