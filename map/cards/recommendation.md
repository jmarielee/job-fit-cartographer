# recommendation

**Type:** computed value
**State:** live
**Stage:** 5 — VERDICT
**Source:** `scoring.js:181–189` (the routing), `:192` (the gate demotion), `:213` (returned); displayed at `render.js:268` and classed at `render.js:45–52`

## What it is

Three possible outputs — `Apply`, `Apply with Caution`, `Do Not Apply` — routed
by score first, then by the room:

```js
if (score >= 55) {
  recommendation = (vote.apply >= 2 && evg === 'edge') ? 'Apply' : 'Apply with Caution';  // :184
} else if (score >= 45) {
  recommendation = vote.apply >= 2 ? 'Apply with Caution' : 'Do Not Apply';               // :186
} else {
  recommendation = 'Do Not Apply';                                                        // :188
}
if (gate && recommendation === 'Apply') recommendation = 'Apply with Caution';            // :192
```

## Why it is shaped this way

The comment at `:181` states the principle: score is the floor, the committee
split can add caution but cannot override a healthy score. So the vote is
consulted in both live branches and is decisive in neither — above 55 it can
only *withhold* a clean `Apply`; between 45 and 55 it decides, but only between
two already-cautious outcomes.

## Hits

- The badge at the top of the report (`render.js:268`) and its colour class
  (`render.js:45–52`).
- Whether the drafted opener is shown at all (`render.js:329–339`) — a `Do Not
  Apply` hides it, matching the system prompt's instruction to return an empty
  opener for that verdict (`scoring.js:254`).

## Does not hit

**`verdict`. The wrong neighbour is the verdict bands (`scoring.js:175–179`).**

They read the same score and switch at different places:

| | boundaries |
|---|---|
| `verdict` | 75 / 55 / 35 |
| `recommendation` | 55 / 45 |

There is no 75 here and no 35 there. A score of 50 is a `Long Shot` that may
still be recommended as `Apply with Caution`; a score of 80 is a `Strong
Candidate` that will still read `Apply with Caution` if the room is split or a
gate is live. The two are deliberately not the same statement.

Also does not hit:

- **The score.** Everything here is downstream of `:169`.
- **The 35–45 window.** Below 45 the vote is not consulted at all (`:188`).

## The narrow door to a clean "Apply"

Four things must be true at once: score ≥ 55, at least two apply leans, `edge`
dominance, and no live gate. The last is the hardest — `_identifyGate` returns
something for *any* required core/supporting item at `partial` or worse
(`:86–91`), which describes most real applications. In the shipped demo three of
the four conditions are met and the run still lands on `Apply with Caution`.

Worth knowing before anyone reads a run and concludes the tool is pessimistic:
it is, structurally, and this is where.
