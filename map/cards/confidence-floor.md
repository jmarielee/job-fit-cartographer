# Confidence floor

**Type:** threshold
**State:** live · computed
**Stage:** guards
**Source:** `scoring.js` — `_confidence`, applied in `computeScore` as Guard 3

---

## Current value

Three input tests, any one of which returns `low`:
fewer than 3 jdItems, resume under 200 characters, job description under
200 characters.

When `low`, the score is clamped into the range **40 to 65**.

## What it is

A guard against extreme verdicts built on thin evidence. It does not
measure how confident the model is. It measures whether there was enough
input to justify a strong claim in either direction.

## What it gates

Whether the system is permitted to say something decisive at all.

## Why it is shaped this way

A near-empty resume against a near-empty job description can produce a
mathematically clean 0 or 90. Both are lies. The clamp forces the output
into the middle band where the verdict reads as uncertain rather than
confident.

## Hits

- `score` — clamped into 40–65 when any input test fails.
- `lowConfidence` — set true, returned in `_brain`.
- `confidenceLevel` — overwritten to `"low"` in the parse step, replacing
  whatever the model wrote.
- `verdict` and `recommendation` — indirectly, because both read the
  clamped score.

## Does not hit

- **The labeling personas. At all.** This is the wrong neighbour, and it is
  the word every reader reaches for first. The three evaluators, their
  objections, their scores, and every narrative field are produced by the
  model before this guard runs. Raising or removing the floor changes no
  persona output. Verify: the floor is applied inside `computeScore`, which
  runs *after* the API response is parsed.
- **`confidenceLevel` on individual evaluators.** Each evaluator writes its
  own; the floor does not touch them.
- `jdItems`, `strengths`, or any label. Labels are model-owned.

## If you change it

**It raises bad scores as well as lowering good ones.**

Most readers assume a floor only cuts things down. This one is a clamp in
both directions: `Math.max(40, Math.min(65, score))`. Feed it garbage and
the result is 40, not 0. A hopeless application with a two-line resume comes
back looking merely weak.

Widen the range and thin inputs start producing confident verdicts again.
Narrow it and every thin input converges on the same number, which makes the
score meaningless in that band.
