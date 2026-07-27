# AGENTS.md — machine entry point

> STATUS: Phase 1 skeleton. Finalized in Phase 5. Structure below is accurate;
> skill files are stubs until then.

This is a static Astro 5 site deployed to GitHub Pages at
`https://milanbeherazyx.github.io`. Content changes = edit markdown or
`src/site.config.ts`. Never edit components/config for a content change.

## Repo map

| Path | What it is |
|---|---|
| `src/content/work/*.md` | Case studies (one file each) |
| `src/content/services/*.md` | Service offers |
| `src/content/blog/*.md` | Blog posts |
| `src/content/recommendations/*.md` | LinkedIn recommendation quotes |
| `src/content/experience/*.md` | Resume timeline entries |
| `src/content/*/_example.md` | Copy-me templates (ignored by build) |
| `src/site.config.ts` | Identity, links, nav, homepage proof-strip metrics |
| `src/content.config.ts` | Zod schemas — DO NOT EDIT for content changes |
| `src/pages/`, `src/layouts/`, `src/components/`, `src/styles/` | FORBIDDEN for content changes |
| `public/resume.pdf` | Downloadable resume (binary replace only) |
| `skills/` | Task-scoped how-to files — read the one matching your task |
| `content-pack/content_pack.md` | Source of truth for all facts (git-ignored, local only) |

## To change X → edit Y

| Task | File(s) | Skill file |
|---|---|---|
| Edit/add a case study | `src/content/work/` | `skills/update-case-study.md`, `skills/add-case-study.md` |
| Homepage metrics | `src/site.config.ts` → `PROOF_METRICS` | `skills/update-metrics.md` |
| Resume timeline | `src/content/experience/` | `skills/update-resume.md` |
| Replace resume PDF | `public/resume.pdf` | `skills/replace-resume-pdf.md` |
| Services copy | `src/content/services/` | `skills/update-services.md` |
| About/recommendations | `src/content/recommendations/` | `skills/update-about.md` |
| Add a blog post | `src/content/blog/` | `skills/add-blog-post.md` |

## Forbidden zones (never edit for content changes)

`src/components/**`, `src/layouts/**`, `src/pages/**`, `src/styles/**`,
`src/content.config.ts`, `astro.config.mjs`, `tsconfig.json`, `package.json`,
`.github/**`.

## Hard content rules

- Facts come from `content-pack/content_pack.md` ONLY. Its ⛔ items (phone,
  address, internal artifacts) never appear anywhere in this repo.
- `content_pack.md` is git-ignored. Never commit it, never copy its ⛔ content.

## Verify & rollback

- Verify every change: `npm run build` (Zod schemas fail loudly on bad frontmatter).
- Rollback a bad edit: `git checkout -- <file>`.
- Deploy: `git push` on `main` — GitHub Actions does the rest. No manual steps.
