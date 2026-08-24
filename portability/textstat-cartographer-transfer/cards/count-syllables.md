# count syllables
Type: function
State: live

## What it does
Estimates syllables word-by-word, preferring CMU pronunciations when available and falling back to Pyphen positions.

## Why it exists
Many readability metrics and classification rules need a reusable syllable estimate rather than each implementing its own tokenizer/dictionary fallback.

## Hits
- Difficult-word classification.
- Polysyllable counting.
- Metrics that derive syllables per word.

## Does not hit
- **Wrong neighbour:** `syllable_threshold` decides how a count is interpreted; this function only produces the count.
- Easy-word membership.
- Grade clamping.

## State proof
The difficult-word predicate and polysyllable counter call it directly; those paths are tested.

## Source
- `textstat/backend/counts/_count_syllables.py:9-33`
- `textstat/backend/validations/_is_difficult_word.py:44-48`
- `textstat/backend/counts/_count_polysyllable_words.py:9-25`
