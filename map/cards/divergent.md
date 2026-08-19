# divergent

**Type:** ghost
**State:** ghost
**Stage:** verdict
**Source:** `scoring.js` — computed in `computeScore`, returned in `_brain`

---

## What the name suggests

A flag indicating that the three evaluators disagree — at least one would
advance the candidate and at least one would pass. It reads as the signal
that drives a divided-committee warning somewhere in the report.

## Proof of absence

```
grep -n "divergent" render.js app.js index.html
→ no matches
```

It is computed correctly and returned in the `_brain` object. Nothing ever
reads it.

## Why a reader will trip on it

The report *does* surface committee disagreement — but through
`committeeNote`, a separate string built from the same vote tally a few
lines later. A reader looking for the divided-committee logic will find
`divergent` first, assume it is the mechanism, and change it. Nothing will
happen to the report.

The trap is that the feature exists. Only this particular path to it is dead.

## What to do instead

To change how a divided committee is reported, edit `committeeNote` in
`computeScore`. It is rendered at `render.js` line 232.

## Status honesty

Whether `divergent` was superseded by `committeeNote` or was never wired is
not established by the search above. What is established is that nothing
reads it.
