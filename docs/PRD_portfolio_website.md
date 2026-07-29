# PRD — Milan Behera: Portfolio & Freelance Lead-Gen Website

**Version:** 1.3 (content pack added as single source of truth; sanitization updated to public-resume rule; case-study slate finalized)
**Date:** 27 July 2026
**Owner:** Milan Behera
**Builder:** Claude (phased, multi-model — see §9)
**Hosting:** GitHub Pages (free), custom domain deferred to post-launch

---

## 1. Purpose & Goals

A single website that works in two directions:

1. **Freelance lead generation (primary).** Convince companies and founders — in any domain — to book a call for data analytics consulting (SQL, Snowflake, dashboarding, funnel/metric analysis, root-cause analysis). Fintech/lending is the flagship proof of depth, not a fence: the site must make clear the same toolkit applies to any business with data, given docs, metric definitions, and a short KT.
2. **Recruiter credibility (secondary).** Act as a living resume for remote/full-time data analytics roles across domains, with credit risk analytics as the standout specialization.

**Success metrics (post-launch, 90 days):**
- ≥ 2 qualified inbound leads (call booked or serious email inquiry)
- Lighthouse: Performance ≥ 95, Accessibility ≥ 95, SEO = 100 (mobile)
- Content update round-trip (edit → build → deploy) achievable by a local LLM following repo docs, with zero human code edits

**Explicit non-goals (v1):** e-commerce, CMS/admin panel, login, comments, newsletter backend, WebGL/3D scenes, blog posts (structure only).

---

## 2. Audience & Positioning

- **Primary persona A:** Founder / Head of Analytics at *any* data-generating business (e-commerce, SaaS, marketplaces, D2C, ops-heavy companies) who needs analytics done — funnel diagnostics, metric definitions, dashboards, data QA, RCA — without a full-time hire.
- **Primary persona B (highest-converting subset):** Founder / Head of Credit / Head of Analytics at an NBFC, fintech lender, or MSME-lending platform, where Milan's track record is deepest.
- **Secondary persona:** Recruiter / hiring manager screening for data analytics roles (any domain) or credit-risk analytics roles specifically. Wants a scannable resume, tools list, and proof of impact in < 60 seconds.

**Positioning statement (draft, refine in Phase 4) — "specialist depth, generalist range":**
> "Data analyst. I turn messy operational data into decisions — funnels, metrics, root causes, dashboards. Deepest in lending and credit risk; the method transfers to any domain with docs, metric definitions, and a short KT."

**Framing rule (binding for all copy):** never say "I can analyze anything" — that reads generic. Instead: lead with the *method* (SQL-first, hypothesis-driven, outcome-measured), prove it with lending case studies, and state transferability explicitly ("the domain changes; the funnel math doesn't"). Case studies each end with a one-line "Where else this applies" note mapping the technique to other industries (e.g., loan funnel leakage ↔ e-commerce checkout leakage; BRE rule benchmarking ↔ pricing/eligibility rule audits anywhere).

**Voice:** Direct, numerate, calm. Every claim carries a number or an artifact. No buzzword salad.

---

## 3. Site Map & Page Requirements

### 3.1 Home (`/`)
- **Hero:** full-viewport editorial statement in large display type (Studio Freight register). Leads with "Data Analyst" identity + method line; specialization tags as a secondary row ("Deepest in: Lending & Credit Risk · SQL/Snowflake · Funnels & RCA"). Primary CTA: **Book a call**. Secondary: **View case studies**.
- **Proof strip:** 3 headline metrics (e.g., "73 rules benchmarked across 3 lenders", "X% funnel leakage identified", "N policy experiments monitored"). Numbers sanitized per §7.
- **Featured case studies:** 2–3 cards → case study pages.
- **Services teaser:** 3 service categories → Services page.
- **Footer:** contact links, LinkedIn, GitHub, email, resume download.

