# Skill: verify-site

How to prove a change works before committing it. Required for EVERY
user-visible change (copy, layout, styles, new pages); the build-only gate
is enough for pure content-collection edits with no layout impact.

## The one command

```bash
bash scripts/agent/verify.sh
```

It runs, in order: production build → preview server on :4321 (killing
strays first) → screenshots of the 5 main pages (mobile 390×844 dark+light,
desktop 1440×900 dark) into `.agent-out/` → internal link check → cleanup.
It ends with `RESULT: PASS` or `RESULT: FAIL — <reason>`.

## Your job after it passes

`RESULT: PASS` proves the site builds and links resolve. It does NOT prove
the change looks right — **open the screenshots in `.agent-out/` and look
at the ones for the page you changed.** Check:

- The changed element shows the new state (not the old one — if it shows
  the old one, you screenshotted a stale server or forgot to rebuild).
- Nothing overlaps, clips, or overflows at mobile width.
- Both themes look right if you touched anything with color.

Then show the relevant screenshot(s) to the owner and get approval BEFORE
raising a PR — owner approval on visual changes is a hard gate
(skills/release-manager.md §3).

## If it fails

| RESULT: FAIL says | Do |
|---|---|
| build failed | `skills/troubleshoot-build.md`; full log in `.agent-out/build.log` |
| preview server never became ready | `cat .agent-out/preview.log`; usually a port/kill issue |
| screenshot failed … playwright | one-time setup: `npx playwright install chromium` |
| N broken internal link(s) | the broken hrefs are printed above the RESULT line — fix the links, not the checker |

## Manual spot-check (when the owner wants to look live)

```bash
npx astro preview --port 4321   # then open http://localhost:4321
# afterwards ALWAYS: lsof -ti :4321 | xargs kill
```
