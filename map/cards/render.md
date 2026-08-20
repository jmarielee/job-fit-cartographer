# render

**Type:** function
**State:** live
**Stage:** 6 — DISPLAY
**Source:** `render.js:241–536`; called from `scoring.js:352` (real run) and `app.js:76` (demo)

## What it is

One function, ~295 lines, no return value. Takes the parsed report object `d`,
writes text and HTML into the static skeleton in `index.html`, and decides which
sections exist at all by setting `style.display` on them.

## Why it is shaped this way

The markup is all in `index.html` already; `render` fills it. Every section that
can arrive empty is hidden rather than rendered blank — a terse `Do Not Apply`
run returns empty narrative fields, and the alternative to hiding is a page of
orphan headings. Hence the repeated `if (x) { … } else { section.style.display = 'none'; }`
shape, and the `showIf` helper (`:56`) for sub-blocks.

## Hits

- **Text and HTML** in every result section.
- **`style.display`** for: `section-committee-read` (`:293–311`), `bestPathCard`
  (`:314–327`), `openerCard` (`:329–339`), `section-company` (`:341–354`),
  `section01` (`:366`), `section-signals` (`:368–388`), `section-shaperisk`
  (`:417–434`), `section-benchmark` (`:436–485`), `gateFlag` (`:277–287`).
- **Two functions outside itself:** `buildScoreReceipt(d)` (`:290`) and
  `initCollapsibles()` (`:535`).
- **`d._brain`** twice — the gate at `:278`, the cap note at `:462`. These are
  the only fields `render` reads that the model did not produce; both come from
  `computeScore`. A report object without `_brain` renders with no gate flag and
  no receipt (`:190`), silently.

## Does not hit

**Reveal. The wrong neighbour is `revealSections` (`render.js:153`).**

There are three independent visibility layers on the same nodes and `render`
owns exactly one of them:

| layer | owner | when |
|---|---|---|
| `style.display` | `render` (+ `app.js:100–108` on reset) | during render |
| `.collapsed` | `initCollapsibles` (`:170`) | end of render, `:535` |
| `.revealed` | `revealSections` (`:153`) | 650 ms later, by the caller |

A section can be displayed, collapsed, and unrevealed at once — that is in fact
the normal arrival state for all eight `COLLAPSIBLE_IDS`. See
`cards/section-reveal.md`.

Also does not hit:

- **`section-hero`, `section02`, `section-actions`.** Never assigned a display
  value; always visible.
- **`section-ledger`.** `render` does not mention it. It is forced hidden in
  `index.html:140` and again in `app.js:66` and `app.js:100`.
  `renderLedgerSection` (`render.js:663`) would populate it and is **never
  called from anywhere**. See `cards/evidence-ledger.md`.
- **The score.** Everything numeric is read from `d`. But note `render` re-derives
  the *band* rather than reading it: `scoreClass` (`:39–44`) repeats the
  75 / 55 / 35 boundaries from `scoring.js:176–179`, and `THE_BAR = 75`
  (`:446`) is a third copy of the top one. Three literals, no shared constant —
  a verdict-band edit in `scoring.js` leaves the arc colour and the benchmark
  gauge marker behind.
