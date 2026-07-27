---
title: 'Funnel & conversion diagnostics'
summary: 'Find where a multi-step funnel leaks, which segment it leaks worst for, and what it is worth to fix — with a ranked list, not a hypothesis.'
order: 1
draft: false
---

Most funnel reporting tells you the conversion rate fell. That is a symptom, not an address. Useful diagnostics answer a narrower question: *which* stage, for *which* segment, because of *which* constraint — and how much recoverable volume sits behind each one.

The method is stage-level instrumentation plus segmentation on the dimensions that actually differ in behaviour, then ranking losses by recoverable volume so effort goes where the money is.

**Worked example — lending.** Six partner lenders, 100K+ monthly borrowers, portfolio qualification stuck around 30%. Segmenting drop-off by user tag, verification path, and new-versus-renewal, then ranking rejection reason codes by affected borrowers, turned a vague loss into a fixable list. Qualification reached 43%.

The same shape applies to a checkout, a signup flow, KYC and onboarding, or claims triage. The domain changes; the drop-off math does not.
