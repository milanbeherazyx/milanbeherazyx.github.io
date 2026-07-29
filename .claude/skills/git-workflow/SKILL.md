---
name: git-workflow
description: Release-manager workflow for this repo — cutting feature/hotfix branches from the right base, verification gates, conventional commits, raising and merging PRs, the develop→main release flow, CI/CD deploy behavior, semver release tags, rebase policy, and rollback. Load this before ANY git operation (branch, commit, PR, merge, release, revert).
---

# Git Workflow (release manager)

The canonical workflow lives in the repo root, split in two — read the one
matching the situation and follow it exactly:

- **`skills/release-manager.md`** — the normal flow: branch model
  (protected `main`/`develop`), cutting `feature/*` from fresh
  `origin/develop` (`hotfix/*` from `origin/main`), the hard gates
  (`npm run build` before any commit; owner approval on visual changes;
  `scripts/agent/sanitize.sh` before commit), conventional commits +
  PROGRESS.md rule, PR → develop with CI polling (auto-merge is disabled;
  the build check must EXIST before trusting "no pending"), the
  develop→main release PR (the only thing that deploys), and semver
  tagging via `scripts/agent/release.sh`.
- **`skills/release-recovery.md`** — when things go wrong: rebase policy
  (`--force-with-lease`, own feature branches only), edge cases (dirty
  trees, PR conflicts, Lighthouse CI flakes, blocked merges, stray
  preview servers), and rollback (revert-via-hotfix-PR, restore to a tag,
  emergencies).

Wider agent operating rules (session bootstrap, task routing, memory)
live in `agent/` — start at `agent/bootstrap.md`.

Do not improvise around these files — every rule is binding.
