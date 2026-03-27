# playwright-webdriveruni

An end-to-end test automation suite for [WebdriverUniversity.com](https://webdriveruniversity.com), built with **Playwright**, **TypeScript**, and **GitHub Actions**.

---

## Overview

This project automates UI testing across the full range of interactive features offered by WebdriverUniversity, a dedicated practice site for web automation engineers. It covers 17 test scenarios including form handling, iFrames, drag-and-drop, file uploads, login flows, popups, data tables, and more.

**Tech Stack:**
- [Playwright](https://playwright.dev/) `^1.43.1`, E2E test framework
- TypeScript, type-safe test authoring
- [@faker-js/faker](https://fakerjs.dev/), dynamic test data generation
- [dotenv](https://github.com/motdotla/dotenv), environment variable management
- GitHub Actions, CI/CD pipeline with sharded parallel execution

---

## Project Structure

```
playwright-webdriveruni/
├── .github/
│   └── workflows/
│       ├── e2e.yml                  # Main CI pipeline (4-shard parallel)
│       └── update-snapshots.yml    # Manual snapshot update workflow
├── pages/                           # Page Object Models (18 files)
│   ├── base.page.ts                 # Abstract base class
│   └── *.page.ts                    # One POM per feature
├── tests/                           # Test specs (17 files)
│   ├── fixtures/
│   │   └── index.ts                 # Custom Playwright fixtures
│   └── *.spec.ts
├── snapshots/                       # Visual regression baselines
├── test-results/                    # Local test output (gitignored)
├── playwright-report/               # Local HTML report (gitignored)
├── playwright.config.ts             # Playwright configuration
├── package.json
└── .env                             # Local environment variables (gitignored)
```

---

## Architecture: Page Object Model

All tests follow the **Page Object Model (POM)** pattern. Each test file has a corresponding page class that encapsulates selectors and interactions, keeping tests readable and maintainable.

```
BasePage (abstract)
  └── Provides shared locators: navTitle, footer

Feature-specific pages (extend BasePage or standalone)
  └── Encapsulate locators + action methods for one page/feature
```

**1:1 mapping:**
```
tests/login.portal.spec.ts  <-->  pages/login.portal.page.ts
tests/actions.spec.ts        <-->  pages/actions.page.ts
...
```

This means selectors live only in page objects, never directly in tests.

---

## Custom Fixtures

All tests import `test` and `expect` from `tests/fixtures/index.ts` instead of directly from `@playwright/test`. This single file uses Playwright's `test.extend()` API to provide a ready-to-use page object for every feature, eliminating the repetitive `beforeEach` navigation and manual page construction that would otherwise appear in every test.

**Before fixtures:**
```typescript
import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("Login Portal Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should log in successfully", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = await homePage.openLoginPortal();
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
  });
});
```

**After fixtures:**
```typescript
import { test, expect } from "./fixtures";

test.describe("Login Portal Tests", () => {
  test("should log in successfully", async ({ loginPortalPage }) => {
    await loginPortalPage.login(process.env.USERNAME, process.env.PASSWORD);
  });
});
```

Each fixture navigates to the home page, opens the correct popup, and returns a fully constructed page object, scoped per test for complete isolation.

### Available Fixtures

| Fixture | Page Opened |
|---|---|
| `homePage` | Home page (no popup) |
| `loginPortalPage` | Login Portal |
| `contactUsPage` | Contact Us |
| `clickButtonsPage` | Button Clicks |
| `toDoListPage` | To Do List |
| `pageObjectModelPage` | Page Object Model |
| `textAffectsPage` | Accordion & Text Affects |
| `dropdownButtonsPage` | Dropdown, Checkboxes & Radio Buttons |
| `ajaxLoaderPage` | Ajax Loader |
| `actionsPage` | Actions (drag & drop, hover, etc.) |
| `scrollingAroundPage` | Scrolling Around |
| `popupAlertsPage` | Popup & Alerts |
| `iframePage` | IFrame |
| `hiddenElementsPage` | Hidden Elements |
| `dataTablesButtonsPage` | Data, Tables & Button States |
| `autocompleteTextPage` | Autocomplete Textfield |
| `fileUploadPage` | File Upload |

### Adding a New Fixture

1. Add the new page type to the `AppFixtures` type in [tests/fixtures/index.ts](tests/fixtures/index.ts)
2. Add the fixture implementation calling the corresponding `homePage.open*()` method
3. Import the new fixture in your spec: `import { test, expect } from "./fixtures";`

---

## Test Suites

| Spec File | What It Tests |
|---|---|
| `actions.spec.ts` | Drag & drop, double-click, hover, click-and-hold |
| `ajax.loader.spec.ts` | AJAX loading states and async element visibility |
| `autocomplete.text.spec.ts` | Text autocomplete with snapshot assertions |
| `click.buttons.spec.ts` | Various button click interactions |
| `contact.us.spec.ts` | Contact form submission |
| `data.tables.buttons.spec.ts` | Data table content and button state changes |
| `dropdown.buttons.spec.ts` | Dropdowns, checkboxes, and radio buttons |
| `file.upload.spec.ts` | Single and multiple file upload scenarios |
| `hidden.elements.spec.ts` | Hidden element detection and interaction |
| `home.page.spec.ts` | Home page sections and navigation links |
| `iframe.spec.ts` | iFrame switching and content interaction |
| `login.portal.spec.ts` | Login with valid credentials, invalid credentials, empty fields |
| `page.object.model.spec.ts` | POM-based form flow with discount code |
| `popup.alerts.spec.ts` | JS alert, confirm, and prompt dialog handling |
| `scrolling.around.spec.ts` | Vertical and horizontal scrolling |
| `text.affects.spec.ts` | Text appearance and disappearance |
| `to.do.list.spec.ts` | To-do item creation, completion, and deletion |

---

## Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- npm (bundled with Node)
- Git

---

## Setup & Installation

**1. Clone the repository:**
```bash
git clone https://github.com/SantiagoBernal/playwright-webdriveruni.git
cd playwright-webdriveruni
```

**2. Install dependencies:**
```bash
npm install
```

**3. Install Playwright browsers:**
```bash
npx playwright install chromium
```

**4. Configure environment variables:**

Create a `.env` file in the project root (see [Environment Variables](#environment-variables)):
```bash
cp .env.example .env   # if available, or create manually
```

---

## Environment Variables

These variables are required for certain test suites. Locally they are loaded from `.env`; in CI they are injected as GitHub Actions secrets.

| Variable   | Used In                       | Purpose                          |
|------------|-------------------------------|----------------------------------|
| `USERNAME` | `login.portal.spec.ts`        | Valid login username             |
| `PASSWORD` | `login.portal.spec.ts`        | Valid login password             |
| `COUPON`   | `home.page.spec.ts`           | Discount coupon code on homepage |
| `DISCOUNT` | `page.object.model.spec.ts`   | Discount code for POM flow       |

**Example `.env`:**
```
USERNAME=webdriver
PASSWORD=webdriver123
COUPON=ST6MT42324
DISCOUNT=NEWCUSTOMER773322
```

---

## Running Tests

| Command | Description |
|---|---|
| `npx playwright test` | Run all tests (headless, HTML report locally) |
| `npm run pw-ui` | Open Playwright UI mode (interactive test runner) |
| `npm run pw-regression` | Run all tests with 8 workers and 3 retries |
| `npx playwright test tests/login.portal.spec.ts` | Run a single spec file |
| `npx playwright test --headed` | Run tests in headed (visible browser) mode |
| `npx playwright show-report` | Open the last HTML report in the browser |

The `pretest` script automatically cleans `playwright-report/` and `test-results/` before each run.

---

## Configuration

Key settings in `playwright.config.ts`:

| Setting | Local | CI |
|---|---|---|
| `workers` | Auto (CPU-based) | 2 per shard |
| `retries` | 0 | 2 |
| `reporter` | `html` | `blob` (merged post-sharding) |
| `timeout` | 50s | 50s |
| `expect.timeout` | 10s | 10s |
| `baseURL` | `https://webdriveruniversity.com` | same |
| `trace` | Retained on failure | Retained on failure |

Only **Chromium** is enabled. Firefox and WebKit projects exist in the config but are commented out.

---

## CI/CD Pipeline

### `e2e.yml`, Main E2E Tests

**Triggers:** Push to `main`, pull requests targeting `main`

**Strategy:** 4-shard parallel matrix on `ubuntu-22.04` with Node 20

```
Shard 1/4  ──┐
Shard 2/4  ──┤──> Merge blob reports ──> HTML report artifact
Shard 3/4  ──┤
Shard 4/4  ──┘
```

**Steps per shard:**
1. Checkout code
2. Setup Node 20 with npm cache
3. `npm ci`
4. `npx playwright install chromium --with-deps`
5. Run `npx playwright test --shard=N/4` with secrets injected as env vars
6. Upload blob report artifact (retained 1 day)

**Merge job** (runs after all shards pass):
- Downloads all 4 blob reports
- Merges into a single HTML report
- Uploads as artifact (retained 30 days)

**Secrets required** (set in GitHub repository settings):
`COUPON`, `USERNAME`, `PASSWORD`, `DISCOUNT`

---

### `update-snapshots.yml`, Visual Snapshot Updates

**Trigger:** Manual (`workflow_dispatch`), select the target branch

**What it does:**
1. Checks out the specified branch
2. Runs `npx playwright test autocomplete.text.spec.ts --update-snapshots` on Linux/Chromium
3. Automatically creates a pull request with the updated snapshot files

Use this workflow whenever the autocomplete UI changes and baseline snapshots need to be refreshed.

---

## Reports & Artifacts

**Locally:**
- HTML report: `playwright-report/index.html`
- Raw results: `test-results/`
- Open with: `npx playwright show-report`

**In CI (GitHub Actions):**
- Each shard uploads a blob report (1-day retention)
- The merge job produces a final HTML report artifact (30-day retention)
- Download from the **Actions** tab on the repository page

**Traces** (on failure): Captured automatically and embedded in the HTML report. Open a failed test in the report to view the trace timeline, screenshots, and network activity.

---

## Visual Snapshots

The `autocomplete.text.spec.ts` suite uses Playwright's snapshot assertions to verify rendered text output visually.

Snapshots are stored in `snapshots/` and committed to the repository. They are generated against **Linux/Chromium** to ensure CI consistency.

**To update snapshots locally:**
```bash
npx playwright test autocomplete.text.spec.ts --update-snapshots
```

**To update snapshots via CI:**
Go to **Actions > Update Snapshots** in GitHub, click **Run workflow**, select the target branch, and a PR will be created automatically with the new snapshots.
