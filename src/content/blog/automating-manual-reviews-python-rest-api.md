---
title: 'Automating manual review work with Python and a REST API'
description: 'How to turn a recurring manual review process into a monitored Python pipeline — exception-first design, API pagination and rate limits, and why the goal is routing human attention, not removing humans.'
pubDate: 2026-07-28
draft: false
---

Every operations team has one: a recurring review task someone does by hand, every week, forever. Pull the records, check each one against criteria, note the problems, file the report. It's important enough that it can't be skipped and boring enough that nobody questions it.

That shape of work — *fetch, evaluate against rules, flag exceptions* — is precisely what a small Python pipeline does better than a person. I used this pattern to [eliminate 80% of a manual vendor-risk review workload](/work/killing-manual-vendor-reviews/); the same design applies to compliance checks, data-quality reviews, listing audits, reconciliations. Here's the method, including the parts that are less obvious than the code.

## The design decision that matters: exceptions reach humans, everything else doesn't

The naive automation replaces the manual report with an automated report — the human still reads everything. The correct automation inverts it: the pipeline evaluates **every** record and a human sees **only the ones that fail a rule**.

That inversion is where the 80% comes from. It also changes the job from tedious to genuinely senior: the human now spends their time on judgment calls, not scanning.

```python
def review(record: dict) -> list[str]:
    """Return the list of rules this record violates. Empty = clean."""
    flags = []
    if record["status"] in WATCHLIST_STATUSES:
        flags.append("status_on_watchlist")
    if record["last_assessed"] < cutoff_date:
        flags.append("assessment_stale")
    if record["score"] is None:
        flags.append("missing_score")   # data problem, not a risk problem
    return flags

exceptions = [(r["id"], review(r)) for r in records]
exceptions = [(rid, f) for rid, f in exceptions if f]
```

Note the third flag: **a missing value is an exception too.** Silent gaps are how automated reviews quietly rot — anything the pipeline couldn't evaluate must surface, not skip.

## Talking to the API like a pipeline, not a script

Most review data lives behind a vendor or internal REST API, and the difference between a script that works once and a pipeline that works every week is four boring things:

- **Pagination, completely.** Loop until the API says there is no next page, and *log the total fetched*. A pipeline that silently processes page one of twelve produces confident, wrong reports.
- **Rate limits, respectfully.** Back off on `429`s and retry with jitter. A pipeline that gets your API key throttled on Mondays is not automated; it's flaky.
- **Idempotency.** Running it twice must not double-report or double-write. Key every output on the record ID and run date.
- **A run log.** Fetched N, evaluated N, flagged K, errored E — written somewhere a human can check. When (not if) a run misbehaves, this log is the difference between a five-minute diagnosis and a lost afternoon.

```python
log.info("run=%s fetched=%d evaluated=%d flagged=%d errors=%d",
         run_date, len(records), evaluated, len(exceptions), errors)
```

## Rules belong in config, not in code

The review criteria will change — thresholds move, statuses get added. If every change needs a code deploy, the pipeline's real owner becomes the engineering backlog. Keep rules as data (a YAML/JSON file, a config table), keep the evaluator generic, and the analyst who owns the review can own the rules too.

This is the same principle as [treating policy as code](/work/policy-as-code/): versioned, reviewable, testable — but editable by the people accountable for it.

## Prove it before you trust it

Run the pipeline and the manual process **in parallel for a full cycle**. Every record where the human and the pipeline disagree is either a bug in your rules (fix it) or an undocumented rule the human was applying from experience (write it down — these are gold; they're the criteria nobody knew the process had).

Only when the diff is empty — or every difference is explained and accepted — does the manual process retire.

## What good looks like

- A human reviews **exceptions**, not the population
- Anything the pipeline couldn't evaluate is itself an exception
- Pagination totals, rate-limit handling, idempotent writes, run logs
- Review rules live in **config**, owned by the review's owner
- A parallel-run diff of zero before cutover, and a monitored schedule after

The point was never to remove people from the review. It's to stop spending people on the part a `for` loop can do.
