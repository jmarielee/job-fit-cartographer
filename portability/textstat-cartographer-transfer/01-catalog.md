# Catalog

## Input / configuration

| name | description | state | card path |
|---|---|---|---|
| language configs | metric coefficients by language | live | `cards/language-configs.md` |
| Flesch coefficients | scale reading-ease score | live | ∅ |
| cache size | cache capacity constant | live | ∅ |
| public difficult threshold | classifies difficult words | live | `cards/difficult-word-threshold.md` |
| Gunning Fog threshold | classifies Fog difficult words | live | `cards/gunning-fog-threshold.md` |

## Extraction / classification

| name | description | state | card path |
|---|---|---|---|
| syllable count | estimates syllable total | live | `cards/count-syllables.md` |
| polysyllable count | counts three-plus syllable words | drift | `cards/polysyllable-count.md` |
| difficult-word predicate | decides difficult word | live | `cards/is-difficult-word.md` |
| difficult-words public count | counts difficult words | drift | `cards/difficult-words-public.md` |
| easy-word cache name | deprecated unwired attribute | ghost | `cards/easy-word-sets-ghost.md` |
| round-output name | deprecated unwired attribute | ghost | `cards/round-outputs-ghost.md` |

## Score math

| name | description | state | card path |
|---|---|---|---|
| Flesch Reading Ease | computes ease score | live | `cards/flesch-reading-ease.md` |
| SMOG index | computes SMOG grade | drift | `cards/smog-index.md` |
| SMOG coefficients | scale SMOG score | live | ∅ |
| Dale-Chall correction gate | switches score correction | live | ∅ |
| Dale-Chall coefficients | scale Dale-Chall score | live | ∅ |
| reading-time rate | scales character reading time | live | ∅ |

## Consensus / verdict

| name | description | state | card path |
|---|---|---|---|
| text-standard consensus | votes metric grade candidates | live | `cards/text-standard-consensus.md` |
| Flesch grade bands | maps score into grade | live | `cards/text-standard-flesch-bands.md` |
| grade clamp | bounds public consensus | live | `cards/text-standard-clamp.md` |
| SMOG three-sentence minimum | documented guard lacks wiring | ghost | `cards/smog-three-sentence-ghost.md` |
