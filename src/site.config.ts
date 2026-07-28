/**
 * Global site config — the single place for identity, links, nav and the
 * homepage proof-strip metrics (PRD §6.4). Content edits happen HERE or in
 * src/content/** — never inside components.
 *
 * ⚠️ Sanitization (PRD §7): only public-resume facts. No phone number,
 * no home address, no internal artifacts — ever.
 */
export const SITE = {
  name: 'Milan Kumar Behera',
  title: 'Milan Kumar Behera — Data Analyst | Lending & Credit Risk | Freelance & Remote',
  description:
    'Data analyst turning messy operational data into decisions — funnels, root causes, Tableau & Power BI dashboards, Python tools. Deepest in lending and credit risk. Open to freelance projects and remote roles, worldwide.',
  url: 'https://milanbeherazyx.github.io',
  email: 'milanbeherazyx@gmail.com',
  socials: {
    linkedin: 'https://www.linkedin.com/in/milanbeherazyx',
    github: 'https://github.com/milanbeherazyx',
    x: 'https://x.com/milanbeherazyx',
  },
  /** X handle for twitter:creator/site cards */
  xHandle: '@milanbeherazyx',
  /** Web3Forms access key (public by design — safe to commit). Empty =
   *  contact form hidden, mailto shown instead. Cal.com was CANCELLED by
   *  Milan (2026-07-29, paid product) — scheduling happens over email. */
  web3formsKey: 'db79de3d-a738-4c37-9104-d4437c2258e6',
  /** Resume PDF path under /public — replaced via skills/replace-resume-pdf.md */
  resumePdf: '/resume.pdf',
  /** Umami Cloud website ID (PRD §12.2). Set by Milan 2026-07-29.
   *  Empty string = no analytics script renders at all. */
  umamiWebsiteId: 'd0163c1b-39d9-4e0a-88d2-cf2cf9472553',
  /** Google Search Console verification token (meta-tag method) — supplied
   *  by Milan 2026-07-28. Empty = tag omitted. */
  googleSiteVerification: 'KKw-NDR-5o75q6E_f-NaZBiX22WTSTILZsxSg0hCHzA',
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
