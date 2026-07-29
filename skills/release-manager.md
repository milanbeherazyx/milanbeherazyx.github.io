# Skill: release-manager

The core version-control workflow: requirement → branch → verify → commit
→ PR → merge → release → tag. When something goes WRONG (conflicts, CI
failures, rollback, rebase) switch to `skills/release-recovery.md`.
Commands assume repo root; `gh` CLI authenticated as the repo owner.

## 1. Branch model

```
main      = production. Protected. Every push deploys to GitHub Pages.
            ONLY receives develop (or a hotfix) via PR. Never commit here.
develop   = integration. Protected. CI runs, no deploy. PRs only.
feature/* = work branches, cut FROM origin/develop.
hotfix/*  = urgent production fixes, cut FROM origin/main (see §8).
```

Naming: `feature/<short-kebab-slug>`, one branch = one purpose, never
reuse a merged branch.

## 2. Cut the branch (always from the fresh remote ref)

```bash
git status --short                 # MUST be clean (dirty? → recovery §E1)
git fetch origin develop --quiet
git checkout -b feature/<slug> origin/develop
# hotfix instead: git fetch origin main --quiet && git checkout -b hotfix/<slug> origin/main
```

## 3. Do the work, then verify (hard gates)

1. `npm run build` must pass before ANY commit — no exceptions.
   For UI/visual changes run the full gate instead:
   `bash scripts/agent/verify.sh` (see skills/verify-site.md).
2. **Owner approval gate:** user-visible copy/design changes need the
   owner's explicit OK on a local preview/screenshot BEFORE the PR is
   raised. Pushing the branch is fine; opening the PR is not.

## 4. Commit

```bash
bash scripts/agent/sanitize.sh    # must print RESULT: PASS (⛔ content check)
git add <exact files> PROGRESS.md # never `git add .`; PROGRESS entry per skills/write-progress.md
git commit -m "fix(scope): what changed, imperative, <72 chars"
git push -u origin feature/<slug>
```

Conventional commits (`feat:` `fix:` `docs:` `chore:` `refactor:` `ci:`),
small and single-purpose.

## 5. Raise the PR (feature → develop; hotfix → main)

```bash
gh pr create --base develop --head feature/<slug> \
  --title "<same as commit title>" \
  --body "## What
<bullets, file paths in backticks>

## Verification
- npm run build passes
- <screenshots / verify.sh / owner approved>"
```

## 6. Wait for CI, then merge

CI = build + Lighthouse budget (median of 3 runs) + GitGuardian.
Branch protection blocks merging while pending, and **auto-merge is
DISABLED** (`--auto` fails). Poll, then merge:

```bash
# EDGE CASE: for ~1 min after PR creation the "build" check hasn't
# registered — require it to EXIST, or the poll passes vacuously:
until gh pr checks <N> --json name,bucket \
  -q 'any(.[]; .name=="build") and all(.[]; .bucket != "pending")' \
  | grep -q true; do sleep 20; done
gh pr checks <N>            # build=pass ("deploy: skipping" is normal off-main)

gh pr merge <N> --merge --delete-branch    # ALWAYS merge commit, never squash
git checkout develop && git pull --ff-only origin develop
```

CI failed → skills/release-recovery.md §E4.

## 7. Release: develop → main, then tag

Merging to develop does NOT deploy. To ship:

```bash
gh pr create --base main --head develop \
  --title "release: <one-line summary>" \
  --body "Promotes develop to main (deploys via GitHub Pages).

## Included
- #<n> — <title>

## Verification
- CI green on develop; <owner approval note>"
# poll as §6, then:
gh pr merge <N> --merge          # NO --delete-branch — develop is permanent!
```

**Tags** (semver `vX.Y.Z` on main — history: v1.0.0, v2.0.0, v2.1.0):
patch = fixes/copy; minor = a planned phase/feature lands; major =
site-wide redesign. Tag milestones, not typo fixes — unsure? ask owner.

```bash
git checkout main && git pull --ff-only origin main
bash scripts/agent/release.sh <patch|minor|major> "<one-line summary>"
```

## 8. What deploys, and the hotfix path

- Push to **main only** → GitHub Actions builds and deploys; live in
  ~2 min. No manual deploy exists. Verify:
  `gh run list --branch main --limit 1` → success → spot-check the live
  URL (hard refresh; CDN caches briefly).
- **Hotfix:** branch from origin/main (§2) → fix → verify (§3) → PR
  `--base main` → merge after CI → **immediately back-merge to develop**
  (`gh pr create --base develop --head hotfix/<slug>`) so branches never
  diverge silently.

## 9. Checklist (copy per task)

```
[ ] status clean; branch cut from origin/develop (hotfix: origin/main)
[ ] change made; build passes (UI change → verify.sh + OWNER APPROVAL)
[ ] sanitize.sh PASS; PROGRESS.md updated; conventional commit; push
[ ] PR → develop; poll CI (build check must EXIST); merge; sync develop
[ ] ship? → release PR develop → main; poll; merge (KEEP develop)
[ ] milestone? → scripts/agent/release.sh <bump>
[ ] deploy run green + live spot check
[ ] gone wrong? → skills/release-recovery.md
```
