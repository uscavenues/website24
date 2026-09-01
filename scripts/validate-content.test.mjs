#!/usr/bin/env node
/**
 * Proves the validator actually rejects the mistakes an editor will make.
 * A validator that only ever passes is worse than none — it reads as a
 * guarantee while guaranteeing nothing.
 *
 *   node scripts/validate-content.test.mjs
 */
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const VALIDATOR = join(ROOT, "scripts/validate-content.mjs");
const good = JSON.parse(readFileSync(join(ROOT, "lib/content.json"), "utf8"));
const dir = mkdtempSync(join(tmpdir(), "avenues-content-"));

/** @returns {{ok: boolean, out: string}} */
function run(content, label) {
  const file = join(dir, `${label}.json`);
  writeFileSync(file, JSON.stringify(content));
  try {
    return { ok: true, out: execFileSync("node", [VALIDATOR, file], { encoding: "utf8" }) };
  } catch (e) {
    return { ok: false, out: `${e.stdout ?? ""}${e.stderr ?? ""}` };
  }
}

const clone = () => JSON.parse(JSON.stringify(good));
const cases = [];
const rejects = (label, mutate, expect) =>
  cases.push({ label, mutate, expect });

rejects("blank member name", (c) => { c.team.directors[0].name = ""; }, /name is empty/);
rejects("blank member role", (c) => { c.team.directors[0].role = "  "; }, /role is empty/);
rejects("linkedin not a profile URL", (c) => { c.team.directors[0].linkedin = "linkedin.com/in/x"; }, /linkedin must be/);
rejects("photo slug with no file", (c) => { c.team.directors[0].photo = "nobody-by-this-name"; }, /no photo file/);
rejects("photo slug with extension", (c) => { c.team.directors[0].photo = "armani.jpg"; }, /no file extension|lowercase letters/);
rejects("whole section deleted", (c) => { delete c.team.associates; }, /missing/);
rejects("empty roster", (c) => { c.team = { executive: [], directors: [], associates: [] }; }, /empty roster/);
rejects("logo file missing", (c) => { c.clients[0].logo = "not-a-real-logo.png"; }, /no logo file/);
rejects("logo without extension", (c) => { c.clients[0].logo = "linked"; }, /needs a file extension/);
rejects("client with no services", (c) => { c.clients[0].services = []; }, /services is empty/);
rejects("alumni with no positions", (c) => { c.alumni[0].positions = []; }, /positions is empty/);
rejects("applications_open as text", (c) => { c.settings.applications_open = "yes"; }, /TRUE or FALSE/);
rejects("form url not https", (c) => { c.settings.application_form_url = "docs.google.com/forms"; }, /https/);
rejects("blank members password", (c) => { c.settings.members_password = ""; }, /members_password is empty/);
rejects("empty FAQ answer", (c) => { c.faq[0].a = ""; }, /answer is empty/);
rejects("blank application season", (c) => { c.settings.application_season = ""; }, /application_season is empty/);
rejects("empty majors list", (c) => { c.majors = []; }, /majors: empty/);

let failed = 0;

// The real file must pass, or every rejection below proves nothing.
const baseline = run(good, "baseline");
assert.ok(baseline.ok, `real content.json must validate, got:\n${baseline.out}`);
console.log("✓ real content.json passes");

for (const { label, mutate, expect } of cases) {
  const c = clone();
  mutate(c);
  const r = run(c, label.replace(/\W+/g, "-"));
  if (r.ok) {
    console.error(`✗ ${label}: validator ACCEPTED bad data`);
    failed++;
  } else if (!expect.test(r.out)) {
    console.error(`✗ ${label}: rejected, but message did not match ${expect}\n    ${r.out.trim().split("\n").join("\n    ")}`);
    failed++;
  } else {
    console.log(`✓ rejects ${label}`);
  }
}

if (failed) {
  console.error(`\n${failed} of ${cases.length} checks failed`);
  process.exit(1);
}
console.log(`\nall ${cases.length} rejection checks passed`);
