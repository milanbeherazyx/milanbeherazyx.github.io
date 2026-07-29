#!/usr/bin/env bash
# verify.sh — the full pre-commit verification gate, as one command.
# Runs: production build → static preview server → screenshots (mobile +
# desktop, dark + light) → internal link check → cleanup.
# Screenshots land in .agent-out/ (git-ignored) — LOOK AT THEM before
# declaring a UI change done.
# Exits 0 with "RESULT: PASS" only if every step succeeded.
set -uo pipefail
cd "$(git rev-parse --show-toplevel)"
OUT=".agent-out"
PORT=4321
mkdir -p "$OUT"

fail() { echo "RESULT: FAIL — $1"; exit 1; }

# --- 1. Build (the hard gate from CLAUDE.md) --------------------------------
echo "== 1/4 build =="
npm run build > "$OUT/build.log" 2>&1 || {
  tail -30 "$OUT/build.log"
  fail "build failed — full log in $OUT/build.log; see skills/troubleshoot-build.md"
}
echo "build OK"

# --- 2. Preview server ------------------------------------------------------
echo "== 2/4 preview server =="
# Kill strays first — astro silently falls back to another port, which makes
# every later URL point at a stale server (release-manager.md edge case).
lsof -ti :$PORT 2>/dev/null | xargs kill 2>/dev/null || true
sleep 1
npx astro preview --port $PORT > "$OUT/preview.log" 2>&1 &
SERVER_PID=$!
trap 'kill $SERVER_PID 2>/dev/null || true' EXIT
for i in $(seq 1 30); do
  curl -sf "http://localhost:$PORT/" > /dev/null 2>&1 && break
  [ "$i" = 30 ] && fail "preview server never became ready — see $OUT/preview.log"
  sleep 1
done
echo "server ready on :$PORT"

# --- 3. Screenshots (pages × viewports × themes) ----------------------------
echo "== 3/4 screenshots =="
PAGES="/ /work/ /services/ /about/ /contact/"
for page in $PAGES; do
  name=$(echo "$page" | tr -d '/' ); name=${name:-home}
  for theme in dark light; do
    npx playwright screenshot --viewport-size=390,844 --color-scheme=$theme \
      --wait-for-timeout=2000 "http://localhost:$PORT$page" \
      "$OUT/${name}-mobile-${theme}.png" > /dev/null 2>&1 \
      || fail "screenshot failed: $page mobile $theme (is playwright installed? npx playwright install chromium)"
  done
  npx playwright screenshot --viewport-size=1440,900 --color-scheme=dark \
    --wait-for-timeout=2000 "http://localhost:$PORT$page" \
    "$OUT/${name}-desktop-dark.png" > /dev/null 2>&1 \
    || fail "screenshot failed: $page desktop"
done
echo "screenshots written to $OUT/ — OPEN AND LOOK AT THEM"

# --- 4. Internal link check --------------------------------------------------
echo "== 4/4 internal links =="
broken=0
while IFS= read -r href; do
  clean=${href#href=\"}; clean=${clean%\"}
  clean=${clean%%#*}; clean=${clean%%\?*}
  [ -z "$clean" ] && continue
  target="dist${clean}"
  if [ ! -e "$target" ] && [ ! -e "${target}index.html" ] && [ ! -e "${target%.html}.html" ]; then
    echo "BROKEN: $clean"
    broken=$((broken+1))
  fi
done < <(grep -rhoE 'href="/[^"]*"' dist --include='*.html' | sort -u)
[ "$broken" -gt 0 ] && fail "$broken broken internal link(s)"
echo "links OK"

echo "RESULT: PASS — build + screenshots + links all good. Review $OUT/*.png visually before committing."
