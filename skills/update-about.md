# Skill: update-about

The About page has three editable parts, two of them plain content-collection
markdown and one an explicit, narrow exception to the "never edit pages"
rule. Read the section below matching what you want to change.

## Part 1 — LinkedIn recommendations (safest, prefer this when possible)

**Where:** `src/content/recommendations/<slug>.md` — one file per quote.
Current files: `sean-tonthat.md`, `ziba-atak.md`, `ndambuki-jane.md`,
`aleena-baby.md`.

**Schema:**

```yaml
---
name: string
role: string, optional        # their LinkedIn headline, shortened
relationship: string, optional
date: string, optional        # e.g. "Aug 2025"
order: integer                # display priority, ascending
draft: boolean, default false
---
```

The markdown body below the frontmatter IS the quote — rendered verbatim.

**Filled example** (`ziba-atak.md`):

```yaml
---
name: 'Ziba Atak'
role: "Data Scientist | Generative AI & NLP Expert | Google's Women Techmakers Ambassador"
relationship: 'managed Milan directly'
date: 'Oct 2023'
order: 2
draft: false
---

I wholeheartedly recommend Milan for their valuable contributions to our
project...
```

**Hard rule (PRD §3.4):** quotes may be trimmed with ellipses for layout but
**never reworded**. These are publicly verifiable on LinkedIn — silently
"fixing" a typo or softening a phrase is a credibility risk if anyone
compares the site text to the source.

To add a new recommendation: `cp src/content/recommendations/_example.md src/content/recommendations/<new-slug>.md`.

## Part 2 — Tools grid

**Where:** `src/pages/about/index.astro`, the `TOOL_GROUPS` constant near the
top of the file (not a content collection — plain TypeScript array).

```ts
const TOOL_GROUPS = [
  { label: 'BI & Languages', tools: ['SQL', 'Python', ...] },
  { label: 'Platforms', tools: [...] },
  { label: 'Analytics', tools: [...] },
  { label: 'Workflow', tools: [...] },
] as const;
```

Source of truth: `content-pack/content_pack.md` §6. Add/remove individual
tool strings inside a group's array; don't rename the four group labels
without checking the pack section still maps cleanly.

## Part 3 — Bio paragraphs (narrow exception to "never edit pages")

**Where:** `src/pages/about/index.astro`, the `<p>` elements inside the
`data-rise` div near the top (the lead sentence + the three body paragraphs).
This is the ONE place in `src/pages/**` a content edit is allowed — every
other page file is a forbidden zone (see `AGENTS.md`).

**Rules:**
- Every fact/claim in the bio must trace back to `content-pack/content_pack.md`.
- Do not touch anything else in this file — not the `TOOL_GROUPS` structure's
  surrounding markup, not the recommendations rendering block, not the
  `<Image>` component, not any class name. Change only the text inside the
  bio `<p>` tags.
- If you're not confident you can isolate the edit to just that text, stop
  and flag it for a human instead of guessing.

## Validation

1. `npm run build` — catches Zod errors in Part 1's recommendation files and
   any Astro/TypeScript syntax errors from Parts 2–3.
2. Open `/about/` locally and visually confirm the section you touched
   renders correctly and nothing else shifted.

## Common failure modes

- **Rewording a LinkedIn recommendation** — never do this; see Part 1's hard rule.
- **Editing outside the bio `<p>` tags in Part 3** — this file is otherwise a
  forbidden zone for a reason; a stray edit to layout markup can silently
  break responsive behavior in ways `npm run build` won't catch.
- **Adding a tool not in `content_pack.md` §6** — the tools grid is meant to
  be exhaustive-but-accurate, not aspirational.
