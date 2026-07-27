# PROGRESS

## Current phase: 2 (Design system) — deliverables built; BLOCKED on Milan's direction pick (exit gate).

## Phase checklist (from PRD §8)

- [x] **Phase 0 — Content prep** (Milan + Claude chat) — DONE 2026-07-28
  - Deliverable: Content pack complete: assets checklist (pack §9) done, discrepancy log (pack §8) resolved
  - Exit criteria: All ⚠️ flags resolved; photo, recommendations, resume PDF, Cal.com & Web3Forms keys in hand
  - **Owner-approved deferrals:** Cal.com account + Web3Forms key deferred to the contact-page build (Phase 3/4); Claude provides setup guides then. Not blockers for Phases 1–2.
- [x] **Phase 1 — Architecture** — built 2026-07-28; deploy pending repo creation
  - Deliverable: Repo scaffold: Astro 5 + Tailwind v4 + TS strict, content collections with Zod schemas, CI workflow, `AGENTS.md` + `/skills/` skeletons, empty page routes ✅
  - Exit criteria: `npm run build` green ✅ (`astro check` + build, 8 pages); deploys to `milanbeherazyx.github.io` showing a stub ✅ (live 2026-07-28, HTTP 200, Actions workflow green)
- [ ] **Phase 2 — Design system**
  - Deliverable: Tokens (color/type/space), font pair, motion spec, signature element, 2 mockup directions for home hero + case-study card
  - Exit criteria: Milan picks a direction; tokens file locked
- [ ] **Phase 3 — Build-out**
  - Deliverable: All pages/components per PRD §3, responsive per §5.1 device matrix, motion implemented, blog structure wired
  - Exit criteria: Every page renders with placeholder content at all §5.1 widths with no horizontal scroll; Lighthouse (mobile) ≥ 90 all categories
- [ ] **Phase 4 — Content & copy**
  - Deliverable: Case studies written, bio, services copy, metadata/OG, resume page
  - Exit criteria: All placeholder text gone; sanitization checklist passed
- [ ] **Phase 5 — Ops & docs**
  - Deliverable: Finished `AGENTS.md` + all skill files, Lighthouse CI budgets, sitemap/robots/JSON-LD, analytics wired, 404 page
  - Exit criteria: Local-LLM acceptance test (PRD §6) passes
- [ ] **Phase 6 — QA & launch**
  - Deliverable: Cross-device pass per §5.1 acceptance, a11y audit, link check, perf tuning
  - Exit criteria: §5.1 device pass green on all pages; success-metric thresholds (§1) met; DNS plan documented for future custom domain

## Session log

<!-- date / what was done / what's next / open questions -->

### 2026-07-27
- **BLOCKED: waiting on Phase 0 assets & decisions from Milan** (content_pack.md §8 + §9). Nothing here can be produced by the agent.
- Needed to close Phase 0:
  - [ ] Professional photo (one primary + one casual optional)
  - [ ] LinkedIn recommendation texts (typed, with names/titles)
  - [ ] Final resume PDF (post discrepancy fixes)
  - [ ] Cal.com account + "30-min intro call" event type
  - [ ] Web3Forms access key
  - [ ] Decision: Axos Bank name usage (pack §4 flag)
  - [ ] Decision: policy count — 7+ vs 20+ (pack §8.3)
  - [ ] Decision: PhysicsWallah dates — resume vs LinkedIn (pack §8.1)
  - [ ] Decision: Omdena presented as one engagement (pack §8.2)
  - [ ] Decision: analytics — Umami Cloud vs GoatCounter (PRD §12.2)
  - [ ] Decision: case study #4 in or out of launch scope (PRD §12.3)
  - [ ] Optional: font direction preference before Phase 2 (PRD §12.4)
- Note: PRD §10 hard-gates only Phase 3 on Phase 0 ("no Phase 3 start until content pack exists"). Milan may explicitly authorize starting Phase 1 (Architecture — needs no personal content) while Phase 0 assets are gathered. Phase 1 recommended model per PRD §9: **Fable 5, HIGH effort / extended thinking**.

