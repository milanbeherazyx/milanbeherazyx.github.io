# PROGRESS

## Current phase: 1 (Architecture) — not started. Phase 0 complete (2 items deferred by owner, see below).

## Phase checklist (from PRD §8)

- [x] **Phase 0 — Content prep** (Milan + Claude chat) — DONE 2026-07-28
  - Deliverable: Content pack complete: assets checklist (pack §9) done, discrepancy log (pack §8) resolved
  - Exit criteria: All ⚠️ flags resolved; photo, recommendations, resume PDF, Cal.com & Web3Forms keys in hand
  - **Owner-approved deferrals:** Cal.com account + Web3Forms key deferred to the contact-page build (Phase 3/4); Claude provides setup guides then. Not blockers for Phases 1–2.
- [ ] **Phase 1 — Architecture**
  - Deliverable: Repo scaffold: Astro 5 + Tailwind v4 + TS strict, content collections with Zod schemas, CI workflow, `AGENTS.md` + `/skills/` skeletons, empty page routes
  - Exit criteria: `npm run build` green; deploys to `milanbeherazyx.github.io` showing a stub
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
