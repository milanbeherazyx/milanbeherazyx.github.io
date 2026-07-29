#!/usr/bin/env bash
# sanitize.sh — content-pack ⛔ enforcement, before every commit.
# Scans all tracked + staged files (except the pack itself and PDFs) for
# forbidden tokens. The tokens are extracted from content-pack/content_pack.md
# AT RUNTIME — never hardcode them here: per AGENTS.md, ⛔ strings may not
# appear in any committed file except the pack itself.
set -uo pipefail
cd "$(git rev-parse --show-toplevel)"
PACK="content-pack/content_pack.md"
[ -f "$PACK" ] || { echo "RESULT: FAIL — $PACK missing, cannot build denylist"; exit 1; }

# --- Build denylist from the pack -------------------------------------------
DENY=()

# 1. Phone number (pack §1 "Phone" row, format +91-XXXXXXXXXX)
phone=$(grep -oE '\+91-?[0-9]{10}' "$PACK" | head -1 || true)
if [ -n "$phone" ]; then
  DENY+=("$phone")
  DENY+=("${phone//+91-/}")          # bare 10-digit form too
else
  echo "WARN: could not extract phone from pack — format changed? Update this script."
fi

# 2. Unauthorized lender names (pack line: "Lenders that remain ⛔ ... : A, B, C.")
lenders_line=$(grep 'remain ⛔' "$PACK" | head -1 || true)
if [ -n "$lenders_line" ]; then
  names=$(echo "$lenders_line" | sed 's/.*: *//; s/\.$//' | tr ',' '\n' | sed 's/^ *//; s/ *$//')
  while IFS= read -r n; do
    [ -n "$n" ] && DENY+=("$n")
  done <<< "$names"
else
  echo "WARN: could not extract unauthorized lender list — format changed? Update this script."
fi

[ ${#DENY[@]} -eq 0 ] && { echo "RESULT: FAIL — denylist came out empty; refusing to pass vacuously"; exit 1; }

# --- Scan --------------------------------------------------------------------
# Tracked files + staged-but-new files; skip the pack itself, binaries,
# this script's output dir, and lockfiles (hash noise).
files=$( (git ls-files; git diff --cached --name-only) | sort -u \
  | grep -vE '^content-pack/|\.pdf$|\.png$|\.jpg$|\.ico$|\.woff2?$|package-lock\.json$|^\.agent-out/' )

hits=0
for token in "${DENY[@]}"; do
  matches=$(echo "$files" | xargs grep -lF -- "$token" 2>/dev/null || true)
  if [ -n "$matches" ]; then
    echo "FORBIDDEN token found (from pack ⛔ list) in:"
    echo "$matches" | sed 's/^/  /'
    hits=$((hits+1))
  fi
done

if [ "$hits" -gt 0 ]; then
  echo "RESULT: FAIL — $hits forbidden token(s) present. Remove them before committing."
  exit 1
fi
echo "RESULT: PASS — no ⛔ content-pack tokens in tracked/staged files."
