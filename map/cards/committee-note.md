# committeeNote

**Type:** computed value (string)
**State:** live
**Stage:** 5 — VERDICT
**Source:** `scoring.js:194–205` (built), `:213` (returned); displayed at `render.js:232`

## What it is

One sentence, written by the arithmetic rather than the model, stating how the
room split:

```js
if (vote.apply === total)      → "Committee aligned — all N evaluators would advance you."     // :199
else if (vote.skip === total)  → "Committee aligned against — all N evaluators would pass."    // :201
else                           → "Committee divided — X of N would advance you; …"             // :203
```

## Why it is shaped this way

Three branches, no adjectives. It is the counted result of the vote said out
loud, so the split cannot be softened in the retelling.

## Hits

- One row of the Score Receipt (`render.js:232`), which falls back to `—` when
  the string is empty.

That is all. Nothing reads it, nothing branches on it.

## Does not hit

**The page the candidate reads. The wrong neighbour is `committeeRead`.**

Two near-identical names, opposite origins, and only one of them is prominent:

| | written by | where it appears |
|---|---|---|
| `committeeNote` | `scoring.js:199–203` | one row inside the collapsed receipt |
| `committeeRead` | the model, Mode 1 | its own section, `render.js:293–311` |

The computed sentence is buried; the generated paragraph is a headline section.
If the two ever disagree about the split, the reader sees the model's version
and has to open a `<details>` to find the counted one. Neither field checks the
other.

Also does not hit:

- **Anything, when no lean is countable.** `:197` only builds the string if
  `total > 0`; otherwise it stays empty and the receipt shows `—`. An empty run
  produces exactly this.
