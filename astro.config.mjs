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
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
    }),
  ],
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  build: {
    inlineStylesheets: 'auto',
  },
  // Astro 7 defaults to JSX whitespace rules ('jsx'), which drop the space
  // between adjacent inline elements ("S&P GlobalCurrent", "01What is…").
  // `true` keeps the pre-v7 HTML-aware compression: crawlers, screen readers
  // and copy/paste read the same text as before.
  compressHTML: true,
});
