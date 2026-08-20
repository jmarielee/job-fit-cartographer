# section reveal

**Type:** function
**State:** live
**Stage:** 6 — DISPLAY
**Source:** `render.js:10` (`ALL_SECTION_IDS`), `render.js:153–162` (`revealSections`); called from `scoring.js:359` and `app.js:93`; cleared at `scoring.js:277–278` and `app.js:122–124`

## What it is

A staggered cascade. One `setTimeout` per id, 300 ms apart, each adding a
`.revealed` class; the first one also scrolls itself into view.

```js
ALL_SECTION_IDS.forEach((id, i) => {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el || el.style.display === 'none') return;   // :157
    el.classList.add('revealed');
    if (i === 0) el.scrollIntoView({ behavior:'smooth', block:'start' });
  }, i * 300);
});
```

Eleven ids, so the last section arrives at 3.0 s — on top of the 650 ms both
callers wait before calling.

## Why it is shaped this way

Order is the argument. `ALL_SECTION_IDS` (`:10`) is the report's spine: hero,
then the read across the room, then the benchmark, then the risks, then the
committee, then the actions. Revealing them in sequence makes a skimmer read
the verdict before the evidence, which is the order the report was designed to
be believed in.

## Hits

- The `.revealed` class on any of the eleven ids not currently hidden.
- One smooth scroll, `i === 0` only (`:159`).

## Does not hit

**Display. The wrong neighbour is `render` (`render.js:241`).**

`revealSections` never shows anything — it reads `style.display` at `:157` and
skips. A section `render` hid stays hidden through the whole cascade. Two
layers, opposite directions: `render` decides *whether*, reveal decides *when*.
See `cards/render.md`.

Also does not hit:

- **`.collapsed`.** Set by `initCollapsibles` at `render.js:535`, before the
  cascade starts. Every collapsible section is revealed *into* a collapsed
  state; the two classes never consult each other.
- **The timing of the sections after a hidden one.** The `return` at `:157`
  skips the class, not the timer — the slot is still spent. `section-ledger` is
  index 1 and is always hidden (`index.html:140`, `app.js:66`, `app.js:100`), so
  **every run has a silent 300 ms dead beat between the hero and the committee
  read**. Any further hidden section widens the same gap. This is the visible
  residue of the removed ledger; see `cards/evidence-ledger.md`.

## Note for the verifier

The two clear-loops are not the same code. `app.js:123` null-guards
(`if (el) el.classList.remove(…)`); `scoring.js:278` does not, and would throw
on a missing id mid-run. All eleven ids exist in `index.html` today, so this is
latent, not live.
