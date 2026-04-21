#!/usr/bin/env bash

set -euo pipefail

site_dir="${1:-site}"

status_label() {
  case "${1:-}" in
    0) echo "Passed" ;;
    "") echo "Not run" ;;
    *) echo "Failed" ;;
  esac
}

status_class() {
  case "${1:-}" in
    0) echo "passed" ;;
    "") echo "unknown" ;;
    *) echo "failed" ;;
  esac
}

copy_dir() {
  local src="$1"
  local dest_parent="$2"

  if [ -d "$src" ]; then
    mkdir -p "$dest_parent"
    cp -R "$src" "$dest_parent/"
  fi
}

functional_status="${FUNCTIONAL_STATUS:-}"
accessibility_status="${ACCESSIBILITY_STATUS:-}"
bdd_status="${BDD_STATUS:-}"
generated_at="$(date -u '+%Y-%m-%d %H:%M UTC')"
run_link="${GITHUB_PAGES_URL:-}"

rm -rf "$site_dir"
mkdir -p "$site_dir"

copy_dir "reports" "$site_dir"
copy_dir "playwright-report/functional" "$site_dir/playwright-report"
copy_dir "playwright-report/accessibility" "$site_dir/playwright-report"
copy_dir "playwright-report/bdd" "$site_dir/playwright-report"

cat > "$site_dir/index.html" <<EOF
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>HCLTech QA Dashboard</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f4f7fb;
        --panel: #ffffff;
        --text: #172033;
        --muted: #5a667d;
        --border: #d9e0ec;
        --passed: #18794e;
        --failed: #c23b3b;
        --unknown: #8a6f00;
        --accent: #0f5bd8;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: linear-gradient(180deg, #eef4ff 0%, var(--bg) 100%);
        color: var(--text);
      }

      main {
        max-width: 1080px;
        margin: 0 auto;
        padding: 40px 20px 64px;
      }

      h1,
      h2 {
        margin: 0 0 12px;
      }

      p {
        margin: 0 0 16px;
        color: var(--muted);
        line-height: 1.5;
      }

      .hero,
      .panel {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 24px;
        box-shadow: 0 20px 40px rgba(15, 32, 51, 0.06);
      }

      .hero {
        margin-bottom: 20px;
      }

      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 18px;
      }

      .chip {
        border-radius: 999px;
        padding: 8px 12px;
        background: #eef3fb;
        color: var(--muted);
        font-size: 14px;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
        margin: 20px 0;
      }

      .status {
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .passed {
        color: var(--passed);
      }

      .failed {
        color: var(--failed);
      }

      .unknown {
        color: var(--unknown);
      }

      .links {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 16px;
      }

      a.card {
        display: block;
        text-decoration: none;
        color: inherit;
      }

      .card .panel {
        height: 100%;
      }

      .card strong {
        color: var(--accent);
      }
    </style>
  </head>
  <body>
    <main>
      <section class="hero">
        <h1>HCLTech QA Dashboard</h1>
        <p>Automated Playwright CI/CD summary for the HCLTech homepage coverage in this repository.</p>
        <div class="meta">
          <span class="chip">Generated: ${generated_at}</span>
          <span class="chip">Browser baseline: Firefox</span>
          <span class="chip">Workflow run: <a href="${run_link}">${run_link}</a></span>
        </div>
      </section>

      <section class="grid">
        <article class="panel">
          <div class="status $(status_class "$functional_status")">$(status_label "$functional_status")</div>
          <h2>Functional Suite</h2>
          <p>Homepage shell, content, footer, and navigation coverage using the functional plan baseline.</p>
        </article>
        <article class="panel">
          <div class="status $(status_class "$accessibility_status")">$(status_label "$accessibility_status")</div>
          <h2>Accessibility Suite</h2>
          <p>Keyboard, structure, and Axe-based checks aligned to the accessibility plan.</p>
        </article>
        <article class="panel">
          <div class="status $(status_class "$bdd_status")">$(status_label "$bdd_status")</div>
          <h2>BDD Suite</h2>
          <p>Behavior-driven Firefox coverage for the homepage journeys defined in the feature model.</p>
        </article>
      </section>

      <section class="panel">
        <h2>Reports</h2>
        <div class="links">
          <a class="card" href="./playwright-report/functional/index.html">
            <div class="panel">
              <strong>Functional Playwright Report</strong>
              <p>Latest CI execution for the functional homepage suite.</p>
            </div>
          </a>
          <a class="card" href="./playwright-report/accessibility/index.html">
            <div class="panel">
              <strong>Accessibility Playwright Report</strong>
              <p>Latest CI execution for the accessibility suite.</p>
            </div>
          </a>
          <a class="card" href="./playwright-report/bdd/index.html">
            <div class="panel">
              <strong>BDD Playwright Report</strong>
              <p>Latest CI execution for the Firefox BDD scenarios.</p>
            </div>
          </a>
          <a class="card" href="./reports/HCLTECH_QA_DASHBOARD.html">
            <div class="panel">
              <strong>Combined QA Dashboard</strong>
              <p>The hand-authored consolidated dashboard already tracked in the repo.</p>
            </div>
          </a>
        </div>
      </section>
    </main>
  </body>
</html>
EOF
