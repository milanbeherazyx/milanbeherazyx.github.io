---
title: 'Policy as code: 112 rules, 200+ variants, six lenders'
summary: 'Six partners, six written credit policies, one rules engine. Turning prose policy documents into versioned, testable, executable configuration — and keeping them honest with an automated regression harness.'
tags: ['Policy', 'SQL', 'Tooling']
featured: true
order: 2
draft: false
metrics:
  - value: '200+'
    label: 'policy variants configured'
  - value: '112'
    label: 'distinct decision rules'
  - value: '119'
    label: 'decision variables'
whereElseThisApplies: 'Any domain where written rules must become executable ones: insurance underwriting, pricing and discount engines, benefits and entitlement eligibility, compliance controls, feature entitlement. The translation problem — prose to deterministic logic, with tests — is identical.'
tools: ['JSON', 'Java', 'Python', 'SQL', 'Snowflake']
---

## Context

Each lending partner and Khatabook jointly agree a written credit policy: a document describing who is eligible, on what terms, with which exceptions. That document is the contract. It is also prose — and prose does not make lending decisions.

Somebody has to turn it into configuration a rules engine will execute identically for every one of a hundred thousand borrowers a month, for six partners at once.

## Problem

Translating a policy document into executable rules is where lending programmes quietly break. The failure modes are specific:

- **Mistranslation.** A misread threshold or an `and` that should be an `or` rejects thousands of fundable borrowers, or funds borrowers the partner never agreed to. Neither is discovered quickly.
- **Segment explosion.** One partner does not have one policy. It has a policy per borrower situation — first-time versus renewal, standard versus geo-expansion areas, non-physically-serviceable locations, dormant users, previously de-whitelisted users, borrowers evaluated on bank statements, users on iOS, low-vintage cohorts. Each needs its own variant with its own overrides.
- **No safety net.** Without automated verification, the only way to know a policy change behaved correctly was to ship it and watch production.

## Approach

Treat policy as source code: readable, reviewable, versioned, and tested before deploy.

The pipeline runs in four stages, each in the language that fits it:

**1 — Policy document → rule configuration (JSON).** Each clause becomes a rule: a decision variable, a comparison operator, and a threshold. Rules are then composed into a boolean expression that mirrors the document's logic, including its exception paths and override branches.

**2 — Configuration → policy stack (Java).** Rules alone do not decide anything; the routing does. The stack determines which policy variant a given borrower is evaluated against — roughly eighteen distinct borrower segments per partner, each with its own fresh-loan and renewal paths.

**3 — Commercial terms (SQL).** Partner configuration and the risk-band-to-tenure and pricing mappings are versioned as SQL migrations, so terms move through the same reviewed, revertible path as everything else.

**4 — Verification (Python).** A regression harness replays a synthetic borrower profile against every partner at once and reports which policies passed, which failed, and *why*.

That last point is the one that mattered most. A rules engine natively reports a pass or fail against opaque rule identifiers. The harness de-references those identifiers back into readable conditions and rebuilds the boolean expression in human terms — so a result is explainable at a glance instead of requiring a manual lookup against the rule table.

## What I built

- **200+ policy variants** spanning the six partners, covering fresh and renewal journeys, geographic and serviceability segments, risk-band overrides and under-review states.
- A working vocabulary of **112 distinct decision rules** drawn from **119 decision variables** — bureau signals (delinquency histories across several lookback windows, enquiry counts, negative status codes, trade-line health), behavioural and transactional signals, repayment history on prior loans, and demographic criteria.
- **Segment routing** in the policy stack, mapping each borrower situation to its correct variant and override path.
- **Versioned SQL migrations** for partner configuration and risk-band pricing and tenure.
- A **multi-partner UAT harness** producing a cross-partner pass/fail summary with human-readable reasoning, so a policy change is validated against every partner before it ships.

## Outcome

A compact, deliberately reused rule vocabulary — 112 distinct rules — composes into 200+ partner-specific policy variants. That ratio is the point: shared rules mean a bureau signal is defined once and behaves identically everywhere, while partners still express genuinely different risk appetites through composition rather than through duplicated, divergent logic.

Policy changes ship with regression evidence attached, and a failed policy explains itself in the language of the credit policy document rather than in rule identifiers.

## Tools

JSON rule configuration, Java, Python, SQL, Snowflake.
