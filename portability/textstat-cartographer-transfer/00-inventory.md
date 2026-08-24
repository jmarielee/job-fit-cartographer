# Inventory — strict transfer attempt

Snapshot examined: `textstat/textstat` default branch `main`, browsed 2026-08-23.

## Compliance status

**Sweep 1 is structurally complete for the file tree I could traverse, but not rule-complete.** I found 150 tracked paths through the GitHub tree. Cartographer requires a last-touch date for every tracked file. The public GitHub tree returned the `Last commit date` column empty in this environment, and the repo could not be cloned here, so every date below is `UNVERIFIED`. I did not invent dates.

**Sweep 2 is not complete.** Cartographer defines every function, config key, schema field, convention, and bare number that a change could land on as a noun. A full source checkout was not available, so I could not truthfully claim an exhaustive in-file noun census across all 150 files. More importantly, even the inspected subset exposes a method-level type gap: formula weights and operational constants are nouns, but the closed card set has no explicit legal type for them and says a weight is not a threshold.

**Sweeps 3 and 4 were run on three concrete paths rather than a fictional single global path:** difficult-word classification, an individual readability score (Flesch/SMOG), and the `text_standard` consensus path. `textstat` is a fan-out library of parallel metrics; there is no single repository-wide decision order.

## Sweep 1 — tracked files

