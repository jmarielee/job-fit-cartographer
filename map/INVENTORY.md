# INVENTORY — the four sweeps, as they ran

`../cartographer/rules.md` forbids writing a card before the noun list
exists and every noun has a state. This file records that step. It does
not restate the results — the catalog holds those, and a second list
would be a second thing to drift.

Territory: `jmarielee/job-fit`, pinned at commit 9ce4511.
Line numbers in the cards are against that commit.

---

## Sweep 1 — files, with the date each was last touched

Thirteen tracked files. Generated from git, not typed.

No tracked file is newer than 2026-07-17, though the pinned commit is
dated 2026-08-20. That commit (9ce4511) deletes a scratch file,
`inventory.txt`, and changes no tracked file that remains. The
snapshot in `../territory/` holds all thirteen.

| Last touched | File |
|---|---|
| 2026-06-13 | `operator/examples.md` |
| 2026-06-13 | `operator/identity.md` |
| 2026-06-13 | `operator/report-template.md` |
| 2026-07-04 | `JUDGE_GUIDE.md` |
| 2026-07-04 | `operator/reference/evaluator-personas.md` |
| 2026-07-04 | `operator/reference/scoring-rubric.md` |
| 2026-07-04 | `operator/rules.md` |
| 2026-07-04 | `README.md` |
| 2026-07-04 | `render.js` |
| 2026-07-04 | `styles.css` |
| 2026-07-14 | `scoring.js` |
| 2026-07-17 | `app.js` |
| 2026-07-17 | `index.html` |

### What the dates settled

- `render.js` has not moved since 2026-07-04. `scoring.js` moved
  2026-07-14. The Evidence Ledger was built on the 4th and removed on
  the 14th, and the removal touched only the scoring half. The orphaned
  display is visible in the timestamps before you open either file.
  See `cards/evidence-ledger.md`.
- `README.md` has not moved since 2026-07-04 — written while the ledger
  was live, never revised after it was removed. That is why
  `README.md:27` still describes it as editable.
- `operator/` is the oldest material in the repo and nothing has touched
  it since 2026-07-04. See `cards/operator-folder.md`.

### What the dates did NOT settle

A last-touched date says nothing about when a constant inside a file was
introduced. These dates do not prove `operator/reference/scoring-rubric.md`
predates `GATE_CORE_CEIL`. The proof for that is the search on
`cards/scoring-rubric-file.md`, re-run by Check 6 of `../verify.js`.

---

## Sweep 2 — named things inside files

Constants, function names, schema fields, personas, and every bare
number. Output is the card set: `cards/`, one card per noun.

## Sweep 3 — the decision order

One real input walked through by hand, recording every point where
something is produced or gated. Output is the six-stage grouping in
`catalog.md` — labels, ledger, math, guards, verdict, display. The
folder tree does not show this order. The ledger stage is empty and
keeps its aisle, so the ghosts sit where the thing would be working.

## Sweep 4 — reconcile

Every noun assigned a state. Output is `catalog.md`: 38 nouns, 38 rows,
each pointing at exactly one card. Checks 1 and 2 of `../verify.js`
re-run that reconciliation on every run.

Sweep 4 is also where C1 through C4 in `../walks/CORRECTIONS.md` came
from — four states asserted from memory that the searches contradicted.
