---
title: 'Lifting portfolio qualification 30% → 43% across six lenders'
summary: 'BRE funnel monitoring, drop-off and rejection-code analysis across the full lender stack.'
tags: ['Funnel', 'SQL']
featured: true
order: 1
draft: false
metrics:
  - value: '30% → 43%'
    label: 'qualification rate'
  - value: '6'
    label: 'lenders monitored'
  - value: '100K+'
    label: 'monthly borrowers'
whereElseThisApplies: 'Any multi-step conversion funnel: signup, checkout, KYC, claims.'
tools: ['SQL', 'Snowflake', 'Tableau']
---

*Placeholder — Phase 4 writes the full memo prose from `content_pack.md` §5. Structure and headings below are final.*

## Context

Khatabook's BRE stack spans 7+ lender-specific eligibility policies across six underwriting partners (Jupiter, Lendbox, Cashtree, Caprion, Kinara, GetVantage), processing 100K–125K monthly borrower applications.

## Problem

Portfolio qualification sat at ~30% — a meaningful share of applications were dropping out of the funnel, but it wasn't clear where or why across a multi-lender stack.

## Approach

Funnel monitoring instrumented at every rule stage; drop-off and rejection reason codes analyzed per lender.

## What I built

Executive dashboards and automated SQL-driven KPI reporting on Snowflake, tracking approval funnels, drop-offs, and rejection codes for Risk, Product, Lending, and Collections teams.

## Outcome

Qualification rate lifted from 30% to 43% across the lender stack.

## Tools

SQL, Snowflake, Tableau.
