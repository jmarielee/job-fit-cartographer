# `__easy_word_sets`
Type: ghost
State: ghost

## What the name suggests
A private class-level cache or registry of easy-word sets used by the public facade.

## Proof of absence
An exact token search within `textstat/textstat.py` finds only its documentation and declaration; the same source explicitly marks the attribute as having no effect. No read is present in the class implementation inspected.

A repository-wide GitHub code search for the exact token was attempted but anonymous code search was unavailable/rate-limited. This is weaker than Cartographer's preferred repository-wide exact-search proof and should be treated as a transfer-run limitation.

## Why it will trip someone
Its name looks like live caching state adjacent to difficult-word behavior, while the actual easy-word loading lives in backend utilities/resources.

## What to do instead
Follow the backend easy-word loading path rather than changing this attribute.

## Hits
- No live behavior established.

## Does not hit
- **Wrong neighbour:** language easy-word resources and `get_lang_easy_words` are the live path.
- Public difficult-word threshold.

## Source
- `textstat/textstat.py:17-20,35`
