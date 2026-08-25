# Portability — two runs against territory I did not write

The map in `../map/` is of my own repo. That answers whether the method
works. It does not answer whether the method is mine or the territory's.

This folder holds two runs of the unedited `cartographer/` folder against
libraries I have never worked on, by cold sessions with no memory of
building it. Both are published whole, including every place the method
strained.

---

## The finding worth reading first

Two cold sessions. Two languages. Two unrelated domains. Neither knew the
other existed. **Both independently reported the same defect in my closed
set of card types.**

| | Territory | Reported |
|---|---|---|
| Run 1 | koajs/ratelimit — JavaScript, web middleware | No legal type for a routing switch, a class, or a callback hook. All three forced into `object`, which hides the property that matters. |
| Run 2 | textstat/textstat — Python, numerical library | No legal type for a formula coefficient or a scaling parameter. Flesch coefficients, SMOG constants, cache size, reading-time rate left with no card. |

One run finding a flaw is an anecdote. Two independent runs finding the same
flaw is a result: **the closed set of six is too narrow for general
software.** It was built for a decision system and it fits decision systems.

Run 2 refused to paper over it. Six catalog rows ship with `∅` in the card
path column — nouns that exist and have no legal card under my own rules.
A catalog that reports the method's failure in the method's own output
format is a better answer than a catalog that looks complete.

I have not widened the card set. Two days before a deadline is the wrong
time to redesign an ontology, and the finding is worth more standing than
patched.

---

## The territories

**Run 1 — koajs/ratelimit** · https://github.com/koajs/ratelimit
Rate limiter middleware for Koa. MIT, Copyright (c) 2019-present Koa.js
contributors. Mapped at commit `212a4ff`, last touched 2025-06-05.
Decision core: `index.js` (128 lines), `limiter/memory.js` (73),
`limiter/redis.js` (1 line, delegating to an external package).

**Run 2 — textstat/textstat** · https://github.com/textstat/textstat
Readability metrics for Python. MIT. Mapped at commit `e398f27`, last
touched 2026-02-18. 150 tracked files, 5,834 lines of Python.

**No source is reproduced here.** The cards cite file and line, as
`cartographer/rules.md` requires. Neither repository is vendored into this
one and nothing in either was modified.

**Not affiliated with either project, and not a review.** These maps
describe how the code decides, not whether it decides well. `drift` marks
places where documentation and runtime disagree; that is an observation,
offered in the same spirit as the drift marked against my own repo in
`../map/`.

## How the runs were set up

Fresh sessions, no memory of this repo or of building it. Given the four
instruction files by URL — `cartographer/README.md`, `rules.md`,
`identity.md`, `reference/card-types.md` — and the target repo by URL.
Nothing uploaded, nothing coached, no correction offered while they worked.
Each was told once that a rough honest run was worth more than a polished
one.

Full runs: `run-koajs-ratelimit.md` and `run-textstat.md`.

---

## What survived contact with unfamiliar territory

**The threshold type.** Run 1 identified `max: 2500` as a governance edge
unprompted and wrote it up with all five required sections, then called
`duration` a *less clean* threshold because it governs a temporal boundary
rather than a direct comparison. That is the type being used with judgement,
not pattern-matched off my examples.

**The wrong neighbour, twice, on code I have never read.**

Run 1 found `limit.remaining` versus `calls` — two counters, same
vocabulary, and only one is read by the verdict at `index.js:108`. A reader
watching the response header is watching the wrong number.

Run 2 found that `syllable_threshold` carries three different live values
depending on which caller you are inside: `2` by default in the public API
(`textstat.py:724`), `3` for English in Gunning Fog (`constants.py:20`), and
`0` when Dale-Chall calls it (`_dale_chall_readability_score.py:45`). At
zero, the easy-word list becomes the discriminator instead of syllable
length. Same parameter name, three meanings, one of which inverts what the
word "difficult" means.

**Documentation drift in both territories' own docs.**

Run 1: koajs's README lists `remaining`, `reset` and `total` as top-level
options; the runtime reads them from `opts.headers` (`index.js:54-58`). The
`status` option is implemented (`index.js:119`) and absent from the Options
list.

Run 2: textstat's README says the library "requires at least 3 sentences for
a result" for SMOG (`README.md:192-193`). `_smog_index.py` contains no such
guard — it counts sentences, divides, and catches only division by zero. A
single-sentence input returns `15.90`. The README documents a guard that
does not exist. Separately, the SMOG docstring says polysyllabic words have
"more than 3 syllables" while `_count_polysyllable_words.py:26` implements
`>= 3`.

