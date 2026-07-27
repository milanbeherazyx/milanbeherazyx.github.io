---
title: 'Bootstrapping a bakery on SKU-margin analytics'
summary: 'The Oven Vibe is a D2C bakery I built and run. Same analytical method as the lending work, applied to a business where I am also the one who has to live with the decisions.'
tags: ['Dashboard']
featured: false
order: 6
draft: false
metrics:
  - value: 'SKU-level'
    label: 'margin tracking'
  - value: 'Live'
    label: 'business, not a case exercise'
whereElseThisApplies: 'Small-business and early-stage unit economics anywhere: which products actually make money after true cost, and which customers are worth acquiring. The same question a marketplace asks about categories, or a SaaS company about plans.'
tools: ['Excel', 'Tableau', 'SQL']
---

## Context

[The Oven Vibe](https://theovenvibe.github.io/) is a direct-to-consumer bakery in Sundargarh that I founded and run. I built the business and its analytics — which means every conclusion here was one I had to act on with my own money.

## Problem

Small food businesses usually track revenue and rarely track margin per product. The two diverge more than owners expect: the best-selling item is frequently not the most profitable one, because ingredient cost, wastage and preparation time do not scale with popularity.

Alongside that, a physical D2C business faces a second question with real money attached — where to spend limited marketing effort. Getting that wrong is expensive in a way that is hard to see, because the counterfactual is invisible.

## Approach

The same discipline as any funnel or policy problem: define the metric properly before optimising it.

**Margin per SKU, computed honestly.** Not revenue minus headline ingredient cost, but cost-per-unit including the components small businesses habitually ignore. That reframes the product mix question from "what sells?" to "what earns?" — and those rank differently.

**Customer geography as a targeting input.** Rather than spreading campaigns evenly, cluster existing customers by location to find where demand already concentrates, and target campaign effort by footfall density instead of by intuition.

## What I built

- An **SKU-level margin dashboard** tracking sales trends, cost-per-unit, revenue contribution and margin per product — so mix decisions are made on contribution rather than on popularity.
- **Customer-cluster location analysis** driving footfall-density campaign targeting.
- The business itself, end to end: brand, product, operations and its [live storefront](https://theovenvibe.github.io/).

## Outcome

The bakery runs on its numbers rather than on impressions of how it is doing. Product decisions reference contribution margin; marketing spend follows demonstrated demand density.

Its real value here is as evidence: analytics is the same craft whether the subject is a ₹8–9B loan book or a bakery's daily bake list. Define the metric properly, measure it honestly, and let it change what you do. The scale changes; the method does not.

## Tools

Excel, Tableau, SQL.
