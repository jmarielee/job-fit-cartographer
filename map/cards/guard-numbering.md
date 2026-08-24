# Guard numbering

**Type:** object
**State:** drift — both files real, numbering disagrees
**Stage:** guards
**Source:** `scoring.js` comments vs `operator/rules.md` Guards section

---

## What it is

Comment text, in two files, numbering the same three guards differently.
`scoring.js` labels them in code comments; `operator/rules.md` labels them in
prose. Neither label is read by anything that runs.

Nothing about the name suggests a problem, which is exactly why it belongs on
a card: the drift is only visible if you read both files.

## Why it is shaped this way

It is not shaped. It is an accident of sequence — `operator/rules.md` was
written first and numbered the guards in the order it described them, and the
`scoring.js` comments were written later against a build where the confidence
floor had already moved. Nobody renumbered.

## The disagreement

| Guard | `operator/rules.md` | `scoring.js` comment |
|---|---|---|
| required-gate cap | Guard 1 | `// Guard 1` |
| confidence floor | Guard 2 | `// Guard 3` |
| core-gate ceiling | Guard 3 | unnumbered |

## Proof of drift

```
grep -n "Guard" scoring.js
→ 134:  // Guard 1 — required-gate cap
→ 143:  // Guard 3 — confidence floor
→ (no third match)
```

The core-gate ceiling is applied at `scoring.js:164` with a long explanatory
comment and no guard number.

## Why a reader will trip on it

A reader who reads `scoring.js` alone sees Guard 1 and Guard 3 and concludes
a Guard 2 was deleted. It was not. It is the confidence floor, sitting right
there under the wrong number.

A reader who reads `operator/rules.md` alone gets consistent numbering and
never knows the code disagrees.

Either reader ends up confident and wrong. That is the signature of drift
rather than of a ghost: nothing is missing, the labels just do not line up.

## Hits

Nothing. This is comment text. No code reads a guard number.

## Does not hit

- **Behaviour. At all.** All three guards run, in the order cap → floor →
  ceiling, regardless of what the comments call them.
- The order of application, which is fixed by position in `computeScore` and
  is *not* the numbering in either document.

## Recommended fix, outside the map

Renumber the `scoring.js` comments to match `operator/rules.md`, and add a
`// Guard 3` label to the core-gate ceiling. Two comment edits.
