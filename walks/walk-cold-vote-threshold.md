# Cold walk 1 — the evaluator vote threshold

Date: 2026-08-22
Reader: ChatGPT, fresh session, no memory.
Files given: README.md, map/catalog.md. Nothing else.
Question: "I want to change the number that decides whether an evaluator
counts as a yes. What do I need to know before I touch it?"

Pass condition: finds the vote-threshold row, asks for one card, answers,
stops. Fails if it opens a fourth file or invents an answer.

## Transcript

Before touching it, the map is telling you not to edit the first 55 you find.
Your target is the “evaluator vote threshold”. The catalog flags it as drift and says it is currently 55, unnamed, and duplicated in two files. That means changing only one occurrence is an obvious way to create inconsistent behavior.
There are two other warnings you’re supposed to honor first:

The catalog says terminology is collision-prone, and you must read cartographer/reference/collisions.md before trusting the row.
Then the README’s protocol says to open exactly one card for the row—in this case cards/vote-threshold.md—and stop. The card should tell you which source files/lines own those two copies and what each one affects.
If the card disagrees with source code, source code wins. Also, the root JS is the running implementation; operator/ is an older spec lineage and may be stale.
After a change, the README says the repo’s consistency check is node verify.js.
So the key thing to know is: this is not currently one named constant with one source of truth; it is a duplicated threshold with known drift risk.
I can’t safely tell you which two files to edit from the two files you gave me, because the README explicitly requires collisions.md and cards/vote-threshold.md, and neither is included here.


Now the change surface is clear.
The number you mean is the evaluator vote threshold: an evaluator’s model-assigned `score` becomes an `"apply"` lean when it is `>= 55`; otherwise it becomes `"skip"`. This is specifically `evaluators[].score`, not the final `survivabilityScore` or the scoring engine’s `base`.
Before changing it, know these four things:

* 55 is duplicated in executable code. The same bare literal appears in `scoring.js:344` for real runs and `app.js:69` for the demo. It is not a named constant, and `computeScore` never sees the evaluator’s numeric score—only the already-derived `{id, lean}`.
* There is a third 55 in the system prompt. `scoring.js:237` tells the model that a majority below 55 is the signal for calling out divergence. If you change only the two code comparisons, the model will still be instructed using the old boundary. So changing this threshold means three edits: two code locations and one English/prompt location.
* The UI already disagrees with the vote math. `render.js` calls `>= 65` “Would advance” and `>= 50` “On the fence,” while the voting code treats `>= 55` as a yes. A score of 58 therefore counts as an apply vote while visibly being labeled “On the fence.” The shipped demo exposes exactly that contradiction.
* Changing this number changes the verdict path, not the numeric score. It affects `vote.apply` / `vote.skip`, which feed recommendation, `committeeNote`, and `divergent`. It does not change evaluator scores themselves or the overall computed score.

The biggest design question is therefore not merely “what should replace 55?” It’s what is “On the fence” supposed to mean? Right now the product presents 55–64 as undecided while the arithmetic treats that same range as a decided yes. The card explicitly suggests resolving that semantic mismatch rather than merely nudging one threshold to match another.
One adjacent issue is worth knowing but is separate from your requested change: the receipt always prints `/3 apply leans`, even though an unparseable evaluator lean can make the real denominator smaller.
So, if I were about to edit the code, my minimum change set would be `scoring.js:344`, `app.js:69`, and the prompt wording at `scoring.js:237`, followed by deciding deliberately whether `render.js:35–36` should change too. I would not silently change the render threshold unless the intended meaning of “On the fence” has been decided.

## What happened

PASS, in two turns.

**Me:** [uploaded README.md and map/catalog.md] You've been asked to make a
change to a codebase you've never seen. These two files are what you have.
Read them and follow whatever the README tells you to do. My question: I
want to change the number that decides whether an evaluator counts as a yes.
What do I need to know before I touch it?

**Turn 1 — given README and catalog only.** The reader found the
vote-threshold row unaided and read its state as drift. It named the exact
card to open, `cards/vote-threshold.md`, and named
`cartographer/reference/collisions.md` as required reading first. It knew
source beats card, knew the `operator/` lineage was the stale one, and found
`verify.js` as the consistency check after a change.

Then it refused to answer. It said it had the catalog but not the card, and
would not name the two files to edit on that basis. It stopped at the wall
instead of guessing — which is the behaviour the whole map is built to
produce.

**Me:** [uploaded map/cards/vote-threshold.md and
cartographer/reference/collisions.md] Here are the two files you asked for.

**Turn 2 — given `vote-threshold.md` and `collisions.md`.** Every claim
correct:

- All three copies of 55, including the one written in English inside the
  system prompt at `scoring.js:237`, which is the copy a code search misses.
- The 58 contradiction — the vote counts a 58 as a yes while the page labels
  the same evaluator "On the fence."
- The correct separation: this threshold moves the verdict path, not the
  score. It reaches `vote.apply` / `vote.skip`, and through them
  recommendation, `committeeNote`, and `divergent`.
- `evaluators[].score` kept distinct from `survivabilityScore` and `base` —
  the "score" collision, held correctly.
- The `/3` denominator in the receipt flagged as adjacent and deliberately
  out of scope, rather than dumped in with the answer.

It stopped. No fourth file.

### What the walk broke

One defect, and the walk is what exposed it.

In turn 1 the reader lifted the value **55** straight off the catalog row,
which read `55, unnamed, duplicated in two files`. `rules.md` states that
the catalog carries no values, no counts, no explanations — a reader who can
answer their question from the row will never open the card.

The row was in breach of the map's own rule, and a cold reader took the
number from it on the first attempt. Corrected to `unnamed, duplicated
across files` before walk 2 ran.

That the reader still opened the card afterward does not excuse the row. The
rule exists because the next reader might not.