**The decision-order walk.** Run 1 surfaced that blacklist is evaluated
before whitelist, so a whitelist entry cannot rescue a blacklisted request.
Nothing in the folder structure says that.

**Both runs refused to manufacture evidence.** No invented leftovers. Ghost
cards marked provisional where the absence proof could not be completed.
Dates marked `UNVERIFIED` rather than guessed. `∅` rather than a
mislabelled card. My own rule — a claim without a search is a guess and does
not ship — obeyed by strangers.

## What did not survive

Beyond the card-set gap above, both runs reported:

**The territory is not always closed.** koajs delegates its default Redis
counter to an external package. A one-card answer to "what changes if I
change Redis counter behaviour" cannot be given from inside that repository.
The map can name the boundary and no more.

**"Every tracked file" does not compose with tooling.** General repos carry
`.editorconfig`, `.npmrc`, `.remarkrc.js`, and a tracked PNG. Their readers
live outside the repository, and a binary has no meaningful source line. My
four states have no room for "live through an external convention" or
"cannot be established from territory-local evidence." Both runs recorded
their inventories as incomplete rather than inventing a fifth state.

**There is not always one decision order.** textstat fans out into many
independent metrics, most of them "counts → arithmetic → score." Treating
`text_standard` as a repository-wide spine would misdescribe the territory.
My catalog's central organising principle assumes a single pipeline.

**The bare-number rule explodes on numerical code.** `rules.md:13` collects
"any bare number"; `rules.md:24-25` excludes anything a reader would never
search for by name. On my own territory these never collided, because every
bare number in `scoring.js` is a policy constant. On a scientific library
every coefficient and test fixture wants a card. This tension is left
standing and documented rather than papered over.

## One contradiction found and fixed

Run 1 found that `rules.md:54` said "Every card carries both" — Hits and
Does not hit — while `reference/card-types.md:78` said "`Hits` is replaced
by `Proof of absence`" for ghost cards. Two of my four instruction files
gave opposite instructions. Neither of my earlier cold walks caught it.
`rules.md` now names the exception and points at `card-types.md`.

### Citation corrections made to the runs

Both runs are published as produced. Run 2 shipped with two citation errors
and run 1 with nine, corrected here rather than silently.

**Run 2 — two.**

- Cited `README.md:176-178` for textstat's SMOG sentence-minimum claim. The
  claim is at `README.md:192-193`; 176-178 is the Gunning Fog section.
- Cited `textstat.py:915-946` for the 1–18 grade clamp. The clamp is at
  `textstat.py:1004`.

**Run 1 — nine.** Every finding survived; only the numbers were wrong.

- `index.js:103`, cited eight times as where the verdict reads `remaining`,
  is a blank line. The read is `index.js:108`.
- `index.js:113` for the `status` option is `opts.errorMessage ||`. The
  option is set at `index.js:119`.
- `index.js:52-56` for the `opts.headers` destructure starts two lines early
  and stops before the line that names `opts.headers`. It is `54-58`.
- `index.js:47` for the `onLimited` default is `total: 'X-RateLimit-Limit'`.
  The default is `:49`.
- `index.js:115` for the `onLimited` call is blank. The call is `:121`.
- `index.js:86` for where `calls` is derived is a comment. The derivation is
  `:90`.
- Three ranges cited for koajs's Options list — `README.md:109-123`,
  `117-120`, `118-120` — land inside code examples and fences. The Options
  list is `README.md:121-137`; the three peer bullets are `132-134`.
- `README.md:40-44` and `83-87` for the nested `headers` blocks are the
  wrong offsets. They are `47-51` and `93-97`.
- `README.md:53-55` for the `onLimited` example is `disableHeader` and
  `whitelist`. The block is `60-62`.

**Why run 1 was worse, and what that measures.** `verify.js` Check 3 reads
only `map/cards/`. Neither portability territory is vendored into this repo,
so nothing ever printed these lines beside their claims. I opened all of them
by hand before submission.

That is the failure class my own C1, C5 and C13 record, in my own writing, in
the one folder my own checker cannot reach. It is the sharpest available
statement of what Check 3 is worth: inside its reach, five citations were
wrong and it flagged one. Outside its reach, nine were wrong and nothing
flagged any.

---

## What these runs do and do not establish

They establish that the governance model, the wrong-neighbour discipline,
and the drift state produce real findings on territory the method was not
built for — including two documented-but-absent guards in maintained
libraries — and that the folder is legible enough for cold sessions to apply
it without help.

They do not establish that the method is ready for general software repos.
It is not, and now there is replicated evidence of exactly where the
boundary sits. `identity.md` says this is a cartographer for decision
systems. These two runs are the sharpest available statement of how narrow
that actually is.

Two runs, two territories, two sessions. Reported as such.
