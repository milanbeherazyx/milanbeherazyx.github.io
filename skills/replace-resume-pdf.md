# Skill: replace-resume-pdf

Replace the downloadable resume PDF. This is a binary file swap, not a
content-collection edit — there is no frontmatter or schema involved.

## Where

`public/resume.pdf` — served as-is at `https://milanbeherazyx.github.io/resume.pdf`.
Linked from the footer, the About page, and `/resume/` via
`SITE.resumePdf` in `src/site.config.ts` (currently `'/resume.pdf'` — leave
this value alone; only the file contents change).

## Steps

1. Get the new PDF from Milan. **Do not generate or edit the PDF yourself** —
   this skill only covers dropping in a file Milan has already approved.
2. Replace the file directly:
   ```sh
   cp /path/to/new-resume.pdf public/resume.pdf
   ```
3. Do not rename the file — every reference in the codebase points at the
   literal path `/resume.pdf`.

## Validation

1. `npm run build` — a static asset swap in `public/` cannot fail the Zod
   schema build; the only thing to check is that the file exists and is a
   valid PDF.
2. `file public/resume.pdf` — should report `PDF document`, not something
   else (catches an accidental wrong-file copy).
3. Open `http://localhost:4321/resume.pdf` in `npm run preview` and confirm
   it opens and shows the expected content.

## Common failure modes

- **Wrong filename** — if the replacement isn't named exactly `resume.pdf`
  in `public/`, every download link on the site 404s. There is no build-time
  check for this; verify by opening the URL.
- **Sanitization** — the resume PDF is the one place Milan's phone number is
  approved to appear (content-pack/content_pack.md §1: "⛔ never on the
  website... resume PDF only, Milan's call"). That approval is specific to
  the PDF file — it does not extend to any other page or asset. Don't reuse
  resume content elsewhere without checking the pack's publish-safety flags
  again.
- **Stale cached download** — GitHub Pages may serve a cached copy briefly
  after deploy; if the download looks unchanged right after a push, wait a
  minute and hard-refresh before concluding the swap failed.
