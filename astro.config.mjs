// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// User site (milanbeherazyx.github.io) → served from root, no `base` needed.
// When a custom domain lands post-launch, only `site` changes.
export default defineConfig({
  site: 'https://milanbeherazyx.github.io',
  trailingSlash: 'ignore',
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
