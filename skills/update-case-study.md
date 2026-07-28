# Skill: update-case-study

Edit an existing case study. To add a brand-new one, use `add-case-study.md` instead.

## Where

`src/content/work/<slug>.md` — one file per case study. Current slugs:
`lifting-qualification-30-to-43`, `policy-as-code`, `policylens`,
`cohort-vintage-delinquency`, `killing-manual-vendor-reviews`,
`oven-vibe-sku-margin`.

## Frontmatter schema (from `src/content.config.ts`)

```yaml
---
title: string, max 120 chars
summary: string, max 300 chars
tags: array, 1+ items, each one of: SQL | Funnel | Policy | Dashboard | Risk | Tooling
featured: boolean, default false   # true = eligible for the 3 homepage cards
order: integer                     # position on /work/ index, ascending
draft: boolean, default false      # true = excluded from the build entirely
metrics: array, optional, max 3 items — each { value: string, label: string }
whereElseThisApplies: string, max 300 chars
tools: array, 1+ items, each a plain string
---
```

## Filled example (from `killing-manual-vendor-reviews.md`)

```yaml
---
title: 'Removing 80% of manual vendor risk reviews with an ETL pipeline'
summary: 'Third-party vendor risk assessment was a recurring manual compliance workload. A Python pipeline against the vendor-risk API turned it into monitored data — with the exceptions, not the whole portfolio, reaching a human.'
tags: ['SQL', 'Tooling', 'Dashboard']
featured: false
order: 5
draft: false
metrics:
  - value: '80%'
    label: 'of manual reviews eliminated'
  - value: '+15%'
    label: 'audit scores'
whereElseThisApplies: 'Any recurring manual review fed by third-party data: supplier and counterparty due diligence, KYB refresh cycles, certification and licence expiry tracking, SLA monitoring.'
tools: ['Python', 'REST API', 'SQL Server', 'Tableau']
---
```

## Body

Markdown below the frontmatter, in this section order (PRD §3.2 requires it
and every existing case study follows it — keep new edits consistent):

```markdown
## Context
## Problem
## Approach
## What I built
## Outcome
## Tools
```

`whereElseThisApplies` and the tools chips are rendered automatically by the
page template from frontmatter — do not duplicate them as a body section.

## Validation

1. `npm run build` — a bad `tags` value, a missing required field, or a
   `summary`/`title` over the character limit fails the build with a Zod
   error naming the exact file and field.
2. Open `/work/<slug>/` locally (`npm run dev`) and confirm the page renders
   with the new metrics/summary.

## Common failure modes

- **Invalid tag** — `tags` only accepts the six values listed above (exact
  case). A typo like `'sql'` or `'Funnels'` fails the build.
- **`metrics` with more than 3 items** — schema caps it at 3; trim to the
  three that matter most.
- **Two files sharing the same `order`** — builds fine, but sort order on
  `/work/` becomes unpredictable. Give each file a distinct integer.
- **Forgetting `featured: true`** does not error — it just means the case
  study won't be eligible for a homepage card. Only 3 featured entries show
  on the homepage, sorted by `order`.
- **Numbers not in `content-pack/content_pack.md`** — every fact must trace
  back to the pack. Do not invent or round differently than the pack states.
