# HCLTech Accessibility Defect Report

Run date: April 21, 2026  
Command: `npm run test:accessibility:headed`  
Project: `~/Desktop/Playwright codex`  
Browsers executed: Chromium, Firefox, WebKit  
Result summary: 8 passed, 19 failed

## Executive Summary

The accessibility suite surfaced a mix of confirmed product defects and test-execution noise.

Confirmed product issues were consistent across multiple engines and centered on:
- Missing discernible names for testimonial media links
- Touch targets that do not meet minimum size/spacing requirements
- Skip-link behavior that does not reliably move keyboard focus into main content

Some failures were likely automation mismatches rather than homepage defects:
- Desktop tests expected a visible `Menu` trigger even when the desktop navigation was already expanded
- The AI widget `Clear` button was asserted in the default page state, but it was not exposed in the captured DOM at that point
- Chromium remains less reliable against `hcltech.com` on this machine and may contribute false negatives

## Confirmed Defects

### A11Y-DEF-001: Testimonial video links do not have a discernible accessible name

Severity: High  
Priority: P1  
Status: Open  
Area: Homepage, Hear from Our Clients  
WCAG reference: 2.4.4 Link Purpose (In Context), 4.1.2 Name, Role, Value

Evidence:
- Reported by Axe on desktop in Firefox and WebKit
- Also surfaced in Chromium results
- Rule: `link-name [serious]`

Affected selectors from the run:
- `.ui-partners-right-item[data-partners="1"] > .ui-partner-box > .ui-animated-ico.ui-video-ico[data-lity=""]`
- `.ui-partners-right-item[data-partners="2"] > .ui-partner-box > .ui-animated-ico.ui-video-ico[data-lity=""]`
- `.ui-partners-right-item[data-partners="3"] > .ui-partner-box > .ui-animated-ico.ui-video-ico[data-lity=""]`

Observed HTML excerpt from the failure artifact:
```html
<a href="https://www.youtube.com/watch?v=wlg6g6kr7wU&amp;t=12s"
   data-lity=""
   class="ui-animated-ico ui-video-ico ext"
   data-extlink=""
   target="_blank"
   rel="noopener nofollow">
  <span>Watch</span>
</a>
```

Actual result:
- Axe reports these links as focusable elements without a discernible accessible name.

Expected result:
- Each media link should expose a unique accessible name such as `Watch Roy Chorev testimonial video`.

Business impact:
- Screen-reader users cannot reliably distinguish which testimonial video link they are activating.
- Repeated unlabeled or ambiguously labeled media links reduce usability and discoverability.

Reproduction notes:
1. Open `https://www.hcltech.com/`.
2. Scroll to `Hear from Our Clients`.
3. Inspect the testimonial `Watch` links using Axe DevTools or a screen reader links list.
4. Observe that the links are reported without a clear accessible name.

Recommended fix direction:
- Add descriptive accessible text or `aria-label` values per testimonial video link.
- Ensure the accessible name is unique enough to distinguish each link in a links list.

### A11Y-DEF-002: Desktop navigation links do not meet minimum touch target size/spacing

Severity: High  
Priority: P1  
Status: Open  
Area: Homepage, expanded main navigation  
WCAG reference: 2.5.8 Target Size (Minimum)

Evidence:
- Reported by Axe on desktop in Firefox and WebKit
- Also surfaced in Chromium results
- Rule: `target-size [serious]`

Examples called out by the run:
- `AI Force`
- `AI Foundry`
- `AI Labs`
- `Industry AI Solutions`
- `Kinetic AI`

Actual result:
- Navigation items in the expanded menu do not meet the minimum touch target size or spacing requirements.

Expected result:
- Each actionable navigation item should provide at least a 24px target or enough surrounding inactive space to satisfy WCAG 2.5.8.

Business impact:
- People with motor-control limitations may struggle to activate the intended navigation option.
- This creates friction in one of the site’s highest-traffic discovery areas.

Reproduction notes:
1. Open `https://www.hcltech.com/`.
2. Expand or inspect the main navigation area where the AI submenu items are present.
3. Run Axe or inspect touch target geometry in responsive mode.
4. Observe `target-size` failures on the affected menu links.

Recommended fix direction:
- Increase clickable height/width for submenu items.
- Add spacing between adjacent targets where size cannot be increased directly.

### A11Y-DEF-003: Mobile footer `Global Presence` link is partially obscured and too close to the adjacent expand control

Severity: High  
Priority: P1  
Status: Open  
Area: Homepage footer, mobile layout  
WCAG reference: 2.5.8 Target Size (Minimum)

Evidence:
- Reported by Axe on mobile viewport in Firefox, Chromium and WebKit
- Rule: `target-size [serious]`

