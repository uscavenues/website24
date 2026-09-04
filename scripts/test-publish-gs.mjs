/**
 * Runs the REAL apps-script/Publish.gs in Node, with the Google globals stubbed
 * and the seed TSVs standing in for the sheet.
 *
 * Why this exists: Publish.gs is the code that actually runs when someone hits
 * "Publish to site", and it cannot be executed locally by Google. Without this
 * harness the only test of it is a non-technical editor discovering a bug during
 * setup. scripts/make-seed-tsv.mjs re-implements the parse to check the seed
 * round-trips, which proves the TSVs are well-formed but proves nothing about
 * Publish.gs — and lets the two copies drift. This one executes the shipped code.
 *
 *   node scripts/test-publish-gs.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createContext, runInContext } from "node:vm";
import assert from "node:assert/strict";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GS = readFileSync(join(ROOT, "apps-script/Publish.gs"), "utf8");

/** Seed TSV -> the 2-D array of cell values getDataRange().getValues() returns. */
function tabValues(name) {
  const text = readFileSync(join(ROOT, "apps-script/seed", `${name}.tsv`), "utf8");
  return text.replace(/\n$/, "").split("\n").map((line) => line.split("\t"));
}

const TABS = ["settings", "team", "mentors", "alumni", "clients", "majors", "faq"];
const SETUP_GS = readFileSync(join(ROOT, "apps-script/Setup.gs"), "utf8");

/** The SEED literal Setup.gs writes into a fresh sheet. */
function setupSeed() {
  const ctx = createContext({});
  runInContext(SETUP_GS + "\n;__seed = SEED;", ctx, { filename: "Setup.gs" });
  return JSON.parse(JSON.stringify(runInContext("__seed", ctx)));
}

/** Files the repo really has, so checkAssets_ is exercised against reality. */
const repoFiles = (dir) => readdirSync(join(ROOT, "public", dir));

function makeSandbox(sheets, { files = true } = {}) {
  const ui = {
    alert: () => {},
    createMenu: () => ({ addItem: () => ui.menu, addToUi: () => {} }),
  };
  ui.menu = { addItem: () => ui.menu, addSeparator: () => ui.menu, addToUi: () => {} };

  return {
    console,
    SpreadsheetApp: {
      getActive: () => ({
        getSheetByName: (n) =>
          sheets[n] ? { getDataRange: () => ({ getValues: () => sheets[n] }) } : null,
      }),
      getUi: () => ({
        alert: () => {},
        createMenu: () => ui.menu,
      }),
    },
    PropertiesService: {
      getScriptProperties: () => ({ getProperty: () => "ghp_fake_token_for_tests" }),
    },
    Session: { getActiveUser: () => ({ getEmail: () => "tester@example.com" }) },
    Utilities: { base64Encode: (s) => Buffer.from(s).toString("base64"), Charset: { UTF_8: "utf8" } },
    // checkAssets_ lists the two asset dirs; serve the repo's real filenames.
    UrlFetchApp: {
      fetch: (url) => {
        const dir = /photos%2Fprofiles|photos\/profiles/.test(url)
          ? "assets/photos/profiles"
          : "assets/logos";
        const body = files
          ? JSON.stringify(repoFiles(dir).map((name) => ({ name })))
          : JSON.stringify([]);
        return {
          getResponseCode: () => 200,
          getContentText: () => body,
        };
      },
    },
  };
}

function run(sheets, opts) {
  const ctx = createContext(makeSandbox(sheets, opts));
  runInContext(GS, ctx, { filename: "Publish.gs" });
  // Objects built inside the vm carry that realm's prototypes, so assert's deep
  // comparisons reject them even when identical. Normalise through JSON.
  return JSON.parse(JSON.stringify(runInContext("buildAndValidate_()", ctx)));
}

const baseline = () => Object.fromEntries(TABS.map((t) => [t, tabValues(t)]));

let failures = 0;
const check = (name, fn) => {
  try {
    fn();
    console.log(`  ok   ${name}`);
  } catch (e) {
    failures++;
    console.error(`  FAIL ${name}\n       ${e.message.split("\n")[0]}`);
  }
};

console.log("\nrunning the real Publish.gs against the seed sheet\n");

// ── The one that matters: the shipped script reproduces committed content.json ──
const committed = JSON.parse(readFileSync(join(ROOT, "lib/content.json"), "utf8"));
const result = run(baseline());

check("no validation errors on the seed sheet", () => {
  assert.deepEqual(result.errors, [], `errors: ${JSON.stringify(result.errors)}`);
});

