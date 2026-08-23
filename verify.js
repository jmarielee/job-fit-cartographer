#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════════
   verify.js — checks the map against itself and against the source it maps.
   Run:  node verify.js
   Exits 0 if everything passes, 1 if anything fails.

   Where things are. Change these two lines if you move anything.
   ─────────────────────────────────────────────────────────────────────── */

const fs   = require('fs');
const path = require('path');

const MAP_DIR    = 'map';                 // holds catalog.md and cards/
// Resolution order: explicit override, then the pinned snapshot that ships in
// this repo, then a sibling clone. The snapshot is why a bare clone works.
const SOURCE_DIR = process.env.JOBFIT
  || (fs.existsSync('territory/scoring.js') ? 'territory' : '../job-fit');



let failures = 0;
let warnings = 0;
let skipped = 0;

function head(n, title) {
  console.log('\n' + '─'.repeat(70));
  console.log(`CHECK ${n} — ${title}`);
  console.log('─'.repeat(70));
}
function pass(msg) { console.log('  PASS  ' + msg); }
function fail(msg) { console.log('  FAIL  ' + msg); failures++; }
function warn(msg) { console.log('  WARN  ' + msg); warnings++; }
function skip(msg) { console.log('  SKIP  ' + msg); skipped++; }


/* ── load the catalog and the card files ────────────────────────────────── */

const catalogPath = path.join(MAP_DIR, 'catalog.md');
if (!fs.existsSync(catalogPath)) {
  console.log(`\nCannot find ${catalogPath}. Run this from the repo root.`);
  process.exit(1);
}
const catalog = fs.readFileSync(catalogPath, 'utf8');

const pointed = [...new Set(
  (catalog.match(/cards\/[a-z0-9-]+\.md/g) || []).map(s => s.replace('cards/', ''))
)].sort();

const cardsDir = path.join(MAP_DIR, 'cards');
const existing = fs.existsSync(cardsDir)
  ? fs.readdirSync(cardsDir).filter(f => f.endsWith('.md')).sort()
  : [];

/* ── CHECK 1 — every catalog row has a card behind it ───────────────────── */

head(1, 'every catalog row has a card behind it');
const missing = pointed.filter(f => !existing.includes(f));
if (missing.length === 0) {
  pass(`all ${pointed.length} rows resolve`);
} else {
  fail(`${missing.length} of ${pointed.length} rows point at nothing:`);
  missing.forEach(f => console.log('          ' + f));
  console.log('\n        A dead link is a map that lies. Write the card, or');
  console.log('        write a stub that says "not yet written" and names the source.');
}

/* ── CHECK 2 — every card is reachable from the catalog ─────────────────── */

head(2, 'every card is reachable from the catalog');
const orphans = existing.filter(f => !pointed.includes(f));
if (orphans.length === 0) {
  pass(`all ${existing.length} cards are pointed at`);
} else {
  fail(`${orphans.length} cards exist that nothing points to:`);
  orphans.forEach(f => console.log('          ' + f));
  console.log('\n        An unreachable card is a card no walk will ever find.');
}

/* ── CHECK 3 — every cited line, printed beside what the source says ──────
   The old check asked only whether a line number existed. Every wrong
   citation this map has produced was a line that existed and said something
   else — app.js:123 for a guard that lives on :124, app.js:84 for a stage
   switch on :78. Existence is not the question. This prints the source line
   next to the claim so the eye can catch what a range test cannot.

   Three citation shapes are read:
     scoring.js:128        a named file and a line
     scoring.js:110–114    a range — BOTH ends are checked, never just the first
     :63                   the short form, which names no file

   The short form is resolved to whichever file that card cites most often by
   name, and the assumption is printed in the card's header line so it can be
   challenged. Rows resolved this way are marked ~. If the anchor is wrong,
   the card is ambiguous to a cold reader for exactly the same reason.

   Nothing here decides whether a card is right. It puts the claim and the
   code on the same line and leaves the judgement where it belongs.       */

head(3, 'every cited line, printed beside what the source says');

