# Examples — one worked map

A slice of the Job Fit Scanner map. Not the whole thing. Enough to show the
shape the rules produce.

Full map: `../map/catalog.md`

---

## The catalog, one group

Rows carry four columns and no values.

```
## 5 — VERDICT · computed

| Noun                     | What it is                             | State | Card                          |
|--------------------------|----------------------------------------|-------|-------------------------------|
| THE GATE                 | the one thing likely to screen you out | live  | cards/the-gate.md             |
| verdict                  | four score bands                       | live  | cards/verdict.md              |
| recommendation           | apply / caution / do not               | live  | cards/recommendation.md       |
| vote                     | evaluators counted as apply or skip    | live  | cards/vote.md                 |
| committeeNote            | plain statement of the split           | live  | cards/committee-note.md       |
| divergent                | computed, never read                   | ghost | cards/divergent.md            |
| benchmark evaluator      | filtered out, never exists             | ghost | cards/benchmark-evaluator.md  |
| evaluator vote threshold | unnamed, duplicated across files       | drift | cards/vote-threshold.md       |
```

Note the two ghosts sitting inside Verdict rather than in a pile at the end.
`divergent` is filed here because this is where someone would go looking for
it — a ghost in its natural aisle is a tripwire marked exactly where people
trip.

---

## A threshold card

`../map/cards/tie-factor.md` — full card.

The section that makes it a threshold card rather than an object card:

> **Does not hit**
> - `score`. Not by one point. TIE_FACTOR appears nowhere in the score
>   computation.
> - `EDGE_BONUS` — the wrong neighbour. Both are named "edge." EDGE_BONUS
>   adds points and never touches `edgeVsGap`. TIE_FACTOR moves `edgeVsGap`
>   and never touches the score.

Two constants, same vocabulary, opposite mechanisms, no shared code path.
A reader who wants a stricter tool reaches for the wrong one.

---

## A ghost card

`../map/cards/operator-folder.md` — full card.

The proof, which is the part that is not optional:

```
grep -rn "operator/" render.js app.js index.html scoring.js
→ no matches
```

A six-file folder of scoring rules. The app is a browser application with no
filesystem access and cannot read any of it. Edit it and nothing changes,
nothing errors, nothing warns.

---

## A leftover

`report-template.md`. Last touched 2026-06-13, unreferenced. Real, harmless,
recorded. Leftovers are honest — they do not pretend to be wired.

---

## One change and what it hits

**Change:** raise `TIE_FACTOR` from 1.3 to 1.6.

**Hits:** `edgeVsGap` reaches `edge` less often → clean "Apply"
recommendations become "Apply with Caution" → the Score Receipt's dominance
line reads "no edge dominance" more often.

**Does not hit:** the score. Not by one point. Every number on screen is
identical.

**The surprise:** a reader watching the score will conclude the change did
nothing. The advice changed and the number did not.
