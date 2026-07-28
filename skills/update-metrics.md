# Skill: update-metrics

Update the homepage proof-strip (the 3 headline numbers under the hero).

## Where

`src/site.config.ts` → the `PROOF_METRICS` array. This is a TypeScript file,
not markdown — but the array is the only part you should touch.

## Schema (plain TS, not Zod — no build-time validation of shape, be careful)

```ts
export const PROOF_METRICS = [
  { value: string, label: string },
  { value: string, label: string },
  { value: string, label: string },
] as const;
```

Exactly 3 entries render (PRD §3.1: "3 headline metrics"). The homepage does
not slice or pad the array — adding a 4th entry will render a 4th item and
likely break the grid layout; removing one will leave a gap.

## Filled example (current values)

```ts
export const PROOF_METRICS = [
  { value: '30% → 43%', label: 'portfolio qualification rate lifted across the lender stack' },
  { value: '₹8–9B+', label: 'loan portfolio exposure monitored via executive dashboards' },
  { value: '80%', label: 'of manual vendor risk assessments eliminated via API automation' },
] as const;
```

## Steps

1. Open `src/site.config.ts`.
2. Edit the `value`/`label` text for one or more of the 3 entries. Keep the
   array at exactly 3 entries.
3. Every number here must come from `content-pack/content_pack.md` §3
   ("Headline Metrics Bank") — that section lists which metrics are cleared
   for the homepage specifically.

## Validation

1. `npm run build` — this file has no Zod schema, so a syntax error (missing
   comma, unmatched quote) is the main thing that will fail the build; a
   wrong-but-valid string will NOT be caught automatically.
2. Open `/` locally and visually confirm all 3 numbers display correctly and
   the label text doesn't overflow its card at mobile width (390px).

## Common failure modes

- **Silent no-op**: this file isn't Zod-validated like content collections
  are. A subtly wrong number will build and deploy without any error —
  double-check against the content pack by eye before committing.
- **Breaking TS syntax** — this is a `.ts` file. Keep the `as const` and the
  object-array structure exactly as shown; don't convert it to JSON or YAML.
- **Un-rounded internal metrics** — content_pack.md §7 requires metrics stay
  rounded/bucketed ("70+ rules", not an exact undisclosed count). Match the
  pack's rounding, don't add false precision.
