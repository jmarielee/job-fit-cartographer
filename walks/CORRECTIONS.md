# Corrections — inventory errors caught before shipping

Recorded as they happened. Not cleaned up after.

The protocol in `PROTOCOL.md` requires that a ghost be proven by search
rather than asserted. Running those searches corrected four of my own
claims. Three were mine; one was a card I had already written.

---

## Index — all sixteen, and where they live

Sixteen corrections across three files, numbered in the order they were
found rather than the order they are filed. C13 is a correction of a
correction: the first fix was worse than the error.

| # | What was wrong | File |
|---|---|---|
| C1 | "Guard 2 is missing" | `CORRECTIONS.md` |
| C2 | "operator/ is a ghost" — half wrong | `CORRECTIONS.md` |
| C3 | one file inside operator/ IS a ghost — missed | `CORRECTIONS.md` |
| C4 | "TIE_FACTOR does not hit the display" | `CORRECTIONS.md` |
| C5 | the decision order was wrong | `CORRECTIONS.md` |
| C6 | "the Evidence Ledger is a live stage" — wrong twice | `CORRECTIONS-addendum.md` |
| C7 | the removal is dated and the code recoverable | `CORRECTIONS-addendum.md` |
| C8 | a third generation of drift | `CORRECTIONS-addendum.md` |
| C9 | a filter tests for a value its schema forbids | `CORRECTIONS-C9.md` |
| C10 | "the math owns the number" — true, wrong place | `CORRECTIONS-addendum.md` |
| C11 | "Mode 2 doesn't reach the computed output" | `CORRECTIONS-addendum.md` |
| C12 | benchmark-evaluator.md undercounted its own proof | `CORRECTIONS.md` |
| C13 | ledger-state-layer.md miscounted, and the first fix was worse | `CORRECTIONS.md` |
| C14 | compute-score.md cited five app.js lines it never opened | `CORRECTIONS.md` |
| C15 | the catalog answered a question it should have pointed at | `CORRECTIONS.md` |
| C16 | four coefficients typed as thresholds | `CORRECTIONS.md` |

## C1 — "Guard 2 is missing" — WRONG

**Claimed:** `scoring.js` comments number guards 1 and 3 with nothing
between them, so a Guard 2 was deleted. Filed as a ghost.

**Search that corrected it:**
```
grep -n "Guard" operator/rules.md
→ Guard 1 required-gate cap
→ Guard 2 confidence floor
→ Guard 3 core-gate ceiling
```

**Actual:** No guard is missing. All three run. The `scoring.js` comments
call the confidence floor "Guard 3" and leave the core-gate ceiling
unnumbered — the code's comment numbering drifted from the spec's.

**Resolution:** ghost card deleted. Replaced with `cards/guard-numbering.md`,
state `drift`.

---

## C2 — "operator/ is a ghost" — HALF WRONG

**Claimed:** a folder of scoring rules the app cannot read, therefore a ghost.

**Verification run:** recomputed the demo case by hand from `DEMO_DATA`
through `computeScore` and compared against `operator/examples.md`.

| Value | operator/examples.md | recomputed |
|---|---|---|
| base | 62.2 | 62.19 |
| bonus | +2.3 | +2.27 |
| cap fires | no (needs 2+) | no (1 missing) |
| score | 64 | 64 |
| routing | Apply with Caution | Apply with Caution |

**Actual:** the app genuinely cannot read the folder — that part held. But
the files are **accurate**. `rules.md`, `identity.md`, and
`evaluator-personas.md` describe the running system correctly.

That makes it a **leftover**, not a ghost, and a more dangerous one: an
obviously stale file is harmless, a correct file that does nothing is not.

**Resolution:** state changed to leftover. Card rewritten to say the
contents check out.

---

## C3 — one file inside operator/ IS a ghost — MISSED ENTIRELY

**Found while verifying C2.** `operator/reference/scoring-rubric.md` is a
near-duplicate of `operator/rules.md` with `GATE_CORE_CEIL` and Guard 3
absent. It describes a two-guard system that no longer exists.

Two generations of drift in one folder. The original inventory treated the
folder as uniform and missed it.

**Resolution:** new card, `cards/scoring-rubric-file.md`, state ghost.

---

## C4 — "TIE_FACTOR does not hit the display" — WRONG

**Claimed, in the first version of `cards/tie-factor.md`:** changing
`TIE_FACTOR` moves no number on screen.

