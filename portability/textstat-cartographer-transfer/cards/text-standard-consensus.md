# text-standard consensus
Type: function
State: live

## What it does
Collects grade candidates from eight readability metrics, then chooses the most frequent candidate as the numerical consensus.

## Why it exists
The library presents a single estimated school-grade result on top of otherwise independent metrics.

## Hits
- Flesch-Kincaid Grade.
- Flesch Reading Ease band conversion.
- SMOG.
- Coleman-Liau.
- Automated Readability Index.
- Dale–Chall.
- Linsear Write.
- Gunning Fog.

## Does not hit
- **Wrong neighbour:** the public 1–18 clamp and grade-range string formatting happen after this backend function returns.
- Reading-time output.
- Language selection itself.

## State proof
The backend imports and calls all eight metrics, builds candidate grades, counts them, and returns the most common value. Public tests exercise the wrapper that consumes it.

## Source
- `textstat/backend/metrics/_text_standard.py:16-100`
- `textstat/textstat.py:915-946`
- `tests/textstat/test_text_standard.py:7-48`
