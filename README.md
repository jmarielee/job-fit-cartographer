# Cartographer — Job Fit Scanner

A folder-based cartographer. Drop it into a Claude project, point it at a
body of work, and it leaves a map a cold reader can enter without reading
the whole thing.

This repo contains two things. Do not confuse them.

- **The cartographer** — `cartographer/`. Instructions for making maps, plus
  this territory's naming collisions and one worked example.
- **The map it made** — `map/`. One worked map of the Job Fit Scanner repo.

---

## The territory

Job Fit Scanner — https://github.com/jmarielee/job-fit

A browser tool that scores a resume against a job description. 13 files,
3,484 lines. A model assigns labels; deterministic math computes the score,
applies caps and floors, and issues the verdict.

The source repo is **not modified by this map**. The map cites it.

Someone will change it. That is why it is mapped.

## The later reader

A model. A cold session with no memory of this repo, asked to change one
thing without breaking another. A new person works too — the walk is the same.

---

## The one rule

**Open `map/catalog.md`. Find your row. Open that one card. Stop.**

Do not load `map/cards/` wholesale. Do not add the whole folder to a project.
The catalog exists so nothing has to read everything.

If you find yourself opening a fourth file, the map has failed and you
should say so.

---

## How to walk it

1. Read `map/catalog.md`. Rows are grouped by decision order — labels,
   ledger, math, guards, verdict, display — not by folder. The folder tree
   does not show that order. The ledger stage is empty: it was built and
   removed in July, and the catalog keeps its aisle so the ghosts sit where
   the thing would be working.
2. Read `cartographer/reference/collisions.md`. Five words in this territory
   carry more than one meaning. Skipping this file is how readers land on
   the wrong card confidently.
3. Open one card.
4. Stop.

## How to use the cartographer on something else

Drop `cartographer/` into a project alongside a body of work. Tell it the
repeating unit is a folder someone will change. It produces a catalog and
cards in the same shape as `map/`.

---

## The cards cite. They do not copy.

Every card names its source file and line. No source is pasted into a card.
**If a card and the source file disagree, the file wins and the card is
wrong.** Report it.

## Ghosts are marked

Five things in this territory carry a name and no wiring: the Evidence Ledger,
its state layer, `divergent`, the benchmark evaluator, and a spec file that
predates the guard it describes. Two more are leftover — real and wired, but
nothing currently reaches them. The largest of those is `operator/`, a folder
of scoring rules the running app cannot read. A reader who edits it will see
nothing change.

Ghost and leftover are not the same claim, and the catalog marks which is
which. Ghost cards are filed in the section where you would expect the thing
to be working, not in a pile at the bottom. Each one carries the search that
proves absence.

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

## Coverage

Every noun in the territory has a card. That is what makes the one-card walk
possible. Full shelves, single dose.

## Cold walks

Four walks, run cold. One failed.

**`walks/walk-cold-cap-value.md` is the failure.** A reader with the README
and the catalog and nothing else was asked why an application capped at 45.
It found the right row, then answered from the catalog row alone and stated
the rule wrong — it said one unmet required item caps the score. The code
needs two or more: `scoring.js:137` tests `reqMiss >= 2`, and `:70-73` is
what gets counted. The card was right the whole time; the catalog row had
invited the reader to stop one file early. The row is rewritten, and the
walk is kept as run. Logged as C15.

That is the only evidence in this repo that a stranger, not the author,
decided where the map was wrong. The other three walks passed:
`walk-cold-vote-threshold.md`, `walk-cold-operator-ghost.md`,
`walk-cold-cartographer-comprehension.md`.

`walks/PROTOCOL.md` was written before any walk ran and lists five questions.
Four were run. The unrun three are still listed rather than deleted.
`walks/CORRECTIONS.md` indexes all sixteen corrections and says which file
each lives in — start there, not in the folder listing.