**Search that corrected it:**
```
grep -n "1\.3" render.js
→ 209:  const domTest = `S ${S} vs 1.3×G ${(1.3 * G).toFixed(2)} → ${domWord}`;
```

**Actual:** the Score Receipt hardcodes `1.3` rather than reading
`TIE_FACTOR`. Lines 212–214 hardcode `90`, `45`, and `74` the same way.

Change any threshold and the receipt keeps printing the old value **and
computes the dominance test with it** — the receipt disagrees with the
system while claiming to show its work.

**Resolution:** every threshold card gains a receipt-drift line.
New card: `cards/score-receipt.md`.

---

## C5 — the decision order was wrong — STRUCTURAL

**Claimed:** five stages — labels, math, guards, verdict, display. The
Evidence Ledger was filed under display as "shows the math in the open."

**Source that corrected it:** `render.js:556`

The Evidence Ledger is the human-audit stage *between* labeling and scoring.
It carries live controls for tier, centrality, and status, a checkbox for
obtainable, consensus chips reading UNANIMOUS / SPLIT / OPERATOR, and it
recomputes on every change.

It is not display. It is a stage, and it is the stage where the
human-in-the-loop actually lives.

**Resolution:** catalog rebuilt with six stages. Ledger promoted to its own
group with two cards — the two ghosts it left behind.

---

## What C1–C5 changed about the map

Four of the five corrections came from the same root cause: `operator/` is
the original specification build and the root JS files are a later
standalone site. The spec stayed put and the implementation moved.

That lineage is now stated at the top of `catalog.md`, because a reader who
does not know it will trust the wrong file every time.

The corrections that follow — C12, C13, C14 — have a different root cause,
and it is not the territory. It is this map trusting a derivation over a
lookup.

## C12 — benchmark-evaluator.md undercounted its own proof

**Claimed:** the search for "benchmark" returns 6 matches.

**Source that corrected it:** `app.js:54`

Check 6 re-runs every ghost proof against the pinned source instead of
trusting the pasted result. The search returns 7, not 6. The seventh is
`app.js:54` — the `DEMO_DATA` literal, which contains `benchmarkProfile`.
It was missed because that line is a single 8,000-character JSON blob and
does not read as a match at a glance.

**Resolution:** the card states 7 and names `app.js:54`. The conclusion did
not change — no evaluator with id `benchmark` exists, and all seven matches
are still something else. The ghost is still a ghost. The proof was just
sloppy about how many things it had ruled out.

---

## C13 — ledger-state-layer.md miscounted, and the first correction was worse

**Claimed:** 11 hits, all between `render.js:600` and `render.js:677`.

**Source that corrected it:** `index.html:146-151`

Check 6 found 14 hits, not 11. The first correction written from that result
said the state layer reached into the markup — that four references lived in
`index.html`, and a reader deleting the orphaned `render.js` code would
leave them behind.

That was wrong, and it was wrong the same way C1 and C5 were wrong: written
from a list of line numbers without opening the lines.



## C14 — compute-score.md cited five app.js lines it never opened

**Claimed:** `computeScore` is called from `app.js:71`; the guard is at
`app.js:69`; the assignments are `app.js:72–74`; `_brain` is attached at
`app.js:75`; `evaluator.score` is read at `app.js:71`.

**Source that corrected it:**

```
sed -n '68,74p' app.js

app.js:68    if (demo.jdItems && demo.jdItems.length) {
app.js:69      const _vote = (demo.evaluators || []).map(...)
app.js:70      const _b = computeScore({ ... });
app.js:71      demo.survivabilityScore = _b.score;
app.js:72      demo.recommendation     = _b.recommendation;
app.js:73      demo.verdict            = _b.verdict;
app.js:74      demo._brain = _b;
```

All five were wrong. The call site is `:70`, the guard is `:68`, the
assignments are `:71–73`, `_brain` is `:74`, and `evaluator.score` is `:69`.

**How they got that way.** `scoring.js:343–350` and `app.js:68–74` are the
same block written twice — once for a real run, once for the demo. They are
near-identical, so the app.js numbers appear to have been derived by
offsetting from the scoring.js numbers instead of opened. The offset is
wrong because `scoring.js` carries one line the demo does not:
`scoring.js:349`, the `lowConfidence` assignment. Four citations came out
one line high. The fifth was two lines high, so it was not even a consistent
offset — it was arithmetic done twice, differently, and checked neither time.

