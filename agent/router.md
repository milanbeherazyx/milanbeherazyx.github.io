# router.md — task → skill routing table

Match your task against the rows below (top to bottom, first match wins).
Load EVERY file in the "Load" column before acting. "Run" scripts are
executed, not read.

| # | Task mentions… | Load | Run |
|---|---|---|---|
| 1 | branch, commit, push, PR, merge, release, deploy, ship | `skills/release-manager.md` | `scripts/agent/status.sh` |
| 2 | rollback, revert, broken production, bad release, rebase, merge conflict, CI failure | `skills/release-recovery.md` | `scripts/agent/status.sh` |
| 3 | tag, version bump | `skills/release-manager.md` §7 | `scripts/agent/release.sh <patch\|minor\|major>` |
| 4 | blog post (new) | `skills/add-blog-post.md` | — |
| 5 | case study (new) | `skills/add-case-study.md` | — |
| 6 | case study (edit) | `skills/update-case-study.md` | — |
| 7 | homepage metrics / proof strip | `skills/update-metrics.md` | — |
| 8 | resume timeline / experience | `skills/update-resume.md` | — |
| 9 | resume PDF file | `skills/replace-resume-pdf.md` | — |
| 10 | services copy | `skills/update-services.md` | — |
| 11 | about bio, recommendations | `skills/update-about.md` | — |
| 12 | any visual/UI/design/layout/CSS change | `skills/verify-site.md` + the content skill if any | `scripts/agent/verify.sh` |
| 13 | build fails, error message, astro check fails | `skills/troubleshoot-build.md` | — |
| 14 | dependencies, npm update, security audit | `skills/dependency-update.md` | — |
| 15 | session end, wrap up, log progress | `skills/write-progress.md` | — |
| 16 | status, where are we, what's pending | *(no skill)* | `scripts/agent/status.sh` |

## Always-on rules (apply to every row)

- Any change that will be committed ALSO goes through row 1
  (release-manager) — content skills only tell you WHAT to edit; the
  release-manager tells you how it ships.
- Before `git commit`, always: `bash scripts/agent/sanitize.sh` must print
  `RESULT: PASS`.
- `npm run build` must pass before any commit — no exceptions.
- Facts come from `content-pack/content_pack.md` only. Its ⛔ items never
  go in any committed file.

## No row matches?

Do NOT improvise. Write the task + why it doesn't fit into `agent/STATE.md`
under "Blocked / needs owner", tell the owner, stop. Examples that are
deliberately out of scope for a small model: redesigning components,
changing `src/components|layouts|pages|styles` beyond what a skill
explicitly allows, editing CI workflows, editing Zod schemas.
