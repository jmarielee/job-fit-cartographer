# text-standard grade clamp
Type: threshold
State: live

## Current value
Floor 1, cap 18.

## What it gates
The numerical grade value the public `text_standard` wrapper is allowed to expose before returning a float or formatting a grade-range string.

## What moves
Changing either bound changes extreme `text_standard` outputs and the strings derived from them.

## What does not move
- **Wrong neighbour:** backend consensus voting still produces the same pre-clamp grade.
- Individual readability metrics.
- Flesch score bands inside consensus.

## If changed
Only public `text_standard` results outside the new allowed interval are directly affected.

## Hits
- Public float output.
- Public grade-range string for extreme values.

## Does not hit
- **Wrong neighbour:** backend `metrics.text_standard`.
- SMOG/Flesch/Gunning Fog standalone outputs.

## State proof
The wrapper applies the bounds before either output branch, and tests assert both minimum and maximum behavior.

## Source
- `textstat/textstat.py:915-946`
- `tests/textstat/test_text_standard.py:25-48`
