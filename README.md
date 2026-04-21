# playwright_Codex_Practice

Playwright-based QA automation for the HCLTech homepage, including functional, accessibility, and BDD coverage.

## Local usage

```bash
npm install
npx playwright install
npm run test:functional
npm run test:accessibility:firefox
npm run test:bdd
```

## CI/CD pipeline

This repository includes a GitHub Actions workflow at `.github/workflows/playwright-ci-cd.yml`.

- It runs on pushes to `main`, pull requests, and manual dispatch.
- It installs Node.js dependencies and the Firefox Playwright browser.
- It executes the functional, accessibility, and BDD suites with Firefox as the CI baseline.
- It uploads Playwright artifacts for every run.
- It deploys a GitHub Pages dashboard from `main` with links to the latest CI reports.
