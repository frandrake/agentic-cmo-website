import { defineConfig, devices } from '@playwright/test';

// Playwright drives the *built* site (astro build → astro preview), so tests
// exercise exactly the bundle Cloudflare Pages serves — not the dev server.
//
// We intentionally run `astro build` directly rather than `npm run build`:
// the `build` script has a `postbuild` hook that pings IndexNow with the
// production sitemap. `astro build` skips that hook (same trick check.yml uses).
//
// Note: `astro preview` serves the static `dist/` only — it does NOT execute
// the Cloudflare Pages Functions in `functions/`. So `/api/cited-request` does
// not run under this server. The email-gate spec mocks that endpoint with
// `page.route()` and asserts the front-end contract, which is what we want in
// CI (deterministic, no Resend calls, no KV writes). For a real end-to-end run
// against the Function, swap the webServer command for:
//   `astro build && wrangler pages dev dist --port 4321`
// with RESEND_API_KEY / FROM_EMAIL / PDF_URL provided as secrets.
const PORT = 4321;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    // Mobile viewport on the Chromium engine (Pixel 5) so the whole suite runs
    // on a single browser install — CI only installs chromium. Swap to
    // devices['iPhone 13'] + `playwright install webkit` for real Safari cover.
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: `npm exec -- astro build && npm exec -- astro preview --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
