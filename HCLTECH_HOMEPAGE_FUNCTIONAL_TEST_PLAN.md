# HCLTech Homepage Functional Test Plan

Last reviewed against the live homepage: April 21, 2026
Target URL: https://www.hcltech.com/
Scope: Public homepage functionality visible from the main HCLTech landing page

## Purpose

This plan covers each visible homepage functionality and the checks needed to validate behavior, usability, content integrity, navigation accuracy and failure handling.

## Test Coverage Assumptions

- Focus is limited to the homepage and first-click behavior from that page.
- External destinations such as YouTube, Vimeo, press links and careers pages are validated as handoff journeys.
- Deep validation of downstream internal pages is out of scope unless the homepage directly depends on them.

## Recommended Browsers and Devices

- Chrome latest on Windows and macOS
- Edge latest on Windows
- Safari latest on macOS and iPhone
- Firefox latest on desktop
- Mobile viewports: 390x844 and 412x915
- Tablet viewport: 768x1024
- Desktop viewports: 1440x900 and 1920x1080

## Functionality-Wise Test Plan

### 1. Page Load and Initial Rendering

Objective:
Validate that the homepage loads correctly and presents all critical above-the-fold content.

Test scenarios:
- Verify `https://www.hcltech.com/` loads successfully over HTTPS.
- Verify no browser certificate or mixed-content warning is shown.
- Verify logo, hero banner, main navigation, language option, search entry and major CTAs are visible.
- Verify the page does not show broken layout, overlap, clipped text or missing styling.
- Verify key homepage sections render in expected order after page load.
- Verify page remains usable on slow network and partial content does not break layout.

Expected results:
- Page loads successfully with no fatal console or network blocking issue visible to the user.
- All critical content areas render without major visual regression.

### 2. Skip to Main Content

Objective:
Validate keyboard accessibility entry to main content.

Test scenarios:
- Use keyboard `Tab` from page start and verify `Skip to main content` becomes visible.
- Activate the control and verify focus moves to the main content region.
- Verify the skip action works consistently after page refresh.

Expected results:
- Skip link is keyboard accessible and moves focus correctly.

### 3. Brand Logo / Home Navigation

Objective:
Validate the site identity element and return-to-home behavior.

Test scenarios:
- Click the HCLTech logo from the homepage and verify behavior is correct.
- Navigate to an internal page from the homepage, then use the logo to return home.
- Verify logo is focusable and keyboard-activatable.

Expected results:
- Logo returns users to homepage or remains safely on homepage without error.

### 4. Global Menu Trigger

Objective:
Validate opening and closing of the main site menu.

Test scenarios:
- Verify the `Menu` control opens the navigation panel.
- Verify menu can be closed using mouse, keyboard and escape behavior if supported.
- Verify background page does not become unusable or visually broken when menu is open.
- Verify focus stays inside menu in mobile overlay mode if a modal pattern is used.

Expected results:
- Menu opens and closes reliably without trapping or losing user context.

### 5. Main Navigation Mega Menu

Observed primary groups:
- What We Do
- Industries
- Ecosystem
- Who We Are
- Resources
- Careers

Objective:
Validate access to all major navigation groups and representative submenu items.

Test scenarios:
- Verify each top-level navigation item expands or routes correctly.
- Verify submenu labels are visible and readable.
- Verify representative links under each group open the intended page.
- Verify nested items such as `AI Force`, `Cloud`, `Engineering and R&D Services`, `Banking`, `Leadership`, `Case Studies` and `Events and Webinars` work.
- Verify navigation remains usable across desktop hover behavior and mobile tap behavior.
- Verify no duplicate, dead or misrouted links are encountered from the mega menu.

Expected results:
- Every primary nav group is reachable and its main child links route correctly.

### 6. Contact Us Entry

Objective:
Validate homepage access to the contact flow.

Test scenarios:
- Click `Contact Us` from header and verify destination loads.
- Verify the page or form is usable on desktop and mobile.
- If a contact form exists, verify required-field validation, submission success path and error handling.
- Verify back navigation returns cleanly to homepage.

Expected results:
- Contact journey is accessible and not blocked by broken routing or form defects.

### 7. Ask / Search Entry Area

Observed elements:
- `Ask`
- `Search Close`

Objective:
Validate search access and its open/close behavior.

Test scenarios:
- Verify search opens from the header utility area.
- Verify search input accepts valid text.
- Verify empty input handling is graceful.
- Verify close action dismisses search without page break.
- Verify focus returns logically after closing search.
- Verify special characters and long input do not break UI.

Expected results:
- Search utility behaves consistently and does not cause layout or focus issues.

### 8. Language Selector

Observed languages:
- English
- Japanese
- German

Objective:
Validate language-switch functionality from the homepage.

Test scenarios:
- Open the language selector and verify all three languages are visible.
- Switch from English to Japanese and German.
- Verify destination content reflects chosen language where supported.
- Verify homepage remains usable after switching.
- Verify switching language does not produce incorrect redirects or 404 pages.

Expected results:
- Language options are available and route users correctly.

