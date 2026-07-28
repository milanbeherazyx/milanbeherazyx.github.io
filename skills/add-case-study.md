# Skill: add-case-study

Add a brand-new case study. To edit an existing one, use `update-case-study.md`.

## Where

Create `src/content/work/<new-slug>.md`. The filename (minus `.md`) becomes
the URL: `/work/<new-slug>/`. Use kebab-case, no spaces.

**Do not copy an existing real case study as your starting point** — copy
`src/content/work/_example.md` instead (filenames starting with `_` are
excluded from the build, so it can never accidentally publish itself).

## Frontmatter schema (from `src/content.config.ts`)

```yaml
---
title: string, max 120 chars
summary: string, max 300 chars
tags: array, 1+ items, each one of: SQL | Funnel | Policy | Dashboard | Risk | Tooling
featured: boolean, default false
order: integer                     # position on /work/ index, ascending — check
                                    # existing files' `order` values and pick an
                                    # unused one (currently 1–6 are taken)
draft: boolean, default false
metrics: array, optional, max 3 items — each { value: string, label: string }
whereElseThisApplies: string, max 300 chars
tools: array, 1+ items, each a plain string
---
```

## Steps

1. `cp src/content/work/_example.md src/content/work/<new-slug>.md`
2. Fill in the frontmatter. Every fact, number, and claim must come from
   `content-pack/content_pack.md` — if something isn't in the pack, it does
   not go in the case study. If the pack is missing locally, see
   `content-pack/README.md` to restore it first.
3. Write the body in this section order:
   ```markdown
   ## Context
   ## Problem
   ## Approach
   ## What I built
   ## Outcome
   ## Tools
   ```
4. Check the pack's publish-safety legend (✅/⚠️/⛔) on every fact used. ⛔
   items never appear here, in any form — including rounded or paraphrased.
5. Check `AGENTS.md` → "Hard content rules" for the authorized lender list
   before naming any partner.
6. Set `draft: true` while writing a case study that isn't ready. This is
   stronger than "hidden" — `src/pages/work/[slug].astro` excludes draft
   entries from `getStaticPaths`, so **no page is generated at all**; the URL
   404s, not just goes unlisted. `npm run build` still succeeds (draft
   entries are valid, just excluded). Flip to `false` when ready to publish —
   only then does the page exist and appear on `/work/` and (if `featured`)
   the homepage.

## Validation

1. `npm run build` — Zod schema errors point at the exact file and field.
2. Confirm the new slug appears at `/work/<new-slug>/` and, if `draft: false`,
   on the `/work/` index.
3. If `featured: true`, confirm it doesn't push the featured count on the
   homepage above 3 (only the top 3 by `order` show there).

## Common failure modes

- **Forgetting to remove the example's placeholder body text** — the build
  won't catch this; check the rendered page by eye.
- **`order` collision** with an existing case study — both build, but index
  ordering becomes ambiguous. Pick a distinct integer.
- **Inventing a metric** not present in the content pack — this is the single
  most important rule in the whole project (PRD §11 binding). When in doubt,
  leave it out and flag it for a human.
