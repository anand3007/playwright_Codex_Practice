# HCLTech Accessibility Test Plan

Last reviewed: April 21, 2026
Target URL: https://www.hcltech.com/
Primary standard: WCAG 2.2 AA
Secondary references: WAI-ARIA Authoring Practices, keyboard accessibility, screen reader compatibility

## Purpose

This plan defines accessibility-focused test coverage for the HCLTech homepage and its first-click journeys. The goal is to verify that users can perceive, operate, understand and robustly interact with the page using keyboard navigation, screen readers, zoom, reduced motion settings and assistive technologies.

## Scope

In scope:
- Homepage accessibility behavior
- Header, menu, search and language selector
- Hero banner and rotating content
- AI answer engine widget
- Highlight cards, service tiles and CTA links
- Client testimonial carousel
- Careers and newsletter CTA entry points
- Footer navigation, social links and legal links

Out of scope:
- Deep validation of every downstream page linked from the homepage
- Internal systems outside the public website
- Native accessibility of third-party destinations after handoff unless the homepage embeds them directly

## Assistive Technology Matrix

Browsers:
- Chrome latest
- Edge latest
- Safari latest
- Firefox latest

Screen readers:
- NVDA with Chrome or Firefox on Windows
- JAWS with Chrome or Edge on Windows if available
- VoiceOver with Safari on macOS
- VoiceOver on iPhone for mobile spot checks

Additional settings:
- 200 percent browser zoom
- 400 percent zoom for reflow testing where applicable
- Reduced motion enabled
- Keyboard-only navigation
- High contrast mode on Windows if available

## Test Approach

Use a mix of:
- Manual accessibility testing
- Keyboard-only testing
- Screen reader testing
- Responsive and zoom testing
- Automated scanning with tools such as Axe, Lighthouse or equivalent

## Entry Criteria

- Homepage is reachable in the test environment.
- Required browsers and screen readers are available.
- Testers know the expected user flows for menu, search, language switcher and CTA links.

## Exit Criteria

- All critical and high-priority accessibility test cases have been executed.
- No blocker issues remain for keyboard access, screen reader access, form accessibility, focus visibility or severe contrast failure.
- All accessibility defects are documented with reproduction steps, impact and severity.

## Severity Guide

- Critical: User cannot access or operate a major journey with keyboard or screen reader.
- High: Significant barrier to understanding, navigation or task completion.
- Medium: Partial usability problem or inconsistent accessible behavior.
- Low: Minor accessibility issue with limited impact.

## Accessibility Test Cases

### A11Y-001 Homepage loads with semantic structure

Objective:
Validate that the page exposes a meaningful document structure.

Steps:
1. Open the homepage.
2. Inspect landmarks using browser accessibility tools or a screen reader rotor.
3. Check for banner, main, navigation and contentinfo regions.
4. Review heading hierarchy.

Expected result:
- Landmarks exist and are meaningful.
- The page has one clear `h1` and a logical heading sequence.

### A11Y-002 Skip to main content works

Objective:
Ensure keyboard users can bypass repeated navigation.

Steps:
1. Load the homepage.
2. Press `Tab` until the skip link is visible.
3. Activate it.
4. Verify focus moves to the main content area.

Expected result:
- Skip link is visible on focus and moves focus correctly.

### A11Y-003 All interactive elements are keyboard reachable

Objective:
Verify users can access all primary controls without a mouse.

Steps:
1. Navigate through the homepage with `Tab`, `Shift+Tab`, `Enter` and `Space`.
2. Check header utilities, menu items, hero controls, AI widget controls, carousel controls, CTAs and footer links.
3. Confirm no element is skipped unexpectedly.

Expected result:
- All important controls are keyboard reachable and operable.

### A11Y-004 Visible focus indicator is present

Objective:
Verify focus is always visible during keyboard navigation.

Steps:
1. Tab through interactive elements across the page.
2. Observe focus styling on links, buttons, inputs and controls.

Expected result:
- Focus indicator is visible, persistent and has sufficient contrast.

### A11Y-005 Focus order is logical

Objective:
Validate the tab sequence matches visual and functional order.

