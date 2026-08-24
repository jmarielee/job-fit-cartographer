# text-standard Flesch bands
Type: threshold
State: live

## Current value
Executable boundaries at 100/90/80/70/60/50/40/30, mapping Flesch Reading Ease into grade candidates 5 through 13; the 60–70 band contributes both 8 and 9.

## What it gates
Which grade candidate or candidates the Flesch Reading Ease score contributes to the consensus vote.

## What moves
Changing a boundary can move texts near that boundary into a different grade candidate and can therefore change the mode selected by `text_standard`.

## What does not move
- **Wrong neighbour:** README's Flesch difficulty table uses similar score bands as explanatory labels, not as the executable consensus mapping.
- The Flesch score itself.
- The 1–18 public clamp.

## If changed
Only the Flesch-derived vote inside `text_standard` changes directly; other metric candidates do not.

## Hits
- `text_standard` candidate list.
- Final consensus when the changed candidate affects the mode.

## Does not hit
- **Wrong neighbour:** Flesch formula coefficients.
- Standalone `flesch_reading_ease` return value.
- SMOG.

## State proof
The bands are explicit branches in the live backend consensus path.

## Source
- `textstat/backend/metrics/_text_standard.py:39-57`
- `README.md:132-140`
