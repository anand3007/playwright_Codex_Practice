const { test, expect } = require('@playwright/test');
const { focusMovesIntoMain, tabUntil } = require('../accessibility/support/accessibility');
const {
  ensureHomepageShell,
  expectDestinationForName,
  expectSectionVisible,
  gotoHomepage,
  openMainMenu,
  setViewportPreset,
} = require('./support/hcltech-homepage');

const navigationDestinations = [
  ['AI and Generative AI', 'ai'],
  ['Cloud', 'cloud'],
  ['Leadership', 'leadership'],
  ['Case Studies', 'case-studies'],
  ['Explore job opportunities', 'careers.hcltech.com'],
];

const languageOptions = ['English', 'Japanese', 'German'];
const responsiveViewports = ['desktop', 'tablet', 'mobile'];

test.describe('BDD conversion: HCLTech homepage shell and navigation', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHomepage(page);
    await ensureHomepageShell(page);
  });

  test('Scenario: Homepage loads with critical sections visible', async ({ page }) => {
    await expectSectionVisible(page, /Our ambition is to be the/i);
    await expectSectionVisible(page, 'Have tech questions?');
    await expectSectionVisible(page, 'Latest Highlights');
    await expectSectionVisible(page, 'Driving Your Growth');
    await expectSectionVisible(page, /copyright/i);
  });

  test('Scenario: Visitor opens the main menu and views top-level navigation options', async ({ page }) => {
    await openMainMenu(page);

    await expectSectionVisible(page, 'What We Do');
    await expectSectionVisible(page, 'Industries');
    await expectSectionVisible(page, 'Who We Are');
    await expectSectionVisible(page, 'Resources');
    await expectSectionVisible(page, 'Careers');
  });

  for (const [menuItem, expectedFragment] of navigationDestinations) {
    test(`Scenario Outline: Visitor navigates to a key area from the main menu -> ${menuItem}`, async ({ page }) => {
      await openMainMenu(page);
      await expectDestinationForName(page, menuItem, expectedFragment);
    });
  }

  test('Scenario: Visitor opens the Contact Us journey from the homepage', async ({ page }) => {
    await expectDestinationForName(page, 'Contact Us', 'contact');
  });

  for (const language of languageOptions) {
    test(`Scenario Outline: Visitor switches homepage language -> ${language}`, async ({ page }) => {
      await expectDestinationForName(page, language);
    });
  }

  test('Scenario: Visitor opens and closes the search experience', async ({ page }) => {
    await expectSectionVisible(page, /Search Close/i);
    await expectSectionVisible(page, /Ask/i);
  });

  test('Scenario: Keyboard user skips repeated navigation', async ({ page }) => {
    await page.locator('body').click();
    await tabUntil(page, (activeElement) => /skip to main content/i.test(activeElement.text), 5);
    await page.keyboard.press('Enter');

    await expect.poll(async () => focusMovesIntoMain(page)).toBe(true);
  });

  for (const viewport of responsiveViewports) {
    test(`Scenario Outline: Visitor uses the homepage on a supported viewport -> ${viewport}`, async ({ page }) => {
      await setViewportPreset(page, viewport);
      await gotoHomepage(page);
      await ensureHomepageShell(page);

      await expectSectionVisible(page, 'Latest Highlights');
      await expectSectionVisible(page, 'Careers');
      await expect(await page.getByRole('link', { name: /contact us/i }).first()).toBeVisible();
    });
  }
});
