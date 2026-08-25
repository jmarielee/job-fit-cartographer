# Cartographer — Job Fit Scanner

A folder-based cartographer. Drop it into a Claude project, point it at a
body of work, and it leaves a map a cold reader can enter without reading
the whole thing.

This repo contains three things. Do not confuse them.

- **The cartographer** — `cartographer/`. Instructions for making maps, plus
  this territory's naming collisions and one worked example.
- **The map it made** — `map/`. One worked map of the Job Fit Scanner repo.
- **A pinned copy of the territory** — `territory/`. A frozen, read-only
  snapshot at commit 9ce4511 so `node verify.js` runs on a bare clone with
  no setup. Not modified by the map. See `territory/PINNED.md`.

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

**Where the proofs run.** Every search printed on a card is written from the
territory root. Run them from `territory/`, not from the repo root:
`cd territory && grep -rn "operator/" render.js app.js index.html scoring.js`
returns nothing, as the card claims. `node verify.js` re-runs them for you
from the repo root and resolves the paths itself.

Ghost and leftover are not the same claim, and the catalog marks which is
which. Ghost cards are filed in the section where you would expect the thing
to be working, not in a pile at the bottom. Each one carries the search that
proves absence.

## The third edge

Most maps chart two kinds of movement: what lives inside what, and what
feeds what. This map charts a third — **governance**. A constant that
changes what the system is permitted to conclude, while moving no data.

That is why `threshold` is a card type here and not a footnote. Seven of the
38 cards are thresholds. Each one carries its current value, what it gates,
what changes if you move it, and the same-vocabulary neighbour that does the
opposite thing. Those answers live on the cards, not here.

See `cartographer/reference/card-types.md` for the closed set of six types
and the one gap in it that is named rather than fixed.

## Coverage

Every noun on the decision path has a card — 38 cards, 38 catalog rows, each
row pointing at exactly one.

Five of the territory's thirteen files carry no card of their own. Three of
them — `app.js`, `index.html`, `styles.css` — are cited from the cards that
own the nouns inside them. The other two are the territory's own
documentation, and that is a real gap: `job-fit/README.md:27` still describes
the Evidence Ledger as an editable feature of every report, six weeks after
the commit that removed it. Named here rather than covered.

---

## How this was checked

`node verify.js` from the repo root. Six checks; three of them ask the source
a question rather than asking the map about itself.

`walks/` — seven cold walks, three of them failures, all published as run.
`walks/CORRECTIONS.md` indexes every correction and says which file each one
lives in. Start there, not in the folder listing.

`portability/` — two runs of the unedited `cartographer/` folder against
libraries I did not write: `textstat/textstat`, mapped in full, and
`koajs/ratelimit`, which the method refused under its own scope rule. Both
published whole, refusal included.

The reasoning behind all three is in `EVIDENCE.md`. It is not required to
walk the map.
