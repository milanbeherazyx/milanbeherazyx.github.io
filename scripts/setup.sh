#!/usr/bin/env bash
# setup.sh — one-command setup after a fresh clone.
#   git clone https://github.com/milanbeherazyx/milanbeherazyx.github.io.git
#   cd milanbeherazyx.github.io && bash scripts/setup.sh
# Idempotent: safe to rerun anytime.
set -uo pipefail
cd "$(git rev-parse --show-toplevel)"
missing=0

echo "== 1/5 prerequisites =="
if command -v node > /dev/null; then
  ver=$(node --version)
  case "$ver" in
    v22.*) echo "node $ver OK" ;;
    *) echo "WARN: node $ver — CI uses v22; install v22 via your version manager (mise/nvm/fnm)";;
  esac
else
  echo "MISSING: node — install Node 22 first"; missing=1
fi
command -v git > /dev/null && echo "git OK" || { echo "MISSING: git"; missing=1; }
if command -v gh > /dev/null; then
  gh auth status > /dev/null 2>&1 && echo "gh authenticated OK" \
    || echo "WARN: gh installed but not authenticated — run: gh auth login (needed for PRs/merges, not for local dev)"
else
  echo "WARN: gh (GitHub CLI) not installed — needed for PRs/merges, not for local dev"
fi
[ "$missing" = 1 ] && { echo "RESULT: FAIL — install the MISSING items above, then rerun"; exit 1; }

echo "== 2/5 npm dependencies =="
npm ci || { echo "RESULT: FAIL — npm ci failed"; exit 1; }

echo "== 3/5 playwright browser (for scripts/agent/verify.sh screenshots) =="
npx playwright install chromium || echo "WARN: playwright browser install failed — verify.sh screenshots won't work until you run: npx playwright install chromium"

echo "== 4/5 smoke test: production build =="
npm run build > /dev/null 2>&1 && echo "build OK" \
  || { echo "RESULT: FAIL — fresh clone doesn't build; see skills/troubleshoot-build.md"; exit 1; }

echo "== 5/5 done =="
echo "Next steps:"
echo "  - Working with an AI agent? Paste the master prompt from agent/prompt.md"
echo "  - Human orientation: README.md → 'Branching', then AGENTS.md"
echo "  - Local dev server: npm run dev"
echo "RESULT: PASS — repo is ready."
