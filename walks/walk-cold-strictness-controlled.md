# Cold walk 7 — the controlled walk

Date: 2026-08-24
Reader: ChatGPT, temporary chat, no memory.
Files given, turn 1: README.md, map/catalog.md. Nothing else.
Files given, turn 2: cards/cap-value.md, cards/gate-core-ceil.md,
cards/realism-ceil.md. Nothing else.
Question: W2, rephrased, with a retrieval constraint added.

This is the third attempt at W2 and the first run under a stated
file-limit. Walk 5 failed because "the tool" named two things. Walk 6 was
correctly aimed but the reader reached the source, which the protocol had
never forbidden. The constraint sentence here is new and is recorded as a
protocol change rather than folded in silently — see the note appended to
`PROTOCOL.md`.

Prompt as pasted:

    Answer only from the two files provided. Do not browse or use any
    other source. If those files don't contain the answer, say what you'd
    need.

    I want the Job Fit Scanner to be harder to score well on. What do I
    change?

The second sentence of the constraint is deliberate. Without it a reader
that cannot answer will guess. With it, the wall is a legal answer.

## Transcript — turn 1, README and catalog only

From these two files, the safest answer is: tighten the numerical guards
and/or the scoring weights—not TIE_FACTOR if you want the score itself to
go down.

The strongest levers identified in the catalog are:

REALISM_CEIL — "nothing is ever a sure thing." Lowering this ceiling would
make very high scores harder to achieve.

CAP_VALUE — another score ceiling triggered by particular conditions.
Lowering its value and/or making its triggering conditions easier to hit
would make the scanner harsher. But these files explicitly say the count and
conditions are on the missing card, so I can't tell you exactly what to edit.

GATE_CORE_CEIL — caps the score when a core gate is active. Lowering it
would penalize gated candidates more aggressively.

TIER_W, CENT_W, and STATUS_F — these directly scale the computed score for
required/preferred items, centrality, and gap status. They are genuine
scoring weights rather than decision thresholds. The README confirms these
coefficients "scale a number."

If what you really want is fewer people getting an "Apply" recommendation,
there is a separate lever: raise TIE_FACTOR. The README gives a concrete
example: changing it from 1.3 to 1.6 leaves every numerical score unchanged,
but makes a clean "Apply" less common and "Apply with Caution" more common.

You could also make the upstream model labeling stricter through
systemPrompt, because the model assigns labels such as required/preferred,
centrality, meets/partial/missing, obtainable, and mapsToNeed, which then
feed the deterministic math. The files provided don't contain the actual
prompt, though, so I can't say what wording to change.

One important warning: don't edit operator/ expecting the running scanner to
change. The catalog says the running system does not read that folder, and
the README calls it leftover scoring rules that the app cannot read.

So, based only on these files, I'd prioritize lowering the relevant ceilings
and adjusting TIER_W / CENT_W / STATUS_F for a genuinely harder numerical
score. To tell you the exact constants, directions, and recommended new
values, I'd need the referenced cards—especially realism-ceil.md,
cap-value.md, gate-core-ceil.md, tier-w.md, cent-w.md, status-f.md, and
probably system-prompt.md.

## What happened — turn 1

It found the levers from the catalog unaided, separated the score path from
the recommendation path before being asked to, and stopped at the wall.

The `CAP_VALUE` moment is the one to read twice:

> these files explicitly say the count and conditions are on the missing
> card, so I can't tell you exactly what to edit

The row it was reading:

    map/catalog.md:61
    | CAP_VALUE | ceiling; count and conditions on the card | live | ... |

That is the row **W1 broke**. In that walk the row read `ceiling when
required items unmet`, and a cold reader lifted the rule off it and stated
it wrong — one missing item, where the code needs two. The row was rewritten
as C15 to name that a count and conditions exist without holding either.

A different cold reader has now hit the rewritten row and done exactly what
the fix was built to produce: recognised it does not have the rule, and said
so. The correction is confirmed from outside, by a reader who had no idea
there had been one.

It also carried the `operator/` leftover warning without being asked, which
is the one thing in this territory most likely to waste a reader's afternoon.

## Transcript — turn 2, after handing over the three ceiling cards

With these three cards, I'd change REALISM_CEIL first if your goal is
specifically "make high scores harder to earn."

REALISM_CEIL is currently 90 and is a hard ceiling on every score. Lowering
it compresses the top end and pushes strong candidates toward the 75-point
"Viable but Exposed" boundary.

A useful way to think about the three knobs:

    Lower REALISM_CEIL from 90    Makes excellent matches score less well
                                  across the board. Best general-purpose
                                  "harder scanner" lever.

    Lower CAP_VALUE from 45 → 44  Much harsher specifically when 2+
                                  core/supporting required items are missing
                                  and unobtainable. It also flips every
                                  capped case from potentially "Apply with
                                  Caution" to "Do Not Apply."

    Lower GATE_CORE_CEIL from 74  Punishes a candidate with one missing core
                                  required gate more heavily. The card
                                  explicitly warns that lowering it
                                  substantially starts duplicating CAP_VALUE.

So I would not start by lowering GATE_CORE_CEIL. Its current 74 is
deliberately one point below the 75 "Strong Candidate" boundary: it prevents
someone with a live core screen-out from being called strong without turning
that single gap into a disqualification.

