// makefun-human-sleep-patch-note
// Writes ONE single-line patch note announcing human sleep has been fixed
// to <outputDir>/entry.txt (MAKEFUN_OUTPUT_DIR, default "/output").
// Node 22, stdlib only, deterministic, no network, no wall-clock time,
// no unseeded randomness.
//
// The entry line (122 chars):
//   Fixed: humans no longer wake at 3 AM to replay an embarrassing moment
//   from 2014; the replay has been rescheduled to never.
//
// Why this line: it reads as a real changelog entry, names a specific,
// recognisable sleep bug (the 3 AM wake-up to replay an old embarrassment)
// and resolves it with an absurd-but-plausible patch action (rescheduling
// the replay to never). It trusts the reader to get the joke — no
// explanation, no padding.
//
// Rejected candidates:
//   1. "Fixed: sleep is now fixed." — flat claim, no specific bug, no joke.
//   2. "Fixed: dreams no longer buffer at 99% all night; REM now ships
//      with a loading bar that actually finishes." — decent, but the
//      buffering metaphor is less universally felt than the 3 AM replay.
//   3. "Fixed: the snooze button no longer grants nine extra minutes of
//      anxiety; it now grants nine extra minutes of sleep." — good line,
//      but it fixes mornings, not sleep itself, so it risks reading as
//      off-topic for a "fix human sleep" patch note.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Fixed: humans no longer wake at 3 AM to replay an embarrassing moment from 2014; the replay has been rescheduled to never.";

// Gate: UTF-8, 1-160 characters, single line, not only whitespace,
// no trailing newline. Throw on any violation.
if (ENTRY.length < 1 || ENTRY.length > 160) {
  throw new Error(`entry length ${ENTRY.length} outside 1-160 characters`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
// Write exactly ENTRY — no trailing newline appended, so entry.txt is
// a single line with no trailing newline, as the gate requires.
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
