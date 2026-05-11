// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Static output. Cloudflare Pages picks up `dist/` as the build directory and
// serves the `functions/` directory as Cloudflare Pages Functions automatically —
// no adapter is needed for this setup.
export default defineConfig({
  site: 'https://the-agentic-cmo.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
