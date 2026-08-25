# Corrections — addendum

Continues `CORRECTIONS.md`. Same rule: recorded as they happened, not
cleaned up after.

---

## C6 — "the Evidence Ledger is a live stage" — WRONG, TWICE

**First claim (C5):** the Evidence Ledger is the human-audit stage between
labeling and scoring, and the catalog needs a sixth group for it.

That came from reading `render.js:556–559`, which describes exactly that.
The comment is accurate about what the code was designed to do. It says
nothing about whether the code runs.

**Search that corrected it:**
```
grep -n "renderLedgerSection" render.js app.js scoring.js index.html
→ render.js:663 — definition only, no call sites
```

**Second error, inside the first.** Having found one uncalled function, I
reported the build as broadly broken. That was also wrong. I traced all 27
functions across `render.js` and `app.js` and every other one resolves —
including three that appear only once because they are wired through
`addEventListener` in `app.js:136–140`.

`renderLedgerSection()` is **the only defined-and-never-called function in
the codebase.** One uncalled function holding an entire subsystem offline,
in an otherwise fully-wired build.

**Resolution:** the Ledger group in the catalog collapses from six live
cards to two ghost cards plus one live Display card. Stage 2 is retained as
a group because the reader still needs a door to walk in through — but it
is labeled dead.

---

## C7 — the removal is dated and the code is recoverable

Not a correction. A finding that only appeared because C6 forced a history
search.

```
git log --oneline -S "applyLedgerEdit" --all
→ 09d4ab3, 580d613
```

| | |
|---|---|
| Built | 2026-07-04, `580d613` — 152 lines to render.js, engine to scoring.js, UI to index.html, 115 lines of styles |
| Removed | 2026-07-14, `09d4ab3` — one file touched, scoring.js, 80 insertions / 376 deletions |

`render.js` was not in the removing commit, which is why the display half
survives.

The scoring brain survived too: `CAP_VALUE` at line 57 and `GATE_CORE_CEIL`
at 58 of the old file, `computeScore` at 144, all carried into the current
version. The cut was surgical, not a wrong-file upload.

**Intent is not established and the cards do not claim it.**

---

## C8 — a third generation of drift, found in the recovered file

`09d4ab3^:scoring.js:182`:
```js
if (gate && gate.centrality === 'core' && score > GATE_CORE_CEIL)
```

Current `scoring.js` adds a third condition: `gate.status === 'missing'`.

The core-gate ceiling used to fire on **partial** core gates. It no longer
does. That change was made after 2026-07-14.

So the territory now has three dated generations of the same rule:

| Source | State |
|---|---|
| `operator/reference/scoring-rubric.md` | no `GATE_CORE_CEIL` at all |
| `operator/rules.md` | ceiling present, no status condition |
| `scoring.js` | ceiling present, missing-only |

Each was accurate when written. A reader who opens any one of them alone
learns a different system.

**Resolution:** `cards/gate-core-ceil.md` gains a generations table.
`cards/scoring-rubric-file.md` already marks the oldest as a ghost.

---

## C10 — "the math owns the number" — TRUE, BUT NOT WHERE I SAID

**Claim, running through the whole Math group:** `computeScore` is what makes
the score honest.

`computeScore` (`scoring.js:124–215`) mutates nothing. It receives labels,
returns an object, and walks away. The model still emits its own
`survivabilityScore`, `verdict`, and `recommendation` — the schema at
`scoring.js:302` requires them, and they arrive in every response.

**Search that located the actual guarantee:**
```
grep -n "survivabilityScore" scoring.js app.js
→ scoring.js:302  — the schema asking the model for one
→ scoring.js:346  — the overwrite
→ app.js:54       — DEMO_DATA ships 68
→ app.js:71       — the overwrite
```

Five lines in the real-run caller, `scoring.js:346–350`:

```js
parsedData.survivabilityScore = _b.score;
parsedData.recommendation     = _b.recommendation;
parsedData.verdict            = _b.verdict;
if (_b.lowConfidence) parsedData.confidenceLevel = "low";
parsedData._brain             = _b;
```

Four more doing the same in `app.js:71–74`, minus the confidence line.

Remove them and the tool displays model-generated numbers. No error. No visual
difference. The Score Receipt would not lie — it would disappear, because
`render.js:189–190` returns early when `_brain` is absent.

**Correct statement:** the scorer is not the guarantee. The wiring is, and it
lives outside the scoring brain, in two files, duplicated, with nothing
asserting it.

---

## C11 — "Mode 2 doesn't reach the computed output" — WRONG

**First claim:** the two-mode split in `systemPrompt` keeps the cynical
adversarial voice entirely out of anything computed.

The prompt says Mode 1 "drives the computed survivability score"
(`scoring.js:223`). That sentence is exactly true. I read it as broader than it
is written.

Nothing from Mode 2 reaches `scoring.js:128–169`. The score is clean.

But the evaluator **scores** are Mode 2 output — produced alongside the
objections and gut takes, under the cynical instruction at `scoring.js:226`.
Both call sites convert them to votes before `computeScore` ever runs:

```
grep -n 'lean: (e.score' scoring.js app.js
→ scoring.js:344
→ app.js:69
```

```js
lean: (e.score ?? 50) >= 55 ? "apply" : "skip"
```

That vote is read at `scoring.js:184` and `:186`.

| Score band | What the vote can do |
|---|---|
| ≥ 55 | `Apply` → `Apply with Caution` |
| 45–54 | `Apply with Caution` → `Do Not Apply` |
| < 45 | nothing — already `Do Not Apply` |

The `internal` evaluator is instructed toward skepticism at `scoring.js:231`
("territory defense, status quo preservation… Skeptical of external hires").
It scores 43 in the shipped demo. A persona written to be harsh casts a
structural skip vote, and that is one of three.

**Correct statement:** Mode 2 cannot touch the score. It can change the
recommendation.

**Note:** the `55` in that line is not `TIE_FACTOR`-style tunable. It is a bare
literal, duplicated across two files, outside the constants block, and it means
something different from the `55` at `scoring.js:177` and `:183` — this one is
one evaluator's rating, that one is the candidate's whole score. Same number,
two meanings, no name. See `cards/vote-threshold.md`.

---

## Method note

Every correction in this log came from the same discipline: the rules
require that a ghost be proven by search rather than asserted, and that a
live claim be checked against the source rather than against a comment.

Comments in this territory are honest about intent and silent about
execution. `render.js:556` describes a subsystem that ran for ten days in
July. Nothing in the comment is false. It simply is not present tense.
