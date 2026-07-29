# Skill: dependency-update

Monthly (or when a security alert arrives). Goal: stay current on safe
updates, never break the site chasing a version number.

## 1. Assess

```bash
npm audit                 # security issues?
npm outdated              # what's behind?
```

## 2. Decide what to touch

| Kind | Action |
|---|---|
| `npm audit` criticals/highs | Fix now: `npm audit fix` (NEVER `--force` — it installs breaking majors). |
| Patch/minor updates (same major) | Safe batch: `npm update` — respects semver ranges in package.json. |
| Major bumps (astro 5→6, tailwind, @astrojs/*) | **Do not do these autonomously.** Record in agent/STATE.md under "Blocked / needs owner" — majors need release notes reading and real judgment. |
| `motion`, `lenis` majors | Same — owner decision; they drive the animations, breakage is visual and subtle. |

## 3. Verify (the same gate as any change)

```bash
bash scripts/agent/verify.sh     # build + screenshots + links
```

LOOK at the screenshots — dependency breakage is often visual (fonts,
animation end-states) while the build stays green.

## 4. Ship

Normal flow per skills/release-manager.md: branch
`feature/deps-<yyyy-mm>`, commit `chore(deps): <what>` (package.json +
package-lock.json only), PROGRESS.md entry, PR → develop. Release to main
with the next batch unless it was a security fix — those release
immediately.

## Rollback a bad update

```bash
git checkout -- package.json package-lock.json
npm ci                            # restore node_modules to the lockfile
```

If it already merged: revert the PR per skills/release-recovery.md §R.