check("output is byte-identical to lib/content.json", () => {
  assert.equal(
    JSON.stringify(result.content, null, 2) + "\n",
    JSON.stringify(committed, null, 2) + "\n",
  );
});

// ── Setup.gs must seed a sheet that Publish.gs reads back identically ──
check("Setup.gs SEED matches the seed TSVs tab for tab", () => {
  const seed = setupSeed();
  const base = baseline();
  assert.deepEqual(Object.keys(seed).sort(), Object.keys(base).sort());
  for (const t of TABS) assert.deepEqual(seed[t], base[t], `tab ${t} differs`);
});

check("a sheet built by Setup.gs publishes exactly lib/content.json", () => {
  const r = run(setupSeed());
  assert.deepEqual(r.errors, [], JSON.stringify(r.errors));
  assert.equal(
    JSON.stringify(r.content, null, 2) + "\n",
    JSON.stringify(committed, null, 2) + "\n",
  );
});

// ── Negative cases: the failures a real editor will actually cause ──
const withEdit = (tab, fn) => {
  const s = baseline();
  s[tab] = s[tab].map((r) => r.slice());
  fn(s[tab]);
  return run(s);
};
const saysAbout = (errors, needle) =>
  errors.some((e) => e.toLowerCase().includes(needle.toLowerCase()));

check("blank name in team is rejected", () => {
  const r = withEdit("team", (rows) => { rows[1][1] = ""; });
  assert.ok(saysAbout(r.errors, "name"), JSON.stringify(r.errors));
});

check("bad section spelling is rejected", () => {
  const r = withEdit("team", (rows) => { rows[1][0] = "Director"; });
  assert.ok(r.errors.length > 0, "expected an error for section 'Director'");
});

check("non-LinkedIn url is rejected", () => {
  const r = withEdit("team", (rows) => { rows[1][4] = "https://example.com/nope"; });
  assert.ok(saysAbout(r.errors, "linkedin"), JSON.stringify(r.errors));
});

check("photo slug with no file on GitHub is rejected", () => {
  const r = withEdit("team", (rows) => { rows[1][3] = "nobody-has-this-photo"; });
  assert.ok(saysAbout(r.errors, "photo") || saysAbout(r.errors, "nobody-has-this-photo"),
    JSON.stringify(r.errors));
});

check("blank photo is allowed (renders the silhouette)", () => {
  const r = withEdit("team", (rows) => { rows[1][3] = ""; });
  assert.deepEqual(r.errors, [], JSON.stringify(r.errors));
});

check("applications_open must be a boolean", () => {
  const r = withEdit("settings", (rows) => {
    const i = rows.findIndex((x) => x[0] === "applications_open");
    rows[i] = [rows[i][0], "maybe"];
  });
  assert.ok(saysAbout(r.errors, "applications_open"), JSON.stringify(r.errors));
});

check("non-https form url is rejected", () => {
  const r = withEdit("settings", (rows) => {
    const i = rows.findIndex((x) => x[0] === "application_form_url");
    rows[i] = [rows[i][0], "http://insecure.example.com"];
  });
  assert.ok(saysAbout(r.errors, "https"), JSON.stringify(r.errors));
});

check("a missing tab is reported, not crashed on", () => {
  const s = baseline();
  delete s.clients;
  const r = run(s);
  assert.ok(saysAbout(r.errors, "clients"), JSON.stringify(r.errors));
});

check("blank rows in the middle of a tab are skipped", () => {
  const s = baseline();
  s.team = s.team.slice();
  s.team.splice(3, 0, new Array(s.team[0].length).fill(""));
  const r = run(s);
  assert.deepEqual(r.errors, [], JSON.stringify(r.errors));
  const total =
    r.content.team.executive.length + r.content.team.directors.length + r.content.team.associates.length;
  assert.equal(total, 23, `expected 23 members, got ${total}`);
});

check("comma lists split, and stray whitespace is trimmed", () => {
  const r = withEdit("clients", (rows) => { rows[1][2] = "  Business Strategy ,  Tech Implementation  "; });
  assert.deepEqual(r.errors, [], JSON.stringify(r.errors));
  assert.deepEqual(r.content.clients[0].services, ["Business Strategy", "Tech Implementation"]);
});

console.log(
  failures === 0
    ? "\nPublish.gs behaves correctly on the seed sheet and rejects 8 real mistakes\n"
    : `\n${failures} check(s) failed\n`,
);
process.exit(failures === 0 ? 0 : 1);
