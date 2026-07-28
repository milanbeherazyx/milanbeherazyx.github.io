# PROGRESS

## Current phase: 6 (QA & launch) — not started. Phase 5 COMPLETE (docs finalized, acceptance test passed).

## Phase checklist (from PRD §8)

- [x] **Phase 0 — Content prep** (Milan + Claude chat) — DONE 2026-07-28
  - Deliverable: Content pack complete: assets checklist (pack §9) done, discrepancy log (pack §8) resolved
  - Exit criteria: All ⚠️ flags resolved; photo, recommendations, resume PDF, Cal.com & Web3Forms keys in hand
  - **Owner-approved deferrals:** Cal.com account + Web3Forms key deferred to the contact-page build (Phase 3/4); Claude provides setup guides then. Not blockers for Phases 1–2.
- [x] **Phase 1 — Architecture** — built 2026-07-28; deploy pending repo creation
  - Deliverable: Repo scaffold: Astro 5 + Tailwind v4 + TS strict, content collections with Zod schemas, CI workflow, `AGENTS.md` + `/skills/` skeletons, empty page routes ✅
  - Exit criteria: `npm run build` green ✅ (`astro check` + build, 8 pages); deploys to `milanbeherazyx.github.io` showing a stub ✅ (live 2026-07-28, HTTP 200, Actions workflow green)
- [x] **Phase 2 — Design system** — COMPLETE 2026-07-28
  - Deliverable: Tokens (color/type/space), font pair, motion spec, signature element, 2 mockup directions for home hero + case-study card ✅ (+1 iteration round: hybrid + funnel options)
  - Exit criteria: Milan picks a direction ✅ (**Hybrid light/dark** + **Funnel option 3 Before/After**); tokens file locked ✅ (`src/styles/global.css`, fonts self-hosted, build green)
