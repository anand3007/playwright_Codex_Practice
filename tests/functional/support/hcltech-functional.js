const { expect } = require('@playwright/test');

const HOMEPAGE_URLS = ['https://hcltech.com/', 'https://www.hcltech.com/'];

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function toPattern(value) {
  if (value instanceof RegExp) {
    return value;
  }

  return new RegExp(escapeRegExp(value).replace(/\s+/g, '\\s+'), 'i');
}

function candidatesForText(page, value) {
  const pattern = toPattern(value);
  return [
    page.getByRole('heading', { name: pattern }),
    page.getByRole('link', { name: pattern }),
    page.getByRole('button', { name: pattern }),
    page.getByText(pattern),
  ];
}

async function firstVisible(candidates) {
  for (const candidate of candidates) {
    const count = await candidate.count().catch(() => 0);
    if (!count) {
      continue;
    }

    const locator = candidate.first();
    if (await locator.isVisible().catch(() => false)) {
      return locator;
    }
  }

  return candidates[0].first();
}

async function gotoHomepage(page) {
  let lastError;

  for (const url of HOMEPAGE_URLS) {
    try {
      await page.goto(url, { waitUntil: 'commit', timeout: 25_000 });
      await Promise.any([
        expect(page).toHaveTitle(/HCLTech/i, { timeout: 15_000 }),
        expect(page.getByRole('link', { name: /contact us/i }).first()).toBeVisible({ timeout: 15_000 }),
      ]);
      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

async function setViewportPreset(page, preset) {
  const viewport = VIEWPORTS[preset];
  if (!viewport) {
    throw new Error(`Unknown viewport preset: ${preset}`);
  }

  await page.setViewportSize(viewport);
}

async function expectVisibleText(page, value) {
  const locator = await firstVisible(candidatesForText(page, value));
  await locator.scrollIntoViewIfNeeded().catch(() => {});
  await expect(locator).toBeVisible();
  return locator;
}

async function getInteractive(page, value) {
  const pattern = toPattern(value);
  const candidates = [
    page.getByRole('link', { name: pattern }),
    page.getByRole('button', { name: pattern }),
    page.locator('[role="button"]').filter({ hasText: pattern }),
    page.getByText(pattern),
  ];
  const locator = await firstVisible(candidates);
  await locator.scrollIntoViewIfNeeded().catch(() => {});
  return locator;
}

async function getLinkDestination(locator, page) {
  const href = await locator.evaluate((element) => {
    const link = element.closest('a') ?? element;
    return link.getAttribute('href') || link.href || '';
  });

  return href ? new URL(href, page.url()).href : '';
}

async function expectDestinationForName(page, value, expectedFragment) {
  const locator = await getInteractive(page, value);
  await expect(locator).toBeVisible();
  const destination = await getLinkDestination(locator, page);
  expect(destination).toBeTruthy();

  if (expectedFragment) {
    expect(destination.toLowerCase()).toContain(expectedFragment.toLowerCase());
  }

  return destination;
}

async function getMenuTrigger(page) {
  const candidates = [
    page.getByRole('button', { name: /^menu$/i }),
    page.getByRole('link', { name: /^menu$/i }),
    page.locator('button, a').filter({ hasText: /^Menu$/i }),
  ];

  return firstVisible(candidates);
}

async function openMenuIfAvailable(page) {
  const menuTrigger = await getMenuTrigger(page);
  const visible = await menuTrigger.isVisible().catch(() => false);

  if (!visible) {
    return false;
  }

  await menuTrigger.click().catch(async () => {
    await menuTrigger.focus();
    await page.keyboard.press('Enter');
  });

  return true;
}

async function getSection(page, value) {
  const pattern = toPattern(value);
  const locator = page.locator('section, article, div').filter({ hasText: pattern }).first();
  await locator.scrollIntoViewIfNeeded().catch(() => {});
  await expect(locator).toBeVisible();
  return locator;
}

async function expectNoSevereConsoleErrors(page) {
  const messages = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      messages.push(msg.text());
    }
  });
  return messages;
}

module.exports = {
  HOMEPAGE_URLS,
  VIEWPORTS,
  expectDestinationForName,
  expectNoSevereConsoleErrors,
  expectVisibleText,
  firstVisible,
  getInteractive,
  getLinkDestination,
  getMenuTrigger,
  getSection,
  gotoHomepage,
  openMenuIfAvailable,
  setViewportPreset,
  toPattern,
};
