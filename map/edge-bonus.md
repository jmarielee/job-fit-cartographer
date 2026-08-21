# EDGE_BONUS

**Type** threshold
**State** live
**Stage** 3 — math
**Source** `scoring.js:35` declared · `:129` read · `:130` scaled · `:131` applied · `:210` returned as `bonus` · `render.js:228` displayed

---

## What it is

A four-key table — `{ core: 12, supporting: 6, peripheral: 0, none: 0 }` — that adds
points for the candidate's single most central strength. It is keyed on
`str.best` from `_computeStrength` (`scoring.js:58–67`), **not** on `S`.

## Why it is shaped this way

**Keyed on the best strength, not the sum.** `_computeStrength` walks the
strengths, skips any with `mapsToNeed` false (`:62`), and tracks the highest
centrality seen in a rank map (`:60`, `:64`). Ten core strengths pay exactly
what one core strength pays. The sum it also builds — `S` — is spent elsewhere
(see *Does not hit*).

**Scaled by headroom.** `effectiveBonus = bonus * (1 - base / 100)` (`:130`).
The reward shrinks as the base rises: at base 40 a core strength is worth +7.2,
at base 70 it is worth +3.6, at base 90 it is worth +1.2, at base 100 it is
worth nothing. The table's face value is only ever paid to a candidate whose
base is 0. The number in the constant is the number nobody gets.

**Zeroes are deliberate.** `peripheral: 0` and `none: 0` mean a peripheral
strength cannot buy score. It can still move `edgeVsGap`.

**Spent before the guards.** `:131` applies the bonus, then the required-gate
cap fires at `:137–140` and the core-gate ceiling at `:164–166`, then the score
is rounded at `:169`. Anything the bonus adds is available to be clamped away.

## Hits

- `score` — the only value it touches, via `:130 → :131`.
- `verdict`, through the score bands at `:176–179` and nothing else.
- `recommendation`, through the score thresholds at `:183` and `:185` only.
- The `Edge bonus` receipt row, `render.js:228`.

## Does not hit

**Wrong neighbour: `TIE_FACTOR`** (`scoring.js:39`, `cards/tie-factor.md`).
Both read the same strengths and both sound like the strength knob. EDGE_BONUS
moves the number and never the label. TIE_FACTOR moves the label and never the
number. `_edgeVsGap` is called at `:171` with the raw `str.S` and `gaps.G` — the
bonus was already spent at `:130` and appears in neither argument.

Also not `S` itself (that is `CENT_W` at `:63`), not the gate (`:84–103`), not
`vote` (`:115–123`), not `capped` or `gateCapped`, not the ledger.

**The crossover to keep straight:** a peripheral mapped strength adds 0.3 to `S`
(`:63`) — enough to flip `edgeVsGap` — and adds exactly 0 here (`:35`). The two
knobs disagree about which strengths count.

## Receipt drift

`render.js:228` does read `b.bonus`; this is not a hardcode like the `1.3` at
`:209` or the `90 / 45 / 74` at `:212–214`. The drift is quieter and worse. The
row prints the raw table value with the words *"max, scaled by headroom"* and
never prints the scaled value, because `effectiveBonus` is a local at
`scoring.js:130` and is absent from the returned object (`:209–214`). A run with
base 70 shows **+12** in a receipt whose Final score reflects **+3.6**. The
number displayed is never the number applied.

## If you change it

1. **Raising `core` to lift a borderline candidate into Strong Candidate works
   — until a gate is live.** At base 70 you need +5, so `core` must be ≥ 17.
   But `GATE_CORE_CEIL` clamps to 74 at `:164–166` whenever a core required item
   is missing, and `CAP_VALUE` clamps to 45 when `reqMiss ≥ 2` (`:137–140`).
   Inside either guard, every point you added is discarded.
2. **It will never buy an "Apply".** `:184` requires `evg === 'edge'`, which is
   TIE_FACTOR's business. You can raise the score into Strong Candidate and
   still read *Apply with Caution*.
3. **Lifting `peripheral` off 0 changes more runs than expected.** `best` is
   `peripheral` whenever some strength maps and none ranks higher (`:60`, `:64`)
   — the common shape for thin resumes, which are also the low-base runs where
   headroom scaling pays nearly full value.
4. **Raising the top of the table does nothing at the top of the range.** A
   candidate with `G = 0` has base 100, `effectiveBonus` 0, and lands on
   `REALISM_CEIL` 90 at `:131` no matter what the table says. The bonus is
   structurally largest exactly where the guards are most likely to eat it.
