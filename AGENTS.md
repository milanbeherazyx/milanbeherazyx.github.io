# AGENTS.md — machine entry point

**Start every session with `agent/bootstrap.md`** — it orients you (state,
recent history, task routing via `agent/router.md`) and points to the
deterministic scripts in `scripts/agent/` (status, verify, sanitize,
release). Session-starter prompts for any coding agent: `agent/prompt.md`.
Memory rules (STATE.md / PROGRESS.md / skill-size limits): `agent/memory.md`.

This is a static Astro 5 site deployed to GitHub Pages at
`https://milanbeherazyx.github.io`. Content changes = edit markdown or
`src/site.config.ts`. Never edit components/layouts/pages/config for a content
change — see Forbidden zones below.

## Branching (binding, since 2026-07-29)

**Never commit directly to `main` or `develop` — both are branch-protected on
GitHub (no direct pushes, PR + green CI required, enforced even for admins).**
Always: `git checkout -b feature/<name>` from `develop` → commit → push → PR
into `develop`. `main` only ever receives `develop` via a reviewed PR once
`develop` is verified. Full detail in README.md → "Branching".

## Repo map

| Path | What it is |
|---|---|
| `src/content/work/*.md` | Case studies (one file each) — 6 published |
| `src/content/services/*.md` | Service offers — 4 published |
| `src/content/experience/*.md` | Resume timeline entries — 7 published |
| `src/content/recommendations/*.md` | LinkedIn recommendation quotes — 4 published |
| `src/content/blog/*.md` | Blog posts — none published yet; nav item stays hidden until one exists |
| `src/content/*/_example.md` | Copy-me templates (ignored by the build — filename starts with `_`) |
| `src/site.config.ts` | Identity, links, nav, homepage proof-strip metrics, Cal.com/Web3Forms/Umami config slots |
| `src/content.config.ts` | Zod schemas — **forbidden zone**, do not edit for a content change |
| `src/components/`, `src/layouts/`, `src/pages/`, `src/styles/`, `src/scripts/` | **Forbidden zone** for content changes |
| `public/resume.pdf` | Downloadable resume — binary replace only, see `skills/replace-resume-pdf.md` |
| `public/og-default.jpg` | Shared social-preview image (1200×630) |
| `src/assets/milan-photo.png` | About-page photo, optimized at build time via `astro:assets` |
| `skills/` | Task-scoped how-to files — read the one matching your task before editing |
| `content-pack/content_pack.md` | Source of truth for all facts. **Committed to this repo** (Milan's explicit decision, 2026-07-28 — see the file's own §12 for why this deviates from the original git-ignore plan). Still: never invent a fact not in it. |
| `.lighthouserc.json` | Lighthouse CI budget — forbidden zone |
| `.github/workflows/deploy.yml` | Build → Lighthouse CI → deploy pipeline — forbidden zone |

## To change X → edit Y

| Task | File(s) | Skill file |
|---|---|---|
| Edit/add a case study | `src/content/work/` | `skills/update-case-study.md`, `skills/add-case-study.md` |
| Homepage metrics | `src/site.config.ts` → `PROOF_METRICS` | `skills/update-metrics.md` |
| Resume timeline | `src/content/experience/` | `skills/update-resume.md` |
| Replace resume PDF | `public/resume.pdf` | `skills/replace-resume-pdf.md` |
| Services copy | `src/content/services/` | `skills/update-services.md` |
| About bio / recommendations | `src/pages/about/index.astro` (bio paragraph) + `src/content/recommendations/` | `skills/update-about.md` |
| Add a blog post | `src/content/blog/` | `skills/add-blog-post.md` |

## Forbidden zones (never edit for content changes)

`src/components/**`, `src/layouts/**`, `src/pages/**` (except the About bio
paragraph per `skills/update-about.md`), `src/styles/**`, `src/scripts/**`,
`src/content.config.ts`, `astro.config.mjs`, `tsconfig.json`, `package.json`,
`.github/**`, `.lighthouserc.json`.

## Hard content rules

- Facts come from `content-pack/content_pack.md` ONLY — no invented numbers, dates, or claims.
- Its ⛔ items (phone number, home address, internal Khatabook system/table
  names, proprietary signal names, unauthorized lender names) never appear
  anywhere in `src/`, `public/`, or any committed file — even though the pack
  itself is now committed, its ⛔ flags still govern what may reach the site.
- Authorized lender names for publication: **Cashtree, Caprion, Lendbox,
  Jupiter, Slice, Western Cap.** No others.

## Verify & rollback

- Verify every change: `npm run build` (Zod schemas + `astro check` fail loudly on bad frontmatter or types).
- Rollback a bad edit: `git checkout -- <file>`.
- Deploy: `git push` on `main` — GitHub Actions builds, runs the Lighthouse CI
  budget check, and deploys. No manual steps. If Lighthouse CI fails, the
  deploy does not happen — read the failing assertion in the Action log.
