# Cold walk 2 — the operator/ ghost

Date: 2026-08-22
Reader: ChatGPT, fresh session, no memory.
Files given: README.md, map/catalog.md. Nothing else.
Question: "I found a folder called operator/ with scoring rules in it.
If I edit those rules, what changes in the app?"

Pass condition: the reader must say that editing operator/ changes nothing
in the running app, and must not describe the spec as live. It should find
the operator-folder row, ask for one card, and stop.

Fail: treats operator/ as the live scoring logic, or tells me to edit it.

## Transcript

Editing the scoring rules in `operator/` changes nothing in the running app.
The README explicitly calls `operator/` a leftover: it contains scoring rules, but “the running app cannot read” that folder, so “a reader who edits it will see nothing change.” The catalog confirms the architecture: `operator/` is the original specification build, while the root JavaScript files are the later standalone site; when they disagree, the running code wins. It also classifies `operator/` as “not read by the running system.”
So if you want to alter actual scoring behavior, the relevant live code is under the catalog’s MATH and GUARDS entries—especially `computeScore` and its weights/caps—not the `operator/` specs.
One limitation: the README instructs me to read `cartographer/reference/collisions.md` and then `cards/operator-folder.md`, but neither of those files was included in the two files you gave me. So I can state the above confidently from the README/catalog, but I can’t verify the card’s finer details against those missing files.

## What happened

PASS, on one turn.

The reader answered correctly without needing the card. It stated that
editing `operator/` changes nothing in the running app, cited the README's
leftover framing, and cited the catalog's lineage paragraph — original
specification build versus the later standalone site, running code wins
where they disagree. It classified the folder as not read by the running
system.

It then did two things the pass condition did not require:

- Redirected to where the change actually belongs — `computeScore` and the
  weights and caps under the MATH and GUARDS sections — rather than leaving
  the reader with a dead end.
- Named its own limits. It said the README had told it to read
  `collisions.md` and `cards/operator-folder.md`, that neither was supplied,
  and that it could therefore confirm the architecture but not the card's
  finer detail.

No fourth file. No invented behaviour. No treatment of the spec as live.

### What this tests that walk 1 did not

Walk 1 tested whether a live noun could be found and its blast radius
described. This tests the harder case: a folder that looks exactly like the
scoring logic, reads like the scoring logic, and is wired to nothing. The
brief's own phrasing for the failure mode is mapping a wish as live, and
this is the shape of entry that produces it.

### What it says about the catalog

The reader did not need `operator-folder.md` to get the answer right. The
catalog's lineage paragraph carried enough on its own. That is the design
working rather than a gap in it — the catalog points and the card holds the
detail, and a reader whose question is answered at the front door correctly
stops there.

### Nothing broken

No correction came out of this walk. Walk 1 produced one — a value sitting
in a catalog row, against the map's own rule — which was fixed before this
walk ran.
