# Cold walk protocol

Written before any walk was run. Not edited after, except for the dated
notes below, which are appended rather than folded into the original text.

## Setup

A fresh Claude project. Contents: this repository only. No conversation
history, no prior context about Job Fit Scanner, no operator present in the
conversation.

**Note added 2026-08-24.** The walks were run in ChatGPT temporary chats,
not a Claude project — except walk 3, which was run in a fresh Claude session
with no memory of this repo. A temporary chat carries no memory, no custom
instructions, and no history from earlier walks, so both meet the cold-reader
condition this section was written to describe. The setup line above was
written before the first walk and is left as written rather than edited to
match what happened.

## The prompt

One question, pasted, and nothing else. No follow-up, no hints, no
corrections. If the walker asks a clarifying question, the walk ends and is
recorded as a failure.

## Questions used

Written in advance:

- W1: "Why did this application get capped at 45?"
- W2: "I want the tool to be stricter. What do I change?"
- W3: "What is the operator folder for?"
- W4: "What does divergent do?"
- W5: (human walker) "Find out how the score gets decided."

**Note added 2026-08-24 — what was actually run.** Four walks were recorded.
W1 was run as written and failed (`walk-cold-cap-value.md`). W3 was run with
different wording — "I found a folder called operator/ with scoring rules in
it. If I edit those rules, what changes in the app?" — because the original
phrasing invited a description rather than a change
(`walk-cold-operator-ghost.md`). Two further walks were run on questions that
were not on this list: the evaluator vote threshold
(`walk-cold-vote-threshold.md`) and whether a cold reader can use the
`cartographer/` folder itself (`walk-cold-cartographer-comprehension.md`).

W2, W4 and W5 were written and never run. They are left listed so the gap is
visible rather than tidied away.

## Pass conditions

All four must hold.

1. Front door found from the catalog without being told where to start.
2. One card opened, and it answers the question.
3. The wrong neighbour is named back correctly.
4. The walker stops. No fourth file opened.

## Recording

Screen capture, unedited, start to finish. Failures are published. A walk
that fails is not re-run and relabelled — it is kept, and the fix it forced
is noted underneath.
