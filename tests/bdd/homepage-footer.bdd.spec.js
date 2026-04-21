const { test } = require('@playwright/test');
const {
  ensureHomepageShell,
  expectDestinationForName,
  expectSectionVisible,
  gotoHomepage,
} = require('./support/hcltech-homepage');

const footerLinks = [
  ['Disclaimer', 'disclaimer'],
  ['Privacy Statement', 'privacy'],
  ['Terms of use', 'terms'],
  ['Sitemap', 'sitemap'],
  ['Raise a Grievance', 'grievance'],
];

const socialLinks = [
  ['Facebook', 'facebook.com'],
  ['Twitter', 'twitter.com'],
  ['LinkedIn', 'linkedin.com'],
  ['Instagram', 'instagram.com'],
  ['Youtube', 'youtube.com'],
  ['Threads', 'threads.net'],
];

test.describe('BDD conversion: HCLTech homepage footer journeys', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHomepage(page);
    await ensureHomepageShell(page);
    await expectSectionVisible(page, /copyright/i);
  });

  for (const [footerLink, expectedFragment] of footerLinks) {
    test(`Scenario Outline: Visitor uses a footer legal or utility link -> ${footerLink}`, async ({ page }) => {
      await expectDestinationForName(page, footerLink, expectedFragment);
    });
  }

  for (const [socialPlatform, expectedFragment] of socialLinks) {
    test(`Scenario Outline: Visitor opens an HCLTech social link -> ${socialPlatform}`, async ({ page }) => {
      await expectDestinationForName(page, socialPlatform, expectedFragment);
    });
  }

  test('Scenario: Visitor opens the cookies policy from the footer area', async ({ page }) => {
    await expectDestinationForName(page, 'cookies policy', 'cookie');
  });
});
