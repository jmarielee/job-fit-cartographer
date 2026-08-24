# public difficult-word syllable threshold
Type: threshold
State: live

## Current value
Default: 2 syllables at the public and backend difficult-word APIs.

## What it gates
After a token survives the single-word and easy-list checks, its syllable count must meet this caller-supplied cutoff to be classified difficult.

## What moves
Raising the cutoff reduces the set of words that can become difficult for callers that rely on the default or pass the changed value. Lowering it expands that set.

## What does not move
- **Wrong neighbour:** Gunning Fog's `syllable_threshold` comes from language config (English 3; Polish 4; Hungarian 5), not this default.
- Dale–Chall's main score explicitly calls difficult-word counting with threshold 0.
- The easy-word lists themselves.

## If changed
Public `difficult_words`, `difficult_words_list`, `is_difficult_word`, and any direct backend calls that use the default can change classification/count results.

## Hits
- Difficult-word predicate.
- Public difficult-word list and count when they use the default/caller value.

## Does not hit
- **Wrong neighbour:** Gunning Fog language threshold.
- Flesch coefficients.
- `text_standard` grade clamp.

## State proof
The public wrapper forwards the value; the backend predicate compares syllable count against it; tests vary the cutoff and expect the boolean result to change. That is active governance.

## Source
- `textstat/textstat.py:677-750`
- `textstat/backend/counts/_count_difficult_words.py:10-34`
- `textstat/backend/validations/_is_difficult_word.py:9-48`
- `tests/backend/validations/test_is_difficult_word.py:7-30`
