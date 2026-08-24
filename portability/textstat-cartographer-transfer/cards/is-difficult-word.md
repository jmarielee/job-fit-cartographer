# difficult-word predicate
Type: function
State: live

## What it does
Rejects multi-token input, rejects words in the language easy-word set, rejects words below a syllable cutoff, and otherwise returns a difficult classification.

## Why it exists
It centralizes the boolean classification used to build difficult-word lists and counts.

## Hits
- Easy-word lookup.
- Syllable counting.
- Caller-provided difficult-word threshold.
- Downstream difficult-word list/set/count.

## Does not hit
- **Wrong neighbour:** Gunning Fog chooses its own language-configured threshold before calling the counting path.
- Grade consensus.
- Readability formula coefficients.

## State proof
The function has direct callers and a parameterized test that changes both words and thresholds and asserts classifications.

## Source
- `textstat/backend/validations/_is_difficult_word.py:9-48`
- `tests/backend/validations/test_is_difficult_word.py:7-30`