Steps:
1. Tab through the page from top to bottom.
2. Verify the order follows header, utilities, hero, content sections, footer and legal links.
3. Open menu overlays and search overlays if present and re-check focus order.

Expected result:
- Focus order is logical and does not jump unpredictably.

### A11Y-006 Menu is accessible by keyboard and screen reader

Objective:
Verify main navigation works for non-mouse users.

Steps:
1. Open the menu using keyboard.
2. Navigate top-level and nested items.
3. Check whether expanded or collapsed state is announced.
4. Close the menu and verify focus returns to the trigger.

Expected result:
- Menu is fully keyboard operable.
- Screen reader announces menu state and item names correctly.

### A11Y-007 Search entry is accessible

Objective:
Validate search behavior for assistive technology users.

Steps:
1. Open the search interface.
2. Verify the search field has an accessible name.
3. Enter text, clear text and close search.
4. Check focus behavior and state announcements.

Expected result:
- Search input is labeled.
- Open and close behavior is accessible.
- Focus returns logically after dismissal.

### A11Y-008 Language selector is accessible

Objective:
Validate language-switch controls and page language behavior.

Steps:
1. Reach the language selector using keyboard.
2. Verify language options are announced clearly.
3. Switch language.
4. Inspect whether the page language attribute is updated where expected.

Expected result:
- Language options are understandable and operable.
- Page language metadata is accurate after switching.

### A11Y-009 Logo has meaningful accessible name

Objective:
Verify the brand logo communicates its function.

Steps:
1. Inspect the HCLTech logo with a screen reader.
2. Activate it using keyboard.

Expected result:
- Logo has a meaningful accessible name such as HCLTech home.
- It behaves as a valid home link or safe homepage control.

### A11Y-010 Hero banner content is readable and understandable

Objective:
Validate hero text, CTA and controls for accessibility.

Steps:
1. Review hero content visually and with a screen reader.
2. Verify `Watch the interview` and `Pause` are clearly named.
3. Check text contrast on images.
4. If the hero rotates automatically, verify the user can pause it.

Expected result:
- Hero content is readable.
- Controls have meaningful labels.
- Motion can be paused if auto-rotation exists.

### A11Y-011 Auto-rotating content respects motion and control

Objective:
Ensure rotating content does not create an accessibility barrier.

Steps:
1. Observe hero or testimonial sections for auto-rotation.
2. Turn on reduced motion at OS level if supported.
3. Verify whether motion is reduced or can be paused.
4. Confirm focus is not moved unexpectedly during rotation.

Expected result:
- Users can stop or control moving content.
- Rotation does not disrupt reading or focus.

### A11Y-012 AI answer engine input is labeled and operable

Objective:
Validate accessibility of the AI widget input and actions.

Steps:
1. Reach the AI widget input with keyboard.
2. Verify the input has a programmatic label or clear accessible name.
3. Activate `Submit` and `Clear` using keyboard.
4. Submit valid and empty input.

Expected result:
- Input and buttons are labeled and usable by keyboard and screen reader.
- Empty or invalid states are understandable.

### A11Y-013 AI loading and response states are announced

Objective:
Ensure dynamic updates are communicated accessibly.

Steps:
1. Submit a prompt in the AI widget.
2. Listen with a screen reader for loading feedback.
3. Wait for the response and observe whether the new content is announced or discoverable.
4. Use `Clear` and verify state reset is understandable.

Expected result:
- Loading, completion and error states are conveyed accessibly.
- Dynamic content does not appear silently in a confusing way.

### A11Y-014 Related content links have meaningful names

Objective:
Verify post-response suggestion links are understandable.

Steps:
1. Trigger related content if available.
2. Read the links with a screen reader.
3. Ensure the link text is meaningful out of context.

Expected result:
- Suggested links have descriptive names and are keyboard reachable.

### A11Y-015 All images have appropriate alternative text

Objective:
Validate meaningful and decorative image handling.

Steps:
1. Inspect hero images, service icons, client logos, social icons and trust badges.
2. Review alt text for informative images.
3. Confirm decorative images are hidden appropriately from assistive tech.

