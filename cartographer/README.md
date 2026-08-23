# Cartographer

A folder that maps decision systems — bodies of work whose job is to produce
a judgment rather than to store or move things.

Drop this folder into a project alongside the work you want mapped. Tell it
the repeating unit is a folder someone will change. It produces a catalog
and cards.

---

## What to feed it

A body of work is in scope if all three are true:

1. Something in it **decides** — a verdict, score, routing choice, or refusal.
2. Some of that decision is governed by **constants a person chose** —
   cutoffs, caps, floors, weights, tie-breaks.
3. Someone will **change** it.

Out of scope: pure storage, pure transport, finished work nobody will touch,
and anything small enough to simply read.

## The one rule

**Open the catalog. Find your row. Open that one card. Stop.**

Never load the cards folder wholesale. Never add it all to a project. The
catalog exists so nothing has to read everything.

Three files is the budget: catalog, collisions, one card. If a reader opens
a fourth file to answer one question, the map failed and they should say so.

## How a cold model walks it

1. Read the catalog. Rows are grouped by decision order, not by folder.
2. Read `reference/collisions.md` if the question contains a word that means
   more than one thing in that territory. It usually does.
3. Open one card.
4. Stop.

## What is different here

Most maps chart two kinds of edge: what lives inside what, and what feeds
what. This one charts a third — **governance**. A constant that changes what
the system is allowed to conclude while moving no data at all.

That edge is why `threshold` is a card type here. A threshold has no
contents and no position in a data flow. Change it and no file changes, no
function fires differently, and the verdict changes anyway. A reader
watching the numbers concludes nothing happened.

See `reference/card-types.md` for the closed set of six types.

## The files

- `identity.md` — who the cartographer is and what it can walk
- `rules.md` — how it maps: nouns, movements, states, citations
- `examples.md` — one worked map, with the catalog, cards, and a ghost
- `reference/card-types.md` — the closed set
- `reference/walk-order.md` — the decision order and why the catalog uses it
- `reference/collisions.md` — words that mean more than one thing

## Cite, never copy

Every card names its source file and line. No source text is pasted into a
card. **If a card and the source disagree, the file wins and the card is
wrong.**