| tracked file | last touched |
|---|---|
| `.codespellignorelines` | UNVERIFIED |
| `.gitignore` | UNVERIFIED |
| `LICENSE` | UNVERIFIED |
| `MANIFEST.in` | UNVERIFIED |
| `Makefile` | UNVERIFIED |
| `Pipfile` | UNVERIFIED |
| `README.md` | UNVERIFIED |
| `local_test_workflow.py` | UNVERIFIED |
| `requirements.txt` | UNVERIFIED |
| `setup.cfg` | UNVERIFIED |
| `setup.py` | UNVERIFIED |
| `.github/workflows/test.yml` | UNVERIFIED |
| `docs/_static/textstat.png` | UNVERIFIED |
| `docs/_templates/contribute.html` | UNVERIFIED |
| `docs/changelog.rst` | UNVERIFIED |
| `docs/conf.py` | UNVERIFIED |
| `docs/index.rst` | UNVERIFIED |
| `docs/installation.rst` | UNVERIFIED |
| `docs/requirements.txt` | UNVERIFIED |
| `textstat/__init__.py` | UNVERIFIED |
| `textstat/textstat.py` | UNVERIFIED |
| `textstat/backend/__init__.py` | UNVERIFIED |
| `textstat/backend/counts/__init__.py` | UNVERIFIED |
| `textstat/backend/counts/_count_arabic_long_words.py` | UNVERIFIED |
| `textstat/backend/counts/_count_arabic_syllables.py` | UNVERIFIED |
| `textstat/backend/counts/_count_chars.py` | UNVERIFIED |
| `textstat/backend/counts/_count_complex_arabic_words.py` | UNVERIFIED |
| `textstat/backend/counts/_count_difficult_words.py` | UNVERIFIED |
| `textstat/backend/counts/_count_faseeh.py` | UNVERIFIED |
| `textstat/backend/counts/_count_letters.py` | UNVERIFIED |
| `textstat/backend/counts/_count_long_words.py` | UNVERIFIED |
| `textstat/backend/counts/_count_miniwords.py` | UNVERIFIED |
| `textstat/backend/counts/_count_monosyllable_words.py` | UNVERIFIED |
| `textstat/backend/counts/_count_polysyllable_words.py` | UNVERIFIED |
| `textstat/backend/counts/_count_sentences.py` | UNVERIFIED |
| `textstat/backend/counts/_count_syllables.py` | UNVERIFIED |
| `textstat/backend/counts/_count_words.py` | UNVERIFIED |
| `textstat/backend/metrics/__init__.py` | UNVERIFIED |
| `textstat/backend/metrics/_automated_readability_index.py` | UNVERIFIED |
| `textstat/backend/metrics/_chars_per_word.py` | UNVERIFIED |
| `textstat/backend/metrics/_coleman_liau_index.py` | UNVERIFIED |
| `textstat/backend/metrics/_crawford.py` | UNVERIFIED |
| `textstat/backend/metrics/_dale_chall_readability_score.py` | UNVERIFIED |
| `textstat/backend/metrics/_dale_chall_readability_score_v2.py` | UNVERIFIED |
| `textstat/backend/metrics/_fernandez_huerta.py` | UNVERIFIED |
| `textstat/backend/metrics/_flesch_kincaid_grade.py` | UNVERIFIED |
| `textstat/backend/metrics/_flesch_reading_ease.py` | UNVERIFIED |
| `textstat/backend/metrics/_gulpease_index.py` | UNVERIFIED |
| `textstat/backend/metrics/_gunning_fog.py` | UNVERIFIED |
| `textstat/backend/metrics/_gutierrez_polini.py` | UNVERIFIED |
| `textstat/backend/metrics/_letters_per_word.py` | UNVERIFIED |
| `textstat/backend/metrics/_linsear_write_formula.py` | UNVERIFIED |
| `textstat/backend/metrics/_lix.py` | UNVERIFIED |
| `textstat/backend/metrics/_mcalpine_eflaw.py` | UNVERIFIED |
| `textstat/backend/metrics/_osman.py` | UNVERIFIED |
| `textstat/backend/metrics/_reading_time.py` | UNVERIFIED |
| `textstat/backend/metrics/_rix.py` | UNVERIFIED |
| `textstat/backend/metrics/_sentences_per_word.py` | UNVERIFIED |
| `textstat/backend/metrics/_smog_index.py` | UNVERIFIED |
| `textstat/backend/metrics/_spache_readability.py` | UNVERIFIED |
| `textstat/backend/metrics/_syllables_per_word.py` | UNVERIFIED |
| `textstat/backend/metrics/_szigriszt_pazos.py` | UNVERIFIED |
| `textstat/backend/metrics/_text_standard.py` | UNVERIFIED |
| `textstat/backend/metrics/_wiener_sachtextformel.py` | UNVERIFIED |
| `textstat/backend/metrics/_words_per_sentence.py` | UNVERIFIED |
| `textstat/backend/selections/__init__.py` | UNVERIFIED |
| `textstat/backend/selections/_list_difficult_words.py` | UNVERIFIED |
| `textstat/backend/selections/_list_words.py` | UNVERIFIED |
| `textstat/backend/selections/_set_difficult_words.py` | UNVERIFIED |
| `textstat/backend/transformations/__init__.py` | UNVERIFIED |
| `textstat/backend/transformations/_remove_punctuation.py` | UNVERIFIED |
| `textstat/backend/utils/__init__.py` | UNVERIFIED |
| `textstat/backend/utils/_get_cmudict.py` | UNVERIFIED |
| `textstat/backend/utils/_get_grade_suffix.py` | UNVERIFIED |
| `textstat/backend/utils/_get_lang_cfg.py` | UNVERIFIED |
| `textstat/backend/utils/_get_lang_easy_words.py` | UNVERIFIED |
| `textstat/backend/utils/_get_lang_root.py` | UNVERIFIED |
| `textstat/backend/utils/_get_pyphen.py` | UNVERIFIED |
| `textstat/backend/utils/_typed_cache.py` | UNVERIFIED |
| `textstat/backend/utils/constants.py` | UNVERIFIED |
| `textstat/backend/validations/__init__.py` | UNVERIFIED |
| `textstat/backend/validations/_is_difficult_word.py` | UNVERIFIED |
| `textstat/resources/en/easy_words.txt` | UNVERIFIED |
| `textstat/resources/es/easy_words.txt` | UNVERIFIED |
| `tests/__init__.py` | UNVERIFIED |
| `tests/backend/__init__.py` | UNVERIFIED |
| `tests/backend/resources.py` | UNVERIFIED |
| `tests/backend/counts/__init__.py` | UNVERIFIED |
| `tests/backend/counts/test_count_arabic_long_words.py` | UNVERIFIED |
| `tests/backend/counts/test_count_arabic_syllables.py` | UNVERIFIED |
| `tests/backend/counts/test_count_chars.py` | UNVERIFIED |
| `tests/backend/counts/test_count_complex_arabic_words.py` | UNVERIFIED |
| `tests/backend/counts/test_count_difficult_words.py` | UNVERIFIED |
| `tests/backend/counts/test_count_faseeh.py` | UNVERIFIED |
| `tests/backend/counts/test_count_letters.py` | UNVERIFIED |
| `tests/backend/counts/test_count_long_words.py` | UNVERIFIED |
| `tests/backend/counts/test_count_miniwords.py` | UNVERIFIED |
| `tests/backend/counts/test_count_monosyllable_words.py` | UNVERIFIED |
| `tests/backend/counts/test_count_polysyllable_words.py` | UNVERIFIED |
| `tests/backend/counts/test_count_sentences.py` | UNVERIFIED |
| `tests/backend/counts/test_count_syllables.py` | UNVERIFIED |
| `tests/backend/counts/test_count_words.py` | UNVERIFIED |
| `tests/backend/metrics/__init__.py` | UNVERIFIED |
| `tests/backend/metrics/test_automated_readability_index.py` | UNVERIFIED |
| `tests/backend/metrics/test_chars_per_word.py` | UNVERIFIED |
| `tests/backend/metrics/test_coleman_liau_index.py` | UNVERIFIED |
| `tests/backend/metrics/test_crawford.py` | UNVERIFIED |
| `tests/backend/metrics/test_dale_chall_readability_score.py` | UNVERIFIED |
| `tests/backend/metrics/test_dale_chall_readability_score_v2.py` | UNVERIFIED |
| `tests/backend/metrics/test_fernandez_huerta.py` | UNVERIFIED |
| `tests/backend/metrics/test_flesch_kincaid_grade.py` | UNVERIFIED |
| `tests/backend/metrics/test_flesch_reading_ease.py` | UNVERIFIED |
| `tests/backend/metrics/test_gulpease_index.py` | UNVERIFIED |
| `tests/backend/metrics/test_gunning_fog.py` | UNVERIFIED |
| `tests/backend/metrics/test_gutierrez_polini.py` | UNVERIFIED |
| `tests/backend/metrics/test_letters_per_word.py` | UNVERIFIED |
| `tests/backend/metrics/test_linsear_write_formula.py` | UNVERIFIED |
| `tests/backend/metrics/test_lix.py` | UNVERIFIED |
| `tests/backend/metrics/test_osman.py` | UNVERIFIED |
| `tests/backend/metrics/test_reading_time.py` | UNVERIFIED |
| `tests/backend/metrics/test_rix.py` | UNVERIFIED |
| `tests/backend/metrics/test_sentences_per_word.py` | UNVERIFIED |
| `tests/backend/metrics/test_smog_index.py` | UNVERIFIED |
| `tests/backend/metrics/test_spache_readability.py` | UNVERIFIED |
| `tests/backend/metrics/test_syllables_per_word.py` | UNVERIFIED |
| `tests/backend/metrics/test_szigriszt_pazos.py` | UNVERIFIED |
| `tests/backend/metrics/test_text_standard.py` | UNVERIFIED |
| `tests/backend/metrics/test_wiener_sachtextformel.py` | UNVERIFIED |
| `tests/backend/metrics/test_words_per_sentence.py` | UNVERIFIED |
| `tests/backend/selections/__init__.py` | UNVERIFIED |
| `tests/backend/selections/test_list_difficult_words.py` | UNVERIFIED |
| `tests/backend/selections/test_list_words.py` | UNVERIFIED |
| `tests/backend/selections/test_set_difficult_words.py` | UNVERIFIED |
| `tests/backend/transformations/__init__.py` | UNVERIFIED |
| `tests/backend/transformations/test_remove_punctuation.py` | UNVERIFIED |
| `tests/backend/utils/__init__.py` | UNVERIFIED |
| `tests/backend/utils/test_get_cmudict.py` | UNVERIFIED |
| `tests/backend/utils/test_get_grade_suffix.py` | UNVERIFIED |
| `tests/backend/utils/test_get_lang_cfg.py` | UNVERIFIED |
| `tests/backend/utils/test_get_lang_easy_words.py` | UNVERIFIED |
| `tests/backend/utils/test_get_lang_root.py` | UNVERIFIED |
| `tests/backend/utils/test_get_pyphen.py` | UNVERIFIED |
| `tests/backend/utils/test_get_typed_cache.py` | UNVERIFIED |
| `tests/backend/validations/__init__.py` | UNVERIFIED |
| `tests/backend/validations/test_is_difficult_word.py` | UNVERIFIED |
| `tests/textstat/__init__.py` | UNVERIFIED |
| `tests/textstat/test_legacy_round.py` | UNVERIFIED |
| `tests/textstat/test_set_lang.py` | UNVERIFIED |
| `tests/textstat/test_set_rm_apostrophe.py` | UNVERIFIED |
| `tests/textstat/test_text_standard.py` | UNVERIFIED |

