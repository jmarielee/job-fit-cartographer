# public difficult-words count
Type: function
State: drift

## What it does
Forwards text, current language, a syllable cutoff, and the `unique` choice to backend difficult-word counting.

## Why it exists
It is the public convenience surface over the lower-level list/set counting machinery.

## Hits
- Backend difficult-word count.
- Unique-versus-occurrence counting behavior.
- Public callers relying on defaults.

## Does not hit
- **Wrong neighbour:** backend `count_difficult_words` has its own default `unique=False`; the public wrapper explicitly supplies its own value.
- Gunning Fog, which calls backend counting directly.
- Dale–Chall, which also calls backend counting directly.

## State proof
The public signature defaults `unique=True`, while the opening description says the default counts all occurrences and that unique counting is something the caller can enable. The same docstring later says the default is True. This is an internal documentation/signature disagreement, so `drift`.

## Source
- `textstat/textstat.py:677-700`
- `textstat/backend/counts/_count_difficult_words.py:10-34`
