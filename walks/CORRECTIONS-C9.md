# Corrections — C9

Continues `CORRECTIONS.md` and `CORRECTIONS-addendum.md`.

---

## C9 — a filter tests for a value its own schema forbids

**Found while writing the Labels group**, not by a targeted search. The
rules require reading the source before writing a card; reading the schema
and the filter in the same sitting is what surfaced it.

`_computeStrength` at `scoring.js:62` opens with:

```js
if (!s.mapsToNeed) return;
```

The schema handed to the model at `scoring.js:302` declares:

```
"strengths":[{"text":"string","centrality":"core|supporting|peripheral","mapsToNeed":true}]
```

Compare against the boolean in the same schema one field earlier:

```
"jdItems":[{ ... "obtainable":boolean}]
```

`obtainable` is declared as a type. `mapsToNeed` is declared as a **value**.
A model following the template emits `true` on every strength.

The prose rule at `scoring.js:263` — *mapsToNeed (true only if it answers a
real JD need)* — asks for judgment the schema does not leave room for.

## What this is and is not

It is **not** a claim that the filter has never fired. A model may emit
`false` despite the template.

It **is** a claim that the schema and the filter disagree, and that a reader
who changes one without seeing the other will be surprised.

## Why it belongs in the map rather than a bug list

This is the second instance of the same shape in this territory. The first
is the `benchmark` evaluator: `_tallyVote` filters out an evaluator id that
the system prompt forbids the model from producing.

Both are code defending against a case the prompt makes unreachable. Two
instances make it a pattern in this codebase, which is the kind of thing a
map should tell a cold reader and a bug list would not.

**Resolution:** `cards/maps-to-need.md`, state
`live filter · unreachable branch`. Cross-referenced from
`cards/benchmark-evaluator.md`.
