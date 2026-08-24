# Collisions

## `syllable_threshold`

- **Public difficult-word threshold:** default `2`; supplied by callers to `difficult_words`, `difficult_words_list`, and `is_difficult_word`. Sources: `textstat/textstat.py:677-750`; `textstat/backend/validations/_is_difficult_word.py:9-48`.
- **Gunning Fog language threshold:** English `3`, Polish `4`, Hungarian `5`, with English fallback when a language config lacks the key. Sources: `textstat/backend/utils/constants.py:14-63`; `textstat/backend/utils/_get_lang_cfg.py:21-31`; `textstat/backend/metrics/_gunning_fog.py:24-36`.
- They are wrong neighbours: changing one does not change the other.

## `difficult word`

At least three operational meanings appear:

1. Public classification uses easy-list membership plus a caller threshold (default 2). `textstat/backend/validations/_is_difficult_word.py:32-48`.
2. Gunning Fog feeds a language-configured threshold into difficult-word counting. `textstat/backend/metrics/_gunning_fog.py:24-36`.
3. Dale–Chall explicitly calls difficult-word counting with threshold `0`, making the easy-word list the effective discriminator rather than syllable length. `textstat/backend/metrics/_dale_chall_readability_score.py:42-52`.

## `grade`

- Individual formulas return numeric grade-like scores.
- Backend `text_standard` converts eight metrics into candidate integers and chooses a mode. `textstat/backend/metrics/_text_standard.py:32-100`.
- Public `text_standard` clamps that result and can format a two-grade string. `textstat/textstat.py:915-946`.
- README tables also describe interpretation bands; those are documentation, not all executable gates. `README.md:132-140,230-237`.
