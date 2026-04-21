const { test, expect } = require('@playwright/test');
const {
  getLandmarkCounts,
  gotoHomepage,
} = require('./support/accessibility');

test.describe('HCLTech homepage accessibility structure', () => {
  test('A11Y-001 exposes core landmarks and a single h1', async ({ page }) => {
    await gotoHomepage(page);

    const landmarks = await getLandmarkCounts(page);

    expect(landmarks.banner).toBeGreaterThan(0);
    expect(landmarks.main).toBeGreaterThan(0);
    expect(landmarks.navigation).toBeGreaterThan(0);
    expect(landmarks.contentinfo).toBeGreaterThan(0);
    expect(landmarks.headingsLevel1).toBe(1);
  });

  test('A11Y-016 gives core CTAs accessible names', async ({ page }) => {
    await gotoHomepage(page);

    await expect(page.getByRole('link', { name: /contact us/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /watch the interview/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /^submit$/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /^clear$/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /stay connected/i }).first()).toBeVisible();
  });

  test('A11Y-015 includes meaningful alternative text on key images', async ({ page }) => {
    await gotoHomepage(page);

    const namedImages = page.locator('img[alt]:not([alt=""])');
    await expect(namedImages.first()).toBeVisible();
    expect(await namedImages.count()).toBeGreaterThan(10);
  });

  test('A11Y-026 exposes accessible footer, legal and social links', async ({ page }) => {
    await gotoHomepage(page);

    const footerLinks = [
      /disclaimer/i,
      /privacy statement/i,
      /terms of use/i,
      /sitemap/i,
      /raise a grievance/i,
      /facebook/i,
      /twitter/i,
      /linkedin/i,
      /instagram/i,
      /youtube/i,
      /threads/i,
    ];

    for (const name of footerLinks) {
      await expect(page.getByRole('link', { name }).first()).toBeVisible();
    }
  });
});
