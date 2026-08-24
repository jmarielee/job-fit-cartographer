# operator/

**Type:** leftover
**State:** leftover — accurate, unread
**Stage:** spec folder
**Source:** `operator/` — 6 files, last modified 2026-06-13 and 2026-07-04

---

## What the name suggests

The configuration that drives the scanner: who the three evaluators are,
how scoring works, what the output looks like.

That reading is **half right**, and the half that is wrong is the dangerous
half.

## Proof of absence

```
grep -rn "operator/" render.js app.js index.html scoring.js
→ no matches
```

Job Fit Scanner is a browser application. It has no filesystem access and
cannot open a local markdown file under any circumstances.

The instructions that actually run are the `systemPrompt` template literal
in `scoring.js`, and the constants at the top of `computeScore`.

## The part that surprises people

**These files are not wrong.** `rules.md`, `identity.md`, and
`evaluator-personas.md` describe the running system accurately.

Verified by hand against the demo case. `operator/examples.md` claims a base
of 62.2, a supporting bonus scaled to +2.3, no cap because only one required
core/supporting item is missing, and a final score of 64 routing to
"Apply with Caution." Recomputing from `DEMO_DATA` through `computeScore`
gives G = 1.52, Σw = 4.02, base = 62.19, bonus +2.27, **score 64**,
balanced, 2 of 3 apply leans → **Apply with Caution**.

The spec is correct. It is simply not read.

## Why a reader will trip on it

This is the most likely wrong turn in the territory, and it is worse than an
ordinary ghost because the contents check out.

A reader asked to change scoring will find `operator/rules.md`, verify it
against the code, conclude it is authoritative, edit it, reload, and observe
nothing. Nothing errors. Nothing warns. The file saves cleanly and remains
accurate — it just has no effect.

An obviously stale file is harmless. A correct one that does nothing is not.

## What last reached it

Nothing in the browser application, ever. `operator/` is read by a human or a
model that is handed the files directly; it has never been reachable from
`index.html`. The six files were last modified 2026-06-13 and 2026-07-04,
while every file that runs was touched later in July.

## Lineage

`operator/` is the original specification build. The root JS files —
`render.js`, `app.js`, `index.html` — are a later standalone site built
from that spec.

That explains every drift finding in this map: the spec stayed put and the
implementation moved. Where they disagree, **the running code wins.**

## What to do instead

Labeling rules and evaluator definitions: `systemPrompt` in `scoring.js`.
Score computation, caps, floors: the constants at the top of the scoring
brain in the same file.

## One file inside is genuinely a ghost

`operator/reference/scoring-rubric.md` — see
`cards/scoring-rubric-file.md`. It predates `GATE_CORE_CEIL` and describes
a system with two guards instead of three.
