# Cold walk 3 — can a cold reader use the cartographer itself

Date: 2026-08-23
Reader: Claude, fresh session, no memory of this repo or of building it.
Files given: cartographer/README.md, cartographer/rules.md,
cartographer/identity.md, cartographer/reference/card-types.md. Nothing else.
No map, no cards, no catalog.
Question: "Don't map anything yet. Tell me back: what is this folder for,
what does it produce, what are the card types, and what would make a body of
work out of scope for it?"

Pass condition: the reader must name the governance edge as the reason the
folder exists, produce the closed set of six card types without inventing
or omitting one, and state the three scope conditions. It must not need the
map to answer.

Fail: describes the folder as a generic documentation template, misses the
governance edge, gets the card type set wrong, or asks for the map before
answering.

Why this walk exists: walks 1 and 2 tested the map. Neither tested the
deliverable. The competition asks for a folder a stranger can drop into a
project, so the folder has to be legible on its own, with no worked example
attached.

## Transcript

Read all four. Here's what they say.

## What the folder is for

It maps **decision systems** — bodies of work whose job is to produce a judgment rather than store or move things (`identity.md:5-6`). It's meant to be dropped into a project alongside the work being mapped, told that the repeating unit is "a folder someone will change" (`README.md:6-8`).

The reason it exists as a separate thing from a normal repo map: most maps chart two edge types — what lives inside what (containment) and what feeds what (flow). This one charts a third, **governance**: a constant that changes what the system is permitted to conclude while moving no data at all (`rules.md:31-34`, `README.md:44-46`).

The primary reader is explicitly a model — a cold session with no memory, handed the map and asked to change one thing without breaking another (`identity.md:31-33`). A human is treated as the same reader with different failure modes: a model politely works around a bad instruction, a person gets stuck (`identity.md:35-37`).

## What it produces

A **catalog** and **cards** (`README.md:7-8`).

The governing constraint on both is a dose limit. The one rule: open the catalog, find your row, open that one card, stop (`README.md:26`). Budget is three files — catalog, collisions, one card. A fourth file opened to answer one question means the map failed and the reader should say so (`README.md:31-32`).

The catalog carries four columns — name, what it is in eight words or fewer, state, card path — and **no values, no counts, no explanations, no prose** (`rules.md:84-87`). The stated reason is self-defeating design: a reader who can answer from the catalog row never opens the card, and then the cards may as well not exist (`rules.md:87-89`).

Rows group by decision order, not by folder. Ghosts file under the section where a reader would expect the thing to be working (`rules.md:91-92`).

Every card carries **Hits** and **Does not hit**, and the "does not hit" must include at least one **wrong neighbour** — the thing a reader would assume moves and why it doesn't. Without it, the card is a glossary entry (`rules.md:56-60`).

## The card types

Closed set of six (`card-types.md:3`):

| Type | What it is |
|---|---|
| `object` | Exists and holds or carries something |
| `computed value` | Derived at run time; no file holds it |
| `function` | A named routine a reader would search for by name |
| `threshold` | A constant governing what the system may conclude |
| `ghost` | A name with no wiring |
| `leftover` | Real and wired, nothing currently reaches it |

`threshold` is the differentiator and carries five extra required sections beyond the object skeleton: Current value, What it gates, What moves when it moves, What does not move, and **If you change it** — the surprise (`card-types.md:46-54`). That last one is load-bearing: a threshold card without it *is* an object card (`card-types.md:54`). And there's a disqualifier — a threshold card is wrong if it reduces to "this number is used in this calculation." That describes a weight. A weight scales an output; a threshold decides whether a conclusion is allowed (`card-types.md:56-58`).

`ghost` and `leftover` both swap `Hits` for **Proof of absence** — the exact search and its result. Asserting a ghost without the search is not permitted (`card-types.md:66-71`, `rules.md:45-48`).

## What would put a body of work out of scope

Three conditions, all required (`identity.md:18-24`, restated `README.md:14-20`):

1. Something in it **decides** — verdict, score, routing choice, classification, or refusal
2. Some of that decision is governed by **constants a person chose** — cutoffs, caps, floors, weights, tie-breaks
3. Someone will **change** it

Fail any one and it's out. Named exclusions: pure storage, pure transport, finished work nobody will touch, and anything small enough to simply read (`identity.md:26-27`).

Condition 2 is the sharp one. A system that decides but decides by learned parameters or by a single hardcoded branch has nothing for the `threshold` type to bite on — the governance edge is what the whole folder is built around. And condition 3 quietly rules out archives: the map is written for someone about to change something, not for a reader who just wants to understand.

There are also four things `identity.md:49-54` says the folder is *not*, which function as scope limits on the output rather than the input: not a diagnostician (no card names a cause of failure — the territory is in force, not broken), not an auditor (ghosts are marked because a reader will trip on them, not because they're wrong), not a tour guide (no reading order, there's a catalog), not a second spec (source file always wins).

---

Two things I noticed while reading, both worth a glance before Saturday:

**Card count.** You said 28 of 30. `map/cards/` on `main` has **38 files**. Either your remaining-work list is against a different denominator than what's committed, or the catalog and the folder have drifted apart. That's exactly the class of gap the verifier is supposed to catch, so it may be self-resolving — but it changes what "2 math cards, 2 display cards" means.

**Type declarations are clean.** I counted the type line on all 38: 11 threshold, 9 object, 7 ghost, 7 computed value, 3 function, 1 leftover. All six inside the closed set, nothing outside it. Worth knowing that one's already closed.

## What happened

PASS, on one turn.

All four questions answered correctly with line citations throughout. The
reader named governance as the third edge type and the reason the folder
exists, produced all six card types with no additions or omissions,
identified `threshold` as the differentiator, and quoted the disqualifier
verbatim in substance — a threshold card is wrong if it reduces to "this
number is used in this calculation," because that describes a weight.

Two things it did that were not asked for.

It derived a scope exclusion the files do not state. Nothing in
`identity.md` says archived repositories are out of scope; the reader
reasoned it from condition 3, "someone will change it," and said so. That
is the difference between a file being readable and a file being usable —
it applied the rule to a case the rule does not name.

It verified rather than trusted. Told in passing that the map had 30 cards,
it counted the folder, found 38, and flagged the mismatch. It then counted
the type declaration on all 38 cards independently and confirmed all six
fell inside the closed set.

## What this does not prove

The reader was given the four instruction files and asked to explain them.
It was not asked to produce a map. A reader can describe a method correctly
and still apply it badly. The portability run in `portability/` is the test
of whether the folder produces anything when pointed at unfamiliar
territory; this walk only establishes that the instructions are legible
without the worked example attached.