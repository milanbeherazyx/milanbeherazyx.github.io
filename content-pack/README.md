# content-pack/

This directory is where `content_pack.md` lives — the single source of truth for
every fact and number on the site (PRD §11).

**The pack itself is deliberately NOT in git, and must never be committed.**

## Why it can't be committed

This repo is public. The pack contains:

- ⛔ Milan's phone number and a home-address reference
- ⛔ Lender names that are not authorised for publication
- The **discrepancy log** — working notes about mismatches between Milan's
  resume and LinkedIn. Not secret, but actively harmful to publish: it would
  advertise inconsistencies in his own public record to anyone who reads it.

Committing it would leak all three into a repo that is itself a portfolio piece.

## Restoring it on a new machine

After cloning this repo, copy the pack in from wherever you keep it:

```sh
cp /path/to/your/content_pack.md content-pack/content_pack.md
```

Keep the master copy somewhere private and synced — iCloud/Drive, a private
gist, or a password manager's secure notes. Do **not** rely on this repo as its
backup, because it is not one.

## Working without it

Everything the pack authorised for publication is already in the repo:

| What | Where |
|---|---|
| Case-study copy and numbers | `src/content/work/*.md` |
| Experience timeline | `src/content/experience/*.md` |
| LinkedIn recommendations (verbatim) | `src/content/recommendations/*.md` |
| Service offers | `src/content/services/*.md` |
| Identity, links, proof metrics | `src/site.config.ts` |

So the **site** builds and deploys fine without the pack. What you lose without
it is the audit trail: which facts are cleared for publication, the sanitisation
flags, the discrepancy log, and the outstanding launch blockers. Restore it
before doing any content work.

## Related private assets

Raw originals that are not needed by the build (recommendation screenshots, the
unused 9:16 photo) live outside the repo at:

```
../Portfolio-private-assets/
```

They are not required to build, deploy, or edit the site.
