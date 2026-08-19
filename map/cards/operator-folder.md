# operator/

**Type:** ghost
**State:** ghost
**Stage:** labels
**Source:** `operator/` — 6 files. Referenced by no running code.

---

## What the name suggests

A folder containing `identity.md`, `rules.md`, `examples.md`,
`report-template.md`, and `reference/` with `evaluator-personas.md` and
`scoring-rubric.md`. It reads as the configuration that drives the scanner:
who the three evaluators are, and how scoring works.

It is detailed, plausible, and shaped exactly like the truth.

## Proof of absence

```
grep -rn "operator/" render.js app.js index.html scoring.js
→ no matches
```

Job Fit Scanner is a browser application. It has no filesystem access. It
cannot open a local markdown file under any circumstances.

The instructions that actually run are a template literal — the
`systemPrompt` constant in `scoring.js`. The evaluator definitions and the
labeling rules live there and nowhere else.

## Why a reader will trip on it

This is the most likely wrong turn in the territory.

A reader asked to change how scoring works will search for a rubric, find
`operator/reference/scoring-rubric.md`, edit it, reload the app, and observe
no change. Nothing errors. Nothing warns. The file saves cleanly.

They will then reasonably conclude that something is broken, or that
caching is at fault, and lose an hour before suspecting the file was never
read.

A ghost that looks wrong is harmless. This one looks right.

## What to do instead

Scoring rules and evaluator definitions: edit `systemPrompt` in `scoring.js`.
Score computation, caps, and floors: edit the constants at the top of
`computeScore` in the same file.

## Status honesty

Whether `operator/` is a superseded leftover or was never wired is not
established by the search above. What is established is that the running
system does not read it. The card claims only that.