Expected result:
- Informative images have useful alt text.
- Decorative images do not create noise.

### A11Y-016 Links and buttons expose correct role and purpose

Objective:
Verify interactive controls are semantically correct.

Steps:
1. Inspect CTA controls across the page.
2. Confirm links navigate and buttons trigger in-page actions.
3. Review accessible names of controls like `Find out more`, `Watch`, `Read more`, `Stay connected` and `Previous` / `Next`.

Expected result:
- Controls use correct semantics and expose a clear purpose.

### A11Y-017 Duplicate link text remains understandable in context

Objective:
Validate repeated labels do not confuse assistive technology users.

Steps:
1. Review repeated texts such as `Learn more`, `Watch now`, `Read more` and `Download the analyst report`.
2. Inspect accessible names in the accessibility tree.
3. Confirm surrounding context or hidden labels disambiguate links where needed.

Expected result:
- Repeated labels are distinguishable through context or accessible naming.

### A11Y-018 Color contrast meets minimum requirements

Objective:
Validate text and control contrast.

Steps:
1. Test heading text, body text, CTA text, focus styles and footer content.
2. Check text placed over images and colored backgrounds.
3. Validate contrast using a trusted contrast tool.

Expected result:
- Text and UI components meet WCAG AA contrast ratios.

### A11Y-019 Reflow works at 320 CSS pixels and zoom levels

Objective:
Ensure content remains usable when enlarged.

Steps:
1. Test at 200 percent zoom.
2. Test reflow at a narrow viewport equivalent to 320 CSS pixels.
3. Verify no loss of content or function in menu, hero, cards, AI widget and footer.

Expected result:
- Users can zoom and reflow content without horizontal scrolling for ordinary reading tasks, except where legitimately exempt.

### A11Y-020 Text spacing adjustments do not break layout

Objective:
Validate resilience to user text spacing needs.

Steps:
1. Apply increased line height, paragraph spacing, letter spacing and word spacing using a browser tool or stylesheet.
2. Review hero content, cards, buttons and footer links.

Expected result:
- Content remains readable and functional with custom text spacing.

### A11Y-021 Client testimonial carousel is accessible

Objective:
Verify carousel navigation and slide content are usable.

Steps:
1. Move to the testimonial section by keyboard.
2. Activate `Previous` and `Next`.
3. Check whether current slide changes are announced.
4. Verify embedded `Watch` links are labeled clearly.

Expected result:
- Carousel controls are keyboard operable and understandable.
- Slide changes do not trap focus or confuse screen readers.

### A11Y-022 Case study cards are screen-reader and keyboard friendly

Objective:
Validate featured content cards.

Steps:
1. Tab through the case study section.
2. Verify headings, categories and CTAs are announced sensibly.
3. Confirm cards do not contain duplicate or hidden focus stops.

Expected result:
- Cards provide a clean and understandable reading order.

### A11Y-023 Video and external media links are accessible

Objective:
Validate embedded media handoff links.

Steps:
1. Review links to YouTube, Vimeo and external press items.
2. Confirm accessible names are descriptive.
3. Verify users are informed if a link opens external content or media.

Expected result:
- Media links are understandable and operable.

### A11Y-024 Newsletter CTA or form is accessible

Objective:
Validate marketing signup entry behavior.

Steps:
1. Activate `Stay connected`.
2. If a form appears, verify every field has a visible label and programmatic label.
3. Trigger validation errors with invalid input.
4. Confirm errors are announced and associated with the field.

Expected result:
- Signup flow is accessible, with labeled inputs and understandable validation.

### A11Y-025 Contact and career CTAs are accessible

Objective:
Validate first-click journeys for high-value CTAs.

Steps:
1. Navigate to `Contact Us` and `Explore careers` using keyboard.
2. Activate each control.
3. Confirm handoff links have meaningful names and are announced correctly.

Expected result:
- High-value CTAs are easy to find and operate.

### A11Y-026 Footer navigation is accessible

Objective:
Validate large footer navigation and utility links.

