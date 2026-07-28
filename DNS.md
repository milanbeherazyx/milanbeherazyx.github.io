# Custom domain plan (deferred, PRD §1/§8)

The site currently lives at `https://milanbeherazyx.github.io` (a GitHub
user-site, root path, no `base` config needed). PRD §1 defers a custom
domain to post-launch. This document is the plan for when that happens —
no domain is purchased yet, nothing here is active.

## When Milan buys a domain (any registrar — Namecheap, Google Domains successor, Cloudflare, etc.)

### 1. DNS records to add at the registrar

**Apex domain** (e.g. `milanbehera.com`) — four `A` records pointing at
GitHub Pages' IPs:

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

**`www` subdomain** (recommended, so both `milanbehera.com` and
`www.milanbehera.com` work) — one `CNAME` record:

```
CNAME   www   milanbeherazyx.github.io.
```

(Check GitHub's current published IP list at the time — docs.github.com →
"Managing a custom domain" — before adding, in case they've changed.)

### 2. Tell GitHub about the domain

In the repo: **Settings → Pages → Custom domain** → enter the apex domain
(e.g. `milanbehera.com`) → Save. GitHub will:
- Create a `CNAME` file at the repo root automatically (do not hand-write
  one — let GitHub's UI do this, it also runs a DNS check).
- Once DNS propagates (can take up to 24h, usually much faster), show a
  green "DNS check successful" and let you tick **Enforce HTTPS**. Always
  enable that — it takes a few extra minutes for the certificate to
  provision the first time.

### 3. Update the codebase (the only file that needs a real edit)

In `src/site.config.ts`:

```ts
url: 'https://milanbehera.com', // was: 'https://milanbeherazyx.github.io'
```

That one line is the single source of truth for the domain everywhere in
the site — canonical URLs, OG/Twitter image URLs, JSON-LD `@id`s and
`sameAs`, the sitemap, and `robots.txt`'s sitemap line all derive from it.
Nothing else in `src/` hardcodes the old domain.

Also update, by hand (these live outside `site.config.ts`):
- `astro.config.mjs` → `site:` field (must match, used by `@astrojs/sitemap`)
- `README.md`, `AGENTS.md` references to the URL (cosmetic, not functional)

### 4. Rebuild, verify, deploy

```sh
npm run build   # confirm no errors after the URL change
```

Push to `main` — the existing Actions pipeline (build → Lighthouse CI →
deploy) handles the rest unchanged. GitHub Pages serves the same built
`dist/` at the new domain automatically once the `CNAME` file (from step 2)
is present and DNS has propagated.

### 5. After the switch

- **The old `milanbeherazyx.github.io` URL keeps working** — GitHub
  automatically redirects it to the custom domain once one is configured
  and verified. No dead links from anything that already points at the old
  URL (LinkedIn posts, old shares, search results still indexed).
- Update the **canonical destination** on profiles that link to the site:
  LinkedIn (website field + featured post), GitHub profile, X bio — same
  places flagged in the Phase 5 SEO action list (see PROGRESS.md).
- Re-submit the new domain as a property in **Google Search Console** (a
  custom domain is a distinct property from the `github.io` one, even
  though it's the same site) and resubmit `sitemap-index.xml`. The
  `github.io` property can stay registered — Search Console will show the
  redirect.
- No changes needed to Umami or Web3Forms — Umami tracks by website ID, not
  domain-locked; Web3Forms' access key is portal-level, not domain-locked.
