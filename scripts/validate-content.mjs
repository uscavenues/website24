#!/usr/bin/env node
/**
 * Validates lib/content.json — the file the Avenues Content spreadsheet writes.
 *
 * This is the BACKSTOP. The spreadsheet runs the same rules in Apps Script and
 * refuses to publish, so an editor sees the error in a dialog rather than here.
 * If this ever fails in CI it means something bypassed the sheet, so it fails
 * the build rather than deploying a half-broken roster.
 *
 *   node scripts/validate-content.mjs [path-to-content.json]
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PROFILES = join(ROOT, "public/assets/photos/profiles");
const LOGOS = join(ROOT, "public/assets/logos");

const errors = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);

/** Mirrors lib/imageLoader.ts — jpg/png are served as .webp, svg is untouched. */
function assetExists(dir, filename) {
  if (existsSync(join(dir, filename))) return true;
  const webp = filename.replace(/\.(jpe?g|png)$/i, ".webp");
  return webp !== filename && existsSync(join(dir, webp));
}

const isBlank = (v) => typeof v !== "string" || v.trim() === "";

function checkPerson(p, where) {
  if (isBlank(p.name)) err(where, "name is empty");
  if (isBlank(p.role)) err(where, "role is empty");
  if (isBlank(p.linkedin) || !/^https:\/\/(www\.)?linkedin\.com\/in\//.test(p.linkedin)) {
    err(where, `linkedin must be a https://www.linkedin.com/in/... URL (got "${p.linkedin ?? ""}")`);
  }
  // Blank photo is legal — it renders the silhouette. A wrong slug is not.
  if (!isBlank(p.photo)) {
    if (/[^a-z0-9-]/.test(p.photo)) {
      err(where, `photo "${p.photo}" must be lowercase letters, numbers and dashes only, with no file extension`);
    } else if (!assetExists(PROFILES, `${p.photo}.jpg`)) {
      err(where, `no photo file for "${p.photo}". Leave the cell blank until it has been uploaded.`);
    }
  }
}

function checkLogoRow(row, where, nameKey, listKey) {
  if (isBlank(row[nameKey])) err(where, `${nameKey} is empty`);
  if (isBlank(row.logo)) {
    err(where, "logo is empty");
  } else if (!/\.[a-z0-9]+$/i.test(row.logo)) {
    err(where, `logo "${row.logo}" needs a file extension (e.g. acme.png)`);
  } else if (!assetExists(LOGOS, row.logo)) {
    err(where, `no logo file "${row.logo}" in public/assets/logos`);
  }
  if (listKey) {
    const list = row[listKey];
    if (!Array.isArray(list) || list.length === 0) err(where, `${listKey} is empty`);
    else list.forEach((v, i) => isBlank(v) && err(where, `${listKey}[${i}] is empty`));
  }
}

const TARGET = process.argv[2] ?? join(ROOT, "lib/content.json");

let content;
try {
  content = JSON.parse(readFileSync(TARGET, "utf8"));
} catch (e) {
  console.error(`content.json is not valid JSON: ${e.message}`);
  process.exit(1);
}

// settings
const s = content.settings ?? {};
if (typeof s.applications_open !== "boolean") {
  err("settings", `applications_open must be TRUE or FALSE (got "${s.applications_open}")`);
}
if (isBlank(s.application_form_url) || !/^https:\/\//.test(s.application_form_url)) {
  err("settings", "application_form_url must be an https:// link");
}
if (isBlank(s.members_password)) err("settings", "members_password is empty");
if (isBlank(s.application_season)) {
  err("settings", 'application_season is empty (e.g. "Fall 2026") — it is shown on the apply page');
}

// team
const SECTIONS = ["executive", "directors", "associates"];
for (const section of SECTIONS) {
  const rows = content.team?.[section];
  if (!Array.isArray(rows)) {
    err(`team.${section}`, "missing — check the section dropdown in the team tab");
    continue;
  }
  rows.forEach((p, i) => checkPerson(p, `team.${section} row ${i + 1} (${p?.name || "unnamed"})`));
}
const total = SECTIONS.reduce((n, k) => n + (content.team?.[k]?.length ?? 0), 0);
if (total === 0) err("team", "no members at all — refusing to publish an empty roster");

// logo-bearing lists
(content.mentors ?? []).forEach((m, i) => checkLogoRow(m, `mentors row ${i + 1} (${m?.name || "unnamed"})`, "name", null));
(content.alumni ?? []).forEach((a, i) => checkLogoRow(a, `alumni row ${i + 1} (${a?.company || "unnamed"})`, "company", "positions"));
(content.clients ?? []).forEach((c, i) => checkLogoRow(c, `clients row ${i + 1} (${c?.name || "unnamed"})`, "name", "services"));

// simple lists
(content.majors ?? []).forEach((m, i) => isBlank(m) && err(`majors row ${i + 1}`, "empty"));
if ((content.majors ?? []).length === 0) err("majors", "empty");
(content.faq ?? []).forEach((f, i) => {
  if (isBlank(f.q)) err(`faq row ${i + 1}`, "question is empty");
  if (isBlank(f.a)) err(`faq row ${i + 1} (${f.q})`, "answer is empty");
});

if (errors.length) {
  console.error(`content.json is invalid — ${errors.length} problem(s):\n`);
  for (const e of errors) console.error(`  • ${e}`);
  console.error("\nFix the row in the Avenues Content sheet and hit Publish again.");
  process.exit(1);
}

console.log(
  `content.json OK — ${total} members, ${(content.mentors ?? []).length} mentors, ` +
    `${(content.alumni ?? []).length} alumni, ${(content.clients ?? []).length} clients, ` +
    `${(content.majors ?? []).length} majors, ${(content.faq ?? []).length} FAQ`
);