Steps:
1. Navigate through footer columns using keyboard.
2. Review link announcements with a screen reader.
3. Confirm social links, legal links and country links are understandable.

Expected result:
- Footer links are keyboard accessible and logically organized.

### A11Y-027 Social icons and links have accessible labels

Objective:
Ensure social destinations are clearly communicated.

Steps:
1. Inspect each social link with a screen reader.
2. Confirm label includes platform name.
3. Verify keyboard operability.

Expected result:
- Social links have meaningful accessible names.

### A11Y-028 Cookie and privacy links are accessible

Objective:
Validate accessibility of privacy messaging.

Steps:
1. Navigate to cookie notice or privacy-related links.
2. Confirm links are reachable, readable and named properly.
3. Verify no footer overlap hides these elements at zoom.

Expected result:
- Privacy messaging is accessible and usable.

### A11Y-029 Page language and mixed-language content are identified correctly

Objective:
Validate pronunciation and language metadata.

Steps:
1. Inspect the page `lang` attribute.
2. Review any visible non-English content or language-switch labels.
3. Confirm screen reader pronunciation is appropriate.

Expected result:
- The primary page language is set correctly.
- Mixed-language content is identified where needed.

### A11Y-030 Accessible names are unique enough for navigation lists

Objective:
Help screen reader users navigating by links or buttons only.

Steps:
1. Open the screen reader links list or elements list.
2. Review whether repeated names become confusing.
3. Check CTA naming for ambiguity.

Expected result:
- The elements list remains understandable and practical to use.

### A11Y-031 No keyboard trap exists

Objective:
Ensure users can always move in and out of components.

Steps:
1. Open menu, search or any modal-like experience.
2. Navigate within the component with keyboard.
3. Attempt to exit using expected keys and controls.

Expected result:
- No component traps keyboard focus.

### A11Y-032 Status messages and validation errors are announced accessibly

Objective:
Validate dynamic messaging beyond the AI widget.

Steps:
1. Trigger empty, invalid or failed states where available.
2. Review whether screen readers announce status or error information.
3. Verify visual users can also identify the state clearly.

Expected result:
- Error and status messages are accessible without requiring manual discovery only.

### A11Y-033 Touch target size is usable on mobile

Objective:
Validate mobile accessibility for touch interaction.

Steps:
1. Open the homepage on mobile or emulator.
2. Check menu trigger, language selector, carousel controls, CTAs and footer links.
3. Confirm controls are not too small or crowded.

Expected result:
- Touch targets are large enough and separated sufficiently for practical use.

### A11Y-034 Orientation and responsive behavior do not block access

Objective:
Validate accessibility under portrait and landscape layouts.

Steps:
1. Test the homepage on mobile in portrait and landscape.
2. Review header, menu, hero, cards, AI widget and footer.

Expected result:
- Content and functionality remain accessible in both orientations unless a justified exception exists.

### A11Y-035 Automated accessibility scan has no critical violations

Objective:
Use automation to catch common issues quickly.

Steps:
1. Run an automated accessibility audit using Axe, Lighthouse or equivalent.
2. Review critical and serious issues.
3. Cross-check false positives manually.

Expected result:
- No critical automated violations remain unresolved.

## Suggested Automation Candidates

These are good candidates for Playwright plus Axe automation:
- Skip link presence and function
- Landmark existence
- Heading hierarchy smoke checks
- Keyboard navigation smoke for menu and footer
- Accessible names for top CTAs
- Contrast checks for obvious design tokens where tooling supports it
- Axe scan of homepage at desktop and mobile sizes

## Reporting Template

For every defect captured, include:
- Test case ID
- Browser and assistive technology used
- Steps to reproduce
- Actual result
- Expected result
- Severity
- Screenshot or screen recording if useful
- Accessibility principle impacted: Perceivable, Operable, Understandable or Robust
- WCAG criterion reference if known

## Notes

- Manual testing is essential for carousels, dynamic widgets, focus behavior and screen reader announcements.
- Automated scanners help with coverage but will not fully validate usability or correct reading experience.
- For the AI widget and dynamic components, pay extra attention to live region behavior, focus management and error communication.
