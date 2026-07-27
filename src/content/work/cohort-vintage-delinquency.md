---
title: 'Cohort and vintage delinquency monitoring for a US bank'
summary: 'Concurrent and ever-delinquency matrices, vintage curves and early-warning indicators for Axos Bank — turning a monthly regulatory reporting grind into a portfolio view that surfaces deterioration while it is still early.'
tags: ['Risk', 'Dashboard', 'SQL']
featured: true
order: 4
draft: false
metrics:
  - value: '+25–30%'
    label: 'delinquency prediction accuracy'
  - value: '−50%'
    label: 'regulatory reporting time'
whereElseThisApplies: 'Any book where accounts age and can deteriorate: subscription churn by signup cohort, accounts-receivable ageing, insurance claims development, warranty and returns curves. Cohort-versus-calendar reasoning is the transferable idea — compare like with like by age, not by date.'
tools: ['SQL', 'SQL Server', 'Tableau', 'Excel']
---

## Context

At Quinte Financial Technologies I worked on portfolio risk analytics for **Axos Bank**, a US commercial bank. The recurring question in any lending book is deceptively simple: *is credit quality getting better or worse?*

Calendar-month reporting answers that badly. A book that is growing quickly looks healthy on a headline delinquency rate simply because new, not-yet-delinquent accounts dilute the denominator. Deterioration hides inside growth.

## Problem

Two problems, one structural and one operational.

**The structural problem: the reporting could not distinguish "our lending is getting worse" from "we lent more recently".** A single portfolio-level delinquency percentage moves for reasons that have nothing to do with credit quality — mix, growth rate, seasonality. Acting on it means acting on noise.

**The operational problem: regulatory reporting consumed a large share of every monthly cycle.** Assembling the same figures by hand each month left little time for interpretation, and manual assembly is exactly where reporting errors enter.

## Approach

Stop measuring the portfolio by calendar date, and start measuring it by **account age**.

**Vintage cohorts.** Group accounts by origination month, then track each cohort's performance against months-on-book. Every cohort is compared at the same age, so an August cohort at month six is compared with a March cohort at month six. Deterioration in underwriting quality becomes directly visible as later cohorts tracking above earlier ones at the same maturity — usually months before it reaches the headline number.

**Concurrent versus ever delinquency.** These answer genuinely different questions and are routinely conflated:

- *Concurrent* — the share of a cohort sitting in a given delinquency bucket **right now**. This is the current state of the book, and it improves when borrowers cure.
- *Ever* — the share of a cohort that has **at any point** touched that bucket. This never improves, and it is the honest measure of underwriting quality, because it counts borrowers who went delinquent and recovered.

A cohort with low concurrent and high ever delinquency is one where collections are working but the credit decision was not. The opposite pattern means the opposite. Reported as a matrix — cohort against months-on-book, for each DPD bucket, in both concurrent and ever form — that distinction stops being invisible.

**Early-warning indicators.** Leading signals that move before an account books a formal delinquency, so intervention can happen while it still changes the outcome.

## What I built

- **Concurrent and ever-delinquency matrices** by DPD bucket across cohort and months-on-book, with cohort lifetime tracked side by side.
- **Vintage curves** comparing origination cohorts at equal maturity, making underwriting drift legible early.
- **Early-warning indicator monitoring** feeding proactive collections rather than post-hoc reporting.
- **Automated regulatory reporting** on SQL Server surfaced through Tableau, replacing recurring manual assembly.
- **Rule-based governance monitoring** translating credit and compliance policy into executable validation checks — the same policy-to-code discipline as my lending work, applied to controls.

## Outcome

- **Delinquency prediction accuracy improved 25–30%**, largely because cohort-and-age framing compares like with like where calendar aggregates could not.
- **Regulatory reporting time cut by 50%** across monthly cycles, moving effort from assembly to interpretation.
- Alongside the governance monitoring: **audit scores up 15%** and **risk incidents down 20%**.

## Tools

SQL, SQL Server, Tableau, Excel.
