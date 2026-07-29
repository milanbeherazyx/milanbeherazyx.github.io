# Skill: release-manager

The complete version-control and release workflow for this repo — from
"requirement received" to "live on GitHub Pages", plus tagging and rollback.
Follow it top to bottom for every change that will be committed. Any agent
(Claude, a local LLM, a human) operating this repo acts as the release
manager described here. Commands assume the repo root as working directory
and the `gh` CLI authenticated as the repo owner.

## 1. Branch model (memorize this first)

```
main      = production. Protected. Every push triggers build + deploy to
            GitHub Pages. ONLY receives develop (or a hotfix) via a PR.
            Never commit directly here.
develop   = integration. Protected. CI runs but does NOT deploy.
            ONLY receives feature/hotfix branches via PRs. Never commit
            directly here.
feature/* = disposable work branches, cut FROM origin/develop.
hotfix/*  = urgent production fixes, cut FROM origin/main (rare — see §8).
```

Branch naming: `feature/<short-kebab-slug>` describing the change, e.g.
`feature/mobile-hero-declutter`, `hotfix/broken-contact-form`. One branch =
one purpose. Never reuse a merged branch.

## 2. From requirement to branch

**Always cut from the freshest remote ref — never from whatever happens to
be checked out locally.** Local branches go stale; `origin/develop` is the
truth.

```bash
git status --short                 # MUST be clean before you start (see §9.1)
git fetch origin develop --quiet
git checkout -b feature/<slug> origin/develop
```

For a hotfix (production is broken and develop contains unreleased work you
must NOT ship):

```bash
git fetch origin main --quiet
git checkout -b hotfix/<slug> origin/main
```

## 3. Do the work, then verify (hard gate)

Binding rule from CLAUDE.md: **`npm run build` must pass before ANY commit.**
No exceptions, even for docs-only changes — the build also validates content
collections and frontmatter.

```bash
npm run build        # must end with "[build] Complete!" — 19+ pages
```

For UI changes, additionally verify visually before asking the owner to
review (see `.claude/skills/webapp-testing`): serve the built site with
`npx astro preview --port 4321` and screenshot at mobile (390×844) and
desktop widths — both themes if the change touches colors.

**Owner approval gate:** for user-visible copy/design changes, show the
owner a local preview and get explicit approval BEFORE raising the PR.
Pushing the branch itself is fine (it deploys nothing), but do not
open/merge PRs on unreviewed visual changes.

## 4. Commit

- **Conventional commits**: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`,
  `ci:`, with optional scope — e.g. `fix(home): declutter mobile hero`.
- **Small, single-purpose commits.** Two unrelated changes = two commits
  (or better, two branches).
- **Update PROGRESS.md in the same commit** — dated session-log entry:
  what changed, why, how it was verified. Binding session-end rule.
- Never `git add .` blindly — run `git status --short` and stage exactly
  the files you touched. Unrelated dirty files (§9.1) must not ride along.

```bash
git add <exact files> PROGRESS.md
git commit -m "fix(scope): what changed, imperative mood, <72 chars"
git push -u origin feature/<slug>
```

## 5. Raise the PR (feature → develop)

```bash
gh pr create --base develop --head feature/<slug> \
  --title "fix(scope): same as commit title" \
  --body "## What
<bullet list of the actual changes, file paths in backticks>

## Verification
- npm run build passes
- <screenshots / tests / owner reviewed locally and approved>"
```

Hotfix PRs use `--base main` instead (see §8).

## 6. Wait for CI, then merge

CI on every PR into main/develop = **build + Lighthouse budget check**
(`.lighthouserc.json`: perf ≥0.85, a11y ≥0.95, best-practices ≥0.90,
seo ≥0.95, asserted on the median of 3 runs) plus a GitGuardian secret scan.

**You cannot merge while checks are pending** — branch protection blocks
it, and **auto-merge is DISABLED on this repo** (`gh pr merge --auto` fails
with "Auto merge is not allowed"). Poll until checks finish, then merge:

```bash
# Poll (run in background; build takes ~4–5 min).
# EDGE CASE: for ~a minute after PR creation the "build" check hasn't
# registered yet — a naive "no pending checks" poll passes vacuously with
# only GitGuardian visible. Require the build check to EXIST too:
until gh pr checks <N> --json name,bucket \
  -q 'any(.[]; .name=="build") and all(.[]; .bucket != "pending")' \
  | grep -q true; do sleep 20; done