## Sweep 2 — named-things register (minimum observed set, not claimed exhaustive)

These are nouns actually inspected. This section is intentionally a lower bound, not a cosmetic claim of completeness.

| noun | kind observed | source | initial state call |
|---|---|---|---|
| `LANG_CONFIGS` | config object | `textstat/backend/utils/constants.py:14-64` | live |
| `fre_base` | formula coefficient | `textstat/backend/utils/constants.py:16,23,29,34,40,46,54,59` | live; card type blocked |
| `fre_sentence_length` | formula coefficient | `textstat/backend/utils/constants.py:17,24,30,35,41,47,55,60` | live; card type blocked |
| `fre_syll_per_word` | formula coefficient | `textstat/backend/utils/constants.py:18,25,31,36,42,48,56,61` | live; card type blocked |
| language `syllable_threshold` | classification cutoff | `textstat/backend/utils/constants.py:19,51,62` | live |
| `CACHE_SIZE` | operational constant | `textstat/backend/utils/constants.py:69` | live; card type blocked |
| `get_lang_cfg` | function | `textstat/backend/utils/_get_lang_cfg.py:7-31` | live |
| `count_syllables` | function | `textstat/backend/counts/_count_syllables.py:9-33` | live |
| `count_polysyllable_words` | function | `textstat/backend/counts/_count_polysyllable_words.py:9-25` | drift pair participant |
| `is_difficult_word` | function | `textstat/backend/validations/_is_difficult_word.py:9-48` | live |
| public difficult-word `syllable_threshold` | classification cutoff | `textstat/textstat.py:677-750` | live |
| `difficult_words(... unique=True)` | function/API default | `textstat/textstat.py:677-700` | drift |
| backend `count_difficult_words(... unique=False)` | function/API default | `textstat/backend/counts/_count_difficult_words.py:10-34` | live |
| `flesch_reading_ease` | function | `textstat/backend/metrics/_flesch_reading_ease.py:11-35` | live |
| Flesch coefficients | formula weights | `textstat/backend/utils/constants.py:14-63` | live; card type blocked |
| `smog_index` | function | `textstat/backend/metrics/_smog_index.py:9-39` | drift |
| SMOG coefficients `1.043`, `30`, `0.5`, `3.1291` | formula weights | `textstat/backend/metrics/_smog_index.py:29,37` | live; card type blocked |
| documented SMOG 3-sentence minimum | guard name | `README.md:176-178` | ghost / drift boundary |
| Dale–Chall `5` correction gate | score-path gate | `textstat/backend/metrics/_dale_chall_readability_score.py:39-52` | live; threshold-type disputed |
| Dale–Chall coefficients | formula weights | `textstat/backend/metrics/_dale_chall_readability_score.py:37,49,52` | live; card type blocked |
| `text_standard` consensus | function | `textstat/backend/metrics/_text_standard.py:16-100` | live |
| Flesch-to-grade bands inside consensus | conclusion cutoffs | `textstat/backend/metrics/_text_standard.py:40-57` | live |
| consensus clamp floor/cap | output cutoffs | `textstat/textstat.py:915-946` | live |
| `reading_time` `ms_per_char` | scaling parameter | `textstat/textstat.py:948-962` | live; card type blocked |
| `__easy_word_sets` | deprecated name | `textstat/textstat.py:17-20,35` | ghost candidate; proof incomplete |
| `__round_outputs` | deprecated name | `textstat/textstat.py:21-24,36` | ghost candidate; proof incomplete |

