# vote

**Type:** computed value
**State:** live
**Stage:** 5 — VERDICT
**Source:** `scoring.js:115–123` (`_tallyVote`), `:172` (call site), read at `:184`, `:186`, `:195`, `:207`, returned at `:213`; displayed at `render.js:218`

## What it is

Two counts — how many evaluators would advance the candidate, how many would
pass:

```js
const vote = _tallyVote((model.evaluators || []).filter(e => e.id !== 'benchmark'));   // :172
```

The evaluators arriving here are not the model's three characters. They are
stripped down to `{ id, lean }` by the caller before `computeScore` ever sees
them (`scoring.js:344`, `app.js:69`), where `lean` is decided by a bare `55`.
See `cards/vote-threshold.md`.

## Why it is shaped this way

The room is nuance, not a veto. The comment at `:181` says it: score is the
floor, the split can add caution but cannot override a healthy score. So the
vote is counted, never weighted, and never allowed to lower a verdict on its
own.

## Hits

- **`recommendation`, two branches.** At `:184`, `apply >= 2` is one of the two
  conditions for a clean `Apply`. At `:186`, in the 45–55 window, it is the
  *only* condition — the vote alone decides between `Apply with Caution` and
  `Do Not Apply`.
- **`committeeNote`** (`:195–205`), the plain-English sentence.
- **`divergent`** (`:207`), which is computed and never read — see
  `cards/divergent.md`.
- The routing line in the receipt (`render.js:218`).

## Does not hit

**`verdict`. The wrong neighbour is `score`.**

The bands at `:176–179` read `score` and nothing else. All three evaluators can
lean skip and the verdict will still read `Strong Candidate` if the labels
support it. That divergence is not a bug — the system prompt instructs the model
to name it out loud in `committeeRead` when it happens (`scoring.js:237`).

Also does not hit:

- **The benchmark evaluator.** Filtered at `:172`, and no such evaluator is ever
  produced — the schema demands exactly three ids. See
  `cards/benchmark-evaluator.md`.
- **Anything, when `lean` is blank.** `:118–120` counts a lean containing
  "skip", else one containing "apply", else neither. A missing lean is silently
  uncounted, so `apply + skip` can be less than 3 and `committeeNote` will
  describe a smaller room than the page shows.