gh pr checks <N>     # confirm build=pass ("deploy: skipping" on non-main PRs is normal)

# Merge — always a MERGE COMMIT (repo convention), never squash/rebase-merge:
gh pr merge <N> --merge --delete-branch
```

After merging, sync local develop:

```bash
git checkout develop && git pull --ff-only origin develop
```

## 7. Release: develop → main, then tag

Merging into develop does NOT change the live site. To ship:

```bash
gh pr create --base main --head develop \
  --title "release: <one-line summary>" \
  --body "Promotes develop to main (deploys via GitHub Pages workflow).

## Included
- #<pr-number> — <title>

## Verification
- Build + Lighthouse CI passed on develop
- <owner approval note>"
# wait for checks exactly as in §6, then:
gh pr merge <N> --merge          # NO --delete-branch here — develop is permanent!
```

### Release tags

Annotated semver tags (`vMAJOR.MINOR.PATCH`) go on main. Existing history:
`v1.0.0` (initial ship), `v2.0.0` (design uplift), `v2.1.0` (SEO content
sprint). Rules:

- **PATCH** (v2.1.0 → v2.1.1): fixes/copy tweaks that change no feature.
- **MINOR** (v2.1.0 → v2.2.0): a planned phase or feature lands (new page,
  new content system, sprint completion).
- **MAJOR** (v2.x → v3.0.0): site-wide redesign or restructure.
- Not every merge to main needs a tag — tag milestones, not typo fixes.
  When in doubt, ask the owner whether this release closes a phase.

```bash
git checkout main && git pull --ff-only origin main
git tag -a vX.Y.Z -m "vX.Y.Z — <one-line summary>"
git push origin vX.Y.Z
gh release create vX.Y.Z --title "vX.Y.Z — <summary>" --notes "<changelog bullets>"   # optional but nice
```

## 8. CI/CD — what actually deploys, and the hotfix path

`.github/workflows/deploy.yml`:

- push/PR to main or develop → `build` job (npm ci → npm run build →
  Lighthouse CI budget check).
- push to **main only** → uploads `dist/` as a Pages artifact and runs the
  `deploy` job → live at https://milanbeherazyx.github.io within ~2 min.
- There is NO manual deploy step. Deploy IS "merge to main". Verify with
  `gh run list --branch main --limit 1` → wait for success → spot-check the
  live URL (hard-refresh; GitHub Pages CDN can cache briefly).

**Hotfix flow** (main broken, develop not shippable): branch from
origin/main (§2) → fix → verify (§3) → PR `--base main` → merge after CI →
**immediately back-merge into develop** so the branches don't diverge:
`gh pr create --base develop --head hotfix/<slug>` → merge after CI.

## 9. Rebase policy & edge cases

### 9.1 Dirty working tree when you need to start
Never carry unrelated dirty files onto a new branch. Either finish/ship the
previous task first, or stash: `git stash push -m "wip: <why>"` → cut
branch → work → later `git stash pop`. If a dirty file is one you're about
to change anyway, read it before overwriting.

### 9.2 develop moved while your feature branch was open → rebase
This is the ONE place rebase is used — refreshing an unmerged feature
branch:

```bash
git fetch origin develop
git rebase origin/develop        # replay your commits onto fresh develop
# conflicts: edit file → git add <file> → git rebase --continue
#            (or git rebase --abort to bail out cleanly)
npm run build                    # ALWAYS re-verify after a rebase
git push --force-with-lease      # NEVER plain --force
```

**Never rebase main, develop, or any merged/shared history.** Rebase and
`--force-with-lease` only ever on your own unmerged feature branch.

### 9.3 PR shows merge conflicts
Fix locally via §9.2 (rebase onto the PR's base branch), push with
`--force-with-lease` — the PR updates automatically.

### 9.4 CI fails
- **Legit failure** (build error, budget genuinely broken): fix on the same
  feature branch, commit, push — checks re-run automatically.
- **Known flake:** Lighthouse perf on shared GitHub runners has produced
  single-sample false failures (0.76–0.83 reported vs 94–95 locally on an
  identical build). Config asserts on median of 3 runs now, which fixed it —
  but if a perf-only failure looks absurd, re-run before touching code:
  `gh run rerun <run-id> --failed`. NEVER lower the budget thresholds just
  to make CI pass.

### 9.5 Merge blocked: "base branch policy prohibits the merge"
Branch protection saying checks are pending/failing — NOT a permissions
problem. Wait for checks (§6). Do not use `--admin` merges; if genuinely
stuck, stop and ask the owner.

### 9.6 Direct push to main/develop rejected
Working as intended. Move your commits to a feature branch —
`git checkout -b feature/<slug>` (commits come with you) → push → PR — then
reset the protected branch:
`git checkout develop && git reset --hard origin/develop`.

### 9.7 Local preview port already in use
`astro preview` silently falls back (4321 → 4322), so your test URL points
at a possibly-stale stray server. Kill strays first:
`lsof -ti :4321 | xargs kill`.

### 9.8 Amending commits
`git commit --amend` only BEFORE pushing, or on your own feature branch
followed by `--force-with-lease`. Never amend merged history.

### 9.9 What NEVER goes in a commit
Phone numbers, home address, internal company artifacts, secrets, or any
content-pack ⛔ item (content-pack/content_pack.md publish flags are
binding). GitGuardian scans every PR, but don't rely on it — check
yourself. The Web3Forms key and Umami/GSC IDs in `src/site.config.ts` are
public-by-design and fine.

## 10. Rollback — when a release goes bad

Protected branches mean you can never force-push main backwards. Rollback
is always a **new forward commit that restores the old state**, shipped
through the same PR machinery. Three levels:

### 10.1 Revert one bad release (the normal case)
Revert the release merge commit on main:

```bash
git fetch origin main
git log origin/main --merges --oneline -5     # find the bad release merge <sha>
git checkout -b hotfix/revert-<what> origin/main
git revert -m 1 <sha>                         # -m 1 = keep main's side as parent
npm run build                                 # gate still applies
git push -u origin hotfix/revert-<what>
gh pr create --base main --head hotfix/revert-<what> \
  --title "revert: <what> (rollback)" --body "Reverts <sha> — <why>."
