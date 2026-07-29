# CLAUDE.md

- This repo is milanbeherazyx.github.io — Milan Kumar Behera's portfolio + freelance lead-gen site (Astro 5, Tailwind v4, GitHub Pages). v1.0.0 shipped 2026-07-29.
- Source of truth: docs/PRD_portfolio_website.md (requirements, binding) and content-pack/content_pack.md (all personal facts/copy; its ✅/⚠️/⛔ publish flags are binding; ⛔ items never appear in site code or public files, even though the pack file itself is committed — see the pack's own §12).
- Work is phased (PRD §8, then the v2 uplift phases in PROGRESS.md). At session start: read PROGRESS.md first. At session end: update PROGRESS.md before finishing.
- **Branching (binding, since 2026-07-29):** never commit directly to `main` or `develop` (both branch-protected). Always `feature/<name>` from `develop` → PR into `develop`. `main` only receives `develop` via a reviewed PR. See README.md → "Branching".
- Verification: `npm run build` must pass before any commit.
- Conventional commits; small, single-purpose commits.
