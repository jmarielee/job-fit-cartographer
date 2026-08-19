# operator/reference/scoring-rubric.md

**Type:** ghost
**State:** ghost
**Stage:** spec folder
**Source:** `operator/reference/scoring-rubric.md` — last modified 2026-07-04

---

## What the name suggests

The scoring rubric. A reader looking for how the number is produced will
reach for this filename before any other in the repo.

## Proof of absence

Two searches. The first proves nothing reads it:

```
grep -rn "scoring-rubric" render.js app.js index.html scoring.js
→ no matches
```

The second proves it is also **out of date**, which is what separates it
from the rest of `operator/`:

```
grep -n "GATE_CORE_CEIL" operator/reference/scoring-rubric.md
→ no matches
grep -n "GATE_CORE_CEIL" operator/rules.md
→ present, documented as Guard 3
grep -n "GATE_CORE_CEIL" scoring.js
→ line 38, applied in computeScore
```

## Why a reader will trip on it

It is a near-duplicate of `operator/rules.md` with one guard missing. Same
title, same structure, same constants block — minus `GATE_CORE_CEIL` and
minus Guard 3 entirely.

A reader who opens this file instead of `rules.md` learns a system with two
guards. They will not know a third exists. Nothing in the file signals that
it is the older of two nearly identical documents.

Two generations of drift live in one folder. Only this one lies.

## What to do instead

`operator/rules.md` is the accurate spec. `scoring.js` is the truth.

## Recommended fix, outside the map

Delete this file or mark it superseded in its first line. It is the cheapest
correction available in this territory and the map cannot make it — the map
only reports.