### 3.2 Case Studies (`/work/`, `/work/[slug]/`)
- Index page: filterable-by-tag list (SQL, Funnel, Policy, Dashboard).
- Detail template, strict structure: **Context → Problem → Approach → What I built → Outcome (numbers) → Tools → Where else this applies** (one line mapping the technique to other domains, per §2 framing rule).
- 4 launch case studies (raw material in content pack §5):
  1. **Flagship (depth):** Lifting portfolio qualification 30%→43% — BRE funnel monitoring, drop-off & rejection-code analysis across 6 lenders.
  2. **Depth:** Lender policy benchmarking (73 rules, 3 lenders, 5 policy paths) and/or new-lender lift RCA (risk-signal overlap) — merge if needed.
  3. **Range:** Eliminating 80% of manual vendor risk reviews via REST API pipeline (Quinte/GRC — non-lending-core proof).
  4. **Range (versatility clincher):** The Oven Vibe — founder-built SKU-margin analytics for a D2C bakery; links to the live site.
- v1.1 candidates: EWI/delinquency dashboard story; Snowflake anomaly-detection infra.
- Visuals: recreated/abstracted charts (not raw employer screenshots) + generic Tableau dashboard shots where safe.

### 3.3 Services (`/services/`)
- 3–4 offers, framed **domain-agnostic** with lending as the worked example in each:
  - Funnel & conversion diagnostics (any funnel: signup, checkout, loan qualification → disbursal)
  - Metrics, dashboards & data QA (Snowflake/SQL/Tableau — definitions, monitoring, anomaly detection)
  - Rules & policy analytics (eligibility/pricing/risk rule benchmarking — flagship: lending BRE work)
  - Root-cause analysis on metric movements
- **"How I ramp on a new domain" block:** short, concrete section (docs → metric definitions → KT call → first analysis in week 1) — this directly answers the versatility claim with a process instead of an assertion.
- Engagement models (project / retainer / audit). No public pricing in v1.
- CTA: Book a call.

### 3.4 About (`/about/`)
- Bio + professional photo. Tools grid (SQL, Snowflake, Tableau, Python, Excel, Git).
- **Recommendations:** LinkedIn recommendations re-typed as styled pull-quotes with name/title + link to LinkedIn profile for verification. *No screenshots* (unreadable on mobile, looks low-effort).

### 3.5 Resume (`/resume/`)
- Recruiter-optimized page: experience timeline, skills, education. Scannable in 60 seconds.
- Downloadable PDF (kept in `/public/`, generated separately; repo docs explain how to replace it).

### 3.6 Contact (`/contact/`)
- Cal.com inline embed (primary conversion path) + Web3Forms/Formspree form fallback + direct email link.

### 3.7 Blog (`/blog/`) — structure only
- Content collection + list/detail templates + RSS wired up; hidden from nav until the first post exists (nav item appears automatically when ≥ 1 published post).

---

## 4. Tech Stack (locked)

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Astro 5** (static output) | Near-zero JS, typed content collections, GitHub Pages-perfect, predictable file structure for local-LLM maintenance |
| Language | TypeScript (strict) | Frontmatter schemas fail loudly on bad edits |
| Styling | **Tailwind CSS v4** + design tokens as CSS variables | Utility discipline; tokens centralized in one file |
| Components | Astro components; React islands **only if unavoidable** | Minimize hydration; v1 target: zero React |
| Motion | **Lenis** (smooth scroll) + CSS scroll-driven animations / small vanilla IntersectionObserver reveals | Studio Freight feel without GSAP/WebGL weight; `prefers-reduced-motion` respected everywhere |
| Fonts | Fontshare/Fontsource self-hosted — characterful grotesk display + quiet body face (final pair chosen in Phase 2) | No third-party font requests |
| Forms | Web3Forms (free) | No backend |
| Scheduling | Cal.com free tier, inline embed | Highest-converting CTA |
| Analytics | Umami Cloud (free) or GoatCounter | Lead-source attribution, no cookie banner needed |
| SEO | astro-seo + sitemap + robots + OG image per page + JSON-LD (Person, ProfilePage) | Recruiters google you; make it count |
| CI/CD | GitHub Actions: build → Lighthouse CI budget check → deploy to Pages | Regressions blocked at PR time |
| Repo | Public GitHub repo (the repo itself is a portfolio artifact) | Clean commits, real README |