For CAP_VALUE, be aware that 45 is structurally coupled to the
recommendation logic. Changing it to 44 is not a small one-point tightening:
according to the card, it makes every application caught by that cap become
"Do Not Apply." Also, if you change it, the Score Receipt has a hard-coded
"required-gate cap 45" string that will become stale unless that display is
changed too.

My change order from the supplied files would therefore be:

1. Lower REALISM_CEIL to make the overall scoring distribution stricter.
2. If missing required qualifications are currently being treated too
   generously, consider CAP_VALUE: 45 → 44, knowing that this intentionally
   causes a recommendation cliff.
3. Leave GATE_CORE_CEIL at 74 unless you specifically want one missing core
   requirement to carry substantially more punishment.

The files don't give a tested alternative value for REALISM_CEIL, so I can't
justify saying "set it to 85" or "set it to 80" from the provided evidence
alone. To choose that number intelligently, I'd need either the
scoring-weight cards (TIER_W, CENT_W, STATUS_F, EDGE_BONUS) or some
representative score outputs showing what currently scores too highly.

## What happened — turn 2

Every claim checked against the pinned source and holds.

The `45 → 44` cliff is the strongest thing any walk has produced. The card
states it at `cap-value.md:64` — "Lower this to 44 and every capped
application silently becomes 'Do Not Apply.'" The reader took that and
reasoned forward to the mechanism:

    scoring.js:185 |   } else if (score >= 45) {
    scoring.js:186 |     recommendation = vote.apply >= 2 ? 'Apply with Caution' : 'Do Not Apply';

The "Apply with Caution" band opens at exactly 45. Cap at 44 and no capped
application can ever reach it. A one-point change to a constant removes an
entire recommendation outcome. That is a non-obvious downstream consequence,
delivered by a card to a stranger who then applied it correctly — which is
the whole reason cards carry a "If you change it" section.

It surfaced the Score Receipt drift unprompted:

    render.js:213 |     `required-gate cap 45 — ${b.capped ? 'FIRED: ' + b.capReason : 'not fired'}`,

The string is hardcoded, so moving the constant leaves the display stale.
That drift is mapped, and the reader turned it into a practical warning
without being asked to.

It named the wrong neighbour correctly a second time. `gate-core-ceil.md:48`
says "`CAP_VALUE` — the wrong neighbour. Both are ceilings and both involve
the word 'gate.'" The reader reported the duplication risk in its own words.

And it hit a second wall and named it: no tested alternative for
`REALISM_CEIL` exists in the supplied files, so it refused to invent one and
said what it would need instead.

## Scored against the four conditions

1. Front door found from the catalog — **pass.** Levers located unaided in
   the Math and Guards aisles.
2. One card opened, and it answers the question — **pass.** Three cards
   handed over, three used, no fourth requested mid-answer.
3. The wrong neighbour named back correctly — **pass, twice.** `TIE_FACTOR`
   held apart from the score in turn 1; `CAP_VALUE` named as
   `GATE_CORE_CEIL`'s neighbour in turn 2.
4. The walker stops — **pass.** Two walls hit, two walls named, nothing
   guessed.

All four. Condition 3 had been untested since W1 and is now tested twice in
one walk.

## The retrieval control worked

Walk 6 asked nearly this question without the constraint and its reader
stated five constants that appear nowhere in the supplied files. This reader,
same model, same question, one instruction different, stated no value that
is not in what it was given:

- `1.3` and `1.6` — `README.md:93`
- "nothing is ever a sure thing" — `map/catalog.md:60`
- "scale a number" — `README.md:106`
- `90`, `45`, `74` — first appear in turn 2, after the cards were supplied

Zero mentions of `0.5`, `core: 12`, or `score >= 55`, all of which walk 6's
reader produced from outside. One sentence closed the leak.

## One defect this walk exposed, in a card rather than the map's structure

The reader wrote "the 75-point 'Viable but Exposed' boundary." That phrasing
came off the card:

    realism-ceil.md:54    toward the "Viable but Exposed" boundary at 75.

But eleven lines earlier the same card says:

    realism-ceil.md:43    - **The verdict bands.** "Strong Candidate" opens at 75, well below this

Both describe the same line in `scoring.js:176`, from opposite sides. The
card is not wrong, but it names 75 two ways within one file, and a reader
repeated the looser one back. Not corrected before submission: the fix is a
wording choice on a live card and the walk is more useful published with the
seam visible than with it quietly closed. Logged as C17.

## What this walk means against the other six

W1 failed because a catalog row explained a rule. The row was fixed as C15.
Walk 7 turn 1 hit the same row and correctly reported that it did not have
the rule.

That is a published failure, a documented fix, and an independent cold
reader confirming the fix works — across three walks, none of them run for
that purpose.

Seven walks now recorded: four pass, three fail. The three failures have
three different causes — a map defect (W1), a question defect (walk 5), and
a protocol defect (walk 6) — and each was fixed in the layer that caused it.
This is the first walk run with all three fixes in place, and it is the
first to pass all four conditions in a single run.

The one-card model has now been demonstrated twice: Walk 1 and this one.
Both demonstrations required a two-turn structure, because a reader given
only the catalog correctly cannot answer. Whether a one-turn pass is
possible at all is not established by any walk in this folder.
