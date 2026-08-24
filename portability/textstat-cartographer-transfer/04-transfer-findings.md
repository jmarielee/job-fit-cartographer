# Transfer findings — where Cartographer does and does not fit `textstat`

## Bottom line

**Partial transfer, with hard ontology strain.** The method works well on the small parts of `textstat` that genuinely decide something: difficult-word classification, `text_standard` consensus, grade clamping, and documented-but-missing guards. It works much less well on the majority of the repository, which is a numerical library of independent formulas.

## Fits

1. **Governance edges are useful when they really are governance.** The public difficult-word syllable cutoff, Gunning Fog's language cutoff, Flesch-to-grade bands inside `text_standard`, and the 1–18 clamp are changes where the method's threshold card gives useful “what moves / what does not move” boundaries.
2. **Wrong-neighbour discipline pays off immediately.** `syllable_threshold` has at least two live meanings; “difficult word” has at least three. A card that says what *not* to change is genuinely valuable here.
3. **Drift is a productive state.** SMOG documentation versus runtime/tests and the `difficult_words` default description versus signature are exactly the kind of divergence the state model exposes without needing a separate audit genre.

## Does not fit cleanly

1. **The closed card set has no explicit home for formula weights or scaling parameters.** Inventory says bare numbers are nouns. Card types says a weight is not a threshold. `textstat` is full of weights: Flesch coefficients, SMOG constants, Dale–Chall coefficients, reading-time rate, and cache size. I left those catalog rows with `∅` instead of inventing a seventh type or falsely calling them thresholds.
2. **There is no single decision order.** `textstat` fans out into many independent metrics. Most paths are “counts → arithmetic → score,” not “labels → math → guards → verdict.” `text_standard` is one decision-like subgraph, but treating it as the repository's master pipeline would misdescribe the territory.
3. **The noun rule explodes on scientific/numeric code.** If every changeable bare number is a noun, every formula coefficient and test fixture value wants a card. That creates a much larger map than the “open one card and stop” operating model appears designed for.
4. **A tracked binary breaks line-citation literalism.** `docs/_static/textstat.png` is a tracked file/noun under the inventory rule, but it has no meaningful source line. “Every card names its source file and line” cannot be satisfied literally for it.
5. **Ghost proof assumes repository-wide search access.** The method makes exact absence proof mandatory. In this environment anonymous GitHub code search was unavailable/rate-limited and clone access failed, so private-attribute ghosts cannot be proven to the method's preferred standard. The SMOG three-sentence ghost is stronger because the live function plus a one-sentence test positively contradict the documented guard.
6. **Last-touch dates are operationally brittle.** The first inventory sweep requires per-file dates. GitHub's tree exposed the file names but the date cells were empty through this reader. A method that treats date metadata as mandatory needs a reliable local git checkout or API access as a precondition.
7. **`leftover` is hard to prove for a library API.** “Nothing reaches it” is ambiguous when external callers can reach public/deprecated methods even if no internal code calls them. `_cache_clear` has no effect but is still callable, so I did not force it into leftover.

## What I would change in the method only if you want this territory supported

I did **not** make these changes in the run, because you asked me to follow the current rules rather than work around them.

- Add a card type for **coefficient / parameter** with “current value, role in formula, units/scale, sensitivity, wrong neighbour, source.”
- Allow **multiple local decision orders** under one repo instead of one global order.
- Define whether test fixture numbers are nouns; if yes, give them a lighter representation than one card each.
- Permit source locators other than line numbers for binary/generated artifacts.
- Make “repository-wide exact search capability” and “git history access” explicit prerequisites rather than implicit assumptions.

## Strictness note

The catalog is intentionally not “valid-looking”: rows that cannot be legally typed have `∅` card paths. That is the transfer result. Filling those with object/threshold cards would make the output prettier and the test less honest.