**Explicitly excluded:** Next.js, WebGL/Three.js, GSAP, CMS, databases, React state libraries, localStorage-dependent features.

---

## 5. Design Direction

**Reference register:** Studio Freight, Dragonfly Redux (awwwards editorial/corporate tier). We take: oversized display typography, editorial grid, generous whitespace, smooth scroll, restrained scroll reveals, confident section rhythm. We **do not** take: WebGL scenes, shaders, cursor-chasing effects, heavy preloaders.

**Principles (binding for Phase 2/3):**
- Typography carries the identity. Display face used at genuinely large sizes (hero measured in viewport units), tight tracking, deliberate weight contrast with body face.
- The subject is **lending data**. Structural devices should encode that: metric callouts typeset like ledger figures, case studies structured like an analysis memo, tags like rule labels. No decoration that doesn't mean something.
- **One signature element**, decided in Phase 2 (candidate: a "funnel" motif — the hero or case-study index visualizes qualification → offer → disbursal as a typographic/graphic device). Everything else stays quiet.
- Motion budget: one orchestrated hero load-in, scroll reveals on section entry, micro-interactions on links/cards. Nothing loops forever. `prefers-reduced-motion` disables all of it.
- Avoid AI-default palettes (cream + terracotta serif; near-black + acid green; broadsheet hairlines). Phase 2 must propose a palette argued from the subject and reject anything that reads templated.
- Quality floor: visible keyboard focus, WCAG AA contrast, semantic HTML.

**Responsive & multi-device requirement (binding — see §5.1):** the site must feel first-class on mobile, tablet, and desktop alike, not desktop-first with mobile as an afterthought.

### 5.1 Device matrix & responsive rules

- **Design mobile-first.** Most recruiter and lead traffic arrives from LinkedIn on a phone; the mobile experience is the primary experience.
- **Breakpoint targets:** 360px (small Android), 390–430px (modern phones), 768px (tablet portrait), 1024px (tablet landscape / small laptop), 1280–1536px (desktop), 1920px+ (large desktop — content max-width capped, no stretched lines).
- **Fluid, not stepped:** type and spacing scale with `clamp()` between breakpoints; the oversized display typography must remain oversized *proportionally* on phones without breaking words or overflowing.
- **Touch-first interactions:** tap targets ≥ 44px, no hover-only affordances (every hover effect has a visible non-hover state), Lenis smooth scroll must not fight native touch scrolling (disabled or native-passthrough on touch devices).
- **No horizontal scroll at any width ≥ 320px.** Tables/wide artifacts (case-study charts) get scroll containers or stacked layouts.
- **Layout integrity:** nav collapses gracefully (accessible menu, no jank), footer/CTA reachable and usable on every device, Cal.com embed and forms verified on mobile Safari and Android Chrome specifically.
- **Performance parity:** Lighthouse targets in §1 apply to **mobile** scoring (the stricter one), not desktop.
- **Acceptance:** Phase 6 QA includes a device pass at 360 / 390 / 768 / 1024 / 1440 / 1920 widths plus one real phone and, if available, one real tablet. Any page failing the pass blocks launch.

Phase 2 delivers a **design-tokens file + type scale + 2 concept directions** (as static mockups) for Milan to pick from before any page is built.

---

## 6. Maintainability Contract (local-LLM operations)

The repo must be operable by a small local model (Qwen-coder class) for content changes. Binding requirements:

1. **`README.md`** — human-oriented: what this is, how to run, how to deploy.
2. **`AGENTS.md`** at repo root — machine-oriented entry point. Contains: repo map, "to change X → edit file Y" table, forbidden zones (never edit `src/components/**` or config for content changes), verification command (`npm run build`), rollback instruction (`git checkout -- <file>`).
3. **`/skills/` directory** with task-scoped instruction files, each self-contained:
   - `update-case-study.md`, `add-case-study.md`
   - `update-metrics.md` (homepage proof strip)
   - `update-resume.md`, `replace-resume-pdf.md`
   - `update-services.md`, `update-about.md`, `add-blog-post.md`
   Each file: exact path(s), frontmatter schema with a filled example, validation step, common failure modes.
4. **All prose/content in markdown or a single `site.config.ts`** — no strings hard-coded inside components. Zod-validated frontmatter so a wrong field name fails `npm run build` with a readable error.
5. Deploy is `git push` → Actions does the rest. No manual steps.

Acceptance test for this section: a fresh LLM session given only `AGENTS.md` + one skill file can add a case study that builds and deploys, touching nothing else.

---

## 7. Content & Sanitization Rules (binding)

- **Public-resume rule:** any fact already on Milan's public resume/LinkedIn is publishable verbatim (lender names Jupiter/Lendbox/Cashtree/Caprion/Kinara/GetVantage, the 30%→43% qualification lift, ₹8–9B portfolio, 100K+ borrowers). The content pack (§11) marks each item ✅/⚠️/⛔.
- **Still ⛔ private regardless:** internal table/schema names, query text revealing internal logic, dashboard screenshots with live counts, un-rounded internal metrics, anything not already public.
- Metrics beyond the public set stay rounded/bucketed ("70+ rules", "~41 net-new users") — directionally true, not audit-precise.
- Recreate charts from abstracted data rather than exporting employer artifacts.
- LinkedIn recommendations used as typed quotes with attribution and consent assumed via their public visibility; link to source.
- **Owner action:** Milan verifies his employment agreement permits freelancing/moonlighting before the Services page goes live; if unclear, Services ships as "advisory & consulting" framing with no active solicitation language.

**Content Milan must supply (Phase 0):** bio (raw notes fine), professional photo, 3–4 case study raw write-ups (bullet points fine — Phase 4 turns them into prose), metrics list, LinkedIn recommendation texts, resume PDF, Cal.com account + Web3Forms key.

---

## 8. Build Phases

| Phase | Deliverable | Exit criteria |
|---|---|---|
| **0. Content prep** (Milan + Claude chat) | Content pack complete: assets checklist (pack §9) done, discrepancy log (pack §8) resolved | All ⚠️ flags resolved; photo, recommendations, resume PDF, Cal.com & Web3Forms keys in hand |
| **1. Architecture** | Repo scaffold: Astro 5 + Tailwind v4 + TS strict, content collections with Zod schemas, CI workflow, `AGENTS.md` + `/skills/` skeletons, empty page routes | `npm run build` green; deploys to `milanbeherazyx.github.io` showing a stub |
| **2. Design system** | Tokens (color/type/space), font pair, motion spec, signature element, **2 mockup directions** for home hero + case-study card | Milan picks a direction; tokens file locked |
| **3. Build-out** | All pages/components per §3, responsive per §5.1 device matrix, motion implemented, blog structure wired | Every page renders with placeholder content at all §5.1 widths with no horizontal scroll; Lighthouse (mobile) ≥ 90 all categories |
| **4. Content & copy** | Case studies written, bio, services copy, metadata/OG, resume page | All placeholder text gone; sanitization checklist passed |
| **5. Ops & docs** | Finished `AGENTS.md` + all skill files, Lighthouse CI budgets, sitemap/robots/JSON-LD, analytics wired, 404 page | Local-LLM acceptance test (§6) passes |
| **6. QA & launch** | Cross-device pass per §5.1 acceptance, a11y audit, link check, perf tuning | §5.1 device pass green on all pages; success-metric thresholds (§1) met; DNS plan documented for future custom domain |

