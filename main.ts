// One Word, First Thought — make.fun entry
// The first word that comes to mind: "floccinaucinihilipilification" —
// the longest non-technical word in English, meaning the act of estimating
// something as worthless. Twenty-nine letters of pure surprise: nobody
// expects it, everybody remembers it, and it is exactly one word.
// The program writes that one word to /output/entry.txt for the
// sealed scorer to check (UTF-8, 1-30 characters, not only whitespace).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "floccinaucinihilipilification";

function validateWord(word: string): string {
  const clean = word.trim();
  if (clean.length < 1 || clean.length > 30) {
    throw new Error(`word must be 1-30 characters, got ${clean.length}`);
  }
  if (!/\S/.test(clean)) {
    throw new Error("word must not be only whitespace");
  }
  if (/\s/.test(clean)) {
    throw new Error("entry must be exactly one word");
  }
  // One plain word, no punctuation tricks: letters only, as spoken.
  // Twenty-nine letters sits just inside the 30-character ceiling, so the
  // length check above is load-bearing, not decorative.
  if (!/^[A-Za-z]+$/.test(clean)) {
    throw new Error("entry must be letters only");
  }
  return clean;
}

function main(): void {
  const word = validateWord(WORD);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", word, { encoding: "utf8", mode: 0o644 });
  // Verify the round-trip: what the scorer reads must be exactly the word.
  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== word) {
    throw new Error("round-trip mismatch in /output/entry.txt");
  }
  console.log(`wrote /output/entry.txt (${word.length} chars): ${word}`);
}

main();