if (!fs.existsSync(SOURCE_DIR)) {
   skip(`cannot find the mapped source at ${SOURCE_DIR} — skipping`);
  console.log('        Set the path: JOBFIT=/path/to/job-fit node verify.js');
} else {
  const srcLines = {};
  for (const f of fs.readdirSync(SOURCE_DIR)) {
    if (/\.(js|html|css)$/.test(f)) {
      srcLines[f] = fs.readFileSync(path.join(SOURCE_DIR, f), 'utf8').split('\n');
    }
  }

  // a blank line, or one holding nothing but a brace or a comment fence, is
  // almost never what a card meant to point at — worth a second look
  const looksEmpty = s => {
    const t = (s || '').trim();
    return t === '' || /^[})\];]+[,;]?$/.test(t) || t === '*/' || t === '/*';
  };

  const D = '[\u2013\u2014-]';                          // en dash, em dash, hyphen
  const NAMED = new RegExp(`\\b([a-z0-9._-]+\\.(?:js|html|css)):(\\d+)(?:${D}(\\d+))?`, 'gi');
  const BARE  = new RegExp('`:(\\d+)(?:' + D + '(\\d+))?`', 'g');

  const ONLY = process.argv.includes('--suspicious');
  let total = 0, bad = 0, flagged = 0, inferred = 0;

  for (const card of existing) {
    const text = fs.readFileSync(path.join(cardsDir, card), 'utf8');

    // The first file a card names is its subject — that is what a bare :N means.
    // Every card here opens with a Source line naming the file it maps.
    const firstNamed = [...text.matchAll(NAMED)][0];
    const anchor = firstNamed ? firstNamed[1].toLowerCase() : null;

    const seen = new Set();
    const rows = [];
    const add = (file, n, isInferred, isRangeEnd) => {
      const label = `${file}:${n}`;
      if (seen.has(label)) return;                       // one row per citation
      seen.add(label);
      total++;
      if (isInferred) inferred++;
      if (!srcLines[file]) {
        rows.push(['FAIL', label, `no such file in ${SOURCE_DIR}`]); bad++;
      } else if (n < 1 || n > srcLines[file].length) {
        rows.push(['FAIL', label, `file is only ${srcLines[file].length} lines`]); bad++;
      } else {
        const src = (srcLines[file][n - 1] || '').trim();
        // a closing brace is a legitimate end of a function range — only flag
        // a bare-looking line when it was cited on its own
        const suspect = !isRangeEnd && looksEmpty(src);
        if (suspect) flagged++;
        rows.push([suspect ? '?' : (isInferred ? '~' : ' '), label, src.slice(0, 76)]);
      }
    };

    for (const m of text.matchAll(NAMED)) {
      const f = m[1].toLowerCase();
      add(f, parseInt(m[2], 10), false, false);
      if (m[3]) add(f, parseInt(m[3], 10), false, true);  // both ends of a range
    }
    if (anchor) {
      for (const m of text.matchAll(BARE)) {
        add(anchor, parseInt(m[1], 10), true, false);
        if (m[2]) add(anchor, parseInt(m[2], 10), true, true);
      }
    }

    const show = ONLY ? rows.filter(r => r[0] !== ' ') : rows;
    if (!show.length) continue;
    console.log(`\n  ${card}${anchor ? `   (short form read as ${anchor})` : ''}`);
    for (const [mark, label, src] of show) {
      console.log(`   ${mark.padEnd(4)} ${label.padEnd(18)} ${src}`);
    }
  }

  console.log('');
  if (bad === 0) {
    pass(`${total} citations printed — none point outside their file`);
  } else {
    fail(`${bad} of ${total} citations point outside their file`);
  }
  if (flagged)  warn(`${flagged} land on a blank line or a lone brace — check those first`);
  if (inferred) console.log(`        ${inferred} marked ~ had no filename and were resolved by card anchor.`);
  console.log('\n        Read the list. A citation can sit inside the file and still be');
  console.log('        wrong; that is the one thing this check cannot decide for you.');
  console.log('        Re-run with --suspicious for only the ? and ~ rows.');
}

/* ── CHECK 4 — the demo score the card claims is the score the code returns ─
   This is the check that reads the source and recomputes. It is meant to
   catch a card being wrong, including one of mine.                         */

head(4, 'demo-data.md states the score the code actually returns');
const demoCard = path.join(cardsDir, 'demo-data.md');
const scoringPath = path.join(SOURCE_DIR, 'scoring.js');
const appPath     = path.join(SOURCE_DIR, 'app.js');

