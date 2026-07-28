# content-pack/

This directory is where `content_pack.md` lives — the single source of truth for
every fact and number on the site (PRD §11).

**Status: committed to this repo.** Originally this was meant to be
git-ignored (PRD §11's plan, and how it was handled through Phase 4) because
it contains Milan's phone number, a home-address reference, and a
discrepancy log. On 2026-07-28, Milan made the explicit, informed decision to
commit it anyway — he was told plainly what it exposes before doing so. See
the pack's own §12 for his reasoning. **This overrides the PRD §11 default;
do not silently re-add it to `.gitignore`.**

## What's actually in it

- ⛔ Milan's phone number and a home-address reference (each marked ⛔ in the
  pack's own legend — those flags still govern the *site*, they just no
  longer keep the pack file itself out of git)
- The **discrepancy log** — working notes on mismatches between Milan's
  resume and LinkedIn (§8), and an outstanding resume/LinkedIn update he owes
  himself before those claims are fully backed everywhere (§12)
- Provenance notes on internal work artifacts used as Phase 4 research (§13)
  — none of those source artifacts are ever in this repo, only the vocabulary
  and verified counts extracted from them

## If you ever need to remove it again

If Milan changes his mind, removing the file from the working tree is not
enough — it stays recoverable in git history indefinitely from this point
(`a3ef2be` onward) unless that history is deliberately rewritten (e.g.
`git filter-repo` + a force-push), which is destructive and needs his
explicit go-ahead, done carefully, and communicated to anyone who has
cloned or forked the repo since.

## Working without it

Everything the pack authorised for publication is already in the repo:

| What | Where |
|---|---|
| Case-study copy and numbers | `src/content/work/*.md` |
| Experience timeline | `src/content/experience/*.md` |
| LinkedIn recommendations (verbatim) | `src/content/recommendations/*.md` |
| Service offers | `src/content/services/*.md` |
| Identity, links, proof metrics | `src/site.config.ts` |

The **site** builds and deploys fine without ever reading this file directly
— nothing in `src/` imports it. What the pack gives you that the site
doesn't is the audit trail: which facts are cleared for publication, the
sanitisation flags, and outstanding launch blockers. Read it before doing
content work even though it's no longer strictly required to build.

## Related private assets

Raw originals that are not needed by the build (recommendation screenshots, the
unused 9:16 photo) live outside the repo at:

```
../Portfolio-private-assets/
```

They are not required to build, deploy, or edit the site.