Affected selector from the run:
- `.footer-geo-presence-menu.mobile-expand-menu.footer-level-1-menu:nth-child(2) > .nav-link--global-presence[title="Global Presence"][href$="global-presence"]`

Related overlapping element from the run:
```html
<a href="#" class="footer-menu-trigger" aria-label="Expand" data-once="footer-menu-trigger"></a>
```

Actual result:
- The `Global Presence` footer link is reported as partially obscured.
- Safe clickable space was measured as only `1.4px` in one dimension in the artifact.

Expected result:
- The footer link and its adjacent expand control should have independent, non-overlapping touch targets with sufficient spacing.

Business impact:
- Mobile users may tap the wrong control or fail to activate the intended link.
- This affects a prominent global-discovery path in the footer.

Reproduction notes:
1. Open `https://www.hcltech.com/` in a mobile viewport around `390x844`.
2. Scroll to the footer.
3. Inspect the `Global Presence` link and the nearby expand icon.
4. Run Axe or manually test taps near the boundary between the two controls.
5. Observe insufficient spacing and the reported obstruction.

Recommended fix direction:
- Separate the expand trigger and link hit areas.
- Increase vertical space and remove overlap between the two interactive elements.

### A11Y-DEF-004: Skip link does not reliably move keyboard focus into the main content area

Severity: Medium  
Priority: P2  
Status: Open  
Area: Homepage keyboard navigation  
WCAG reference: 2.4.1 Bypass Blocks

Evidence:
- Firefox failure artifact showed the skip link was present, but activating it did not result in focus moving into `main`
- WebKit artifact showed the skip link was not reached within the current keyboard-flow test window
- Page snapshot confirms the control exists as `Skip to main content`

Actual result:
- Activating `Skip to main content` did not reliably place keyboard focus inside the main content region during automated verification.

Expected result:
- Activating the skip link should move focus directly to the main content container or the first meaningful focusable element inside it.

Business impact:
- Keyboard-only users may still need to tab through repeated header/navigation content.
- This weakens a core bypass mechanism intended to speed navigation.

Reproduction notes:
1. Open `https://www.hcltech.com/`.
2. Press `Tab` to focus `Skip to main content`.
3. Press `Enter`.
4. Verify whether keyboard focus moves into the `main` region.
5. In the failing run, focus did not reliably land in `main`.

Recommended fix direction:
- Ensure the skip-link target is focusable, for example by applying `tabindex="-1"` to the main target or a dedicated main-content anchor.
- Move programmatic focus to that target on activation.

## Failures That Look Like Test-Harness or Scenario Issues

These appeared in the run, but current evidence does not support filing them as confirmed homepage defects yet.

### TEST-NOTE-001: Desktop `Menu` trigger expectation does not match the live desktop layout

Observed failure:
- `A11Y-006 keyboard user can open the main menu`
- `A11Y-031 keyboard user is not trapped in the main menu`

Why this is probably not a product defect:
- The failure artifacts show the desktop layout already exposes `Main Navigation`.
- The locator resolved to hidden `Menu` text rather than a visible actionable menu trigger.
- This suggests the test assumes a mobile/menu-button interaction model on a desktop navigation layout.

Recommendation:
- Scope these keyboard menu tests to mobile/tablet layouts where a menu trigger actually exists, or update the desktop test to validate tab access through the visible nav links instead.

### TEST-NOTE-002: AI widget `Clear` button was asserted before the widget entered a clearable state

Observed failure:
- `A11Y-016 gives core CTAs accessible names`

Why this is probably not a confirmed product defect:
- In the failure snapshot, the AI widget exposed `Submit` but not `Clear`.
- The accessibility test checked `Clear` on initial load, before entering input or generating a response.

Recommendation:
- Update the test to first type into the AI input or trigger a generated state, then assert the accessible name and visibility of the `Clear` button.

### TEST-NOTE-003: Chromium still shows site-specific instability against HCLTech

Observed behavior:
- Chromium produced a broader set of failures than Firefox/WebKit in earlier runs.
- Some Chromium runs against `www.hcltech.com` previously showed transport or navigation instability.

Recommendation:
- Treat Firefox as the cleaner baseline for defect confirmation on this site.
- Keep Chromium results as supporting evidence, but do not rely on Chromium alone to confirm regressions here.

## Suggested Next Actions

1. File the four confirmed defects above with screenshots and the relevant `test-results/.../error-context.md` artifacts.
2. Update the accessibility tests to avoid filing false defects from the desktop menu and AI `Clear` scenarios.
3. Rerun the suite in Firefox after the test adjustments to get a cleaner defect baseline.
