# jdItems

**Type:** object
**State:** live · model-labeled
**Stage:** labels
**Source:** schema at `scoring.js:302`; consumed by `_computeGaps`,
`_requiredCoreMissing`, `_identifyGate`, `_confidence`

---

## What it is

The job description broken into real line-items. Each carries four labels:
`tier`, `centrality`, `status`, `obtainable`, plus the item's text.

This is the primary input to the entire scoring system. Every guard except
`REALISM_CEIL` reads it.

## Why it is shaped this way

The score has to be auditable — every point lost must trace to a named
requirement with a weight. That requires the job description to become a
list of discrete, individually labeled claims rather than a blob to be
judged holistically.

## Hits

Nearly everything downstream:

- `_computeGaps` → gap mass `G`, total weight, `gNorm`, `base`
- `_requiredCoreMissing` → the `CAP_VALUE` cap
- `_identifyGate` → THE GATE and the `GATE_CORE_CEIL` ceiling
- `_confidence` → the floor fires when fewer than 3 items exist
- `computeScore` at `scoring.js:342` → the whole deterministic path runs
  only `if (parsedData.jdItems && parsedData.jdItems.length)`

## Does not hit

- **The three evaluators.** They are written by the adversarial voice from
  the job description and resume directly, not from these labels. An
  evaluator can lean skip on an application whose items all read `meets`.
  `operator/examples.md` case 3 is exactly that divergence.
- **`strengths`.** A separate array with its own fields. The two are
  combined only at the end, in `_edgeVsGap`.
- `rejectionRisk.stages` — the wrong neighbour. A narrative field listing
  screen-out risk by hiring stage. It reads like structured label data and
  is prose, produced in Mode 2, touching no math.

## If it is empty

The deterministic path does not run at all. `parsedData.survivabilityScore`
— the model's own guess — survives into the report unchanged.

That is the one condition under which this system stops being
"model labels, math decides."
