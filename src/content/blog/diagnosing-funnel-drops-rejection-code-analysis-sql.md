---
title: 'Diagnosing a funnel drop with rejection-code analysis — a SQL walkthrough'
description: 'Conversion fell and nobody knows why. A practical SQL method for finding exactly which stage, segment, and constraint is losing you applicants — with a ranked, fixable list instead of a hypothesis.'
pubDate: 2026-07-28
draft: false
---

"Our conversion rate dropped" is a symptom, not an address. Most funnel reporting stops there: a line chart went down, a meeting gets scheduled, and everyone leaves with a different theory.

The useful question is narrower: **which stage, for which segment, because of which constraint — and how much recoverable volume sits behind each one?** Rejection-code analysis answers it. This is the method I used to lift portfolio qualification from 30% to 43% across [six lending partners](/work/lifting-qualification-30-to-43/), and it works on any funnel that records *why* it says no — loan applications, KYC, signups, checkout, claims.

## Step 1 — make the funnel say no out loud

You cannot diagnose a funnel that only records outcomes. Every stage that rejects, filters, or drops someone must write down a *reason*, not just a status.

If your events table looks like this, you are ready:

```sql
-- one row per applicant per stage attempt
SELECT applicant_id, stage, status, rejection_code, occurred_at
FROM funnel_events
LIMIT 5;
```

If it doesn't — if rejections land as a bare `status = 'rejected'` — that instrumentation gap is the first fix, and it usually costs a few days of engineering, not a quarter. In rules-engine systems (lending, insurance, eligibility), the reasons already exist inside the engine; they just need to be logged where analysts can query them.

## Step 2 — find the stage that eats the most volume

Start wide. Count how many unique applicants survive each stage, in order:

```sql
SELECT
  stage,
  COUNT(DISTINCT applicant_id) AS reached,
  ROUND(100.0 * COUNT(DISTINCT applicant_id)
    / FIRST_VALUE(COUNT(DISTINCT applicant_id))
      OVER (ORDER BY MIN(stage_order)), 1) AS pct_of_top
FROM funnel_events
GROUP BY stage
ORDER BY MIN(stage_order);
```

You are looking for the biggest *step-down*, not the smallest number. A stage that keeps 90% of a huge base can still be losing more absolute volume than a stage that keeps 40% of a trickle.

## Step 3 — rank the reasons at that stage

This is the heart of the method. Group the rejections at the leaking stage by code, and rank by lost applicants:

```sql
SELECT
  rejection_code,
  COUNT(DISTINCT applicant_id) AS lost_applicants
FROM funnel_events
WHERE stage = 'offer_generated'
  AND status = 'rejected'
GROUP BY rejection_code
ORDER BY lost_applicants DESC;
```

The distribution is almost always brutally concentrated: a handful of codes carry most of the loss. That top of the list *is* your ranked list of fixable constraints — the deliverable that turns "we lose most applicants somewhere" into a work queue.

## Step 4 — segment before you conclude

A code that looks small in aggregate can be catastrophic for one segment. Cut the same ranking by whatever dimensions actually differ in behaviour — new vs. returning, acquisition channel, geography, product variant:

```sql
SELECT
  segment,
  rejection_code,
  COUNT(DISTINCT applicant_id) AS lost_applicants,
  RANK() OVER (PARTITION BY segment
               ORDER BY COUNT(DISTINCT applicant_id) DESC) AS rank_in_segment
FROM funnel_events e
JOIN applicants a USING (applicant_id)
WHERE e.stage = 'offer_generated' AND e.status = 'rejected'
GROUP BY segment, rejection_code
QUALIFY rank_in_segment <= 3;
```

In the lending case, this cut is what surfaced the real finding: a large band of applicants was *passing* the credit policy and then being rejected anyway, because the offer amount the system generated fell below the product's minimum ticket. Passing borrowers, rejected on a threshold — invisible in the aggregate pass rate, obvious in the code ranking.

## Step 5 — price each constraint before fixing anything

Not every top code deserves a fix. For each one, estimate the *recoverable* volume: of the applicants lost to this code, how many would plausibly convert if the constraint moved? Sometimes the answer is a policy change (in our case, a new smaller-ticket offer band recovered a rejected segment outright). Sometimes it's a data-quality fix. Sometimes the code is doing exactly its job and the right decision is to leave it alone.

The output that gets funded is a table, not a chart: *code → applicants lost → plausible recovery → owner → effort*. Ranked. That's what turns analysis into a lift you can measure afterwards — which is the only proof that the diagnosis was right.

## The checklist

- Every rejecting stage logs a **reason code**, queryable by analysts
- Stage-by-stage counts to find the biggest **absolute** step-down
- Rejection codes at that stage, **ranked by lost applicants**
- The same ranking **cut by segment** before drawing conclusions
- Each top code **priced for recoverable volume** and assigned an owner
- The lift **re-measured** on the same definition after the fix ships

The domain changes; the funnel math doesn't.