### 9. Hero Banner / Lead Story

Observed hero functionality:
- Main banner with quote and supporting text
- `Watch the interview` CTA
- `Pause` control

Objective:
Validate hero content, media CTA and carousel control behavior.

Test scenarios:
- Verify hero banner content loads without image or text overlap.
- Verify `Watch the interview` opens the expected YouTube destination.
- Verify `Pause` stops automatic slide rotation if auto-rotation is enabled.
- Verify paused state is preserved long enough for the user to read content.
- Verify hero CTA remains visible and clickable on mobile.

Expected results:
- Hero is readable, stable and its controls work as intended.

### 10. AI Answer Engine Widget

Observed elements:
- Text input area
- `Submit`
- `Clear`
- Loading message: `I'm thinking-please give me a few seconds`
- `Related content`
- Suggested follow-up question area

Objective:
Validate AI widget behavior, input handling and user feedback.

Test scenarios:
- Enter a valid business-related prompt and click `Submit`.
- Verify loading state appears while response is processed.
- Verify response area populates without breaking surrounding layout.
- Verify `Clear` resets input and response state.
- Verify empty submission is prevented or handled gracefully.
- Verify long input, special characters and pasted multi-line text are handled safely.
- Verify error behavior if the AI response fails or times out.
- Verify related content links shown after a response are clickable and relevant.

Expected results:
- AI interaction is usable, responsive and fails gracefully.

### 11. AI That Delivers ROI Section

Observed functionality:
- `Find out more` CTA
- ROI metric highlights

Objective:
Validate CTA behavior and visibility of business metrics.

Test scenarios:
- Verify the section appears after the AI widget.
- Click `Find out more` and validate destination page.
- Verify numerical ROI statements render clearly and do not overlap.
- Verify content remains readable on smaller screens.

Expected results:
- CTA works and metrics are displayed clearly.

### 12. Latest Highlights Section

Observed functionality:
- Featured cards
- Video links
- Press release links
- External article links

Objective:
Validate homepage featured-content cards and their mixed destinations.

Test scenarios:
- Verify each highlight card is visible with title, category and CTA.
- Click internal story cards and verify correct landing pages.
- Click video cards and verify YouTube or Vimeo handoff works.
- Click external press links and verify destinations load in browser without security warnings.
- Verify external content is clearly indicated where applicable.
- Verify images and thumbnails load successfully.

Expected results:
- All cards and CTAs lead to the correct internal or external destination.

### 13. Services Overview Cards

Observed cards:
- AI
- Cloud
- Engineering

Objective:
Validate the service tiles and their CTAs.

Test scenarios:
- Verify each service card displays title, image, summary and CTA.
- Verify `Explore our AI Services`, `Explore our Cloud Solutions` and `Explore our Engineering Services` route correctly.
- Verify duplicate CTA text does not create confusion or accessibility issues.
- Verify card layout reflows properly on tablet and mobile.

Expected results:
- All service cards are stable, readable and correctly linked.

### 14. About HCLTech / Stats Section

Observed functionality:
- `Learn more about HCLTech`
- Stats such as delivery centers, labs, clients and patents

Objective:
Validate corporate overview CTA and stat presentation.

Test scenarios:
- Verify `Learn more about HCLTech` opens the correct destination.
- Verify numeric counters and labels are visible and semantically grouped.
- Verify no stat text is truncated on smaller screens.

Expected results:
- CTA works and business stats render accurately.

### 15. Global Recognition / Analyst Reports

Observed functionality:
- Multiple `Download the analyst report` links

Objective:
Validate analyst-report links and document access behavior.

Test scenarios:
- Click each analyst report CTA and verify correct landing page or download behavior.
- Verify download or gated flow is expected and not broken.
- Verify duplicate report blocks remain distinct and readable.
- Verify PDF or external document opens without corrupted file behavior.

Expected results:
- Analyst report links are functional and users can proceed without ambiguity.

### 16. Client Testimonials Carousel

Observed functionality:
- Client quote cards
- Customer logos and names
- `Watch` links
- `Previous` and `Next` controls

Objective:
Validate testimonial rotation and associated media behavior.

Test scenarios:
- Verify testimonial section loads with client quote, speaker name and designation.
- Click `Previous` and `Next` and verify carousel transitions correctly.
- Verify carousel does not skip, duplicate or freeze slides.
- Click each available `Watch` link and validate video destination.
- Verify manual navigation works on mobile through touch or visible controls.

Expected results:
- Carousel navigation and supporting links work consistently.

### 17. Case Studies Section

Observed functionality:
- `See all case studies`
- Multiple case study cards
- `Read more` / `Learn more`
- Play control visible on the section

Objective:
Validate featured case study cards and section-level controls.

Test scenarios:
- Verify all visible case study cards show title, category and CTA.
- Click each visible case study CTA and verify routing.
- Click `See all case studies` and verify landing page.
- If the section supports carousel or auto-play, validate `Play` behavior.
- Verify cards do not shift unexpectedly while reading.

Expected results:
- Case study cards and section CTA behave correctly.

