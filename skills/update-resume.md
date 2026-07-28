# Skill: update-resume

Add or edit a role on the `/resume/` timeline.

## Where

`src/content/experience/<slug>.md` — one file per role. Current files (in
timeline order, most recent first): `khatabook.md`, `oven-vibe.md`,
`quinte.md`, `omdena.md`, `upwork.md`, `physicswallah.md`, `chaitanya.md`.

## Frontmatter schema (from `src/content.config.ts`)

```yaml
---
company: string
role: string
location: string, optional
start: string            # display text, e.g. "Mar 2026" — NOT a real date type
end: string, default 'Present'
kind: one of: work | venture | fellowship | freelance   — default 'work'
order: integer            # ascending = most recent first
draft: boolean, default false
---
```

## Filled example (from `khatabook.md`)

```yaml
---
company: 'Khatabook'
role: 'Business Analyst, BRE'
location: 'Bengaluru, India'
start: 'Mar 2026'
end: 'Present'
kind: 'work'
order: 1
draft: false
---

- Bullet point one.
- Bullet point two.
```

The body is a plain bullet list — one bullet per achievement/responsibility.

## Steps to edit an existing role

1. Open the file for that company.
2. Edit frontmatter fields or bullet text. Every fact/number must trace back
   to `content-pack/content_pack.md` §4 ("Experience").

## Steps to add a new role

1. `cp src/content/experience/_example.md src/content/experience/<new-slug>.md`
2. Fill in frontmatter. Set `order` lower than the current most-recent role
   if this role is newer (order 1 = top of the timeline), or shift existing
   `order` values if inserting in the middle.
3. Write bullets in the body.

## Validation

1. `npm run build` — Zod errors point at the exact file and field. An
   invalid `kind` value (anything other than the four listed) fails loudly.
2. Open `/resume/` locally and confirm the role appears in the right
   position in the timeline.

## Common failure modes

- **`start`/`end` as real dates** — these are display strings on purpose
  (`"Mar 2026"`, not `2026-03-01`), because the timeline shows text, not a
  computed duration. Don't reformat them to ISO dates.
- **`order` ties** — two roles with the same `order` both build, but their
  relative position becomes unpredictable. Keep every `order` distinct.
- **Company/role names that don't match `content-pack/content_pack.md` §4**
  — this is the single source of truth for job titles, dates, and companies.
  If your edit doesn't match the pack, fix the pack first (with Milan's
  sign-off) or don't make the edit.
- **Six authorized lender names** — if a bullet mentions lending partners,
  only Cashtree, Caprion, Lendbox, Jupiter, Slice, and Western Cap may be
  named (see `AGENTS.md` → Hard content rules).
