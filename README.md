# milanbeherazyx.github.io

Milan Kumar Behera's portfolio & freelance lead-gen site. Astro 5 + Tailwind v4,
statically built, deployed to GitHub Pages via Actions.

## Run

```sh
npm install
npm run dev      # local dev server
npm run build    # type-check + production build (must pass before commit)
npm run preview  # serve the production build locally
```

Node 20+ required.

## Fresh clone on a new machine

Everything needed to build, edit and deploy the site is in this repo —
including the `.claude/skills/` used by AI sessions, the design system in
`design/`, and the task guides in `skills/`. After cloning:

```sh
npm install && npm run build   # should pass
```

`content-pack/content_pack.md` is the source of truth for site facts and is
committed to this repo (Milan's explicit decision — see
[`content-pack/README.md`](content-pack/README.md) for what that means and
why). Read it before doing content work.

Raw source assets not needed by the build (recommendation screenshots, spare
photo crops) are kept outside the repo in `../Portfolio-private-assets/`.

## Branching (binding, since 2026-07-29 — see PROGRESS.md)

Three tiers, in order. **`main` and `develop` are protected on GitHub — no
direct pushes, PR + a green build/Lighthouse check required to merge, even
for repo admins.**

1. **`main`** — production. Deploys to Pages on every push (i.e. every
   merged, checks-passed PR). Only ever updated by merging `develop` in,
   once `develop` has been fully verified.
2. **`develop`** — integration branch. No deploy trigger; every PR into it
   still runs the full build + Lighthouse budget check. Never edited
   directly — only via merged feature-branch PRs.
3. **`feature/<name>`** — cut from `develop` for one unit of work. Open a PR
   back into `develop` when ready; delete the branch after merge.

```sh
git checkout develop && git pull
git checkout -b feature/my-change
# ...edit, commit...
git push -u origin feature/my-change
gh pr create --base develop
```

## Previewing a branch before merging

**⚠️ The VS Code "Live Preview" extension (Microsoft) cannot preview this
project directly.** It serves raw files as static content — pointed at a
`.astro` source file, it shows unrendered source, not the working site.
Astro needs its own server to compile `.astro`/content collections/routing.
Use one of these instead, both give live-reload:

**While actively editing (fastest, HMR):**
```sh
git checkout feature/whatever   # the branch you're reviewing
npm install                     # only if package.json changed
npm run dev                     # Astro dev server → http://localhost:4321
```
Then either open `http://localhost:4321` in a normal browser tab, or embed
it inside VS Code with the built-in **Simple Browser** (no extra extension
needed): Command Palette → `Simple Browser: Show` → paste the URL. The
already-installed Live Preview extension can also embed an external URL
this way (`Live Preview: Show Preview (Internal Browser)`), but Simple
Browser is built into VS Code core and is the guaranteed-to-work option.

**Final pre-merge check (matches what CI/production actually builds):**
```sh
npm run build && npm run preview   # serves the real dist/ output
```
Do this once before opening a PR — it's the same static build Lighthouse CI
grades, so it catches anything dev mode's HMR might paper over.

## Deploy

Merging a PR into `main` → GitHub Actions builds, runs the Lighthouse CI
budget check, and deploys to Pages. No manual steps — and no direct pushes,
per the branching model above.

## Editing content

Read [`AGENTS.md`](AGENTS.md) first — it maps every content task to the exact
file and a step-by-step guide in [`skills/`](skills/). Components and config are
off-limits for content changes.

## Project docs

| File | What it is |
|---|---|
| [`PRD_portfolio_website.md`](PRD_portfolio_website.md) | Binding requirements |
| [`PROGRESS.md`](PROGRESS.md) | Phase status + session log |
| [`CLAUDE.md`](CLAUDE.md) | Working rules for AI sessions |
| [`AGENTS.md`](AGENTS.md) | Repo map, edit-X→file-Y table, forbidden zones |
| [`design/DESIGN.md`](design/DESIGN.md) | Locked design system, tokens, motion spec |
| [`DNS.md`](DNS.md) | Plan for adding a custom domain later (deferred, not active) |
