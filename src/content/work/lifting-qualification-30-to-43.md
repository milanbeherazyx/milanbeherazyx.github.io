---
title: 'Lifting portfolio qualification from 30% to 43%'
summary: 'Six lending partners, 100K+ monthly borrowers, and a funnel nobody could see inside. Rejection-code analysis turned "we lose most applicants somewhere" into a ranked list of fixable constraints.'
tags: ['Funnel', 'Policy', 'SQL']
featured: true
order: 1
draft: false
metrics:
  - value: '30% → 43%'
    label: 'portfolio qualification rate'
  - value: '6'
    label: 'lending partners'
  - value: '100K+'
    label: 'monthly borrowers'
whereElseThisApplies: 'Any multi-step funnel where a rules layer decides who continues — checkout and payment authorization, KYC and onboarding, insurance quote-to-bind, claims triage. The domain changes; the drop-off math does not.'
tools: ['SQL', 'Snowflake', 'Tableau', 'Excel']
---

## Context

Khatabook lends to small-business owners through a stack of partner lenders — Cashtree, Caprion, Lendbox, Jupiter, Slice and Western Cap. Every application runs through a business rules engine that decides which partners, if any, will make that borrower an offer. Around 100,000–125,000 borrowers pass through in a month.

Each partner brings its own credit policy, its own risk appetite, and its own definition of an acceptable borrower. A borrower rejected by one may be perfectly fundable by another.

## Problem

Roughly **30% of qualified applicants ended up with an offer**. The other 70% fell out somewhere between whitelisting and disbursal.

"Somewhere" was the problem. The funnel was measured end-to-end, so a drop showed up as a single number with no address. Nobody could answer the questions that actually lead to action:

- Which *rule* rejected this borrower — and was that rule doing useful risk work, or just being stricter than its peers?
- Which *segment* leaks worst: dormant users, organic signups, borrowers in non-physically-serviceable areas, users with no location data?
- Do video-verified borrowers behave differently from physically-verified ones?
- Are renewals leaking for the same reasons as first-time borrowers, or different ones?

Without those answers, every proposed policy change was an argument between opinions.

## Approach

I treated the rules engine as the unit of analysis rather than the funnel as a whole.

**Instrument every stage, then cut it four ways.** Drop-off was measured stage by stage and segmented by whitelist tag (dormant, organic, non-physically-serviceable, no-location), by verification path (physical vs video), by new vs renewal, and by business-as-usual vs retargeted leads. A leak that looks small overall is often severe inside one segment — and that is where the recoverable volume hides.

**Make rejection codes the primary evidence.** Every rejection carries a reason code. Aggregating those codes per lender turns a vague loss into a ranked list: *this* rule is the binding constraint for *this* many borrowers.

**Benchmark rules against their peers.** Once the binding constraints were ranked, the question became empirical rather than political. When several partners evaluate the same underlying credit signal at different strictness, the outlier is visible — and a proposal to move it can be argued with the population it would recover and the risk profile of those borrowers, not with an opinion.

## What I built

- **Funnel and drop-off monitoring** across the full path from whitelisting to disbursal, segmented as above, so every stage loss had an owner and a cause.
- **Rejection-code analysis** per partner, ranking rules by the volume of borrowers each one turned away.
- **Executive lending dashboards** covering the ₹8–9B+ portfolio, with early-warning-indicator delinquency tracking across 100K+ active loans and 15+ DPD stages — so the qualification push could never be evaluated on volume alone, only on volume *and* book quality.
- **Automated recurring SQL reporting** on Snowflake for the Risk, Product, Lending and Collections teams, with UAT and sanity-check coverage, replacing the manual pulls each team had been doing separately.

## Outcome

**Portfolio qualification rose from ~30% to ~43% across the lender stack** — reached through a sequence of individually small, individually measured policy corrections, not one large change. Each candidate rule was benchmarked, changed, then watched in the funnel and in the delinquency dashboards to confirm the recovered volume was not simply worse credit arriving through a loosened gate.

The durable outcome is the second-order one: rejection reasons became a standing, monitored dataset rather than a question someone asked once a quarter.

## Tools

SQL, Snowflake, Tableau, Excel.