### 2026-07-28 — Phase 0 complete
- **Done:** Received & processed all Phase 0 assets. Photos (1:1 + 9:16; 3:4/16:9 on request). Four LinkedIn recommendations transcribed verbatim into content_pack.md §10, priority-ordered (Sean Tonthat → Ziba Atak → Ndambuki Jane → Dr. Aleena Baby). Final resume PDF received and text-verified; adopted **"resume PDF is truth"** rule — all §8 discrepancies resolved to resume values (PW Jan–Aug 2023; Omdena single engagement; **7+ policies**); LinkedIn alignment deferred to end-of-project flag list (pack §12). Axos Bank name: ✅ publishable. Raw assets (photos, resume PDF, screenshots) git-ignored.
- **Open decisions made:** none beyond the above; Milan deferred Cal.com + Web3Forms setup to the phase that needs them (setup guides owed then).
- **Still open (non-blocking, PRD §12):** analytics (Umami vs GoatCounter — needed by Phase 5); case study #4 in/out of launch (pack recommends IN — needed by Phase 4); font preference (optional, Phase 2).
- **What Phase 1 needs:** nothing from Milan. GitHub repo `milanbeherazyx.github.io` creation/settings will be needed to *deploy* the stub — Claude must ask before any account/repo action (gate).
- **Next model (PRD §9):** Phase 1 Architecture → **Fable 5, HIGH effort / extended thinking**.

### New discrepancy found (flag for end of project)
- Upwork engagement (Jan 2023 – Apr 2024, on LinkedIn) is **not on the final resume PDF**. Site may still show it (public on LinkedIn). Decide at Phase 6 whether to add to PDF (pack §8.6).

### 2026-07-28 — Phase 1 (Architecture) built
- **Done:** Hand-written Astro 5 scaffold at repo root — Tailwind v4 (`@tailwindcss/vite` + `@theme` placeholder tokens), TS strict, `astro check` in the build. Five content collections with Zod schemas (`work`, `services`, `blog`, `recommendations`, `experience`) each with an ignored `_example.md` template. All §3 routes as stubs: `/`, `/work/` + `[slug]`, `/services/`, `/about/`, `/resume/`, `/contact/`, `/blog/` + `[slug]` + RSS, `404`. Blog auto-appears in nav at ≥1 published post. `site.config.ts` holds identity/nav/proof-strip (Cal.com + Web3Forms keys empty → mailto fallback). `AGENTS.md` (working skeleton), `README.md`, 8 `skills/*.md` stubs. CI: build on PR, build+deploy to Pages on main. Content pack copied to `/content-pack/` (verified git-ignored). `npm run build` **green**, 8 pages.
- **Decisions made (PRD left open):** collection for resume timeline named `experience` (md-per-role, display-string dates); recommendations as md-per-quote collection; empty-collection builds emit warnings (accepted until Phase 4 adds content); `astro check` included in `npm run build` so type errors also fail loudly; workflow runs plain `npm ci && npm run build` instead of `withastro/action` (transparent, same result).
- **Deploy completed 2026-07-28:** Milan created the repo + signed `gh` into `milanbeherazyx` (machine SSH key belongs to `milanbehera-ai` work account → repo uses HTTPS remote with gh credential helper). Both commits' author rewritten from work identity to `Milan Behera <milanbeherazyx@gmail.com>` before first push; repo-local git identity set to personal. Pages `build_type` switched from legacy branch mode to `workflow` via API. Stub verified live (200, correct title).
- **What Phase 2 needs:** Milan's font-direction preference (optional, PRD §12.4); everything else is on disk. Deliverable: tokens + font pair + motion spec + signature element + 2 mockup directions; Milan picks one.
- **Next model (PRD §9):** Phase 2 Design system → **Fable 5 or Opus 4.8, MEDIUM–HIGH effort**.

### 2026-07-28 — Phase 2 (Design system) deliverables built
- **Done:** `design/DESIGN.md` (shared foundations: fluid type scale, spacing, motion spec, signature element "the Funnel Ledger") + two static mockups of hero/proof/case-cards, screenshot-verified at 1440px and 390px (3 responsive bugs found & fixed via screenshots):
  - **Direction A — "Underwriter's Memo"** (`design/direction-a.html`): light editorial; cool document white / ink / ultramarine (stamp ink) / carmine (red pen, data-only); Clash Display + Switzer.
  - **Direction B — "System of Record"** (`design/direction-b.html`): dark terminal-calm; console blue-black / bone / EWI amber / signal red (data-only); Cabinet Grotesk + General Sans + mono data voice (JetBrains Mono when self-hosted).
- **Signature element (shared):** qualification funnel as typographic ledger — stage rows, oversized tabular figures, proportional bars, delta annotations; red strictly = drop-off/rejection semantics.
- **BLOCKED: waiting on Milan's pick (A or B)** — the pick locks palette + font pair + surface treatment. On pick: write tokens into `src/styles/global.css` `@theme`, self-host fonts (zero third-party requests), archive the other direction. Mockups use Fontshare CDN for preview only.
- **What Phase 3 needs:** the pick above; then build-out is transcription of PRD §3 + DESIGN.md + chosen mockup.
- **Next model (PRD §9):** Phase 3 Build-out → **Sonnet 4.6, standard effort**.
