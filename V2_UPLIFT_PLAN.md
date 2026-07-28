# v2 Uplift Plan — "make it look like a $10k site"

Living plan doc for the post-v1.0.0 design/motion upgrade. Lives on
`develop` (not `main`) until the whole uplift is verified and merged, per
the branching model in README.md. Update the checkboxes as phases close —
this file is the answer to "what's next."

**Adds:** `motion` (npm animation library) + the `ui-ux-pro-max` design-
guidance skill (84 UI styles / 192 palettes / 74 font pairings / 98 UX
rules, local search, no network calls, MIT-scale project — vetted before
install) + 21st.dev as a **pattern reference only** — patterns get
re-implemented natively in Astro, never pasted in as React. **PRD §4's
zero-React target stays intact.**

**PRD amendments this uplift makes (owner-approved, both logged in
PROGRESS.md):**
- `motion` and a manual light/dark toggle both touch PRD §4's original
  scope (motion library choice; the toggle also amended the localStorage
  exclusion — already shipped in the polish round before v1.0.0).

## Brand direction — resolved 2026-07-29

**"Budget" above meant design effort, not money — this site costs nothing
to run.** Question was: keep the current fonts/colors and spend all the
effort on craft (spacing, motion, detail), or also consider changing the
look itself? Milan's answer: **show real options, don't decide blind.**

**G2 will produce at least three mockups:**
1. **Polish-only** — current fonts (Clash Display + Switzer) and current
   colors (blue accent in light mode, gold in dark), refined through
   spacing, layering, motion and detail. No identity change.
2–3. **One or two alternate directions** — different fonts and/or accent
   colors, if G2's research turns up something genuinely stronger.

Milan picks by looking at built mockups, same process as Phase 2's design
system pick. Nothing here is decided in the abstract.

## Phases

| # | Phase | What happens | Exit gate (Milan approves) | Model | Effort |
|---|---|---|---|---|---|
| **G0** | Git workflow | `develop` branch, branch protection on `main`+`develop`, CI runs on develop PRs, flow documented | Branch rules live; first PR proves the flow works | Sonnet | LOW |
| **G1** | Foundations | `npm install motion`; install `ui-ux-pro-max` skill (every written file reviewed before commit); thin motion utility (reduced-motion safe, coexists with Lenis) | Build green; skill files reviewed & committed; **no visual change yet** | Sonnet | STANDARD |
| **G2** | Design direction v2 | Taste phase: ui-ux-pro-max research + 21st.dev pattern hunting → per-page upgrade spec (hero choreography, cards, depth/texture, scroll storytelling, micro-interactions) + 1–2 static mockups | **Milan picks a direction — hard stop** | Fable 5 or Opus | **HIGH** |
| **G3** | Implementation | Transcribe the approved direction using `motion`; 2–3 feature PRs (home first, then work/detail pages, then the rest); each PR passes build + axe + toggle regression | Every page matches the approved mockups | Sonnet | STANDARD |
| **G4** | QA, merge, release | Full regression battery (axe 30 scans, 180-combo overflow matrix, 17 toggle tests, error sweep, Lighthouse all 15 pages), fix anything, PR `develop` → `main`, tag `v2.0.0` | All suites green; Milan approves the merge to `main` | Sonnet | LOW–STANDARD |

**Rule, unchanged from the start of this plan:** after every phase, report →
full stop → Milan switches `/model` at his own pace → he says go for the
next phase. No phase begins on its own.

## Status

- [x] **G0 — Git workflow** — done 2026-07-29. `develop` created, branch
      protection proven (a direct push was tested and correctly rejected),
      flow documented in README/AGENTS.md/CLAUDE.md.
- [x] **G1 — Foundations** — done 2026-07-29. `motion` installed (zero new
      vulnerabilities). `ui-ux-pro-max` skill installed and vetted — the
      installer bundled 6 unrequested skills (one calling the Gemini API,
      one shadcn/React-oriented), all removed after flagging to Milan and
      getting his go-ahead to keep only `ui-ux-pro-max`. Thin reduced-
      motion-safe `motion` wrapper added at `src/scripts/motion-lib.ts`,
      **not wired into any page yet** — zero visual change. **Backlog item
      found, not fixed here:** 17 pre-existing npm audit vulnerabilities in
      `astro`/`@lhci/cli`; fixing needs a major Astro 5→7 upgrade, too big
      for a foundations phase — separate deliberate decision later.
- [x] **G2 — Design direction v2** — done 2026-07-29. Three built mockups
      (`design/v2/`): A "Refined" (polish-only), B "Private Ledger" (serif
      editorial), C "Signal" (dark dev-tool luxe). **Milan picked C.**
      3 real bugs found and fixed via screenshot testing before showing
      Milan: unclipped glow causing mobile overflow, non-wrapping navs at
      narrow widths, illegible gradient-on-gradient CTA band in dark mode.
- [ ] **G3 — Implementation** — in progress. Direction C tokens (dark-led:
      console `#0b0c10`, indigo/violet gradient `#6366f1→#a855f7`, cyan
      `#22d3ee` secondary accent, General Sans + Switzer + JetBrains Mono)
      replace Direction A's tokens in `src/styles/global.css` — this is a
      real identity change, not additive. Sub-PRs: (1) tokens/fonts +
      shared components (header/footer/funnel/proof/cards) + Home, (2)
      Work index + case study detail, (3) remaining pages + polish.
  - [x] **G3-1** — tokens/fonts/shared components/Home. Merged (PR #9).
        2 real bugs caught by verification: a CSS cascade-layer bug where
        `.btn-gradient`'s unconditional `display` silently overrode
        Tailwind's `hidden md:inline-block` on the header CTA; a WCAG AA
        contrast failure on the mockup's literal `#6366f1` (fixed to
        `#4338ca` light / `#818cf8` dark). Both fixed and re-verified.
  - [x] **G3-2** — Work index + case study detail. Merged (PR #10).
        Work index: gradient-pressed filter chips with per-tag counts,
        press physics, staggered glass-card reveal. Case study detail:
        reading-progress hairline, section-heading slide-reveals,
        rule-draw-in metrics (not digit count-up — same reasoning as
        `ProofStrip`: values are approved compound strings like
        "30% → 43%"), glass "Where else this applies" box, gradient CTA.
        8/8 Playwright checks pass (overflow, axe wcag2a/2aa/21a/21aa,
        console/page errors) across both pages × both themes ×
        desktop/mobile; filter interaction verified against displayed counts.
  - [ ] **G3-3** — remaining pages (Services, About, Resume, Contact, Blog,
        404/Thanks) + polish.
- [ ] **G4 — QA, merge, release (tag v2.0.0)**

## Where the detail lives

- Git branching rules: `README.md` → "Branching"
- Content/editing rules: `AGENTS.md`, `skills/`
- v1 phase history: `PROGRESS.md`
- Locked design system (what G2 either keeps or replaces): `design/DESIGN.md`
