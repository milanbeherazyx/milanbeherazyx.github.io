#!/usr/bin/env bash
# status.sh — one-screen situational awareness for the agent.
# Run at the START of every session (agent/bootstrap.md step 2).
# Read-only: changes nothing, safe to run anytime.
set -uo pipefail
cd "$(git rev-parse --show-toplevel)"

echo "== BRANCH =="
git branch --show-current
echo
echo "== WORKING TREE (must be clean before cutting a branch) =="
git status --short || true
[ -z "$(git status --short)" ] && echo "(clean)"
echo
echo "== LOCAL vs REMOTE =="
git fetch origin develop main --quiet 2>/dev/null || echo "(offline — remote state unknown)"
for b in develop main; do
  local_sha=$(git rev-parse "$b" 2>/dev/null || echo none)
  remote_sha=$(git rev-parse "origin/$b" 2>/dev/null || echo none)
  if [ "$local_sha" = "$remote_sha" ]; then
    echo "$b: in sync with origin"
  else
    echo "$b: DIFFERS from origin — run: git checkout $b && git pull --ff-only origin $b"
  fi
done
echo
echo "== OPEN PRs =="
gh pr list --limit 10 2>/dev/null || echo "(gh unavailable — check github.com manually)"
echo
echo "== LAST DEPLOY (main) =="
gh run list --branch main --limit 1 \
  --json conclusion,status,displayTitle,updatedAt \
  -q '.[0] | .status + "/" + (.conclusion // "-") + " — " + .displayTitle + " (" + .updatedAt + ")"' \
  2>/dev/null || echo "(gh unavailable)"
echo
echo "== LAST 3 TAGS =="
git tag --sort=-creatordate | head -3
echo
echo "RESULT: PASS — status printed. Now read agent/STATE.md and tail -40 PROGRESS.md"
