# G2 — v2 Design Direction Spec

Three built mockups, one shared motion/craft system. Milan picks ONE
direction (or a mix); G3 transcribes it across the whole site using the
`motion` library (via `src/scripts/motion-lib.ts`, reduced-motion safe).

Open in a browser:

| File | Direction | One-liner |
|---|---|---|
| `a-refined.html` | **A — Refined** (polish-only) | Current fonts & colors, executed to a $10k standard: choreography, depth, grain, springs |
| `b-private-ledger.html` | **B — Private Ledger** | Serif editorial, ivory + racing green + gilt: old-money banking gravitas |
| `c-signal.html` | **C — Signal** | Dark dev-tool luxe: glass, gradient hairlines, glow — the Linear/Vercel school |

All three demo REAL motion in the file (scroll down!): hero line-mask
reveal, scroll-linked funnel animation with count-up, animated proof
numbers, marquee, card hover physics.

## Shared craft system (ships in G3 whatever the pick)

**Motion choreography** (all honoring `prefers-reduced-motion`, budget per
PRD §5 — one orchestrated entrance, one signature scroll moment, micro-
interactions; nothing loops except the pausable marquee):

1. **Hero entrance** — headline lines reveal through a clip mask, staggered
   ~90ms; eyebrow + lead + CTAs rise after. Total ≤ 900ms, once.
2. **Signature scroll moment: the funnel** — bars grow from 0 to 30/43,
   numbers count up in tabular figures, the "+13 pts" stamp lands with a
   small spring (scale 1.08 → 1, slight rotate). Triggers once at ~40%
   in-view.
3. **Proof strip** — numbers count up on first reveal; rules draw in.
4. **Marquee** — tools/keywords strip, slow (~35s loop), pauses on hover,
   static under reduced-motion.
5. **Cards** — spring lift on hover (translateY + scale 1.01), arrow
   slides, 150–250ms; visible non-hover resting state (touch-first).
6. **Primary CTA** — sheen sweep on hover (never autoplaying).

**Depth & texture:**
- Multi-layer shadows (ambient + key) instead of single blurs.
- 1px inner light border on raised surfaces (`inset 0 1px 0` highlight).
- Fixed grain overlay at 2–4% opacity (SVG noise) so large flats don't
  read vector-empty. Direction B uses paper grain; C uses fine noise.
- One radial glow anchored to the hero (accent-colored, theme-aware).

**Typography details:** optical alignment on display lines, eyebrows in
tracked small caps/mono, annotated numerals (superscript footnote marks on
metrics linking to case studies), tabular figures everywhere data appears.

## Per-page upgrade plan (G3 scope, direction-agnostic)

| Page | Upgrade |
|---|---|
| Home | Full choreography above; case cards get feature treatment (first card larger, "01/02/03" indices); services teaser becomes hover-reactive list rows |
| Work index | Cards animate in with stagger; filter chips get press physics + count badges |
| Case study detail | Reading-progress hairline; section headings get anchored slide-reveals; metrics header counts up; "Where else" box gets accent treatment |
| About | Photo gets frame treatment (direction-specific); tools grid items cascade in; recommendation quotes get large hanging quote marks |
| Resume | Timeline draws its spine on scroll; entries cascade |
| Contact | Form fields get focus glow; submit button sheen |
| 404/Thanks | Same system, small scale |

**Not changing in any direction:** IA/routes, copy, the theme toggle
mechanism, Lighthouse budgets (CI gate unchanged — perf ≥85 floor, targets
≥95), zero React, accessibility guarantees (axe must stay clean).

## The three directions

### A — Refined (recommendation)
Identity untouched: Clash Display + Switzer + JetBrains Mono; ultramarine
(light) / EWI amber (dark). 100% of the budget goes to the craft system
above. Rationale: the brand is already distinctive (the generic-database
check in G2 research confirmed default recommendations are *blander* than
what we have); expensive = execution, and this direction has zero
re-branding risk with recruiters/leads who've already seen the site.

### B — Private Ledger
Display font swaps to a high-contrast serif (Boska; Fontshare, self-hostable
like our current pair). Palette: ivory paper / near-black ink / **racing
green** accent + restrained gilt details (light); deep green-black / ecru /
brass (dark). Hairline double-rules, small-caps eyebrows, engraved-ledger
character. Motion is quieter — fades and draws, no springs. Reads: private
bank, wealth desk, underwriting heritage. Risk: leans "finance institution"
more than "hands-on analyst"; furthest from current brand.

### C — Signal
Dark-led dev-tool luxe. Display: General Sans; mono does more labeling
work. Near-black canvas, **indigo→violet gradient** accent with cyan data
highlights, glass cards (backdrop-blur), gradient hairline borders, subtle
border-beam on the featured card, spotlight hover. Light mode = clean
white + indigo (toggle still honored). Reads: modern data platform,
Linear/Vercel school. Risk: the most fashionable = the fastest to date, and
the closest to current AI-startup visual cliché (mitigated here with
editorial layout + real data moments, but the risk is real).

## Decision needed from Milan

1. Pick **A, B, or C** (or "A's motion with B's/C's palette" — mixes are
   buildable; say what you liked).
2. Anything in the mockups to dial up or down (grain, glow, marquee,
   spring intensity)?
