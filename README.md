# Cartographer — Job Fit Scanner

A folder-based cartographer. Drop it into a Claude project, point it at a
body of work, and it leaves a map a cold reader can enter without reading
the whole thing.

This repo contains two things. Do not confuse them.

- **The cartographer** — `cartographer/`. Instructions for making maps.
  Contains no facts about any particular territory.
- **The map it made** — `map/`. One worked map of the Job Fit Scanner repo.

---

## The territory

Job Fit Scanner — https://github.com/jmarielee/job-fit

A browser tool that scores a resume against a job description. 13 files,
2,259 lines. A model assigns labels; deterministic math computes the score,
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

1. Read `map/catalog.md`. Rows are grouped by decision order — labels, math,
   guards, verdict, display — not by folder. The folder tree does not show
   that order.
2. Read `cartographer/reference/collisions.md`. Four words in this territory
   mean three different things each. Skipping this file is how readers land
   on the wrong card confidently.
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

Four things in this territory carry a name and no wiring. The largest is a
folder of scoring rules the running app cannot read. A reader who edits it
will see nothing change.

Ghost cards are filed in the section where you would expect the thing to be
working, not in a pile at the bottom. Each one carries the search that
proves absence.

## Coverage

Every noun in the territory has a card. That is what makes the one-card walk
possible. Full shelves, single dose.

## Cold walks

Recorded walks, including the ones that failed, are in `walks/`. The protocol
was written before they ran.
