# obtainable

**Type:** object
**State:** live · model-labeled
**Stage:** labels
**Source:** rule at `scoring.js:261`; applied in `_computeGaps`, `scoring.js:53`

---

## What it is

A flag marking an item the candidate is not disqualified for lacking.

Two cases, both **readings of the job description's text**, not judgments
about the candidate:

1. **The JD offers it as acquirable** — "or eligibility to obtain," "or
   ability to obtain," "willingness to learn," training provided during
   onboarding.
2. **The item is a duty, not a prerequisite** — work the role performs,
   signalled by a Responsibilities / Duties / What You'll Do heading, or by
   verbs of role performance: administer, record, annotate, transcribe,
   prepare, attend, operate, maintain, draft, coordinate, file, complete.

Exceptions force it false: an actively held credential, a mandatory
years-of-experience threshold, a license with no escape hatch, or explicit
demand for prior performance ("X years doing Y," "proven track record of Z").

## Why it is shaped this way

`operator/examples.md` case 2 is built on this. A career-changer meets an
insurance role requiring "Property & Casualty license, *or eligibility to
obtain within 90 days, training provided*." Labeled required/core/missing,
the candidate looks gated out of a role explicitly designed to train them.

The second case — duties are not prerequisites — is the broader one. A
posting's Responsibilities section describes what you will be taught, and a
naive screener reads it as a list of things you must already have done.

## Hits

- **`_computeGaps` at `scoring.js:53`.** When `obtainable && status ===
  'missing'`, the status factor is silently downgraded from 1.0 to 0.5. The
  item's `status` label is unchanged; only the weight applied to it moves.
- **`CAP_VALUE`** — `_requiredCoreMissing` filters `!it.obtainable`. An
  obtainable item can never count toward the cap.
- **`GATE_CORE_CEIL`** — `_identifyGate` applies the same filter. An
  obtainable item can never be selected as THE GATE.

## Does not hit

- **The displayed status.** The Evidence Ledger would have shown `missing`
  while the math used `partial`. That divergence is now invisible, because
  the ledger does not run. See `cards/evidence-ledger.md`.
- **Strengths.** The flag exists only on `jdItems`.
- `status` — the wrong neighbour, and the subtle one. They look like the
  same decision and are not. `status` asks *does the resume show it*.
  `obtainable` asks *does the JD require it up front*. An item can be
  honestly `missing` and still cost half weight and be barred from both
  guards.

## If you change it

This is the highest-leverage flag in the label set. Flipping one item to
`obtainable: true` halves its gap contribution **and** removes it from both
the cap count and the gate candidate pool.

Two obtainable items that would otherwise be missing core requirements are
the difference between a capped 45 and an uncapped run.

The prompt's insistence that both cases are JD-text readings is what keeps
that leverage from becoming a place to be generous.
