# CAP_VALUE

**Type:** threshold
**State:** live · computed
**Stage:** guards
**Source:** `scoring.js:37` — applied in `computeScore` at line 139 (Guard 1)

---

## Current value

`45`

## What it is

A ceiling. When two or more core or supporting **required** items are unmet
and not obtainable, the score is clamped to this value regardless of how
strong the rest of the picture is.

## What it gates

Whether accumulated strengths are permitted to outweigh missing
requirements. Below this line, they are not.

## Why it is shaped this way

Strength in adjacent areas does not make a candidate eligible. Without the
clamp, enough peripheral strengths could carry a candidate past a wall they
have not cleared. The cap makes eligibility non-negotiable.

## Hits

- `score` — clamped to 45 when `_requiredCoreMissing` (`scoring.js:68`)
  returns 2 or more.
- `verdict` — 45 falls in the 35–54 band, so a capped run reads
  "Long Shot" rather than "Viable but Exposed."
- `capped` and `capReason` — set true and populated, rendered in the Score
  Receipt (`render.js:213`) and as a note on the score bar
  (`render.js:463`).

## Does not hit

- **Preferred items. Ever.** `_requiredCoreMissing` filters on
  `tier === 'required'` before counting. A candidate missing every preferred
  item in the job description cannot trigger this cap.
- **Peripheral required items.** The filter also requires centrality of
  `core` or `supporting`. A missing peripheral required item is not counted.
- **Obtainable items.** Anything the job description offers as acquirable is
  excluded, even when labeled missing.
- `GATE_CORE_CEIL` — **the wrong neighbour.** Both are ceilings, both involve
  the word "gate," and they are unrelated mechanisms. This one counts *how
  many* required items are unmet. That one responds to *which single item* is
  the most likely screen-out. They fire independently and can both fire on
  the same run.

## If you change it

**45 is not a free number. It sits on a boundary.**

The recommendation logic branches at `score >= 45`. A capped score therefore
lands on the exact value where two apply-votes can still produce "Apply with
Caution."

Lower this to 44 and every capped application silently becomes "Do Not
Apply" — no code changed, no error, no warning. The two constants look
independent and are welded together.

Raise it to 55 and capped runs cross into the "Viable but Exposed" band and
become eligible for a clean "Apply," which defeats the purpose of the cap.

## The receipt will lie to you

`render.js:213` prints the string `required-gate cap 45` as a literal. It
does not read `CAP_VALUE`.

Change the constant and the Score Receipt — the section whose entire purpose
is showing its work — keeps reporting the old number. Four thresholds have
this drift. See `cards/score-receipt.md`.
