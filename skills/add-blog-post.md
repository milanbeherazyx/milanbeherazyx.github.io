# Skill: add-blog-post

Blog is structure-only in v1 (PRD §3.7) — the collection, routes, and RSS
feed all exist and work today. Adding a post is a normal content-collection
edit; there is no "enable the blog" step.

## Where

`src/content/blog/<slug>.md` — one file per post. The filename becomes the
URL: `/blog/<slug>/`.

## Frontmatter schema (from `src/content.config.ts`)

```yaml
---
title: string, max 120 chars
description: string, max 300 chars
pubDate: date (YYYY-MM-DD)
draft: boolean, default true       # note the default is TRUE, opposite of every other collection
---
```

## Filled example

```yaml
---
title: 'How I ramp on a new lending domain in a week'
description: 'The docs → metric definitions → KT call → first-analysis process, in practice.'
pubDate: 2026-08-15
draft: false
---

Post body in markdown.
```

## Steps

1. `cp src/content/blog/_example.md src/content/blog/<new-slug>.md`
2. Fill in frontmatter. **`draft` defaults to `true`** — you must explicitly
   set `draft: false` to publish, unlike every other collection in this repo
   where the default is `false`. This is deliberate: an unfinished blog post
   should never accidentally go live.
3. Write the post body in markdown.

## What happens automatically on first publish

The `Blog` nav item is **hidden** until at least one post has `draft: false`
(handled in `src/components/SiteHeader.astro` — do not edit that file to
"turn on" the nav manually). The moment you publish your first non-draft
post and push, the nav item appears on its own, and that post appears in
`/blog/`, at `/blog/<slug>/`, and in `/rss.xml`.

## Validation

1. `npm run build` — Zod errors (especially an invalid `pubDate` format)
   point at the exact file.
2. Open `/blog/` locally and confirm the post is listed (only if
   `draft: false`) and the nav now shows "Blog".
3. Check `/rss.xml` locally includes the new post.

## Common failure modes

- **Forgetting `draft: false`** — `src/pages/blog/[slug].astro` excludes
  draft entries from `getStaticPaths`, so no page is generated at all; the
  URL 404s, not just goes unlisted. It also stays off `/blog/`, out of
  `/rss.xml`, and won't trigger the nav item to appear. `npm run build` still
  succeeds — draft entries are valid, just excluded. This is the single most
  common mistake with this collection specifically because the default is
  inverted from every other content type in the repo.
- **`pubDate` in the wrong format** — must parse as a date; use `YYYY-MM-DD`.
- **Expecting the nav change to need a manual toggle** — it doesn't; don't
  go looking for a "show blog in nav" setting, there isn't one.
