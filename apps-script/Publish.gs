/**
 * Avenues Content — publishes this spreadsheet to the website.
 *
 * HOW IT WORKS
 *   "Avenues ▸ Publish to site" reads every tab, validates it, and commits
 *   lib/content.json to GitHub. That push triggers the existing deploy
 *   workflow, and the site is live about two minutes later.
 *
 *   Nothing is published unless every check passes, so a bad row stops the
 *   publish instead of quietly breaking a page. Every publish is a normal git
 *   commit, so anything can be undone by a developer.
 *
 * SETUP (once)
 *   1. Extensions ▸ Apps Script, paste this file in, save.
 *   2. Project Settings ▸ Script properties ▸ Add:
 *        GITHUB_TOKEN = a fine-grained GitHub token with
 *                       "Contents: Read and write" on THIS REPO ONLY.
 *   3. Reload the spreadsheet. An "Avenues" menu appears.
 *
 * The token is the only credential. If publishing ever stops working, it has
 * almost certainly expired — issue a new one and update that property.
 */

var REPO_OWNER = 'uscavenues';
var REPO_NAME = 'uscavenues.github.io';
var BRANCH = 'main';
var CONTENT_PATH = 'lib/content.json';

var PROFILE_DIR = 'public/assets/photos/profiles';
var LOGO_DIR = 'public/assets/logos';

var SECTIONS = ['executive', 'directors', 'associates'];

// ─── Menu ────────────────────────────────────────────────────────────────────

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Avenues')
    .addItem('Publish to site', 'publishToSite')
    .addItem('Check for problems (no publish)', 'checkOnly')
    .addToUi();
}

function checkOnly() {
  var result = buildAndValidate_();
  if (result.errors.length) return showErrors_(result.errors);
  SpreadsheetApp.getUi().alert(
    'Looks good',
    summarise_(result.content) + '\n\nNothing was published — use "Publish to site" when ready.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function publishToSite() {
  var ui = SpreadsheetApp.getUi();

  if (!token_()) {
    return ui.alert(
      'Not set up yet',
      'No GITHUB_TOKEN found.\n\nExtensions ▸ Apps Script ▸ Project Settings ▸ ' +
        'Script properties, and add GITHUB_TOKEN.',
      ui.ButtonSet.OK
    );
  }

  var result = buildAndValidate_();
  if (result.errors.length) return showErrors_(result.errors);

  var confirm = ui.alert(
    'Publish to the website?',
    summarise_(result.content) + '\n\nThe site updates about 2 minutes after you confirm.',
    ui.ButtonSet.OK_CANCEL
  );
  if (confirm !== ui.Button.OK) return;

  try {
    var sha = commitContent_(result.content);
    ui.alert(
      'Published',
      'Committed as ' + sha.substring(0, 7) + '.\n\n' +
        'The site rebuilds automatically — give it about 2 minutes, then refresh.',
      ui.ButtonSet.OK
    );
  } catch (e) {
    ui.alert('Publish failed', String(e.message || e), ui.ButtonSet.OK);
  }
}

// ─── Reading the sheet ───────────────────────────────────────────────────────

/** Reads a tab into objects keyed by its header row. Blank rows are skipped. */
function readTab_(name, errors) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(name);
  if (!sheet) {
    errors.push('There is no tab called "' + name + '".');
    return [];
  }
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  var headers = values[0].map(function (h) {
    return String(h).trim().toLowerCase();
  });

  var rows = [];
  for (var r = 1; r < values.length; r++) {
    var raw = values[r];
    var blank = raw.every(function (c) {
      return String(c).trim() === '';
    });
    if (blank) continue;

    var obj = { _row: r + 1, _tab: name };
    for (var c = 0; c < headers.length; c++) {
      if (headers[c]) obj[headers[c]] = raw[c];
    }
    rows.push(obj);
  }
  return rows;
}

function str_(v) {
  return v === null || v === undefined ? '' : String(v).trim();
}

/** "Business Strategy, Tech Implementation" -> ["Business Strategy", "Tech Implementation"] */
function list_(v) {
  return str_(v)
    .split(',')
    .map(function (s) {
      return s.trim();
    })
    .filter(function (s) {
      return s !== '';
    });
}

function bool_(v) {
  if (typeof v === 'boolean') return v;
  var s = str_(v).toLowerCase();
  if (s === 'true' || s === 'yes') return true;
  if (s === 'false' || s === 'no') return false;
  return null; // caller reports it
}

function where_(row, label) {
  return row._tab + ' row ' + row._row + (label ? ' (' + label + ')' : '');
}

// ─── Build + validate ────────────────────────────────────────────────────────

