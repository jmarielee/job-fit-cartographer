#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════════
   verify.js — checks the map against itself and against the source it maps.
   Run:  node verify.js
   Exits 0 if everything passes, 1 if anything fails.

   Where things are. Change these two lines if you move anything.
   ─────────────────────────────────────────────────────────────────────── */

const MAP_DIR    = 'map';                 // holds catalog.md and cards/
const SOURCE_DIR = process.env.JOBFIT || '../job-fit';   // the repo being mapped

const fs   = require('fs');
const path = require('path');

let failures = 0;
let warnings = 0;

function head(n, title) {
  console.log('\n' + '─'.repeat(70));
  console.log(`CHECK ${n} — ${title}`);
  console.log('─'.repeat(70));
}
function pass(msg) { console.log('  PASS  ' + msg); }
function fail(msg) { console.log('  FAIL  ' + msg); failures++; }
function warn(msg) { console.log('  WARN  ' + msg); warnings++; }

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

/* ── CHECK 3 — cited line numbers exist in the source ───────────────────── */

head(3, 'cited line numbers exist in the source');
if (!fs.existsSync(SOURCE_DIR)) {
  warn(`cannot find the mapped source at ${SOURCE_DIR} — skipping`);
  console.log('        Set the path: JOBFIT=/path/to/job-fit node verify.js');
} else {
  const lineCounts = {};
  for (const f of fs.readdirSync(SOURCE_DIR)) {
    if (/\.(js|html|md)$/.test(f)) {
      lineCounts[f] = fs.readFileSync(path.join(SOURCE_DIR, f), 'utf8').split('\n').length;
    }
  }
  let cites = 0, bad = 0;
  for (const card of existing) {
    const text = fs.readFileSync(path.join(cardsDir, card), 'utf8');
    const refs = text.match(/\b[a-z0-9._-]+\.(?:js|html):\d+/gi) || [];
    for (const ref of refs) {
      const [file, lineStr] = ref.split(':');
      const line = parseInt(lineStr, 10);
      cites++;
      if (lineCounts[file] === undefined) {
        fail(`${card} cites ${ref} — no such file in ${SOURCE_DIR}`);
        bad++;
      } else if (line > lineCounts[file]) {
        fail(`${card} cites ${ref} — ${file} is only ${lineCounts[file]} lines`);
        bad++;
      }
    }
  }
  if (bad === 0) pass(`all ${cites} cited line numbers land inside their file`);
}

/* ── CHECK 4 — the demo score the card claims is the score the code returns ─
   This is the check that reads the source and recomputes. It is meant to
   catch a card being wrong, including one of mine.                         */

head(4, 'demo-data.md states the score the code actually returns');
const demoCard = path.join(cardsDir, 'demo-data.md');
const scoringPath = path.join(SOURCE_DIR, 'scoring.js');
const appPath     = path.join(SOURCE_DIR, 'app.js');

if (!fs.existsSync(scoringPath) || !fs.existsSync(appPath)) {
  warn('source files not found — skipping');
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
    warn('could not recompute the demo score: ' + err.message);
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

/* ── RESULT ─────────────────────────────────────────────────────────────── */

console.log('\n' + '═'.repeat(70));
if (failures === 0) {
  console.log(`ALL CHECKS PASS${warnings ? `  (${warnings} skipped)` : ''}`);
} else {
  console.log(`${failures} FAILURE${failures === 1 ? '' : 'S'}${warnings ? `, ${warnings} skipped` : ''}`);
  console.log('Leave this visible. A verifier that never fails is decoration.');
}
console.log('═'.repeat(70) + '\n');
process.exit(failures === 0 ? 0 : 1);
