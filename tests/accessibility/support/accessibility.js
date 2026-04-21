const { expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const HOMEPAGE_URL = 'https://www.hcltech.com/';
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'];

async function gotoHomepage(page) {
  await page.goto(HOMEPAGE_URL, { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/hcltech\.com/i);
  await expect(page).toHaveTitle(/HCLTech/i);
}

async function runAxeAudit(page, testInfo, options = {}) {
  let builder = new AxeBuilder({ page }).withTags(WCAG_TAGS).exclude('iframe');

  for (const selector of options.exclude ?? []) {
    builder = builder.exclude(selector);
  }

  const results = await builder.analyze();

  if (testInfo) {
    await testInfo.attach('axe-results.json', {
      body: Buffer.from(JSON.stringify(results, null, 2)),
      contentType: 'application/json',
    });
  }

  return results;
}

function getBlockingViolations(results) {
  return results.violations.filter((violation) =>
    ['critical', 'serious'].includes(violation.impact)
  );
}

function formatViolations(violations) {
  if (!violations.length) {
    return 'No critical or serious accessibility violations were found.';
  }

  return violations
    .map((violation) => {
      const targets = violation.nodes
        .flatMap((node) => node.target)
        .slice(0, 5)
        .join(', ');
      return `${violation.id} [${violation.impact}] ${violation.help} -> ${targets}`;
    })
    .join('\n');
}

async function getLandmarkCounts(page) {
  return page.evaluate(() => ({
    banner: document.querySelectorAll('header, [role="banner"]').length,
    main: document.querySelectorAll('main, [role="main"]').length,
    navigation: document.querySelectorAll('nav, [role="navigation"]').length,
    contentinfo: document.querySelectorAll('footer, [role="contentinfo"]').length,
    headingsLevel1: document.querySelectorAll('h1').length,
  }));
}

async function tabUntil(page, predicate, maxTabs = 40) {
  for (let index = 0; index < maxTabs; index += 1) {
    await page.keyboard.press('Tab');
    const activeElement = await page.evaluate(() => {
      const active = document.activeElement;
      if (!active) {
        return null;
      }

      const accessibleText = [
        active.getAttribute('aria-label'),
        active.innerText,
        active.textContent,
        active.getAttribute('title'),
        active.getAttribute('alt'),
        active.getAttribute('placeholder'),
      ]
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();

      return {
        text: accessibleText,
        tagName: active.tagName,
        role: active.getAttribute('role') || '',
      };
    });

    if (activeElement && predicate(activeElement)) {
      return activeElement;
    }
  }

  throw new Error(`Could not find the expected focus target within ${maxTabs} tab presses.`);
}

async function focusMovesIntoMain(page) {
  return page.evaluate(() => {
    const active = document.activeElement;
    const main = document.querySelector('main, [role="main"]');
    return Boolean(active && main && (active === main || main.contains(active)));
  });
}

function getMenuTrigger(page) {
  return page
    .getByRole('button', { name: /^menu$/i })
    .or(page.getByRole('link', { name: /^menu$/i }))
    .or(page.getByText(/^Menu$/).first());
}

module.exports = {
  HOMEPAGE_URL,
  focusMovesIntoMain,
  formatViolations,
  getBlockingViolations,
  getLandmarkCounts,
  getMenuTrigger,
  gotoHomepage,
  runAxeAudit,
  tabUntil,
};