function buildAndValidate_() {
  var errors = [];

  // settings is a key/value tab
  var settingsRows = readTab_('settings', errors);
  var kv = {};
  settingsRows.forEach(function (r) {
    if (str_(r.key)) kv[str_(r.key).toLowerCase()] = r.value;
  });

  var open = bool_(kv.applications_open);
  if (open === null) {
    errors.push('settings: applications_open must be TRUE or FALSE (got "' + str_(kv.applications_open) + '").');
  }
  var formUrl = str_(kv.application_form_url);
  if (!/^https:\/\//.test(formUrl)) {
    errors.push('settings: application_form_url must start with https://');
  }
  var season = str_(kv.application_season);
  if (!season) errors.push('settings: application_season is empty (for example "Fall 2026").');
  var password = str_(kv.members_password);
  if (!password) errors.push('settings: members_password is empty.');

  // team
  var team = { executive: [], directors: [], associates: [] };
  readTab_('team', errors).forEach(function (r) {
    var name = str_(r.name);
    var section = str_(r.section).toLowerCase();
    var w = where_(r, name);

    if (SECTIONS.indexOf(section) === -1) {
      errors.push(w + ': section must be one of executive, directors, associates (got "' + str_(r.section) + '").');
      return;
    }
    if (!name) errors.push(w + ': name is empty.');
    if (!str_(r.role)) errors.push(w + ': role is empty.');

    var linkedin = str_(r.linkedin);
    if (!/^https:\/\/(www\.)?linkedin\.com\/in\//.test(linkedin)) {
      errors.push(w + ': linkedin must be a https://www.linkedin.com/in/... link.');
    }

    var photo = str_(r.photo).toLowerCase();
    if (photo && /[^a-z0-9-]/.test(photo)) {
      errors.push(w + ': photo "' + photo + '" must be lowercase letters, numbers and dashes, with no ".jpg" on the end.');
      photo = '';
    }

    team[section].push({ name: name, role: str_(r.role), photo: photo, linkedin: linkedin, _w: w });
  });

  if (!team.executive.length && !team.directors.length && !team.associates.length) {
    errors.push('team: there are no members at all — refusing to publish an empty roster.');
  }

  // logo-bearing tabs
  function logoRows(tab, nameKey, listKey) {
    return readTab_(tab, errors).map(function (r) {
      var name = str_(r[nameKey]);
      var w = where_(r, name);
      if (!name) errors.push(w + ': ' + nameKey + ' is empty.');

      var logo = str_(r.logo);
      if (!logo) errors.push(w + ': logo is empty.');
      else if (!/\.[a-z0-9]+$/i.test(logo)) {
        errors.push(w + ': logo "' + logo + '" needs a file extension, for example acme.png');
      }

      var out = { logo: logo, _w: w };
      out[nameKey] = name;
      if (listKey) {
        var items = list_(r[listKey]);
        if (!items.length) errors.push(w + ': ' + listKey + ' is empty (comma-separate multiple values).');
        out[listKey] = items;
      }
      return out;
    });
  }

  var mentors = logoRows('mentors', 'name', null);
  var alumni = logoRows('alumni', 'company', 'positions');
  var clients = logoRows('clients', 'name', 'services');

  var majors = readTab_('majors', errors)
    .map(function (r) {
      var m = str_(r.major);
      if (!m) errors.push(where_(r, '') + ': major is empty.');
      return m;
    })
    .filter(Boolean);
  if (!majors.length) errors.push('majors: the tab is empty.');

  var faq = readTab_('faq', errors).map(function (r) {
    var q = str_(r.question);
    var a = str_(r.answer);
    var w = where_(r, q);
    if (!q) errors.push(w + ': question is empty.');
    if (!a) errors.push(w + ': answer is empty.');
    return { q: q, a: a };
  });

  // Files live in the repo, not the sheet — only check if everything else is
  // sound, so one network round trip is not wasted on an already-failed run.
  if (!errors.length) {
    checkAssets_(team, [].concat(mentors, alumni, clients), errors);
  }

  function strip(rows) {
    return rows.map(function (r) {
      var o = {};
      for (var k in r) if (k.charAt(0) !== '_') o[k] = r[k];
      return o;
    });
  }

  return {
    errors: errors,
    content: {
      settings: {
        applications_open: open === null ? false : open,
        application_form_url: formUrl,
        application_season: season,
        members_password: password,
      },
      team: {
        executive: strip(team.executive),
        directors: strip(team.directors),
        associates: strip(team.associates),
      },
      mentors: strip(mentors),
      alumni: strip(alumni),
      clients: strip(clients),
      majors: majors,
      faq: faq,
    },
  };
}

