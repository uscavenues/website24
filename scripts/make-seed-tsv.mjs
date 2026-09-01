#!/usr/bin/env node
/**
 * Generates the TSV to paste into each tab of the Avenues Content sheet, so it
 * starts as a faithful mirror of the live site rather than something retyped.
 *
 * Then parses that TSV back and asserts it reproduces lib/content.json exactly
 * — if the spreadsheet schema cannot represent the current data losslessly, we
 * want to know now, not after someone has started editing.
 *
 *   node scripts/make-seed-tsv.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "apps-script/seed");
const content = JSON.parse(readFileSync(join(ROOT, "lib/content.json"), "utf8"));

const cell = (v) => {
  const s = String(v ?? "");
  // TSV is only safe because no value contains a tab or newline. Assert it.
  assert.ok(!/[\t\n\r]/.test(s), `value contains a tab or newline, which TSV cannot carry: ${JSON.stringify(s)}`);
  return s;
};
const tsv = (headers, rows) =>
  [headers, ...rows].map((r) => r.map(cell).join("\t")).join("\n") + "\n";

const tabs = {
  settings: tsv(
    ["key", "value"],
    [
      ["applications_open", content.settings.applications_open ? "TRUE" : "FALSE"],
      ["application_season", content.settings.application_season],
      ["application_form_url", content.settings.application_form_url],
      ["members_password", content.settings.members_password],
    ]
  ),
  team: tsv(
    ["section", "name", "role", "photo", "linkedin"],
    ["executive", "directors", "associates"].flatMap((section) =>
      content.team[section].map((m) => [section, m.name, m.role, m.photo, m.linkedin])
    )
  ),
  mentors: tsv(["name", "logo"], content.mentors.map((m) => [m.name, m.logo])),
  alumni: tsv(
    ["company", "logo", "positions"],
    content.alumni.map((a) => [a.company, a.logo, a.positions.join(", ")])
  ),
  clients: tsv(
    ["name", "logo", "services"],
    content.clients.map((c) => [c.name, c.logo, c.services.join(", ")])
  ),
  majors: tsv(["major"], content.majors.map((m) => [m])),
  faq: tsv(["question", "answer"], content.faq.map((f) => [f.q, f.a])),
};

mkdirSync(OUT, { recursive: true });
for (const [name, body] of Object.entries(tabs)) {
  writeFileSync(join(OUT, `${name}.tsv`), body);
}

// ── round trip: parse the TSV back the way Apps Script will, and compare ──────
const parse = (body) => {
  const [head, ...rest] = body.trimEnd().split("\n");
  const headers = head.split("\t");
  return rest.map((line) => {
    const cells = line.split("\t");
    return Object.fromEntries(headers.map((h, i) => [h, (cells[i] ?? "").trim()]));
  });
};
const list = (s) => s.split(",").map((x) => x.trim()).filter(Boolean);

const kv = Object.fromEntries(parse(tabs.settings).map((r) => [r.key, r.value]));
const team = { executive: [], directors: [], associates: [] };
for (const r of parse(tabs.team)) {
  team[r.section].push({ name: r.name, role: r.role, photo: r.photo, linkedin: r.linkedin });
}

const roundTripped = {
  settings: {
    applications_open: kv.applications_open === "TRUE",
    application_form_url: kv.application_form_url,
    application_season: kv.application_season,
    members_password: kv.members_password,
  },
  team,
  mentors: parse(tabs.mentors).map((r) => ({ name: r.name, logo: r.logo })),
  alumni: parse(tabs.alumni).map((r) => ({ company: r.company, logo: r.logo, positions: list(r.positions) })),
  clients: parse(tabs.clients).map((r) => ({ name: r.name, logo: r.logo, services: list(r.services) })),
  majors: parse(tabs.majors).map((r) => r.major),
  faq: parse(tabs.faq).map((r) => ({ q: r.question, a: r.answer })),
};

const norm = (o) => JSON.parse(JSON.stringify(o));
assert.deepEqual(norm(roundTripped), norm(content), "sheet schema cannot represent content.json losslessly");

console.log(`wrote ${Object.keys(tabs).length} TSV files to apps-script/seed/`);
for (const [name, body] of Object.entries(tabs)) {
  console.log(`  ${name}.tsv — ${body.trimEnd().split("\n").length - 1} rows`);
}
console.log("\nround trip OK — sheet → content.json reproduces the current data exactly");
