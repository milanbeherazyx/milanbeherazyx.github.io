---
title: 'Policy as code: how to test credit policy changes before they ship'
description: 'A credit policy is a document; a rules engine executes configuration. The gap between them is where lending programmes quietly break. How to version, test, and regression-check policy changes like source code.'
pubDate: 2026-07-28
draft: false
---

A credit policy is a document. A rules engine executes configuration. Everything that goes wrong between those two artifacts happens quietly: a misread threshold, an *and* that should have been an *or*, a variant that was updated for one partner but not another. Nothing crashes. The engine just starts making decisions the policy never agreed to — rejecting fundable borrowers, or funding ones the partner never signed up for.

Without a safety net, the only way to know a policy change behaved is to ship it and watch production. In lending, that test costs real money in both directions. Here's the discipline that replaces it — the one I run across [112 rules and 200+ policy variants for six lenders](/work/policy-as-code/): treat policy as source code.

## Versioned: every change is a diff someone approved

Policy configuration — rules, thresholds, variant routing, commercial terms — lives in version control, not in a UI's save button. That buys you three things engineering has taken for granted for decades:

- **A diff.** "What exactly changes if we approve this?" has a precise, reviewable answer.
- **A history.** When a metric moves, "did policy change on that date?" takes one command to answer.
- **A rollback.** A bad change is a revert, not an archaeology project.

Even commercial terms — pricing bands, tenure mappings — deserve the same treatment: versioned migrations, moving through the same reviewed, revertible path as everything else.

## Readable: rules a human can argue with

Engines store rules in whatever form executes fast — identifier soup, boolean expressions over coded variables. That's fine for the engine and useless for the credit manager who has to confirm "this is what we agreed."

The fix is a translation layer that renders the executable rule back into policy language: variable names become the terms the document uses, the boolean tree becomes readable conditions. When [analysts can read — and safely edit — the rules themselves](/work/policylens/), policy review stops being a game of telephone between credit and engineering.

## Tested: replay borrowers, not opinions

The core of the safety net is a regression harness. Before any change ships:

1. **Build synthetic borrower profiles** that cover the policy's decision space — the clean approval, each rejection reason, the edge exactly on every threshold, the weird-but-legal combinations.
2. **Replay every profile against every policy variant** — old configuration and proposed.
3. **Diff the decisions.** Every borrower whose outcome changed is either the *point* of the change (expected, listed in the change request) or a defect (caught before production instead of after).

```text
policy_change: raise_min_score_variant_B
replayed: 1,214 profiles × 6 partners
decisions_changed: 38
  expected  (per change request): 35
  UNEXPECTED: 3  → variant_D inherited the change via shared rule R-114
verdict: BLOCKED — shared-rule impact not in the approved diff
```

That last line is the entire value of the system. Shared rules are what make policy stacks efficient — one bureau-signal definition reused across hundreds of variants — and also what make manual reasoning about a change impossible. The harness doesn't reason; it replays.

## Explainable: a failure names itself in policy language

A raw engine reports pass/fail against opaque rule identifiers. A useful harness de-references them: *this profile now fails because months-on-book < 6 in the renewal path of variant D*. Explainable results are what let a credit manager — not just an engineer — sign off on a change, and they're what make the inevitable production question ("why was this customer rejected?") answerable in minutes.

## The discipline, in one list

- Policy configuration **versioned**, changes shipped as reviewed diffs
- Rules **rendered readable**, so the accountable humans can verify them
- Every change **replayed** against a profile bank covering the decision space, across **all** variants — shared rules make "it only affects variant B" an assumption, never a fact
- Diffs **explained in policy language**, and unexpected decision changes block the release
- Production monitored for approval-rate movement after every ship, because no profile bank is complete

Prose doesn't make lending decisions; configuration does. Test the configuration like the source code it is, and the policy document stays what it was meant to be — the contract, honored.
