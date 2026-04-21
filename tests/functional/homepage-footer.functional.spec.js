const { test, expect } = require('@playwright/test');
const {
  expectDestinationForName,
  expectVisibleText,
  getLinkDestination,
  getSection,
  gotoHomepage,
  setViewportPreset,
} = require('./support/hcltech-functional');

const footerGroups = ['What We Do', 'Industries', 'Who We Are', 'Resources', 'Careers', 'Global Presence'];
const socialLinks = [
  ['Facebook', 'facebook.com'],
  ['Twitter', 'twitter.com'],
  ['LinkedIn', 'linkedin.com'],
  ['Instagram', 'instagram.com'],
  ['YouTube', 'youtube.com'],
  ['Threads', 'threads.net'],
];
const legalLinks = [
  ['Disclaimer', 'disclaimer'],
  ['Privacy Statement', 'privacy'],
  ['Terms of use', 'terms'],
  ['Sitemap', 'sitemap'],
  ['Raise a Grievance', 'grievance'],
];

test.describe('HCLTech homepage functional footer and utility flows', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHomepage(page);
    await expectVisibleText(page, /copyright/i);
  });

  test('FT-023 footer navigation groups are visible on desktop', async ({ page }) => {
    for (const group of footerGroups) {
      await expectVisibleText(page, group);
    }
  });

  test('FT-024 footer remains usable on mobile', async ({ page }) => {
    await setViewportPreset(page, 'mobile');
    await gotoHomepage(page);
    await expectVisibleText(page, /copyright/i);
    await expectVisibleText(page, 'Global Presence');
  });

  for (const [platform, fragment] of socialLinks) {
    test(`FT-025 social link routes correctly -> ${platform}`, async ({ page }) => {
      await expectDestinationForName(page, platform, fragment);
    });
  }

  test('FT-026 cookies policy link is visible and routable', async ({ page }) => {
    await expectVisibleText(page, /cookie/i);
    await expectDestinationForName(page, 'cookies policy', 'cookie');
  });

  for (const [label, fragment] of legalLinks) {
    test(`FT-027 legal/footer link routes correctly -> ${label}`, async ({ page }) => {
      await expectDestinationForName(page, label, fragment);
    });
  }

  test('FT-028 trust badge is visible and has a valid image target', async ({ page }) => {
    const trusteImage = page.locator('img[alt*="TRUSTe" i], img[title*="TRUSTe" i], img[src*="truste" i]').first();
    await expect(trusteImage).toBeVisible();

    const source = await trusteImage.getAttribute('src');
    expect(source).toBeTruthy();
  });

  test('FT-029 footer representative links expose destinations', async ({ page }) => {
    const section = await getSection(page, 'Global Presence');
    const regionLink = section.getByRole('link', { name: /Global Presence|India|Americas|Europe/i }).first();
    await expect(regionLink).toBeVisible();

    const destination = await getLinkDestination(regionLink, page);
    expect(destination).toBeTruthy();
  });
});
