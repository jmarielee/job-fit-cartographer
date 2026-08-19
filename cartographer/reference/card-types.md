# Card types — closed set

Four types. Nothing else. Every card declares its type on the face.

---

## 1. `object`

A thing that exists and holds or carries something. A file, a schema field,
a data structure.

Required sections: What it is · Why it is shaped this way · Hits ·
Does not hit · Source.

---

## 2. `stage`

A position in the decision order. May not correspond to any single file.

Required sections: What happens here · What arrives · What leaves ·
Hits · Does not hit · Source.

---

## 3. `threshold`

**A constant that governs what the system is permitted to conclude.**

This is the type that distinguishes a decision system from a storage system.
A threshold has no contents and no position in a data flow. Changing it moves
no data. It changes the verdict.

Required sections, in addition to the object sections:

- **Current value** — the number and its source line.
- **What it gates** — the specific conclusion it permits or forbids.
- **What moves when it moves** — downstream conclusions, not downstream data.
- **What does not move** — mandatory. Nearly every threshold in a decision
  system has a same-vocabulary neighbour that does the opposite thing.
- **If you change it** — the surprise. What a reader will expect to happen
  and won't. A threshold card without this section is an object card.

A threshold card is wrong if it can be summarised as "this number is used
in this calculation." That describes a weight, not a threshold. A weight
scales an output. A threshold decides whether a conclusion is allowed.

---

## 4. `ghost`

A name with no wiring.

Required sections: What the name suggests · **Proof of absence** (the exact
search and its result) · Why a reader will trip on it · What to do instead.

`Hits` is replaced by `Proof of absence`. A ghost hits nothing — that is
what makes it a ghost, and asserting it without the search is not permitted.

A `leftover` uses the ghost skeleton with the state changed and a note on
what last reached it.