## Sweep 3 — real input walks

### A. Difficult-word classification

word → single-token guard → language easy-word set → syllable count → caller-supplied cutoff → boolean difficult/easy → optional list/set → count.

Evidence: `textstat/backend/validations/_is_difficult_word.py:32-48`; `textstat/backend/counts/_count_difficult_words.py:10-34`; `textstat/textstat.py:677-750`.

### B. Flesch Reading Ease

text → words/sentence and syllables/word → language-root coefficient lookup → weighted numeric score. There is no verdict in this function.

Evidence: `textstat/backend/metrics/_flesch_reading_ease.py:25-35`; `textstat/backend/utils/_get_lang_cfg.py:21-31`.

### C. `text_standard` consensus

text → eight readability metrics → each metric contributes grade candidates (Flesch Reading Ease uses explicit bands) → frequency count → most-common candidate → public wrapper clamps to 1–18 → float or grade-range string.

Evidence: `textstat/backend/metrics/_text_standard.py:32-100`; `textstat/textstat.py:915-946`.

## Sweep 4 — reconciliation result

- **live:** well-supported for the functions/configs above when code reads them and/or tests execute them.
- **drift:** supported for SMOG documentation versus runtime/tests, the SMOG polysyllable wording versus `>= 3`, and the public `difficult_words` default description versus its signature.
- **ghost:** the documented SMOG three-sentence minimum is the strongest candidate because the execution path contains no such guard and a one-sentence fixture is expected to return a score. The two deprecated private attributes are also ghost candidates, but I could not satisfy Cartographer's repository-wide exact-search proof requirement because anonymous GitHub code search was unavailable/rate-limited.
- **leftover:** I did not mark one. I found deprecated/no-effect surfaces such as `_cache_clear`, but they remain callable, so calling them leftover would overstate reachability evidence.