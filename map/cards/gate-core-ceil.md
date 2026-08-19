# GATE_CORE_CEIL

**Type:** threshold
**State:** live · computed
**Stage:** guards
**Source:** `scoring.js` — declared with the scoring constants, applied in
`computeScore` after `_identifyGate`

---

## Current value

`74`

## What it is

A ceiling that fires when THE GATE is a **core**, **required**, **missing**
item. The score cannot exceed 74 while that gate is live.

## What it gates

Whether a candidate with one live core screen-out can be described as a
"Strong Candidate."

## Why it is shaped this way

74 is one point below the "Strong Candidate" band, which opens at 75. The
number is chosen to land the run in "Viable but Exposed" — not to punish it
further. A gate is a warning, not a disqualification.

Note what does *not* trigger it: a **partial** core gate. Partials already
cost score in the base math, so clamping them would charge twice. A
**supporting** gate never caps at all.

## Hits

- `score` — clamped to 74 when the condition holds.
- `gateCapped` — set true, rendered as a note (`render.js` line 656) and
  toggling the capped style on the score bar (`render.js` line 653).
- `verdict` — forced out of "Strong Candidate" and into "Viable but Exposed."

## Does not hit

- **`recommendation` directly.** A separate rule handles that: any live gate,
  core or supporting, downgrades a clean "Apply" to "Apply with Caution."
  That rule fires whether or not this ceiling did.
- **A weak score.** The ceiling only ever lowers. It cannot rescue anything.
- `CAP_VALUE` — the wrong neighbour. Both are ceilings and both involve the
  word "gate." `CAP_VALUE` counts *how many* required items are unmet. This
  one responds to *which single item* is the most likely screen-out. They
  fire independently and can both fire on the same run.

## If you change it

Raise it to 75 or above and the ceiling stops doing anything at all — a
capped run re-enters the "Strong Candidate" band, which is the exact
outcome the ceiling exists to prevent. The number is bound to the verdict
band, not chosen for its own sake.

Lower it substantially and a single missing core requirement starts
outweighing everything else, duplicating what `CAP_VALUE` already does.
