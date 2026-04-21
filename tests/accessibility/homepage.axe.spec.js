const { test, expect } = require('@playwright/test');
const {
  formatViolations,
  getBlockingViolations,
  gotoHomepage,
  runAxeAudit,
} = require('./support/accessibility');

test.describe('HCLTech homepage automated accessibility audits', () => {
  test('A11Y-035 homepage has no critical or serious axe violations on desktop', async ({ page }, testInfo) => {
    await gotoHomepage(page);

    const results = await runAxeAudit(page, testInfo);
    const blockingViolations = getBlockingViolations(results);

    expect(blockingViolations, formatViolations(blockingViolations)).toEqual([]);
  });

  test('A11Y-019 homepage remains accessible at a mobile viewport', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHomepage(page);

    const results = await runAxeAudit(page, testInfo);
    const blockingViolations = getBlockingViolations(results);

    expect(blockingViolations, formatViolations(blockingViolations)).toEqual([]);
  });
});
