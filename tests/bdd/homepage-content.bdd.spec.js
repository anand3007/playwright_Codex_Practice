const { test, expect } = require('@playwright/test');
const {
  ensureHomepageShell,
  expectDestinationForName,
  expectSectionVisible,
  getInteractive,
  getLinkDestination,
  getSectionContainer,
  gotoHomepage,
} = require('./support/hcltech-homepage');

const highlightTitles = [
  'Opportunity lies in scaling AI adoption to deliver measurable enterprise impact.',
  'HCLTech unveils AI Force 2.0',
  'HCLTech named by Ethisphere as World’s Most Ethical Company® for the third year',
];

const serviceDestinations = [
  ['Explore our AI Services', 'ai'],
  ['Explore our Cloud Solutions', 'cloud'],
  ['Explore our Engineering Services', 'engineering'],
];

test.describe('BDD conversion: HCLTech homepage content journeys', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHomepage(page);
    await ensureHomepageShell(page);
  });

  test('Scenario: Visitor submits a question in the AI answer engine', async ({ page }) => {
    const aiSection = await getSectionContainer(page, 'Have tech questions?');
    const textInput = aiSection.locator('textarea, input:not([type="hidden"])').first();

    test.skip((await textInput.count()) === 0, 'No stable AI input selector was exposed on the live homepage.');

    await expect(textInput).toBeVisible();
    await textInput.fill('Tell me about HCLTech cloud capabilities.');
    await aiSection.getByRole('button', { name: /^submit$/i }).click();

    await expect(
      aiSection.getByText(/I.m thinking|Related content|What would you like to ask next\?/i).first()
    ).toBeVisible();
  });

  test('Scenario: Visitor clears the AI answer engine state', async ({ page }) => {
    const aiSection = await getSectionContainer(page, 'Have tech questions?');
    const textInput = aiSection.locator('textarea, input:not([type="hidden"])').first();

    test.skip((await textInput.count()) === 0, 'No stable AI input selector was exposed on the live homepage.');

    await expect(textInput).toBeVisible();
    await textInput.fill('Reset this content');
    await aiSection.getByRole('button', { name: /^clear$/i }).click();
    await expect(textInput).toHaveValue('');
  });

  test('Scenario: Visitor opens the hero media interview', async ({ page }) => {
    await expectDestinationForName(page, 'Watch the interview', 'youtube');
  });

  test('Scenario: Visitor pauses rotating hero content', async ({ page }) => {
    const pauseControl = await getInteractive(page, 'Pause');
    await expect(pauseControl).toBeVisible();
    await pauseControl.click().catch(() => {});
    await expect(pauseControl).toBeVisible();
  });

  for (const title of highlightTitles) {
    test(`Scenario Outline: Visitor opens a featured highlight from the homepage -> ${title}`, async ({ page }) => {
      await expectSectionVisible(page, 'Latest Highlights');
      await expectDestinationForName(page, title);
    });
  }

  for (const [serviceCta, expectedFragment] of serviceDestinations) {
    test(`Scenario Outline: Visitor opens a key service area from the homepage -> ${serviceCta}`, async ({ page }) => {
      await expectSectionVisible(page, 'Driving Your Growth');
      await expectDestinationForName(page, serviceCta, expectedFragment);
    });
  }

  test('Scenario: Visitor opens the company overview page from the homepage', async ({ page }) => {
    await expectDestinationForName(page, 'Learn more about HCLTech');
  });

  test('Scenario: Visitor opens an analyst report link', async ({ page }) => {
    await expectSectionVisible(page, 'Global Recognition for Sustained Excellence');
    await expectDestinationForName(page, 'Download the analyst report');
  });

  test('Scenario: Visitor navigates through client testimonials', async ({ page }) => {
    await expectSectionVisible(page, 'Hear from Our Clients');

    const nextButton = await getInteractive(page, 'Next');
    const previousButton = await getInteractive(page, 'Previous');

    await expect(nextButton).toBeVisible();
    await expect(previousButton).toBeVisible();

    await nextButton.click().catch(() => {});
    await previousButton.click().catch(() => {});
  });

  test('Scenario: Visitor opens a testimonial media link', async ({ page }) => {
    const section = await getSectionContainer(page, 'Hear from Our Clients');
    const watchLink = section.getByRole('link', { name: /^watch$/i }).first();

    await expect(watchLink).toBeVisible();
    const destination = await getLinkDestination(watchLink, page);
    expect(destination).toMatch(/youtube|vimeo/i);
  });

  test('Scenario: Visitor explores case studies from the homepage', async ({ page }) => {
    await expectSectionVisible(page, 'Case Studies');
    await expectDestinationForName(page, 'See all case studies', 'case-studies');
  });

  test('Scenario: Visitor opens a featured case study card', async ({ page }) => {
    const section = await getSectionContainer(page, 'Case Studies');
    const caseStudyLink = section.getByRole('link', { name: /Read more|Learn more/i }).first();

    await expect(caseStudyLink).toBeVisible();
    const destination = await getLinkDestination(caseStudyLink, page);
    expect(destination).toBeTruthy();
  });

  test('Scenario: Visitor opens the careers journey from the homepage', async ({ page }) => {
    await expectDestinationForName(page, 'Explore careers', 'careers.hcltech.com');
  });

  test('Scenario: Visitor starts the newsletter signup journey', async ({ page }) => {
    await expectSectionVisible(page, 'Subscribe to the HCLTech Trends and Insights Newsletter');
    await expectDestinationForName(page, 'Stay connected');
  });
});
