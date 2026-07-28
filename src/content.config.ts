import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections — the ONLY place site prose lives (plus site.config.ts).
 * Zod schemas fail `npm run build` loudly on a bad field (PRD §6.4).
 * Files starting with `_` are ignored examples — copy one to start a new entry.
 */

// Pattern excludes files whose name starts with "_"
const md = (base: string) => glob({ pattern: '**/[^_]*.md', base });

/** Case studies → /work/[id]/ (PRD §3.2). Body markdown should use six
 *  headings in order: Context → Problem → Approach → What I built → Outcome
 *  → Tools. "Where else this applies" is NOT a body heading — it's the
 *  `whereElseThisApplies` field below, rendered by the page template in its
 *  own boxed section after the body. Nothing enforces the heading order
 *  programmatically; it's a convention, checked by eye, not by Zod. */
const work = defineCollection({
  loader: md('./src/content/work'),
  schema: z.object({
    title: z.string().max(120),
    summary: z.string().max(300),
    tags: z.array(z.enum(['SQL', 'Funnel', 'Policy', 'Dashboard', 'Risk', 'Tooling'])).min(1),
    featured: z.boolean().default(false), // featured cards on Home (2–3 max)
    order: z.number().int(), // index-page sort, ascending
    draft: z.boolean().default(false),
    /** headline numbers shown on the card / detail header */
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .max(3)
      .optional(),
    /** one-line domain-transfer note, rendered as the closing section */
    whereElseThisApplies: z.string().max(300),
    tools: z.array(z.string()).min(1),
  }),
});

/** Services → /services/ (PRD §3.3). One file per offer, domain-agnostic
 *  framing with a lending worked example inside the body. */
const services = defineCollection({
  loader: md('./src/content/services'),
  schema: z.object({
    title: z.string().max(80),
    summary: z.string().max(300),
    order: z.number().int(),
    draft: z.boolean().default(false),
  }),
});

/** Blog → /blog/ (PRD §3.7) — structure only in v1; nav link appears
 *  automatically once ≥1 non-draft post exists. */
const blog = defineCollection({
  loader: md('./src/content/blog'),
  schema: z.object({
    title: z.string().max(120),
    description: z.string().max(300),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(true),
  }),
});

/** LinkedIn recommendations → About page pull-quotes (PRD §3.4).
 *  Body = the quote, verbatim (trim with ellipses only, never reword). */
const recommendations = defineCollection({
  loader: md('./src/content/recommendations'),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(), // their LinkedIn headline, shortened
    relationship: z.string().optional(), // e.g. "managed Milan directly"
    date: z.string().optional(), // e.g. "Aug 2025"
    order: z.number().int(), // display priority, ascending
    draft: z.boolean().default(false),
  }),
});

/** Experience entries → /resume/ timeline (PRD §3.5).
 *  Body = bullet points for the role. */
const experience = defineCollection({
  loader: md('./src/content/experience'),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string().optional(),
    start: z.string(), // "Mar 2026" — display string, not a Date
    end: z.string().default('Present'),
    kind: z.enum(['work', 'venture', 'fellowship', 'freelance']).default('work'),
    order: z.number().int(), // timeline sort, ascending = most recent first
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, services, blog, recommendations, experience };
