# Avenues Content sheet — setup

One-time setup, about 15 minutes. After this, eboard edits the spreadsheet and
hits **Avenues ▸ Publish to site**; the website updates ~2 minutes later with no
developer involved.

Only three things need a human: create an empty Sheet, create a GitHub token,
and paste that token into the script. The script builds the tabs and fills them.

---

## 1. Create the spreadsheet

Create an empty Google Sheet named **Avenues Content**, owned by an account that
will outlive whoever sets it up (a shared org account beats a personal one — the
handover problem is real).

That is all you do by hand. The script builds the tabs.

## 2. Install the script

1. **Extensions ▸ Apps Script**.
2. Delete the placeholder `myFunction`, paste all of `apps-script/Publish.gs`.
3. **+ ▸ Script** to add a second file, paste all of `apps-script/Setup.gs`.
4. Save (disk icon), then reload the spreadsheet.

## 3. Build the tabs

**Avenues ▸ Set up sheet (first time)**. Google asks for authorisation the first
time — it is your own script, so approve it.

This creates all seven tabs (`settings`, `team`, `mentors`, `alumni`, `clients`,
`majors`, `faq`), fills them with exactly what is on the site today, freezes and
styles the header rows, and adds the dropdowns that stop the two mistakes worth
stopping: a misspelled `section` (which silently drops someone off the site) and
an `applications_open` that is not TRUE/FALSE.

Row 1 of each tab is the header row — the script reads columns by these names,
so **do not rename or reorder them**. Re-running the setup replaces the tab
contents, so it asks before overwriting.

Optional, worth five minutes: select row 1 on each tab ▸ right-click ▸ *Protect
range* ▸ restrict to yourself, so a header cannot be edited by accident.

## 4. Create a GitHub token

1. GitHub ▸ *Settings* ▸ *Developer settings* ▸
   **Fine-grained personal access tokens** ▸ *Generate new token*.
2. **Repository access:** *Only select repositories* → `uscavenues/uscavenues.github.io`.
3. **Permissions:** *Repository permissions* ▸ **Contents: Read and write**.
   Nothing else.
4. Set an expiry you will actually remember. When it expires, publishing stops
   with a clear error and you issue a new one.
5. Copy the token — GitHub shows it once.

> Scope it to this one repo. A classic token with org-wide access would let a
> spreadsheet write to everything the org owns.

## 5. Give the script the token

In the Apps Script editor: **Project Settings** (gear) ▸ *Script properties* ▸
*Add script property*:

| Property | Value |
| --- | --- |
| `GITHUB_TOKEN` | the token you just copied |

Save.

## 6. First run

1. Reload the spreadsheet. An **Avenues** menu appears next to Help.
2. **Avenues ▸ Check for problems**. Google asks for authorisation the first
   time — it is your own script, so approve it.
3. You should see a summary: 23 members, 7 mentors, 12 alumni, 10 clients.
4. **Avenues ▸ Publish to site**, confirm.
5. Watch the *Actions* tab on GitHub. Green tick ≈ 2 minutes.

Because the sheet is a mirror of the live site, this first publish should change
nothing visible. That is the point — it proves the pipeline before anyone edits.

---

## Day-to-day

| To do this | Change this |
| --- | --- |
| Add or remove a member | a row in `team` (drag rows to reorder — the site follows sheet order) |
| Open/close applications | the `applications_open` tick box in `settings` |
| Change the application link | `application_form_url` in `settings` |
| Change "Fall 2026" on the apply page | `application_season` in `settings` |
| Rotate the members-page password | `members_password` in `settings` |
| Update clients, alumni, mentors, majors, FAQ | the matching tab |

Multiple values in one cell are **comma-separated** (`services`, `positions`).

## Photos are still a developer job

The `photo` column holds a slug — `armani`, not `armani.jpg`. A developer adds
the image file to the repo first.

**Leave the cell blank until the photo exists.** Blank is a valid state and
renders a neutral silhouette. A slug with no matching file is treated as a
mistake and the publish is refused, because the alternative is someone's face
silently missing from the site.

## When something goes wrong

- **"Found N problems"** — nothing was published, the site is untouched. Fix the
  named rows and publish again.
- **"GitHub rejected the token"** — it expired or lost access. Redo steps 5–6.
- **"Someone else was publishing at the same time"** — wait a moment, publish again.
- **Published but the site looks wrong** — every publish is a git commit. A
  developer can revert it in about a minute; nothing is lost.
