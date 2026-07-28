/**
 * Global site config — the single place for identity, links, nav and the
 * homepage proof-strip metrics (PRD §6.4). Content edits happen HERE or in
 * src/content/** — never inside components.
 *
 * ⚠️ Sanitization (PRD §7): only public-resume facts. No phone number,
 * no home address, no internal artifacts — ever.
 */
export const SITE = {
  name: 'Milan Behera',
  title: 'Milan Behera — Data Analyst | Lending & Credit Risk',
  description:
    'Data analyst turning messy operational data into decisions — funnels, metric definitions, root causes, dashboards. Deepest in lending and credit risk; the domain changes, the method does not.',
  url: 'https://milanbeherazyx.github.io',
  email: 'milanbeherazyx@gmail.com',
  socials: {
    linkedin: 'https://www.linkedin.com/in/milanbeherazyx',
    github: 'https://github.com/milanbeherazyx',
  },
  /** Cal.com username/event slug, e.g. "milanbeherazyx/intro-call" — DEFERRED:
   *  filled when Milan creates the account (owner-approved deferral, see
   *  PROGRESS.md). Empty string = contact page shows a mailto fallback. */
  calcom: '',
  /** Web3Forms access key — DEFERRED, same as above. Empty = form hidden,
   *  mailto shown. Public key by design (Web3Forms model), still filled only
   *  by Milan at the contact-page phase. */
  web3formsKey: '',
  /** Resume PDF path under /public — replaced via skills/replace-resume-pdf.md */
  resumePdf: '/resume.pdf',
  /** Umami Cloud website ID (PRD §12.2, decided 2026-07-28) — DEFERRED:
   *  Milan signs up at cloud.umami.is, creates a website entry for
   *  milanbeherazyx.github.io, and pastes the generated website ID here.
   *  Empty string = no analytics script renders at all. */
  umamiWebsiteId: '',
} as const;

/** Homepage proof strip (PRD §3.1) — exactly 3, from content_pack §3 bank.
 *  Placeholder values are REAL public metrics; Phase 4 finalizes selection. */
export const PROOF_METRICS = [
  { value: '30% → 43%', label: 'portfolio qualification rate lifted across the lender stack' },
  { value: '₹8–9B+', label: 'loan portfolio exposure monitored via executive dashboards' },
  { value: '80%', label: 'of manual vendor risk assessments eliminated via API automation' },
] as const;

/** Nav — blog item appears automatically when ≥1 published post exists
 *  (handled in the layout, not here). */
export const NAV = [
  { href: '/work/', label: 'Work' },
  { href: '/services/', label: 'Services' },
  { href: '/about/', label: 'About' },
  { href: '/resume/', label: 'Resume' },
  { href: '/contact/', label: 'Contact' },
] as const;
