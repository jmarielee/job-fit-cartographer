# Flesch Reading Ease
Type: function
State: live

## What it does
Combines words-per-sentence and syllables-per-word with language-specific coefficients to produce a numeric ease score, returning zero when either component is zero.

## Why it exists
It implements one readability metric while allowing coefficient variants by language.

## Hits
- Words-per-sentence.
- Syllables-per-word.
- `LANG_CONFIGS` through `get_lang_cfg`.
- `text_standard`, which consumes this score as one contributor.

## Does not hit
- **Wrong neighbour:** the 90/80/70/etc. bands in `text_standard` interpret this numeric score; they are not part of the Flesch formula.
- Public rounding behavior, which happens in the facade.
- SMOG or Dale–Chall coefficients.

## State proof
The function is called by the public facade and by backend `text_standard`; the repository also has a dedicated metric test.

## Source
- `textstat/backend/metrics/_flesch_reading_ease.py:11-35`
- `textstat/backend/utils/constants.py:14-63`
- `textstat/backend/metrics/_text_standard.py:39-57`
- `textstat/textstat.py:511-523`
