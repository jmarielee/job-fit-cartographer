# tier

**Type:** object
**State:** live · model-labeled
**Stage:** labels
**Source:** rule at `scoring.js:260`; weighted by `TIER_W`, `scoring.js:32`

---

## What it is

Required or preferred, read from the job description's **own words** —
not from a judgment about how important the item seems.

- required: *required, must have, minimum, X+ years*
- preferred: *preferred, a plus, nice to have, bonus, ideally, a major
  advantage*
- **strongly preferred is still preferred**
- ambiguous defaults to **preferred**

## Why it is shaped this way

The default protects the candidate. An ambiguous item read as required
inflates the gap mass and can push a run toward the cap. Read as preferred,
it weighs 0.35 instead of 1.0.

The "strongly preferred is still preferred" line exists because that phrase
reads like a requirement and is not one.

## Hits

- `TIER_W` weighting — required 1.0, preferred 0.35.
- `base`, through gap mass.
- **`CAP_VALUE`** — `_requiredCoreMissing` filters on `tier === 'required'`
  before counting. Tier is the gate on the gate.
- **`GATE_CORE_CEIL`** — `_identifyGate` also filters required-only.

## Does not hit

- **The confidence floor.** It counts `jdItems` and measures input lengths.
  Tier is irrelevant to it.
- **`REALISM_CEIL`.** A flat ceiling, applied regardless of labels.
- `centrality` — the wrong neighbour. Both are dimensions of the same item
  and both feed `_itemWeight`, so they are easy to conflate. Tier asks
  *does the JD demand it*. Centrality asks *is it what the role is for*.
  A required peripheral item and a preferred core item are different things
  and weigh differently: 1.0 × 0.3 = 0.30 versus 0.35 × 1.0 = 0.35.

## If you change it

Reclassifying one item from preferred to required roughly triples its
weight, and — more consequentially — makes it eligible to count toward the
cap and to be selected as THE GATE.

Tier is the only label that can move an item from "costs some points" to
"can end the application."
