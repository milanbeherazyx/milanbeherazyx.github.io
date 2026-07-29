# bootstrap.md — session start ritual

Do these five steps IN ORDER at the start of every session, before touching
the task. Do not skip steps. Do not read files not listed here — big files
waste your context window.

## 1. Know the rules (30 seconds)

Read `AGENTS.md` (72 lines). It has the branch model, the repo map, the
forbidden zones, and the hard content rules. If you have read it earlier in
this same session, skip.

## 2. Know the current state

```bash
bash scripts/agent/status.sh
```

One screen: current branch, dirty files, sync state, open PRs, last deploy,
last tags. If the working tree is dirty with files unrelated to your task,
STOP — read agent/STATE.md to find out why before touching anything.

## 3. Know the recent history

```bash
cat agent/STATE.md        # working memory — what's in flight, what's next
tail -40 PROGRESS.md      # last session's log entry
```

NEVER `cat PROGRESS.md` whole — it is long and mostly irrelevant. The tail
is enough. Older history lives in `docs/progress-archive/` — only read it
if STATE.md explicitly points you there.

## 4. Route the task

Open `agent/router.md`. Find the row matching your task. Read the skill
file(s) it names — those instructions are binding. If NO row matches:
do not improvise. Add the task to agent/STATE.md under "Blocked / needs
owner" with one sentence on why, tell the owner, and stop.

## 5. Say the plan, then act

State in 1–2 sentences: what you will change, which branch you will cut,
and which skill you are following. Then do it.

---

**Session end** (as binding as session start): follow
`skills/write-progress.md` — append the PROGRESS.md entry, rewrite
agent/STATE.md, and make sure no stray preview servers are running
(`lsof -ti :4321 | xargs kill`).
