---
title: 'Removing 80% of manual vendor risk reviews with an ETL pipeline'
summary: 'Third-party vendor risk assessment was a recurring manual compliance workload. A Python pipeline against the vendor-risk API turned it into monitored data — with the exceptions, not the whole portfolio, reaching a human.'
tags: ['SQL', 'Tooling', 'Dashboard']
featured: false
order: 5
draft: false
metrics:
  - value: '80%'
    label: 'of manual reviews eliminated'
  - value: '+15%'
    label: 'audit scores'
  - value: '−20%'
    label: 'risk incidents'
whereElseThisApplies: 'Any recurring manual review fed by third-party data: supplier and counterparty due diligence, KYB refresh cycles, certification and licence expiry tracking, SLA monitoring. If people are re-reading the same external source on a schedule, the schedule is the bug.'
tools: ['Python', 'REST API', 'SQL Server', 'Tableau']
---

## Context

Regulated financial institutions must continuously assess the risk posed by their third-party vendors — and evidence that they did so. At Quinte Financial Technologies, that assessment covered the full vendor portfolio and was largely manual.

## Problem

The work was recurring, high-volume and low-variance: pull each vendor's current risk position from the third-party platform, check it against policy, record the outcome, repeat next cycle.

Three things follow from doing that by hand. It **does not scale** — cost grows linearly with vendor count. It is **inconsistent** — different reviewers weigh the same evidence differently, and consistency is precisely what an auditor tests. And it is **stale between cycles** — a vendor's risk position can change the day after review and go unnoticed until the next one.

## Approach

The reviews were not judgement work. They were data-retrieval work with a judgement step at the end — and only a minority of cases actually needed the judgement.

So: automate retrieval and validation for the whole portfolio, and route only genuine exceptions to a human.

The vendor-risk platform exposed a REST API, but its responses were deeply nested JSON — the kind of payload where an absent field and a null field mean different things, and quietly mishandling either corrupts a compliance record. Validation therefore had to be part of the pipeline, not an afterthought: schema conformance and completeness checks at ingestion, so bad data failed loudly instead of flowing silently into a report an auditor would later read.

## What I built

- A **Python ETL pipeline** against the vendor-risk REST API, handling nested JSON ingestion with explicit validation at the boundary.
- **Landing and modelling in SQL Server**, giving every assessment a timestamped, queryable history rather than a point-in-time document.
- **Rule-based monitoring** translating credit and compliance policy into executable validation logic, so exceptions were flagged by rule rather than spotted by eye.
- **Tableau dashboards** over the assessment data for Risk and Compliance stakeholders, plus the BSA Council regulatory reporting views.

## Outcome

- **80% of manual vendor risk assessments eliminated** — the portfolio is assessed continuously; humans see exceptions.
- **Audit scores improved 15%** and **risk incidents fell 20%**, both consequences of consistency: an executable rule applies identically every cycle, and it leaves an evidence trail by construction.
- **BSA Council regulatory dashboards** lifted processing efficiency 40% and data accuracy 35%.

## Tools

Python (ETL), REST API integration, SQL Server, Tableau.
