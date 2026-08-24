# Corrections — inventory errors caught before shipping

Recorded as they happened. Not cleaned up after.

The protocol in `PROTOCOL.md` requires that a ghost be proven by search
rather than asserted. Running those searches corrected four of my own
claims. Three were mine; one was a card I had already written.

---

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
