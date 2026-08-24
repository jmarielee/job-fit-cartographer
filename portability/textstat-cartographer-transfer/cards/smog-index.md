# SMOG index
Type: function
State: drift

## What it does
Uses sentence count and polysyllable count in the SMOG formula and returns zero only for a zero-sentence division case.

## Why it exists
It exposes the SMOG readability/grade estimate as one of the library's parallel metrics and one contributor to `text_standard`.

## Hits
- Sentence counting.
- Polysyllable counting.
- `text_standard` consensus inputs.
- Public `smog_index`.

## Does not hit
- **Wrong neighbour:** the README's three-sentence minimum is not an executed guard in this function.
- Difficult-word easy-list membership.
- Gunning Fog's language syllable threshold.

## State proof
Two disagreements are visible:
1. README says textstat requires at least three sentences, but the backend contains no such guard and the SMOG test expects a numeric score for `SHORT_TEXT`, which is a one-sentence fixture.
2. The SMOG docstring describes polysyllabic words as beyond three syllables, while the actual counter uses three-or-more.

That makes the current SMOG surface `drift`.

## Source
- `README.md:167-178`
- `textstat/backend/metrics/_smog_index.py:9-39`
- `tests/backend/metrics/test_smog_index.py:7-22`
- `tests/backend/resources.py:1-1`
- `textstat/backend/counts/_count_polysyllable_words.py:9-25`
