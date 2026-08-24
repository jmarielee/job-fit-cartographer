# Cold walk 5 — "stricter" pointed at the wrong tool

Date: 2026-08-24
Reader: ChatGPT, temporary chat, no memory.
Files given: README.md, map/catalog.md. Nothing else.
Question: W2 as written — "I want the tool to be stricter. What do I change?"

Pass condition: all four from PROTOCOL.md. Front door found from the
catalog, one card opened that answers the question, the wrong neighbour
named back correctly, and a stop.

This walk was run to test condition 3. W1 could not test it — that walk's
closing note says so — because "why did this get capped" asks for a cause
and never requires a neighbour. W2 asks what to change, which should force
the reader through the `TIE_FACTOR` / `EDGE_BONUS` collision.

It never got there.

## Transcript

If by “stricter” you mean less willing to produce a map that is internally consistent but wrong about the source, I’d tighten the verifier, not the catalog format.

Right now, Checks 1–2 only test whether the map agrees with itself, and Check 3 merely puts the claim beside the cited code for a human to judge. Only Checks 4–6 actually query the source and fail on disagreement; that covers 11 of 38 cards. That is the main looseness.

I’d change three things:

Require every factual card claim to have a machine-checkable assertion where feasible.
Instead of special-casing demo score, four constants, and ghosts, give cards something like:

    ## Verify
    kind: constant
    symbol: TIE_FACTOR
    expected: 1.3

or

    ## Verify
    kind: expression
    assertion: computeScore(DEMO_DATA).score === 64

If a card makes a checkable claim but has no Verify section, verify.js should fail.

Turn citation checking from “show me” into “prove it.”
Your current Check 3 explicitly does not determine whether a citation supports the claim; it just prints claim and source side by side. You already have evidence this is insufficient: five citations could point into the correct file and describe the right behavior while still being wrong.

So add a strict rule such as: a card cannot pass solely because its cited lines exist. It must either have an executable/keyed assertion or be explicitly marked manual-verification.

Make “manual” an exception that costs something.
For example, fail CI if:

a live card has neither a keyed check nor manual-verification: <reason>;
the percentage of keyed live cards drops;
a threshold/value is written in prose without a keyed source check;
a catalog row states the actual rule/value rather than merely pointing to its card.

That last rule reinforces an existing design constraint: the catalog says it should point, not explain, because answering from the row already caused a real cold-reader failure. The README documents exactly that failure: the catalog wording caused a reader to say one missing requirement triggered a cap when the code required two or more.

The single most consequential policy sentence I’d add to the cartographer instructions is:

A claim that can be checked against the territory must be checked against the territory. A citation alone is not verification. Uncheckable claims must be explicitly marked manual.

That would make the tool materially stricter without making the one-card reading model heavier.

## Scored against the four conditions

1. Front door found from the catalog — **fail.** The catalog was not used
   to find a row. The reader answered from the README.
2. One card opened, and it answers the question — **fail.** Zero cards
   opened.
3. The wrong neighbour named back correctly — **not tested.** The reader
   never reached `TIE_FACTOR`, so the collision this walk existed to
   exercise was never put in front of it.
4. The walker stops — passes only vacuously. Stopping counts when you stop
   after finding the answer, not instead of looking.

Fails 1 and 2. Condition 3 remains untested after two attempts.

## What happened — the question was ambiguous, not the reader

"The tool" has two referents in this repository, and the two files the
reader was given are lopsided between them.

The word "tool" appears once across both files:

    README.md:19    A browser tool that scores a resume against a job
                    description. 13 files,

That is the Job Fit Scanner, named as a tool exactly once, in passing.
Against that, 64 of the README's 216 lines — 30% — describe `verify.js` and
its six checks in operational detail, under two headings that both name it
as a thing that runs and can be made to fail.

A reader asked to make "the tool" stricter, holding those two files, has one
glancing mention of one tool and a third of a page about another. It picked
the one the document spends its time on. That is a reasonable read.

W2 was written before the README grew its verifier sections. The question
went stale against the document it was going to be asked about, and nobody
re-read it against the current README before running it.

## What the walk broke

Nothing in the map. No card was contradicted, because no card was reached.

The finding is in the README: it does not disambiguate its two tools at the
point where a reader would need it. The repo's third line says "This repo
contains two things. Do not confuse them," and names the cartographer and
the map — but `verify.js` is a third thing, and the sentence that warns
against confusion does not cover the confusion that actually happened.

This is left unfixed at submission. The fix is a naming discipline across
the README rather than one line, and changing the README the night before a
deadline to answer a walk that failed on wording is how a document acquires
a defect it cannot see. Recorded rather than patched.

## What the walk gives, having failed

The reader reproduced this map's own account of its weakest point without
being pointed at it: Checks 1 and 2 self-referential, Check 3 evidentiary
rather than decisive, 11 of 38 cards keyed against the source. That count is
stated in the README and the reader read it correctly.

That is evidence the README is honest about its limits — a stranger could
see the boundary because it is written down. It is not evidence that a cold
reader can wander, which is what this walk was run to produce.

The proposal — assertions on cards, citations that must prove rather than
show, a manual exception that costs something — is a real direction and is
not implemented here. Implementing it means a `## Verify` block on every
card that makes a checkable claim, plus a rewrite of Check 3, and it is
named as deferred work rather than started at the deadline. It is recorded
here because it was found from outside, by a reader with two files and no
memory, which is the only kind of finding this protocol is built to collect.

## Note on re-running

PROTOCOL.md says a walk that fails is not re-run and relabelled. This walk
is kept, published, and scored as a failure. W2 is then asked again in
`walk-cold-strictness-rerun.md` with the ambiguity removed, and that attempt
is published as a separate walk rather than replacing this one. The rule
exists to stop a failure being hidden; nothing here is hidden.
