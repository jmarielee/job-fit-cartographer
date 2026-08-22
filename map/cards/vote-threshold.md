# evaluator vote threshold

**Type:** threshold
**State:** drift
**Stage:** 5 — VERDICT
**Source:** `scoring.js:344` and `app.js:69` (the two copies), `scoring.js:237` (a third, in prose); the disagreeing copy is `render.js:35–36`

## What it is

The number that decides whether an evaluator counts as a yes. It has no name:

```js
lean: (e.score ?? 50) >= 55 ? "apply" : "skip"   // scoring.js:344, app.js:69
```

Written twice, once for real runs and once for the demo, as a bare literal in
both. It is not in `scoring.js`'s constants block and `computeScore` never sees
it — by the time the brain is called, the evaluators have already been reduced
to `{ id, lean }`.

## Why it is shaped this way

It sits in the callers because it converts a model-written number into a
math-readable one, which is the boundary between the two halves of the system.
That placement is defensible. Being unnamed and duplicated is not.

## Hits

- `vote.apply` and `vote.skip` (`scoring.js:115–123`), and through them the
  recommendation at `:184` and `:186`, plus `committeeNote` and `divergent`.

## Does not hit

**The badge next to each evaluator's name. The wrong neighbour is `evalVerdict`
(`render.js:33–38`).**

This is the drift, and it is visible in the shipped demo. Two different
thresholds read the same `evaluator.score` and disagree:

| | boundary | reads |
|---|---|---|
| the vote | `>= 55` → apply | the math |
| `evalVerdict` | `>= 65` → "Would advance", `>= 50` → "On the fence" | the page |

The demo's hiring manager scores **58**. The math counts him as an **apply**.
The page labels him **"On the fence"** — a label written to mean undecided.

The consequence reaches print. `committeeNote` reads *"Committee divided — 2 of
3 would advance you"* (`scoring.js:203`), while the committee tally on the same
report shows exactly **one** badge saying "Would advance" (`render.js:298–305`).
Two counts of the same room, both computed, differing by one. Nothing
reconciles them.

Also does not hit:

- **The score.** Evaluator scores are model prose; only the derived lean enters
  the brain.
- **The evaluator cards' own numbers.** Those print unchanged from the model.

## If you change it

**Changing 55 means changing three places, and one of them is English.** The
two code copies at `scoring.js:344` and `app.js:69`, plus `scoring.js:237`,
where the system prompt tells the model that a majority below 55 is the signal
to name a divergence out loud. Edit the code and the prompt keeps briefing the
model on the old boundary.

**The two thresholds mean different things by the same score, and one of them
is wrong.** "On the fence" was written to mean undecided. The vote treats the
same evaluator as a decided yes. A 58 is therefore undecided on the page and
counted as a yes in the arithmetic, and nothing in the source reconciles the
two. Aligning `evalVerdict`'s lower bound to 55 would make the badge and the
tally agree, at the cost of shrinking "On the fence" to a five-point band —
which suggests the real fix is deciding what the middle badge is for, not
nudging a number.

### Receipt drift

The receipt prints `${b.vote.apply}/3 apply leans` (`render.js:218`), hardcoding
the denominator as 3. If an evaluator's lean is unparseable it is counted as
neither (`scoring.js:118–120`), so the true denominator can be lower and the
receipt will still say 3.
