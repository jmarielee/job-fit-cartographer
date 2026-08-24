# language configs
Type: object
State: live

## What it is
A language-root keyed configuration object supplying metric coefficients and one Gunning-Fog-oriented syllable cutoff.

## Why it is shaped this way
Metrics can ask for a language-specific value while sharing English as a fallback for keys absent from a language entry.

## Hits
- Flesch Reading Ease coefficient lookup.
- Gunning Fog's language-specific difficult-word cutoff.
- Any future metric that calls `get_lang_cfg` with an existing key.

## Does not hit
- **Wrong neighbour:** the public difficult-word cutoff whose default is 2. That value comes from method/function arguments, not `LANG_CONFIGS`.
- Easy-word resource contents.
- Sentence or syllable tokenization rules.

## State proof
`get_lang_cfg` reads `LANG_CONFIGS`, selects a language root, and falls back to English. Flesch Reading Ease and Gunning Fog call that lookup. This is active wiring, so `live`.

## Source
- `textstat/backend/utils/constants.py:14-69`
- `textstat/backend/utils/_get_lang_cfg.py:7-31`
- `textstat/backend/metrics/_flesch_reading_ease.py:25-35`
- `textstat/backend/metrics/_gunning_fog.py:24-36`