/** A photo slug or logo filename that names a file nobody has uploaded yet. */
function checkAssets_(team, logoRows, errors) {
  var profiles, logos;
  try {
    profiles = listDir_(PROFILE_DIR);
    logos = listDir_(LOGO_DIR);
  } catch (e) {
    errors.push('Could not check photo and logo files on GitHub: ' + (e.message || e));
    return;
  }

  // The site serves .jpg/.png as .webp, so either spelling counts as present.
  function present(files, filename) {
    if (files.indexOf(filename) !== -1) return true;
    var webp = filename.replace(/\.(jpe?g|png)$/i, '.webp');
    return webp !== filename && files.indexOf(webp) !== -1;
  }

  SECTIONS.forEach(function (section) {
    team[section].forEach(function (p) {
      if (p.photo && !present(profiles, p.photo + '.jpg')) {
        errors.push(
          p._w + ': there is no photo file for "' + p.photo + '" yet. ' +
            'Leave the photo cell blank until a developer uploads it — the site shows a placeholder in the meantime.'
        );
      }
    });
  });

  logoRows.forEach(function (r) {
    if (r.logo && /\.[a-z0-9]+$/i.test(r.logo) && !present(logos, r.logo)) {
      errors.push(r._w + ': there is no logo file called "' + r.logo + '" in the site\'s logo folder.');
    }
  });
}

// ─── GitHub ──────────────────────────────────────────────────────────────────

function token_() {
  return PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');
}

function api_(method, path, payload) {
  var res = UrlFetchApp.fetch('https://api.github.com/repos/' + REPO_OWNER + '/' + REPO_NAME + path, {
    method: method,
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token_(), Accept: 'application/vnd.github+json' },
    payload: payload ? JSON.stringify(payload) : undefined,
    muteHttpExceptions: true,
  });
  var code = res.getResponseCode();
  var body = res.getContentText();

  if (code === 401 || code === 403) {
    throw new Error('GitHub rejected the token. It may have expired or lost access to the repository.');
  }
  return { code: code, body: body, json: code < 300 || code === 409 || code === 404 ? tryParse_(body) : null };
}

function tryParse_(s) {
  try {
    return JSON.parse(s);
  } catch (e) {
    return null;
  }
}

function listDir_(path) {
  var r = api_('get', '/contents/' + path + '?ref=' + BRANCH);
  if (r.code === 404) return [];
  if (r.code >= 300) throw new Error('GitHub returned ' + r.code + ' listing ' + path);
  return (r.json || []).map(function (f) {
    return f.name;
  });
}

/**
 * Writes content.json. If a developer pushed between our read and our write,
 * GitHub rejects the stale SHA — re-read and try once more. Roster edits and
 * code changes never touch the same file, so the retry is safe.
 */
function commitContent_(content) {
  var body = JSON.stringify(content, null, 2) + '\n';
  var encoded = Utilities.base64Encode(body, Utilities.Charset.UTF_8);
  var editor = Session.getActiveUser().getEmail() || 'the Avenues Content sheet';

  for (var attempt = 0; attempt < 2; attempt++) {
    var head = api_('get', '/contents/' + CONTENT_PATH + '?ref=' + BRANCH);
    var sha = head.code === 200 && head.json ? head.json.sha : null;

    var res = api_('put', '/contents/' + CONTENT_PATH, {
      message: 'Content update from the Avenues sheet\n\nPublished by ' + editor + '.',
      content: encoded,
      branch: BRANCH,
      sha: sha || undefined,
    });

    if (res.code < 300) return res.json.commit.sha;
    if (res.code !== 409) {
      throw new Error('GitHub returned ' + res.code + '. ' + firstLine_(res.body));
    }
    // 409 → someone else committed first; loop re-reads the new SHA.
  }
  throw new Error('Someone else was publishing at the same time. Please try again in a moment.');
}

function firstLine_(body) {
  var j = tryParse_(body);
  return j && j.message ? j.message : String(body).substring(0, 200);
}

// ─── Dialogs ─────────────────────────────────────────────────────────────────

function summarise_(c) {
  var members = c.team.executive.length + c.team.directors.length + c.team.associates.length;
  return (
    members + ' members · ' + c.mentors.length + ' mentors · ' + c.alumni.length + ' alumni placements · ' +
    c.clients.length + ' clients · ' + c.majors.length + ' majors · ' + c.faq.length + ' FAQ\n' +
    'Applications: ' + (c.settings.applications_open ? 'OPEN for ' + c.settings.application_season : 'CLOSED')
  );
}

function showErrors_(errors) {
  var shown = errors.slice(0, 12);
  var msg = 'Nothing was published — the site is unchanged.\n\n' + shown.join('\n\n');
  if (errors.length > shown.length) {
    msg += '\n\n…and ' + (errors.length - shown.length) + ' more.';
  }
  SpreadsheetApp.getUi().alert(
    errors.length === 1 ? 'Found 1 problem' : 'Found ' + errors.length + ' problems',
    msg,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}
