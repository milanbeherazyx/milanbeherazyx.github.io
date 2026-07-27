---
title: 'Metrics, dashboards & data QA'
summary: 'Agreed metric definitions, dashboards people actually use to decide things, and validation that fails loudly when the numbers are wrong.'
order: 2
draft: false
---

Most dashboard problems are definition problems wearing a visualisation costume. If two teams compute "active user" or "delinquency rate" differently, no amount of chart polish will make the dashboard trustworthy — and an untrusted dashboard is an unused one.

So the work starts with definitions, agreed and written down, then builds monitoring on top: the metric, its owner, its refresh, and the validation that catches it when it breaks. Data QA is part of the build, not a later phase — checks at ingestion so bad data fails visibly rather than flowing quietly into a number someone will act on.

**Worked example — lending.** Executive dashboards over a ₹8–9B+ loan book with early-warning delinquency tracking across 100K+ active loans and 15+ DPD stages, plus automated recurring SQL reporting for Risk, Product, Lending and Collections, with UAT and sanity coverage.

Typical stack: SQL, Snowflake, SQL Server, Tableau.
