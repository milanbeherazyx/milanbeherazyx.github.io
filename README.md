# milanbeherazyx.github.io

Milan Behera's portfolio & freelance lead-gen site. Astro 5 + Tailwind v4,
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

## Deploy

Push to `main` → GitHub Actions builds and deploys to Pages. No manual steps.

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
