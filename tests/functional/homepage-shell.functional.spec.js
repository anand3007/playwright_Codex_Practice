const { test, expect } = require('@playwright/test');
const {
  expectDestinationForName,
  expectVisibleText,
  getInteractive,
  getLinkDestination,
  gotoHomepage,
  openMenuIfAvailable,
  setViewportPreset,
} = require('./support/hcltech-functional');

const desktopNavItems = ['What We Do', 'Industries', 'Ecosystem', 'Who We Are', 'Resources', 'Careers'];
const languageOptions = ['English', 'Japanese', 'German'];
const responsivePresets = ['desktop', 'tablet', 'mobile'];

test.describe('HCLTech homepage functional shell', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHomepage(page);
  });

  test('FT-001 page load and initial rendering', async ({ page }) => {
    await expect(page).toHaveTitle(/HCLTech/i);
    await expect(page.getByRole('link', { name: /HCLTech/i }).first()).toBeVisible();
    await expectVisibleText(page, /Our ambition is to be the best AI Solutions company/i);
    await expectVisibleText(page, 'Have tech questions?');
    await expectVisibleText(page, 'Latest Highlights');
    await expectVisibleText(page, /Driving Your Growth|AI that delivers ROI/i);
    await expectVisibleText(page, /copyright/i);
  });

  test('FT-002 skip to main content is reachable', async ({ page }) => {
    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await expect(skipLink).toBeVisible();
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
  });

  test('FT-003 logo returns a valid homepage destination', async ({ page }) => {
    const logoLink = page.getByRole('link', { name: /HCLTech/i }).first();
    await expect(logoLink).toBeVisible();
    const destination = await getLinkDestination(logoLink, page);
    expect(destination).toMatch(/hcltech\.com\/?$/i);
  });

  test('FT-004 global menu trigger opens on a mobile viewport', async ({ page }) => {
    await setViewportPreset(page, 'mobile');
    await gotoHomepage(page);

    const opened = await openMenuIfAvailable(page);
    test.skip(!opened, 'The live homepage did not expose a dedicated menu trigger in this run.');

    for (const item of desktopNavItems) {
      await expectVisibleText(page, item);
    }
  });

  test('FT-005 desktop navigation exposes top-level groups', async ({ page }) => {
    for (const item of desktopNavItems) {
      await expectVisibleText(page, item);
    }
  });

  test('FT-006 contact us entry points to the contact journey', async ({ page }) => {
    await expectDestinationForName(page, 'Contact Us', 'contact');
  });

  test('FT-007 search entry area is visible and usable', async ({ page }) => {
    const askButton = await getInteractive(page, 'Ask');
    await expect(askButton).toBeVisible();
    await askButton.click().catch(() => {});

    await expect(page.getByRole('searchbox', { name: /search/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /close/i }).first()).toBeVisible();
  });

  test('FT-008 language switch options are exposed', async ({ page }) => {
    for (const language of languageOptions) {
      const locator = await getInteractive(page, language);
      const destination = await getLinkDestination(locator, page);
      expect(destination).toBeTruthy();
    }
  });

  test('FT-009 hero banner and interview CTA are available', async ({ page }) => {
    await expectVisibleText(page, /Our ambition is to be the best AI Solutions company/i);
    await expectDestinationForName(page, 'Watch the interview', 'youtube');
    await expect(await getInteractive(page, 'Pause')).toBeVisible();
  });

  for (const preset of responsivePresets) {
    test(`FT-010 responsive shell on ${preset}`, async ({ page }) => {
      await setViewportPreset(page, preset);
      await gotoHomepage(page);

      await expectVisibleText(page, 'Latest Highlights');
      await expectVisibleText(page, 'Careers');
      await expect(page.getByRole('link', { name: /contact us/i }).first()).toBeVisible();
    });
  }
});