**What caught it, and what didn't.** Check 3 flagged one of the five:
`app.js:75` is a closing brace, and the blank-line/lone-brace heuristic
printed it as the single `?` row in the run. That was the whole visible
symptom — one warning line under a green banner. The other four landed on
real, plausible-looking code and Check 3 had nothing to say about them,
because it cannot decide whether a citation says what the card claims. It
only reports what the line contains and leaves the judgement to a reader.
Four of five were invisible to the verifier and were found by a reader
putting the two blocks side by side.

**Resolution:** five citations corrected. The run's only warning cleared,
and Check 3's `?` count went to zero.

**What this says about the map.** This is the fourth correction in this log
written from line numbers that were reasoned about rather than read — C1,
C5, C13, and now this one. The pattern is not carelessness about which file;
every one of these citations named the right file and described the right
behaviour. The pattern is trusting a derivation over a lookup. Check 3 exists
because of it, and Check 3 caught one in five. That ratio is the honest
measure of what a citation checker can do.

---

## C15 — the catalog answered a question it was supposed to point at

**Claimed:** catalog row for `CAP_VALUE` — "ceiling when required items
unmet."

**Source that corrected it:**

```
scoring.js:70     it.tier === 'required' &&
scoring.js:71     (it.centrality === 'core' || it.centrality === 'supporting') &&
scoring.js:72     it.status === 'missing' &&
scoring.js:73     !it.obtainable
scoring.js:137    if (reqMiss >= 2) {
```

The cap needs **two or more** such items. Core or supporting only. Not
obtainable. One unmet required item does nothing.

**How it was found.** Cold walk 4. Asked why an application was capped at
45, a reader with only `README.md` and `map/catalog.md` answered from that
row and said a single unmet required qualification could cap the score. It
did not open a card. It did not ask for one. The row read like an answer, so
it stopped.

`cards/cap-value.md` had it right the whole time — "two or more core or
supporting required items unmet and not obtainable," line 16. When the card
was handed over on the second turn, the reader corrected every part of its
own answer unprompted, including all three exclusions. The card was never
the problem.

**Resolution:** the row now reads "ceiling; count and conditions on the
card." It names that a count and conditions exist and holds neither.

**What this says about the map.** `catalog.md` opens by declaring that it
points and does not explain, and names the failure mode: "If a row tells you
a value, the row is wrong." Walk 1 caught a row carrying a value. This one
caught a row carrying a rule — which the stated test does not describe, and
which is worse, because a wrong value looks like a number and a wrong rule
looks like understanding. The catalog has now leaked content twice, in two
forms, and both times a cold reader trusted it over the card that owned it.

---

## C16 — four coefficients were typed as the thing my own spec says they are not

**Claimed:** eleven of the 38 cards were `threshold` cards, and the README
said each one named what it gates.

**Wrong on both halves.**

`card-types.md` draws the line itself: "A weight scales an output. A threshold
decides whether a conclusion is allowed." `TIER_W`, `CENT_W`, `STATUS_F` and
`EDGE_BONUS` scale outputs. Their own cards say so in their opening lines —
`tier-w.md` calls TIER_W something "multiplied by CENT_W to give one item's
weight," and `status-f.md` calls STATUS_F "what a gap costs, as a fraction of
the item's weight." Four coefficients were wearing the type that exists to
mark governance.

And six of the eleven had no `What it gates` section at all, so the README
sentence was falsifiable by one grep.

**How it was found.** Not by me. The two portability runs in `portability/`
— koajs/ratelimit and textstat/textstat, different languages, cold sessions
that never saw each other — both reported the same defect: no legal type for
a plain coefficient. I published that finding in the README and did not go
back and check whether my own map had the same problem. It did. Six catalog
rows in the textstat run ship with `∅` for exactly this reason; four rows in
my own map hid it by picking the nearest wrong type instead.

**Fixed.** The four are `object` cards now. `verdict.md` and
`vote-threshold.md` are genuine thresholds and gained the two sections they
were missing. Seven thresholds remain. `card-types.md` states where
coefficients belong, and names the deeper gap it does not fix: `ghost` and
`leftover` are wiring states occupying slots in a set that otherwise answers
"what kind of thing is this", which is why `drift` has no type and
`guard-numbering.md` is an `object` with `State: drift`.

**What this cost.** The headline number went from eleven to seven. The type
is stronger for it: a governance type that admits coefficients is not a
governance type.
