# Skill: update-services

Edit or add a service offer on `/services/`.

## Where

`src/content/services/<slug>.md` — one file per offer. Current files:
`funnel-diagnostics.md`, `metrics-dashboards-qa.md`,
`rules-policy-analytics.md`, `root-cause-analysis.md`.

## Frontmatter schema (from `src/content.config.ts`)

```yaml
---
title: string, max 80 chars
summary: string, max 300 chars
order: integer      # display order on /services/, ascending
draft: boolean, default false
---
```

## Filled example (from `root-cause-analysis.md`)

```yaml
---
title: 'Root-cause analysis on metric movements'
summary: 'A number moved and nobody can say why. RCA that ends in a quantified cause — including when the honest answer is "this change did almost nothing".'
order: 4
draft: false
---

Body paragraphs here — the full offer description, ending with a
**Worked example — lending.** paragraph per PRD §3.3 (every offer must be
framed domain-agnostic with a lending worked example inside).
```

## Steps to edit an existing offer

1. Open the file, edit `summary` and/or the body prose.
2. Keep the structure: a domain-agnostic description, then a bolded
   `**Worked example — lending.**` paragraph with a real, pack-sourced
   example — this is a PRD §3.3 binding requirement, not optional styling.

## Steps to add a new offer

1. `cp src/content/services/_example.md src/content/services/<new-slug>.md`
2. PRD §3.3 specifies 3–4 offers total — check you're not exceeding 4 before
   adding a new one; if you are, this needs Milan's sign-off, not just an edit.
3. Set `order` to an unused integer (1–4 currently taken).

## Validation

1. `npm run build` — Zod errors point at the exact file and field.
2. Open `/services/` locally and confirm the offer renders in the right
   position with full body text (not just the summary — the page renders
   each offer's full markdown body, not a preview).

## Common failure modes

- **Missing the lending worked example** — PRD §3.3 requires every offer to
  connect its domain-agnostic pitch to a concrete lending example. A generic
  offer with no worked example reads exactly like the "I can analyze
  anything" framing the PRD explicitly forbids (§2).
- **`summary` over 300 chars** — fails the build; trim it.
- **More than 4 offers live at once** (`draft: false`) — not a build error,
  but exceeds the PRD's spec; check with Milan before publishing a 5th.
