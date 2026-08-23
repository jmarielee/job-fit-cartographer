# Portability — one run against territory I did not write

The map in `../map/` is of my own repo. That answers whether the method
works. It does not answer whether the method is mine or the territory's.

This folder is one run of the unedited `cartographer/` folder against a
library I have never worked on, by a cold session with no memory of building
it. It is published whole, including the seven places the method strained
and the two contradictions it found in my own instruction files.

---

## The territory

**koajs/ratelimit** — https://github.com/koajs/ratelimit
Rate limiter middleware for Koa. MIT licensed,
Copyright (c) 2019-present Koa.js contributors.
Mapped at commit `212a4ff`, last touched 2025-06-05.

The decision core is `index.js` (128 lines), `limiter/memory.js` (73 lines),
and `limiter/redis.js` (1 line, which delegates to an external package).

**No source is reproduced here.** The cards cite file and line, as
`cartographer/rules.md` requires. The repository is not vendored into this
one and nothing in it was modified.

**Not affiliated with Koa.js, and not a review.** This map describes how the
code decides, not whether it decides well. `drift` marks two places where
the README and the runtime disagree; that is a documentation observation,
not a defect report, and it is offered in the same spirit as the drift
marked against my own repo in `../map/`.

## How the run was set up

A fresh session, no memory of this repo or of building it. Given the four
instruction files by URL — `cartographer/README.md`, `rules.md`,
`identity.md`, `reference/card-types.md` — and the target repo by URL.
Nothing was uploaded, nothing was coached, and no correction was offered
while it worked. It was told once, at the start, that a rough honest run was
worth more to me than a polished one.

The full run is in `run-koajs-ratelimit.md`, unedited.

---

## Result: partial transfer

### What survived

**The threshold type.** `max: 2500` was identified as a governance edge
without being prompted, and written up with all five required sections. The
run then called `duration` a *less clean* threshold, because it governs a
temporal boundary rather than a direct numerical comparison. That is the
type being used with judgement, not pattern-matched off my examples.

**The wrong neighbour.** It found `limit.remaining` versus `calls` — two
counters, same vocabulary, and only one of them is read by the verdict at
`index.js:103`. A reader watching the response header would be watching the
wrong number. That is exactly the failure the Does-not-hit section exists to
prevent, found on code I have never read.

**The decision-order walk.** It surfaced that blacklist is evaluated before
whitelist, so a whitelist entry cannot rescue a blacklisted request. Nothing
in the folder structure says that.

**Documentation drift in the territory's own README.** The Options list
presents `remaining`, `reset`, and `total` as top-level settings while the
runtime reads them from `opts.headers`; and the `status` option is
implemented but absent from that list. Both are cited to line.

### What did not survive

Seven strain points are recorded in full at the end of the run. The four
that matter most:

1. **The method rejects this territory by its own scope rule.** `identity.md`
   puts "anything small enough to simply read" out of scope. The decision
   core here is about 200 lines. The run said so, then continued explicitly
   labelled as a forced test rather than a valid map. A cartographer that
   knows when it is out of scope is the result I would rather have than a
   clean map of something that did not need one.

2. **The territory is not closed.** The default `redis` driver delegates its
   counter semantics to the external `async-ratelimiter` package. A one-card
   answer to "what changes if I change Redis counter behaviour" cannot be
   given from inside this repository. The map can name the boundary and no
   more.

3. **The closed set of six card types is too decision-specific for general
   software.** A categorical routing switch (`driver`), a class
   (`MemoryLimiter`), and higher-order policy hooks (`blacklist`,
   `whitelist`, `id`) all had to be filed as `object`, which hides the
   property that actually matters about each. The run flagged every one of
   these coercions on the card face rather than hiding them.

4. **"Every tracked file" does not compose with tooling.** A general repo
   contains `.editorconfig`, `.npmrc`, `.remarkrc.js` and similar, whose
   readers live outside the repository. My four states — live, leftover,
   ghost, drift — have no room for "live through an external convention" or
   "cannot be established from territory-local evidence." The run refused to
   invent a fifth state and recorded sweep 4 as incomplete instead.

## Two contradictions it found in my own instruction files

Neither of my earlier cold walks caught these. Neither did I.

**Fixed.** `rules.md:54` said "Every card carries both," meaning Hits and
Does not hit. `reference/card-types.md:69` said "`Hits` is replaced by
`Proof of absence`" for ghost cards. Two of the four instruction files gave
opposite instructions. `rules.md` now names the exception and points at
`card-types.md`.

**Recorded, not fixed.** `rules.md:13` says sweep 2 collects "any bare
number." `rules.md:24-25` says a noun is not "anything a reader would never
search for by name." On my own territory these never collided, because every
bare number in `scoring.js` is a policy constant. On a general repo they
collide immediately — CI runner versions, port numbers, semver components.
This is a real tension in the method and it is left standing rather than
papered over two days before a deadline. Anyone using this folder on general
software will hit it.

---

## What this run does and does not establish

It establishes that the governance model, the wrong-neighbour discipline,
and the decision-order walk produce real findings on territory the method
was not built for, and that the folder is legible enough for a cold session
to apply it without help.

It does not establish that the method is ready for general software repos.
It is not. It is a cartographer for decision systems, and this run is the
clearest available evidence of where that boundary actually sits — which is
narrower than `identity.md` currently implies.

One run, one territory, one session. Reported as such.
