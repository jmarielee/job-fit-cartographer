# Evidence

Everything here was in the README until 2026-08-24. It was moved because a
README should tell a reader where to stand, not argue that the map is good.

None of it is required to walk the map. Start at `map/catalog.md` instead.

What is in this file, in order:

- **The third edge** — the governance edge worked through one constant.
- **The verifier runs the code, it does not read it** — why Check 4 executes
  `computeScore` rather than parsing it.
- **The map checks itself** — the six checks, and which three are keyed
  against something other than the map.
- **Portability** — two runs of the unedited `cartographer/` folder against
  libraries I did not write.
- **Cold walks** — seven walks, three failures, and the chain of three that
  is worth reading.

---

## The third edge

Most maps chart two kinds of movement: what lives inside what, and what
feeds what. This map charts a third — **governance**. A constant that
changes what the system is permitted to conclude, while moving no data.

`TIE_FACTOR` is 1.3. Raise it to 1.6 and every number on screen is
identical — the score does not move by one point. What changes is that
`edgeVsGap` reaches `edge` less often, so clean "Apply" recommendations
become "Apply with Caution." A reader watching the score will conclude the
change did nothing. The advice changed and the number did not.

That is why `threshold` is a card type here and not a footnote. Seven of the
38 cards are thresholds. Each one carries its current value, what it gates,
what changes if you move it, and the same-vocabulary neighbour that does the
opposite thing — `TIE_FACTOR` and `EDGE_BONUS` are both called "edge" and
share no code path.

It was eleven until this audit. `TIER_W`, `CENT_W`, `STATUS_F` and
`EDGE_BONUS` are weights: they scale a number rather than deciding what the
system may conclude, which my own type definition rules out. Two portability
runs said so independently before I saw it. They are `object` cards now, and
the reasoning is in `card-types.md` and C16.

## The verifier runs the code, it does not read it

Check 4 does not parse `scoring.js` looking for a number. It loads the real
`computeScore` function, runs it against the demo input, and compares the
answer to what the card claims.

`DEMO_DATA` ships a hardcoded score of 68 that is overwritten at run time.
The engine returns 64. A card written by reading the file would say 68 and
be wrong, and no citation check would catch it — the citation would resolve,
point at the right file, and describe the right variable. Only recomputation
catches it.

The territory ships pinned in `territory/` at commit 9ce4511, so this runs
on a bare clone with no setup. Clone the repo and run `node verify.js`.

## The map checks itself

`verify.js` reads the map and tests it against the source it maps. Run it from
the repo root:

    node verify.js

Six checks:

1. Every catalog row has a card behind it.
2. Every card is reachable from the catalog.
3. Every cited line is printed beside what the source file actually says on
   that line — both ends of every range, and the short `:129` form resolved to
   the card's subject file. Existence is not the test. A citation can sit
   inside the file and still point at the wrong line; this puts the claim and
   the code side by side so a reader can see it.
4. The demo score in `demo-data.md` is recomputed from the source by running
   the real scoring function. The card must state the number the code returns,
   not the number sitting in the demo data.
5. Four of the seven threshold cards state a value declared as a bare
   constant. Each of those four is read out of `scoring.js` and compared to
   what the card claims. `tie-factor.md` says 1.3; the source declares 1.3
   on line 39. If the source moves and the card doesn't, this fails by name.
   The other three — `confidence-floor`, `verdict`, `vote-threshold` — state
   bands, ranges and duplicated literals rather than single constants, and
   are not keyed. The verifier names them when it runs.
6. Every ghost card's proof search is re-run against the source and compared
   to what the card claims. A pasted search result is a photograph; this
   makes it a check. It caught two of my own cards the day it was written —
   see C12 and C13 in `walks/`.


Checks 4, 5 and 6 are the only ones keyed against something other than the
map itself. Checks 1 and 2 ask whether the map agrees with the map. Check 3
puts the claim and the code side by side and leaves the judgement to a
reader. Only 4, 5 and 6 ask the source a question and fail when the answer
differs — one runs the code, one reads the constants it declares, one
re-runs every ghost proof. Eleven of the 38 cards are keyed that way. The
rest rest on the citations in Check 3.

The verifier has caught real errors in this map, and readers have caught
errors the verifier could not. Two days before submission, five citations on
the densest card pointed at lines that existed, in the right file, describing
the right behaviour, and were still wrong. Check 3 flagged one of the five —
see C14.

Those corrections are logged in `walks/`. Failures are not hidden: a verifier
that has never failed has not been tested.

## Portability

`portability/` holds two runs of the unedited `cartographer/` folder against
libraries I did not write — koajs/ratelimit (JavaScript) and
textstat/textstat (Python) — by cold sessions with no memory of building it.

Both independently reported the same defect in my closed set of card types:
no legal type for a plain coefficient, switch, or parameter. Two languages,
two domains, two sessions that never saw each other, one identical finding.
Six catalog rows in the second run ship with `∅` in the card path column —
nouns that exist and have no legal card under my own rules.

The runs also found two documented-but-absent guards in maintained
libraries, and one contradiction between two of my own instruction files,
now fixed. Published whole, including every place the method strained.


## Cold walks

Seven walks, run cold. Three failed. All seven are published as run.

**The chain worth reading is three walks long.**

`walk-cold-cap-value.md` failed. A reader with the README and the catalog
and nothing else was asked why an application capped at 45. It found the
right row, then answered from the row alone and stated the rule wrong — it
said one unmet required item caps the score. The code needs two or more:
`scoring.js:137` tests `reqMiss >= 2`, and `:70-73` is what gets counted.
The card was right the whole time; the catalog row had explained a rule
instead of pointing at one, and invited the reader to stop a file early.

The row was rewritten as C15 to name that a count and conditions exist
without holding either.

`walk-cold-strictness-controlled.md` then hit the same row, cold, and said:
these files explicitly say the count and conditions are on the missing card,
so I can't tell you exactly what to edit. It stopped and asked for the card.

A published failure, a documented fix, and an independent cold reader
confirming the fix works — across three walks, none run for that purpose.

**The three failures have three different causes**, and each was fixed in
the layer that caused it. `walk-cold-cap-value.md` was a map defect: the
catalog leaked content the card owned. `walk-cold-verifier-strictness.md`
was a question defect: "the tool" names both this territory and `verify.js`,
and the reader answered about the wrong one. `walk-cold-strictness-rerun.md`
was a protocol defect: the setup assumed a reader limited to the files
supplied but never said so, and a browsing-capable reader reached the source
and stated five constants that appear in neither file it was given.

`walk-cold-strictness-controlled.md` is the first walk run with all three
fixes in place and the first to pass all four conditions in one run. It also
carried the `45 → 44` cliff correctly — a one-point change to a constant
that removes an entire recommendation outcome, because the "Apply with
Caution" band opens at exactly 45 — and surfaced the hardcoded Score Receipt
string unprompted.

**What seven walks have not shown.** The one-card model has been
demonstrated twice, in `walk-cold-vote-threshold.md` and
`walk-cold-strictness-controlled.md`, and both needed two turns: a reader
holding only the catalog correctly cannot answer, so it asks for the card.
Whether a one-turn pass is possible is not established by any walk here.
Across the three failures the common thread is that the reader reached a
satisfying answer without opening a card — from a row, from the README, and
from the source. That is named rather than resolved.

`walks/PROTOCOL.md` was written before any walk ran and lists five
questions. The unrun ones are still listed rather than deleted, and the two
protocol changes are appended with dates rather than folded into the
original text. `walks/CORRECTIONS.md` indexes every correction and says
which file each lives in — start there, not in the folder listing.

