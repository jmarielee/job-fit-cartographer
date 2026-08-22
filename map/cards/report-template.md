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

## Why this is a leftover and not a ghost

It is honest. It does not describe behaviour that contradicts the running
system, and a reader who opens it will find a template, not a false rule.
It simply has nothing pointing at it.

Its date is the tell: 2026-06-13, alongside the two other oldest files in
the repo, while everything that runs was touched in July.

## What last reached it

<!-- JODI: fill this in if you know. If you don't, say so — "unknown, last
touched 2026-06-13" is a legitimate card line and better than a guess. -->

## What to do instead

Report structure is defined by the JSON schema in the user query inside
`scoring.js`, and rendered by `render.js`.