# wait CI → merge → main redeploys the previous state automatically
```

Then back-merge into develop (§8) so develop knows about the revert —
otherwise the bad change ships again on the next release. When the fix is
ready later, revert-the-revert or reapply properly on a fresh feature
branch.

### 10.2 Roll back to a known-good tag (multiple bad releases)
```bash
git checkout -b hotfix/rollback-to-vX.Y.Z origin/main
git revert -m 1 --no-commit <bad-sha-newest>..<bad-sha-oldest>   # or:
# git checkout vX.Y.Z -- . && git status   (restore the whole tree to the tag)
npm run build
git commit -m "revert: roll back to vX.Y.Z state"
# push → PR to main → CI → merge, exactly as 10.1; back-merge develop after
```

### 10.3 Emergency (site actively broken, CI itself broken)
There is no side-channel deploy — GitHub Pages serves whatever the last
successful `deploy` job published, and only main triggers it. If CI is the
broken thing, fix the workflow file itself via a `hotfix/ci-*` PR. If
GitHub Actions is down entirely, nothing can deploy — the site stays on the
last published artifact, which is itself a form of safety. Escalate to the
owner rather than attempting `--admin` bypasses.

### After any rollback
- Update PROGRESS.md: what was rolled back, why, evidence.
- Do NOT delete or move existing tags — a tag is history, not a pointer.
  Tag the revert release itself (e.g. `v2.1.1`) if it's a milestone.

## 11. End-to-end checklist (copy per task)

```
[ ] git status clean; fetch origin develop
[ ] feature/<slug> cut from origin/develop   (hotfix/<slug> from origin/main)
[ ] change made; npm run build passes
[ ] UI change? → local preview + screenshots + OWNER APPROVAL
[ ] PROGRESS.md updated
[ ] conventional commit, exact files staged, pushed
[ ] PR → develop; wait for CI (no auto-merge — poll); merge; sync local develop
[ ] ship? → release PR develop → main; wait CI; merge (KEEP develop)
[ ] milestone? → annotated tag vX.Y.Z on main, push tag
[ ] verify deploy run green + live-site spot check
[ ] gone wrong? → §10 rollback: revert via hotfix PR, back-merge develop
```
