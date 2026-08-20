# systemPrompt

**Type:** object
**State:** live · the labeling instructions that actually run
**Stage:** labels
**Source:** `scoring.js:220` — template literal, ~85 lines, sent as `system`

---

## What it is

The real instruction set. Two modes, declared at the top and enforced by
field assignment rather than by code.

- **Mode 1 — neutral calibrated analyst.** Assigns `tier`, `centrality`,
  `status`, `mapsToNeed`. `scoring.js:223`: the cynical persona has zero
  influence here. These labels drive the computed score.
- **Mode 2 — cynical adversarial voice.** Writes every narrative field:
  evaluators, objections, rejectionRisk, strategicBrief, draftedOpener,
  priorityActions.

## Why it is shaped this way

The adversarial voice is the product's character and would wreck the
score if it touched the labels. Splitting the prompt into two named modes
gives the narrative somewhere to be blunt that has no channel into the math.

`operator/rules.md` calls the resulting property **persona-proof**.

## Hits

- Every label in `jdItems` and `strengths`, and therefore the entire score.
- Every narrative field in the report.
- The three evaluators, whose ids are fixed as `recruiter`, `hiring`,
  `internal` — the prompt requires exactly three and forbids omitting any.

## Does not hit

- **The score, directly.** The schema asks the model for a
  `survivabilityScore` and `computeScore` overwrites it on every run where
  `jdItems` is non-empty. The model's number is requested and discarded.
  This is the core architectural claim of the system and it is verifiable in
  four lines at `scoring.js:342–348`.
- **The constants.** No prompt edit can change `CAP_VALUE`, `TIE_FACTOR`,
  or any guard.
- `operator/reference/evaluator-personas.md` — the wrong neighbour. That
  file describes these three evaluators accurately and is never read. See
  `cards/operator-folder.md`.

## If you change it

This is the only place labeling behaviour can be changed. Editing
`operator/rules.md` or `operator/reference/scoring-rubric.md` changes
nothing — the app cannot read them.

The mode firewall is the fragile part. It holds because the prompt names
which fields belong to which mode. Add a new narrative field without
assigning it to Mode 2, and the adversarial voice has no stated boundary
for it.
