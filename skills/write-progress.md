# Skill: write-progress

The session-end ritual. Binding — a session isn't finished until this is
done (it's what lets the next session continue without you).

## 1. Append to PROGRESS.md

One entry per session, added at the END of the file, in the same commit as
your change (or its own `docs:` commit if you're closing a session without
code changes):

```markdown
### YYYY-MM-DD — <short title of what this session did>
- <what changed, with file paths / PR numbers>
- <why — one line, especially for owner decisions made this session>
- <how it was verified — build, verify.sh, screenshots, live check>
```

3–8 bullets. Facts only — no plans (plans go in STATE.md). Convert
relative dates ("yesterday") to absolute (2026-07-29).

## 2. Check rotation

```bash
wc -l PROGRESS.md
```

Over ~400 lines → rotate per agent/memory.md Layer 2 (move oldest entries
to `docs/progress-archive/<year>-H<1|2>.md`, leave a one-line stub).

## 3. Rewrite agent/STATE.md

Rewrite — do not append. Keep it ≤60 lines, only what is true NOW:

- Production: what's live, last tag, anything untagged.
- In flight: open branches/PRs and their state.
- Next tasks: the top 1–5, in priority order.
- Blocked / needs owner: anything you couldn't do, with one-line reasons.
- Standing owner decisions: carry forward, prune ones that stopped
  mattering.

Update the "Last rewritten" date at the top.

## 4. Leave the machine clean

```bash
lsof -ti :4321 | xargs kill 2>/dev/null   # stray preview servers
git status --short                         # nothing accidentally uncommitted?
```

Anything intentionally uncommitted → say so in STATE.md "In flight".
