import { test, expect } from '@playwright/test';

// Cheap guardrails against silent breakage: every key page renders with a
// title and no console errors, and no internal link 404s.
const PAGES = ['/', '/about/', '/cited/', '/faq/', '/prompts/', '/privacy/'];

test('key pages render with a title and no console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(e.message));

  for (const path of PAGES) {
    const res = await page.goto(path);
    expect(res?.status(), `${path} status`).toBeLessThan(400);
    await expect(page, `${path} title`).toHaveTitle(/.+/);
  }

  expect(errors, `Console errors:\n${errors.join('\n')}`).toEqual([]);
});

test('internal links on the homepage all resolve (no dead links)', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = await page.$$eval('a[href]', (as) =>
    as.map((a) => (a as HTMLAnchorElement).getAttribute('href') || ''),
  );

  const internal = [
    ...new Set(
      hrefs
        .filter((h) => h.startsWith('/') && !h.startsWith('//'))
        .map((h) => h.split('#')[0].split('?')[0])
        .filter(Boolean)
        // Skip file assets (pdf/zip/images) — we only smoke-test HTML routes.
        .filter((h) => !/\.[a-z0-9]+$/i.test(h)),
    ),
  ];

  for (const path of internal) {
    const res = await request.get(path);
    expect(res.status(), `${path} returned ${res.status()}`).toBeLessThan(400);
  }
});
