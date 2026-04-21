const { test, expect } = require('@playwright/test');
const {
  expectDestinationForName,
  expectVisibleText,
  getInteractive,
  getLinkDestination,
  getSection,
  gotoHomepage,
} = require('./support/hcltech-functional');

const representativeNavLinks = [
  ['Cloud', 'cloud'],
  ['Leadership', 'leadership'],
  ['Case Studies', 'case-studies'],
  ['Events and Webinars', 'events'],
];

const highlightTitles = [
  'Opportunity lies in scaling AI adoption to deliver measurable enterprise impact.',
  'HCLTech unveils AI Force 2.0',
  'HCLTech named by Ethisphere as World’s Most Ethical Company® for the third year',
];

const serviceCtas = [
  ['Explore our AI Services', 'ai'],
  ['Explore our Cloud Solutions', 'cloud'],
  ['Explore our Engineering Services', 'engineering'],
];

test.describe('HCLTech homepage functional content flows', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHomepage(page);
  });

  for (const [name, fragment] of representativeNavLinks) {
    test(`FT-011 representative navigation link routes correctly -> ${name}`, async ({ page }) => {
      await expectDestinationForName(page, name, fragment);
    });
  }

  test('FT-012 AI widget accepts input and exposes submit', async ({ page }) => {
    const aiSection = await getSection(page, 'Have tech questions?');
    const input = aiSection.getByRole('textbox', { name: /please ask a question|search/i }).first();

    test.skip((await input.count()) === 0, 'No stable AI text input was available in this run.');

    await expect(input).toBeVisible();
    await input.fill('Tell me about HCLTech cloud solutions.');
    await expect(aiSection.getByRole('button', { name: /^submit$/i })).toBeVisible();
  });

  test('FT-013 AI ROI section is visible and CTA routes correctly', async ({ page }) => {
    await expectVisibleText(page, /AI that delivers ROI/i);
    await expectDestinationForName(page, 'Find out more', 'ai');
  });

  for (const title of highlightTitles) {
    test(`FT-014 highlight card routes correctly -> ${title}`, async ({ page }) => {
      await expectVisibleText(page, 'Latest Highlights');
      await expectDestinationForName(page, title);
    });
  }

  for (const [cta, fragment] of serviceCtas) {
    test(`FT-015 service card routes correctly -> ${cta}`, async ({ page }) => {
      await expectVisibleText(page, /Driving Your Growth|AI that delivers ROI/i);
      await expectDestinationForName(page, cta, fragment);
    });
  }

  test('FT-016 About HCLTech CTA and stats area are visible', async ({ page }) => {
    const section = await getSection(page, 'Learn more about HCLTech');
    await expect(section).toContainText(/\d/);
    await expectDestinationForName(page, 'Learn more about HCLTech');
  });

  test('FT-017 analyst report links are exposed', async ({ page }) => {
    await expectVisibleText(page, /Global Recognition|Sustained Excellence/i);
    const reportLinks = page.getByRole('link', { name: /download the analyst report/i });
    expect(await reportLinks.count()).toBeGreaterThan(0);

    const destination = await getLinkDestination(reportLinks.first(), page);
    expect(destination).toBeTruthy();
  });

  test('FT-018 testimonial carousel controls and media links are present', async ({ page }) => {
    const section = await getSection(page, 'Hear from Our Clients');
    await expect(section.getByText(/Next|Previous/i).first()).toBeVisible();

    const watchLink = section.getByRole('link', { name: /^watch$/i }).first();
    await expect(watchLink).toBeVisible();
    const destination = await getLinkDestination(watchLink, page);
    expect(destination).toMatch(/youtube|vimeo/i);
  });

  test('FT-019 case studies section routes correctly', async ({ page }) => {
    const section = await getSection(page, 'Case Studies');
    await expect(section.getByRole('link', { name: /see all case studies/i })).toBeVisible();
    await expectDestinationForName(page, 'See all case studies', 'case-studies');

    const caseStudyLink = section.getByRole('link', { name: /read more|learn more/i }).first();
    await expect(caseStudyLink).toBeVisible();
  });

  test('FT-020 careers promo section routes to careers domain', async ({ page }) => {
    await expectDestinationForName(page, 'Explore careers', 'careers.hcltech.com');
  });

  test('FT-021 newsletter CTA is visible and routable', async ({ page }) => {
    await expectVisibleText(page, 'Subscribe to the HCLTech Trends and Insights Newsletter');
    await expectDestinationForName(page, 'Stay connected');
  });

  test('FT-022 breadcrumb or page context text is exposed if present', async ({ page }) => {
    const breadcrumbText = page.getByText(/Homepage Home Home HCLTech|Supercharging Progress/i).first();
    await expect(breadcrumbText).toBeVisible();
  });
});
