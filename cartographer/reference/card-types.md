# Card types — closed set

Six types. Nothing else. Every card declares its type on the face.

---

## 1. `object`

A thing that exists and holds or carries something. A file, a schema field,
a data structure.

Required sections: What it is · Why it is shaped this way · Hits ·
Does not hit · Source.

---

## 2. `computed value`

A value the system derives at run time. It exists only while the code runs;
no file holds it. The card's job is to say what it is computed from and who
reads it afterwards.

Required sections: What it is · Why it is shaped this way · Hits ·
Does not hit · Source.

---

## 3. `function`

A named routine in the source. Mapped when a reader would search for it by
name and needs to know what calling it changes.

Required sections: What it is · Why it is shaped this way · Hits ·
Does not hit · Source.

---

## 4. `threshold`

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

## 5. `ghost`

A name with no wiring.

Required sections: What the name suggests · **Proof of absence** (the exact
search and its result) · Why a reader will trip on it · What to do instead.

`Hits` is replaced by `Proof of absence`. A ghost hits nothing — that is
what makes it a ghost, and asserting it without the search is not permitted.

---

## 6. `leftover`

Real and wired, but nothing currently reaches it. Honest rather than
misleading — a leftover does not pretend to be live.

Uses the ghost skeleton with the state changed, plus a note on what last
reached it.

Required sections: What the name suggests · **Proof of absence** (the exact
search and its result) · What last reached it · Why a reader will trip on
it · What to do instead.