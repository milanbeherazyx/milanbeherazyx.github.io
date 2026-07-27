# PROGRESS

## Current phase: 2 (Design system) — not started. Phase 1 built; its deploy exit-criterion is BLOCKED on GitHub repo creation (see 2026-07-28 Phase 1 log).

## Phase checklist (from PRD §8)

- [x] **Phase 0 — Content prep** (Milan + Claude chat) — DONE 2026-07-28
  - Deliverable: Content pack complete: assets checklist (pack §9) done, discrepancy log (pack §8) resolved
  - Exit criteria: All ⚠️ flags resolved; photo, recommendations, resume PDF, Cal.com & Web3Forms keys in hand
  - **Owner-approved deferrals:** Cal.com account + Web3Forms key deferred to the contact-page build (Phase 3/4); Claude provides setup guides then. Not blockers for Phases 1–2.
- [x] **Phase 1 — Architecture** — built 2026-07-28; deploy pending repo creation
  - Deliverable: Repo scaffold: Astro 5 + Tailwind v4 + TS strict, content collections with Zod schemas, CI workflow, `AGENTS.md` + `/skills/` skeletons, empty page routes ✅
  - Exit criteria: `npm run build` green ✅ (`astro check` + build, 8 pages); deploys to `milanbeherazyx.github.io` showing a stub ⏳ **BLOCKED: waiting on Milan — GitHub repo `milanbeherazyx.github.io` must exist + Pages set to "GitHub Actions" + push authorized**
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
- **BLOCKED: waiting on GitHub repo creation** — exit criterion "deploys showing a stub" needs: (1) Milan creates public repo `milanbeherazyx/milanbeherazyx.github.io` (or authorizes `gh repo create`), (2) repo Settings → Pages → Source = "GitHub Actions", (3) authorize push of `main`.
- **What Phase 2 needs:** Milan's font-direction preference (optional, PRD §12.4); everything else is on disk. Deliverable: tokens + font pair + motion spec + signature element + 2 mockup directions; Milan picks one.
- **Next model (PRD §9):** Phase 2 Design system → **Fable 5 or Opus 4.8, MEDIUM–HIGH effort**.
