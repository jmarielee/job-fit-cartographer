# `__round_outputs`
Type: ghost
State: ghost

## What the name suggests
A private switch controlling whether public method results are rounded.

## Proof of absence
An exact token search within `textstat/textstat.py` finds its documentation and declaration; that source states it has no effect. Live rounding instead reads `__round_points`.

A repository-wide GitHub exact-code search was attempted but unavailable/rate-limited, so this does not meet the strongest possible absence proof.

## Why it will trip someone
The name is more direct than the live `__round_points` field and can look like the controlling switch.

## What to do instead
Use `set_rounding_points` / `__round_points`.

## Hits
- No live output behavior established.

## Does not hit
- **Wrong neighbour:** `__round_points` is the live rounding control.
- Metric calculations themselves.

## Source
- `textstat/textstat.py:21-24,36,66-111`
