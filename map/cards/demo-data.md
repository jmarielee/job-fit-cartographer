# DEMO_DATA

**Type:** computed value (sample labels, real math)
**State:** live
**Stage:** 6 — DISPLAY
**Source:** `app.js:54` (the literal), `app.js:56–96` (`runDemo`), `app.js:68–75` (the recompute), `app.js:137` (wired to the button)

## What it is

One hardcoded report object, used when someone clicks Load Demo without an API
key. It is not a screenshot: the labels are canned, but they are run through the
same `computeScore` a real analysis uses (`app.js:70`), and the results overwrite
the shipped literals (`:71–73`).

## Why it is shaped this way

A faked number would make the whole claim of the tool false — the demo is the
first thing most people see, and if its score were typed by hand the "computed,
not generated" promise would be a lie at the front door. Routing it through the
engine costs nothing and makes the demo an honest artifact.

## The numbers, recomputed

Running `computeScore` on `DEMO_DATA`'s own labels returns:

| | value |
|---|---|
| **score** | **64** |
| base | 62 |
| gap mass G | 1.52 |
| strength mass S | 1.80 |
| bonus | 6 face, 2.27 delivered |
| edgeVsGap | `balanced` |
| vote | 2 apply, 1 skip |
| verdict | Viable but Exposed |
| recommendation | Apply with Caution |
| gate | "Drives independent technical decisions at scale" — supporting, missing |
| caps fired | none |

## Hits

- Everything on the demo page. `render(demo)` at `app.js:76` receives the
  rewritten object, so the score ring, the verdict, the badge, the gate flag,
  and the receipt all show computed values.

## Does not hit

**Its own shipped score. The wrong neighbour is the literal at `app.js:54`.**

`DEMO_DATA` ships `"survivabilityScore":68`. The engine returns **64**. The
literal is overwritten at `app.js:71` before anything renders, so no user ever
sees 68 — but anyone reading the source sees 68 first and will believe it.
The verdict and recommendation literals happen to match what the engine returns;
only the number is stale.

Also does not hit:

- **The Evidence Ledger.** `app.js:66` forces `section-ledger` hidden before
  render. The demo has no ledger by design; the ledger has no code by accident.
  See `cards/evidence-ledger.md`.
- **The API.** No key, no network call, no `runBrief`.
- **`confidenceLevel`.** `runDemo` never copies `_b.lowConfidence` onto the
  object, unlike the real path at `scoring.js:349`. The demo's shipped
  `"HIGH"` survives untouched. Here it happens to be correct; the wiring is
  still missing.

## For the verifier

Check 4 recomputes this number from source and confirms this card states **64**.
That check is the reason the card exists in this form — a card that simply
repeated `app.js:54` would state 68 and be wrong, and nothing but recomputation
would catch it.