### 18. Careers Promo Section

Observed functionality:
- `Explore careers`

Objective:
Validate the primary careers promotion block.

Test scenarios:
- Click `Explore careers` and verify handoff to `careers.hcltech.com`.
- Verify careers destination opens correctly on desktop and mobile.
- Verify return navigation back to homepage remains stable.

Expected results:
- Careers CTA reliably hands off to the jobs platform.

### 19. Newsletter / Stay Connected CTA

Observed functionality:
- `Subscribe to the HCLTech Trends and Insights Newsletter`
- `Stay connected`

Objective:
Validate newsletter subscription entry behavior.

Test scenarios:
- Click `Stay connected` and verify correct destination, modal or form behavior.
- If a sign-up form opens, verify field validation and submission behavior.
- Verify consent, privacy text or marketing preferences are visible if required.
- Verify invalid email format is handled correctly.

Expected results:
- Newsletter entry point works and validates user input properly.

### 20. Breadcrumb / Page Context Area

Observed text:
- `Homepage Home Home HCLTech: Supercharging Progress | Digital, Engineering and Cloud`

Objective:
Validate breadcrumb or page-context information if surfaced to users or assistive tech.

Test scenarios:
- Verify breadcrumb text is not duplicated or confusing in visible UI.
- Verify breadcrumb links, if interactive, return to the expected page.
- Verify screen-reader experience is sensible.

Expected results:
- Page-context elements are accurate and not misleading.

### 21. Footer Navigation

Observed footer groups include:
- What We Do
- Industries
- Who We Are
- Resources
- Careers
- Global Presence

Objective:
Validate footer discoverability and large-site navigation integrity.

Test scenarios:
- Verify each footer group is rendered and expandable if collapsible on mobile.
- Validate representative links from each column.
- Validate country and region links under Careers and Global Presence.
- Verify footer remains readable and usable on mobile without overlap.

Expected results:
- Footer provides valid, working navigation with no dead links.

### 22. Social Media Links

Observed social links:
- Facebook
- Twitter
- LinkedIn
- Instagram
- YouTube
- Threads

Objective:
Validate social handoff links and icon accessibility.

Test scenarios:
- Click each social link and verify it opens the correct official destination.
- Verify link labels are accessible and icons are keyboard reachable.
- Verify no broken, redirected or unsafe social destinations.

Expected results:
- Social links point to the intended HCLTech social properties.

### 23. Cookie / Privacy Messaging

Observed functionality:
- Cookie usage statement with `cookies policy`

Objective:
Validate cookie-policy access and privacy messaging.

Test scenarios:
- Verify cookie messaging is visible and readable.
- Click `cookies policy` and verify destination loads.
- Verify message does not overlap other footer content.

Expected results:
- Cookie notice is accessible and linked correctly.

### 24. Legal / Utility Footer Links

Observed links:
- Contact Us
- Disclaimer
- Privacy Statement
- Terms of use
- Sitemap
- Raise a Grievance

Objective:
Validate legal and utility pages linked from footer.

Test scenarios:
- Click each legal link and verify destination loads successfully.
- Verify each destination is appropriate for the label clicked.
- Verify `Raise a Grievance` is functional and not broken.
- Verify back navigation to homepage works correctly.

Expected results:
- All legal and utility links are reachable and accurate.

### 25. Trust / Certification Badge

Observed functionality:
- `TRUSTe` badge image

Objective:
Validate trust badge rendering and its behavior.

Test scenarios:
- Verify badge is displayed correctly and not broken.
- If clickable, verify it opens the expected trust/certification destination.
- Verify alt text or accessible labeling is meaningful.

Expected results:
- Trust indicator is visible and behaves correctly.

## Cross-Cutting Checks for Every Functionality

Apply these checks to each interactive area above:
- Verify mouse interaction works.
- Verify keyboard interaction works.
- Verify focus indicator is visible.
- Verify screen resize does not break the component.
- Verify no console-visible UI errors affect behavior.
- Verify loading, empty and error states are graceful where applicable.
- Verify analytics or tracking calls fire if your environment supports validation.

## Suggested Severity Levels

- Sev-1: Homepage unavailable, critical navigation broken, AI widget crashes page, contact/careers handoff blocked
- Sev-2: Major CTA misroutes, search/language flow broken, core carousel or footer nav unusable
- Sev-3: Partial component issue, broken external card, mobile layout defect, missing media
- Sev-4: Minor copy issue, small alignment defect, low-impact visual inconsistency

## Suggested Automation Candidates for Playwright

- Homepage load smoke test
- Header and mega-menu navigation smoke suite
- Language selector checks
- Search open/close and input validation
- Hero CTA and highlight-card link checks
- AI widget empty-state and clear-button flow
- Client carousel next/previous behavior
- Careers and newsletter CTA handoff validation
- Footer legal-link and social-link validation

## Notes

- This plan is based on the homepage structure observed on April 21, 2026, and content-driven sections may change over time.
- For automation, prefer robust selectors based on roles, labels and stable text rather than fragile CSS paths.
