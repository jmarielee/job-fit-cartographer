# Gunning Fog language syllable threshold
Type: threshold
State: live

## Current value
English 3, Polish 4, Hungarian 5; missing language keys fall back to English.

## What it gates
Which non-easy words count as difficult inside the Gunning Fog calculation.

## What moves
Changing a language's value changes the difficult-word percentage and therefore the Gunning Fog score for texts containing words near the cutoff.

## What does not move
- **Wrong neighbour:** public `is_difficult_word` and `difficult_words` default to a separate cutoff of 2.
- Flesch Reading Ease coefficients.
- The `text_standard` 1–18 clamp.

## If changed
Gunning Fog results can move for that language. Other metrics move only if they explicitly fetch the same config key.

## Hits
- `gunning_fog` through `get_lang_cfg`.
- Difficult-word counting invoked by `gunning_fog`.

## Does not hit
- **Wrong neighbour:** public difficult-word default.
- Dale–Chall's explicit threshold 0.

## State proof
Gunning Fog fetches this config key and forwards it to difficult-word counting. `get_lang_cfg` supplies the language/fallback value.

## Source
- `textstat/backend/utils/constants.py:14-63`
- `textstat/backend/utils/_get_lang_cfg.py:21-31`
- `textstat/backend/metrics/_gunning_fog.py:24-36`
