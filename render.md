# render

**Type** function (display)
**State** live
**Stage** 6 — display
**Source** `render.js:241–536` · called from `scoring.js:352` and `app.js:76`

---

## What it is

One function, one argument, no return. It takes the parsed report object `d`
— plus `d._brain` from `computeScore` — and writes the whole of stage 3 into
the DOM. Real run and demo both land here; there is no second path.

## Why it is shaped this way

**One function, not per-section renderers.** The report is written once per run
and never updated. There is no state to diff.

**It runs while the stage is still hidden.** Both callers switch stages 650ms
later (`scoring.js:355–360`, `app.js:78–80`). Nothing it writes is visible when
it is written; `revealSections` decides when (`cards/section-reveal.md`).

**Presence is the contract.** Its job is deciding what exists, through `showIf`
(`:56–58`) and direct `style.display` writes. It never removes a node.

**It reads computed math in exactly two places**, both restorations: the gate
flag at `:278` and the cap note on the benchmark gauge at `:462–464`. Every
other string on the page is model prose, escaped through `esc` (`:17–24`) when
interpolated and assigned via `textContent` otherwise.

## Hits

- `display` for seven sections: committee-read (`:309/311`), benchmark
  (`:482/484`), company (`:351/353`), signals (`:385/387`), shaperisk
  (`:431/433`), section01 (`:366`).
- The three cards inside the hero: gateFlag (`:284/286`), bestPathCard
  (`:324/326`), openerCard (`:336/338`).
- `buildScoreReceipt` (`:290`) and `initCollapsibles` (`:535`).

## Does not hit

**Wrong neighbour: `renderLedgerSection`** (`:663–680`). Same file, same
prefix, and never called — not by `render`, not by anything. It reads `RUN`,
`LAST_REPORT`, `ledgerScore`, and `applyLedgerEdit`, none of which are declared
in any of the three scripts. See `cards/ledger-state-layer.md`.

`render` never touches `section-ledger`'s display at all. `index.html:140`
hides it inline and no real run unhides it; `app.js:66` and `:100` re-hide it
for demo and reset — belt on a garment with no braces.

**Two sections have no display branch.** `section02` (rejection stages) and
`section03` (evaluators) are only emptied and refilled (`:392`, `:489`). If the
model returns no stages or no evaluators, the section header renders above
nothing. Every other optional section is hidden when its data is absent.
