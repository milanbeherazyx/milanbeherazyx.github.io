---
title: 'Benchmarking 73 rules across three lenders — and why 2 more barely moved the needle'
summary: 'A rule-by-rule policy benchmark across five policy paths, plus the root-cause analysis on why adding two more lenders barely lifted qualification.'
tags: ['Policy', 'SQL']
featured: true
order: 2
draft: false
metrics:
  - value: '73'
    label: 'rules benchmarked'
  - value: '3'
    label: 'lenders, 5 policy paths'
  - value: '~41'
    label: 'net-new qualified users'
whereElseThisApplies: 'Pricing/eligibility rule audits in insurance, marketplaces, telecom — and vendor/channel overlap analysis anywhere (ad channels, supplier redundancy).'
tools: ['SQL', 'Excel', 'Snowflake']
---

*Placeholder — Phase 4 writes the full memo prose from `content_pack.md` §5. Structure and headings below are final.*

## Context

Three lenders, five distinct policy paths, 73 individual eligibility rules — each one a potential source of unnecessary rejection or under-benchmarked risk.

## Problem

Without a rule-by-rule comparison, it wasn't clear where lenders were needlessly stricter than peers, or how new lender additions actually interacted with the existing stack.

## Approach

Built a full 73-rule benchmark across the three lenders' five policy paths; separately ran root-cause analysis on why two newly added lenders lifted qualification by only ~41 net-new users.

## What I built

A rule-benchmark workbook and a quantified RCA identifying risk-signal overlap as the root cause of the muted lift.

## Outcome

73 rules benchmarked across 3 lenders; root cause of the ~41 net-new-user lift identified as risk-signal overlap between lenders.

## Tools

SQL, Excel, Snowflake.
