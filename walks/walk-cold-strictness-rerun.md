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

Answer only from the two files provided. Do not browse or use any other source. If those files don't contain the answer, say what you'd need.
I want the Job Fit Scanner to be harder to score well on. What do I change?

From these two files, the safest answer is: tighten the numerical guards and/or the scoring weights—not TIE_FACTOR if you want the score itself to go down.

The strongest levers identified in the catalog are:

REALISM_CEIL — “nothing is ever a sure thing.” Lowering this ceiling would make very high scores harder to achieve.
CAP_VALUE — another score ceiling triggered by particular conditions. Lowering its value and/or making its triggering conditions easier to hit would make the scanner harsher. But these files explicitly say the count and conditions are on the missing card, so I can’t tell you exactly what to edit.
GATE_CORE_CEIL — caps the score when a core gate is active. Lowering it would penalize gated candidates more aggressively.
TIER_W, CENT_W, and STATUS_F — these directly scale the computed score for required/preferred items, centrality, and gap status. They are genuine scoring weights rather than decision thresholds. The README confirms these coefficients “scale a number.”

If what you really want is fewer people getting an “Apply” recommendation, there is a separate lever: raise TIE_FACTOR. The README gives a concrete example: changing it from 1.3 to 1.6 leaves every numerical score unchanged, but makes a clean “Apply” less common and “Apply with Caution” more common.

You could also make the upstream model labeling stricter through systemPrompt, because the model assigns labels such as required/preferred, centrality, meets/partial/missing, obtainable, and mapsToNeed, which then feed the deterministic math. The files provided don’t contain the actual prompt, though, so I can’t say what wording to change.

One important warning: don’t edit operator/ expecting the running scanner to change. The catalog says the running system does not read that folder, and the README calls it leftover scoring rules that the app cannot read.

So, based only on these files, I’d prioritize lowering the relevant ceilings and adjusting TIER_W / CENT_W / STATUS_F for a genuinely harder numerical score. To tell you the exact constants, directions, and recommended new values, I’d need the referenced cards—especially realism-ceil.md, cap-value.md, gate-core-ceil.md, tier-w.md, cent-w.md, status-f.md, and probably system-prompt.md.

cap-value.md
File
gate-core-ceil.md
File
realism-ceil.md
File

With these three cards, I’d change REALISM_CEIL first if your goal is specifically “make high scores harder to earn.”

REALISM_CEIL is currently 90 and is a hard ceiling on every score. Lowering it compresses the top end and pushes strong candidates toward the 75-point “Viable but Exposed” boundary.

A useful way to think about the three knobs:

Change	Effect
Lower REALISM_CEIL from 90	Makes excellent matches score less well across the board. Best general-purpose “harder scanner” lever.
Lower CAP_VALUE from 45 → 44	Much harsher specifically when 2+ core/supporting required items are missing and unobtainable. It also flips every capped case from potentially “Apply with Caution” to “Do Not Apply.”
Lower GATE_CORE_CEIL from 74	Punishes a candidate with one missing core required gate more heavily. The card explicitly warns that lowering it substantially starts duplicating CAP_VALUE.

So I would not start by lowering GATE_CORE_CEIL. Its current 74 is deliberately one point below the 75 “Strong Candidate” boundary: it prevents someone with a live core screen-out from being called strong without turning that single gap into a disqualification.

For CAP_VALUE, be aware that 45 is structurally coupled to the recommendation logic. Changing it to 44 is not a small one-point tightening: according to the card, it makes every application caught by that cap become “Do Not Apply.” Also, if you change it, the Score Receipt has a hard-coded "required-gate cap 45" string that will become stale unless that display is changed too.

My change order from the supplied files would therefore be:

Lower REALISM_CEIL to make the overall scoring distribution stricter.
If missing required qualifications are currently being treated too generously, consider CAP_VALUE: 45 → 44, knowing that this intentionally causes a recommendation cliff.
Leave GATE_CORE_CEIL at 74 unless you specifically want one missing core requirement to carry substantially more punishment.

The files don’t give a tested alternative value for REALISM_CEIL, so I can’t justify saying “set it to 85” or “set it to 80” from the provided evidence alone. To choose that number intelligently, I’d need either the scoring-weight cards (TIER_W, CENT_W, STATUS_F, EDGE_BONUS) or some representative score outputs showing what currently scores too highly.

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
