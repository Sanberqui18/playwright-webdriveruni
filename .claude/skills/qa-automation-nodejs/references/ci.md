# CI/CD Integration Templates

## GitHub Actions — Playwright

```yaml
# .github/workflows/e2e.yml
name: E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npx playwright test
        env:
          BASE_URL: ${{ secrets.STAGING_URL }}
          TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
          TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
          CI: true

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: test-results/
          retention-days: 7
```

### Sharding for large suites (GitHub Actions)

```yaml
jobs:
  test:
    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2, 3, 4]
    runs-on: ubuntu-latest
    steps:
      # ... setup steps ...
      - name: Run Playwright tests (shard)
        run: npx playwright test --shard=${{ matrix.shard }}/4

  merge-reports:
    needs: test
    runs-on: ubuntu-latest
    if: always()
    steps:
      - uses: actions/download-artifact@v4
        with:
          pattern: blob-report-*
          merge-multiple: true
          path: blob-reports

      - name: Merge reports
        run: npx playwright merge-reports --reporter html ./blob-reports
```

---

## GitHub Actions — Cypress

```yaml
name: Cypress E2E

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        containers: [1, 2, 3]  # Parallel containers

    steps:
      - uses: actions/checkout@v4

      - name: Cypress run
        uses: cypress-io/github-action@v6
        with:
          build: npm run build
          start: npm start
          wait-on: 'http://localhost:3000'
          record: true
          parallel: true
          group: 'E2E Tests'
          tag: ${{ github.event_name }}
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          CYPRESS_BASE_URL: ${{ secrets.STAGING_URL }}
```

---

## GitLab CI — Playwright

```yaml
# .gitlab-ci.yml
stages:
  - test

e2e-tests:
  stage: test
  image: mcr.microsoft.com/playwright:v1.44.0-jammy
  script:
    - npm ci
    - npx playwright test
  variables:
    BASE_URL: $STAGING_URL
    CI: "true"
  artifacts:
    when: always
    paths:
      - playwright-report/
      - test-results/
    expire_in: 1 week
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == "main"
```

---

## Docker — Running Tests in Container

```dockerfile
# Dockerfile.playwright
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npx", "playwright", "test"]
```

```bash
# Run locally with Docker
docker build -f Dockerfile.playwright -t e2e-tests .
docker run --rm \
  -e BASE_URL=https://staging.example.com \
  -e CI=true \
  -v $(pwd)/playwright-report:/app/playwright-report \
  e2e-tests
```

---

## Global Setup — Auth State (Playwright)

```typescript
// tests/global-setup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Login once, save auth state
  await page.goto(`${baseURL}/login`);
  await page.getByLabel('Email').fill(process.env.TEST_USER_EMAIL!);
  await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD!);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('**/dashboard');

  await page.context().storageState({ path: 'playwright/.auth/user.json' });
  await browser.close();
}

export default globalSetup;
```

```typescript
// playwright.config.ts — use the saved auth state
export default defineConfig({
  globalSetup: './tests/global-setup.ts',
  use: {
    storageState: 'playwright/.auth/user.json',
  },
  // Tests that DON'T need auth:
  projects: [
    {
      name: 'setup',
      testMatch: /global.setup\.ts/,
      use: { storageState: undefined },
    },
    {
      name: 'authenticated',
      dependencies: ['setup'],
      use: { storageState: 'playwright/.auth/user.json' },
    },
    {
      name: 'unauthenticated',
      testMatch: /auth\.spec\.ts/,
      use: { storageState: undefined },
    },
  ],
});
```

---

## Environment Variables — Best Practices

```bash
# .env.test (committed — no secrets)
BASE_URL=http://localhost:3000
API_URL=http://localhost:3001

# .env.test.local (gitignored — secrets)
TEST_USER_EMAIL=tester@example.com
TEST_USER_PASSWORD=supersecret
```

```typescript
// playwright.config.ts
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });
// .env.test.local overrides .env.test automatically with dotenv
dotenv.config({ path: '.env.test.local', override: true });
```

**Never hardcode secrets in:**
- Test files
- Config files
- Fixture files
- Git history