# TIE_FACTOR

**Type:** threshold
**State:** live · computed
**Stage:** math
**Source:** `scoring.js:39` — declared at the top, used in `_edgeVsGap`

---

## Current value

`1.3` — a 30% margin.

## What it is

A dominance threshold. Strengths must exceed gaps by this multiple before
the system will call the picture `edge` rather than `balanced`.

## What it gates

Whether the system is willing to commit to a directional read of the
candidate. Below the margin, it refuses to call a winner.

## Why it is shaped this way

Without a margin, a hair more strength than gap would read as dominance.
The multiplier forces a real separation before the system commits.

## Hits

- `edgeVsGap` — the only consumer. Flips edge / gap / balanced.
- `recommendation` — a score of 55+ requires **both** two apply votes **and**
  `edgeVsGap === 'edge'` to earn a clean "Apply." Raise TIE_FACTOR and clean
  Applies become "Apply with Caution."
- Evidence Ledger display — `render.js` lines 207 and 219 print the dominance
  word and whether edge dominance was reached.

## Does not hit

- **`score`. Not by one point.** TIE_FACTOR appears nowhere in the score
  computation. Verify: `grep -n "TIE_FACTOR" scoring.js` returns the constant
  and `_edgeVsGap`. Neither touches `base`, `bonus`, or any cap.
- **`EDGE_BONUS` — the wrong neighbour.** Both are named "edge." EDGE_BONUS
  adds points to the score and never touches `edgeVsGap`. TIE_FACTOR moves
  `edgeVsGap` and never touches the score. Same word, opposite mechanisms,
  no shared code path.
- `verdict` — score bands only. TIE_FACTOR cannot move a verdict.

## If you change it

Raising it makes a clean "Apply" rarer **without changing any number on
screen.** A reader who expects the score to move will conclude the change
did nothing. It did — the advice changed, silently.

This is the signature behaviour of a governance edge: no data moved, and
the system reached a different conclusion.
