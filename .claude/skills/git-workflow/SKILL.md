---
name: git-workflow
description: Release-manager workflow for this repo — cutting feature/hotfix branches from the right base, verification gates, conventional commits, raising and merging PRs, the develop→main release flow, CI/CD deploy behavior, semver release tags, rebase policy, and rollback. Load this before ANY git operation (branch, commit, PR, merge, release, revert).
---

# Git Workflow (release manager)

The canonical, complete workflow lives at **`skills/release-manager.md`**
in the repo root — read that file now and follow it exactly. It covers:

1. Branch model (protected `main`/`develop`, `feature/*`, `hotfix/*`)
2. Cutting branches from fresh `origin/develop` (or `origin/main` for hotfixes)
3. The `npm run build` hard gate + owner-approval gate for visual changes
4. Conventional commits + PROGRESS.md session-log rule
5. PR → develop: create, poll CI (auto-merge is disabled), merge-commit
6. Release PR develop → main (the only thing that deploys) + semver tagging
7. CI/CD behavior (`.github/workflows/deploy.yml`) and the hotfix path
8. Rebase policy (`--force-with-lease`, feature branches only) and edge
   cases: dirty tree, stale branch, PR conflicts, Lighthouse CI flakes,
   blocked merges, stray preview servers
9. Rollback: revert-via-hotfix-PR, roll back to a tag, emergencies

Do not improvise around it — every rule in that file is binding, including
the two hard gates (build must pass before commit; owner approves visual
changes before PRs are raised).
