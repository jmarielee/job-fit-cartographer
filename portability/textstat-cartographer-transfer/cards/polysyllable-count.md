# polysyllable count
Type: function
State: drift

## What it does
Counts words whose estimated syllable count is at least three.

## Why it exists
SMOG and the public polysyllable API need a shared complex-word count.

## Hits
- SMOG's polysyllable input.
- Public `polysyllabcount`.

## Does not hit
- **Wrong neighbour:** difficult-word classification also uses syllables but adds easy-word membership and a separate cutoff.
- Sentence counting.
- SMOG's numeric coefficients.

## State proof
Runtime uses a three-or-more test. The public polysyllable documentation agrees, but the SMOG docstring describes its polysyllabic words as strictly more than three. Those places should agree about the count SMOG actually consumes, so the pair is drift.

## Source
- `textstat/backend/counts/_count_polysyllable_words.py:9-25`
- `textstat/backend/metrics/_smog_index.py:29-37`
- `textstat/textstat.py:548-590`
- `README.md:427-433`
