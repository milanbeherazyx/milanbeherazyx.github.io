---
title: 'PolicyLens: making rule-engine policies readable — and editable — by analysts'
summary: 'Credit policies were stored as a table of rule identifiers plus a boolean expression referencing them — unreadable by eye. PolicyLens renders them as human logic, diffs two policies order-insensitively, and round-trips edits back into deployable configuration.'
tags: ['Tooling', 'Policy']
featured: false
order: 3
draft: false
metrics:
  - value: '12,700+'
    label: 'lines of Python'
  - value: '118'
    label: 'unit tests'
  - value: '2'
    label: 'front-ends, one shared core'
whereElseThisApplies: 'Any config-as-code system where the stored form is not the human form — feature flags, pricing and discount rules, access-control policies, tax and benefits logic. Wherever people hand-decode machine format to answer "what does this actually do?", the same tool shape applies.'
tools: ['Python', 'Flask', 'Streamlit', 'pytest', 'Snowflake']
---

## Context

In the rules engine, a policy is stored as two separate things: a table of rules, each with a generated identifier, and a boolean expression that references those rules only by identifier.

That format is excellent for machines and hostile to people. The expression that actually encodes the credit policy reads as a string of identifiers joined by `AND` and `OR` — logically complete, humanly meaningless.

## Problem

Every question an analyst genuinely needs to ask required manual decoding first:

- *What does this policy actually do?* Hand-join every identifier in the expression back to its rule row.
- *How does this partner's renewal policy differ from its fresh-loan policy?* Decode both, then compare by eye.
- *Did this change do what I intended?* Diff two machine formats where identifiers may have been regenerated and the same clauses may appear in a different order — so a purely textual diff reports differences that are not real.
- *Can I change the logic?* Editing meant hand-editing the rule table and the expression in lockstep, keeping identifiers consistent. Error-prone enough that people avoided it.

This is the tax that made policy review slow, and it was paid by every analyst, every time.

## Approach

The core insight: the machine format and the human format are two renderings of the same tree. Parse into an abstract syntax tree once, and both readable rendering and safe editing follow.

Making it **round-trip** — human-readable form back to valid deployable configuration — is what turns a viewer into a working tool. That requires reconciling edited logic against existing rule identifiers: matching rules that are unchanged, updating those whose values moved, minting identifiers for genuinely new clauses, and pruning rules the edit orphaned.

I built it as one core with two front-ends: a local desktop application, and a Streamlit edition that can be hosted internally so analysts use it without a local setup. Both import the same modules, so behaviour cannot drift between them.

## What I built

**Format.** Auto-detects four input shapes — a stored policy document, a verification-harness dump, a live rules-engine response, or a raw expression — and renders any of them as clean, indented boolean logic.

**Compare.** Three diff modes: side-by-side with word-level highlighting, unified, and a *logical* mode that is order-insensitive — shuffled `AND`/`OR` siblings are recognised as equivalent, so it reports only real differences and confirms outright when two policies are logically identical. The same decision variable is colour-matched across both sides.

**Edit.** Modify the readable expression — change operators, add or remove clauses, rename the policy — and get back valid deployable configuration. Underneath: three-pass identifier matching (exact, near-match with in-place value update, then freshly minted), automatic pruning of orphaned rules, a consistency check that flags the same identifier carrying conflicting definitions, and byte-identical preservation of stored metadata. Renaming a policy mints a new document identity so it cannot collide with the original on deploy.

**Validation and safety.** Flags missing identifiers, unused rules, duplicates and unknown operator codes. Inline syntax errors while editing, a diff preview of added, changed and removed rules before anything is copied out, and session undo/redo.

**Tested and self-contained.** 118 unit tests plus browser smoke tests across both front-ends. All assets vendored locally — it runs fully offline, with no external requests.

## Outcome

Reading a policy stopped being a decoding exercise. Comparing two policies became a diff that reports only genuine differences. Changing policy logic became an edit to readable boolean logic rather than careful surgery on an identifier table.

The wider point: the bottleneck was never analytical capability, it was a format that made straightforward questions expensive. Removing that tax was worth more than any single analysis it enabled.

## Tools

Python, Flask, Streamlit, pytest; deployable to a hosted Streamlit environment.
