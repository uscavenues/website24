# Avenues Content sheet — setup

One-time setup, about 15 minutes. After this, eboard edits the spreadsheet and
hits **Avenues ▸ Publish to site**; the website updates ~2 minutes later with no
developer involved.

Three things only a human can do: create the Sheet, create the GitHub token, and
paste the token into the script. Everything else is already in the repo.

---

## 1. Create the spreadsheet

Create a Google Sheet named **Avenues Content**, owned by an account that will
outlive whoever sets it up (a shared org account beats a personal one — the
handover problem is real).

Create these seven tabs, named exactly, all lowercase:

`settings` · `team` · `mentors` · `alumni` · `clients` · `majors` · `faq`

Delete the default "Sheet1".

## 2. Paste the starting data

Each file in `apps-script/seed/` matches one tab. For each:

1. Open the tab, click cell **A1**.
2. Paste the whole contents of the matching `.tsv` file.

Google Sheets splits tab-separated text into columns automatically. Row 1 is the
header row — the script reads columns by these names, so **do not rename or
reorder them**.

This seed data is generated from the live site, so once pasted the sheet is an
exact mirror of what's currently published.

## 3. Make the sheet hard to break

Worth the five minutes — these prevent the mistakes that would otherwise reach
the site.

- **Protect every header row.** Select row 1 on each tab ▸ right-click ▸
  *Protect range* ▸ restrict to yourself.
- **`team` ▸ `section` dropdown.** Select column A (below the header) ▸ *Data* ▸
  *Data validation* ▸ Dropdown ▸ `executive`, `directors`, `associates` ▸
  *Reject the input*. A typo here silently drops someone off the site.
- **`settings` ▸ `applications_open`.** Set its value cell to a checkbox
  (*Insert ▸ Tick box*), so nobody types "yes".

## 4. Install the script

1. **Extensions ▸ Apps Script**.
2. Delete the placeholder `myFunction`, paste all of `apps-script/Publish.gs`.
3. Save (disk icon).

## 5. Create a GitHub token

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

## 6. Give the script the token

In the Apps Script editor: **Project Settings** (gear) ▸ *Script properties* ▸
*Add script property*:

| Property | Value |
| --- | --- |
| `GITHUB_TOKEN` | the token you just copied |

Save.

## 7. First run

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
