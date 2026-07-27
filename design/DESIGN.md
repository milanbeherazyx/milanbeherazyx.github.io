# Phase 2 — Design system ✅ LOCKED (Milan, 2026-07-28)

**Final decisions:**
- **Identity: Hybrid** — one voice, two palettes. Typography from Direction A
  (Clash Display + Switzer) + JetBrains Mono data-labels from Direction B.
  Light mode = A's palette (ultramarine); dark mode = B's palette (EWI amber).
  Mode follows `prefers-color-scheme` — NO manual toggle (PRD §4 excludes
  localStorage). Reference mock: `iteration-2.html` (has a preview-only toggle).
- **Funnel treatment: Option 3 "Before/After"** — two bars (30/100 → 43/100)
  with a "+13 pts" stamp. Build exactly as in `iteration-2.html` FUNNEL 3.
- **Tokens locked** in `src/styles/global.css` (`@theme` + semantic vars with
  dark overrides). Fonts self-hosted in `/public/fonts/` (Fontshare ITF FFL +
  OFL), zero third-party requests.
- Originals `direction-a.html` / `direction-b.html` archived in `archive/`.

Everything below is the original proposal, kept for rationale.

---

Two directions, both built from the subject (lending data), sharing one
skeleton: same type scale, spacing, motion budget and signature element —
different material worlds. Open `direction-a.html` and `direction-b.html` in a
browser; resize to 390px to judge mobile. Milan picks ONE; its tokens then get
locked into `src/styles/global.css` `@theme` and the other is archived.

## Shared foundations (identical in both)

**Signature element — the Funnel Ledger.** The qualification funnel
(applied → qualified → dropped) rendered as stacked rows of oversized tabular
figures with proportional bars and a delta annotation. It is the site's one
bold device: hero centerpiece, echoed in miniature on case-study cards
(tag rows styled like BRE rule labels). It encodes the actual work — funnel
math on lending data — not decoration. Red appears ONLY as data semantics
(drop-off / rejection), never as decoration.

**Fluid type scale** (mobile-first, `clamp()`):
- `display`: clamp(2.6rem, 1rem + 7.5vw, 7.25rem) · line-height 0.92 · tracking −0.025em
- `h2`: clamp(1.6rem, 1rem + 2.2vw, 2.6rem)
- `lead`: clamp(1.05rem, 1rem + 0.4vw, 1.35rem)
- `body`: 1.0625rem · line-height 1.6
- `label`: 0.78rem · tracking +0.08em · uppercase (rule-label register)
- Figures always `font-variant-numeric: tabular-nums`.

**Spacing:** 4px base; section rhythm `clamp(5rem, 14vh, 9rem)`; content
max-width 72rem; no horizontal scroll ≥320px.

**Motion spec (budget per PRD §5):**
1. ONE orchestrated hero load-in: display lines rise 16px + fade, 80ms stagger,
   600ms ease-out; funnel figures count up once (600ms). Total ≤ 900ms.
2. Scroll reveals: sections fade + rise 12px once (IntersectionObserver,
   threshold 0.2, 500ms). No loops, no parallax.
3. Micro: link underline grows 150ms; cards lift 2px 200ms. Every hover state
   has a visible resting state (touch-first).
4. Lenis smooth scroll on `pointer: fine` only; native scrolling on touch.
5. `prefers-reduced-motion: reduce` disables all of the above (CSS gate + JS
   early return).

## Direction A — "Underwriter's Memo" (light, editorial)

The material world of lending decisions on paper: policy docs, credit memos,
the approval stamp, the red pen. Confident editorial white space; weight
contrast instead of hairlines (rules are few and thick, they mark section
starts like a memo header).

- Palette: `paper #F4F5F2` (cool document white — deliberately not cream) ·
  `ink #14161A` · `ultramarine #2B3FD6` (stamp/ledger ink — CTA, links,
  positive deltas) · `carmine #B42318` (underwriter's red pen — drop-off data
  only) · `graphite #5A6069` · `line #D9DCD6`
- Type: **Clash Display** (display, semibold/bold) + **Switzer** (body) —
  Fontshare, self-hosted in implementation.
- Case-study card: memo card — thick ink top rule, rule-label tag chips,
  metric set like a ledger figure.

## Direction B — "System of Record" (dark, terminal-calm)

The material world of monitoring risk on screen: Snowflake at month-end, EWI
dashboards, amber warning lights. Terminal register, but calm and editorial —
amber is argued from the subject (Early Warning Indicators), explicitly not
the acid-green hacker default.

- Palette: `console #101319` (blue-black of a dashboard at night) ·
  `bone #E9E7E1` · `amber #E8B04B` (EWI signal — CTA, highlights, deltas) ·
  `signal-red #E4574C` (drop-off data only) · `slate #8B93A1` · `grid #232833`
- Type: **Cabinet Grotesk** (display, extrabold) + **General Sans** (body) +
  monospace for data labels/eyebrows (mockup uses system mono; implementation
  self-hosts **JetBrains Mono**) — SQL is the native tongue of the work.
- Case-study card: grid card — mono header row like a table, amber metric.

## What the pick decides

Palette + font pair + surface treatment. Everything shared (scale, spacing,
motion, signature) is already settled. On pick: tokens written to
`src/styles/global.css` `@theme`, fonts self-hosted (Fontshare/Fontsource,
zero third-party requests), other direction moved to `design/archive/`.