- [x] **Phase 3 — Build-out** — COMPLETE 2026-07-28
  - Deliverable: All pages/components per PRD §3, responsive per §5.1 device matrix, motion implemented, blog structure wired ✅
  - Exit criteria: Every page renders with placeholder content at all §5.1 widths with no horizontal scroll ✅ (verified 360/390/768/1024/1440/1920 × light+dark, zero overflow); Lighthouse (mobile) ≥ 90 all categories ⏳ not yet run — no Lighthouse CI tooling installed yet (that's Phase 5); dist is 672KB total across 12 pages so there's no obvious red flag, but this should be spot-checked before Phase 6 launch gate
- [x] **Phase 4 — Content & copy** — COMPLETE 2026-07-28
  - Deliverable: Case studies written, bio, services copy, metadata/OG, resume page ✅
  - Exit criteria: All placeholder text gone ✅; sanitization checklist passed ✅ (automated term audit over `src/` and `dist/`, all clean)
- [x] **Phase 5 — Ops & docs** — COMPLETE 2026-07-28
  - Deliverable: Finished `AGENTS.md` + all skill files ✅, Lighthouse CI budgets ✅, sitemap/robots/JSON-LD ✅, analytics wired ✅ (Umami Cloud, awaiting Milan's account), 404 page ✅ (built Phase 3)
  - Exit criteria: Local-LLM acceptance test (PRD §6) passes ✅ — see log below, run for real via a fresh subagent
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

### 🚩 LAUNCH BLOCKER — resume/LinkedIn alignment owed by Milan
Two edits to the resume PDF + LinkedIn must land before launch so the site's claims match his public documents (partner list + policy-scale figure). **Specifics are in the git-ignored `content-pack/content_pack.md` §12 — deliberately not repeated here, because this file is public.** Do not launch (Phase 6) until Milan confirms both are done.

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

### 2026-07-28 — Phase 2 LOCKED
- **Milan's picks:** (1) Hybrid light/dark — one identity (Clash Display + Switzer + JetBrains Mono data-labels), light = ultramarine "memo" palette, dark = EWI-amber "console" palette, switching via `prefers-color-scheme` only (no toggle — PRD §4 localStorage exclusion). (2) Funnel treatment = **option 3 "Before/After"** (30/100 → 43/100 bars + "+13 pts" stamp), per `design/iteration-2.html`.
- **Locked into the repo:** `src/styles/global.css` — semantic palette vars (light + dark), `@theme` tokens (fonts, fluid type scale incl. per-size line-height/tracking/weight, section spacing, motion easing), `@font-face` for 4 self-hosted files in `public/fonts/` (ClashDisplay-Variable, Switzer-Variable, JetBrainsMono 400/600 — ~260KB total, ITF FFL + OFL). Build green. `direction-a/b.html` archived to `design/archive/`; `iteration-2.html` is THE build reference for Phase 3.
- **Phase 3 instructions (for the Sonnet session):** read PROGRESS.md → PRD §3, §5, §5.1 → `design/DESIGN.md` → `design/iteration-2.html`. Build all pages with placeholder-tolerant components; funnel = option 3 markup; test BOTH color schemes at all §5.1 widths; Lenis pointer:fine only; motion per DESIGN.md budget. Contact page still degrades to mailto (Cal.com/Web3Forms deferred). Do not touch tokens.
- **Next model (PRD §9):** Phase 3 Build-out → **Sonnet, standard effort**. Milan will switch /model himself before invoking.

### 2026-07-28 — Phase 3 (Build-out) complete
- **Done:** Full component layer — `SiteHeader` (accessible mobile menu: button+panel, aria-expanded, Escape closes, touch targets ≥44px), `SiteFooter`, `FunnelBeforeAfter` (locked signature element, option 3), `ProofStrip`, `CaseStudyCard`, `Tag`. All 8 PRD §3 pages built and wired to their content collections: Home, Work index (client-side tag filter, no framework) + detail (memo layout, strict Context→Problem→Approach→What I built→Outcome→Tools→Where else section order enforced by template), Services (+ "How I ramp on a new domain" 4-step block), About (photo via `astro:assets` — 1.7MB PNG optimized to a 4KB WebP at build; tool grid; 4 recommendation pull-quotes), Resume (experience timeline + skills + certs + education + PDF download), Contact (Cal.com iframe / Web3Forms form gated on `site.config.ts` values — both empty today so it cleanly degrades to mailto CTAs), Blog (index/detail styled, still nav-hidden with 0 posts), 404.
- **Motion implemented** (design/DESIGN.md spec): Lenis smooth scroll (pointer:fine only, wrapped in try/catch), one staggered hero load-in (`data-rise`), IntersectionObserver scroll reveals (`data-reveal`), `prefers-reduced-motion` fully respected — verified programmatically that reduced-motion users see all content immediately with zero scroll dependency.
- **Real bug found & fixed during QA:** the `.js` class that gates hidden reveal/rise states was originally set by an unconditional inline `<head>` script. If the motion module script ever failed to load/execute, content below the fold would stay invisible forever with nothing left to reveal it. Fixed by moving the `.js` class-add into `motion.ts` itself (first line) and wrapping Lenis init in try/catch — now hidden states can only ever apply once the script that will reveal them is actually running; no-JS / script-failure always defaults to fully visible.
- **Content seeded:** 4 LinkedIn recommendations and 7 experience entries are now FINAL (facts already approved, safe to lock — not placeholder). 4 case studies and 4 services have real frontmatter (titles/tags/metrics/tools, all from content_pack.md, no invented numbers) but placeholder body prose explicitly flagged `*Placeholder — Phase 4 writes...*` for Phase 4 to replace. Photo and resume PDF copied in as real assets (both approved for publication — resume PDF's phone number is scoped to the PDF only per pack §1, never rendered on any page).
- **Verified:** `npm run build` green (12 pages, 672KB dist total). Zero horizontal scroll at 360/390/768/1024/1440/1920px × light+dark (programmatic check, not just visual). Screenshot QA across Home/Work/Services/About/Resume/Contact in both color schemes. Mobile nav hamburger opens/closes/navigates correctly; 768px shows full desktop nav with no crowding (Tailwind `md:` boundary, deliberate).
- **Not done (explicitly deferred, not a gap):** Lighthouse mobile-score run (needs Phase 5 tooling); OG images/JSON-LD (Phase 5); final copy (Phase 4); Cal.com/Web3Forms real integration (owner-approved deferral, guides owed when Milan is ready).
- **What Phase 4 needs:** Milan should supply raw bio notes (About page currently has a factual-but-generic placeholder bio, explicitly flagged) — not a blocker, just improves the first draft. Otherwise Phase 4 is straightforward: replace the 4 case-study bodies + 4 service bodies with full prose from content_pack.md, resolve the CS1 "how the 5-month lift happened credibly" discrepancy-log item (pack §8.4), finalize OG metadata copy.
- **Next model (PRD §9):** Phase 4 Content & copy → **Opus 4.8, medium effort**.

### 2026-07-28 — Phase 4 (Content & copy) complete
- **Source research:** Milan granted read access to his Khatabook work artifacts (rule-engine policy configs, a SQL config migration, a Java offer generator, a Python UAT notebook, an internal tool repo, and an OKR workbook). Explored at structural level to write credibly; **none of it is in this repo and none may ever be.** Findings live in conversation + the git-ignored pack only.
- **Numbers corrected before publishing.** An earlier draft claim of "5,000+ decision rules" was wrong — that counted rule *instances*. Milan challenged it; recomputed distinct `(field, operator, threshold)` triples: **112 distinct rules in his files (5,463 instances), 233 distinct repo-wide (12,919 instances)**. Published figure is now **112 distinct rules composed into 200+ policy variants across 119 decision variables** — a composition/reuse story that is both honest and more interesting. Lesson worth keeping: aggregate counts over config files inflate badly; always de-duplicate before publishing.
- **Case studies: 4 → 6**, all written in full (Context → Problem → Approach → What I built → Outcome → Tools → Where else this applies):
  1. Lifting portfolio qualification 30% → 43% *(featured)*
  2. Policy as code: 112 rules, 200+ variants, six lenders *(featured, replaces the old "73 rules" stub)*
  3. PolicyLens — internal tooling story *(new)*
  4. Cohort & vintage delinquency for Axos Bank *(new — concurrent vs ever delinquency, vintage curves)* *(featured)*
  5. Removing 80% of manual vendor risk reviews *(stack corrected: Python ETL → SQL Server → Tableau)*
  6. Bootstrapping a bakery on SKU-margin analytics
- **Also written:** all 4 service offers in full prose (each with a lending worked example), a real About bio replacing the placeholder, and improved site title/description. Resume timeline entry for Khatabook rewritten to the new six-partner list and new scale figures.
- **Schema/UI changes:** added `Risk` and `Tooling` to the work tag enum; Services page now renders full markdown bodies; **fixed a rendering bug** where markdown bullet lists in case studies collapsed into run-on paragraphs (`.case-content` styled `p` but not `ul`/`li`) — now rendered with accent dash markers.
- **Sanitization:** automated audit over `src/` and `dist/` for every restricted term — internal service/table names, proprietary signal names, internal pipeline acronyms, unauthorized partner names, dev hosts, session tokens, phone number. All clean. The audit **caught a real miss**: the Khatabook resume entry still carried the superseded partner list and "7+ policies" figure from Phase 3; corrected.
- **Owner decisions logged:** publish six partners by name (Cashtree, Caprion, Lendbox, Jupiter, Slice, Western Cap); name Axos Bank (corroborated by a public LinkedIn recommendation); PolicyLens described but never linked or open-sourced (it encodes the policy schema); OKR workbook used for vocabulary only — no figure from it is published, as it is employer business performance and contains colleagues' names.
- **Verified:** `npm run build` green (14 pages), zero horizontal overflow, both colour schemes checked.
- **What Phase 5 needs:** nothing from Milan. Deliverables are `AGENTS.md` + the 8 skill files, Lighthouse CI budgets, sitemap/robots/JSON-LD, analytics, 404 polish. **Open decision needed by Phase 5:** analytics choice — Umami Cloud vs GoatCounter (PRD §12.2).
- **Next model (PRD §9):** Phase 5 Ops & docs → **Sonnet (docs) + Haiku (config), LOW effort**.

### 2026-07-29 — content_pack.md committed to the public repo (owner action, off-phase)
Before Phase 5 started, Milan manually uploaded `content_pack.md` to the public repo via GitHub's web UI (a deliberate decision — he also hand-edited `.gitignore` to un-ignore it) and commented out its own ignore rules. The uploaded copy was the **stale, pre-session version** (127 lines — missing every Phase 0/4 resolution). Restored it to the complete version from this conversation's own record (discrepancy-log resolutions, corrected rule count, recommendation transcriptions, the resume-update-owed section) and committed that instead, at Milan's explicit "yeah, for now do commit and push." **Content_pack.md's phone number and home-address reference are now permanently in public git history** — flagged clearly to Milan before proceeding; he chose to keep it. `content-pack/README.md` and the root `README.md` updated to stop claiming it's git-ignored (see their own text for the "what if we need to remove it later" note — it requires a history rewrite, not just a delete). AGENTS.md updated to match reality.

### 2026-07-29 — Phase 5 (Ops & docs) complete
- **Analytics:** Milan chose **Umami Cloud** (PRD §12.2, asked directly). Wired as a config slot (`SITE.umamiWebsiteId` in `site.config.ts`, empty = no script renders) — same deferred pattern as Cal.com/Web3Forms. Setup guide still owed when Milan signs up.
- **SEO wiring, all real, all verified working (not just present):** `robots.txt`; canonical URLs; full OG + Twitter card meta on every page; a real designed OG image (`public/og-default.jpg`, 1200×630, built from the locked design tokens, 42KB) rather than a placeholder; JSON-LD `ProfilePage`+`Person` on every page, **parse-validated** (not just eyeballed) in the built HTML.
- **Lighthouse CI, measured not guessed:** ran real Lighthouse audits (mobile throttling, matching PRD §5.1's binding metric) against 7 representative pages before setting any budget number. Baseline: performance 94–98, accessibility 98–100, best-practices 96, SEO 100 across Home/Work/case-study/Services/About. Set CI floors with headroom for runner variance (perf ≥85, a11y ≥95, best-practices ≥90, SEO ≥95) so the gate catches real regressions without false-positive-blocking on CI-environment noise. **Dry-ran `.lighthouserc.json` locally against the actual build before trusting it in CI** — all 7 URLs pass. Wired into `.github/workflows/deploy.yml` between build and deploy, so a regression blocks the deploy, per PRD's CI/CD row.
- **Note for Phase 6:** Home and About currently measure 94 on mobile performance — 1 point under the PRD §1 target of ≥95 (LCP ~2.6s, likely the hero's custom-font paint). Worth a look during Phase 6 perf tuning; not blocking, and the CI floor is set below this so it won't fail today.
- **AGENTS.md finalized:** accurate repo map (reflects all 6 case studies, 4 services, 7 experience entries, 4 recommendations), and documents that `content_pack.md` is now committed (not the original git-ignore plan) without weakening its ⛔ publish-safety flags, which still govern the *site* regardless of the pack file's own repo status.
- **All 8 skill files written in full** — exact paths, real filled examples from the actual committed files (not invented ones), validation steps, and failure modes specific to this schema (e.g., blog's inverted `draft` default, the `_example.md` copy-not-edit pattern, the tools-grid-is-plain-TS-not-Zod gap in `update-metrics.md`).
- **Local-LLM acceptance test (PRD §6) — run for real, not self-assessed.** Spawned a fresh subagent with zero conversation context, given ONLY the verbatim text of `AGENTS.md` + `skills/add-case-study.md`, and asked it to add a test case study. **Result: passed** — correct file location, correct schema, `npm run build` green, nothing touched outside `src/content/work/`. It also **found two real documentation bugs**, which is exactly what this test is for:
  1. `add-case-study.md`'s wording on `draft: true` implied the page still builds at its URL just unlisted; actually `getStaticPaths` excludes drafts entirely — the URL 404s. Fixed in both `add-case-study.md` and the same bug in `add-blog-post.md` (blog has the identical filter).
  2. `src/content.config.ts`'s comment listed "Where else this applies" as a body heading and claimed "template enforces headings" — neither is true. It's a frontmatter field rendered separately, and nothing enforces heading order programmatically. Fixed the comment.
  (The subagent's own final report claimed it had cleaned up its test file; it had not — found and removed it before committing.)
- **Verified:** `npm run build` green (14 pages). Lighthouse CI dry run green on all 7 sampled pages.
- **What Phase 6 needs from Milan:** nothing procedural. Still outstanding whenever he's ready: Cal.com + Web3Forms setup (guides owed), Umami Cloud signup, and the resume/LinkedIn launch-blocker from Phase 4 (content-pack §12).
- **Next model (PRD §9):** Phase 6 QA & launch → **Sonnet, low–standard effort**.

### 2026-07-29 — Cal.com CANCELLED; Web3Forms wired (Phase 5 addendum 2)
- **Cal.com is out** (owner decision — paid product). This amends PRD §3.6/§4: the primary conversion path is now the Web3Forms form + direct email; intro calls are scheduled over email ("email me 2–3 slots"). All Cal.com code removed; "Book a call" CTAs still route to /contact/, which now leads with the form and an email-to-schedule block.
- **Contact form upgraded to Web3Forms best practice:** honeypot `botcheck` field, fixed subject/from_name, message placeholder prompting context (company/stack/problem), redirect to a new **/thanks/** page (noindex, excluded from sitemap) so submissions land back on-brand instead of Web3Forms' generic page. Still gated on `SITE.web3formsKey` — **waiting on Milan's access key** (he's mid-signup; form name "Portfolio contact form", website `milanbeherazyx.github.io`). One paste goes live.
- Also fixed: homepage funnel desktop dead-space (now a 2-col layout with narrative + case-study link), full favicon set (MB monogram, ultramarine tile) + web manifest, and a type-noise IDE error in astro.config.mjs (duplicate vite types, cast documented).

### 2026-07-29 — Phase 5 addendum (Milan's four pre-Phase-6 requests)
- **Umami live:** website ID `d0163c1b-…` set in `site.config.ts`; script verified rendering in built HTML.
- **X profile added** (x.com/milanbeherazyx): footer link, `twitter:site`/`twitter:creator` cards, JSON-LD `sameAs`.
- **Full-name rename:** "Milan Behera" → **"Milan Kumar Behera"** across all of `src/`, README, page titles, photo alt, and the **regenerated OG image**. Header verified no-overflow at 360/390/768/1024 with the longer name.
- **Advanced SEO:** site-wide JSON-LD `@graph` (rich `Person` with `knowsAbout`, `worksFor`, `alumniOf`, city-level address + `WebSite`, stable `@id`s) · per-page schemas via a new `extraSchema` layout prop — `Article`+`BreadcrumbList` on every case study, `ProfilePage` on About · `twitter:creator` · `meta author` · `og:locale` · font preloads for the LCP hero (home mobile perf **94 → 95**, now meets PRD §1) · Google Search Console verification slot in config (empty until Milan registers).
- **SEO actions only Milan can do (the part that actually determines ranking):** (1) register at search.google.com/search-console → URL-prefix property `https://milanbeherazyx.github.io/` → HTML-tag method → paste token into `SITE.googleSiteVerification` → after deploy, verify + submit `sitemap-index.xml`; (2) put the site URL on his LinkedIn profile (website field + featured section), GitHub profile, and X bio — profile backlinks are the strongest signal for name-query ranking; (3) after launch, replace the old gamma.site link everywhere (pack §1 flag); (4) Bing Webmaster Tools (imports from GSC, one click).
