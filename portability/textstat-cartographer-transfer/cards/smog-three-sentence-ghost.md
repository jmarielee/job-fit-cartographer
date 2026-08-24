# SMOG three-sentence minimum
Type: ghost
State: ghost

## What the name suggests
The README presents a three-sentence minimum as a condition for receiving a SMOG result.

## Proof of absence
Exact searches in `textstat/backend/metrics/_smog_index.py` for `sentences < 3`, `sentences <= 3`, and `if sentences` returned no matches. The execution path contains sentence counting, the formula, and only zero-division handling. A repository test expects a nonzero SMOG result for `SHORT_TEXT`; that fixture is one sentence.

A repository-wide anonymous GitHub code search was attempted as an additional proof step but was unavailable/rate-limited in this environment. This card therefore has path-level proof plus a contradictory live test, not the ideal `git grep` proof Cartographer asks for.

## Why it will trip someone
A maintainer reading README may look for a guard that does not exist or assume short inputs are refused when tests require a score.

## What to do instead
Treat current runtime behavior as authoritative. If the minimum is intended, add executable wiring and tests; if not, change the documentation.

## Hits
- No executable gate found in the SMOG path.

## Does not hit
- **Wrong neighbour:** zero-sentence handling is real; it returns zero on division by zero, but it is not the documented three-sentence rule.
- The statistical recommendation about 30 sentences.

## Source
- `README.md:167-178`
- `textstat/backend/metrics/_smog_index.py:33-39`
- `tests/backend/metrics/test_smog_index.py:7-22`
- `tests/backend/resources.py:1-1`
