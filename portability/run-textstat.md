# Run 2 — cartographer/ applied to textstat/textstat

Date: 2026-08-23
Reader: ChatGPT, temporary session, no memory of this repo, of building it,
or of Run 1.
Given: the four instruction files by URL — `cartographer/README.md`,
`cartographer/rules.md`, `cartographer/identity.md`,
`cartographer/reference/card-types.md` — and the target repo by URL.
Territory: https://github.com/textstat/textstat at commit `e398f27`,
last touched 2026-02-18. 150 tracked files, 5,834 lines of Python. MIT.

Instruction given, once, verbatim:

> Produce what the method says to produce: an inventory first, then a
> catalog, then cards. Follow the rules as written — cite file and line,
> never copy source into a card, every card carries Hits and Does not hit
> including a wrong neighbour, and mark live / leftover / ghost / drift with
> proof. Don't optimize for a good-looking result, and tell me plainly where
> the method doesn't fit this territory rather than working around it. A
> rough honest run is worth more to me than a polished one.

Nothing was uploaded. Nothing was coached. No correction was offered while
it worked. The territory was chosen for being deliberately unlike Run 1 —
different language, different domain, and large enough that my own scope
rule accepts it, which Run 1's territory did not.

## Two citation corrections

Published as produced, except for two citation errors corrected here and
recorded rather than silently fixed:

- The run cited `README.md:176-178` for the SMOG sentence-minimum claim.
  The claim is at `README.md:192-193`. Lines 176-178 are the Gunning Fog
  section.
- The run cited `textstat.py:915-946` for the 1–18 grade clamp. The clamp is
  at `textstat.py:1004`.

Both were found by opening the cited lines rather than trusting them — the
same procedure that produced corrections C1, C5 and C11 against my own map.

## What the run found, verified against source

Every claim below was checked by reading the cited line or running the
library:

- **A documented guard that does not exist.** `README.md:192-193` says
  textstat requires at least three sentences for a SMOG result.
  `_smog_index.py` has no such guard. A one-sentence input returns `15.90`.
- **A docstring that disagrees with its own implementation.**
  `_smog_index.py` says polysyllabic words have "more than 3 syllables";
  `_count_polysyllable_words.py:26` implements `>= 3`.
- **One parameter name, three live values.** `syllable_threshold` is `2` by
  default in the public API (`textstat.py:724`), `3` for English in Gunning
  Fog (`constants.py:20`), and `0` when Dale-Chall calls it
  (`_dale_chall_readability_score.py:45`) — at which point the easy-word
  list, not syllable length, decides what "difficult" means.
- **Six catalog rows with no legal card.** Formula coefficients and scaling
  parameters have no type in my closed set. The run marked them `∅` rather
  than mislabelling them as thresholds.

---

## The run

The full output is in `textstat-cartographer-transfer/`, as produced:

- `00-inventory.md` — four sweeps, with per-file dates marked UNVERIFIED
  rather than guessed
- `01-catalog.md` — 21 rows, six of them `∅` because no legal card type
  exists for a formula coefficient
- `02-collisions.md` — three words carrying more than one live meaning
- `04-transfer-findings.md` — where the method fit and where it broke
- `cards/` — the 15 cards for rows that had a legal type
- `README.md` — the run's own framing

Walk it the way the method says: open `01-catalog.md`, find a row, open one
card, stop.

Six rows have no card to open. That is the finding, not a gap in the run.