if (!fs.existsSync(scoringPath) || !fs.existsSync(appPath)) {
  skip('source files not found — skipping');
} else {
  let real = null;
  try {
    const brainSrc = fs.readFileSync(scoringPath, 'utf8').split('/* ── SYSTEM PROMPT')[0];
    const { computeScore } = new Function(brainSrc + '\n return { computeScore };')();
    const appSrc = fs.readFileSync(appPath, 'utf8');
    const m = appSrc.match(/const DEMO_DATA = (\{[\s\S]*?\});\s*\n/);
    const D = JSON.parse(m[1]);
    const votes = (D.evaluators || []).map(e => ({
      id: e.id, lean: (e.score ?? 50) >= 55 ? 'apply' : 'skip'
    }));
    const brain = computeScore({
      jdItems: D.jdItems, strengths: D.strengths, evaluators: votes,
      resumeLen: D.resumeLen || 1500, jdLen: D.jdLen || 1400
    });
    real = brain.score;
    console.log(`        computeScore returns ${real} (${brain.verdict})`);
    if (D.survivabilityScore !== real) {
      console.log(`        DEMO_DATA ships the literal ${D.survivabilityScore}, which is overwritten at run time`);
    }
  } catch (err) {
        skip('could not recompute the demo score: ' + err.message);
  }

  if (real === null) {
    // already warned
  } else if (!fs.existsSync(demoCard)) {
    fail(`demo-data.md not written — cannot confirm it states ${real}`);
  } else {
    const text = fs.readFileSync(demoCard, 'utf8');
    const saysReal = new RegExp(`\\b${real}\\b`).test(text);
    if (saysReal) {
      pass(`demo-data.md states ${real}`);
    } else {
      fail(`demo-data.md does not state ${real} anywhere — the card is wrong`);
    }
  }
}

/* ── CHECK 5 — the value a threshold card states is the value in the source ─
   Check 4 keys one card against the running code. This keys the constants.

   A threshold card's whole claim is its number: TIE_FACTOR is 1.3, the cap
   is 45. If the source moves and the card does not, the card is confidently
   wrong in the one place a reader is most likely to trust it — and no
   citation check catches that, because the citation still resolves and
   still points at the right line.

   Read the constant out of the source. Read the number out of the card's
   Current value section. Compare. The source wins.                        */

head(5, 'threshold cards state the value the source declares');

