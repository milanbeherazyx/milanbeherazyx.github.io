---
title: 'A QA checklist for Tableau and Power BI dashboards people actually trust'
description: 'Most dashboard problems are definition problems wearing a visualisation costume. A practical QA checklist for Tableau and Power BI — metric definitions, reconciliation, refresh monitoring, and the tests that fail loudly.'
pubDate: 2026-07-28
draft: false
---

A dashboard has exactly one job: being trusted. The moment one number on it is caught wrong, every number on it is negotiable — and the org quietly goes back to exporting CSVs and arguing in spreadsheets.

Most dashboard problems are **definition problems wearing a visualisation costume**. If two teams compute "active user" or "delinquency rate" differently, no amount of chart polish will make the dashboard trustworthy. So dashboard QA starts before the first chart exists, and continues after launch — here is the checklist I use for Tableau and Power BI builds, developed maintaining [executive dashboards over a ₹8–9B+ loan book](/work/cohort-vintage-delinquency/).

## Before the build — definitions in writing

- **Every metric has a written definition**, agreed by the people who will argue about it later. Not a formula in a DAX file — a sentence a business owner signed off. "Active loan: disbursed, not closed, not written off, as of the report date."
- **Every metric has an owner.** When the number looks wrong at 9am, one named person decides whether it *is* wrong.
- **Grain is explicit.** Is a row a loan, a borrower, or a loan-month? Half of all reconciliation failures are two views silently aggregating at different grains.
- **Filters have a documented default state.** A dashboard that opens on "last full month, all segments" and a user who thinks they're seeing "yesterday" will disagree forever.

## During the build — make the data prove itself

- **Reconcile against the source of truth, to the row.** Pick three real entities (a loan, a customer, an order) and trace them from the source system to the dashboard tile. Totals matching is not enough — matching totals can hide two errors that cancel out.
- **Reconcile against the *previous* system.** If the dashboard replaces a manual report, run both for one full cycle and explain every difference. "New number is right, old one was wrong" is an acceptable explanation — but it has to be written down, or the old number wins the next argument.
- **Test the ugly slices**: null segments, the day a currency changed, the month with a data backfill, the entity with zero activity. Dashboards rarely break on the happy path.
- **Tabular numbers, consistent rounding, explicit units.** If one tile says 4.7% and another says 0.047, someone will screenshot the wrong one into a board deck.

## Data QA is part of the build, not a later phase

The checks that keep a dashboard trustworthy are the ones that run *without a human remembering to run them*:

- **Freshness**: alert when the underlying data hasn't refreshed on schedule — before a stakeholder notices.
- **Volume**: alert when today's row count deviates wildly from the trailing norm. Silent partial loads are the most common way dashboards lie.
- **Validation at ingestion**: bad data should fail loudly at the pipeline, not flow quietly into a number someone will act on.
- **Definition drift**: when an upstream schema or status enum changes, the metric's test should break in staging — not the metric in production.

## After launch — the part everyone skips

- **UAT with the actual users**, watching them use it. The gap between "what I built" and "what they think it shows" only surfaces when a real user narrates what they believe a tile means.
- **A visible "data as of" timestamp** on the dashboard itself. It converts "is this current?" support pings into silence.
- **A change log.** When a definition changes, the dashboard says so. Nothing destroys trust faster than a number that moved because of a silent redefinition.
- **Kill unused views.** Every stale, half-broken tab on the workbook taxes the credibility of the tabs that work.

## The one-line test

Would you let the CEO read any tile on this dashboard, unsupervised, and act on it? If any tile makes you flinch, that tile isn't done — and QA has told you exactly where to look.

An untrusted dashboard is an unused dashboard. The checklist is how you keep it neither.
