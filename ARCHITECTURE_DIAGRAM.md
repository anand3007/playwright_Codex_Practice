# Project Architecture Diagram

This diagram shows how the HCLTech Playwright QA project is organized across test authoring, execution, reporting, and CI/CD.

## System Architecture

```mermaid
flowchart TD
    Dev[QA Engineer / Developer]
    Repo[GitHub Repository<br/>playwright_Codex_Practice]
    Local[Local Playwright Project]

    subgraph Project["Playwright QA Project"]
        Config[playwright.config.js<br/>package.json]
        BDDFeature[bdd/hcltech-homepage.feature]

        subgraph TestLayers["Test Layers"]
            Functional[tests/functional/*<br/>Homepage functional coverage]
            Accessibility[tests/accessibility/*<br/>Keyboard + Structure + Axe]
            BDD[tests/bdd/*<br/>BDD-aligned Playwright specs]
        end

        subgraph Support["Reusable Support"]
            FuncSupport[tests/functional/support/hcltech-functional.js]
            A11ySupport[tests/accessibility/support/accessibility.js]
            BDDSupport[tests/bdd/support/hcltech-homepage.js]
        end

        subgraph Execution["Execution Layer"]
            PW[Playwright Test Runner]
            Firefox[Firefox]
            Chromium[Chromium]
            WebKit[WebKit]
        end

        subgraph Output["Output Layer"]
            PWReport[playwright-report/<br/>HTML reports]
            TestResults[test-results/<br/>traces, logs, screenshots]
            CustomReports[reports/<br/>Functional, Accessibility,<br/>Combined QA dashboard]
        end
    end

    Target[HCLTech Website<br/>https://www.hcltech.com]

    subgraph CICD["GitHub Actions CI/CD"]
        Workflow[.github/workflows/playwright-ci-cd.yml]
        NpmInstall[npm ci]
        BrowserInstall[npx playwright install --with-deps firefox]
        SuiteRun[Run suites<br/>functional + accessibility + bdd]
        Bundle[scripts/build-pages-report.sh]
        Artifacts[GitHub Actions Artifacts]
        Pages[GitHub Pages Dashboard]
    end

    Dev --> Local
    Dev --> Repo
    Repo --> Workflow
    Local --> Config
    BDDFeature --> BDD

    Functional --> FuncSupport
    Accessibility --> A11ySupport
    BDD --> BDDSupport

    Config --> PW
    Functional --> PW
    Accessibility --> PW
    BDD --> PW

    PW --> Firefox
    PW --> Chromium
    PW --> WebKit

    Firefox --> Target
    Chromium --> Target
    WebKit --> Target

    PW --> PWReport
    PW --> TestResults
    PW --> CustomReports

    Workflow --> NpmInstall --> BrowserInstall --> SuiteRun --> Bundle
    SuiteRun --> Artifacts
    Bundle --> Pages
    Repo --> Pages
```

## CI/CD Execution Flow

```mermaid
sequenceDiagram
    participant User as Developer
    participant GitHub as GitHub Repo
    participant Actions as GitHub Actions
    participant PW as Playwright Runner
    participant Site as HCLTech Website
    participant Pages as GitHub Pages

    User->>GitHub: Push to main / open pull request / run workflow manually
    GitHub->>Actions: Trigger Playwright QA Pipeline
    Actions->>Actions: npm ci
    Actions->>Actions: Install Playwright Firefox
    Actions->>PW: Run functional suite
    Actions->>PW: Run accessibility suite
    Actions->>PW: Run BDD suite
    PW->>Site: Execute browser-based validation
    PW-->>Actions: HTML report + test results
    Actions->>Actions: Build Pages bundle
    Actions-->>GitHub: Upload workflow artifacts
    Actions->>Pages: Deploy dashboard
```

## Notes

- `Firefox` is the main CI baseline because it has been the most stable browser for this target site.
- `Chromium` and `WebKit` remain available for local or broader cross-browser validation.
- The `reports/` folder stores hand-crafted QA summaries, while `playwright-report/` contains generated Playwright HTML output.
- The CI/CD pipeline publishes a lightweight dashboard bundle to GitHub Pages so the latest run is easier to review.
