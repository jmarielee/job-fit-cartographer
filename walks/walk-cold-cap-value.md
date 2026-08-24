# Cold walk 4 — the 45 cap

Date: 2026-08-24
Reader: ChatGPT, temporary chat, no memory.
Files given: README.md, map/catalog.md. Nothing else.
Question: "Why did this application get capped at 45?"

Pass condition: all four from PROTOCOL.md. Front door found from the
catalog, one card opened that answers the question, the wrong neighbour
named back correctly, and a stop.

## Transcript — turn 1, catalog only

The application is capped at 45 when required job items are unmet. The catalog identifies `CAP_VALUE` as a live scoring guard whose purpose is specifically a "ceiling when required items [are] unmet."
So the logic is not "the raw score happened to equal 45." The system first computes the fit score, then applies deterministic caps/floors to constrain the result; the README explicitly describes that architecture. In practical terms, even if strengths and other matches would mathematically produce, say, 60+, an unmet required qualification can force the displayed score down to the configured cap.
What these two uploaded files don't establish is why the author chose the numeric value 45 rather than 40, 50, etc. The catalog deliberately points to `cards/cap-value.md` for that explanation and says the catalog itself does not contain values/details.
So: why was it capped? Because a required criterion was unmet. Why exactly 45? These supplied files don't give the rationale for that number.

## What happened — turn 1

FAIL.

The reader found the right row. It went to `CAP_VALUE` in the GUARDS aisle
without being told where to start, and it correctly separated "why capped"
from "why this number."

Then it answered the first half from the catalog row alone, and the answer
was wrong.

It said the cap fires when required items are unmet, and that "an unmet
required qualification" — singular — can force the score down. The source
says otherwise:

```
scoring.js:70     it.tier === 'required' &&
scoring.js:71     (it.centrality === 'core' || it.centrality === 'supporting') &&
scoring.js:72     it.status === 'missing' &&
scoring.js:73     !it.obtainable
scoring.js:137    if (reqMiss >= 2) {
```

Two or more. Core or supporting only. Not obtainable. One missing required
item does nothing at all. The reader stated a rule the code does not have,
and stated it with confidence, because the catalog row read like a finished
answer rather than a pointer.

It never opened a card. It did not ask for one. It believed it had answered.

## Transcript — turn 2, after handing over cards/cap-value.md

This file answers the "why 45?" part.
The cap is 45 because 45 is deliberately positioned on two decision boundaries at once. When the system finds two or more unmet, non-obtainable required items with core or supporting centrality, it clamps the score to 45 regardless of the strength elsewhere in the application. The rationale is that adjacent or peripheral strengths should not be able to compensate for failing fundamental eligibility requirements.
The specific number matters because 45 is the lowest score at which the recommendation logic can still allow "Apply with Caution." The code branches at `score >= 45`, so a capped candidate can remain barely actionable if the evaluators otherwise support applying. At the same time, 45 lies inside the 35–54 "Long Shot" verdict band, keeping the displayed assessment appropriately pessimistic.
That creates a very intentional narrow landing point:
- 44 would make every capped application become "Do Not Apply."
- 45 keeps it a "Long Shot", but can still permit "Apply with Caution."
- 55 would move it into "Viable but Exposed" and could permit a clean "Apply," undermining the purpose of the cap.
So the design intent is essentially: "You have material eligibility gaps, so your score cannot look viable—but those gaps do not automatically mean you should never apply."
One important caveat: this cap is not triggered by just any missing qualification. Preferred items never count, peripheral required items do not count, and obtainable requirements are excluded.

## What happened — turn 2

The card corrected every part of the wrong answer, unprompted.

It recovered the count, the centrality condition, and the obtainable
exclusion. It reproduced the 44/45/55 boundary reasoning. It closed by
listing all three exclusions from the card's Does-not-hit section as a
caveat — without being asked to.

The card works. The catalog row is what failed.

## Scored against the four conditions

1. Front door found from the catalog — PASS. Straight to `CAP_VALUE`.
2. One card opened, and it answers — FAIL on the catalog alone; PASS once
   the card was handed over.
3. Wrong neighbour named back correctly — FAIL, both turns. The card lists
   `GATE_CORE_CEIL` as the wrong neighbour and the reader named neither it
   nor any confusable. It listed the exclusions instead.
4. Stops without a fourth file — PASS.

Recorded as a failure. Not re-run.

## What the walk broke

**The catalog row was answering.**

    | CAP_VALUE | ceiling when required items unmet | live | ... |

`catalog.md` opens by saying it points and does not explain. That row
explained. Worse, it explained a rule incompletely enough to be false, and
a cold reader with no way to check took it at face value and stopped.

This is the same defect as Walk 1, in a different costume. There, a row
carried a value and the reader lifted it. Here, a row carried a rule and the
reader lifted that. Both times the catalog leaked content the card owned,
and both times a cold reader trusted it.

Fixed at `e5cfc9f`. The row now reads:

    | CAP_VALUE | ceiling; count and conditions on the card | live | ... |

It names that a count exists and that conditions exist, and holds neither.
A reader who needs the rule now knows they do not have it yet.

Logged as C15.

## What the walk exposed about this protocol

Condition 3 may not be testable with this question. "Why did this get
capped at 45?" asks for a cause. It does not ask what else moves, so a
reader can answer it completely without ever reaching for a neighbour.

The condition is not dropped and this walk is not rescored. But W1 was the
wrong question to test it with, and that is a fault in the protocol rather
than in the map.
