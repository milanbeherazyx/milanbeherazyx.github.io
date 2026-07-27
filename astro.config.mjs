// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// User site (milanbeherazyx.github.io) → served from root, no `base` needed.
// When a custom domain lands post-launch, only `site` changes.
export default defineConfig({
  site: 'https://milanbeherazyx.github.io',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
