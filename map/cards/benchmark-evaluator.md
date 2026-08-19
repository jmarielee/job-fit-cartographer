# The `benchmark` evaluator

**Type:** ghost
**State:** ghost
**Stage:** verdict
**Source:** `scoring.js` — filtered out in `computeScore` before `_tallyVote`

---

## What the name suggests

A fourth evaluator, distinct from recruiter / hiring / internal, whose vote
is deliberately excluded from the committee tally — perhaps a scoring
reference or a control voice.

The exclusion is written as though this evaluator exists and must be handled:
`(model.evaluators || []).filter(e => e.id !== 'benchmark')`.

## Proof of absence

```
grep -n "benchmark" render.js app.js index.html
→ 6 matches, all of them something else:
  render.js:437,438  benchmarkProfile (a narrative comparison)
  render.js:10,13    section-benchmark (a page section)
  app.js:118         section-benchmark (a page section)
  index.html:179     section-benchmark (a page section)
```

No evaluator with id `benchmark` appears anywhere. The system prompt
forbids one outright: it requires exactly three evaluators with ids
`recruiter`, `hiring`, and `internal`, and instructs that none be omitted.

The code defends against something the prompt makes impossible.

## Why a reader will trip on it

This is the worst kind of ghost to grep for. Searching "benchmark" returns
six confident hits, none of which are this. A reader will conclude the
evaluator is real, find `benchmarkProfile`, and connect two unrelated things.

See `cartographer/reference/collisions.md` — "benchmark" means three
different things in this territory.

## What to do instead

To add a fourth evaluator, both the system prompt and the vote tally must
change. The filter alone does nothing.
