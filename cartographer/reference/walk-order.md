# Walk order

## The walk

1. `map/catalog.md`
2. `cartographer/reference/collisions.md` — only if the question contains
   the word gate, confidence, score, or benchmark. Which is most questions.
3. One card.
4. Stop.

Three files maximum. A fourth file means the map failed and the reader
should say so rather than continuing.

## Why the catalog is grouped by decision order

The folder tree of this territory shows two folders: an `operator/` folder
and a set of root files. That grouping is misleading — one of those folders
is not read by the running system at all.

The truth is the order in which a decision gets made:

**Labels → Ledger → Math → Guards → Verdict → Display**

A label is assigned by a model. The ledger was the human-audit stage: live
controls where a person corrected those labels before the math ran. It was
removed on 2026-07-14 and its aisle now holds two ghosts. The math turns
labels into a number. The guards limit what that number is permitted to be.
The verdict turns the number into words. The display shows it.

A removed stage keeps its position in the order. A reader looking for the
ledger will look between labels and math, which is where the ghosts are.

## Where ghosts are filed

In the section where a reader would expect the thing to be **working**, not
in a pile at the end.

`divergent` is filed under Verdict because that is where someone would go
looking for it. A ghost in its natural aisle is a tripwire marked exactly
where people trip.

## Entering from a question

Most readers arrive with one of three shapes of question.

- **"What is X?"** → catalog row → one card. Two hops.
- **"Why did it output Y?"** → catalog, Verdict or Guards group → one card.
- **"What breaks if I change Z?"** → catalog row → that card's
  Does-not-hit section is the answer.

If a question cannot be answered in two hops, that is a defect in the
catalog, not in the reader. Record it in `walks/`.