---

## 9. Model & Effort Allocation (token-efficiency plan)

Principle: spend expensive tokens where decisions compound; cheap tokens where the spec is already exact.

| Phase | Model | Effort | Why |
|---|---|---|---|
| 1. Architecture | **Fable 5** | High | One-shot, highest leverage; schema and repo-structure mistakes compound through every later phase |
| 2. Design system | **Fable 5** or **Opus 4.8** | Medium–High | Taste-heavy, low volume; mockups are cheap to regenerate but the token file is load-bearing |
| 3. Build-out | **Sonnet 4.6** | Standard | High volume, fully specified by Phases 1–2; Sonnet excels at spec-following frontend work |
| 4. Content & copy | **Opus 4.8** | Medium | Voice and persuasion are the actual conversion mechanism |
| 5. Ops & docs | **Sonnet 4.6** (docs) + **Haiku 4.5** (config/boilerplate) | Low | Mechanical; Haiku for YAML/config, Sonnet for the skill files since they must be precise |
| 6. QA & fixes | **Sonnet 4.6** | Low–Standard | Iterative small diffs |

**Session hygiene rules:**
- Each phase starts a fresh session seeded with: this PRD + the phase's exit criteria + only the files it needs. Never carry a full history forward.
- Phase 1 output must be precise enough that Phase 3 is transcription, not invention — that is the single biggest token saver.
- The repo's own `AGENTS.md` doubles as the context primer for every later Claude session, not just the local model.

**Skills to load per phase (Claude-side):** `frontend-design` for Phases 2–3; `skill-creator` for authoring the repo's `/skills/` files in Phase 5.

---

## 10. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Employer conflict over freelancing | §7 owner action before Services goes live; sanitization rules binding |
| Awwwards-style motion tanks Lighthouse | Motion budget capped (§5); Lighthouse CI blocks regressions in PRs |
| Local LLM breaks the site editing content | Zod schemas fail builds loudly; `AGENTS.md` forbidden zones; rollback instruction in every skill file |
| GitHub Pages base-path bugs (`/repo/` vs root) | Deploy to `milanbeherazyx.github.io` user site (root path); custom domain swap documented for later |
| Content never gets written (common portfolio failure) | Phase 0 is a hard gate — no Phase 3 start until content pack exists |

---

## 11. Content Pack (single source of truth for copy)

All biographical facts, metrics, experience details, case-study raw material, skills, education, and publish-safety flags live in **`content_pack.md`**, which travels with this PRD into every phase.

**Binding rules:**
- Phase 4 (content & copy) writes **from the content pack only** — no invented facts, numbers, dates, or claims. If something is missing, it goes on the pack's "Assets Still Needed" list, not into the copy.
- The pack's ✅/⚠️/⛔ publish-safety flags override any stylistic preference: ⛔ items (phone number, home address, internal artifacts) never appear on the site in any form.
- The pack's **Discrepancy Log** must be fully resolved by Milan before Phase 4 begins — cross-source inconsistencies (dates, policy counts) are credibility killers when leads verify against LinkedIn.
- The pack is copied into the repo at `/content-pack/content_pack.md` in Phase 1 so later Claude sessions and the local LLM reference it without re-uploading. Because the repo is public and the pack contains ⛔ items, it is **git-ignored** and kept locally / in the phase-session context only.
- When Milan's facts change (new role, new metric), the content pack is updated *first*, then the site — never the reverse.

## 12. Open Items (decide before Phase 1)

1. ~~Repo name~~ — **Confirmed:** `milanbeherazyx.github.io` (user site under github.com/milanbeherazyx, root path).
2. Umami Cloud vs GoatCounter for analytics.
3. Case study #4 in or out of launch scope.
4. Font direction preference, if any, before Phase 2 proposes pairs.
