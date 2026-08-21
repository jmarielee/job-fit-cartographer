# section reveal

**Type** function (display)
**State** live
**Stage** 6 — display
**Source** `render.js:153–162` · order `render.js:10` · called `app.js:93`, `scoring.js:359` · class cleared `scoring.js:278`, `app.js:124`

---

## What it is

A fixed cascade. Each id in `ALL_SECTION_IDS` gets `.revealed` at
`index × 300ms`; sections already hidden are skipped (`:157`); only index 0
scrolls into view (`:159`).

## Why it is shaped this way

The list at `:10` is in DOM order, so the cascade reads top to bottom. The skip
test reads inline `display`, which is exactly what `index.html` and `render`
both write — so it agrees with `render`'s decisions rather than second-guessing
them.

## Hits

`.revealed` on up to eleven sections, and one scroll.

## Does not hit

**Wrong neighbour: `render`** (`:241`, `cards/render.md`). `render` decides
whether a section exists; this decides when it appears. Reveal never sets
`display` and never reads `d`.

Not `initCollapsibles` (`:170`) either, despite the shared vocabulary —
collapse is triggered from the end of `render` (`:535`), not from here.

## Three things it does that look like bugs

- **Slot 1 is dead.** `section-ledger` sits at index 1 of `:10`, is hidden by
  `index.html:140`, and is never shown. Its slot still costs 300ms, so the
  cascade opens with a beat where nothing happens between the hero and the
  committee read. Every hidden section leaves a similar gap — the delay is
  index-based, not sequence-based.
- **Collapse state survives a reset.** `initCollapsibles` guards on
  `dataset.collapsibleInit` (`:173`, `:177`), so it collapses a section once per
  page load. `resetToInput` clears `.revealed` (`app.js:124`) but not
  `.collapsed`. Skim-first is the default for the first report of a session
  only.
- **The two clears are not equal.** `scoring.js:278` calls
  `getElementById(id).classList` with no null guard; `app.js:124` guards. Add an
  id to `ALL_SECTION_IDS` without adding the node and `runBrief` throws while
  reset survives.
