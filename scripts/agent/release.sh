#!/usr/bin/env bash
# release.sh <patch|minor|major> [summary]
# Computes the next semver tag from existing tags and creates + pushes an
# annotated tag on main. Run ONLY after a develop→main release PR is merged
# (skills/release-manager.md §7). Refuses to run anywhere but a clean,
# up-to-date main.
set -uo pipefail
cd "$(git rev-parse --show-toplevel)"

BUMP="${1:-}"
SUMMARY="${2:-release}"
case "$BUMP" in patch|minor|major) ;; *)
  echo "usage: release.sh <patch|minor|major> [\"one-line summary\"]"
  echo "RESULT: FAIL — invalid bump type '$BUMP'"; exit 1;;
esac

# Guards: on main, clean, synced with origin
[ "$(git branch --show-current)" = "main" ] || { echo "RESULT: FAIL — must be on main (git checkout main && git pull --ff-only origin main)"; exit 1; }
[ -z "$(git status --short)" ] || { echo "RESULT: FAIL — working tree not clean"; exit 1; }
git fetch origin main --quiet
[ "$(git rev-parse main)" = "$(git rev-parse origin/main)" ] || { echo "RESULT: FAIL — local main differs from origin/main; git pull --ff-only first"; exit 1; }

# Compute next version from the highest existing vX.Y.Z tag
latest=$(git tag --list 'v[0-9]*' --sort=-v:refname | head -1)
latest=${latest:-v0.0.0}
IFS='.' read -r MA MI PA <<< "${latest#v}"
case "$BUMP" in
  major) MA=$((MA+1)); MI=0; PA=0 ;;
  minor) MI=$((MI+1)); PA=0 ;;
  patch) PA=$((PA+1)) ;;
esac
NEXT="v${MA}.${MI}.${PA}"

echo "latest tag: $latest → next: $NEXT ($BUMP)"
git tag -a "$NEXT" -m "$NEXT — $SUMMARY" || { echo "RESULT: FAIL — tag creation failed (already exists?)"; exit 1; }
git push origin "$NEXT" || { echo "RESULT: FAIL — tag push failed; delete local tag with: git tag -d $NEXT"; exit 1; }
gh release create "$NEXT" --title "$NEXT — $SUMMARY" --generate-notes 2>/dev/null \
  && echo "GitHub release created" \
  || echo "(gh release skipped — tag itself is pushed, which is what matters)"

echo "RESULT: PASS — tagged and pushed $NEXT"
