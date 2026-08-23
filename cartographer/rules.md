# Rules

## Inventory before cards

No card is written until the full noun list exists and every noun has a
state. Writing cards first produces a map of what you remember instead of
what is there.

The inventory runs in four sweeps:

1. **Files.** Every tracked file, with the date it was last touched.
2. **Named things inside files.** Config keys, constants, function names,
   schema fields, personas, and any bare number.
3. **The decision order.** Walk one real input through the system by hand
   and record every point where something is produced or gated. These are
   nouns even when no file carries their name.
4. **Reconcile.** Assign every noun a state.

## What counts as a noun

Anything a change could land on: a file, a constant, a function, a schema
field, a stage in the decision order, a folder convention.

Not a noun: a variable local to one function, a loop counter, anything a
reader would never search for by name.

## What counts as a movement

Three edge types. Name which one a card is describing.

- **Containment** — this lives inside that.
- **Flow** — this feeds that.
- **Governance** — this constrains what that is permitted to conclude.
  No data moves. The verdict changes. This is the edge type most maps miss.

## Live, leftover, ghost, drift

- **live** — named somewhere *and* read somewhere. Both halves required.
- **leftover** — real and wired, nothing currently reaches it. Honest.
- **ghost** — a name with no wiring. A tripwire.
- **drift** — real and wired, but two places that should agree don't. The
  code and the spec, or two copies of the same number. Not a ghost: both
  halves are live. The card names which two disagree.

**A ghost is not asserted. It is proven.** Every ghost card carries the exact
search that was run and what it returned. A claim without a search is a guess
and does not ship.

Run the search even when you are sure. Being wrong here is expected and the
corrections are recorded in `walks/`.

## Hits / Does not hit

Every card carries both — except ghost and leftover cards, where `Hits` is
replaced by **Proof of absence**. See `reference/card-types.md`.

**Hits** — what a change to this touches. Named, with source citation.

**Does not hit** — what it does *not* touch, including at least one
**wrong neighbour**: the thing a reader would assume moves, and why it
doesn't. A card without a wrong neighbour is a glossary entry.

The wrong neighbour is usually a name collision or a shared vocabulary word.
Look there first.

## Provenance on Labels-stage cards

Cards in the Labels stage carry `model-labeled` on the card face. Cards from
the math onward carry `computed`. This renders the system's own architecture
as a visible property of the map rather than a claim in prose.

Do not tag stages where the distinction is meaningless.

## Cite, never copy

Every card names source file and line. No source text is pasted into a card.

If a card and the source disagree, **the file wins and the card is wrong.**

A card that could be reconstructed into the source is a photocopy. Cap:
if a card is longer than the code it describes, cut it.

## The catalog points, it does not hold

The catalog carries four columns: name, what it is in eight words or fewer,
state, card path.

It carries **no values, no counts, no explanations, no prose.** A reader who
can answer their question from the catalog row will never open the card, and
the cards may as well not exist.

Rows are grouped by **decision order**, not by folder. Ghosts are filed in
the section where a reader would expect the thing to be working.

## Refuse to slurp

The map is complete — every noun has a card. The dose is one card.

No file in this map instructs a reader to load the cards folder, add
everything to a project, or read in sequence. If a reader opens a fourth
file to answer one question, the map failed.
