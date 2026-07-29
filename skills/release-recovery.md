# Skill: release-recovery

What to do when the normal flow (skills/release-manager.md) goes wrong:
edge cases (§E) and rollback (§R). Protected branches mean recovery is
always a FORWARD fix through the same PR machinery — never a force-push
to main/develop.

## §E — Edge cases

### E1. Dirty working tree when you need to start
Never carry unrelated dirty files onto a new branch. Finish/ship the other
work first, or `git stash push -m "wip: <why>"` → branch → work → later
`git stash pop`. Read any dirty file you're about to overwrite.

### E2. develop moved while your feature branch was open (the ONE rebase)
```bash
git fetch origin develop
git rebase origin/develop        # conflicts: edit → git add <f> → git rebase --continue
                                 # bail out cleanly: git rebase --abort
npm run build                    # ALWAYS re-verify after a rebase
git push --force-with-lease      # NEVER plain --force
```
Never rebase main, develop, or merged history. `--force-with-lease` only
on your own unmerged feature branch.

### E3. PR shows merge conflicts
Same as E2 (rebase onto the PR's base branch), push `--force-with-lease`
— the PR updates itself.

### E4. CI fails
- Legit (build error, budget truly broken): fix on the same branch,
  commit, push — checks re-run. Build errors → skills/troubleshoot-build.md.
- **Known flake:** Lighthouse perf on shared runners has reported
  0.76–0.83 vs 94–95 locally on identical builds. Config asserts the
  median of 3 runs (fixed it), but if a perf-only fail looks absurd:
  `gh run rerun <run-id> --failed` BEFORE touching code. NEVER lower the
  budget thresholds to pass.

### E5. "base branch policy prohibits the merge"
Checks pending/failing — not permissions. Poll per release-manager §6.
No `--admin` merges; genuinely stuck → owner.

### E6. Direct push to main/develop rejected
Working as intended. `git checkout -b feature/<slug>` (commits come
along) → push → PR. Then reset the protected branch:
`git checkout develop && git reset --hard origin/develop`.

### E7. Stray preview server / wrong port
`astro preview` silently falls back 4321→4322, so URLs may point at a
stale server. `lsof -ti :4321 | xargs kill` first (verify.sh does this).

### E8. Amending
`--amend` only before pushing, or on your own feature branch +
`--force-with-lease`. Never amend merged history.

### E9. Forbidden content nearly committed
`scripts/agent/sanitize.sh` FAILs → remove the token, never bypass. The
pack's ⛔ flags bind every committed file (pack itself excepted).

## §R — Rollback

### R1. Revert one bad release (the normal case)
```bash
git fetch origin main
git log origin/main --merges --oneline -5     # find the bad release merge <sha>
git checkout -b hotfix/revert-<what> origin/main
git revert -m 1 <sha>                         # -m 1 keeps main's side
npm run build
git push -u origin hotfix/revert-<what>
gh pr create --base main --head hotfix/revert-<what> \
  --title "revert: <what> (rollback)" --body "Reverts <sha> — <why>."
# poll CI → merge → main redeploys the previous state automatically
```
Then **back-merge into develop** (release-manager §8) or the bad change
ships again next release. The real fix later = revert-the-revert or a
fresh feature branch.

### R2. Roll back to a known-good tag (multiple bad releases)
```bash
git checkout -b hotfix/rollback-to-vX.Y.Z origin/main
git checkout vX.Y.Z -- .                      # restore whole tree to the tag
git status                                    # review what changed
npm run build
git commit -am "revert: roll back site to vX.Y.Z state"
# push → PR to main → CI → merge, as R1; back-merge develop after
```

### R3. Emergency (site broken AND CI broken)
No side-channel deploy exists — Pages serves the last successful deploy,
which is itself a safety net. If CI is the broken thing, fix the workflow
via a `hotfix/ci-*` PR. GitHub Actions down entirely → nothing can
deploy → escalate to owner; no `--admin` bypasses.

### After any rollback
- PROGRESS.md entry: what, why, evidence. Rewrite STATE.md.
- Never delete/move existing tags — tags are history. Tag the revert
  itself (e.g. v2.1.1) only if it's a milestone.
