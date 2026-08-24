# verdict

**Type:** threshold
**State:** live
**Stage:** 5 — VERDICT
**Source:** `scoring.js:175–179` (the bands), `:213` (returned); displayed at `render.js:256` (hero) and, in the removed ledger, `render.js:647`

## Current value

`75`, `55`, `35` — three boundaries, four bands. `scoring.js:176-179`.

## What it gates

Which of four words the reader sees under the score. Nothing else: not the
recommendation, not the committee read, not the colour of the ring.

## What it is

Four words, chosen by four numbers:

```js
if (score >= 75)      verdict = 'Strong Candidate';    // :176
else if (score >= 55) verdict = 'Viable but Exposed';  // :177
else if (score >= 35) verdict = 'Long Shot';           // :178
else                  verdict = 'Do Not Apply';        // :179
```

Nothing else is consulted. Not the vote, not the gate, not the confidence.

## Why it is shaped this way

The comment at `:174` states the rule: verdict follows score bands only, and a
committee split is nuance rather than a veto. Everything the room thinks reaches
the reader through `recommendation` and `committeeRead` — never through the
verdict. One input, one output, no arguing.

## Hits

- The headline word under the score ring (`render.js:256`).
- Nothing in the math downstream. `recommendation` reads `score` directly
  (`:183`, `:185`), not the verdict word.

## Does not hit

**The colour of the ring, or the benchmark gauge. The wrong neighbour is
`scoreClass` (`render.js:39–44`).**

The same four boundaries are written a second time in the display layer:

```js
if (n >= 75) return 'hi';   if (n >= 55) return 'mid';   if (n >= 35) return 'lo';   // render.js:40–42
```

And a third time as `THE_BAR = 75` (`render.js:446`), the marker on the
benchmark gauge. Three copies of 75, two copies of 55 and 35, no shared
constant. They agree today by coincidence of maintenance, not by construction.

Also does not hit:

- **`recommendation`.** The two use different boundaries on the same number —
  the verdict switches at 55/35, the recommendation at 55/45. A score of 50 is
  a `Long Shot` that can still be recommended as `Apply with Caution`. That is
  the intended overlap, not a fault.

## If you change it

**Edit `scoring.js:176` alone and the report starts contradicting itself.** The
word under the ring will say `Strong Candidate` while the ring is still amber
and the gauge marker still sits at 75. Any band edit is a three-file edit:
`scoring.js:176–179`, `render.js:40–42`, `render.js:446`.

**The top band is unreachable in several common runs.** `GATE_CORE_CEIL` is 74
(`:38`), one below the `Strong Candidate` line — so any live core missing gate
makes 75 impossible by construction. The band exists; the guard closes it.

### Receipt drift

The receipt never prints the bands. It prints the final score
(`render.js:234`) and lets the verdict appear elsewhere. The `90 / 45 / 74`
literals at `render.js:212–214` are the guard numbers, not these — see
`cards/score-receipt.md`.
