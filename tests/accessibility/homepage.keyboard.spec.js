const { test, expect } = require('@playwright/test');
const {
  focusMovesIntoMain,
  getMenuTrigger,
  gotoHomepage,
  tabUntil,
} = require('./support/accessibility');

test.describe('HCLTech homepage accessibility keyboard flows', () => {
  test('A11Y-002 keyboard user can skip repeated navigation', async ({ page }) => {
    await gotoHomepage(page);

    await page.locator('body').click();
    await tabUntil(page, (activeElement) => /skip to main content/i.test(activeElement.text), 5);
    await page.keyboard.press('Enter');

    await expect.poll(async () => focusMovesIntoMain(page)).toBe(true);
  });

  test('A11Y-006 keyboard user can open the main menu', async ({ page }) => {
    await gotoHomepage(page);

    const menuTrigger = getMenuTrigger(page).first();
    await expect(menuTrigger).toBeVisible();
    await menuTrigger.focus();
    await page.keyboard.press('Enter');

    await expect(page.getByText(/main navigation/i).first()).toBeVisible();
  });

  test('A11Y-031 keyboard user is not trapped in the main menu', async ({ page }) => {
    await gotoHomepage(page);

    const menuTrigger = getMenuTrigger(page).first();
    await expect(menuTrigger).toBeVisible();
    await menuTrigger.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByText(/main navigation/i).first()).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(menuTrigger).toBeFocused();
  });
});
