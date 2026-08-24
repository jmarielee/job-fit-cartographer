# report-template.md

**Type:** leftover
**State:** leftover
**Stage:** display
**Source:** `operator/report-template.md` — last modified 2026-06-13

---

## What the name suggests

A template governing the shape of the generated report.

## Proof of absence

```
grep -rn "report-template" render.js app.js index.html scoring.js
→ no matches
```

Nothing references it. It also sits inside `operator/`, which the running
application cannot read at all — see `cards/operator-folder.md`.

## Why a reader will trip on it

It is honest. It does not describe behaviour that contradicts the running
system, and a reader who opens it will find a template, not a false rule.
It simply has nothing pointing at it.

Its date is the tell: 2026-06-13, alongside the two other oldest files in
the repo, while everything that runs was touched in July.

## What last reached it

Unknown. Last modified 2026-06-13, the same day as `identity.md` and
`evaluator-personas.md` — the three oldest files in the repo. Nothing in the
running code has ever referenced it, so there is no read to date. "Unknown,
last touched 2026-06-13" is the honest answer and is better than a guess.

## What to do instead

Report structure is defined by the JSON schema in the user query inside
`scoring.js`, and rendered by `render.js`.