if (!fs.existsSync(scoringPath)) {
  skip('source not found — skipping');
} else {
  const src = fs.readFileSync(scoringPath, 'utf8').split('\n');

  // constants declared as a bare number: `const NAME = 90;`
  const declared = {};
  src.forEach((line, i) => {
    const m = line.match(/^const\s+([A-Z][A-Z0-9_]*)\s*=\s*(-?\d+(?:\.\d+)?)\s*;/);
    if (m) declared[m[1]] = { value: m[2], line: i + 1 };
  });

  // card file -> the constant it is the card for
  const keyed = {
    'cap-value.md':      'CAP_VALUE',
    'gate-core-ceil.md': 'GATE_CORE_CEIL',
    'realism-ceil.md':   'REALISM_CEIL',
    'tie-factor.md':     'TIE_FACTOR',
  };

  let checked = 0, wrong = 0;
  for (const [card, name] of Object.entries(keyed)) {
    const p = path.join(cardsDir, card);
    if (!fs.existsSync(p)) { fail(`${card} — card missing`); wrong++; continue; }
    if (!declared[name])   { fail(`${name} — not declared as a bare constant in scoring.js`); wrong++; continue; }

    const text = fs.readFileSync(p, 'utf8');
    const sec  = text.split(/^##\s+Current value\s*$/mi)[1];
    if (!sec) { fail(`${card} — no "## Current value" section to key`); wrong++; continue; }

    const claim = (sec.match(/`(-?\d+(?:\.\d+)?)`/) || [])[1];
    if (claim === undefined) { fail(`${card} — Current value states no number`); wrong++; continue; }

    checked++;
    const real = declared[name].value;
    if (Number(claim) === Number(real)) {
      console.log(`        ${card.padEnd(20)} says ${claim.padEnd(6)} · scoring.js:${declared[name].line} declares ${real}`);
    } else {
      fail(`${card} says ${claim} — scoring.js:${declared[name].line} declares ${real}. The file wins.`);
      wrong++;
    }
  }

  if (wrong === 0) pass(`${checked} threshold values match the source`);
  console.log('\n        Weights (TIER_W, CENT_W, STATUS_F, EDGE_BONUS) are objects, not');
  console.log('        single numbers, and are not keyed here. Their cards carry tables.');
}

/* ── CHECK 6 — every ghost proof re-run against the source ─────────────────
   rules.md: "A ghost is not asserted. It is proven." Every ghost card carries
   the exact search that was run and what it returned.

   But a pasted search result is a photograph. If someone wires `divergent`
   up tomorrow, the card still shows "no matches" and the map lies in the
   one place it promised not to. So the searches are re-run here against the
   pinned territory and the result is compared to what the card claims.

   Two claim shapes are read:
     → no matches          must find zero
     → 6 matches / 11 hits must find that many lines

   Searches whose file list contains a glob are skipped and named — they
   cannot be resolved without shelling out, and this runs on stdlib only.  */

head(6, 'every ghost proof re-run against the source');

if (!fs.existsSync(SOURCE_DIR)) {
  skip('source not found — skipping');
} else {
  let ran = 0, broken = 0, unread = 0;

  for (const card of existing) {
    const text = fs.readFileSync(path.join(cardsDir, card), 'utf8');
    if (!/^##\s+Proof of absence/mi.test(text)) continue;

    // grep -n "TERM" fileA fileB   followed by   → no matches | → N matches
    const re = /^grep\s+-[a-z]+\s+"((?:[^"\\]|\\.)*)"\s+([^\n]+)\n(?:→\s*([^\n]+)\n)/gm;
    for (const m of text.matchAll(re)) {
      const [, term, fileList, claim] = m;
      const files = fileList.trim().split(/\s+/);

      if (files.some(f => f.includes('*'))) {
        console.log(`   skip ${card.padEnd(24)} "${term.slice(0,28)}" — file list uses a glob`);
        unread++; continue;
      }

      let rx;
      try { rx = new RegExp(term.replace(/\\\|/g, "|")); }   // grep BRE \| means alternation
      catch { console.log(`   skip ${card.padEnd(24)} search is not a readable pattern`); unread++; continue; }

      let hits = 0, missingFile = null;
      for (const f of files) {
        const p = path.join(SOURCE_DIR, f);
        if (!fs.existsSync(p)) { missingFile = f; break; }
        for (const line of fs.readFileSync(p, 'utf8').split('\n')) if (rx.test(line)) hits++;
      }
      if (missingFile) {
        fail(`${card} — searches ${missingFile}, which is not in the territory`);
        broken++; continue;
      }

      ran++;
      // A leading count wins. "14 hits, zero declarations" is a count claim —
      // the word "zero" later in the line describes what was NOT found, not
      // the total. Only a claim that opens with "no matches"/"zero" is a
      // zero claim.
      const n = (claim.match(/^(\d+)\s+(?:match|hit)/) || [])[1];
      const wantsZero = n === undefined && /^(no matches|zero)\b/i.test(claim);

      if (wantsZero) {
        if (hits === 0) {
          console.log(`        ${card.padEnd(24)} "${term.slice(0,26)}" → still no matches`);
        } else {
          fail(`${card} claims no matches for "${term}" — the source now has ${hits}. It is not a ghost.`);
          broken++;
        }
      } else if (n !== undefined) {
        if (hits === Number(n)) {
          console.log(`        ${card.padEnd(24)} "${term.slice(0,26)}" → ${hits}, as claimed`);
        } else {
          fail(`${card} claims ${n} for "${term}" — the source now has ${hits}.`);
          broken++;
        }
      } else {
        console.log(`   skip ${card.padEnd(24)} result "${claim.slice(0,30)}" is prose, not a count`);
        unread++;
      }
    }
  }

  if (broken === 0) pass(`${ran} ghost proofs re-run, all still true`);
  if (unread) console.log(`        ${unread} search${unread===1?'':'es'} not machine-readable — read those by eye.`);
}

/* ── RESULT ─────────────────────────────────────────────────────────────── */

console.log('\n' + '═'.repeat(70));

if (failures === 0 && skipped === 0) {
  console.log(`ALL CHECKS PASS${warnings ? `  (${warnings} warning${warnings===1?'':'s'})` : ''}`);
} else if (failures === 0) {
  console.log(`${skipped} CHECK${skipped===1?'':'S'} DID NOT RUN — the map is not verified`);
  console.log('A green banner over a check that never ran is worse than a failure.');
} else {
  console.log(`${failures} FAILURE${failures === 1 ? '' : 'S'}${skipped ? `, ${skipped} not run` : ''}`);
  console.log('Leave this visible. A verifier that never fails is decoration.');
}
console.log('═'.repeat(70) + '\n');
process.exit(failures === 0 && skipped === 0 ? 0 : 1);