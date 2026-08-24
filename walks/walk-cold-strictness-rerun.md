# Cold walk 6 — the reader went to the source instead of the map

Date: 2026-08-24
Reader: ChatGPT, temporary chat, no memory.
Files given: README.md, map/catalog.md. Nothing else.
Question: W2, rephrased — "I want the Job Fit Scanner to be harder to score
well on. What do I change?"

This is the second attempt at W2. The first (`walk-cold-verifier-strictness.md`)
failed because "the tool" pointed at `verify.js` rather than at the mapped
territory. The wording here removes that ambiguity. Both attempts are
published; neither replaces the other.

Pass condition: all four from PROTOCOL.md.

## Transcript

For the running Job Fit Scanner, change `scoring.js`. The map puts the
relevant levers in Math → Guards → Verdict, and warns that `operator/` is
not what the running app reads in the mapped version.

If by "harder to score well" you mean high numeric scores are too easy, I'd
start with this calibration:

    const STATUS_F = { missing: 1.0, partial: 0.65, meets: 0.0 };
    // was partial: 0.5

    const EDGE_BONUS = { core: 8, supporting: 4, peripheral: 0, none: 0 };
    // was core: 12, supporting: 6

    const REALISM_CEIL = 85;
    // was 90

Those three changes attack different sources of generosity. `STATUS_F.partial`
makes "sort of meets it" hurt more; this flows directly into normalized gap
mass and therefore lowers the base score. `EDGE_BONUS` currently gives up to
12 points of headroom-based rescue for a core strength, so reducing it
prevents one standout strength from compensating as much for gaps.
`REALISM_CEIL` simply makes 86–90 impossible. ([GitHub](https://github.com/jmarielee/job-fit/blob/main/scoring.js))

I wouldn't start by changing `TIER_W` or `CENT_W`. Because those weights
appear in both gap mass and the denominator used to normalize it, changing
them recalibrates which requirements matter relative to one another rather
than simply making the system stricter. ([GitHub](https://github.com/jmarielee/job-fit/blob/main/scoring.js))

If instead the problem is too many people get "Apply" even when the score
looks reasonable, use the governance levers:

    const TIE_FACTOR = 1.5; // was 1.3

and consider raising the recommendation floor from `55` to `60`:

    if (score >= 60) {
      recommendation =
        (vote.apply >= 2 && evg === 'edge')
          ? 'Apply'
          : 'Apply with Caution';
    }

`TIE_FACTOR` is especially clean because it makes "strengths dominate gaps"
harder to achieve without changing the score at all—exactly the distinction
your map calls out. The current code requires score ≥55, 2+ positive
evaluator votes, and edge dominance for a clean Apply. ([GitHub](https://github.com/jmarielee/job-fit/blob/main/scoring.js))

For harsher treatment of obvious weaknesses, you can also tighten the
guardrails:

    const CAP_VALUE = 40;       // was 45
    const GATE_CORE_CEIL = 69;  // was 74

That won't affect ordinary candidates. `CAP_VALUE` only bites when there are
2+ missing, non-obtainable required core/supporting qualifications;
`GATE_CORE_CEIL` only bites when there's a missing required core gate. ([GitHub](https://github.com/jmarielee/job-fit/blob/main/scoring.js))

My recommended first pass: `partial: .5 → .65`, bonuses `12/6 → 8/4`, and
`TIE_FACTOR 1.3 → 1.5`. Leave the hard caps alone initially. That should
make an 80+ meaningfully rarer and a clean Apply more demanding, without
turning every borderline candidate into an automatic rejection.

## Every technical claim was correct

Checked against the pinned source:

    scoring.js:34  | const STATUS_F = { missing: 1.0, partial: 0.5, meets: 0.0 };
    scoring.js:35  | const EDGE_BONUS    = { core: 12, supporting: 6, peripheral: 0, none: 0 };
    scoring.js:36  | const REALISM_CEIL  = 90;
    scoring.js:37  | const CAP_VALUE     = 45;
    scoring.js:38  | const GATE_CORE_CEIL = 74;
    scoring.js:39  | const TIE_FACTOR    = 1.3;

    scoring.js:183 |   if (score >= 55) {
    scoring.js:184 |     recommendation = (vote.apply >= 2 && evg === 'edge') ? 'Apply' : 'Apply with Caution';

    scoring.js:137 |   if (reqMiss >= 2) {
    scoring.js:164 |   if (gate && gate.centrality === 'core' && gate.status === 'missing' && score > GATE_CORE_CEIL) {

The `TIER_W` / `CENT_W` point is correct and is the subtlest thing any walker
has said about this territory. `_itemWeight` feeds both accumulators inside
`_computeGaps`: line 50 adds it to `total`, line 54 adds it to `G`. Moving
those weights changes numerator and denominator together.

## Scored against the four conditions

1. **Front door found from the catalog** — pass. The stage grouping and the
   `operator/` warning were used, and both come from the supplied files.
2. **One card opened that answers the question** — **fail.** No card was
   opened. The reader reached the source instead.
3. **The wrong neighbour named back correctly** — pass. `TIE_FACTOR` and
   `EDGE_BONUS` were held apart correctly: one moves the dominance word and
   not the score, the other adds points. The two share no line in
   `scoring.js` — `grep -n "TIE_FACTOR\|EDGE_BONUS" scoring.js` returns
   35, 39, 111, 112, 129, with no overlap. This is the first walk to test
   condition 3 at all; W1's closing note recorded that its question could
   not.
4. **The walker stops. No fourth file** — **fail.** It went outside the two
   files supplied.

Fails 2 and 4. Condition 3 passes, and is attributable to the README's
"The third edge" section rather than to `map/cards/tie-factor.md`, which was
never opened.

## How we know it left the supplied files

Not from the citations alone. Five of the values it stated appear nowhere in
`README.md` or `map/catalog.md`:

| Stated by the reader | Occurrences in the two supplied files |
|---|---|
| `partial: 0.5` | 0 |
| `core: 12, supporting: 6` | 0 |
| `REALISM_CEIL` = 90 | 0 |
| `GATE_CORE_CEIL` = 74 | 0 |
| `score >= 55` | 0 |

Only `TIE_FACTOR` 1.3 and `CAP_VALUE` 45 appear in the supplied files. The
reader also reproduced the structure of the `recommendation` block in order
to rewrite it, which is not described in either file.

The claim this supports is that the reader had knowledge of the source
beyond the two files it was given. Live retrieval is the likely route and is
what the session's citations indicate. Memorised training data on a public
repository is not fully excluded, and is not needed for the finding either
way.

## What the walk broke

Nothing in the map. No card was contradicted, because no card was reached.

The finding is about the walk model itself. `README.md` states that a reader
who opens a fourth file should say the map has failed. This reader opened
the territory and did not say so. Given a map and a reachable source, it
preferred the source, silently.

That is the most direct evidence in this repository about how a capable cold
reader actually behaves, and it is not the behaviour the map is built to
produce.

## The protocol defect

PROTOCOL.md's setup section assumes a reader limited to the files supplied.
It never says the walker may not retrieve. A browsing-capable reader can
reach the pinned territory on GitHub in one step, so walks 5 and 6 were not
tests of the map in isolation.

Walks 1 through 4 show no retrieved content and no citations, and their
answers stay inside what the supplied files contain, so they appear
uncontaminated — but that is an observation after the fact, not a control
that was in place.

From walk 7 onward the prompt must state that the walker answers only from
the files supplied. That instruction did not exist when this walk ran and
the walk is not rescored on a rule it was never given.

## The pattern across three failures

W1 answered from a catalog row. Walk 5 answered from the README. Walk 6
answered from the source. Three failures, three different causes — a map
defect, a question defect, a protocol defect — and one thing in common:

**the reader reached a satisfying answer without opening a card.**

The one-card walk is the central claim of this methodology. Six walks in, it
has been demonstrated once, in Walk 1, where the reader hit the catalog,
recognised it did not have the card, and refused to answer until it did.
That remains the only clean demonstration.

Conditions 2 and 4 together also define a narrow window: exactly one card,
no more and no fewer. A reader who answers correctly from the catalog fails
it, and so does a reader who verifies against source. Competent behaviour
falls outside the window in both directions. Whether that is a fault in the
map or in the test is not settled here, and is named rather than resolved.
