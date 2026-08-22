# Naming collisions — Job Fit Scanner

Read this before trusting any word in the catalog. Five words in this
territory mean three different things each. Landing on the wrong card
confidently is the most likely failure in this map.

---

## "gate"

1. **THE GATE** — the single unmet required item most likely to screen a
   candidate out before a human weighs the whole picture.
   `scoring.js` — `_identifyGate`.
2. **the required-gate cap** — Guard 1. An unrelated mechanism that clamps
   the score when two or more core required items are unmet.
   `scoring.js` — `CAP_VALUE`.
3. **accessGate** — a DOM element. The API-key entry box on the page.
   `index.html`.

These share no code path. A reader who conflates 1 and 2 will change the
wrong constant.

---

## "confidence"

1. **the confidence floor** — a guard that clamps the score when the inputs
   are too thin to support an extreme verdict. `scoring.js` — `_confidence`.
2. **confidenceLevel** — a narrative field the model writes about the
   analysis overall.
3. **evaluators[].confidenceLevel** — a narrative field each of the three
   evaluators writes about their own read.

1 is math. 2 and 3 are prose. Changing 1 does not change 2 or 3.

---

## "score"

1. **survivabilityScore** — the final computed number shown to the user.
   Requested from the model and then overwritten by `computeScore`.
2. **evaluators[].score** — a per-evaluator number the model assigns, used
   only to derive an apply/skip lean.
3. **base** — the score before bonus, caps, and floors.

---

## "benchmark"

1. **benchmarkProfile** — a narrative comparison against a canonical
   candidate for the role.
2. **section-benchmark** — a collapsible box on the page.
3. **the `benchmark` evaluator** — does not exist. `_tallyVote` filters out
   an evaluator with this id; the system prompt forbids any evaluator other
   than the three named. See `map/cards/benchmark-evaluator.md`.

3 is a ghost. It is listed here because a reader who greps "benchmark" gets
hits from 1 and 2 and may conclude 3 is real.

---

## "README.md"

1. **`job-fit-cartographer/README.md`** — this repo. How to walk the map.
2. **`job-fit/README.md`** — the mapped repo. How to run the scoring app.
   A different document with a different job.

The two repos sit side by side and are easy to swap. If you are reading
about BYOK keys, demo mode, or an Anthropic API call, you are in the
territory, not the map.