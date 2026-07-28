// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// User site (milanbeherazyx.github.io) → served from root, no `base` needed.
// When a custom domain lands post-launch, only `site` changes.
export default defineConfig({
  site: 'https://milanbeherazyx.github.io',
  trailingSlash: 'ignore',
  markdown: {
    // dark-plus over the default github-dark: its faintest token (comments,
    // #6A9955 on #1E1E1E) passes WCAG AA — github-dark's #6A737D fails at
    // 3.04:1 (caught by axe on the blog method posts). The code panel stays
    // dark in both site themes deliberately: a console is dark.
    shikiConfig: { theme: 'dark-plus' },
  },
  integrations: [
    sitemap({
      // /thanks/ is a noindex utility page (form redirect target)
      filter: (page) => !page.includes('/thanks/'),
    }),
  ],
  vite: {
    // Cast: @tailwindcss/vite ships its own vite types, which clash with
    // Astro's bundled vite types at the type level only (runtime is fine).
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
