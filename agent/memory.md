# memory.md — how this repo's memory works

Three layers. Each has one job and one growth rule. Violating the growth
rules is how small-context agents drown — treat them as binding.

## Layer 1 — agent/STATE.md (working memory)

- WHAT: the current snapshot — version on prod, open PRs, in-flight work,
  next tasks, blockers. What a teammate would need to take over tomorrow.
- RULE: **≤ 60 lines, REWRITTEN (not appended) at every session end.**
  Delete anything no longer true. STATE.md answers "what is true NOW",
  never "what happened".
- Read at every session start (bootstrap step 3).

## Layer 2 — PROGRESS.md (episodic log)

- WHAT: append-only dated entries — what changed, why, how verified.
  Written per skills/write-progress.md at session end.
- RULE: **read only the tail (`tail -40`)**, never the whole file.
- ROTATION: when the file exceeds ~400 lines
  (`wc -l PROGRESS.md`), move the OLDEST entries into
  `docs/progress-archive/<year>-H<1|2>.md` (create it if missing), leaving
  a one-line stub in place, e.g.:
  `- 2026-H1 entries (v1.0.0 → v2.0.0) → docs/progress-archive/2026-H1.md`
  Rotation is a normal commit that ships with whatever else you're doing.

## Layer 3 — skills/ + agent/ (semantic memory / procedures)

- WHAT: how to do things. Updated whenever reality changes (a new edge
  case, a changed CI behavior) — stale procedures are worse than none.
- RULE: **no skill file over ~150 lines.** You need bootstrap + router +
  one skill + the actual diff to fit in a small context window together.
  If a skill outgrows that, split it the way release-manager.md /
  release-recovery.md are split, and add a router row for the new file.
- When you learn a durable lesson mid-task (an error and its fix, a gotcha),
  put it in the matching skill file IN THE SAME PR — one or two lines, in
  the file's existing style.

## What memory is NOT for

- Facts about Milan → only `content-pack/content_pack.md`.
- Code structure → the code and `AGENTS.md` repo map.
- Anything derivable from `git log` → don't duplicate it.
