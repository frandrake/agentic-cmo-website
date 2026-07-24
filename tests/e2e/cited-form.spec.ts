import { test, expect } from '@playwright/test';

// The Cited PDF email-gate is the site's one piece of real behaviour, so it
// gets the most coverage. We mock POST /api/cited-request (a Cloudflare Pages
// Function that isn't running under `astro preview`) and assert the front-end
// contract in CitedForm.tsx: success state, client-side validation, error
// surfacing, and the honeypot.
const GATE = '/cited/';
const emailField = (page: import('@playwright/test').Page) =>
  page.locator('form input[name="email"]');
const submit = (page: import('@playwright/test').Page) =>
  page.getByRole('button', { name: /send me the manual/i });

test.describe('Cited email gate', () => {
  test('valid email posts to the API and shows the success state', async ({ page }) => {
    let posted: Record<string, unknown> | null = null;
    await page.route('**/api/cited-request', async (route) => {
      posted = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto(GATE);
    await emailField(page).fill('reader@example.com');
    await submit(page).click();

    await expect(page.getByText('Check your inbox.')).toBeVisible();
    await expect(page.getByRole('status')).toContainText('reader@example.com');
    expect(posted).toMatchObject({ email: 'reader@example.com' });
  });

  test('invalid email is blocked client-side and never reaches the API', async ({ page }) => {
    let called = false;
    await page.route('**/api/cited-request', async (route) => {
      called = true;
      await route.fulfill({ status: 200, body: '{}' });
    });

    await page.goto(GATE);
    await emailField(page).fill('not-an-email');
    await submit(page).click();

    // Success state must not appear, and the network must stay untouched.
    await expect(page.getByText('Check your inbox.')).toBeHidden();
    expect(called).toBe(false);
  });

  test('a server error surfaces an alert to the visitor', async ({ page }) => {
    await page.route('**/api/cited-request', async (route) => {
      await route.fulfill({
        status: 502,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Could not send the manual right now.' }),
      });
    });

    await page.goto(GATE);
    await emailField(page).fill('reader@example.com');
    await submit(page).click();

    await expect(page.getByRole('alert')).toContainText(/could not send/i);
  });

  test('the honeypot field is hidden from assistive tech and the tab order', async ({ page }) => {
    await page.goto(GATE);
    // The honeypot is deliberately off-screen (not display:none) so bots fill
    // it; the real contract is that humans/AT never reach it: it sits inside an
    // aria-hidden wrapper and is removed from the tab order.
    const honeypot = page.locator('[aria-hidden="true"] input[name="website"]');
    await expect(honeypot).toHaveCount(1);
    await expect(honeypot).toHaveAttribute('tabindex', '-1');
  });
});
