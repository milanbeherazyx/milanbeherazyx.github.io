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

## ⚠️ Open decision — needed before G2 starts

**Does v2 keep the locked brand (Clash Display + Switzer, ultramarine/amber
hybrid theme) and spend its whole budget on craft — spacing, depth, motion,
detail — or is a rebrand on the table?**

Recommendation standing: **keep the brand**, spend the budget on execution
quality. Not yet answered — G2 cannot start until this is.

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
- [ ] **G1 — Foundations** — next. Waiting on Milan to say go (and switch
      model if desired — Sonnet/STANDARD is already active).
- [ ] **G2 — Design direction v2** — blocked on the open brand decision above.
- [ ] **G3 — Implementation**
- [ ] **G4 — QA, merge, release (tag v2.0.0)**

## Where the detail lives

- Git branching rules: `README.md` → "Branching"
- Content/editing rules: `AGENTS.md`, `skills/`
- v1 phase history: `PROGRESS.md`
- Locked design system (what G2 either keeps or replaces): `design/DESIGN.md`
